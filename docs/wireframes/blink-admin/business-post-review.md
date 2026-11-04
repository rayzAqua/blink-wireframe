# BBN-079 — Luồng màn hình hậu kiểm và quản lý hoạt động cơ sở

**Phạm vi:** Bàn giao thiết kế giao diện; chưa phải giao diện/API đã triển khai.
Tham chiếu [thiết kế đã chốt](../../../../initiatives/business-post-review/design.md). Không có màn hình khách hàng trong task.

## Phân biệt nơi thao tác

- **Trang quản trị Blink trên web:** mọi thao tác của Blink Admin.
- **Trong ứng dụng Flutter hoặc React PWA:** Owner, Manager và nhân sự.
- **Web công khai:** không có màn hình thuộc phạm vi này. Thông báo mở về đúng
  màn hình trong ứng dụng, vẫn phải đăng nhập và kiểm tra quyền.

## A. Admin kiểm tra cơ sở — trang quản trị Blink trên web

| Màn hình        | Nội dung chính                                                                        | Thao tác và nơi đến                                   |
| --------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Danh sách cơ sở | Tên, Owner, địa chỉ, kết quả hậu kiểm, tình trạng hoạt động; lọc riêng hai tình trạng | Chọn cơ sở → chi tiết                                 |
| Chi tiết cơ sở  | Hồ sơ hiện có; hai nhãn riêng: hậu kiểm và hoạt động; lịch sử xử lý                   | Bắt đầu kiểm tra; mở hồ sơ; xem lịch sử               |
| Đang kiểm tra   | Hồ sơ và phản hồi gần nhất                                                            | Chọn Đạt, Không đạt hoặc Yêu cầu bổ sung              |
| Yêu cầu bổ sung | Ô nhập rõ nội dung cần sửa                                                            | Gửi → Chờ cơ sở bổ sung; Hủy → trở lại không thay đổi |
| Ghi kết luận    | Đạt/Không đạt và nội dung kết luận                                                    | Xác nhận → chi tiết cập nhật kết quả                  |
| Kiểm tra lại    | Kết quả cũ và ô nhập lý do mở lại                                                     | Xác nhận → Đang kiểm tra; không mất lịch sử           |

Kết luận không đạt không tự tạm dừng hoặc chấm dứt cơ sở. Nút xử lý hoạt động
nằm riêng. Khi dữ liệu đã được Admin khác thay đổi, hiển thị yêu cầu tải lại;
không tự gửi lại quyết định trên dữ liệu mới.

## B. Cơ sở bổ sung — trong ứng dụng Flutter hoặc React PWA

1. Owner nhận thông báo; Owner hoặc Manager mở trang quản lý cơ sở.
2. Thấy nội dung Blink yêu cầu, thời điểm và nút **Cập nhật hồ sơ**.
3. Sửa bằng màn hình hồ sơ hiện có. Lưu hồ sơ chưa đồng nghĩa gửi kiểm tra lại.
4. Quay lại chọn **Gửi bổ sung**, nhập phản hồi, xem lại rồi xác nhận.
5. Hiện **Đã gửi — đang chờ Blink kiểm tra** cùng lịch sử trao đổi.

Cho tiếp tục luồng này khi cơ sở đang hạn chế hoặc tạm dừng. Nếu không còn
là Owner/Manager hợp lệ thì giải thích không có quyền và không cho gửi. Nếu
Blink đã đổi bước xử lý thì tải thông tin mới, giữ nội dung đang nhập để xem lại.
Không yêu cầu giấy tờ pháp lý bắt buộc hoặc hồ sơ cá nhân mới.

## C. Hạn chế hoặc tạm dừng — trang quản trị Blink trên web

Từ chi tiết, Admin chọn **Hạn chế hoạt động** hoặc **Tạm dừng**. Hộp xác nhận
hiện tên cơ sở, tình trạng hiện tại, tác động và lý do bắt buộc:

- Hạn chế: thông tin cơ sở còn xem được khi có giao diện khách; không đặt mới.
- Tạm dừng: cơ sở không xuất hiện với khách.
- Cả hai: không nhận đơn/mở lượt hát mới; vẫn xử lý đơn cũ và bổ sung hồ sơ.

Nút xác nhận ghi rõ hành động. Sau thành công, cập nhật nhãn và lịch sử.
Không hiển thị thông báo đã thành công nếu hệ thống chưa lưu được quyết định.

## D. Chấm dứt — trang quản trị Blink trên web

Màn hình xác nhận riêng hiển thị:

- Tên, địa chỉ cơ sở; cảnh báo không có khôi phục thông thường.
- Số đơn đang hát sẽ bị kết thúc bắt buộc và số đơn chưa mở sẽ bị hủy.
- Quan hệ nhân sự sẽ kết thúc, lời mời còn dở bị thu hồi, dừng quyền vận hành.
- Ô lý do bắt buộc, nút **Quay lại**, nút **Xác nhận chấm dứt**.

Khi xác nhận, khóa nút gửi trùng. Nếu dữ liệu thay đổi khiến bản xem trước đã
cũ, yêu cầu xem lại số liệu rồi xác nhận lại. Không có bước chờ Owner đồng ý.
Sau thành công, mở chi tiết ở trạng thái Chấm dứt và kết quả xử lý thực tế.
Đơn đang hát phải hiển thị **Kết thúc do cơ sở chấm dứt hợp tác**, không ghi
**Hoàn thành bình thường**. Không mô phỏng khách thực tế đã rời quán.

## E. Khôi phục — trang quản trị Blink trên web

Từ cơ sở đang hạn chế/tạm dừng, chọn **Khôi phục hoạt động**, nhập lý do rồi
xác nhận. Hiện rõ phòng/tầng đã đóng vẫn đóng, kết quả hậu kiểm không thay đổi.
Cơ sở đã chấm dứt không có nút này.

## F. Người làm việc tại cơ sở — trong ứng dụng Flutter hoặc React PWA

- Hạn chế/tạm dừng: thấy tên cơ sở, tình trạng và hướng dẫn; chỉ hiện thao tác
  xử lý đơn cũ theo quyền sẵn có. Owner/Manager có đường vào bổ sung hồ sơ.
- Khôi phục: nhận thông báo đã hoạt động trở lại; tải lại quyền hiện hành.
- Chấm dứt: thông báo quan hệ làm việc tại cơ sở đã kết thúc; không tiếp tục
  thao tác dù đang mở màn hình cũ. Vẫn vào được tài khoản và cơ sở khác hợp lệ.
- Lịch sử chỉ hiện dữ liệu được phép. Không thêm màn hình Admin Audit cho cơ sở.

## Thông báo và lỗi chung

Thông báo chỉ gửi nội bộ cho Owner/Manager/nhân sự theo thiết kế. Không thiết
kế thông báo hoặc màn hình khách hàng. Chạm thông báo của cơ sở đã chấm dứt
phải mở được thông tin quyết định phù hợp thay vì đưa vào trang vận hành bị cấm.

Thiếu lý do: báo ngay tại ô nhập. Mất mạng: giữ nội dung và cho thử lại. Chưa
rõ yêu cầu đã thành công: tải trạng thái trước khi gửi lại. Không còn quyền:
hiện thông báo không có quyền truy cập; không làm mất quyền tài khoản ở nơi khác.
