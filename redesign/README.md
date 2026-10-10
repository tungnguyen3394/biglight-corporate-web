# redesign — giao diện mới biglight.jp (bản xem trước: https://new.biglight.jp)

- Nguồn: `build.cjs` (HTML/CSS/JS sinh bằng Node, không phụ thuộc gói ngoài) + `seo.cjs` (canonical, OGP, JSON-LD, sitemap, robots) + ảnh trong `src/`.
- Chạy thử trên máy: `node redesign/build.cjs` → `redesign/dist/` (mở bằng một máy chủ tĩnh bất kỳ).
- Deploy: push nhánh `redesign` → workflow `deploy-new.yml` → new.biglight.jp (~2 phút). Web chính biglight.jp không bị đụng.
- Giai đoạn xem trước new.biglight.jp bị chặn Google (`X-Robots-Tag: noindex` ở nhãn Caddy). Canonical/sitemap đã trỏ về https://biglight.jp.

## Việc còn lại trước khi thay biglight.jp
1. Form お問い合わせ / 資料ダウンロード nối admin.biglight.jp (/api/inquiry, /api/download) + Turnstile.
2. 301 từ URL cũ: /service/jinzai-shoukai/ → /service/engineer/, /sdgs/ → /about/sdgs/, /service/tokutei-ginou/<ngành>/ → /service/field/<ngành>/, /service/teichaku/, /flow/ …
3. /news/ đọc từ admin.biglight.jp (hiện chỉ có 2 bài mẫu theo template mới).
4. Trang privacy / optout / faq (chép từ bản cũ).
5. Thay biglight.jp: đổi nhãn Caddy, bỏ noindex, gửi sitemap lên Google Search Console.
