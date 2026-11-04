# Hành vi màn hình khi dữ liệu thay đổi

Bổ sung cho [thiết kế mở rộng](../../../../initiatives/realtime/coverage-expansion-design.md), thiết kế đã được duyệt. Không yêu cầu dựng lại giao diện. Mọi màn hình dưới đây đều ở trong app;
không bổ sung màn hình public hoặc luồng mở link.

| Nơi dùng                                  | Tình huống                               | Giao diện cần làm                                                                                         |
| ----------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Owner — Flutter/PWA — Gói cơ sở           | Admin duyệt/từ chối                      | Tải lại yêu cầu và thẻ gói, hiển thị kết quả hiện tại; yêu cầu chờ không đổi quyền lợi                    |
| Admin — admin-ui — Yêu cầu gói            | Owner gửi/sửa/rút                        | Cập nhật danh sách/chi tiết đang xem; dữ liệu thay đổi trong lúc chuẩn bị duyệt thì yêu cầu kiểm tra lại  |
| Người tải ảnh — Flutter/PWA               | Ảnh xử lý xong hoặc lỗi                  | Đổi Đang xử lý sang ảnh đã sẵn sàng hoặc lỗi có thể thử lại; không lấy ảnh riêng tư từ tín hiệu nhận được |
| Quản lý — Flutter/PWA — Nhân sự/lời mời   | Máy khác cập nhật                        | Tải lại danh sách và chi tiết có quyền; giữ bộ lọc đang dùng                                              |
| Nhân sự — Flutter/PWA — Tài khoản/lời mời | Lời mời hoặc hồ sơ bản thân thay đổi     | Tải lại nội dung của chính mình; không chặn vào app nếu đã có công việc hoàn tất                          |
| Quản lý — Flutter/PWA — Trang chủ/báo cáo | Đơn mở/hoàn thành/hủy, đổi ngày vận hành | Tải lại hai chỉ số trang chủ hoặc báo cáo đang mở; giữ khoảng ngày đang chọn                              |
| Karaoke — Flutter/PWA — Món trên đơn      | Đang thêm/sửa/thay/xóa trên form         | Chỉ thay bản đang soạn trên máy đó; máy khác chưa thay đổi                                                |
| Karaoke — Flutter/PWA — Xác nhận món      | Lưu thành công                           | Hiển thị bản đã lưu; các máy có quyền và Restaurant tải lại đơn                                           |
| Karaoke — Flutter/PWA — Xác nhận món      | API từ chối hoặc mất mạng                | Giữ nội dung đang soạn, hiển thị lỗi để xử lý; không báo cho máy khác như đã thành công                   |
| Karaoke — Flutter/PWA — Chọn món          | Muốn lấy danh mục mới                    | Bấm Tải lại hoặc mở lại màn hình; không tự thay bản đang soạn                                             |
| Karaoke — Flutter/PWA — Xác nhận món      | Món đã ngưng bán                         | BE từ chối; giữ bản đang soạn, báo tải lại và chọn món khác                                               |
| Restaurant — Flutter/PWA — Xem đơn        | Karaoke xác nhận thay đổi                | Tải lại đơn liên quan; Restaurant vẫn chỉ xem, không thêm nút thao tác trạng thái                         |
| Mọi màn hình trong phạm vi                | Mất mạng rồi kết nối lại                 | Đọc dữ liệu mới; không làm mất bản đang soạn và không tự gửi lại thay người dùng                          |

Thu ngân chủ động thoát ca tự chuyển màn hình theo kết quả thao tác. Cập nhật
thu hồi ca trực từ xa đang hoãn, không mô tả thành chức năng đã triển khai.
