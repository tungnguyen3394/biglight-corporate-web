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

## 物流人材（自動車運送業・物流倉庫）— 2026-11-03
- Trang: `/logistics/`（まとめ・比較・タイムライン・条件・FAQ・出典）, `/logistics/check/`（受入れ診断 → お問い合わせ）, `/service/field/soko/`（物流倉庫, khuôn fieldPage), `/service/field/unso/` (có thêm khối「制度の現在地」), `/guide/field/soko/` (PDF).
- **Số liệu, trạng thái (確定/調整中/予定), nguồn, ngày kiểm tra = `redesign/facts.json`**. Sửa file này rồi push nhánh `redesign` → mọi trang tự đổi (bảng so sánh, timeline, checklist, 最終更新日, dateModified, sitemap lastmod). Chữ dẫn dắt/FAQ ở `redesign/logistics.cjs`; nội dung ngành ở `FIELDS` (build.cjs) + `SHIRYO.FIELDS` (shiryo.cjs).
- Theo dõi nguồn: `.github/workflows/watch-sources.yml` (thứ Hai 09:00 JST, cũng phải có trên `main` vì GitHub chỉ chạy lịch ở nhánh mặc định) chạy `redesign/watch-sources.cjs` → đổi thì mở GitHub Issue (mail từ GitHub) + ghi `redesign/watch.json`. Thử: Run workflow với test = true. Không tự sửa web.
- Form 診断 gửi `/api/inquiry` (admin) kind「無料相談（物流人材・受入れ診断）」, câu trả lời nằm trong 内容. 資料請求 ガイド 倉庫 cần CRM `field-soko` (DOC_KINDS) + sales chip.
- 2026-11-03 **物流人材ガイド** `/guide/logistics/` + `/assets/biglight-logistics.pdf` (A4 ngang 17 trang, `shiryo.cjs` exports.logistics, số liệu đọc từ `facts.json` → sửa facts là PDF đổi ở lần deploy sau; URL ?v= = md5(shiryo.cjs+facts.json)). 資料請求 id `logistics` (MATERIALS) — CRM MATERIALS/DOC_KINDS + sales chip 物流ガイド.
