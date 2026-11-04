# Màn hình quản lý gói của cơ sở

**Mục đích:** Figma Designer dựng luồng, không cần hiểu mã Backend.
**Trạng thái:** Bản mô tả theo nghiệp vụ đã duyệt, chưa có giao diện mới.
[Thiết kế](../../../../initiatives/subscriptions/owner-management-design.md).

## 1. Người sử dụng và nơi thao tác

- **Owner:** Flutter hoặc React PWA, chọn đúng cơ sở đang quản lý.
- **Blink Admin:** admin-ui trên trình duyệt máy tính.
- **Không có trang public hoặc đường dẫn mở không cần đăng nhập.** Chỉ Owner
  quản lý gói của cơ sở mình sở hữu; nhân sự không thay Owner gửi yêu cầu.
- Chuyển cơ sở phải đổi toàn bộ tên quán, gói và yêu cầu hiển thị.

## 2. Bản đồ màn hình

Owner: Tài khoản/cơ sở → Gói sử dụng → Nâng cấp/Gia hạn → Xem lại yêu cầu →
Chờ xử lý. Từ Chờ xử lý có thể sửa/rút. Từ Gói sử dụng có thể Hủy cuối kỳ.

Admin: Quản lý gói → Yêu cầu từ cơ sở → Chi tiết → Đã thu tiền, duyệt kích
hoạt hoặc Từ chối có lý do → Kết quả và lịch sử.

## 3. Owner — Gói sử dụng

**Nơi:** Trong Flutter/PWA. **Điểm vào:** cơ sở đang chọn, mục Gói sử dụng.

Hiển thị tên quán và nhãn gói cạnh tên quán hoặc trong thẻ gói. Nhãn chỉ là
quyền lợi dịch vụ, không phải dấu xác minh danh tính.

Nội dung thẻ: tên gói, Đang sử dụng/Đang ân hạn/Sẽ kết thúc vào ngày…, thời
hạn đăng ký, Đã thanh toán đến…, số nhân sự được sử dụng, quyền lợi Max360.
BASIC ghi rõ không có ngày hết hạn. Gói trả góp năm phải phân biệt thời hạn
đăng ký và kỳ tháng đã thanh toán, không hiển thị như đã trả đủ cả năm.

Các nút: Nâng cấp gói, Gia hạn, Hủy gói, Xem lịch sử. BASIC dùng Đăng ký gói
hoặc Nâng cấp, không gọi là gia hạn bản đăng ký cũ. Không cho hủy BASIC để
làm mất nền tảng cơ sở. Không có lựa chọn hạ gói khác.

Nếu có yêu cầu: thêm thẻ Chờ xử lý với gói, chu kỳ, thời điểm gửi và nút Xem
chi tiết. Yêu cầu chờ không thay nhãn hoặc quyền lợi hiện tại.

## 4. Owner — Nâng cấp/Đăng ký gói

**Nơi:** Trong Flutter/PWA. **Vào từ:** Nâng cấp trên màn Gói sử dụng.

Danh sách chỉ có gói được nâng cấp. Mỗi gói hiển thị tên, số nhân sự, quyền
lợi Max360 và các chu kỳ đang có. Cho chọn chu kỳ và cách trả được hỗ trợ.
Giá chỉ để biết thông tin hiện hành, không có nút thanh toán trực tuyến.

Với gói hữu hạn: ghi “Gói mới áp dụng từ kỳ tiếp theo sau khi Admin xác nhận
đã thu tiền”. Với BASIC: “Gói được kích hoạt khi Admin xác nhận đã thu tiền”.

Nút Tiếp tục → màn xem lại; Quay lại không gửi yêu cầu. Không còn gói cao hơn
thì hiển thị Bạn đang sử dụng gói cao nhất, không để danh sách trắng khó hiểu.

## 5. Owner — Gia hạn

**Nơi:** Trong Flutter/PWA. **Vào từ:** Gia hạn gói hiện tại.

Hiển thị cùng gói đang dùng và kỳ sắp tới. Nếu đang trả từng tháng trong gói
năm: ghi rõ Xác nhận kỳ tháng tiếp theo, không thể hiện như đăng ký lại một
năm mới. Khi đã về BASIC, chuyển sang chọn đăng ký mới.

Kỳ góp đã được xác lập hiển thị số tiền kỳ đó. Gói mới/kỳ đăng ký mới hiển thị
thông tin danh mục hiện hành. Phí vượt đã đến hạn được tách dòng để chủ xem,
không trộn thành giá niêm yết của gói.

Nút Tiếp tục → xem lại yêu cầu. Nếu gói/chu kỳ không còn khả dụng: thông báo
rõ và cho quay lại chọn gói được sử dụng; không tự thay gói.

## 6. Owner — Xem lại và gửi yêu cầu

**Nơi:** Trong Flutter/PWA.

Tên cơ sở, loại yêu cầu, gói, chu kỳ, cách trả, dự kiến mốc áp dụng và thông
báo “Admin sẽ xử lý sau khi thu tiền”. Nút Gửi yêu cầu; gửi thành công chuyển
Chờ xử lý. Không hiện thành công thanh toán hoặc cấp nhãn gói mới.

Đã có yêu cầu thì mở yêu cầu hiện tại để sửa, không tạo thêm thẻ đang chờ.
Nếu đang có lịch hủy, nói rõ gửi yêu cầu tiếp tục sử dụng sẽ bỏ lịch hủy;
chủ xác nhận trước khi gửi.

