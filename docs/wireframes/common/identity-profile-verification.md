# Màn hình hồ sơ danh tính — BBN-100

Chỉ bàn giao thiết kế, chưa nối giao diện trong task BE.

## Flutter / React PWA — tài khoản cá nhân

Từ Tài khoản → Hồ sơ danh tính. Hiển thị Chưa gửi / Chờ duyệt / Cần bổ sung /
Đã xác minh, thời điểm và lý do bổ sung. Không phải trang public.

Chọn Quét CCCD → FE đọc QR → xem thông tin chỉ đọc → Lưu. Không nhập/sửa tay.
Có thể thoát rồi bổ sung ảnh sau. Hai ô ảnh CCCD trước/sau và một ô chân dung
không bắt buộc; có nút thay từng ảnh. Chọn Gửi xác minh khi đủ thông tin và hai
mặt CCCD. Chân dung nếu đã upload sẽ được gửi cùng.

Sau gửi: màn hình chờ duyệt. Thay thông tin/ảnh có cảnh báo phải gửi duyệt lại.
Đã duyệt: hiện tích xanh. Yêu cầu bổ sung: hiện lý do, cho quét/thay ảnh và gửi
lại. Khi cập nhật thành công, tích xanh bị gỡ đến khi Admin duyệt lại.
Lỗi dữ liệu/ảnh: giữ thông tin, chỉ rõ phần cần bổ sung; không tự gửi lại.
Xung đột phiên bản: tải lại hồ sơ mới trước khi tiếp tục.

## Admin React — xét duyệt

Danh sách hồ sơ, lọc trạng thái/người dùng; mở chi tiết một lần gửi. Hiển thị
bộ thông tin đã gửi, hai mặt CCCD và chân dung nếu có; xem lịch sử lần gửi và
kết quả. Nút Duyệt hoặc Yêu cầu bổ sung (bắt buộc lý do). Bản đã bị thay thế
chỉ xem, không được duyệt. Nếu người dùng vừa cập nhật, báo hồ sơ đã thay đổi,
tải lại thay vì cấp tích xanh cho bản cũ.

Không gộp màn hình này với Audit Admin. Không đổi biệt danh hoặc hồ sơ công
việc. Thiếu CCCD/chân dung không chặn đăng ký làm nhân sự.
