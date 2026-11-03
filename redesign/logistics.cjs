// 物流人材（自動車運送業・物流倉庫）2026-11-03: /logistics/（まとめ）・/logistics/check/（受入れ診断）・分野ページの「制度の現在地」。
// データは facts.json だけ（制度の数値・状況・出典・確認日）。ここを直せば全ページが変わる。本文の文章はこのファイル。
const fs = require('fs'), path = require('path');
const F = JSON.parse(fs.readFileSync(path.join(__dirname, 'facts.json'), 'utf8'));
const ymd = (d) => d.replace(/-/g, '/');
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const badge = (s) => `<span class="lg-st ${s === '確定' ? 'ok' : s === '調整中' ? 'mid' : 'plan'}">${s}</span>`;
const src = (k) => { const s = F.sources[k]; return s ? `<a href="${s.url}">${s.name}</a>` : ''; };
const facts = (field, group) => F.facts.filter((x) => x.field === field && (!group || x.group === group));
const fact = (field, key) => F.facts.find((x) => x.field === field && x.key === key);
const stamp = () => `<p class="lg-upd">最終更新日: ${ymd(F.updated)}　<small>各項目の出典と確認日は表の中に記載しています。</small></p>`;
const usedSources = (fields) => { const ks = []; for (const x of F.facts.concat(...fields.map((f) => F.timeline[f] || []))) if ((!x.field || fields.includes(x.field)) && x.source && !ks.includes(x.source)) ks.push(x.source); return ks; };
const srcBlock = (fields) => `<div class="lg-src"><div class="lbl">Sources</div><h3>出典</h3><ul>${usedSources(fields).map((k) => { const v = F.facts.filter((x) => x.source === k).map((x) => x.verified_at).sort().pop() || F.updated; return `<li>${src(k)}<small>確認日 ${ymd(v)}</small></li>`; }).join('')}</ul><p>制度は変更されることがあります。最新の内容は各省庁の公表資料でご確認ください。</p></div>`;
const head = (lbl, h, p) => `<div class="lbl">${lbl}</div><div class="two" style="margin-top:24px"><h2 style="font-size:36px">${h}</h2><div class="txt"><p>${p}</p></div></div>`;

