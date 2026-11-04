# Luồng màn hình danh bạ khách hàng CTV — BBN-090

Theo [thiết kế đã duyệt](../../../../initiatives/collaborator-customer-contacts/design.md). Đây là tài liệu bàn giao thiết kế giao diện;
task hiện tại chỉ triển khai Backend, chưa viết giao diện.

## Phạm vi hiển thị

Mọi màn hình dưới đây nằm trong **FLUTTER APP** hoặc **REACT PWA**, sau khi đăng
nhập và chọn khu vực CTV. Không có màn hình web công khai, không dùng link mời.
Nếu phiên hết hạn, đưa về đăng nhập theo luồng chung, rồi cho mở lại danh bạ.
Nếu chưa đồng ý điều khoản mới, đưa đến màn hình điều khoản CTV hiện có.

## 1. Danh bạ của tôi

**Người dùng:** CTV. **Điểm vào:** mục Danh bạ trong khu vực CTV, hoặc nút Chọn
khách trên màn hình đặt phòng. Không yêu cầu chọn Karaoke trước khi mở danh bạ.

- Tiêu đề “Danh bạ khách hàng”, ô tìm tên/số điện thoại, nút “Thêm khách hàng”.
- Mỗi dòng có tên, số điện thoại và ghi chú nếu có. Có thao tác sửa và xoá của
  chính người dùng; không có bộ lọc nhân sự hoặc danh bạ cơ sở.
- Chưa có liên hệ: hiển thị “Bạn chưa lưu khách hàng nào” và nút thêm.
- Không tìm thấy: giữ từ khoá và cho xoá từ khoá hoặc thêm khách.
- Xem thêm kết quả khi còn trang. Tải lỗi cho thử lại, không giả danh bạ trống.
- Mở từ đặt phòng: chọn một dòng sẽ điền tên/số vào form rồi quay về đặt phòng.
  Mở thông thường: thao tác sửa mở màn hình 2, xoá mở hộp xác nhận màn hình 3.

## 2. Thêm hoặc sửa khách hàng

**Nơi hiển thị:** FLUTTER APP / REACT PWA. **Điểm vào:** màn hình 1.

- Tên khách và số điện thoại bắt buộc; ghi chú không bắt buộc.
- Nút “Lưu” và nút quay lại. Khi lưu lỗi, giữ nội dung người dùng đã nhập.
- Thiếu/sai thông tin: chỉ rõ trường cần sửa. Số đã có trong danh bạ: thông báo
  “Số điện thoại đã có trong danh bạ của bạn”, không tự ghi đè liên hệ cũ.
- Thành công: trở về danh sách và hiển thị thông tin vừa lưu.
- Thêm lại số từng xoá: liên hệ xuất hiện lại với thông tin mới, không cần màn
  khôi phục riêng. Không có thao tác chuyển liên hệ sang quán hoặc người khác.

## 3. Xoá liên hệ

**Nơi hiển thị:** hộp xác nhận trong FLUTTER APP / REACT PWA.

Hiển thị tên/số của liên hệ đang chọn, hỏi “Xoá liên hệ này khỏi danh bạ?” và
chú thích “Thông tin trên các đơn đã tạo được giữ nguyên”. Nút “Huỷ” giữ liên
hệ, nút “Xoá” thực hiện xoá và cập nhật danh sách. Nếu liên hệ không còn tồn tại,
làm mới danh sách; lỗi kết nối cho thử lại, không báo xoá thành công giả.

## 4. Dùng danh bạ khi đặt phòng

**Nơi hiển thị:** màn hình tạo đơn hiện có trong FLUTTER APP / REACT PWA.

- Nút “Chọn từ danh bạ” mở màn hình 1; chọn khách điền tên và số, vẫn cho sửa.
- Nhập khách trực tiếp có lựa chọn “Lưu khách vào danh bạ”, mặc định chưa chọn.
- Không chọn lưu vẫn đặt phòng được khi các thông tin đặt phòng hợp lệ.
- Chỉ chọn lưu khi có đủ tên/số; khách đã lưu không bị ghi đè thông tin cũ.
- Nếu liên hệ thay đổi/bị xoá trong lúc đang nhập đơn, thông tin hợp lệ trên
  form vẫn dùng cho đơn, không tự khôi phục hay sửa liên hệ từ lựa chọn cũ.
- Đặt thất bại: giữ form để sửa/thử lại, không báo đã lưu khách thành công.
- Đặt thành công: đi đến chi tiết đơn hiện có. Không tự tạo bản sao khách trong
  danh bạ Karaoke. Dùng cùng khách để đặt ở quán khác vẫn dùng danh bạ này.

## 5. Không còn quyền sử dụng

**Nơi hiển thị:** FLUTTER APP / REACT PWA.

Nếu tài khoản không còn đủ điều kiện CTV hoặc quyền tương ứng đã bị thu hồi,
hiển thị thông báo quyền chung và cho quay lại khu vực phù hợp. Không hiển thị
liên hệ của người khác, không chuyển danh bạ CTV sang danh bạ nhân sự. Dữ liệu
đã lưu được giữ lại; màn hình không hứa tự khôi phục tư cách CTV.

## Phân biệt lịch sử

Không thiết kế màn lịch sử khách trong task này. Nhật ký quản trị của Blink là
chức năng riêng dành cho Admin, không mở cho CTV hoặc quản lý cơ sở từ danh bạ.
