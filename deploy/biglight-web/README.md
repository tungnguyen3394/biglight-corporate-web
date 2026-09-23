# biglight.jp trên VPS — cấu hình chạy thật

| Thứ | Ở đâu trên VPS | Nguồn sự thật |
|---|---|---|
| nginx | `/root/biglight-web/nginx/default.conf` (mount cả thư mục) | `deploy/biglight-web/nginx/default.conf` — **repo này** |
| compose | `/root/biglight-web/docker-compose.yml` | `deploy/biglight-web/docker-compose.yml` — **repo này** |
| nội dung trang | `/var/www/biglight` (checkout git của repo này, ff tới `origin/main`) | **repo này** — `deploy-site.yml`, có khoá an toàn |
| `/news/`, `/assets/uploads/`, `sitemap.xml` | trong `/var/www/biglight` | admin.biglight.jp sinh ra, repo không theo dõi, deploy không đụng |

## Deploy cấu hình
Push lên `main` bất kỳ file nào trong `deploy/biglight-web/` → `.github/workflows/deploy-web-config.yml`:
kiểm cú pháp nginx trên runner → sao lưu bản đang chạy vào `/root/biglight-web/_prev/` → chép lên →
`docker compose up -d` → `nginx -t` + reload → đo tại VPS (`/`=200, `/index.html`=301, `/about/`=200)
→ đo qua HTTPS thật. Sai một mục là tự lùi về `_prev` và báo đỏ.

Xem cấu hình đang chạy mà không sửa gì: `gh workflow run vps-read.yml` rồi `gh run view --log`.

## Nội dung trang — đã đồng bộ 2026-09-24, deploy tự động có khoá an toàn
Sáng 24/9 đã gom nguyên trạng production về repo (`vps-snapshot.yml` → nhánh `vps-production` → hợp nhất
vào `main`, **production thắng mọi xung đột**, 8 trang demo/名刺 cũ production đã xoá thì main cũng bỏ —
vẫn lấy lại được bằng `git show 0bf5a26:biglight-demo.html`). Commit `8185949` (video tải có điều kiện) vì
thế KHÔNG còn hiệu lực trên `index.html`; muốn dùng lại thì áp lại trên bản hiện tại.

Từ nay: sửa nội dung → push `main` → `deploy-site.yml` fast-forward `/var/www/biglight` rồi đo / /about/ /news/.
Khoá an toàn (ưu tiên hiện trạng): VPS có file bị sửa tay chưa gom hoặc có commit riêng → workflow **đỏ và không
ghi đè**; chạy `gh workflow run vps-snapshot.yml` để gom về nhánh `vps-production`, hợp nhất vào main, deploy lại.
Không bao giờ đụng: `/news/`, `/assets/uploads/`, `sitemap.xml` (admin sinh; đã bỏ theo dõi), `*.bak*`, `_icon_bak/`.

## Bài học 2026-09-23
- `location = /index.html { return 301 /; }` + `index index.html;` = lặp vô hạn. Phải xét `$request_uri`.
- Sửa nginx xong **phải mở lại trang chủ**. Workflow deploy giờ làm việc đó thay người.
- Mount một file theo inode: sửa xong `reload` không ăn; mount thư mục thì ăn.
