# Thao tác an toàn Admin — BBN-092

Theo thiết kế đã duyệt. Tất cả màn hình thuộc **ADMIN UI**, sau đăng nhập Blink
Admin. Không có trang công khai, Flutter hoặc React PWA dành cho người dùng.
Không thêm trang nghiệp vụ mới; chỉ sửa các thao tác đang có.

## 1. Đổi trạng thái tài khoản

Từ danh sách/chi tiết người dùng, Admin chọn trạng thái mới và xác nhận. Khi
thành công, cập nhật trạng thái trên màn hình. Nếu đây là quản trị viên còn hoạt
động cuối cùng, hiển thị “Phải còn ít nhất một quản trị viên đang hoạt động”.
Giữ trạng thái cũ, không báo thành công. Lỗi kết nối cho tải lại để biết kết quả;
không tự gửi lặp liên tục. Không bổ sung màn khôi phục mật khẩu hoặc cứu hộ.

## 2. Thay vai trò tài khoản

Từ thao tác gán vai trò hiện có, chọn vai trò được phép và lưu. Nếu gỡ vai trò
quản trị cuối cùng, hiển thị lý do bị chặn và giữ lựa chọn để sửa. Không tự thay
vai trò khác nhằm vượt điều kiện. Có quản trị viên khác hoạt động thì cho phép
thao tác hợp lệ theo quyền hiện có.

## 3. Chỉnh bộ quyền vai trò

Trong trang vai trò, khi chọn ADMIN, năm quyền cần giữ luôn được đánh dấu và có
chú thích “Quyền bắt buộc để duy trì quản trị hệ thống”: truy cập quản trị, xem
người dùng, đổi trạng thái người dùng, xem phân quyền và sửa phân quyền.
Không cho bỏ chọn năm mục này. Các quyền khác giữ cách chỉnh hiện tại.
Nếu dữ liệu đang thiếu quyền bắt buộc, hiển thị cảnh báo; chỉ lưu khi đã chọn đủ,
không tự ghi thay đổi khi mở trang. Máy chủ vẫn có thể từ chối dữ liệu cũ khi
Admin khác đã chỉnh; giữ nội dung và cho tải lại.

## 4. Thu hồi lời mời nhân sự

Từ tab lời mời của cơ sở, Admin chọn “Thu hồi”, mở hộp xác nhận có lời mời đang
chọn và trường lý do bắt buộc. Các lựa chọn: nhầm tài khoản, nhầm lời mời, ngừng
tuyển, thay đổi vị trí, lý do khác. Với “Lý do khác”, bắt buộc nhập giải thích;
phần giải thích tối đa 500 ký tự. Có nút “Huỷ” và “Xác nhận thu hồi”.

Trong khi gửi, chặn nhấn lặp. Thành công đóng hộp và tải lại danh sách. Thất bại
hiển thị thông báo và giữ lý do đã nhập; nếu lời mời không còn ở trạng thái có
thể thu hồi, cho tải lại danh sách. Không tạo đường dẫn hoặc lời mời mới.

## 5. Nhật ký và lỗi

Thay đổi thành công phải có nhật ký quản trị; lỗi lưu thay đổi hoặc nhật ký thì
không thông báo thành công. Màn Audit hiện có giữ nguyên, không xây màn lịch sử
riêng. Thông báo thiếu quyền cho Admin theo quy tắc hiển thị quyền đang thiếu;
không thay đổi thông báo dành cho người dùng ngoài Admin.
