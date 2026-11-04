# Wireframe bổ nhiệm quản lý chi nhánh Karaoke

## 1. Mục đích

Tài liệu này chuyển thiết kế nghiệp vụ đã duyệt thành các màn hình và thao tác
dễ hiểu để Figma Designer có thể dựng giao diện mà không cần đọc mã Backend.

Tài liệu không quyết định màu sắc, phông chữ hoặc phong cách hình ảnh. Tài liệu
chỉ trả lời các câu hỏi: ai đang thao tác, đang ở đâu, nhìn thấy gì, được bấm gì
và sau đó đi đến đâu.

## 2. Chú thích nơi hiển thị

| Nhãn                 | Ý nghĩa                                                                               |
| -------------------- | ------------------------------------------------------------------------------------- |
| 🌐 **WEB CÔNG KHAI** | Trang mở trực tiếp từ đường link được Owner chia sẻ. Người xem có thể chưa đăng nhập. |
| 📱 **FLUTTER APP**   | Màn hình nằm trong ứng dụng Flutter sau khi mở hoặc đăng nhập vào ứng dụng.           |
| 🖥️ **REACT PWA**     | Màn hình nằm trong React PWA sau khi người dùng chọn tiếp tục trên web.               |
| ↗️ **CHUYỂN TIẾP**   | Bước đưa người dùng từ web công khai vào Flutter hoặc React PWA.                      |

Một màn hình xuất hiện trên cả Flutter và React PWA phải được thiết kế cùng nội
dung và cùng quy tắc nghiệp vụ. Cách bố trí có thể thay đổi để phù hợp từng nền
tảng.

## 3. Người sử dụng

- **Owner:** chọn chi nhánh, tạo lời mời, gửi lại link, thu hồi lời mời và quản
  lý Manager hiện tại.
- **Người nhận:** xem, xác nhận hoặc từ chối lời mời; hoàn thiện hồ sơ công việc
  nếu cần.
- **Manager hiện tại:** xem nơi mình đang quản lý và có thể chủ động nghỉ việc.

Manager, Vice Manager và nhân sự thông thường không được dùng màn hình của
Owner để bổ nhiệm hoặc kết thúc Manager.

## 4. Quy tắc chung cho mọi màn hình

- Một chi nhánh chỉ có một Manager hoặc một quy trình bổ nhiệm Manager đang mở.
- Số điện thoại người được mời là bắt buộc.
- Lời mời có hiệu lực 3 ngày và không được tự gia hạn khi mở link hoặc đăng
  nhập.
- Mọi màn hình phải dùng trạng thái dễ hiểu: **Chờ xác nhận**, **Đang hoàn thiện
  hồ sơ**, **Đã hoàn tất**, **Đã từ chối**, **Đã thu hồi**, **Đã hết hạn**.
- Không hiển thị tên trạng thái kỹ thuật, token trong link hoặc toàn bộ số điện
  thoại trên màn hình không cần thiết.
- Người dùng phải biết lỗi nào có thể thử lại và lỗi nào cần một lời mời mới.
- Hoàn tất một lời mời không được chặn hoặc tự xử lý các lời mời khác.

## 5. Bản đồ luồng tổng quát

```text
Owner chọn chi nhánh
    ├─ Chưa có Manager/lời mời → Tạo lời mời → Chia sẻ link
    ├─ Có lời mời đang xử lý   → Xem / lấy lại link / thu hồi
    └─ Có Manager              → Xem / tạm dừng / kích hoạt lại / kết thúc

Người nhận mở public link
    → Xem thông tin tối thiểu
    → Mở Flutter hoặc tiếp tục bằng React PWA
    → Đăng nhập/đăng ký và xác minh đúng số điện thoại
    → Xem đầy đủ lời mời
    ├─ Từ chối → Kết thúc
    └─ Xác nhận
        ├─ Đang là nhân sự hợp lệ → Hoàn tất bổ nhiệm
        └─ Người mới/đã nghỉ     → Hoàn thiện hồ sơ công việc → Hoàn tất
```