const CSS = `<style>
.lg-upd{font-size:13px;color:var(--grey);margin-top:28px}.lg-upd small{font-size:12px}
.lg-st{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.08em;border-radius:64px;padding:3px 10px;white-space:nowrap;vertical-align:middle}
.lg-st.ok{background:#eaf1fb;color:#0b3d91}.lg-st.mid{background:#fff3dc;color:#8a5a00}.lg-st.plan{background:#f1f1f1;color:#555}
.lg-sum{margin-top:40px;border-top:1px solid var(--line)}.lg-sum li{list-style:none;padding:18px 0;border-bottom:1px solid var(--line);font-size:17px;font-weight:700;line-height:1.9;letter-spacing:.04em}
.lg-tbl{margin-top:48px}.lg-tbl .ctable{min-width:640px}.lg-tbl th:first-child{text-align:left;width:150px}.lg-tbl td{text-align:left;font-size:14px}.lg-tbl td .lg-st{margin-left:8px}.lg-tbl td small{display:block;color:var(--grey);font-size:12px;margin-top:4px}
.lg-tbl.one td:nth-child(3){white-space:nowrap}.lg-tbl.one td:nth-child(4){font-size:12px;color:var(--grey)}
.lg-ck{display:grid;grid-template-columns:1fr 1fr;gap:0 48px;margin-top:50px;border-top:1px solid var(--line)}.lg-ck>div{border-bottom:1px solid var(--line);padding:24px 0;display:grid;grid-template-columns:26px 1fr;gap:14px}
.lg-ck i{width:22px;height:22px;border:2px solid var(--accent);border-radius:5px;display:block;margin-top:2px}.lg-ck b{display:block;font-size:16px;letter-spacing:.04em}.lg-ck b .lg-st{margin-left:8px}.lg-ck p{font-size:14px;line-height:1.9;color:var(--ink2);margin-top:6px}
.lg-src{margin-top:80px;padding-top:40px;border-top:1px solid var(--line)}.lg-src h3{font-size:22px;margin-top:16px;letter-spacing:.06em}.lg-src ul{margin:20px 0 0;padding:0;list-style:none}.lg-src li{font-size:14px;line-height:1.9;padding:8px 0;border-bottom:1px solid var(--line)}.lg-src li small{margin-left:12px;color:var(--grey);font-size:12px;white-space:nowrap}.lg-src p{font-size:12px;color:var(--grey);margin-top:16px}
.lg-tl .froad li b{font-size:11px}.lg-tl .froad li span{font-size:13px}.lg-tl .froad li small{background:transparent;padding:0;margin-top:6px}
.lg-two{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:48px}.lg-two>a{display:block;border:1px solid var(--line);border-radius:12px;overflow:hidden}.lg-two .im{aspect-ratio:3/2;background:#eef2f8}.lg-two img{width:100%;height:100%;object-fit:cover}.lg-two .tx{padding:26px 28px}.lg-two .tx b{display:block;font-size:22px;letter-spacing:.06em}.lg-two .tx b small{display:block;font-family:var(--en);font-size:11px;letter-spacing:.14em;color:var(--grey);text-transform:uppercase}.lg-two .tx p{font-size:14px;line-height:1.9;color:var(--ink2);margin-top:12px}.lg-two .tx .lg-st{margin-top:14px}
.lg-cta{margin-top:60px;border:1px solid var(--ink);border-radius:16px;padding:44px 48px;display:grid;grid-template-columns:1fr auto;gap:32px;align-items:center}.lg-cta b{display:block;font-size:24px;letter-spacing:.06em}.lg-cta p{font-size:14px;line-height:1.9;color:var(--ink2);margin-top:10px}
.lg-q{margin-top:40px;border-top:1px solid var(--line)}.lg-q>div{border-bottom:1px solid var(--line);padding:30px 0;display:grid;grid-template-columns:70px 1fr;gap:20px}.lg-q>div[hidden]{display:none}.lg-q .n{font-family:var(--en);font-size:13px;font-weight:700;letter-spacing:.12em;color:var(--grey);padding-top:4px}
.lg-q h3{font-size:17px;line-height:1.8;letter-spacing:.04em}.lg-q small{display:block;font-size:13px;color:var(--grey);margin-top:6px;line-height:1.8}
.lg-opt{display:flex;gap:12px;margin-top:16px;flex-wrap:wrap}.lg-opt button{font:inherit;font-size:14px;font-weight:700;border:1px solid var(--ink);background:#fff;color:var(--ink);border-radius:64px;padding:10px 24px;cursor:pointer;min-width:120px}.lg-opt button.on{background:var(--accent);border-color:var(--accent);color:#fff}
.lg-res{margin-top:60px;border:1px solid var(--line);border-radius:16px;padding:44px 48px}.lg-res[hidden]{display:none}.lg-res .k{font-family:var(--en);font-size:12px;letter-spacing:.14em;color:var(--accent);font-weight:700}.lg-res h2{font-size:28px;letter-spacing:.06em;margin-top:12px;line-height:1.6}.lg-res>p{font-size:15px;line-height:2;color:var(--ink2);margin-top:14px}
.lg-res ul{margin:24px 0 0;padding:0;list-style:none}.lg-res li{display:grid;grid-template-columns:90px 1fr;gap:16px;padding:14px 0;border-top:1px solid var(--line);font-size:14px;line-height:1.8}.lg-res li>span{font-weight:700;white-space:nowrap}.lg-res li.ng>span{color:#b3261e}.lg-res li.un>span{color:#8a5a00}
.lg-res .form{margin-top:48px;grid-template-columns:1fr}.lg-res .form .info{display:none}
@media (max-width:860px){.lg-ck,.lg-two,.lg-cta{grid-template-columns:1fr}.lg-q>div{grid-template-columns:1fr;gap:8px}.lg-res,.lg-cta{padding:30px 22px}.lg-tbl.one td:nth-child(3){white-space:normal}}
</style>`;

