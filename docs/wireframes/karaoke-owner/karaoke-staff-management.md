# Wireframe quản trị nhân sự Karaoke

## 1. Bề mặt và người sử dụng

Luồng nằm trong **ứng dụng quản lý cơ sở** dành cho Owner, Manager và Vice
Manager theo đúng chi nhánh, cấp bậc và quyền. Đây là quản trị quan hệ đã tồn
tại, không phải luồng tạo lời mời.

- **Nơi hiển thị:** 📱 **FLUTTER APP** hoặc 🖥️ **REACT PWA**.
- **Điểm vào:** Quản lý cơ sở → Nhân sự.

## 2. Danh mục màn hình

| Mã     | Người dùng, nội dung/đầu vào                                              | Hành động và bước tiếp theo                                                                              | Lỗi và kết quả                                                     |
| ------ | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| STF-01 | Cấp quản lý; ba thống kê, tìm kiếm, lọc và danh sách                      | Chọn nhân sự → STF-02; sang lời mời → initiative đăng ký nhân sự                                         | Trống/lỗi tải: hướng dẫn hoặc thử lại                              |
| STF-02 | Cấp quản lý; hồ sơ công việc và lịch sử an toàn                           | **Sửa hồ sơ** → STF-03; **Xem danh tính** → STF-04; **Đổi vị trí** → STF-05; **Đổi trạng thái** → STF-06 | Ẩn thao tác ngoài cấp bậc; thiếu quyền báo chung                   |
| STF-03 | Người có quyền; biệt danh và ảnh công việc                                | **Lưu** → STF-02; **Hủy** → STF-02                                                                       | Ảnh chưa sẵn sàng hoặc dữ liệu vừa đổi: sửa/tải lại                |
| STF-04 | Người có quyền nhạy cảm; dữ liệu danh tính được phép xem và lý do khi cần | **Mở dữ liệu** → ở lại STF-04; **Đóng** → STF-02                                                         | Hết hạn URL hoặc thiếu quyền: che dữ liệu, không tự tải lại bí mật |
| STF-05 | Cấp quản lý; các vị trí hợp lệ theo cấp bậc                               | **Xác nhận** → STF-02; **Hủy** → STF-02                                                                  | Vị trí không còn trống/dữ liệu đổi: tải lại                        |
| STF-06 | Cấp quản lý; tạm dừng, kích hoạt hoặc kết thúc và lý do bắt buộc          | **Xác nhận** → STF-02; **Hủy** → STF-02                                                                  | Trạng thái vừa đổi: không ghi đè, tải lại                          |

Tất cả màn STF nằm trong Flutter/PWA sau đăng nhập.

## 3. Danh sách nhân sự

Phần đầu màn hình có ba số liệu tách riêng:

- **Đang làm việc**;
- **Đang tạm dừng**;
- **Đã nghỉ việc**.

Không gộp “Đang làm việc” và “Đang tạm dừng”.

Danh sách có tìm theo biệt danh hoặc mã nhân sự; lọc theo vị trí và trạng thái;
phân trang. Mỗi item hiển thị ảnh công việc, biệt danh, mã dạng `01`, vị trí,
trạng thái và ngày bắt đầu. Không trả hoặc hiển thị CCCD trong danh sách.

## 4. Chi tiết nhân sự

Chia thành các tab:

1. **Hồ sơ công việc:** ảnh đại diện, biệt danh, mã, vị trí và cơ sở.
2. **Hồ sơ danh tính:** chỉ người đủ quyền mới mở được.
3. **Lịch sử làm việc:** thay đổi vị trí, hồ sơ và trạng thái kèm người thực
   hiện, lý do và thời điểm.

Lịch sử này là lịch sử nghiệp vụ của nhân sự. Nó không trao cho Owner/Manager
quyền truy cập màn Admin Audit toàn nền tảng.

## 5. Sửa hồ sơ công việc

- Biệt danh và ảnh đại diện công việc luôn phải có.
- Ảnh mới phải tải và xử lý xong trước khi lưu.
- Ảnh chân dung danh tính không được dùng thay ảnh đại diện công việc.
- Quan hệ đã kết thúc chỉ xem lịch sử, không sửa.

Nếu dữ liệu vừa được sửa ở thiết bị khác, báo **Thông tin nhân sự đã thay đổi,
vui lòng tải lại** và không ghi đè.

## 6. Xem hồ sơ danh tính

Hồ sơ danh tính thuộc tài khoản dùng chung. Cấp quản lý chỉ được xem người cấp
dưới đang làm hoặc đang tạm dừng tại phạm vi mình quản lý.

- Thông tin nhạy cảm và ảnh chân dung dùng URL có thời hạn ngắn.
- Mỗi lần xem được ghi Audit.
- Sau khi người đó nghỉ, chỉ hiển thị dữ liệu tối thiểu đã che. Owner muốn mở
  lại CCCD hoặc ảnh chân dung phải nhập lý do.
- Blink Admin có luồng và quyền quản trị riêng.
- Cấp quản lý không được sửa hồ sơ danh tính của nhân sự.

## 7. Đổi vị trí công việc

Hộp đổi vị trí chỉ hiển thị vai trò hợp lệ theo cấp bậc. Không cho:

- tự sửa chính mình;
- sửa Owner;
- sửa người ngang hoặc cao hơn;
- chọn Manager, Owner, Cashier hoặc role nền Blink;
- tạo Manager bằng luồng này.

Mỗi cơ sở chỉ có một Vice Manager hiện hành. Bổ nhiệm Manager dùng initiative
riêng.

## 8. Tạm dừng, kích hoạt lại và kết thúc

Mỗi hành động mở hộp xác nhận và bắt buộc nhập lý do.

### Tạm dừng

- Nhân sự mất toàn bộ quyền thao tác tại cơ sở.
- Vẫn giữ chỗ trong gói.
- Có thể được kích hoạt lại.

### Kích hoạt lại

- Hiển thị lý do tạm dừng trước đó.
- Yêu cầu lý do kích hoạt lại.
- Khôi phục quan hệ hiện tại nếu cơ sở và gói còn hợp lệ.

### Kết thúc làm việc

- Mất quyền tại cơ sở và trả chỗ trong gói.
- Không xóa hồ sơ, lịch sử hoặc đơn cũ.
- Muốn quay lại phải nhận lời mời mới; quyền bổ sung cũ không tự khôi phục.

Luồng đăng nhập/gắn ca Thu ngân và phản ứng trực tiếp khi nhân sự nghỉ thuộc
task Thu ngân, không đưa vào màn này.

## 9. Quyền và cấp bậc trên giao diện

- Owner quản lý nhân sự trong các cơ sở thuộc chuỗi.
- Manager quản lý Vice Manager và cấp thấp hơn tại chi nhánh.
- Vice Manager quản lý Booking, Lễ tân và Phục vụ.

Ẩn hành động không phù hợp để giao diện gọn, nhưng Backend vẫn kiểm tra lại.
Role cơ sở thiếu quyền nhận thông báo chung **Bạn không có quyền truy cập**.

## 10. Không thuộc wireframe này

- Tạo/nhận lời mời.
- Bổ nhiệm Manager.
- Cấp hoặc thu hồi quyền bổ sung.
- Kiểm duyệt ảnh/biệt danh vi phạm.
- Nhân sự tự nghỉ việc.
- KYC, rút tiền và Thu ngân.
