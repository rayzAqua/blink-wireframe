# Wireframe mời và đăng ký nhân sự Karaoke

## 1. Chú thích nơi hiển thị

| Nhãn                 | Ý nghĩa                                           |
| -------------------- | ------------------------------------------------- |
| 🌐 **WEB CÔNG KHAI** | Trang mở từ link; người xem có thể chưa đăng nhập |
| ↗️ **CHUYỂN TIẾP**   | Chọn mở Flutter hoặc tiếp tục bằng React PWA      |
| 📱 **FLUTTER APP**   | Màn hình trong ứng dụng Flutter                   |
| 🖥️ **REACT PWA**     | Màn hình trong ứng dụng web sau khi đăng nhập     |

Public link chỉ là cửa vào. Mọi bước xác nhận và nhập hồ sơ diễn ra trong
Flutter hoặc React PWA.

## 2. Vai trò trong luồng

- Owner và Manager tạo lời mời cho nhân sự tại chi nhánh được quản lý.
- Vice Manager mặc định được mời cấp thấp hơn.
- Vị trí mời được gồm Phó quản lý, Booking, Lễ tân và Phục vụ.
- Số điện thoại bắt buộc với Phó quản lý; tùy chọn với các vị trí thường.
- Manager có luồng bổ nhiệm riêng. Cashier là vị trí theo ca, không phải role
  nhân sự trong luồng này.

## 3. Luồng cấp quản lý tạo lời mời

```text
[Danh sách lời mời]
  → [Tạo lời mời]
  → [Chọn vị trí]
  → [Nhập số điện thoại nếu cần]
  → [Xác nhận]
  → [Sao chép hoặc chia sẻ link]
```

Màn tạo lời mời hiển thị:

- chi nhánh;
- hộp chọn vị trí;
- số điện thoại: bắt buộc hoặc tùy chọn theo vị trí;
- số lượng đang làm, đang tạm dừng, đang hoàn thiện hồ sơ và lời mời còn hiệu
  lực;
- số chỗ còn có thể tiếp nhận theo gói;
- thời hạn cố định 3 ngày.

Thẻ lời mời chưa có người nhận không phải là nhân sự nhưng số thẻ đang mở bị
giới hạn bởi khả năng tiếp nhận còn lại. Vị trí Phó quản lý chỉ có một người
hoặc một lời mời đang mở.

Danh sách không hiển thị token. Khi lời mời còn chờ người nhận, cấp quản lý có
thể lấy lại đúng link, sao chép, chia sẻ lại hoặc thu hồi. Thu hồi cần lý do và
không ảnh hưởng role hiện tại của người nhận.

## 4. Mở public link

### PUB-01 — Xem thông tin tối thiểu

- **Nơi hiển thị:** 🌐 WEB CÔNG KHAI.
- Hiển thị logo/tên/địa chỉ cơ sở, vị trí được mời, người gửi và hạn dùng.
- Nếu link gắn số điện thoại, chỉ hiện số đã che.
- Không hiển thị dữ liệu nhân sự, doanh thu hoặc thông tin vận hành.
- Nút: **Mở ứng dụng Blink** và **Tiếp tục trên web**.

### PUB-02 — Link không dùng được

Hiển thị riêng các trường hợp: đã hết hạn, đã thu hồi, đã được tiếp nhận, đã từ
chối hoặc link không hợp lệ. Không cho xác nhận lại; hướng dẫn liên hệ cấp quản
lý để nhận link mới khi cần.

### Quy tắc link

Link dùng một lần để xác nhận người nhận. Phần bí mật nằm sau dấu `#`, nên trình
duyệt không tự gửi nó tới web server. Sau khi xác nhận thành công, link không
còn dùng cho các bước hồ sơ; tài khoản tiếp tục bằng mục **Lời mời làm việc**.

## 5. Đăng nhập và xác nhận

Trong Flutter hoặc React PWA:

1. Đăng nhập hoặc đăng ký.
2. Xác minh số điện thoại.
3. Xem đầy đủ lời mời.
4. Chọn **Xác nhận** hoặc **Từ chối**.

Nếu lời mời đã gắn số điện thoại, tài khoản phải có đúng số đã xác minh. Với
lời mời không gắn số, tài khoản hợp lệ đầu tiên xác nhận sẽ trở thành người
nhận duy nhất.

Chỗ trong gói chỉ được giữ khi người dùng đã đăng nhập/đăng ký, xác minh số và
xác nhận lời mời. Nếu hết chỗ, hiển thị **Số lượng nhân sự đã đủ**; lời mời chưa
được nhận và có thể thử lại trước khi hết hạn.

## 6. Hồ sơ sau khi xác nhận

### Hồ sơ công việc bắt buộc

- Biệt danh công việc.
- Ảnh đại diện công việc.

Nếu người dùng đã từng làm việc, hiển thị lại dữ liệu phù hợp để chỉnh sửa.
Booking và bất kỳ role nào có quyền đặt phòng đều hiển thị là **Booking** trên
giao diện khách xác nhận đơn.

### Hồ sơ danh tính

Dùng hồ sơ danh tính chung của tài khoản nếu đã có. CCCD và ảnh chân dung không
bắt buộc để đăng ký làm nhân sự; hồ sơ thiếu vẫn được hoàn tất quan hệ làm
việc. Các thông tin này chỉ trở thành bắt buộc ở nghiệp vụ rút tiền sau này.

## 7. Hộp lời mời trong tài khoản

Tách hai nhóm:

- **Lời mời mới:** lời mời gắn đúng số điện thoại và chưa được xác nhận.
- **Đăng ký đang hoàn thiện:** lời mời đã xác nhận nhưng chưa đủ hồ sơ công
  việc.

Một tài khoản có thể có lời mời từ nhiều cơ sở và chọn từng lời mời để xử lý.
Hoàn tất cơ sở A không chặn trang chính chỉ vì còn lời mời ở cơ sở B.

- Tài khoản chưa có nơi làm việc và chỉ có một đăng ký đang dở: khi mở lại ứng
  dụng, gợi ý **Tiếp tục đăng ký**.
- Tài khoản đã có nơi làm việc: vào ứng dụng bình thường, hiển thị số lời mời
  và cho xử lý sau.
- Người dùng có thể từ chối một đăng ký đang dở để giải phóng chỗ.

## 8. Kết quả và ngoại lệ

Khi hoàn tất, hiển thị biệt danh, ảnh, vị trí, mã nhân sự và cơ sở; nơi làm việc
mới xuất hiện trong tài khoản.

Các lỗi cần màn riêng:

- lời mời hết hạn hoặc đã bị thu hồi;
- tài khoản sai số điện thoại;
- cơ sở hoặc gói tạm không hoạt động;
- số lượng nhân sự đã đủ;
- vị trí Phó quản lý không còn trống;
- lời mời đã được người khác tiếp nhận.

## 9. Không thuộc luồng này

- Bổ nhiệm Manager.
- Phân quyền bổ sung.
- Quản trị nhân sự sau khi đã vào làm.
- CCCD/KYC và rút tiền.
- Đăng nhập hoặc gắn ca Thu ngân.
- Cơ chế Universal Link/App Link thực tế và thông báo chủ động.