const timeline = (field, h) => { const t = F.timeline[field] || []; return `<div class="ln"><div class="rh"><h3>${h}</h3><small>${t.filter((x) => x.status === '確定').length}／${t.length} 確定</small></div><ol>${t.map((x, k) => `<li class="${k === t.length - 1 ? 'end' : ''}"><b>${k === t.length - 1 ? 'GOAL' : 'STEP ' + String(k + 1).padStart(2, '0')}</b><span>${x.label}</span><small>${x.date}</small>${badge(x.status)}</li>`).join('')}</ol></div>`; };
const checklist = (field) => `<div class="lg-ck">${facts(field, 'company').map((x) => `<div><i></i><div><b>${x.item}${badge(x.status)}</b><p>${x.value}${x.note ? `<br><small>${x.note}</small>` : ''}</p></div></div>`).join('')}</div>`;
const oneTable = (field) => `<div class="lg-tbl one ctable-wrap"><table class="ctable"><thead><tr><th>項目</th><th>内容</th><th>状況</th><th>出典・確認日</th></tr></thead><tbody>${facts(field).filter((x) => x.group !== 'company').map((x) => `<tr><th>${x.item}</th><td>${x.value}${x.note ? `<small>${x.note}</small>` : ''}</td><td>${badge(x.status)}</td><td>${src(x.source)}<br>${ymd(x.verified_at)}</td></tr>`).join('')}</tbody></table></div>`;

/* 分野ページに差し込む「制度の現在地」 */
exports.factsBlock = (r, field) => { if (!F.fields[field]) return ''; const f = F.fields[field]; return `${CSS}
<section class="blk" id="status"><div class="wrap">${head('Status', `${f.name}の<br>制度の現在地`, `制度の決まり具合を、出典と確認日つきでまとめています。「確定」は公表済み、「調整中」は国が準備中、「予定」は見込みです。`)}
  ${stamp()}
  <div class="lg-tl froad">${timeline(field, '制度のタイムライン')}</div>
  ${oneTable(field)}
  <h3 style="font-size:22px;letter-spacing:.06em;margin-top:60px">受入れ企業の条件（チェックリスト）</h3>
  ${checklist(field)}
  <div style="margin-top:40px;display:flex;gap:16px;flex-wrap:wrap"><a class="pill" href="${r}logistics/check/index.html">受入れ可能か診断する<span class="circ">→</span></a><a class="pill" href="${r}logistics/index.html">物流人材（運送・倉庫）のまとめ<span class="circ">→</span></a></div>
  ${srcBlock([field])}
</div></section>`; };

const FAQ = [
  ['運送会社が倉庫スタッフを特定技能で採用できますか？', '一般貨物・特定貨物自動車運送事業者は、物流倉庫分野の受入れ機関になれます（類型C）。自社が占有する倉庫での作業、または運送に関連して有償で引き受けている倉庫作業が対象です。運送に伴う荷役として行う作業は対象外なので、業務の切り分けが大切です。'],
  ['物流倉庫分野は、いつから採用できますか？', '2026年1月に特定技能の対象になり、上乗せ基準・運用要領・試験実施要領まで公表されています。評価試験の合格者が出てからの受入れになるため、実際の入社は2027年度の見込みです。協議会の設置も国が調整中です。いま準備を始めると、受入れ開始と同時に動けます。'],
  ['ドライバーはすぐに採用できますか？', '自動車運送業分野は受入れが始まっています。ただし、日本の運転免許が必要なため、海外からの人材は入国後に在留資格「特定活動」（トラックは最長6か月）で免許を取ってから乗務します。国内在住で日本の免許を持つ方は、より短い期間で乗務を始められます。'],
  ['倉庫管理システム（WMS）がないと受け入れられませんか？', '物流倉庫分野では、入庫・在庫・出庫を管理する情報システムを「利活用していること」が受入れの基準です。自社で所有していなくても、就業する事業所で使える状態であれば問題ありません。さらに、WMSと連携して機能が広がる機器やシステムを継続して使い、協議会への加入から1年以内に報告する必要があります。'],
  ['派遣会社を通して受け入れられますか？', '自動車運送業・物流倉庫のどちらも、派遣での受入れは認められていません。受入れ企業が直接雇用し、日本人と同等以上の報酬を支払います。'],
  ['日本語はどのくらい話せますか？', '両分野とも、日本語はA2.2相当以上（JFT-Basic または JLPT N4以上）が条件です。タクシー・バスのドライバーは原則N3以上です。日常の指示や安全確認のやり取りができる水準で、入社後の日本語学習の機会をつくることも支援内容に含まれます。'],
  ['BIGLIGHTは両分野に対応していますか？', '自動車運送業はトラックドライバーを中心にご支援しています。物流倉庫分野は、受入れ開始に向けて要件の確認・協議会加入の準備・候補者の確保を今からお手伝いします。登録支援機関として、採用から入社後の定着まで一つの窓口で対応します。'],
];

