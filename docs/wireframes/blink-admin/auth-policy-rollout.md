# Wireframe quản lý điều khoản và chính sách

## 1. Mục đích và phạm vi

Tài liệu mô tả Blink Admin quản lý phiên bản Điều khoản sử dụng và Chính sách
quyền riêng tư. Wireframe chỉ bao phủ vòng đời đã được Backend kiểm chứng; không
tự sáng tác nội dung pháp lý.

## 2. Người dùng và nơi hiển thị

- **Người dùng:** Blink Admin có quyền xem hoặc cập nhật chính sách.
- **Nơi hiển thị:** 🖥️ **ADMIN UI**.
- **Điểm vào:** Cấu hình hệ thống → Điều khoản và chính sách.

## 3. Bản đồ luồng

```text
Danh sách chính sách
  → Chọn Điều khoản hoặc Chính sách quyền riêng tư
  → Xem các phiên bản
  ├─ Tạo bản nháp → Chỉnh sửa → Công bố
  └─ Chọn bản đã công bố → Ngừng áp dụng
```

## 4. Các màn hình

### LEGAL-01 — Danh sách chính sách

- Hiển thị từng loại chính sách, phiên bản đang có hiệu lực và trạng thái sẵn
  sàng cho đăng ký tài khoản.
- Cảnh báo rõ nếu thiếu Điều khoản hoặc Chính sách quyền riêng tư đang hiệu lực.
- **Thao tác:** mở chi tiết một chính sách.

### LEGAL-02 — Lịch sử phiên bản

- Hiển thị phiên bản, ngôn ngữ, tiêu đề, thời điểm hiệu lực và trạng thái dễ
  hiểu: **Bản nháp**, **Đã công bố**, **Đã ngừng áp dụng**.
- **Thao tác:** tạo bản nháp mới; mở bản nháp để sửa; mở bản đã công bố để xem
  hoặc ngừng áp dụng.

### LEGAL-03 — Tạo hoặc sửa bản nháp

- Nhập phiên bản, ngôn ngữ, tiêu đề, đường dẫn văn bản đã được duyệt, mã kiểm
  tra nội dung và thời điểm hiệu lực.
- Nhập lý do tạo hoặc chỉnh sửa.
- **Thao tác chính:** Lưu bản nháp.
- **Lỗi:** dữ liệu thiếu/sai, phiên bản trùng hoặc dữ liệu vừa được Admin khác
  cập nhật.

### LEGAL-04 — Xác nhận công bố

- Hiển thị bản tóm tắt và cảnh báo rằng nội dung sau khi công bố không được sửa
  trực tiếp; muốn thay đổi phải tạo phiên bản mới.
- Bắt buộc nhập lý do.
- **Thao tác chính:** Công bố phiên bản.
- **Kết quả:** phiên bản xuất hiện trong catalog công khai khi tới thời điểm có
  hiệu lực.

### LEGAL-05 — Xác nhận ngừng áp dụng

- Chỉ áp dụng cho phiên bản đã công bố.
- Cảnh báo nếu thao tác làm mất phiên bản bắt buộc cuối cùng đang phục vụ đăng
  ký; trường hợp này không cho tiếp tục.
- Bắt buộc nhập lý do.
- **Thao tác chính:** Ngừng áp dụng.

## 5. Audit và phần chưa hỗ trợ

- Tạo, sửa, công bố và ngừng áp dụng đều được lưu trong Admin Audit với người
  thực hiện và lý do.
- BBN-059 chưa mô tả màn hình người đăng ký đồng ý điều khoản vì consumer hiện
  tại chưa có đủ bằng chứng triển khai thống nhất. Wireframe đó phải thuộc luồng
  đăng ký tài khoản khi được hoàn thiện.
- Không có thao tác xóa phiên bản đã có bằng chứng đồng ý của người dùng.