## 6. Luồng của Owner

### OWN-01 — Trạng thái quản lý chi nhánh

- **Môi trường:** 📱 FLUTTER APP hoặc 🖥️ REACT PWA.
- **Người dùng:** Owner.
- **Điểm vào:** Quản lý chi nhánh > Quản lý nhân sự > Quản lý chi nhánh.
- **Mục đích:** cho Owner biết chi nhánh đang chưa có Manager, đang mời người
  mới hay đã có Manager.
- **Hiển thị:** tên và địa chỉ chi nhánh; trạng thái vị trí Manager; Manager
  hiện tại hoặc lời mời đang xử lý; thời hạn lời mời nếu có.
- **Thao tác:**
  - Chưa có Manager: **Bổ nhiệm quản lý**.
  - Có lời mời: **Xem lời mời**.
  - Có Manager: **Xem quản lý hiện tại**.
- **Màn hình tiếp theo:** OWN-02, OWN-04 hoặc OWN-06 theo trạng thái.

### OWN-02 — Nhập người cần bổ nhiệm

- **Môi trường:** 📱 FLUTTER APP hoặc 🖥️ REACT PWA.
- **Người dùng:** Owner.
- **Điểm vào:** OWN-01 khi vị trí Manager đang trống.
- **Hiển thị:** chi nhánh được chọn, ô số điện thoại, chú thích lời mời có hiệu
  lực 3 ngày và người nhận phải xác minh đúng số điện thoại.
- **Thao tác chính:** **Tiếp tục**.
- **Thao tác phụ:** **Huỷ**.
- **Kiểm tra trước khi tiếp tục:** số điện thoại hợp lệ; chi nhánh vẫn chưa có
  Manager hoặc lời mời khác; người được mời không phải Owner và không phải nhân
  sự đang bị tạm dừng.
- **Màn hình tiếp theo:** OWN-03.

### OWN-03 — Xác nhận tạo lời mời

- **Môi trường:** 📱 FLUTTER APP hoặc 🖥️ REACT PWA.
- **Người dùng:** Owner.
- **Hiển thị:** tên, địa chỉ chi nhánh; số điện thoại đã che bớt; thời hạn 3
  ngày; ảnh hưởng tới gói nhân sự.
- **Cảnh báo theo người nhận:**
  - Nhân sự hiện tại: quyền bổ sung hoặc quyền bị thu hồi riêng của vai trò cũ
    sẽ được đặt lại khi bổ nhiệm hoàn tất.
  - Người mới hoặc người đã nghỉ: cần còn khả năng tiếp nhận nhân sự trong gói.
- **Thao tác chính:** **Tạo lời mời**.
- **Thao tác phụ:** **Quay lại chỉnh sửa**.
- **Màn hình tiếp theo:** OWN-04.

### OWN-04 — Chi tiết lời mời đang xử lý

- **Môi trường:** 📱 FLUTTER APP hoặc 🖥️ REACT PWA.
- **Người dùng:** Owner.
- **Hiển thị:** chi nhánh, vị trí Quản lý chi nhánh, số điện thoại đã che bớt,
  trạng thái dễ hiểu, thời điểm hết hạn và tiến độ hiện tại.
- **Khi còn chờ xác nhận:** cho phép **Sao chép link** hoặc **Chia sẻ lại**.
- **Khi người nhận đang hoàn thiện hồ sơ:** không cho lấy lại link; hiển thị rằng
  người nhận sẽ tiếp tục trong mục **Lời mời làm việc** của họ.
- **Thao tác phụ:** **Thu hồi lời mời**.
- **Màn hình tiếp theo khi thu hồi:** OWN-05.

### OWN-05 — Thu hồi lời mời

- **Môi trường:** 📱 FLUTTER APP hoặc 🖥️ REACT PWA.
- **Người dùng:** Owner.
- **Hiển thị:** lời nhắc rằng link sẽ mất hiệu lực và quá trình bổ nhiệm hiện tại
  sẽ kết thúc; vai trò hiện có của người nhận không bị mất.
