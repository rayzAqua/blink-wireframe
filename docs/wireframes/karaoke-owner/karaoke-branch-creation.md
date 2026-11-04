# Wireframe tạo chi nhánh Karaoke

## 1. Bề mặt và điểm bắt đầu

Luồng nằm trong **ứng dụng quản lý của Owner**. Chỉ Owner đang hoạt động và có
quyền tạo chi nhánh mới thấy hành động này.

- **Người sử dụng:** Owner của chuỗi Karaoke.
- **Nơi hiển thị:** 📱 **FLUTTER APP** hoặc 🖥️ **REACT PWA**.
- **Điểm vào:** Cơ sở của tôi → Tạo chi nhánh.

## 2. Danh mục màn hình

| Mã    | Nội dung/đầu vào                                | Hành động và bước tiếp theo                              | Lỗi và kết quả                                |
| ----- | ----------------------------------------------- | -------------------------------------------------------- | --------------------------------------------- |
| BR-01 | Danh sách các chi nhánh cùng cấp của Owner      | **Tạo chi nhánh** → BR-02; chọn cơ sở → trang quản lý    | Thiếu quyền: không cho bắt đầu                |
| BR-02 | Tên, địa chỉ, hotline tùy chọn và giờ hoạt động | **Tiếp tục** → BR-03; **Hủy** → BR-01                    | Trùng hotline hoặc dữ liệu sai: giữ để sửa    |
| BR-03 | Gói, thời hạn, giới hạn và giá                  | **Chọn gói** → BR-04; **Quay lại** → BR-02               | Gói vừa ngừng bán: tải lại                    |
| BR-04 | Logo/ảnh bìa, tầng và phòng tùy chọn            | **Tiếp tục** → BR-05; **Bỏ qua** → BR-05                 | Ảnh hoặc cấu trúc sai: chỉ rõ mục cần sửa     |
| BR-05 | Tóm tắt toàn bộ chi nhánh                       | **Tạo chi nhánh** → BR-06; **Chỉnh sửa** → màn tương ứng | Gửi lại an toàn; không tạo chi nhánh dở       |
| BR-06 | Chi nhánh hoạt động và chờ hậu kiểm             | **Vào quản lý chi nhánh** → trang cơ sở                  | Thất bại thì không hiện trạng thái thành công |

Tất cả màn BR nằm trong Flutter/PWA sau đăng nhập.

## 3. Bản đồ luồng

```text
[Danh sách cơ sở của tôi]
  → [Tạo chi nhánh]
  → [Thông tin chi nhánh]
  → [Chọn gói]
  → [Tầng và phòng — có thể bỏ qua]
  → [Xác nhận]
  → [Chi nhánh hoạt động]
```

## 4. Cách trình bày chuỗi và chi nhánh

Màn hình đầu hiển thị Owner sở hữu một chuỗi và danh sách các chi nhánh cùng
cấp. Người dùng không chọn một chi nhánh làm “cơ sở cha” và giao diện không vẽ
quan hệ ông–cha–con.

Chi nhánh mới không tự sao chép gói, nhân sự, Manager, phòng hoặc cấu hình từ
chi nhánh khác.

## 5. Thông tin chi nhánh

### Bắt buộc

- Tên chi nhánh.
- Địa chỉ.
- Giờ mở cửa và đóng cửa.

### Không bắt buộc

- Hotline riêng, nhưng phải duy nhất nếu nhập.
- Logo và ảnh bìa.
- Số tầng.
- Phòng ban đầu.

Thông tin ảnh dùng cùng trạng thái **chưa chọn / đang xử lý / sẵn sàng** như
luồng đăng ký đối tác.

## 6. Chọn gói

Chi nhánh chủ động chọn một gói và thời hạn đang được cung cấp. Giao diện hiển
thị giá, ưu đãi, giá cuối, thời hạn và giới hạn nhân sự. Không mặc định kế thừa
gói của chi nhánh khác và không cho client tự quyết định giá cuối.

## 7. Tầng và phòng tùy chọn

Owner có thể:

- bỏ qua và cấu hình sau;
- tạo tầng trước rồi gắn phòng;
- không dùng tầng và tạo danh sách phòng thẳng;
- tải ảnh cho từng phòng và nhập bảng giá hiện hành.

Không hiển thị loại phòng legacy, trạng thái dọn phòng hoặc bảo trì phòng.

## 8. Xác nhận và kết quả

Màn xác nhận hiển thị chi nhánh, gói, hình ảnh, tầng và phòng. Khi gửi, nút bị
khóa và việc gửi lại cùng thao tác phải trả về kết quả cũ thay vì tạo trùng.

Sau thành công:

- chi nhánh có trạng thái **Đang hoạt động — chờ Blink hậu kiểm**;
- chi nhánh xuất hiện ngang hàng trong danh sách cơ sở của Owner;
- hiển thị nút vào quản lý chi nhánh;
- gợi ý cấu hình phần đã bỏ qua.

Không tự tạo Manager, nhân sự hoặc tài khoản Thu ngân trong luồng này.

## 9. Lỗi chính

- Không phải Owner hoặc thiếu quyền tạo chi nhánh.
- Gói hay thời hạn vừa ngừng cung cấp.
- Hotline bị trùng.
- Ảnh chưa sẵn sàng.
- Dữ liệu tầng, phòng hoặc giá không hợp lệ.
- Dữ liệu đã thay đổi trong lúc xác nhận: yêu cầu tải lại trước khi gửi.
