# biglight.jp trên VPS — cấu hình chạy thật

| Thứ | Ở đâu trên VPS | Nguồn sự thật |
|---|---|---|
| nginx | `/root/biglight-web/nginx/default.conf` (mount cả thư mục) | `deploy/biglight-web/nginx/default.conf` — **repo này** |
| compose | `/root/biglight-web/docker-compose.yml` | `deploy/biglight-web/docker-compose.yml` — **repo này** |
| nội dung trang | `/var/www/biglight` (một bản checkout git của repo này) | **VPS** — xem mục dưới |
| `/news/`, `sitemap.xml` | trong `/var/www/biglight` | admin.biglight.jp sinh ra, repo không giữ |

## Deploy cấu hình
Push lên `main` bất kỳ file nào trong `deploy/biglight-web/` → `.github/workflows/deploy-web-config.yml`:
kiểm cú pháp nginx trên runner → sao lưu bản đang chạy vào `/root/biglight-web/_prev/` → chép lên →
`docker compose up -d` → `nginx -t` + reload → đo tại VPS (`/`=200, `/index.html`=301, `/about/`=200)
→ đo qua HTTPS thật. Sai một mục là tự lùi về `_prev` và báo đỏ.

Xem cấu hình đang chạy mà không sửa gì: `gh workflow run vps-read.yml` rồi `gh run view --log`.

## Nội dung trang: production ĐANG MỚI HƠN repo (tình trạng 2026-09-23)
`/var/www/biglight` là checkout git nhưng có:
- 1 commit cục bộ chưa push (`seo: news in sitemap, noindex tags, 301/410 legacy urls`, 23/9 16:10 JST);
- sửa tay chưa commit ở `index.html` và mọi trang con, thêm `sdgs/`, ảnh hero ngành, video, favicon;
- hàng chục file `*.bak-*` để lại sau các lần sửa tay (nginx đã chặn, không tải được từ ngoài).

Trong khi `origin/main` có commit `8185949` (tải video có điều kiện) chưa có trên production.
→ **Chưa được chép nội dung từ repo lên VPS** cho tới khi gom production về repo. Cách gom (làm trên VPS,
Termius): `cd /var/www/biglight && git add -A ':!*.bak*' ':!_icon_bak' ':!news' && git commit -m "production 2026-09-23" && git push origin HEAD:vps-production`
rồi hợp nhất `vps-production` vào `main` trên máy làm việc, giải quyết xung đột `index.html` với `8185949`.

## Bài học 2026-09-23
- `location = /index.html { return 301 /; }` + `index index.html;` = lặp vô hạn. Phải xét `$request_uri`.
- Sửa nginx xong **phải mở lại trang chủ**. Workflow deploy giờ làm việc đó thay người.
- Mount một file theo inode: sửa xong `reload` không ăn; mount thư mục thì ăn.