- **Dữ liệu bắt buộc:** chọn lý do; nếu chọn **Lý do khác** phải nhập giải thích.
- **Thao tác chính:** **Xác nhận thu hồi**.
- **Thao tác phụ:** **Giữ lời mời**.
- **Kết quả:** vị trí đang chờ được giải phóng; muốn mời lại phải tạo lời mời
  mới.

### OWN-06 — Quản lý Manager hiện tại

- **Môi trường:** 📱 FLUTTER APP hoặc 🖥️ REACT PWA.
- **Người dùng:** Owner.
- **Hiển thị:** ảnh công việc, biệt danh, mã nhân sự, số điện thoại được che bớt,
  chi nhánh, trạng thái làm việc và ngày bắt đầu.
- **Thao tác:**
  - Manager đang làm việc: **Tạm dừng** hoặc **Kết thúc vai trò**.
  - Manager đang tạm dừng: **Kích hoạt lại** hoặc **Kết thúc vai trò**.
- **Mọi thay đổi trạng thái:** bắt buộc nhập lý do trước khi xác nhận.
- **Kết quả tạm dừng:** Manager mất quyền thao tác tại chi nhánh nhưng vẫn giữ
  vị trí.
- **Kết quả kết thúc:** Manager mất quyền và vị trí được trả lại; Owner có thể
  tạo lời mời mới.

## 7. Luồng mở public link

### PUB-01 — Xem lời mời từ đường link

- **Môi trường:** 🌐 WEB CÔNG KHAI.
- **Người dùng:** bất kỳ người nào đang có link; chưa được coi là người nhận chỉ
  vì mở link.
- **Hiển thị tối thiểu:** tên và logo chi nhánh, địa chỉ, vị trí **Quản lý chi
  nhánh**, tên Owner gửi lời mời, thời điểm hết hạn và số điện thoại được che
  bớt.
- **Không hiển thị:** nhân sự, doanh thu, cấu hình hoặc dữ liệu vận hành của chi
  nhánh.
- **Thao tác chính:** **Mở ứng dụng Blink**.
- **Thao tác phụ:** **Tiếp tục trên web**.
- **Màn hình tiếp theo:** PUB-02.

### PUB-02 — Chọn nơi tiếp tục

- **Môi trường:** ↗️ CHUYỂN TIẾP.
- **Người dùng:** người mở link.
- **Luồng Flutter:** mở đúng lời mời trong Flutter; nếu chưa cài ứng dụng, cho
  phép quay lại và tiếp tục bằng React PWA.
- **Luồng React:** mở bước đăng nhập hoặc đăng ký trên React PWA rồi trở lại đúng
  lời mời.
- **Yêu cầu thiết kế:** người dùng luôn hiểu mình đang rời web công khai để vào
  ứng dụng; không để họ tưởng rằng đã nhận vai trò chỉ vì đã mở app.

### PUB-03 — Link không thể tiếp tục

- **Môi trường:** 🌐 WEB CÔNG KHAI.
- **Các trường hợp và nội dung:**
  - Hết hạn: **Lời mời đã hết hạn. Vui lòng liên hệ Owner để nhận lời mời mới.**
  - Đã thu hồi: **Lời mời đã được thu hồi.**
  - Đã từ chối: **Lời mời này đã được từ chối.**
  - Đã hoàn tất: **Lời mời đã được hoàn tất.**
  - Link không hợp lệ: **Không thể mở lời mời này.**
- **Thao tác:** **Đóng** hoặc **Mở ứng dụng Blink**; không có nút xác nhận lại.

## 8. Luồng của người nhận trong ứng dụng

Các màn hình REC dưới đây áp dụng cho cả 📱 **FLUTTER APP** và 🖥️ **REACT PWA**.

### REC-01 — Đăng nhập hoặc đăng ký

