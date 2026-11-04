# Màn hình quản lý món ăn

Trạng thái: theo design.md đã duyệt; chưa triển khai giao diện.
Tất cả thao tác nằm trong App Flutter hoặc PWA React của Restaurant đã đăng
nhập, không có màn hình public hay link lời mời trong luồng này.

## 1. Danh sách món

Tên cơ sở đang thao tác → ô tìm tên → bộ lọc Tất cả / Đang bán / Ngừng bán.
Mỗi dòng: ảnh hoặc hình thay thế, tên món, giá có đơn vị đ, trạng thái.
Có nút Thêm món, tải thêm/chuyển trang, trạng thái danh sách rỗng và lỗi tải.
Chọn dòng mở chi tiết, không đổi trạng thái ngay khi chạm vào thẻ.

## 2. Thêm món

Tên món *, giá VND *, mô tả và một ảnh tùy chọn; mặc định Đang bán.
Ảnh đang tải chưa được lưu; lỗi tải cho thử lại/gỡ ảnh. Nút Lưu vô hiệu khi
đang gửi; lỗi tên trùng giữ nguyên dữ liệu để người dùng sửa tên.
Không có trường tồn kho, hết hàng, menu, combo, VAT hoặc danh mục.

## 3. Chi tiết và chỉnh sửa

Hiển thị đủ thông tin; nút Chỉnh sửa, Ngừng bán/Bán lại, Xóa món.
Đổi trạng thái chỉ thay khả năng bán, không xóa dữ liệu. Cho thay/gỡ ảnh.
Nếu dữ liệu đã được người khác thay đổi: thông báo và yêu cầu tải lại trước
khi lưu, không ghi đè tự động. Hủy chỉnh sửa giữ nguyên món đã lưu.

## 4. Xóa món

Hộp xác nhận có tên món; giải thích món không còn trong danh sách hiện tại,
lịch sử được giữ. Thành công quay về danh sách. Không có nút xóa hàng loạt.

## 5. Quyền, trạng thái cơ sở và lịch sử

Thiếu quyền: “Bạn không có quyền truy cập”. Cơ sở bị chặn thao tác hiển thị lý
do phù hợp từ quyết định hoạt động hiện có, không cho bấm lưu để vượt chặn.
Ghi Audit mỗi lần tạo/sửa/đổi trạng thái/xóa, gồm người thao tác và thay đổi.
Nhật ký hệ thống dành cho Blink Admin ở giao diện Audit hiện có; task này
không tạo màn hình Audit hoặc cấp quyền xem Audit cho Restaurant.
