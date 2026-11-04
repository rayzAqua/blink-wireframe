# Luồng màn hình đặt phòng cho CTV — BBN-085

Tất cả màn hình dưới đây thuộc Flutter app/React PWA sau đăng nhập, trừ trang
khách xác nhận đơn đã có là web công khai. Task này chỉ xây API, không sửa client.

1. **Chọn quán:** tìm quán đang nhận đặt phòng; không bắt buộc đang hợp tác.
   Chọn quán để xem phòng. Quán không còn nhận đặt thì thông báo chọn quán khác.
2. **Tìm phòng:** nhập giờ đến/giờ kết thúc và số khách (1–1.000). Hiển thị
   phòng, sức chứa danh nghĩa, giá theo khung giờ và khả năng nhận đặt. Phòng
   có sức chứa nhận tối đa sức chứa + 10, không quá 1.000. Chọn phòng để đặt.
3. **Tạo đơn:** nhập tên/số điện thoại khách, số khách, thời lượng, ghi chú;
   xác nhận tạo. Thành công mở chi tiết đơn và link gửi khách xác nhận. Nếu
   phòng vừa có người đặt, giữ form và yêu cầu chọn lại. Không tự lưu danh bạ.
4. **Đơn của tôi:** danh sách đơn do chính CTV tạo tại quán đang chọn, lọc
   trạng thái/ngày; không hiển thị đơn của người khác. Chọn đơn để xem chi tiết.
5. **Chi tiết:** quán/phòng, giờ, khách, trạng thái, lịch sử an toàn, link gửi
   khách. Khi chưa nhận phòng có Sửa thông tin, Đổi lịch/phòng và Hủy. Khi đã
   nhận phòng/đã kết thúc chỉ xem. Không có nút nhận phòng hoặc checkout.
6. **Sửa:** giữ dữ liệu hiện hành, sửa khách/số khách/ghi chú hoặc lịch/phòng
   trong cùng quán. Lưu thành công trở về chi tiết; nếu dữ liệu đã thay đổi,
   tải lại và báo rõ, không ghi đè. Không đủ chỗ hoặc trùng lịch thì chọn lại.
7. **Hủy:** nhập lý do bắt buộc, xác nhận, trở về chi tiết đã hủy. Nếu quán vừa
   nhận phòng thì tải lại và báo không thể hủy. Không xóa lịch sử đơn.

Nếu hồ sơ CTV không hoạt động hoặc điều khoản mới chưa được đồng ý, chặn thao
tác và hướng dẫn quay lại hồ sơ/điều khoản. Trang khách mở từ link vẫn dùng
luồng xác nhận công khai hiện hành, không nhận quyền truy cập danh sách CTV.

## Đồng ý điều khoản mới — Flutter app/React PWA, không phải web public

- Khi vào chức năng CTV và cần đồng ý lại, mở màn hình “Điều khoản CTV”.
  Hiển thị tiêu đề, phiên bản và nội dung/đường dẫn tài liệu đang có hiệu lực.
- Người dùng đánh dấu đồng ý rồi bấm “Đồng ý và tiếp tục”. Không đánh dấu
  thì chưa cho tiếp tục; có thể thoát, không xóa hồ sơ hoặc dữ liệu đơn.
- Thành công quay lại màn hình định mở. Không bắt nhập lại hồ sơ/đăng ký CTV.
- Nếu nội dung vừa được cập nhật, tải lại và yêu cầu đọc/đồng ý phiên bản mới;
  không tự gửi xác nhận bản mới mà người dùng chưa đọc.
- Nếu tài khoản/hồ sơ bị chặn thì hiển thị thông báo phù hợp; đồng ý điều khoản
  không tự khôi phục tài khoản hoặc tư cách CTV đã ngừng hoạt động.
- Chức năng đồng ý điều khoản chỉ có trong app/PWA đã đăng nhập. Link khách
  xác nhận đặt phòng vẫn là web public và không có quyền chấp nhận thay CTV.
