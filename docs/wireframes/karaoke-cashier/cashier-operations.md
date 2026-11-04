# Luồng màn hình nghiệp vụ Thu ngân — BBN-096

Bàn giao cho thiết kế React trên máy tính/tablet. Đây là màn hình trong giao
diện Thu ngân đã đăng nhập, không phải web public hoặc Flutter. Thiết kế
nghiệp vụ: [design.md](../../../../initiatives/cashier-operations/design.md). Tài liệu mô tả màn hình, chưa phải giao diện đã nối API.

## 1. Vào bàn làm việc

Sau đăng nhập thiết bị, nếu chưa có người trực: hiển thị danh sách nhân sự tại
cơ sở, chọn bản thân và nhập mật khẩu tài khoản cá nhân. Owner cũng xuất hiện.
Sai mật khẩu: giữ màn hình, cho nhập lại. Thành công: vào bảng phòng.

Thanh đầu trang luôn có tên cơ sở, tên người đang trực, **Thay người trực** và
**Kết thúc lượt trực**. Thay người yêu cầu mật khẩu người mới; sai mật khẩu
không kết thúc người cũ. Kết thúc lượt không tự đóng đơn đang hát.

## 2. Bảng phòng

Hiển thị phòng theo cách nhóm tầng hiện có; mỗi phòng thể hiện Trống, Đã đặt
hoặc Đang hát. Chọn phòng để xem đơn/lịch đặt. Có nút **Tạo đơn**, chọn nguồn
đặt trước, hotline hoặc khách đến trực tiếp. Chỉ hiện thao tác được phép.

Tạo đơn: chọn phòng, nhập thông tin khách và thời gian theo biểu mẫu đặt phòng
hiện có. Xác nhận thành công mở chi tiết đơn. Nếu thời gian/phòng không còn
phù hợp, giữ thông tin nhập và báo chọn lại. Thu ngân chưa có chức năng chọn
hoặc lưu khách vào danh bạ trong phạm vi này.

## 3. Chi tiết đơn

Có thông tin khách, phòng, thời gian, trạng thái và nhãn đơn. Các nút tùy theo
trạng thái và quyền: **Sửa thông tin**, **Đổi lịch**, **Xác nhận**, **Hủy đơn**,
**Bắt đầu hát**, **Đổi phòng**, **Hoàn thành đơn**, **Lịch sử thao tác**.
Không cho sửa thông tin ở giai đoạn mà nghiệp vụ hiện hành không cho phép.

- Đổi phòng: chọn phòng và xác nhận; nếu phòng đã được dùng, chọn lại.
- Hủy đơn: nhập lý do theo biểu mẫu hiện hành rồi xác nhận.
- Hoàn thành đơn: xác nhận kết thúc lượt sử dụng. Không có thu tiền/in bill.
  Nếu còn món chờ xử lý, hướng dẫn xử lý món trước rồi quay lại hoàn thành.
- Lịch sử: xem ai đã thực hiện từng thao tác và thời điểm. Đây là lịch sử
  nghiệp vụ đơn, không phải trang Audit quản trị Blink.
- Có người khác vừa sửa đơn: tải lại dữ liệu mới trước khi xác nhận lại; không
  âm thầm ghi đè hoặc gửi lại thao tác cũ.

## 4. Món trong phòng đang hát

Khi gói có quyền lợi Max360: có **Thêm món**, chọn nhà hàng đang hợp tác, chọn
món/số lượng, xác nhận. Trong danh sách có sửa số lượng/ghi chú, gỡ món và
thay món theo trạng thái cho phép. Thay món là chọn món khác cho dòng cần thay.
Món đã phục vụ chỉ xem, không sửa/gỡ.

Khi không còn quyền lợi Max360: ẩn chọn/thêm/thay/tăng số lượng. Vẫn xem món
cũ và được giảm số lượng, sửa ghi chú hoặc gỡ món đang chờ theo quy tắc hiện
hành. Không tạo màn hình xuất kho/từ chối giả; task chưa đồng bộ Max360.

## 5. Gián đoạn và quyền truy cập

| Tình huống                        | Hiển thị và hướng đi                                                            |
| --------------------------------- | ------------------------------------------------------------------------------- |
| Người trực đã kết thúc/bị thu hồi | Dừng thao tác, tải lại thông tin thiết bị và chọn người trực hợp lệ             |
| Phiên thiết bị hết hạn/bị thu hồi | Quay lại đăng nhập thiết bị; không tự tạo phiên mới liên tục                    |
| Quyền thao tác bị tắt             | “Bạn không có quyền truy cập.”; tải lại quyền trước khi hiện nút                |
| Cơ sở bị hạn chế                  | Chỉ giữ thao tác xử lý đơn cũ được phép; không tạo đơn hay bắt đầu lượt hát mới |
| Gói không còn hiệu lực            | Thông báo cơ sở hết gói, liên hệ chủ; không xóa dữ liệu đơn                     |
| Gửi lại thao tác tạo do mất mạng  | Giữ cùng yêu cầu đang gửi; nhận lại đơn đã tạo, không tạo đơn thứ hai           |

Các chuyển màn hình sau lỗi dựa trên phản hồi API. Tài liệu này không cam kết
màn hình tự cập nhật tức thời khi máy đứng yên; nối client/realtime là phần sau.
