// Số liệu + 事例 dùng chung cho 会社案内 / 特定技能ガイド / 受入れ準備ガイド / 分野別ガイド (CEO 2026-11-04: tài liệu dày hơn, 事例 ghi tên thật, công khai quốc tịch nội bộ, không ghi 定着率).
// Một chỗ sửa → mọi tài liệu đổi (build.cjs đưa file này vào mã ?v= của PDF).
// BL = CRM (app_state, đọc bằng workflow check-case-facts.yml, chỉ SELECT). 在籍 = 入社日 đã tới, 退社日 chưa tới. Người đếm không trùng.
// GOV = số liệu chính phủ, mỗi nhóm có nguồn + ngày; null = chưa kiểm được → khối đó tự ẩn.

const BL = {
  asOf: '2026年11月4日時点',
  active: 225, companies: 52,
  nat: [['ベトナム', 196], ['インドネシア', 17], ['カンボジア', 6], ['フィリピン', 4], ['ミャンマー', 2]],
  fields: [['工業製品製造業', 27], ['飲食料品製造業', 8], ['外食業', 8], ['建設', 7]],
  prefs: [['愛知県', 20], ['岐阜県', 14], ['三重県', 4], ['滋賀県', 3], ['千葉県', 3], ['東京都', 2], ['兵庫県', 1], ['埼玉県', 1]],
};

// 事例: số người = CRM, không trùng người. 累計 gồm cả người đã có ngày vào sắp tới.
// NHC: CRM ghi 取引停止 (2026-11-04) → chỉ ghi số đã giới thiệu, không ghi "đang hỗ trợ". CEO 2026-11-04: 4 công ty đều đồng ý đăng tên, giữ NHC.
const CASES = {
  kensetsu: { name: '株式会社古屋鉄筋', area: '岐阜県瑞穂市', field: '建設分野', work: '土木（鉄筋）', since: '2024年2月', total: 9, active: 6, nat: 'ベトナム', two: 1,
    pts: ['2024年2月から受入れを開始。毎年 続けて採用', '現在6名が在籍。全員ベトナム出身', '1名が 特定技能2号 へ進みました'] },
  kogyo: { name: '小島工業株式会社', area: '岐阜県美濃加茂市', field: '工業製品製造業分野', work: '機械金属加工（溶接など）', since: '2022年10月', total: 21, active: 10, nat: 'ベトナム', two: 0,
    pts: ['2022年10月から受入れを開始', '毎年 続けて採用し、これまでに21名', '現在10名が在籍。全員ベトナム出身'] },
  inshoku: { name: '毎味水産株式会社', area: '愛知県西尾市', field: '飲食料品製造業分野', work: '飲食料品製造業全般', since: '2023年8月', total: 36, active: 20, nat: 'ベトナム・インドネシア', two: 1,
    pts: ['2023年8月から受入れを開始し、これまでに36名', 'ベトナム16名・インドネシア4名、2つの国籍が在籍', '1名が 特定技能2号 へ進みました'] },
  gaishoku: { name: '株式会社NHCホールディングス', area: '愛知県名古屋市中村区', field: '外食業分野', work: '調理・接客・店舗管理', since: '2024年11月', total: 3, active: null, nat: 'ベトナム', two: 0,
    pts: ['名古屋市の外食企業。2024年11月から受入れ', '2024・2025・2026年と、1年に1名ずつ採用', 'ベトナム出身の3名をご紹介'] },
};

// Số liệu chính phủ: điền từ research (scratchpad/research/*.json). Mỗi khối: { src, url, asOf, ... }.
const GOV = require('./gov.json');

