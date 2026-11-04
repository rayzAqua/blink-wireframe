# Màn hình đơn theo vai trò

Trong Flutter/React PWA đã đăng nhập, không phải trang public.

- Booking: danh sách đơn của chính mình, chi tiết khách/phòng/lịch. Khi có bộ
  tính hoa hồng mới hiện tiền hoa hồng; không có khối doanh thu.
- TableHost: danh sách đơn cơ sở, chi tiết để phục vụ, nút theo quyền thao tác.
  Không có khối hoa hồng. Tiền phòng + món chỉ hiện khi có dữ liệu tính tiền thật.
- Lễ tân: mỗi thẻ có mã check-in, tên khách và điện thoại. Không có ghi chú,
  lịch sử thao tác, món, tag, tiền hoặc link xác nhận. Có thể xem các đơn đã
  kết thúc. Bảng phòng vẫn hiển thị trạng thái phòng theo nghiệp vụ hiện có.
- Cấp quản lý: thông tin đầy đủ theo quyền và cơ sở quản lý.

Không có quyền: thông báo chung. Không có số tiền thật: không hiển thị 0 như
một kết quả đã tính. Không ẩn dữ liệu nhạy cảm bằng CSS; API không gửi dữ liệu đó.
