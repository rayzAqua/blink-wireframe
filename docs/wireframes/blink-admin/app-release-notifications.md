# Wireframe cập nhật phiên bản và bảo trì

## 1. Người dùng và nơi hiển thị

- Blink Admin thao tác trên 🖥️ **ADMIN UI**.
- Người dùng ứng dụng nhìn thấy kết quả trên 📱 **FLUTTER APP** hoặc 🖥️ **REACT
  PWA**.

Admin UI đã có consumer. Các màn hình Flutter/React bên dưới là bàn giao theo
contract Backend đã kiểm chứng; BBN-059 chưa tìm thấy consumer hiện hành và
không tuyên bố chúng đã được triển khai.

## 2. Bản đồ luồng

```text
Admin tạo bản nháp phiên bản hoặc lịch bảo trì
  → Chỉnh sửa → Công bố hoặc hủy

Ứng dụng khởi động
  → Kiểm tra phiên bản và bảo trì
  ├─ Đang bảo trì → Màn hình bảo trì
  ├─ Bắt buộc cập nhật → Chỉ cho cập nhật
  ├─ Khuyến nghị cập nhật → Cho cập nhật hoặc tiếp tục theo chính sách
  ├─ Sắp bảo trì → Cảnh báo không chặn
  └─ Đang ở bản mới nhất → Có thể hiện “Có gì mới” một lần trên thiết bị
```

## 3. Màn hình Admin quản lý phiên bản

### REL-01 — Danh sách phiên bản

- Lọc theo nền tảng và trạng thái.
- Mỗi dòng hiển thị phiên bản, build mới nhất, ngưỡng khuyến nghị/bắt buộc,
  thời điểm hiệu lực và trạng thái.
- **Thao tác:** tạo mới hoặc mở chi tiết.

### REL-02 — Tạo hoặc sửa bản nháp

- Chọn nền tảng; nhập tên phiên bản, các mốc build, tiêu đề/nội dung “Có gì
  mới” và thời điểm hiệu lực.
- Với Web, không hiện ô URL; giải thích rằng PWA cập nhật ngay trên website đang
  mở. Với Android/iOS, URL Google Play/App Store là bắt buộc.
- Nhập build thử nghiệm để xem trực tiếp REQUIRED, RECOMMENDED, OPTIONAL hoặc
  NONE. Preview giữ tiêu đề trạng thái cố định, sau đó hiển thị tiêu đề nội dung
  do Admin nhập, version name, summary và đúng các nút người dùng sẽ thấy.
- Preview có nhãn **Bản xem trước — chưa phát hành**; mọi nút đều chỉ minh họa,
  không thực hiện cập nhật thật.
- Giải thích ngay trên form rằng lưu draft chưa thông báo; chỉ policy đã phát
  hành và tới giờ hiệu lực mới xuất hiện ở lần kiểm tra phiên bản tiếp theo.
- **Thao tác:** lưu bản nháp, công bố hoặc hủy thay đổi.
- Phiên bản đã công bố chỉ được xem; muốn thay đổi phải tạo bản mới.

### REL-03 — Xác nhận công bố hoặc hủy

- Hiển thị tác động tới thiết bị theo từng ngưỡng build.
- Bắt buộc nhập lý do và xác nhận.
- Nếu dữ liệu vừa được người khác sửa, tải lại trước khi tiếp tục.

## 4. Màn hình Admin quản lý bảo trì

### MNT-01 — Danh sách lịch bảo trì

- Hiển thị thời gian, trạng thái và nội dung từng lịch.
- **Thao tác:** tạo mới hoặc mở chi tiết.

### MNT-02 — Tạo hoặc sửa lịch

- Nhập tiêu đề, nội dung, thời gian bắt đầu và kết thúc.
- Không cho lưu khi bắt đầu không sớm hơn kết thúc.
- Không cho công bố lịch đã kết thúc hoặc chồng với lịch công bố khác.

### MNT-03 — Công bố hoặc hủy lịch

- Hiển thị thời gian ảnh hưởng toàn hệ thống và yêu cầu lý do.
- Thành công: cập nhật danh sách và lưu dấu vết trong Admin Audit.

## 5. Màn hình trên ứng dụng

### APP-01 — Cập nhật bắt buộc

- Hiển thị phiên bản mới, nội dung chính và nút **Cập nhật ngay**.
- Không có nút bỏ qua.
- Nếu đường dẫn cập nhật không thể mở, cho thử lại và hướng dẫn an toàn.

### APP-02 — Cập nhật khuyến nghị

- Hiển thị lợi ích của phiên bản mới, **Cập nhật** và hành động tiếp tục nếu
  chính sách cho phép.

### APP-03 — Có gì mới

- Chỉ hiện khi thiết bị đang chạy đúng bản mới nhất và chưa xem release này.
- Sau khi đóng, thiết bị tự ghi nhớ; không gửi trạng thái đã xem về Backend.

### APP-04 — Sắp bảo trì

- Cảnh báo không chặn với giờ bắt đầu và kết thúc.
- Người dùng vẫn tiếp tục sử dụng ứng dụng.

### APP-05 — Đang bảo trì

- Chặn nghiệp vụ và hiển thị nội dung bảo trì cùng thời gian dự kiến hoạt động
  lại.
- Có nút **Kiểm tra lại**. Khi bảo trì kết thúc, quay về luồng khởi động bình
  thường.

## 6. Audit và giới hạn

- Tạo, sửa, công bố và hủy của Admin được lưu trong Admin Audit.
- Không có màn hình chọn người nhận, đánh dấu đã đọc, xem sau, analytics hoặc
  gửi push notification.