/* ---------- khối hình dùng chung (lớp dx-, màu viết thẳng để dùng được cả trong cp- lẫn tg-) ---------- */
const DX_CSS = `<style>
.dx-hb{display:grid;gap:10px}
.dx-hb>div{display:grid;grid-template-columns:var(--lw,190px) 1fr var(--vw,110px);gap:14px;align-items:center}
.dx-hb b{font-size:var(--fs,17px);font-weight:700;line-height:1.35}
.dx-hb u{display:block;height:var(--bh,30px);background:#eaf1fb;border-radius:0 6px 6px 0;text-decoration:none;position:relative}
.dx-hb u i{position:absolute;left:0;top:0;bottom:0;background:#0b3d91;border-radius:0 6px 6px 0}
.dx-hb .on u i{background:#f5a623}.dx-hb .mu u i{background:#9fb6dc}
.dx-hb span{font:700 var(--vs,20px)/1 Roboto,"Noto Sans JP",sans-serif;color:#0b3d91;text-align:right;white-space:nowrap}.dx-hb span small{font-size:12.5px;font-weight:500;color:#737373;margin-left:3px}
.dx-vb{display:grid;grid-template-columns:repeat(var(--n),1fr);gap:18px;align-items:end;height:var(--h,340px);border-bottom:1.5px solid #202020;padding:0 8px}
.dx-vb>div{display:flex;flex-direction:column;justify-content:flex-end;align-items:center;height:100%}
.dx-vb i{display:block;width:72%;background:#0b3d91;border-radius:6px 6px 0 0}.dx-vb .on i{background:#f5a623}
.dx-vb b{font:700 19px/1 Roboto,"Noto Sans JP",sans-serif;color:#0b3d91;margin-bottom:8px;white-space:nowrap}.dx-vb b small{font-size:12px;color:#737373;margin-left:2px}
.dx-vl{display:grid;grid-template-columns:repeat(var(--n),1fr);gap:18px;padding:10px 8px 0;text-align:center;font-size:14.5px;font-weight:700;color:#444}
.dx-dn{display:grid;grid-template-columns:300px 1fr;gap:36px;align-items:center}.dx-dn svg{width:300px;height:300px;display:block}
.dx-lg{display:grid;gap:4px}.dx-lg>div{display:grid;grid-template-columns:18px 1fr auto;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid #e0e0e0;font-size:17px}
.dx-lg i{width:16px;height:16px;border-radius:4px;display:block}.dx-lg b{font:700 20px/1 Roboto,"Noto Sans JP",sans-serif;color:#0b3d91}.dx-lg b small{font-size:12.5px;color:#737373;font-weight:500;margin-left:4px}
.dx-kp{display:grid;grid-template-columns:repeat(var(--n,4),1fr);gap:16px}
.dx-kp>div{background:#eaf1fb;border-radius:10px;padding:22px 20px}
.dx-kp b{display:block;font:700 46px/1.05 Roboto,"Noto Sans JP",sans-serif;color:#0b3d91;white-space:nowrap}.dx-kp b small{font-size:17px;margin-left:3px;color:#c47d00}
.dx-kp span{display:block;font-size:14.5px;color:#444;margin-top:10px;line-height:1.5}
.dx-src{font-size:12.5px;color:#737373;line-height:1.7;margin-top:14px}
.dx-2{display:grid;grid-template-columns:1fr 1fr;gap:44px}
.dx-h{font-size:15px;font-weight:700;color:#0b3d91;letter-spacing:.06em;margin:0 0 14px;padding-bottom:8px;border-bottom:1px solid #e0e0e0}
.dx-case{display:grid;grid-template-columns:400px 1fr;gap:44px}
.dx-cn{font-size:30px;font-weight:700;line-height:1.35;letter-spacing:.03em}
.dx-ct{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 22px}.dx-ct span{background:#f3f5f8;border-radius:16px;padding:6px 14px;font-size:14px;font-weight:700;color:#444}
.dx-cs{display:grid;grid-template-columns:1fr 1fr;gap:12px}.dx-cs>div{border-top:3px solid #0b3d91;padding-top:12px}
.dx-cs b{display:block;font:700 44px/1.05 Roboto,"Noto Sans JP",sans-serif;color:#0b3d91}.dx-cs b small{font-size:16px;color:#c47d00;margin-left:3px}.dx-cs span{font-size:14px;color:#444}
.dx-cp{display:grid;gap:12px}.dx-cp>div{display:grid;grid-template-columns:48px 1fr;gap:16px;align-items:center;background:#eaf1fb;border-radius:10px;padding:22px 24px;font-size:19px;font-weight:700;line-height:1.5}
.dx-cp i{width:44px;height:44px;border-radius:50%;background:#0b3d91;color:#fff;display:flex;align-items:center;justify-content:center;font:700 16px/1 Roboto,sans-serif;font-style:normal}
.dx-cf{margin-top:18px;font-size:13px;color:#737373;line-height:1.7}
.dx-tb{width:100%;border-collapse:collapse;font-size:15.5px}
.dx-tb th,.dx-tb td{border-bottom:1px solid #e0e0e0;padding:11px 10px;text-align:left;vertical-align:top;line-height:1.55}
.dx-tb th{font-size:14px;color:#0b3d91;letter-spacing:.04em;border-bottom:1.5px solid #0b3d91}.dx-tb td:first-child{font-weight:700;white-space:nowrap}
.dx-tb .n{text-align:right;font:700 17px/1.4 Roboto,"Noto Sans JP",sans-serif;color:#0b3d91;white-space:nowrap}
</style>`;

const fmt = (n) => Number(n).toLocaleString('ja-JP');
const PAL = ['#0b3d91', '#1e6fd6', '#f5a623', '#ffcb05', '#9fb6dc', '#c47d00', '#b5b5b5'];

