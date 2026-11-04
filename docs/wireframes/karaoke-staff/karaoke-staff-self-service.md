# BBN-074 — Luồng màn hình hồ sơ công việc và nghỉ việc

**Căn cứ:** [Thiết kế đã duyệt](../../../../initiatives/karaoke-staff-self-service/design.md). Tài liệu dành cho Figma Designer;
chưa phải giao diện đã triển khai.

## 1. Nơi hiển thị và người sử dụng

- **FLUTTER APP / REACT PWA:** nhân sự xem hồ sơ tại từng cơ sở, sửa hồ sơ,
  tự nghỉ; cấp quản lý xử lý nội dung không phù hợp.
- **WEB CÔNG KHAI:** khách mở link xác nhận đơn, xem thông tin Booking.
- Không có thao tác tự phục vụ trên trang công khai. Mở link xác nhận đơn
  không đưa khách vào luồng đăng ký nhân sự hoặc bắt khách đăng nhập.
- Không có màn hình Thu ngân trong phạm vi này.

## 2. Danh sách nơi làm việc

**Nơi:** FLUTTER APP / REACT PWA. **Người dùng:** nhân sự đã đăng nhập.

Điểm vào: **Tài khoản → Công việc của tôi**.

Mỗi thẻ gồm tên cơ sở, mã nhân sự, vị trí, ảnh và một trạng thái rõ ràng:
**Đang làm việc**, **Đang tạm dừng** hoặc **Đã nghỉ việc**. Tách nhóm công việc
hiện tại và lịch sử đã nghỉ; có nút xem thêm khi danh sách dài.

- Chọn thẻ → Hồ sơ công việc đúng cơ sở.
- Không có quan hệ → “Bạn chưa có công việc tại cơ sở nào.”
- Gói/cơ sở không khả dụng không làm mất thẻ công việc và lối tự nghỉ.
- Lỗi tải → Giữ màn hình, nút **Thử lại**. Hết phiên → Đăng nhập lại.

## 3. Hồ sơ công việc của tôi

**Nơi:** FLUTTER APP / REACT PWA. Điểm vào: thẻ nơi làm việc.

Hiển thị tên cơ sở, mã nhân sự, vị trí, trạng thái, biệt danh và ảnh công việc.
Ghi rõ **Đây là hồ sơ tại cơ sở này**, tránh nhầm với hồ sơ cá nhân.

| Trường hợp        | Thao tác                                                    |
| ----------------- | ----------------------------------------------------------- |
| Đang làm          | **Sửa hồ sơ**, **Nghỉ việc tại cơ sở này**                  |
| Đang tạm dừng     | Chỉ xem; vẫn có **Nghỉ việc tại cơ sở này**                 |
| Đã nghỉ           | Chỉ xem lịch sử; giải thích cần lời mời mới để quay lại     |
| Quản lý chi nhánh | Sửa hồ sơ; thao tác nghỉ đưa vào luồng nghỉ quản lý hiện có |

Nếu có nội dung vi phạm: hiển thị phần cần sửa, lý do, ngày đánh dấu và thông
báo **Bạn chưa thể tạo đơn mới tại cơ sở này cho tới khi hồ sơ được xác nhận
hợp lệ.** Không ghi “Tài khoản bị đình chỉ”.

## 4. Sửa hồ sơ

**Nơi:** FLUTTER APP / REACT PWA. Điểm vào: **Sửa hồ sơ**.

- Ảnh công việc và biệt danh bắt buộc; đánh dấu rõ hai trường.
- Ảnh có nút **Chọn ảnh**, trạng thái **Đang tải**, **Đang xử lý**, **Thử lại**.
- Xem trước ảnh và biệt danh mới trước khi bấm **Lưu thay đổi**.
- Giải thích “Chỉ thay đổi hồ sơ công việc tại [Tên cơ sở]”.
- Lưu thành công → Hồ sơ công việc. Hủy → Giữ thông tin đang lưu.
- Nội dung đang chờ quản lý kiểm tra → hiện **Đã gửi nội dung thay thế — chờ
  cấp quản lý kiểm tra**; không tuyên bố đã có quyền đặt đơn trở lại.
- Biệt danh rỗng hoặc thiếu ảnh → Lỗi ngay trường tương ứng, giữ phần đã nhập.
- Có người sửa trước → “Hồ sơ đã thay đổi. Vui lòng tải lại trước khi lưu.”
- Đã nghỉ/tạm dừng trong lúc sửa → Không lưu; tải lại hồ sơ và giải thích.

## 5. Xác nhận nghỉ việc

**Nơi:** FLUTTER APP / REACT PWA. Điểm vào: hồ sơ công việc.