## 7. Owner — Chi tiết yêu cầu

**Nơi:** Trong Flutter/PWA. **Điểm vào:** thẻ yêu cầu hoặc lịch sử.

Chờ xử lý: tên gói/chu kỳ, ngày gửi, kỳ áp dụng, Sửa yêu cầu, Rút yêu cầu.
Rút cần xác nhận; kết quả Đã rút, gói hiện tại không đổi.

Bị từ chối: lý do, ngày xử lý, nút Tạo yêu cầu mới. Đã được duyệt: ngày áp
dụng, gói/chu kỳ thực tế và trạng thái đã được Admin xác nhận thu; không sửa
lại yêu cầu đó. Muốn dừng thì hủy cuối kỳ đã thanh toán.

Admin đã xử lý trong lúc Owner sửa/rút: báo Dữ liệu đã thay đổi, hiển thị kết
quả mới nhất. Mở app lại vẫn thấy yêu cầu, không phụ thuộc bộ nhớ màn hình.

## 8. Owner — Hủy gói

**Nơi:** Hộp xác nhận trong Flutter/PWA.

“Bạn vẫn được sử dụng gói đến …; sau thời điểm này cơ sở chuyển về BASIC.”
Hiển thị hạn mức BASIC, quyền lợi Max360 không còn và cảnh báo nhân sự vượt
hạn mức có thể bị khóa. Không ghi là xóa nhân sự hoặc xóa cơ sở.

Nếu có yêu cầu chờ, nói rõ thao tác cũng rút yêu cầu đó. Nút Xác nhận hủy và
Quay lại. Sau xác nhận trở về Gói sử dụng, hiện Sẽ kết thúc vào …, quyền lợi
hiện tại giữ nguyên. Không hiển thị Chờ Admin duyệt hủy.

## 9. Ân hạn và hết hạn

**Nơi:** Flutter/PWA.

Đang ân hạn: hiển thị ngày hết hạn cũ, ngày kết thúc ân hạn, trạng thái yêu
cầu và hướng dẫn chờ/liên hệ Admin. Không làm bộ đếm chạy lại khi tải màn hình.

Đã về BASIC: nhãn đổi thành BASIC, yêu cầu chưa xử lý vẫn xem được. Nếu được
duyệt sau đó, gói mới bắt đầu từ lúc duyệt; lịch sử cũ vẫn tồn tại. Chủ động
hủy thì về BASIC đúng mốc, không hiện ân hạn sau mốc hủy.

## 10. Admin — Danh sách yêu cầu

**Nơi:** admin-ui, trình duyệt máy tính; không phải trang public.

Bảng gồm cơ sở, chủ gửi, loại yêu cầu, gói/chu kỳ yêu cầu, thời điểm gửi, ngày
đến kỳ và trạng thái. Lọc theo trạng thái/cơ sở/loại, phân trang theo mẫu có sẵn.
Nút Xem chi tiết. Không thêm màn thống kê doanh thu hoặc cổng thanh toán.

## 11. Admin — Chi tiết và duyệt

**Nơi:** admin-ui. **Vào từ:** bảng hoặc cơ sở → yêu cầu gói.

So sánh gói hiện tại với gói yêu cầu; chu kỳ, kỳ đã trả, mốc được phép áp
dụng, số tiền kỳ cần thu và phí vượt nhân sự đến hạn tách dòng. Có tổng cần
xác nhận, không cho Admin nhập gói khác thay yêu cầu.

Chưa đến kỳ: ghi ngày đến kỳ, khóa nút duyệt với lời giải thích. Đã đến kỳ
hoặc BASIC: Admin kiểm tra tiền đã thu bên ngoài, đánh dấu Tôi xác nhận đã
thu các khoản hiển thị rồi chọn Duyệt và kích hoạt. Gói giá0 dùng xác nhận
kích hoạt, không yêu cầu giả lập thu tiền. Không có nút Đã duyệt, chờ kích hoạt.

Thành công: gói, ngày hiệu lực/thời hạn, Admin xử lý; dữ liệu gói của cơ sở
được tải lại. Mất kết nối sau bấm: tải lại kết quả trước khi gửi lại; không
hiển thị như đã thu tiền hai lần.

## 12. Admin — Từ chối và các tình huống thay đổi

**Nơi:** admin-ui. Nút Từ chối mở lý do bắt buộc; không nhập thì chưa gửi.
Thành công: Đã từ chối, giữ gói hiện tại theo vòng đời của nó.

Owner vừa rút/sửa/hủy hoặc Admin khác vừa xử lý: báo Yêu cầu đã thay đổi, tải
lại; không tiếp tục duyệt phiên bản cũ. Gói ngừng bán không được âm thầm thay
bằng gói khác; Admin từ chối có lý do để Owner lựa chọn lại.

## 13. Lịch sử nghiệp vụ và Audit

Owner xem lịch sử gói/yêu cầu đúng cơ sở: gói, chu kỳ, thời hạn, kết quả và lý
do từ chối. Không đưa metadata kỹ thuật hoặc Audit toàn nền tảng vào màn này.

Blink Admin có thể mở Audit hiện có để biết ai gửi/sửa/rút/duyệt/hủy, trước/
sau và thời gian; giữ quyền Admin riêng. Không thêm quyền Audit cho Owner.
