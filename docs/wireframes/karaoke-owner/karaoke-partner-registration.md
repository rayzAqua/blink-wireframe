# Wireframe đăng ký đối tác Karaoke

## 1. Bề mặt và điểm bắt đầu

Luồng diễn ra trong **ứng dụng Blink đã đăng nhập**. Người dùng phải có tài
khoản đang hoạt động và số điện thoại đã xác minh.

- **Người sử dụng:** người đăng ký làm Owner cơ sở Karaoke đầu tiên.
- **Nơi hiển thị:** 📱 **FLUTTER APP** hoặc 🖥️ **REACT PWA**.
- **Điểm vào:** Đăng ký đối tác → Karaoke.

## 2. Danh mục màn hình

| Mã     | Nội dung/đầu vào                                 | Hành động và bước tiếp theo                           | Lỗi và kết quả                                      |
| ------ | ------------------------------------------------ | ----------------------------------------------------- | --------------------------------------------------- |
| REG-01 | Danh sách gói, thời hạn, giới hạn nhân sự và giá | **Chọn gói** → REG-02; **Hủy** → trang trước          | Gói ngừng bán: tải lại danh mục                     |
| REG-02 | Tên, địa chỉ, hotline tùy chọn và giờ hoạt động  | **Tiếp tục** → REG-03; **Quay lại** → REG-01          | Trùng hotline hoặc dữ liệu sai: giữ biểu mẫu để sửa |
| REG-03 | Logo, ảnh bìa và trạng thái xử lý ảnh            | **Tiếp tục** → REG-04; **Bỏ qua** → REG-04            | Ảnh lỗi/chưa sẵn sàng: thay hoặc chờ xử lý          |
| REG-04 | Tầng và phòng ban đầu, đều có thể bỏ qua         | **Tiếp tục** → REG-05; **Quay lại** → REG-03          | Cấu trúc tầng/phòng/giá sai: chỉ rõ mục cần sửa     |
| REG-05 | Tóm tắt gói, cơ sở, ảnh, tầng và phòng           | **Tạo cơ sở** → REG-06; **Chỉnh sửa** → màn tương ứng | Mất mạng: gửi lại an toàn; không tạo cơ sở dở       |
| REG-06 | Cơ sở đã hoạt động, gói và nội dung chờ hậu kiểm | **Vào quản lý cơ sở** → trang cơ sở                   | Nếu thất bại không hiển thị kết quả thành công      |

Tất cả màn REG nằm trong Flutter/PWA sau đăng nhập; không có public web trong
luồng này.

## 3. Bản đồ luồng

```text
[Bắt đầu đăng ký]
  → [Chọn gói]
  → [Thông tin cơ sở]
  → [Logo và ảnh bìa]
  → [Tầng và phòng — có thể bỏ qua]
  → [Xác nhận]
  → [Cơ sở hoạt động]
```

## 4. Chọn gói

Mỗi thẻ gói hiển thị tên, thời hạn, giới hạn nhân sự, giá niêm yết, ưu đãi và
giá cuối. Nếu gói có nhiều thời hạn, người dùng chọn thời hạn trước khi tiếp
tục. Giao diện không gửi hoặc tự tính giá cuối.

Khi chưa có thanh toán, môi trường thật chỉ cho tiếp tục với lựa chọn có giá
cuối bằng 0 đồng. Đây là bước sử dụng danh mục gói, không phải màn quản trị gói.

## 5. Thông tin cơ sở

### Bắt buộc

- Tên cơ sở.
- Địa chỉ.
- Giờ mở cửa và đóng cửa dùng chung cho mọi ngày.

### Không bắt buộc

- Hotline.
- Logo và ảnh bìa.
- Số tầng.
- Danh sách phòng ban đầu.

Số điện thoại Owner là thông tin cá nhân đã có trên tài khoản, không được nhập
như hotline của cơ sở. Hotline phải duy nhất nếu được cung cấp.

Người dùng chỉ chọn một giờ mở cửa; giao diện hiển thị dòng giải thích giờ đóng
cửa là cùng giờ đó của ngày hôm sau (ADR-027). Không còn nhãn **Mở cửa cả ngày**
và không có trường `closeTime` hay `openAllDay`.

## 6. Logo, ảnh bìa và ảnh phòng

Mỗi vùng ảnh có ba trạng thái dễ hiểu:

1. chưa chọn ảnh;
2. đang tải hoặc đang xử lý;
3. sẵn sàng, có ảnh xem trước và nút thay/xóa.

Không cho gửi đăng ký khi ảnh được chọn vẫn đang xử lý hoặc đã lỗi. Giao diện
chỉ giữ mã ảnh do Media trả về; không hiển thị object key hay URL nội bộ.

## 7. Tầng và phòng ban đầu

Người dùng có thể bỏ qua toàn bộ bước này.

- Nếu nhập số tầng, giao diện tạo danh sách tầng để người dùng đặt tên và gắn
  phòng vào tầng.
- Nếu không tạo tầng, phòng được hiển thị thành một danh sách thẳng.
- Mỗi phòng có tên, sức chứa tùy chọn, ảnh tùy chọn và các khung giá đã được
  Backend hiện hành chấp nhận.
- Không có loại phòng, trạng thái dọn phòng hoặc trạng thái bảo trì.

## 8. Xác nhận và gửi đăng ký

Màn xác nhận chia thành bốn khối: gói đã chọn, thông tin cơ sở, hình ảnh, tầng
và phòng. Mỗi khối có nút quay lại chỉnh sửa.

Khi gửi:

- khóa nút để tránh bấm lặp;
- nếu request được gửi lại do mất mạng, hiển thị đúng kết quả đã tạo thay vì tạo
  thêm cơ sở;
- nếu một phần thất bại, không hiển thị cơ sở được tạo dở.

## 9. Kết quả

Sau thành công, hiển thị:

- tên và địa chỉ cơ sở;
- gói và ngày hết hạn;
- trạng thái **Đang hoạt động — chờ Blink hậu kiểm**;
- nút vào trang quản lý cơ sở;
- gợi ý bổ sung logo, tầng hoặc phòng nếu đã bỏ qua.

Không có màn chờ Admin duyệt trước khi sử dụng.

## 10. Lỗi chính

- Tài khoản hoặc số điện thoại chưa đủ điều kiện.
- Người dùng đã là Owner và phải dùng luồng tạo chi nhánh.
- Gói hoặc thời hạn vừa ngừng cung cấp.
- Hotline đã được dùng.
- Ảnh chưa sẵn sàng hoặc không thuộc người đăng ký.
- Dữ liệu tầng, phòng hoặc giá không hợp lệ.
