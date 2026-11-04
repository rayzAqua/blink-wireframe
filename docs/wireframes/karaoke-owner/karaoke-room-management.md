# Wireframe quản trị phòng Karaoke

## 1. Bề mặt sử dụng

- **Người sử dụng:** Owner, Manager hoặc nhân sự có quyền phòng tương ứng.
- **Nơi hiển thị:** 📱 **FLUTTER APP** hoặc 🖥️ **REACT PWA**.
- **Điểm vào:** Quản lý cơ sở → Phòng.

## 2. Danh mục màn hình

| Mã      | Nội dung/đầu vào                                                 | Hành động và bước tiếp theo                                             | Lỗi và kết quả                                         |
| ------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------ |
| ROOM-01 | Danh sách/lưới phòng, tìm kiếm, trạng thái, tầng và giá đang xem | **Tạo phòng** → ROOM-02; chọn phòng → ROOM-03                           | Trống: gợi ý tạo; lỗi tải: thử lại                     |
| ROOM-02 | Tên, sức chứa, ưu tiên, tầng, ảnh và bảng giá hiện hành          | **Tạo** → ROOM-03; **Hủy** → ROOM-01                                    | Đặt lỗi sát trường; cấu trúc tầng đổi thì tải lại      |
| ROOM-03 | Chi tiết, hồ sơ phòng, ảnh, giá và lịch sử trạng thái            | **Sửa** → lưu tại ROOM-03; **Quản lý ảnh** → ROOM-04; **Xóa** → ROOM-05 | Dữ liệu vừa đổi: tải lại; thiếu quyền: thông báo chung |
| ROOM-04 | Danh sách ảnh, trạng thái xử lý và thứ tự                        | **Thêm/Sắp xếp/Xóa ảnh** → ROOM-03; **Quay lại** → ROOM-03              | Ảnh lỗi/chưa sẵn sàng: thay hoặc thử lại               |
| ROOM-05 | Xác nhận đưa phòng khỏi vận hành nhưng vẫn giữ lịch sử           | **Xác nhận** → ROOM-01; **Giữ phòng** → ROOM-03                         | Phòng đã đặt/đang hát: không xóa, quay lại chi tiết    |

Tất cả màn ROOM nằm trong Flutter/PWA sau đăng nhập.

## 3. Màn danh sách

### Không dùng tầng

Hiển thị một danh sách hoặc lưới phòng. Mỗi mục có ảnh đại diện, tên, sức chứa,
trạng thái hiện tại và giá tại thời điểm đang xem.

### Có dùng tầng

Nhóm phòng theo Tầng 1, Tầng 2… và hiển thị nhãn tầng mở/đóng. Backend không
lưu phòng chưa xếp tầng trong chế độ này. Nhóm **Chưa xếp tầng** chỉ xuất hiện
tạm thời khi người quản lý đang cấu hình tầng và chưa bấm lưu.

Bộ lọc gồm từ khóa, trạng thái và tầng; có phân trang.

## 4. Tạo phòng

Biểu mẫu gồm:

- tên phòng bắt buộc;
- sức chứa tùy chọn;
- thứ tự ưu tiên;
- tầng bắt buộc nếu cơ sở đang dùng tầng, không hiện nếu cơ sở dùng danh sách
  phẳng;
- ảnh phòng tùy chọn;
- bảng giá theo contract hiện hành.

Không hiển thị loại phòng, trạng thái dọn phòng hoặc bảo trì.

## 5. Chi tiết và chỉnh sửa

Trang chi tiết chia thành:

1. thông tin phòng;
2. ảnh;
3. giá hiện tại và lịch sử giá;
4. lịch sử trạng thái.

Người dùng có thể sửa tên, sức chứa, độ ưu tiên và chuyển sang một tầng khác
của cùng cơ sở. Không cho lưu tên chỉ gồm khoảng trắng.

## 6. Quản lý ảnh

- Tải ảnh mới và chờ trạng thái xử lý xong.
- Xem trước ảnh thường hoặc ảnh 360 độ.
- Kéo/sắp xếp thứ tự.
- Xóa ảnh qua hộp xác nhận.
- Khi xóa thành công, bỏ ảnh khỏi danh sách; Backend tự xử lý dọn Media.

## 7. Xóa phòng

Chỉ hiện hành động nếu người dùng có quyền cấu hình phòng. Hộp xác nhận giải
thích đây là xóa khỏi vận hành nhưng vẫn giữ lịch sử.

- Phòng Trống: có thể xóa.
- Phòng Đã đặt hoặc Đang hát: Backend từ chối; giao diện nói rõ cần kết thúc
  nghiệp vụ hiện tại trước.

Không đổi tên thao tác này thành “Đóng phòng”, vì Backend chưa có vòng đời
đóng/mở riêng cho từng phòng.

## 8. Đồng thời và lỗi

Khi cấu trúc tầng thay đổi trước khi request được xử lý, giao diện tải lại danh
sách tầng và giữ dữ liệu người dùng có thể giữ được. Khi bảng giá vừa được thay
ở máy khác, yêu cầu tải lại trước khi gửi lại.

Không hiển thị “người A đang khóa dữ liệu”; khóa hiện tại chỉ tuần tự hóa xử lý
trong Backend.

## 9. Quyền trên giao diện

- Chỉ xem: danh sách, chi tiết, ảnh, giá và lịch sử.
- Cấu hình phòng: tạo, sửa, chuyển tầng và xóa.
- Quản lý ảnh: thêm, sắp xếp và xóa ảnh.
- Quản lý giá: thay bảng giá.

Các role cơ sở thiếu quyền nhận thông báo chung **Bạn không có quyền truy
cập**; không để lộ mã permission.
