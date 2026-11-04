# Wireframe Admin Audit

## 1. Người dùng và nơi hiển thị

- **Người dùng:** Blink Admin có quyền đọc Audit.
- **Nơi hiển thị:** 🖥️ **ADMIN UI**.
- **Điểm vào:** Quản trị hệ thống → Nhật ký hoạt động.

Owner, Manager và nhân sự cơ sở không nhìn thấy mục này.

## 2. Bản đồ luồng

```text
Mở Nhật ký hoạt động
  → Xem sự kiện mới nhất
  → Lọc theo hành động hoặc người thực hiện
  → Chọn một sự kiện
  → Xem chi tiết an toàn
```

## 3. Các màn hình

### AUD-01 — Danh sách sự kiện

- Hiển thị thời gian, người thực hiện, mô tả hành động, loại đối tượng và định
  danh đối tượng nếu có.
- Sắp xếp mới nhất trước.
- Cho chuyển trang; mỗi trang tối đa theo giới hạn Backend cho phép.
- **Bộ lọc:** hành động và người thực hiện.
- **Trạng thái trống:** “Chưa có sự kiện phù hợp.”
- **Lỗi:** cho thử tải lại; không hiển thị nội dung kỹ thuật của lỗi.

### AUD-02 — Chi tiết sự kiện

- Hiển thị người thực hiện, thời gian, hành động, đối tượng và chi tiết an toàn
  liên quan.
- Không hiển thị secret, token, mật khẩu, OTP hoặc URL riêng tư.
- Chỉ đọc; không có thao tác sửa hoặc xóa.

## 4. Cách trình bày hành động

Mục tiêu giao diện là câu dễ hiểu, ví dụ:

> Nguyễn Văn A đã tạm dừng nhân sự B tại Karaoke C.
> Lý do: Vi phạm quy định làm việc.

Backend hiện chưa có catalog chuyển toàn bộ action code và metadata thành câu
trên. Khi chưa có catalog, Figma cần dành cấu trúc cho mô tả thân thiện nhưng
Frontend không được tự suy đoán ý nghĩa dữ liệu nhạy cảm. Đây là khoảng trống
contract cần task riêng nếu triển khai UI mới.

## 5. Trạng thái quyền và giới hạn

- Blink Admin thiếu quyền nhận thông báo chỉ rõ quyền Audit còn thiếu.
- Không có bộ lọc ngày, loại đối tượng, export hoặc tìm kiếm toàn văn trong phạm
  vi hiện tại.
- Nhật ký nghiệp vụ mà Owner/Manager được xem nằm trong màn hình nghiệp vụ tương
  ứng, không điều hướng tới Admin Audit.