Hiển thị tên cơ sở và cảnh báo: **Bạn sẽ mất quyền làm việc tại cơ sở này.
Các đơn và lịch sử đã thực hiện vẫn được giữ. Công việc tại cơ sở khác không
bị ảnh hưởng. Muốn quay lại, bạn cần nhận lời mời mới.**

Gồm ghi chú không bắt buộc, ô **Tôi xác nhận nghỉ việc tại cơ sở này**, nút
**Xác nhận nghỉ việc** và **Quay lại**. Chỉ cho xác nhận khi đã đánh dấu ô.
Trong lúc gửi, khóa nút để tránh bấm lặp.

Thành công → **Bạn đã nghỉ việc tại [Tên cơ sở]**, nút **Về công việc của tôi**.
Không yêu cầu đợi quản lý duyệt. Gói hết hạn vẫn được nghỉ.
Nếu công việc đã kết thúc từ máy khác → Hiển thị trạng thái đã nghỉ, không tạo
thêm một lần nghỉ. Xung đột vai trò → Tải lại và hướng tới luồng phù hợp.

## 6. Quản lý đánh dấu nội dung không phù hợp

**Nơi:** FLUTTER APP / REACT PWA. **Người dùng:** cấp quản lý đủ quyền.
Điểm vào: **Nhân sự → Chi tiết → Nội dung không phù hợp**.

Xem ảnh và biệt danh hiện tại, chọn **Ảnh**, **Biệt danh** hoặc cả hai, nhập lý
do bắt buộc. Giải thích chỉ ẩn nội dung và chặn tạo đơn mới tại cơ sở, không
đình chỉ tài khoản. Nút **Xác nhận đánh dấu** và **Hủy**.

Thành công → Chi tiết nhân sự, trạng thái **Cần sửa hồ sơ**. Gửi thông báo
đến nhân sự. Thiếu quyền hoặc sai cấp bậc → “Bạn không có quyền truy cập.”
Hồ sơ vừa thay đổi → Yêu cầu tải lại để tránh đánh dấu nhầm nội dung.

## 7. Quản lý kiểm tra nội dung thay thế

**Nơi:** FLUTTER APP / REACT PWA. Điểm vào: hồ sơ **Chờ kiểm tra** hoặc thông báo.

Hiển thị nhân sự, cơ sở, phần cần kiểm tra, lý do ban đầu và nội dung hiện tại.
Cho chọn phần đã hợp lệ, ghi lý do xử lý; nút **Xác nhận hợp lệ**.
Nếu có quyền sửa hồ sơ, có thể thay nội dung hợp lệ rồi xác nhận trong cùng
thao tác; thiếu quyền sửa thì chỉ xem và xác nhận.

Nếu nội dung vẫn chưa đạt → Giữ yêu cầu sửa, không xác nhận hợp lệ. Nếu đã đánh
dấu nhầm nội dung cũ, chọn rõ **Nội dung trước đó bị đánh dấu nhầm**; không đồng
nhất việc này với chấp nhận một nội dung thay thế khác.

Khi còn phần vi phạm khác → Vẫn chặn tạo đơn. Khi đã xử lý tất cả → Thông báo
**Hồ sơ đã được xác nhận hợp lệ**. Nếu nhân sự đang tạm dừng, không hiển thị
thông báo rằng đã được làm việc trở lại.

## 8. Khách xem thông tin Booking

**Nơi:** WEB CÔNG KHAI. Điểm vào: mở link xác nhận đơn được chia sẻ.

Trên trang xác nhận hiện có, thêm một cụm **Booking** gồm ảnh tròn và biệt
danh công việc. Luôn dùng nhãn **Booking**, kể cả người tạo là chủ hoặc quản lý.
Không hiển thị vai trò nội bộ, mã nhân sự hoặc hồ sơ danh tính.

- Giữ tên và ảnh tại lúc tạo đơn, không thay theo hồ sơ mới.
- Không có ảnh → Hình đại diện mặc định của giao diện.
- Không có biệt danh hoặc biệt danh bị ẩn → Hiển thị **Booking**.
- Ảnh bị ẩn → Dùng hình mặc định, không ghi lý do vi phạm cho khách.
- Link không hợp lệ/hết hạn → Màn hình lỗi hiện hành, không lộ thông tin hồ sơ.

## 9. Lịch sử và thông báo

Chi tiết nhân sự dành cho cấp quản lý có lịch sử phù hợp quyền: người thực hiện,
thời điểm, thay đổi hồ sơ, nghỉ việc và lý do xử lý vi phạm. Không đưa màn
hình Admin Audit vào đây.

Thông báo trong ứng dụng mở đúng cơ sở và hồ sơ; kiểm tra lại quyền khi mở.
Người quản lý đã mất quyền chỉ thấy thông báo không còn truy cập được, không
được xem nội dung nhân sự. Đẩy thông báo ra thiết bị thuộc task khác.
