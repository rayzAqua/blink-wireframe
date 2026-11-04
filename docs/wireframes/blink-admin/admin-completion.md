# Điều chỉnh màn hình Admin Blink

Theo design.md đã duyệt. Tất cả màn thuộc **ADMIN UI**, sau đăng nhập; không có
web công khai, Flutter hoặc React PWA người dùng. Không xây lại màn đã có.

## 1. Xem dữ liệu vận hành cơ sở

Admin mở chi tiết cơ sở, phòng, ảnh, bảng giá, giờ hoạt động hoặc ngân hàng.
Giữ nội dung tra cứu và điều hướng hiện có; bỏ nút/form tạo, sửa, xoá thuộc cơ
sở. Có thể hiển thị chú thích “Thông tin do cơ sở quản lý”. Không thay nút ghi
bằng nút giả hoặc cho Admin đóng vai nhân sự. Lỗi tải cho thử lại; không hiển
thị dữ liệu cơ sở trước khi chuyển sang cơ sở mới. Owner/Manager vẫn thao tác
ở ứng dụng cơ sở theo quyền riêng.

## 2. Duyệt giấy tờ

Từ danh sách giấy tờ chờ xử lý, Admin xem thông tin rồi chọn duyệt hoặc từ chối;
từ chối nhập lý do theo luồng hiện có. Trong khi gửi không cho nhấn lặp.

Thành công tải lại trạng thái. Nếu Admin khác đã xử lý, thông báo “Giấy tờ đã
được xử lý. Vui lòng tải lại”, không cho ghi đè bằng quyết định mới. Lỗi lưu giữ
lý do và không báo thành công. Giấy tờ không còn tồn tại cho trở về danh sách.
Không thêm màn thu thập giấy tờ/hồ sơ cá nhân.

## 3. Phát hành chiến dịch

Giữ màn nháp, chọn người nhận, xem lại và xác nhận phát hành hiện có. Sau khi
hệ thống nhận yêu cầu, hiển thị “Đang phát hành”; chỉ hiện hoàn tất khi hệ thống
đã xử lý xong. Chưa gửi xong không đồng nghĩa cần bấm phát hành lại hoặc tạo
chiến dịch mới. Giao diện tải lại đúng trạng thái, không báo lỗi chung khiến
người dùng tưởng chiến dịch chưa được nhận khi thực tế đang chờ gửi.

Nếu nội dung/phiên bản đã thay đổi, báo tải lại trước khi thực hiện tiếp. Nếu
đang phát hành hoặc đã hoàn tất, không cho sửa nội dung như nháp. Thu hồi theo
quy tắc hiện có; thu hồi thành công không xuất hiện lại như chiến dịch đang gửi.
Không vẽ màn quản lý job, Redis hoặc scheduler cho Admin nghiệp vụ.

## 4. Các panel đã có

Hậu kiểm, trạng thái hoạt động, chấm dứt và gói cơ sở giữ luồng đã duyệt trong
hồ sơ nghiệp vụ gốc. Lượt này kiểm và sửa lỗi tương tác: thiếu quyền, dữ liệu
cũ, lỗi tải, chuyển cơ sở, sửa đồng thời, xác nhận theo bản xem trước hiện hành.
Không tự thêm trạng thái hoặc bước nghiệp vụ. Khi chuyển cơ sở, xoá dữ liệu và
xác nhận đang thao tác của cơ sở cũ; kết quả request cũ không ghi vào màn mới.

## Nhật ký

Sử dụng trang Audit hiện có. Quyết định thành công có nhật ký; lỗi lưu quyết
định/nhật ký không báo đã hoàn tất. Không tạo màn Audit riêng cho từng panel.