- **Điểm vào:** PUB-02 hoặc lời mời trong tài khoản.
- **Mục đích:** xác định tài khoản sử dụng để nhận lời mời.
- **Điều kiện:** số điện thoại của tài khoản phải được xác minh và trùng với số
  điện thoại Owner đã mời.
- **Phiên đăng nhập cũ:** yêu cầu xác minh lại số điện thoại bằng OTP trước khi
  cho xác nhận quyền Manager.
- **Vừa đăng nhập, đăng ký hoặc xác minh trong chính luồng:** không yêu cầu OTP
  lần thứ hai.
- **Sai tài khoản:** hiển thị **Tài khoản này không phù hợp với lời mời. Vui
  lòng đăng nhập bằng số điện thoại được mời.**

### REC-02 — Xem và quyết định nhận lời mời

- **Hiển thị:** tên/logo/địa chỉ chi nhánh, vị trí **Quản lý chi nhánh**, Owner
  gửi lời mời, thời hạn và số điện thoại được che bớt.
- **Cảnh báo có điều kiện:**
  - Đang là nhân sự tại chi nhánh: quyền riêng của vai trò cũ sẽ được đặt lại.
  - Đang là CTV: tư cách CTV sẽ kết thúc khi việc bổ nhiệm hoàn tất.
- **Thao tác chính:** **Xác nhận nhận vai trò**.
- **Thao tác phụ:** **Từ chối lời mời**.
- **Nếu từ chối:** cho nhập lý do không bắt buộc, sau đó chuyển REC-07.
- **Nếu xác nhận:** hệ thống kiểm tra lại chi nhánh, vị trí Manager, gói và trạng
  thái làm việc hiện tại trước khi chuyển bước.

### REC-03 — Hoàn tất thăng chức nội bộ

- **Áp dụng:** người nhận đang là nhân sự làm việc bình thường tại chi nhánh.
- **Không yêu cầu:** nhập lại biệt danh hoặc ảnh công việc.
- **Hiển thị kết quả:** **Bạn đã trở thành Quản lý chi nhánh [Tên chi nhánh].**
- **Thao tác chính:** **Vào chi nhánh**.
- **Ghi chú giao diện:** gói đã đủ số người vẫn không chặn trường hợp này, nhưng
  gói phải còn hiệu lực.

### REC-04 — Hoàn thiện hồ sơ công việc

- **Áp dụng:** người mới hoặc người đã kết thúc làm việc tại chi nhánh.
- **Hiển thị:** tên chi nhánh, vị trí Quản lý chi nhánh, biệt danh công việc và
  ảnh đại diện công việc.
- **Bắt buộc:** biệt danh và ảnh đại diện công việc.
- **Không bắt buộc trong luồng này:** CCCD, ảnh chân dung, ngày sinh hoặc hồ sơ
  rút tiền.
- **Người quay lại:** hiển thị hồ sơ công việc đã có và cho phép chỉnh sửa trước
  khi hoàn tất.
- **Thao tác chính:** **Hoàn tất đăng ký**.
- **Thao tác phụ:** **Để sau** hoặc **Từ chối tiếp tục**.
- **Để sau:** quá trình xuất hiện trong mục **Tài khoản > Lời mời làm việc**.
- **Từ chối tiếp tục:** giải phóng vị trí đang giữ và chuyển REC-07.

### REC-05 — Bị chặn tạm thời

- **Gói hoặc chi nhánh tạm không hoạt động:** hiển thị lý do dễ hiểu và cho phép
  quay lại sau; lời mời vẫn hết hạn theo mốc ban đầu.
- **Gói đã đủ người đối với người mới/người quay lại:** hiển thị **Số lượng nhân
  sự đã đủ.** và cho phép thử lại trước khi lời mời hết hạn.
- **Nhân sự đang bị tạm dừng:** thông báo chưa đủ điều kiện nhận vai trò; hướng
  dẫn liên hệ Owner để xử lý trạng thái hiện tại.
- **Không hiển thị nút xác nhận giả:** chỉ cho **Thử lại**, **Để sau** hoặc quay
  về danh sách lời mời theo từng trường hợp.

