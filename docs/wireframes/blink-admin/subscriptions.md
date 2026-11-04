# Wireframe quản lý danh mục gói

## 1. Mục đích

Tài liệu này mô tả các màn hình để Blink Admin tạo và quản lý gói nhân sự
Karaoke. Đây là luồng trong **Admin UI**, không phải màn hình chọn gói của chủ
cơ sở.

- **Người sử dụng:** Blink Admin có quyền đọc hoặc quản lý gói.
- **Nơi hiển thị:** 🖥️ **ADMIN UI**.
- **Điểm vào:** Quản trị hệ thống → Danh mục gói.

## 2. Danh mục màn hình

| Mã     | Điểm vào và nội dung                                                 | Hành động và bước tiếp theo                                                           | Lỗi và kết quả                                             |
| ------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| SUB-01 | Danh mục gói; bộ lọc, trạng thái và tóm tắt từng gói                 | **Tạo gói** hoặc chọn một gói → SUB-02                                                | Trống: gợi ý tạo; lỗi tải: thử lại                         |
| SUB-02 | Tạo/chỉnh sửa; thông tin chung, giới hạn, quyền lợi, thời hạn và giá | **Lưu bản nháp** → SUB-01; **Kích hoạt/Tạm ngừng/Lưu trữ** → SUB-03; **Hủy** → SUB-01 | Đặt lỗi sát trường; dữ liệu vừa đổi thì tải lại            |
| SUB-03 | Xác nhận hành động; giá trị hiện tại, thay đổi, tác động và lý do    | **Xác nhận** → SUB-04; **Quay lại** → SUB-02                                          | Thiếu điều kiện thì giữ trạng thái cũ và chỉ rõ phần thiếu |
| SUB-04 | Kết quả; trạng thái và phiên bản mới của gói                         | **Về danh sách** → SUB-01; **Tiếp tục chỉnh** → SUB-02                                | Nếu lưu thất bại, không hiển thị trạng thái mới            |

Tất cả màn hình SUB nằm trên 🖥️ **ADMIN UI** và chỉ Blink Admin được sử dụng.

## 3. Luồng màn hình

```text
[Danh sách gói]
      ├── Tạo gói mới ──> [Bản nháp] ──> [Kiểm tra] ──> [Kích hoạt]
      └── Chọn một gói ──> [Chi tiết] ──> [Chỉnh sửa / Ngừng cung cấp / Lưu trữ]
```

## 4. Danh sách gói

Hiển thị mỗi gói với:

- tên, mã và loại gói;
- trạng thái: Bản nháp, Đang cung cấp, Tạm ngừng hoặc Đã lưu trữ;
- giới hạn nhân sự;
- các thời hạn đang bán;
- thời điểm cập nhật gần nhất.

Bộ lọc gồm trạng thái, loại gói và ô tìm theo tên hoặc mã. Màn hình có nút
**Tạo gói** và phân trang.

## 5. Tạo và chỉnh sửa gói

### Khối thông tin chung

- Tên gói.
- Mã gói: chỉ nhập khi tạo và không được sửa sau khi kích hoạt.
- Mô tả.
- Loại giá: Miễn phí hoặc Trả phí.
- Số nhân sự tối đa.
- Quyền lợi kết nối Max360: chỉ là một lựa chọn quyền lợi; chưa có màn hình
  kết nối hoặc đồng bộ Max360.

### Khối thời hạn và giá

Với gói trả phí, Admin thêm một hoặc nhiều dòng:

| Trường           | Cách hiển thị                                |
| ---------------- | -------------------------------------------- |
| Thời hạn         | Số tháng, ví dụ 1, 3, 12 hoặc 18 tháng       |
| Giá niêm yết     | Số tiền và đơn vị VND                        |
| Giảm giá         | Từ 0% đến 100%                               |
| Thời gian ưu đãi | Ngày bắt đầu và kết thúc đều có thể để trống |
| Giá cuối         | Backend tính và giao diện chỉ hiển thị       |
| Trạng thái       | Đang bán hoặc Tạm ngừng                      |

Gói miễn phí không hiển thị khối giá. Một gói trả phí chỉ cần ít nhất một thời
hạn hợp lệ để được kích hoạt.

## 6. Hành động và xác nhận

- **Lưu bản nháp:** cho phép lưu khi chưa đủ điều kiện kích hoạt, nhưng dữ liệu
  đã nhập vẫn phải đúng định dạng.
- **Kích hoạt:** mở hộp xác nhận, liệt kê thông tin còn thiếu nếu không hợp lệ.
- **Tạm ngừng:** yêu cầu lý do; người dùng không thể chọn gói cho đăng ký mới.
- **Kích hoạt lại:** xác nhận gói vẫn đủ điều kiện.
- **Lưu trữ:** cảnh báo đây là kết thúc vĩnh viễn; không xóa lịch sử.

Khi hai Admin cùng sửa, giao diện báo dữ liệu đã thay đổi và yêu cầu tải lại,
không âm thầm ghi đè.

## 7. Trạng thái giao diện

- Đang tải: dùng khung chờ ở danh sách hoặc chi tiết.
- Chưa có dữ liệu: giải thích và đưa nút tạo gói.
- Không có quyền: nêu rõ quyền Admin còn thiếu.
- Lỗi kiểm tra: đặt thông báo sát trường sai và giữ dữ liệu đã nhập.
- Thành công: thông báo ngắn, cập nhật lại phiên bản và trạng thái gói.

## 8. Nhật ký

Các thao tác tạo, sửa, kích hoạt, tạm ngừng và lưu trữ được ghi vào Admin
Audit. Contract hiện tại chưa có bộ lọc theo một gói cụ thể, vì vậy trang gói
không hứa hẹn đường dẫn lịch sử riêng. Nếu cần tính năng đó, Backend phải bổ
sung khả năng tra theo đối tượng trong một task riêng.

## 9. Không thuộc wireframe này

- Màn chọn gói của chủ cơ sở.
- Thanh toán, gia hạn và hoàn tiền.
- Tích hợp kỹ thuật với Max360.
- Sửa ngược điều khoản của đăng ký đã tồn tại.
