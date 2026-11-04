# Luồng đăng ký CTV — bàn giao nghiệp vụ

## 1. Xem quán nguồn — WEB CÔNG KHAI

Người nhận mở link, thấy tên quán và thời hạn sử dụng. Chọn đăng ký để chuyển
sang đăng nhập/tạo tài khoản Blink. Link hết hạn/đã dùng báo rõ và cho quay về
đăng ký trực tiếp. Không hiển thị thông tin tài khoản hay giấy tờ.

## 2. Hoàn thiện đăng ký — REACT PWA / FLUTTER APP

Người đã đăng nhập thấy số điện thoại đăng nhập đã xác minh và hồ sơ danh tính
hiện có. Họ tên/ngày sinh được sửa tại đây và cập nhật tài khoản Blink dùng chung.
Biệt danh/ảnh đại diện/giới thiệu là hồ sơ công việc CTV riêng. CCCD và chân dung
không bắt buộc; có thể bổ sung sau trong tài khoản hoặc khi rút tiền.

Đăng ký trực tiếp có thể chọn quán hợp tác hoặc bỏ qua. Đi từ link thì quán nguồn
được giữ sẵn. Người đang giữ vai trò nghiệp vụ khác được thông báo chưa đủ điều
kiện đăng ký CTV; không tự kết thúc vai trò đó.

## 3. Điều khoản — REACT PWA / FLUTTER APP

Hiển thị điều khoản CTV hiện hành; người dùng mở đọc và chủ động đồng ý. Nếu
phiên bản đổi trong lúc đăng ký, yêu cầu đọc và đồng ý bản mới. Điều khoản rút
tiền không nằm trong bước này.

## 4. Hoàn tất — REACT PWA / FLUTTER APP

Hiển thị tư cách CTV đã kích hoạt và quán hợp tác nếu đã chọn. Bấm gửi nhiều lần
không tạo nhiều hồ sơ. Khi mất kết nối sau gửi, đọc lại kết quả đăng ký thay vì
mở tài khoản mới. Ảnh không hợp lệ phải chọn/tải lại; đăng ký chưa hoàn tất giữ
người dùng ở bước đang sửa. UI và CTV booking integration được thực hiện riêng.
