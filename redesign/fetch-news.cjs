// Lấy toàn bộ bài /news/ đang đăng trên biglight.jp (do admin.biglight.jp sinh) → redesign/news.json.
// Chạy trước build ở mỗi lần deploy; lỗi mạng thì giữ news.json cũ (build vẫn chạy được).
// Khi bản mới thay biglight.jp, bước này đổi sang đọc thẳng API của admin.
const fs = require('fs'); const path = require('path');
const BASE = 'https://biglight.jp';
const OUT = path.join(__dirname, 'news.json');

// URL cũ trong bài → URL mới (trang ngành / dịch vụ đổi chỗ)
const MAP = [
  [/\/service\/tokutei-ginou\/kogyo-seihin\/?/g, '/service/field/kogyo/'],
  [/\/service\/tokutei-ginou\/kensetsu\/?/g, '/service/field/kensetsu/'],
  [/\/service\/tokutei-ginou\/inshokuryohin\/?/g, '/service/field/inshoku/'],
  [/\/service\/tokutei-ginou\/gaishoku\/?/g, '/service/field/gaishoku/'],
  [/\/service\/jinzai-shoukai\/?/g, '/service/engineer/'],
  [/\/service\/teichaku\/?/g, '/service/tokutei-ginou/'],
  [/href="\/sdgs\/?"/g, 'href="/about/sdgs/"'],
  [/href="\/flow\/?"/g, 'href="/service/"'],
  [/href="\/faq\/?"/g, 'href="/service/tokutei-ginou/#faq"'],
];
const dec = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const strip = (h) => dec(h.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

async function get(u) { const r = await fetch(u, { headers: { 'User-Agent': 'BIGLIGHT-redesign-build' } }); if (!r.ok) throw new Error(u + ' ' + r.status); return r.text(); }

async function article(slug) {
  const h = await get(`${BASE}/news/${slug}/`);
  const ld = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => { try { return JSON.parse(m[1]); } catch { return null; } }).find((j) => j && /BlogPosting|Article|NewsArticle/.test(j['@type']));
  const cat = strip((h.match(/<span class="ncat[^"]*">([\s\S]*?)<\/span>/) || [])[1] || 'お知らせ');
  const title = strip((h.match(/<h1>([\s\S]*?)<\/h1>/) || [])[1] || (ld && ld.headline) || slug);
  // thân bài: từ <div class="nbody"> tới khối FAQ / CTA / tags / share
  const a = h.indexOf('<div class="nbody">');
  let end = h.length;
  for (const mk of ['<div class="nfaq">', '<div class="ncta">', '<div class="nrelated">', '<div class="ntags">', '<div class="nshare">']) { const i = h.indexOf(mk, a); if (i > a && i < end) end = i; }
  let body = a > 0 ? h.slice(a + '<div class="nbody">'.length, end).trim().replace(/<\/div>\s*$/, '') : '';
  body = body.replace(/ contenteditable="false"/g, '').replace(/(src|href)="\/assets\//g, `$1="${BASE}/assets/`);
  for (const [re, to] of MAP) body = body.replace(re, to);
  // dọn: đoạn trống <p><br></p>, và dòng tiêu đề trơn lặp lại ngay sau mục lục
  body = body.replace(/<p>(?:\s|<br\s*\/?>|&nbsp;)*<\/p>/g, '');
  const reEsc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\  for (const [re, to] of MAP) body = body.replace(re, to);');
  body = body.replace(new RegExp('(</div>|</nav>)\\s*' + reEsc(title) + '\\s*(?=<)'), '$1');
  body = body.replace(new RegExp('^\\s*' + reEsc(title) + '\\s*(?=<)'), '');
  // bảng không có khung cuộn → bọc lại (tránh tràn ngang trên điện thoại)
  body = body.replace(/<div class="nbody-tablewrap">\s*<table/g, '<table data-w').replace(/<table(?! data-w)/g, '<div class="nbody-tablewrap"><table').replace(/<table data-w/g, '<div class="nbody-tablewrap"><table').replace(/<\/table>(?!\s*<\/div>)/g, '</table></div>');
  // FAQ của bài → [câu hỏi, trả lời]
  const fq = h.slice(h.indexOf('<div class="nfaq">') > 0 ? h.indexOf('<div class="nfaq">') : h.length);
  const faq = [...fq.matchAll(/<summary>([\s\S]*?)<\/summary><div>([\s\S]*?)<\/div><\/details>/g)].map(([, q, x]) => [strip(q), strip(x)]);
  const tags = [...h.slice(h.indexOf('<div class="ntags">')).matchAll(/<a [^>]*>#([^<]+)<\/a>/g)].slice(0, 8).map((m) => dec(m[1]));
  const date = ((ld && ld.datePublished) || '').slice(0, 10) || ((h.match(/公開 (\d{4}\.\d{2}\.\d{2})/) || [])[1] || '').replace(/\./g, '-');
  const img = (ld && [].concat(ld.image || [])[0]) || `${BASE}/assets/og-image.jpg`;
  const chars = strip(body).length;
  return { slug, title, cat, date: date.replace(/-/g, '.'), desc: (ld && ld.description) || strip(body).slice(0, 110), img: img.startsWith('/') ? BASE + img : img, read: `約${Math.max(1, Math.round(chars / 500))}分`, tags, faq, body };
}

(async () => {
  try {
    const list = await get(`${BASE}/news/`);
    const slugs = [...new Set([...list.matchAll(/href="(?:https:\/\/biglight\.jp)?\/news\/([a-z0-9-]+)\/"/g)].map((m) => m[1]).filter((s) => s !== 'tag' && s !== 'page'))];
    const items = [];
    for (const s of slugs) { try { items.push(await article(s)); } catch (e) { console.warn('skip', s, e.message); } }
    if (items.length < 3) throw new Error('quá ít bài (' + items.length + ')');
    items.sort((x, y) => (y.date > x.date ? 1 : y.date < x.date ? -1 : 0));
    fs.writeFileSync(OUT, JSON.stringify(items, null, 1));
    console.log('news:', items.length, 'bài');
  } catch (e) {
    console.warn('KHÔNG lấy được tin mới, dùng news.json cũ:', e.message);
    if (!fs.existsSync(OUT)) process.exit(1);
  }
})();
