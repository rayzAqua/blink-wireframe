# Màn hình bảng xếp hạng Booking

Phạm vi: trong ứng dụng Flutter hoặc React PWA đã đăng nhập, không phải trang
public. Mở từ cơ sở đang thao tác; chỉ hiện khi người dùng được phép xem xếp hạng.

## Nội dung và thao tác

- Tiêu đề “Bảng xếp hạng Booking” và tên cơ sở đang xem.
- Chọn ngày bắt đầu/kết thúc; mặc định ngày vận hành hiện tại. Giới hạn tối đa
  90 ngày, không chọn tương lai. Ghi chú ngày được tính từ giờ mở cửa của quán.
- Mỗi dòng có thứ hạng, biệt danh công việc và số đơn đã hoàn thành. Owner chưa
  có biệt danh công việc hiển thị “Chủ cơ sở”; không lấy tên danh tính thay thế.
- Đếm đơn theo thời điểm tạo trong kỳ và trạng thái đã hoàn thành tại lúc xem.
  Đơn CTV không tính vào thành tích nội bộ. Không hiển thị tiền/hoa hồng.
- Không có dữ liệu: “Chưa có đơn hoàn thành trong khoảng thời gian này”.
- Lỗi tải: giữ bộ lọc, có nút Thử lại. Không có quyền: thông báo chung, không
  hiển thị danh sách hoặc dữ liệu của cơ sở khác.

Chức năng chỉ xem, không sửa kết quả hoặc hồ sơ nhân sự từ đây. Không phải
màn hình lịch sử đơn hoặc Audit của Admin. Chưa nối giao diện trong task BE.
