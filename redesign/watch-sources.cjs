// Theo dõi trang nguồn của facts.json (watch: "html" | "pdf"). Tải về, lấy phần nội dung chính, băm, so với lần trước (redesign/watch.json).
// Không tự sửa web: chỉ in danh sách nguồn đã đổi; workflow watch-sources.yml mở GitHub Issue cho người phụ trách kiểm rồi sửa facts.json.
// Chạy tay: node redesign/watch-sources.cjs [--write] [--test]   (--write: ghi watch.json; --test: coi như mọi nguồn đổi, để thử thông báo)
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const F = JSON.parse(fs.readFileSync(path.join(__dirname, 'facts.json'), 'utf8'));
const STATE = path.join(__dirname, 'watch.json');
const prev = fs.existsSync(STATE) ? JSON.parse(fs.readFileSync(STATE, 'utf8')) : {};
const WRITE = process.argv.includes('--write'), TEST = process.argv.includes('--test');
const sha = (b) => crypto.createHash('sha256').update(b).digest('hex').slice(0, 16);
// HTML: bỏ script/style/nav/header/footer, thẻ, khoảng trắng → chỉ còn chữ của phần thân (banner/ngày sinh tự động không làm báo giả)
const mainText = (h) => h.replace(/<(script|style|noscript|nav|header|footer|iframe)[\s\S]*?<\/\1>/gi, '').replace(/<!--[\s\S]*?-->/g, '')
  .replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
async function get(url) {
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; biglight-watch/1.0; +https://biglight.jp/)' }, redirect: 'follow' });
  const b = Buffer.from(await r.arrayBuffer());
  return { status: r.status, body: b };
}
(async () => {
  const today = new Date().toISOString().slice(0, 10);
  const out = {}, changed = [], errors = [];
  for (const [k, s] of Object.entries(F.sources)) {
    if (!s.watch) continue;
    try {
      const { status, body } = await get(s.url);
      if (status !== 200) { errors.push(`${s.name}: HTTP ${status} ${s.url}`); out[k] = Object.assign({}, prev[k], { error: status, checked: today }); continue; }
      const text = s.watch === 'pdf' ? body : Buffer.from(mainText(body.toString('utf8')));
      const h = sha(text), size = text.length;
      const was = prev[k];
      out[k] = { url: s.url, hash: h, size, checked: today, changed: was && was.hash !== h ? today : (was && was.changed) || today };
      if ((was && was.hash && was.hash !== h) || TEST) changed.push({ key: k, name: s.name, url: s.url, before: was ? was.hash : '-', after: h, sizeBefore: was ? was.size : 0, sizeAfter: size });
    } catch (e) { errors.push(`${s.name}: ${e.message}`); out[k] = Object.assign({}, prev[k], { error: e.message, checked: today }); }
  }
  if (WRITE) fs.writeFileSync(STATE, JSON.stringify(out, null, 1) + '\n');
  const used = (k) => F.facts.filter((x) => x.source === k).map((x) => `${F.fields[x.field].name}／${x.item}`);
  const md = [];
  if (changed.length) {
    md.push(`## 出典が更新されました（${today}）`, '', '内容を確認し、変わっていれば `redesign/facts.json` の value・status・verified_at を直してください（web は自動更新）。', '');
    for (const c of changed) md.push(`- [${c.name}](${c.url})　${c.sizeBefore}→${c.sizeAfter} bytes`, ...used(c.key).map((u) => `  - 使っている項目: ${u}`));
  }
  if (errors.length) md.push('', '## 読めなかった出典', ...errors.map((e) => `- ${e}`));
  const report = md.join('\n');
  console.log(report || `変更なし（${Object.keys(out).length} 件を確認、${today}）`);
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed.length || errors.length ? 1 : 0}\n`);
  if (process.env.GITHUB_OUTPUT) fs.writeFileSync(path.join(__dirname, 'watch-report.md'), report);
})();
