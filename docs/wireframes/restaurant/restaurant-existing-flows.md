# Điều chỉnh màn hình Restaurant hiện có

Các màn hình quản lý nằm trong Flutter/React PWA; Admin dùng web quản trị.
Không có màn hình public hoặc link bí mật mới trong đợt này.

- Đăng ký nhà hàng: tên và địa chỉ bắt buộc; hotline, logo và ảnh bìa tùy
  chọn, có thể bổ sung sau. Gửi lại sau mất mạng không tạo thêm nhà hàng.
- Quan hệ hợp tác: tách yêu cầu đã gửi và nhận. Bên nhận được chấp nhận hoặc
  từ chối; từ chối mở hộp nhập lý do bắt buộc. Gửi lại quan hệ đã từ chối/
  kết thúc mở vòng chờ mới, lịch sử cũ còn để đối chiếu.
- Tạm dừng: hiển thị bên tạm dừng. Chỉ bên đó hoặc Admin được khôi phục;
  không cho cơ sở tự gỡ quyết định quản trị Blink.
- Khi ai khác đã xử lý hoặc cơ sở không còn được phép hoạt động: tải lại
  dữ liệu và báo rõ không thể tiếp tục, không giả báo thành công.
- Hậu kiểm nhà hàng: Owner xem yêu cầu, sửa hồ sơ hiện có, gửi phản hồi.
  Admin xem lịch sử, yêu cầu bổ sung, kết luận/mở lại; hạn chế/tạm dừng/
  khôi phục có lý do; chấm dứt qua xem trước và xác nhận như Karaoke.
- Lịch sử nghiệp vụ không phải màn hình Admin Audit; không cấp quyền Audit
  hệ thống cho Restaurant.