/* /logistics/ まとめ */
exports.hub = (o) => { const r = '../'; const keys = ['added', 'mikomi', 'start', 'work', 'skill', 'jp', 'license', 'exam', 'kyogikai', 'ikusei']; const fs2 = ['unso', 'soko'];
  const cell = (fld, k) => { const x = fact(fld, k); return x ? `${x.value}${badge(x.status)}${x.note ? `<small>${x.note}</small>` : ''}` : '—'; };
  return o.page({ root: r, title: '物流人材（自動車運送業・物流倉庫）の特定技能採用｜BIGLIGHT株式会社', desc: 'ドライバーと倉庫スタッフを特定技能で採用するための制度比較・受入れ条件・制度の現在地。', body: `
${o.pageHead('Logistics', '物流人材（自動車運送業・物流倉庫）の特定技能採用')}
${CSS}
<section><div class="wrap">
  <ul class="lg-sum">
    <li>特定技能では、トラックなどの「ドライバー」（自動車運送業分野）と「倉庫スタッフ」（物流倉庫分野）を採用できます。</li>
    <li>自動車運送業は受入れが始まっており、物流倉庫は2026年1月に対象となり2027年度の受入れに向けて国が準備中です。</li>
    <li>どちらも直接雇用・日本語N4相当以上・分野別協議会への加入が条件で、運送事業者は倉庫スタッフの受入れ機関にもなれます。</li>
  </ul>
  ${stamp()}
</div></section>
<section class="blk" style="padding-top:120px"><div class="wrap">${head('Compare', '2つの分野を<br>くらべる', '数値と状況は国の公表資料から取り、確認した日を記録しています。バッジの「確定」は公表済み、「調整中」は国が準備中、「予定」は見込みです。')}
  <div class="lg-tbl ctable-wrap"><table class="ctable"><thead><tr><th>項目</th>${fs2.map((f) => `<th>${F.fields[f].name}<br><small style="font-weight:400;color:var(--grey)">${F.fields[f].short}</small></th>`).join('')}</tr></thead><tbody>${keys.map((k) => { const x = fact('unso', k) || fact('soko', k); return `<tr><th>${x.item}</th>${fs2.map((f) => `<td>${cell(f, k)}</td>`).join('')}</tr>`; }).join('')}</tbody></table></div>
  <div class="lg-two">${fs2.map((f) => { const d = o.FIELDS.find((x) => x.slug === f); const s = fact(f, 'start'); return `<a href="${r}${F.fields[f].url}index.html"><div class="im"><img src="${o.fieldImg(r, d)}" alt="${d.ja}"></div><div class="tx"><b>${d.ja}<small>${d.en}</small></b><p>${d.newText || d.desc}</p>${badge(s.status)} <small style="font-size:12px;color:var(--grey)">${s.value}</small></div></a>`; }).join('')}</div>
</div></section>
<section class="blk"><div class="wrap">${head('Package', 'ドライバー＋倉庫スタッフを<br>ひとつの窓口で', '運送と倉庫は、同じ会社の中でつながっています。分野ごとに制度は違いますが、採用の窓口と支援はひとつにまとめられます。')}
  <div class="fwork">
    <div><h3>運送会社が倉庫も採用できる</h3><p>一般・特定貨物自動車運送事業者は、物流倉庫分野の受入れ機関（類型C）になれます。自社占有の倉庫での作業や、有償で引き受けている倉庫作業が対象です。</p></div>
    <div><h3>順番は「いま運送、次に倉庫」</h3><p>ドライバーは受入れ中なので先に進められます。倉庫スタッフは2027年度の受入れに向けて、協議会加入やWMSの確認など、いまできる準備を並行します。</p></div>
    <div><h3>支援は同じ10項目</h3><p>住居の確保、生活オリエンテーション、定期面談など、法定の支援10項目は両分野で共通です。登録支援機関BIGLIGHTが一括で担います。</p></div>
  </div>
</div></section>
<section class="blk"><div class="wrap">${head('Timeline', '制度の<br>タイムライン', '閣議決定から受入れ開始までの節目です。「調整中」「予定」の項目は、国の公表に合わせて更新します。')}
  <div class="lg-tl froad">${timeline('unso', F.fields.unso.name)}${timeline('soko', F.fields.soko.name)}</div>
</div></section>
<section class="blk"><div class="wrap">${head('Checklist', '受入れ企業の<br>条件', '分野ごとに、会社側で満たす必要がある条件です。診断ページで、御社の状況に当てはめて確認できます。')}
  ${fs2.map((f) => `<h3 style="font-size:22px;letter-spacing:.06em;margin-top:56px">${F.fields[f].name}</h3>${checklist(f)}`).join('')}
  <div class="lg-cta"><div><b>受入れ可能か、3分で診断</b><p>8つの質問に答えると、いま満たしている条件と、これから準備する項目がわかります。結果はそのままご相談にお使いいただけます。</p></div>${o.pill('診断をはじめる', r + 'logistics/check/index.html')}</div>
</div></section>
${o.faqSec(FAQ)}
<section class="blk" style="padding-top:0"><div class="wrap">${srcBlock(fs2)}</div></section>
${o.docCta(r, 'logistics', 'material-logistics.jpg?v=' + o.LOGI_PDF_URL.split('?v=')[1], '物流人材ガイド（自動車運送業・物流倉庫）', '2分野の比較、制度の現在地、受入れ企業の条件、乗務・受入れまでの道のり、FAQをA4横17ページにまとめました。')}
${o.contactBox(r)}
` }); };

