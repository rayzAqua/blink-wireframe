# BBN-101 — Wireframe global consent gate

## 1. Mục đích và phạm vi

Wireframe mô tả trải nghiệm user đã đăng nhập nhưng còn thiếu policy version bắt
buộc. Đây là màn hình self-service của consumer, không phải Admin UI và không
thay thế màn hình đăng ký hiện tại.

## 2. Người dùng và nơi hiển thị

- **Người dùng:** user Blink đã đăng nhập.
- **Nơi hiển thị:** **REACT PWA** hoặc **FLUTTER APP**.
- **Điểm bắt đầu:** sau login/refresh/restore session hoặc khi một API báo cần
  xác nhận lại.

## 3. Bản đồ luồng

```text
Khôi phục phiên
  ├─ Đủ policy → vào ứng dụng
  └─ Còn thiếu → Global consent gate
                    ├─ Mở tài liệu Terms/Privacy
                    ├─ Tích đủ policy bắt buộc
                    ├─ Xác nhận → thành công → retry màn hình ban đầu
                    ├─ Catalog/network lỗi → Retry
                    └─ Logout → kết thúc phiên
```

## 4. Màn hình

### CONSENT-01 — Xác nhận lại điều khoản

- **Nơi hiển thị:** REACT PWA desktop dạng modal-like blocking; FLUTTER APP
  full-screen.
- **Nội dung:** giải thích rằng Blink đã cập nhật điều khoản/chính sách; hiển
  thị danh sách tài liệu bắt buộc, version và thời điểm áp dụng.
- **Thao tác:** mở từng tài liệu; tích từng checkbox; bấm **Xác nhận và tiếp
  tục** khi đã tích đủ.
- **Thao tác phụ:** **Đăng xuất**.
- **Không có:** Bỏ qua, Để sau, đóng modal hoặc tiếp tục dùng app khi chưa xác
  nhận.
- **Màn hình tiếp theo:** màn hình user đang định mở trước đó sau khi acceptance
  thành công.
- **Lỗi có thể khôi phục:** catalog hết hiệu lực hoặc vừa đổi version → tải lại
  danh sách và yêu cầu tích lại; network lỗi → hiển thị Retry và Logout.

### CONSENT-02 — Policy catalog đã thay đổi

- **Nơi hiển thị:** cùng gate hiện tại.
- **Điểm vào:** user bấm xác nhận nhưng policy đã đổi trong lúc đọc.
- **Nội dung:** thông báo “Chính sách vừa được cập nhật. Vui lòng tải lại và xem
  version mới.”
- **Thao tác:** **Tải lại policy** hoặc **Đăng xuất**.
- **Kết quả:** không ghi nhận version cũ; sau khi tải lại, danh sách mới thay thế
  danh sách cũ.

### CONSENT-03 — Không tải được policy

- **Nơi hiển thị:** cùng gate hiện tại.
- **Nội dung:** không hiển thị checkbox đã chọn từ lần trước như bằng chứng;
  nêu rõ hệ thống chưa tải được dữ liệu hiện hành.
- **Thao tác:** Retry hoặc Logout.
- **Kết quả:** Retry thành công quay về CONSENT-01; Logout kết thúc phiên.

## 5. Multi-tab và nhiều thiết bị

- Tab đầu tiên xác nhận thành công thì các tab khác tải lại trạng thái và đóng
  gate.
- Tab gửi version cũ nhận thông báo policy đã thay đổi, không tự sửa payload.
- Thiết bị khác vẫn có thể hiện gate cho tới khi gọi lại endpoint status; consent
  thành công trên một thiết bị không cần user xác nhận lại trên thiết bị kia.
