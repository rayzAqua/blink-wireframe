# BBN-069 — Bàn giao trải nghiệm gắn nhãn đơn

Brief cho Designer theo [thiết kế đã duyệt](../../../../initiatives/booking-tagging/design.md). Đợt này chỉ triển khai
Backend; các màn hình dưới đây là bàn giao cho giai đoạn giao diện.

## Quản lý nhãn — React PWA

Owner và Manager mở phần Quản lý nhãn từ quản lý cơ sở. Vice chỉ thấy chức năng
khi được cấp quyền. Danh sách hiển thị tên, icon, màu và thứ tự; mặc định là nhãn
đang sử dụng, có lựa chọn xem nhãn đã ngừng dùng. Không hiển thị chức năng này
cho Booking, TableHost và Lễ tân.

Chọn Tạo nhãn để mở form tên, chọn icon, chọn màu và thứ tự. Lưu thành công quay
về danh sách. Tên trống, tên quá dài, màu không hợp lệ hoặc trùng tên phải báo
ngay tại form, giữ nguyên dữ liệu để sửa. Tên trùng với nhãn ngừng dùng cũng cần
báo trùng; không tự kích hoạt lại.

Chọn một nhãn để sửa thông tin hoặc ngừng sử dụng/kích hoạt lại. Thông tin mới
hiển thị ngay trên cả đơn đang phục vụ và đơn trong lịch sử. Ngừng dùng không
làm mất nhãn trên đơn cũ; nhãn đó không còn được chọn cho đơn khác. Nếu người
khác vừa sửa, báo dữ liệu đã thay đổi và cho tải lại trước khi lưu tiếp.

## Gắn nhãn đơn — React PWA và Flutter app

Từ danh sách hoặc chi tiết đơn, nhân sự có quyền mở bộ chọn nhãn. Mỗi lựa chọn
hiển thị icon, tên và màu; chỉ chọn một nhãn hoặc Bỏ nhãn. Tạo đơn cũng có cùng
bộ chọn khi nhân sự đủ quyền. Nhãn là dấu hiệu nhận biết, không thay đổi loại
đơn đặt trước, hotline hoặc khách vãng lai.

Booking chỉ sửa nhãn đơn do lần làm việc hiện tại của mình tạo. TableHost chỉ
sửa nhãn khi khách đang dùng phòng và mình là người tạo đơn hoặc mở phòng.
Lễ tân nhìn thấy nhãn nhưng không có thao tác sửa. Đơn đã kết thúc hoặc đã hủy
chỉ hiển thị nhãn. Thu ngân không nằm trong giai đoạn này.

Lưu thành công cập nhật nhãn trên danh sách và chi tiết. Nếu nhãn vừa ngừng dùng,
báo nhãn không còn sử dụng và tải lại bộ chọn; giữ nguyên nhãn đang gắn. Nếu đơn
vừa thay đổi hoặc kết thúc, báo thay đổi và tải lại chi tiết; không tự ghi đè.
Nếu mất quyền, báo không có quyền và cập nhật lại thao tác hiển thị.

Danh sách hỗ trợ lọc theo một nhãn hoặc chỉ xem đơn chưa có nhãn; không chọn
cùng lúc cả hai điều kiện. Lịch sử đơn thể hiện thao tác gắn/gỡ theo trải nghiệm
lịch sử hiện có, không mở màn hình Admin Audit cho nhân sự cơ sở.

## Xác nhận của khách — public web

Trang xác nhận đơn của khách giữ nội dung đặt phòng hiện tại, không hiển thị
nhãn nội bộ. Sau khi xác nhận, khách nhận kết quả xác nhận thông thường.