### REC-06 — Hoàn tất bổ nhiệm người mới hoặc người quay lại

- **Hiển thị kết quả:** ảnh, biệt danh, chi nhánh và thông báo **Bạn đã trở thành
  Quản lý chi nhánh [Tên chi nhánh].**
- **Thao tác chính:** **Vào chi nhánh**.
- **Kết quả:** nơi làm việc mới xuất hiện trong danh sách cơ sở của tài khoản.

### REC-07 — Kết thúc lời mời

- **Áp dụng:** người nhận từ chối trước hoặc sau khi bắt đầu hoàn thiện hồ sơ.
- **Hiển thị:** **Bạn đã từ chối lời mời làm Quản lý chi nhánh.**
- **Thao tác:** **Về trang chính** hoặc **Xem lời mời khác**.
- **Ghi chú:** muốn nhận lại vị trí phải có lời mời mới.

## 9. Hộp lời mời và tiếp tục đăng ký

### INB-01 — Danh sách lời mời làm việc

- **Môi trường:** 📱 FLUTTER APP hoặc 🖥️ REACT PWA.
- **Điểm vào:** Tài khoản > Lời mời làm việc.
- **Nhóm 1 — Lời mời mới:** lời mời gắn đúng số điện thoại, chưa được xác nhận.
- **Nhóm 2 — Đăng ký đang hoàn thiện:** lời mời đã xác nhận nhưng hồ sơ công việc
  chưa hoàn tất.
- **Mỗi thẻ hiển thị:** tên và địa chỉ chi nhánh, vị trí được mời, thời hạn,
  trạng thái dễ hiểu và hành động **Xem lời mời** hoặc **Tiếp tục đăng ký**.
- **Nhiều lời mời:** người dùng chủ động chọn từng lời mời; hoàn tất chi nhánh A
  không làm biến mất lời mời còn hiệu lực của chi nhánh B.
- **Không chặn trang chính:** người đã có nơi làm việc vẫn vào nơi làm việc hiện
  tại bình thường và có thể xử lý lời mời sau.

### INB-02 — Điều hướng khi mở lại ứng dụng

- Chưa có nơi làm việc và chỉ có một đăng ký đang dở: mở **Tiếp tục đăng ký**.
- Chưa có nơi làm việc và có nhiều đăng ký đang dở: mở danh sách để chọn.
- Đã có ít nhất một nơi làm việc: vào ứng dụng bình thường, hiển thị số lượng
  lời mời cần xem nhưng không ép xử lý ngay.
- Đã xác nhận lời mời: có thể tiếp tục trên thiết bị khác mà không cần public
  link.

## 10. Manager chủ động nghỉ việc

### MGR-01 — Xác nhận nghỉ việc

- **Môi trường:** 📱 FLUTTER APP hoặc 🖥️ REACT PWA.
- **Người dùng:** Manager hiện tại.
- **Điểm vào:** thông tin nơi làm việc tại chi nhánh đang quản lý.
- **Hiển thị:** chi nhánh bị ảnh hưởng và cảnh báo quyền tại chi nhánh sẽ bị thu
  hồi ngay; các chi nhánh khác không bị ảnh hưởng.
- **Dữ liệu:** ghi chú không bắt buộc.
- **Thao tác chính:** **Xác nhận nghỉ việc**.
- **Thao tác phụ:** **Tiếp tục làm việc**.
- **Kết quả:** trở về danh sách nơi làm việc; Owner được thông báo; muốn quay lại
  phải nhận lời mời mới.

## 11. Các thông báo và kết quả cần thiết kế

