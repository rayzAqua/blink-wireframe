# Wireframe cấu hình luồng xác thực

## 1. Mục đích và phạm vi

Tài liệu mô tả màn hình để Blink Admin xem và điều chỉnh ba chính sách xác thực
đã được Backend hỗ trợ. Không có màn hình xem secret, khóa dịch vụ hoặc cấu
hình hạ tầng.

## 2. Người dùng và nơi hiển thị

- **Người dùng:** Blink Admin có quyền xem hoặc cập nhật cấu hình Auth.
- **Nơi hiển thị:** 🖥️ **ADMIN UI**.
- **Điểm vào:** Cấu hình hệ thống → Luồng xác thực.

## 3. Bản đồ luồng

```text
Mở cấu hình Auth
  → Xem ba chính sách và trạng thái thực tế
  → Chọn một chính sách
  → Bật hoặc tắt + nhập lý do
  → Xác nhận
  ├─ Thành công → Hiển thị giá trị mới
  ├─ Điều kiện chưa sẵn sàng → Giữ giá trị cũ và giải thích lý do
  └─ Có người vừa sửa → Tải lại dữ liệu mới nhất
```

## 4. Các màn hình

### AUTH-01 — Danh sách chính sách xác thực

- **Hiển thị:** ba thẻ **Yêu cầu đồng ý điều khoản khi đăng ký**, **Yêu cầu bổ
  sung số điện thoại cho tài khoản mạng xã hội cũ** và **Cho phép đăng nhập
  email kiểu cũ**.
- Mỗi thẻ cho biết giá trị Admin đã chọn, trạng thái đang thực sự có hiệu lực,
  mức sẵn sàng, thời gian và người cập nhật gần nhất.
- Khi toàn bộ cấu hình động bị vô hiệu hóa ở cấp hệ thống, hiển thị banner rằng
  ứng dụng đang dùng giá trị an toàn mặc định; không hiển thị hay cho sửa biến
  hạ tầng.
- **Thao tác:** chọn một thẻ để xem và chỉnh sửa.

### AUTH-02 — Chi tiết một chính sách

- **Hiển thị:** tên dễ hiểu, tác động khi bật/tắt, trạng thái Admin đã lưu,
  trạng thái có hiệu lực và lý do chưa thể áp dụng nếu có.
- Chính sách điều khoản bị chặn khi chưa có đủ văn bản đang hiệu lực.
- Chính sách số điện thoại bị chặn khi dịch vụ gửi mã xác minh chưa sẵn sàng.
- **Thao tác chính:** Bật hoặc tắt.
- **Thao tác phụ:** Quay lại mà không lưu.

### AUTH-03 — Xác nhận thay đổi

- **Bắt buộc:** nhập lý do từ 5 đến 500 ký tự.
- **Hiển thị:** giá trị hiện tại, giá trị mới và ảnh hưởng chính tới người dùng.
- **Thao tác chính:** Xác nhận thay đổi.
- **Thao tác phụ:** Hủy.

### AUTH-04 — Kết quả

- Thành công: trở về chi tiết với trạng thái mới và thông báo thay đổi đã lưu.
- Chưa đủ điều kiện: giữ nguyên giá trị cũ, hiển thị việc cần hoàn thiện trước.
- Dữ liệu vừa thay đổi: thông báo một Admin khác đã cập nhật, tải lại bản mới và
  yêu cầu người dùng xem lại trước khi thử lại.
- Thiếu quyền: hiển thị quyền còn thiếu theo quy tắc dành cho Blink Admin.

## 5. Audit và phần chưa hỗ trợ

- Mọi thay đổi thành công lưu người thực hiện, giá trị trước/sau và lý do trong
  Admin Audit. Không cần hiện thông báo “đã ghi Audit” trên màn hình.
- Không hỗ trợ tạo khóa cấu hình mới, hẹn lịch bật/tắt, rollout theo phần trăm
  hoặc chỉnh OTP/JWT/OAuth/SMS secret.