/* /logistics/check/ 受入れ診断 → 結果 → お問い合わせ（admin.biglight.jp /api/inquiry。bl-track.js の #cf と同じ） */
const Q = [
  { id: 'who', t: 'どちらの人材を採用したいですか？', opts: ['ドライバー', '倉庫スタッフ', '両方'], pick: true },
  { id: 'direct', t: '外国人材を、派遣ではなく自社で直接雇用できますか？', s: '両分野とも労働者派遣での受入れは認められていません。', must: true },
  { id: 'pay', t: '日本人と同等以上の給与・待遇を用意できますか？', s: '雇用契約の基本条件です。昇給や手当も日本人と同じ基準にします。', must: true },
  { id: 'support', t: '登録支援機関への支援委託、または自社での支援体制を整えられますか？', s: '住居の確保・生活オリエンテーション・定期面談など、法定の支援10項目が必要です。', must: true },
  { id: 'u-biz', for: 'u', t: '道路運送法・貨物自動車運送事業法の許可を受けた自動車運送事業者ですか？', s: '自動車運送業分野の受入れ機関の前提です。', must: true },
  { id: 'u-cert', for: 'u', t: '「働きやすい職場認証」または「Gマーク」を取得済み、もしくは取得の予定がありますか？', s: 'トラックはGマーク（安全性優良事業所）でも要件を満たします。', must: true },
  { id: 'u-wait', for: 'u', t: '入国後、日本の免許を取るまでの準備期間（トラックは最長6か月、乗務できない期間）を見込めますか？', s: '国内在住で日本の免許を持つ方は短くなります。', must: false },
  { id: 's-biz', for: 's', t: '倉庫業者、倉庫業者から作業を受託する会社、または一般・特定貨物自動車運送事業者のいずれかですか？', s: '物流倉庫分野の受入れ機関は、この3つの類型（A・B・C）のどれかです。', must: true },
  { id: 's-place', for: 's', t: '就業場所は、営業倉庫登録のある倉庫（運送事業者は自社占有の倉庫）ですか？', s: '荷主の自社倉庫や、営業倉庫登録のない倉庫は対象になりません。', must: true },
  { id: 's-wms', for: 's', t: '入庫・在庫・出庫を管理する倉庫管理システム（WMS）を使っていますか？', s: '自社所有でなくても、就業する事業所で使える状態なら要件を満たします。', must: true },
  { id: 's-prep', for: 's', t: '2027年度の受入れ開始に向けて、協議会加入などの準備をいまから始められますか？', s: '協議会は国が設置に向けて調整中です。設置後、在留諸申請の前に加入します。', must: false },
];
exports.check = (o) => { const r = '../../'; return o.page({ root: r, title: '受入れ可能か診断（自動車運送業・物流倉庫）｜BIGLIGHT株式会社', desc: '8つの質問で、特定技能のドライバー・倉庫スタッフを受け入れられるかを診断。結果からそのまま無料相談できます。', body: `
${o.pageHead('Check', '受入れ可能か診断（自動車運送業・物流倉庫）')}
${CSS}
<section><div class="wrap">
  <p class="lead16">質問は8つ前後、3分で終わります。「わからない」でも大丈夫です。結果には、いま満たしている条件と、これから準備する項目が出ます。制度の根拠は<a href="${r}logistics/index.html">物流人材のまとめ</a>をご覧ください。</p>
  ${stamp()}
  <div class="lg-q" id="lgq">${Q.map((q, i) => `<div data-id="${q.id}" ${q.for ? `data-for="${q.for}" hidden` : ''}><div class="n">Q${String(i + 1).padStart(2, '0')}</div><div><h3>${q.t}</h3>${q.s ? `<small>${q.s}</small>` : ''}<div class="lg-opt">${(q.opts || ['はい', 'いいえ', 'わからない']).map((v) => `<button type="button" data-v="${v}">${v}</button>`).join('')}</div></div></div>`).join('')}</div>
  <div class="send" style="margin-top:40px"><button class="pill" type="button" id="lg-go" style="cursor:pointer">診断結果を見る<span class="circ">→</span></button><p class="note" id="lg-err" role="alert" style="margin-top:12px"></p></div>
  <div class="lg-res" id="lg-res" hidden>
    <div class="k">RESULT</div><h2 id="lg-rh"></h2><p id="lg-rp"></p><ul id="lg-rl"></ul>
    <div class="form"><div class="info"></div>
    <form id="cf" novalidate><div style="position:absolute;left:-9999px" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
      <input type="hidden" name="type" value="無料相談（物流人材・受入れ診断）">
      <h3 style="font-size:20px;letter-spacing:.06em;margin-top:8px">この結果をもとに、無料で相談する</h3>
      <p class="note" style="margin-top:8px">診断の回答は、下の「ご相談内容」に自動で入ります。そのまま送るか、ご自由に書き足してください。</p>
      <label for="cf-co">会社名<small>必須</small></label><div class="fld" data-err="入力してください"><input id="cf-co" name="company" type="text" autocomplete="organization" placeholder="株式会社〇〇" required></div>
      <label for="cf-nm">お名前<small>必須</small></label><div class="fld" data-err="入力してください"><input id="cf-nm" name="name" type="text" autocomplete="name" placeholder="山田 太郎" required></div>
      <label for="cf-em">メールアドレス<small>必須</small></label><div class="fld" data-err="正しいメールアドレスを入力してください"><input id="cf-em" name="email" type="email" autocomplete="email" placeholder="example@company.co.jp" required></div>
      <label for="cf-tel">電話番号<small>必須</small></label><div class="fld" data-err="入力してください"><input id="cf-tel" name="tel" type="tel" autocomplete="tel" placeholder="052-000-0000" required></div>
      <label for="cf-msg">ご相談内容<small>必須</small></label><div class="fld" data-err="入力してください"><textarea id="cf-msg" name="message" required></textarea></div>
      <div class="send"><button class="pill" type="submit" style="cursor:pointer">送信する<span class="circ">→</span></button></div>
      <p class="note">送信いただいた個人情報は<a href="${r}privacy/index.html">プライバシーポリシー</a>に基づき取り扱います。</p>
    </form>
    <div class="dldone" id="cf-done" hidden style="grid-column:auto"><b>送信ありがとうございました。</b><p>担当者より3営業日以内にご連絡いたします。お急ぎの場合はお電話（052-908-7944）でご連絡ください。</p></div>
    </div>
  </div>
</div></section>
<script>
(function(){
  var Q=${JSON.stringify(Q.map((q) => ({ id: q.id, t: q.t, for: q.for || '', must: !!q.must, pick: !!q.pick })))};
  var box=document.getElementById('lgq'),ans={};
  function $(i){return document.getElementById(i);}
  function show(){var w=ans.who||'';[].forEach.call(box.children,function(d){var f=d.getAttribute('data-for');if(!f)return;d.hidden=!(w==='両方'||(f==='u'&&w==='ドライバー')||(f==='s'&&w==='倉庫スタッフ'));});}
  box.addEventListener('click',function(e){var b=e.target.closest('button[data-v]');if(!b)return;var d=b.closest('[data-id]'),id=d.getAttribute('data-id');ans[id]=b.getAttribute('data-v');[].forEach.call(d.querySelectorAll('button'),function(x){x.classList.toggle('on',x===b);});if(id==='who')show();$('lg-err').textContent='';});
  $('lg-go').addEventListener('click',function(){
    var vis=Q.filter(function(q){var d=box.querySelector('[data-id="'+q.id+'"]');return d&&!d.hidden;}),miss=vis.filter(function(q){return !ans[q.id];});
    if(miss.length){$('lg-err').textContent='未回答の質問があります（'+miss.length+'件）。';var d=box.querySelector('[data-id="'+miss[0].id+'"]');d.scrollIntoView({block:'center',behavior:'smooth'});return;}
    var ng=[],un=[],ok=[];vis.forEach(function(q){if(q.pick)return;var v=ans[q.id];(v==='いいえ'?ng:v==='わからない'?un:ok).push(q);});
    var ngMust=ng.filter(function(q){return q.must;});
    var h,p;
    if(ngMust.length){h='現時点では、満たしていない条件があります';p='「いいえ」の項目は受入れの基準にかかわります。満たし方（認証の取得、WMSの導入、雇用形態の見直しなど）から一緒に整理できます。';}
    else if(ng.length||un.length){h='受入れの基本条件は満たしています。確認したい項目があります';p='「わからない」「いいえ」の項目を確認すれば、受入れの計画に進めます。ご相談いただければ、御社の状況に合わせて確認します。';}
    else{h='受入れの条件を満たしている可能性が高いです';p='次は、採用したい人数と時期から逆算したスケジュールづくりです。自動車運送業はすぐに、物流倉庫は2027年度の受入れに向けて動き出せます。';}
    $('lg-rh').textContent=h;$('lg-rp').textContent=p;
    var ul=$('lg-rl');ul.innerHTML='';vis.forEach(function(q){if(q.pick)return;var v=ans[q.id],li=document.createElement('li');li.className=v==='いいえ'?'ng':v==='わからない'?'un':'';var s=document.createElement('span');s.textContent=v==='はい'?'満たす':v==='いいえ'?(q.must?'要対応':'要検討'):'要確認';var t=document.createElement('div');t.textContent=q.t;li.appendChild(s);li.appendChild(t);ul.appendChild(li);});
    var lines=['【受入れ診断】'+(ans.who||''),'結果: '+h,''];vis.forEach(function(q){lines.push((q.pick?'採用したい人材':q.t)+' → '+ans[q.id]);});lines.push('','診断ページ: https://biglight.jp/logistics/check/');
    $('cf-msg').value=lines.join('\\n');
    var res=$('lg-res');res.hidden=false;res.scrollIntoView({block:'start',behavior:'smooth'});
  });
})();
</script>
` }); };
exports.FACTS = F;