| Trường hợp              | Nội dung dành cho người dùng                                      | Có thể tiếp tục?                                           |
| ----------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------- |
| Số lượng nhân sự đã đủ  | Số lượng nhân sự đã đủ.                                           | Có thể thử lại trước khi lời mời hết hạn.                  |
| Gói tạm không hoạt động | Gói nhân sự của cơ sở hiện không hoạt động. Vui lòng thử lại sau. | Có, nếu gói hoạt động lại trước khi lời mời hết hạn.       |
| Chi nhánh tạm dừng      | Chi nhánh hiện đang tạm dừng hoạt động. Vui lòng thử lại sau.     | Có, nếu chi nhánh hoạt động lại trước khi lời mời hết hạn. |
| Sai tài khoản           | Tài khoản này không phù hợp với lời mời.                          | Có, đăng nhập lại bằng đúng số điện thoại.                 |
| Không có quyền          | Bạn không có quyền truy cập.                                      | Không trên màn hình hiện tại.                              |
| Lời mời hết hạn         | Lời mời đã hết hạn. Vui lòng liên hệ Owner để nhận lời mời mới.   | Không, cần lời mời mới.                                    |
| Lời mời bị thu hồi      | Lời mời đã được thu hồi.                                          | Không, cần lời mời mới.                                    |
| Vị trí đã có người      | Chi nhánh đã có Quản lý.                                          | Không, Owner phải kiểm tra lại vị trí.                     |
| Nhân sự đang tạm dừng   | Bạn chưa thể nhận vai trò khi đang bị tạm dừng làm việc.          | Chỉ sau khi Owner xử lý trạng thái hiện tại.               |

## 12. Dữ liệu được hiển thị và phải che

- Public link chỉ hiển thị số điện thoại dạng che bớt.
- Không hiển thị token lời mời trên giao diện hoặc trong danh sách lời mời.
- Không hiển thị CCCD, ảnh chân dung, thông tin ngân hàng hoặc dữ liệu rút tiền
  trong luồng này.
- Trước khi bổ nhiệm hoàn tất, không hiển thị danh sách nhân sự, doanh thu hoặc
  cấu hình nội bộ của chi nhánh cho người nhận.
- Khi thiếu quyền, role không phải Blink Admin chỉ nhận thông báo chung **Bạn
  không có quyền truy cập.**

## 13. Ngoài phạm vi wireframe này

- Chuyển quyền sở hữu chuỗi.
- Cấu hình chi tiết từng permission của Manager.
- Đăng nhập hoặc gắn ca Thu ngân.
- Thanh toán, mua hoặc gia hạn gói.
- Cách gửi SMS hoặc push notification.
- Chi tiết kỹ thuật của deep link, API, database hoặc lưu token.

## 14. Danh sách kiểm tra trước khi Figma bắt đầu

- Mỗi khung có nhãn WEB CÔNG KHAI, FLUTTER APP, REACT PWA hoặc CHUYỂN TIẾP.
- Các màn hình public và trong ứng dụng không bị trộn thành một màn hình mơ hồ.
- Có đủ luồng Owner, người nhận, Manager hiện tại và hộp lời mời.
- Có đủ trường hợp người mới, nhân sự hiện tại, người quay lại và nhân sự đang
  bị tạm dừng.
- Có đủ nhánh nhiều lời mời, tiếp tục đăng ký, gói đầy, hết hạn, thu hồi và từ
  chối.
- Không dùng tên trạng thái kỹ thuật làm nội dung giao diện.
- Không hiển thị dữ liệu nội bộ hoặc dữ liệu riêng tư trước khi đủ quyền.
- Mỗi nút đều xác định được màn hình hoặc kết quả tiếp theo.

## 15. Lịch sử nghiệp vụ và Admin Audit

- Owner được xem lịch sử bổ nhiệm tại chi nhánh: ai được mời, thời điểm, trạng
  thái và lý do thu hồi, tạm dừng, kích hoạt hoặc kết thúc phù hợp với API
  nghiệp vụ.
- Lịch sử này không phải màn Admin Audit và không cho Owner truy cập nhật ký
  toàn nền tảng.
- Blink Admin xem Audit trong initiative `admin-audit`; token, link bí mật và
  dữ liệu hồ sơ riêng tư không được hiển thị trong lịch sử hoặc Audit.
