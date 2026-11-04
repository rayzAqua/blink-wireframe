# Wireframe quản lý thông tin đăng nhập Thu ngân

## 1. Phạm vi hiện hành

Màn hình nằm trong **ứng dụng quản lý cơ sở Karaoke**. Nó cho phép Owner,
Manager và Vice Manager theo quyền thực tế xem trạng thái credential; xem lại,
đặt lại hoặc vô hiệu hóa mật khẩu.

- **Nơi hiển thị:** 📱 **FLUTTER APP** hoặc 🖥️ **REACT PWA**.
- **Điểm vào:** Quản lý cơ sở → Thu ngân → Thông tin đăng nhập.

Wireframe này không mô tả đăng nhập Terminal, phiên, gắn ca hoặc đăng nhập
nhanh như tính năng đã hoàn thành.

## 2. Danh mục màn hình

| Mã     | Người dùng, nội dung/đầu vào                                                 | Hành động và bước tiếp theo                                                 | Lỗi và kết quả                                                           |
| ------ | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| CSH-01 | Owner/Manager/Vice; cơ sở, trạng thái, mật khẩu đã che và ngày thay gần nhất | **Xem lại** → CSH-02; **Đặt lại** → CSH-03; **Vô hiệu hóa** → CSH-04        | Thiếu quyền: thông báo chung; chưa có thông tin đăng nhập: liên hệ Blink |
| CSH-02 | Người có quyền xem; bước xác minh lại và mật khẩu rõ trong thời gian ngắn    | **Xác minh và xem** → hiện rồi tự che; **Hủy** → CSH-01                     | Lần xác minh sai/hết hạn/đã dùng: xác minh lại, giữ mật khẩu che         |
| CSH-03 | Owner/Manager; cảnh báo mật khẩu cũ và phiên đang lưu mất hiệu lực           | **Xác minh và đặt lại** → hiện mật khẩu mới rồi về CSH-01; **Hủy** → CSH-01 | Thất bại: không đổi mật khẩu hoặc trạng thái                             |
| CSH-04 | Owner/Manager; cảnh báo vô hiệu hóa và thu hồi phiên đang lưu                | **Xác minh và vô hiệu hóa** → CSH-01; **Giữ hoạt động** → CSH-01            | Thất bại: credential vẫn giữ trạng thái cũ                               |

Tất cả màn CSH nằm trong Flutter/PWA sau đăng nhập bằng tài khoản quản lý.

## 3. Tổng quan tài khoản Thu ngân

Hiển thị:

- tên và địa chỉ cơ sở;
- trạng thái **Đang hoạt động** hoặc **Đã vô hiệu hóa**;
- mật khẩu đã che dạng `••••-••••-••••`;
- thời điểm mật khẩu được thay gần nhất;
- nút hành động theo quyền.

Không dùng QR. Người dùng không tự đặt mật khẩu và mật khẩu không được suy ra
từ tên, hotline hoặc số điện thoại của cơ sở.

## 4. Xem lại mật khẩu

Owner, Manager và Vice Manager có quyền mặc định:

```text
[Mật khẩu đã che]
  → [Xem mật khẩu]
  → [Xác minh lại tài khoản quản lý]
  → [Hiện mật khẩu trong thời gian ngắn]
  → [Tự che lại]
```

Màn xác minh lại phải nói rõ đây là thao tác xem dữ liệu nhạy cảm. Proof chỉ
dùng một lần và đúng cho hành động xem mật khẩu.

Sau thành công:

- hiện mật khẩu theo nhóm dễ đọc;
- có nút sao chép;
- không lưu vào lịch sử clipboard của ứng dụng nếu nền tảng cho phép kiểm soát;
- tự che khi hết thời gian hoặc rời màn;
- không đưa mật khẩu vào analytics, log hoặc ảnh xem trước ứng dụng.

## 5. Đặt lại mật khẩu

Owner và Manager có quyền mặc định; Vice Manager không có mặc định.

Hộp xác nhận nói rõ:

- Backend tự sinh mật khẩu mới;
- mật khẩu cũ mất hiệu lực;
- mọi phiên Terminal đang lưu sẽ bị thu hồi;
- thiết bị Thu ngân sẽ phải đăng nhập lại khi luồng đăng nhập được hoàn thiện.

Sau khi xác minh lại, hiển thị mật khẩu mới một cách bảo vệ giống màn xem lại.
Không yêu cầu người quản lý nhập hoặc xác nhận một mật khẩu tự chọn.

## 6. Vô hiệu hóa

Owner và Manager có quyền mặc định. Hộp xác nhận nói rõ tài khoản Thu ngân của
cơ sở không thể đăng nhập và các phiên đang lưu bị thu hồi. Thao tác yêu cầu xác
minh lại tài khoản quản lý.

Sau thành công, màn tổng quan chuyển sang **Đã vô hiệu hóa**. Đặt lại mật khẩu
trong tương lai sẽ tạo mật khẩu mới và kích hoạt lại credential.

## 7. Quyền và lỗi

| Người dùng                  | Xem trạng thái | Xem lại | Đặt lại        | Vô hiệu hóa    |
| --------------------------- | -------------- | ------- | -------------- | -------------- |
| Owner                       | Có             | Có      | Có             | Có             |
| Manager đúng chi nhánh      | Có             | Có      | Có             | Có             |
| Vice Manager đúng chi nhánh | Có             | Có      | Không mặc định | Không mặc định |
| Nhân sự thường              | Không          | Không   | Không          | Không          |

- Role nghiệp vụ thiếu quyền: **Bạn không có quyền truy cập**; không hiện mã
  permission.
- Proof sai, hết hạn hoặc đã dùng: yêu cầu xác minh lại.
- Credential chưa tồn tại: hướng dẫn cấp quản lý liên hệ Blink thay vì tạo ngầm
  từ màn đọc.
- Dữ liệu nhạy cảm không tải được: giữ mật khẩu ở trạng thái che.

Mọi lần xem lại, đặt lại và vô hiệu hóa đều được ghi Admin Audit an toàn, không
ghi mật khẩu.

## 8. Minh họa tổng thể tương lai

[`cashier-terminal-flow.html`](../../../../initiatives/cashier-terminal-authentication/cashier-terminal-flow.html) mô phỏng toàn bộ
luồng mục tiêu, gồm cả đăng nhập Terminal, phiên, gắn ca và đăng nhập nhanh chưa
được Backend hoàn thành. Designer chỉ dùng phần credential trong tài liệu này
cho phạm vi hiện hành.