// thanh ngang: rows = [[nhãn, số, 'on'|'mu'|'']], unit = '人' ...
const hbars = (rows, o = {}) => {
  const max = o.max || Math.max(...rows.map((r) => r[1]));
  const st = ['lw', 'vw', 'bh', 'fs', 'vs'].filter((k) => o[k]).map((k) => `--${k}:${o[k]}`).join(';');
  return `<div class="dx-hb"${st ? ` style="${st}"` : ''}>${rows.map(([l, v, c]) => `<div class="${c || ''}"><b>${l}</b><u><i style="width:${Math.max(1.5, v / max * 100).toFixed(1)}%"></i></u><span>${o.dec ? v.toFixed(o.dec) : fmt(v)}<small>${o.unit || ''}</small></span></div>`).join('')}</div>`;
};
// cột đứng (xu hướng): rows = [[nhãn, số, 'on'?]]
const vbars = (rows, o = {}) => {
  const max = o.max || Math.max(...rows.map((r) => r[1]));
  return `<div class="dx-vb" style="--n:${rows.length};--h:${o.h || 340}px">${rows.map(([, v, c]) => `<div class="${c || ''}"><b>${o.lab ? o.lab(v) : fmt(v)}<small>${o.unit || ''}</small></b><i style="height:${(v / max * 82).toFixed(1)}%"></i></div>`).join('')}</div><div class="dx-vl" style="--n:${rows.length}">${rows.map((r) => `<span>${r[0]}</span>`).join('')}</div>`;
};
// donut: parts = [[nhãn, số]], các phần nhỏ gộp "その他" nếu o.top
const donut = (parts, center, o = {}) => {
  let p = parts.slice();
  if (o.top && p.length > o.top) { const rest = p.slice(o.top).reduce((s, x) => s + x[1], 0); p = p.slice(0, o.top).concat([['その他', rest]]); }
  const tot = p.reduce((s, x) => s + x[1], 0); let a = -Math.PI / 2; const R = 130, r = 82, C = 150;
  const arcs = p.map(([, v], i) => {
    const f = v / tot; if (f >= .9999) return `<circle cx="${C}" cy="${C}" r="${(R + r) / 2}" fill="none" stroke="${PAL[i]}" stroke-width="${R - r}"/>`;
    const b = a + f * 2 * Math.PI, L = f > .5 ? 1 : 0, P = (rr, t) => `${(C + rr * Math.cos(t)).toFixed(2)} ${(C + rr * Math.sin(t)).toFixed(2)}`;
    const d = `M${P(R, a)}A${R} ${R} 0 ${L} 1 ${P(R, b)}L${P(r, b)}A${r} ${r} 0 ${L} 0 ${P(r, a)}Z`; a = b; return `<path d="${d}" fill="${PAL[i]}"/>`;
  }).join('');
  return `<div class="dx-dn"><svg viewBox="0 0 300 300" role="img" aria-label="${center[1]}">${arcs}<text x="150" y="146" text-anchor="middle" font-family="Roboto,Noto Sans JP,sans-serif" font-size="40" font-weight="700" fill="#0b3d91">${center[0]}</text><text x="150" y="178" text-anchor="middle" font-family="Noto Sans JP,sans-serif" font-size="15" fill="#444">${center[1]}</text></svg>
  <div class="dx-lg">${p.map(([l, v], i) => `<div><i style="background:${PAL[i]}"></i><span>${l}</span><b>${o.pct ? (v / tot * 100).toFixed(1) + '<small>%</small>' : fmt(v) + `<small>${o.unit || ''}</small>`}</b></div>`).join('')}</div></div>`;
};
const kpis = (a, n) => `<div class="dx-kp" style="--n:${n || a.length}">${a.map(([v, u, l]) => `<div><b>${v}<small>${u}</small></b><span>${l}</span></div>`).join('')}</div>`;
const src = (t) => `<p class="dx-src">出典：${t}</p>`;
const table = (head, rows, numCols = []) => `<table class="dx-tb"><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td${numCols.includes(i) ? ' class="n"' : ''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
// 1 事例 = 1 trang thân
const caseBody = (c) => `<div class="dx-case">
  <div><div class="dx-cn">${c.name}</div><div class="dx-ct"><span>${c.area}</span><span>${c.field}</span><span>${c.work}</span></div>
    <div class="dx-cs">
      <div><b>${c.since.replace(/年.*/, '')}<small>年〜</small></b><span>受入れ開始（${c.since}）</span></div>
      <div><b>${c.total}<small>名</small></b><span>これまでの受入れ（入社予定を含む）</span></div>
      ${c.active ? `<div><b>${c.active}<small>名</small></b><span>現在 在籍</span></div>` : ''}
      <div><b style="font-size:${c.nat.length > 6 ? 26 : 38}px;line-height:1.35">${c.nat}</b><span>国籍</span></div>
      ${c.two ? `<div><b>${c.two}<small>名</small></b><span>特定技能2号へ</span></div>` : ''}
    </div></div>
  <div><div class="dx-h">POINT</div><div class="dx-cp">${c.pts.map((t, i) => `<div><i>${i + 1}</i>${t}</div>`).join('')}</div>
    <p class="dx-cf">※人数はBIGLIGHTの支援記録より（${BL.asOf}）。社名は企業さまのご了承を得て掲載しています。</p></div>
</div>`;

module.exports = { BL, CASES, GOV, DX_CSS, hbars, vbars, donut, kpis, src, table, caseBody, fmt };
