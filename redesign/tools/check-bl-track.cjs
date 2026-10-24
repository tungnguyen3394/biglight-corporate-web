/* biglight.jp redesign — フォーム営業のリンク（?bl=）の 計測（src/js/bl-track.js）を 本物の chromium で確かめる（2026-10-25）
   同意なしで open・アドレス欄から bl を消す・保存領域を使わない・押した内部リンクにだけ bl・dwell は sendBeacon・配信停止のページは送らない。
   使い方: node redesign/build.cjs && node redesign/tools/check-bl-track.cjs redesign/dist
           （playwright が この repo に無いときは PW_DIR=<playwright の入った node_modules> を付ける）。CI では動かさない（手で確かめる用） */
const { createRequire } = require('module')
const path = require('path')
const { chromium } = (() => { try { return require('playwright') } catch (e) { return createRequire(require('path').join(process.env.PW_DIR || '', '_.js'))('playwright') } })()
const http = require('http'), fs = require('fs')
const D = path.resolve(process.argv[2] || path.join(__dirname, '..', 'dist'))
let pass = 0, fail = 0
const ok = (n, c, d) => { if (c) { pass++; console.log(' OK ' + n) } else { fail++; console.log(' NG ' + n + (d ? '  -> ' + String(d).slice(0, 400) : '')) } }
const srv = http.createServer((q, s) => {
  let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'
  const f = path.join(D, p); if (!f.startsWith(D) || !fs.existsSync(f)) { s.writeHead(404); return s.end('nf') }
  const ext = path.extname(f); s.writeHead(200, { 'Content-Type': { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css' }[ext] || 'application/octet-stream' }); fs.createReadStream(f).pipe(s)
}).listen(0)
;(async () => {
  const base = 'http://127.0.0.1:' + srv.address().port
  const browser = await chromium.launch()
  const ctx = await browser.newContext()
  const net = [], beacons = []
  await ctx.route('https://api-crm.biglight.jp/**', r => { net.push({ url: r.request().url(), body: r.request().postData() || '' }); r.fulfill({ status: r.request().url().indexOf('/formbot/optout') > 0 ? 404 : 204, body: '' }) })
  await ctx.route(/googletagmanager|google-analytics/, r => { net.push({ url: r.request().url(), body: '' }); r.abort() })
  await ctx.route(/fonts\.(googleapis|gstatic)|challenges\.cloudflare|admin\.biglight\.jp/, r => r.abort())
  await ctx.exposeFunction('__rec', (u, b) => { beacons.push({ u, b: JSON.parse(b) }) })
  await ctx.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => false }); const o = navigator.sendBeacon.bind(navigator); navigator.sendBeacon = function (u, b) { try { window.__rec(String(u), String(b)) } catch (e) { } try { const a = JSON.parse(localStorage.getItem('__t') || '[]'); a.push(String(b)); localStorage.setItem('__t', JSON.stringify(a)) } catch (e) { } return o(u, b) } })
  const page = await ctx.newPage()
  await page.goto(base + '/service/?bl=bl-abc123&x=1#top', { waitUntil: 'load' })
  await page.waitForTimeout(400)
  const st = await page.evaluate(() => ({ search: location.search, hash: location.hash, consent: !!(window.BLC && window.BLC.has('a')), ls: Object.keys(localStorage), ss: Object.keys(sessionStorage), ck: document.cookie }))
  const fb = () => beacons.filter(x => /\/formbot\/c$/.test(x.u))
  ok('★ 同意していない（BLC.has(a) = false）のに open を すぐ送る（sendBeacon・番号は大文字）', !st.consent && fb().length === 1 && fb()[0].b.k === 'open' && fb()[0].b.r === 'BL-ABC123' && fb()[0].b.p === '/service/' && fb()[0].b.wd === 0, JSON.stringify({ st, b: fb() }))
  ok('★ アドレス欄から bl を消す（ほかの ? と # は残す）', st.search === '?x=1' && st.hash === '#top', JSON.stringify(st))
  ok('★ Cookie・保存領域に 番号を置かない', st.ck.indexOf('BL-') < 0 && !st.ss.length && st.ls.every(k => !/bl_/.test(k)), JSON.stringify(st))
  ok('GA4・記事の計測（mktbot）は 同意前に 送らない（今までどおり）', !net.some(x => /googletagmanager|google-analytics|mktbot/.test(x.url)), JSON.stringify(net.map(x => x.url)))
  ok('★ 実際の通信も 1 件（api-crm.biglight.jp/formbot/c・本文は 番号とパスだけ）', net.filter(x => /formbot\/c$/.test(x.url)).length === 1 && Object.keys(JSON.parse(net[0].body)).sort().join() === 'k,p,r,wd', JSON.stringify(net))
  /* 動かす・触る → 隠れる = dwell */
  await page.evaluate(() => { document.documentElement.style.minHeight = '5000px'; window.scrollTo(0, 2000); window.dispatchEvent(new Event('scroll')) })
  await page.mouse.move(50, 50); await page.mouse.move(80, 90)
  await page.waitForTimeout(1200)
  await page.evaluate(() => { Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' }); document.dispatchEvent(new Event('visibilitychange')) })
  await page.waitForTimeout(300)
  let dw = fb().filter(x => x.b.k === 'dwell')
  ok('★ 隠れたら dwell を sendBeacon（見えていた ms・動かした %・操作）', dw.length === 1 && dw[0].b.ms >= 1000 && dw[0].b.sc > 0 && dw[0].b.ia === 1 && dw[0].b.r === 'BL-ABC123', JSON.stringify(dw))
  await page.evaluate(() => { Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'visible' }); document.dispatchEvent(new Event('visibilitychange')) })
  await page.waitForTimeout(500)
  await page.evaluate(() => { document.dispatchEvent(new Event('visibilitychange')); Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' }); document.dispatchEvent(new Event('visibilitychange')) })
  await page.waitForTimeout(300)
  dw = fb().filter(x => x.b.k === 'dwell')
  ok('もう一度 隠れたら その間の分（差分）だけ', dw.length === 2 && dw[1].b.ms >= 400 && dw[1].b.ms < dw[0].b.ms + 2000, JSON.stringify(dw))
  await page.evaluate(() => { Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'visible' }); document.dispatchEvent(new Event('visibilitychange')) })
  /* 内部リンク・よそのリンク・同じページの # */
  const tags = await page.evaluate(() => {
    const mk = (h) => { const a = document.createElement('a'); a.href = h; a.textContent = 'x'; document.body.appendChild(a); a.addEventListener('click', e => e.preventDefault()); a.click(); return a.getAttribute('href') }
    return { inner: mk('/about/?q=1'), rel: mk('../contact/index.html'), ext: mk('https://job.biglight.jp/'), hash: mk('#faq'), pdf: mk('/img/x.pdf'), opt: mk('/optout/') }
  })
  ok('★ 押した 内部リンクにだけ bl と blk=p を付ける（よそ・同じページの #・ファイル・配信停止 は付けない）', /^\/about\/\?q=1&bl=BL-ABC123&blk=p$/.test(tags.inner) && /^\/contact\/index\.html\?bl=BL-ABC123&blk=p$/.test(tags.rel) && tags.ext === 'https://job.biglight.jp/' && tags.hash === '#faq' && tags.pdf === '/img/x.pdf' && tags.opt === '/optout/', JSON.stringify(tags))
  /* 本物の 次のページへ */
  const n0 = beacons.length, m0 = net.length
  await page.evaluate(() => { const a = document.createElement('a'); a.href = '/about/'; a.id = 'go'; a.textContent = 'go'; document.body.appendChild(a) })
  await Promise.all([page.waitForNavigation({ waitUntil: 'load' }), page.click('#go')])
  await page.waitForTimeout(400)
  const nb = beacons.slice(n0).filter(x => /\/formbot\/c$/.test(x.u))
  const st2 = await page.evaluate(() => location.search)
  const lsT = await page.evaluate(() => JSON.parse(localStorage.getItem('__t') || '[]').map(x => JSON.parse(x)))
  const nn = net.slice(m0).map(x => { try { return JSON.parse(x.body) } catch (e) { return {} } })
  /* 離れる瞬間の sendBeacon は Playwright の 口（exposeFunction・route）に 届かない → テスト用の 写し（localStorage・テストの init だけ）で見る */
  ok('★ 離れるとき dwell（pagehide → sendBeacon）・次のページは page（同じ番号）・アドレス欄は きれい', lsT.slice(-3).some(x => x.k === 'dwell' && x.p === '/service/' && x.ms > 0) && nb.some(x => x.b.k === 'page' && x.b.p === '/about/' && x.b.r === 'BL-ABC123') && st2 === '', JSON.stringify({ nb, nn, lsT, st2 }))
  /* bl の無い 普通の訪問・配信停止のページ */
  const n1 = beacons.length
  await page.goto(base + '/about/', { waitUntil: 'load' }); await page.waitForTimeout(300)
  ok('bl の無い訪問は 何も送らない', beacons.slice(n1).filter(x => /\/formbot\/c$/.test(x.u)).length === 0)
  const n2 = beacons.length, m2 = net.length
  await page.goto(base + '/optout/?bl=BL-ABC123', { waitUntil: 'load' }); await page.waitForTimeout(500)
  ok('★ 配信停止のページ（?bl= 付き）は クリックとして送らない・配信停止の 読み込みは 今までどおり', beacons.slice(n2).filter(x => /\/formbot\/c$/.test(x.u)).length === 0 && net.slice(m2).some(x => /formbot\/optout\?bl=BL-ABC123/.test(x.url)), JSON.stringify(net.slice(m2)))
  /* webdriver の印 */
  const ctx2 = await browser.newContext(); await ctx2.route('https://api-crm.biglight.jp/**', r => r.fulfill({ status: 204, body: '' }))
  const got = []; await ctx2.exposeFunction('__rec', (u, b) => got.push(JSON.parse(b)))
  await ctx2.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => true }); const o = navigator.sendBeacon.bind(navigator); navigator.sendBeacon = function (u, b) { try { window.__rec(String(u), String(b)) } catch (e) { } return o(u, b) } })
  const p2 = await ctx2.newPage(); await p2.goto(base + '/?bl=BL-ZZZ999', { waitUntil: 'load' }); await p2.waitForTimeout(300)
  ok('navigator.webdriver → wd: 1', got.length === 1 && got[0].wd === 1, JSON.stringify(got))
  await browser.close(); srv.close()
  console.log('\n' + pass + ' pass / ' + fail + ' fail'); process.exit(fail ? 1 : 0)
})().catch(e => { console.error(e); process.exit(1) })
