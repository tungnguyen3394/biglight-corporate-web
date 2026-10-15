// Nội dung chỉ hiện từ một ngày (giờ Nhật). build.cjs đọc để bật/tắt; deploy-new.yml gộp danh sách đang bật vào mã băm
// → lần chạy theo lịch đầu tiên sau 0:00 JST tự build + deploy lại. `node redesign/gates.cjs` in danh sách đang bật.
const FROM = {
  'aichi-sdgs': '2026-10-16', // あいちSDGsパートナーズ 登録日 — logo/banner chỉ được dùng trong thời gian đăng ký
};
const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Tokyo' }).format(new Date());
const on = (k) => today >= FROM[k];
module.exports = { FROM, on, today };
if (require.main === module) console.log(Object.keys(FROM).filter(on).join(','));
