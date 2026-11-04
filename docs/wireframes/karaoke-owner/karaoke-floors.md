# Wireframe quản trị tầng Karaoke

## 1. Bề mặt sử dụng

Luồng nằm trong **ứng dụng quản lý cơ sở Karaoke**. Người có quyền xem phòng
được xem danh sách tầng; thay đổi cấu trúc tầng và đóng/mở tầng là hai quyền
riêng.

- **Người sử dụng:** Owner, Manager hoặc Vice Manager theo quyền được cấp.
- **Nơi hiển thị:** 📱 **FLUTTER APP** hoặc 🖥️ **REACT PWA**.
- **Điểm vào:** Quản lý cơ sở → Tầng và phòng.

## 2. Danh mục màn hình

| Mã     | Nội dung/đầu vào                                                  | Hành động và bước tiếp theo                                     | Lỗi và kết quả                                           |
| ------ | ----------------------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------- |
| FLR-01 | Chế độ danh sách phẳng hoặc các nhóm tầng, trạng thái và số phòng | **Thiết lập/Thay đổi tầng** → FLR-02; **Đóng/Mở tầng** → FLR-04 | Không có tầng/phòng: hiển thị hướng dẫn phù hợp          |
| FLR-02 | Số tầng và vùng phân toàn bộ phòng; nhóm tạm “Chưa xếp tầng”      | **Kiểm tra** → FLR-03; **Hủy** → FLR-01                         | Còn phòng chưa xếp thì khóa nút lưu                      |
| FLR-03 | Tóm tắt tăng/giảm/tắt tầng và phòng bị ảnh hưởng                  | **Lưu cấu hình** → FLR-01; **Quay lại** → FLR-02                | Tầng còn phòng hoặc dữ liệu vừa đổi: tải lại/sắp xếp lại |
| FLR-04 | Xác nhận đóng/mở một tầng và ảnh hưởng tới đơn hiện có            | **Xác nhận** → FLR-01; **Giữ nguyên** → FLR-01                  | Thiếu quyền hoặc tầng vừa đổi: giữ trạng thái cũ         |

Tất cả màn FLR nằm trong Flutter/PWA sau đăng nhập.

## 3. Hai chế độ hiển thị

### Cơ sở không dùng tầng

- Hiển thị một danh sách phòng phẳng.
- Có hành động **Thiết lập tầng** nếu người dùng có quyền.

### Cơ sở dùng tầng

- Mỗi tầng là một nhóm có số tầng, trạng thái và số phòng.
- Mở nhóm để xem các phòng thuộc tầng.
- Không để lại phòng không gắn tầng sau khi lưu cấu hình.

## 4. Thiết lập tầng lần đầu

```text
[Danh sách phòng phẳng]
  → [Nhập số tầng]
  → [Tầng 1, Tầng 2, ...]
  → [Phân toàn bộ phòng vào tầng]
  → [Kiểm tra]
  → [Lưu cấu hình]
```

Trong lúc người dùng đang sắp xếp, phòng chưa chọn tầng nằm trong nhóm tạm
**Chưa xếp tầng**. Nút lưu bị khóa cho đến khi nhóm này trống. Đây chỉ là trạng
thái trên giao diện trước khi gửi; Backend không lưu trạng thái nửa có tầng,
nửa không tầng.

## 5. Tăng hoặc giảm số tầng

- Tăng số tầng: hiển thị các tầng mới liên tiếp và để trống.
- Giảm số tầng: chỉ cho bỏ các tầng cao nhất.
- Nếu tầng cần bỏ còn phòng, yêu cầu chuyển hết phòng trước; không tự chuyển.
- Một request thất bại giữ nguyên cấu trúc cũ.

Khi dữ liệu vừa được người khác thay đổi, giao diện báo **Cấu trúc tầng đã thay
đổi, vui lòng tải lại** thay vì ghi đè.

## 6. Tắt cơ chế tầng

Hộp xác nhận nói rõ:

- toàn bộ phòng vẫn được giữ;
- liên kết tầng bị gỡ;
- giao diện trở lại danh sách phòng phẳng;
- đơn đã đặt và phòng đang sử dụng không bị hủy.

## 7. Đóng và mở lại tầng

Tầng mở có hành động **Đóng tầng**; tầng đóng có hành động **Mở lại**.

Khi đóng tầng, hộp xác nhận ghi rõ:

- không nhận đặt phòng mới ở tầng này;
- đơn đã đặt vẫn được giữ;
- phòng đang hát vẫn tiếp tục;
- tầng và phòng vẫn hiện trong màn quản lý.

Trạng thái tầng phải được thể hiện bằng nhãn và chữ, không chỉ bằng màu.

## 8. Chuyển phòng giữa các tầng

Màn chi tiết phòng cho chọn một tầng đang tồn tại của cùng cơ sở. Khi cơ sở đã
dùng tầng, không cho lưu phòng ở trạng thái chưa chọn tầng.

Thao tác thay đổi cấu trúc tầng và chuyển phòng có thể phải chờ thao tác trước
đó hoàn tất. Giao diện chỉ hiển thị trạng thái đang xử lý; đây không phải cơ
chế khóa có tên người đang thao tác.

## 9. Trạng thái và lỗi

- Không có tầng: giải thích cơ sở đang dùng danh sách phòng phẳng.
- Không có phòng: vẫn cho tạo tầng trống.
- Thiếu quyền: thông báo chung với role cơ sở; Admin mới được xem mã quyền.
- Tầng còn phòng khi giảm: chỉ rõ tầng và số phòng cần chuyển.
- Tầng đã thay đổi: yêu cầu tải lại dữ liệu.

## 10. Minh họa phụ

Xem [prototype tương tác tạo tầng](../../../../initiatives/karaoke-floors/floor-creation-flow.html). Prototype là minh
họa thao tác; tài liệu này là nguồn mô tả phạm vi hiện hành.
