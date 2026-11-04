# Luồng màn hình Thu ngân — chặng 1

Thiết kế: [terminal-session-design.md](../../../../initiatives/cashier-operation/terminal-session-design.md).
Chỉ mô tả đăng nhập và quản lý thiết bị. Nhân sự vào ca ở chặng 2.
Thu ngân dùng máy tính hoặc tablet; không thiết kế màn Thu ngân trên Flutter.

## 1. Nhập số đăng nhập

- **Nơi hiển thị:** React web/PWA công khai, chưa đăng nhập Thu ngân.
- **Người dùng:** người được cơ sở cung cấp thông tin đăng nhập.
- **Nội dung:** số điện thoại, nút “Tiếp tục”. Giải thích dùng hotline quán;
  nếu quán chưa có hotline thì dùng số điện thoại chủ.
- **Thao tác:** nhập số → xem các cơ sở tương ứng. Không tự chọn cơ sở dù chỉ
  có một kết quả; cần thể hiện rõ đang vào quán nào.
- **Lỗi:** không có cơ sở phù hợp, nhập sai định dạng hoặc thử quá nhiều lần;
  cho sửa số hoặc đợi rồi thử lại. Không công khai thông tin chủ hay nhân sự.

## 2. Chọn cơ sở

- **Nơi hiển thị:** React web/PWA công khai.
- **Nội dung:** tên, địa chỉ, logo nếu có; số vừa nhập và nút đổi số.
- **Thao tác:** chọn một cơ sở → nhập mật khẩu của chính cơ sở đó.
- **Lỗi:** cơ sở không còn đăng nhập được → thông báo chung, cho chọn lại.

## 3. Nhập mật khẩu

- **Nơi hiển thị:** React web/PWA công khai.
- **Nội dung:** tên cơ sở, mật khẩu được che, nút xem/ẩn và “Đăng nhập”.
- **Kết quả:** vào màn Thu ngân của cơ sở đã chọn. Không tự nhận người thao tác
  là chủ hoặc nhân sự chỉ vì biết mật khẩu Thu ngân.
- **Lỗi:** “Thông tin đăng nhập không hợp lệ.”; giữ lựa chọn cơ sở, không giữ
  mật khẩu sau khi rời màn. Khi bị giới hạn thử, hiển thị thời gian có thể thử lại.

## 4. Đã đăng nhập thiết bị

- **Nơi hiển thị:** React web/PWA Thu ngân đã đăng nhập.
- **Nội dung:** tên cơ sở, thiết bị, thông báo “Chưa có nhân sự vào ca”, đăng xuất.
- **Chặng 1:** chưa có nút thao tác đơn hoặc màn chọn nhân sự thực sự hoạt động.
- **Cơ sở bị hạn chế:** hiện thông báo tình trạng; không hiện quyền tạo đơn mới.
- **Gián đoạn:** tải lại trang hoặc mất mạng ngắn không bắt nhập mật khẩu lại
  nếu phiên vẫn còn hiệu lực. Hiện đang kết nối lại, không báo sai mật khẩu.
- **Phiên bị thu hồi/hết hạn:** quay về đăng nhập, thông báo rõ cần đăng nhập lại.
  Chặng này phát hiện khi gọi API; chưa hứa tự bật thông báo lúc máy đứng yên.

## 5. Quản lý thiết bị đã đăng nhập

- **Nơi hiển thị:** app Flutter hoặc React PWA của người quản lý, sau đăng nhập
  tài khoản cá nhân; không phải màn công khai hoặc tài khoản Thu ngân.
- **Người dùng:** người có quyền quản lý phiên Thu ngân tại cơ sở đang chọn.
- **Nội dung:** mỗi lần đăng nhập là một mục: tên thiết bị, lúc đăng nhập,
  hoạt động gần nhất, hạn phiên. Không hiển thị mật khẩu hay mã xác thực.
- **Thao tác:** “Đăng xuất thiết bị” → xác nhận tên thiết bị/cơ sở → thu hồi
  đúng mục được chọn, các thiết bị khác giữ nguyên.
- **Lỗi:** không có quyền → “Bạn không có quyền truy cập.”; mục đã bị thu hồi
  → tải lại danh sách. Không yêu cầu người dùng hiểu các loại mã phiên.

## Giới hạn bàn giao

Chưa xây giao diện client trong task BE. Không có QR đăng nhập nhanh, vào ca,
quản lý đơn hay thanh toán ở tài liệu chặng 1 này. Không bổ sung màn Admin Audit;
Audit kỹ thuật phục vụ truy vết của Blink theo quyền riêng đã có.
