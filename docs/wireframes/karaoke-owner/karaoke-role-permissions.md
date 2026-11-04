# Bản mô tả wireframe cấu hình quyền của vai trò tại cơ sở Karaoke

## 1. Mục đích

Tài liệu này chuyển thiết kế nghiệp vụ đã duyệt thành các màn hình và thao tác dễ hiểu để
Figma Designer dựng giao diện mà không cần đọc mã Backend.

Tài liệu không quyết định màu sắc, phông chữ hoặc phong cách hình ảnh. Tài liệu chỉ trả lời:
ai đang thao tác, đang ở đâu, nhìn thấy gì, được bấm gì và sau đó đi đến đâu.

## 2. Chú thích nơi hiển thị

| Nhãn               | Ý nghĩa                                              |
| ------------------ | ---------------------------------------------------- |
| 📱 **FLUTTER APP** | Màn hình nằm trong ứng dụng Flutter của cấp quản lý. |
| 🖥️ **REACT PWA**   | Màn hình nằm trong React PWA của cấp quản lý.        |

Luồng này không có trang web công khai và không có bước chuyển tiếp từ đường link. Mọi màn
hình xuất hiện trên cả Flutter và React PWA phải có cùng nội dung và cùng quy tắc; cách bố
trí có thể khác theo nền tảng.

## 3. Người sử dụng

- **Chủ cơ sở (Owner):** chỉnh quyền của cả năm vai trò (Quản lý, Phó quản lý, Đặt phòng, Lễ
  tân, Phục vụ phòng) và là người duy nhất khoá một quyền đã tắt.
- **Quản lý chi nhánh:** chỉnh quyền của Phó quản lý, Đặt phòng, Lễ tân và Phục vụ phòng. Không
  chỉnh vai trò Quản lý, kể cả của chính mình.
- **Phó quản lý và nhân sự thấp hơn:** không có màn hình này.

Màn hình phải nói rõ điều này thay vì để người dùng thử rồi gặp lỗi. Khái niệm quan trọng cần
giải thích ngắn gọn cho người dùng: **vai trò do Blink định nghĩa; cơ sở chỉ thay đổi các quyền
của vai trò đó tại cơ sở của mình.** Ảnh hưởng tới **mọi** nhân sự đang mang vai trò đó.

## 4. Quy tắc chung cho mọi màn hình

- Dùng ba trạng thái dễ hiểu cho từng quyền của một vai trò: **Mặc định của Blink**, **Bật
  thêm tại cơ sở**, **Tắt tại cơ sở**. Không hiển thị tên kỹ thuật hoặc mã quyền.
- Mỗi quyền có tên và mô tả ngắn bằng tiếng Việt; quyền nhạy cảm có nhãn **Quyền nhạy cảm**.
- Quyền gom theo nhóm chức năng (ví dụ phòng, đơn, nhân sự), có thể mở rộng hoặc thu gọn.
- Mỗi quyền cho biết vai trò **đang dùng hay không** sau khi áp cấu hình tại cơ sở.
- Điều khiển không được phép chỉnh phải bị khoá kèm lý do ngắn (ví dụ **Chủ cơ sở đã khoá**,
  **Bạn không được cấp quyền này**, **Chỉ chủ cơ sở chỉnh được vai trò này**), không được ẩn
  lặng lẽ.
- Mọi lần lưu và đặt lại đều bắt buộc có **lý do** từ 1 đến 500 ký tự.
- Mọi xác nhận phải nêu **số nhân sự bị ảnh hưởng** và câu **Thay đổi có hiệu lực ngay với mọi
  nhân sự mang vai trò này tại cơ sở**.
- Tắt một quyền ở cấp vai trò **thắng** quyền được cấp riêng cho từng người; màn hình phải nói
  rõ điều này khi người dùng tắt quyền.
- Thêm quyền ủy quyền cho vai trò Phó quản lý (quản lý phân quyền) phải có cảnh báo riêng vì
  mọi Phó quản lý tại cơ sở đều được ủy quyền.
- Không hiển thị thông tin danh tính của nhân sự trong luồng này.

## 5. Bản đồ luồng tổng quát

```text
Cài đặt cơ sở → ROL-01 Danh sách vai trò
                  └─ ROL-02 Quyền của vai trò
                        ├─ (được phép chỉnh) → ROL-03 Chỉnh quyền
                        │                         └─ ROL-04 Xác nhận → ROL-05 Thành công
                        │                                          └─ ROL-06 Dữ liệu đã đổi → ROL-02
                        └─ (được phép) → ROL-07 Đặt lại về mặc định → ROL-05
Không được phép chỉnh → ROL-08 Không thể chỉnh vai trò
```

## 6. Màn hình

### ROL-01 — Danh sách vai trò của cơ sở

- **Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA.
- **Người dùng:** Owner và Quản lý chi nhánh.
- **Điểm bắt đầu:** mục cài đặt quyền của cơ sở.
- **Nội dung:** năm vai trò; mỗi vai trò có tên, nhãn **Đã tuỳ chỉnh** hoặc **Đang dùng mặc định
  của Blink**, số quyền đã tuỳ chỉnh và số nhân sự đang mang vai trò. Vai trò người xem không
  được chỉnh hiển thị khoá kèm lý do.
- **Thao tác chính:** chọn một vai trò để mở ROL-02.
- **Lỗi có thể thử lại:** không tải được dữ liệu, có nút **Thử lại**.

### ROL-02 — Quyền của một vai trò

- **Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA.
- **Điểm bắt đầu:** ROL-01.
- **Nội dung:** tên vai trò, số nhân sự bị ảnh hưởng; danh sách quyền theo nhóm, mỗi quyền thể
  hiện trạng thái (**Mặc định của Blink**, **Bật thêm tại cơ sở**, **Tắt tại cơ sở**), đang dùng
  hay không, và dấu **Đã khoá** nếu có.
- **Thao tác chính:** **Chỉnh quyền** (chỉ hiện khi được phép) mở ROL-03.
- **Thao tác phụ:** **Đặt lại về mặc định của Blink** mở ROL-07 (chỉ hiện khi có tuỳ chỉnh và
  được phép); quay lại ROL-01.
- **Lỗi có thể thử lại:** không tải được dữ liệu, có nút **Thử lại**.
- **Lỗi cần xử lý khác:** vai trò không còn cấu hình được, đưa tới ROL-08.

### ROL-03 — Chỉnh quyền của vai trò

- **Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA.
- **Điểm bắt đầu:** ROL-02 qua **Chỉnh quyền**.
- **Nội dung:** cùng danh sách như ROL-02 nhưng mỗi quyền cho đổi giữa các trạng thái khi được
  phép. Quyền vai trò chưa có chỉ có lựa chọn **Bật thêm tại cơ sở** hoặc giữ nguyên; quyền
  đang có chỉ có **Tắt tại cơ sở** hoặc giữ nguyên; quyền đã tuỳ chỉnh có thêm **Về mặc định của
  Blink**. Mỗi lựa chọn không được phép bị khoá kèm lý do. Quyền nhạy cảm không bật thêm được
  cho Đặt phòng, Lễ tân, Phục vụ phòng.
- **Riêng Owner:** khi chọn **Tắt tại cơ sở** có thêm tuỳ chọn **Khoá để cấp dưới không mở lại
  được**, kèm giải thích ngắn.
- **Thao tác chính:** **Tiếp tục** khi có ít nhất một thay đổi, mở ROL-04.
- **Thao tác phụ:** **Hủy** về ROL-02 và bỏ thay đổi chưa lưu, có hỏi lại nếu đã chỉnh.

### ROL-04 — Xác nhận thay đổi

- **Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA.
- **Điểm bắt đầu:** ROL-03.
- **Nội dung:** tóm tắt bằng lời quyền sẽ **được bật thêm**, **bị tắt**, **trả về mặc định của
  Blink** và **được khoá**; số nhân sự bị ảnh hưởng; câu **Thay đổi có hiệu lực ngay**; ô nhập
  **Lý do** bắt buộc.
- **Thao tác chính:** **Lưu thay đổi**, chỉ bật khi đã nhập lý do.
- **Thao tác phụ:** **Quay lại chỉnh** về ROL-03 giữ nguyên lựa chọn.
- **Màn hình tiếp theo:** ROL-05 khi thành công; ROL-06 khi dữ liệu đã đổi.
- **Lỗi có thể thử lại:** lỗi kết nối, giữ nguyên lựa chọn và lý do, có nút **Thử lại**.
- **Lỗi cần chỉnh lại:** một thay đổi không còn hợp lệ (ví dụ người xem vừa mất quyền chỉnh);
  nêu quyền nào cần bỏ chọn rồi quay lại ROL-03.

### ROL-05 — Đã cập nhật vai trò

- **Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA.
- **Điểm bắt đầu:** ROL-04 hoặc ROL-07 thành công.
- **Nội dung:** thông báo thành công, số quyền được bật thêm, bị tắt và trả về mặc định; nhắc
  rằng thay đổi áp dụng cho số nhân sự đã nêu.
- **Thao tác chính:** **Xong** về ROL-02 với dữ liệu mới.

### ROL-06 — Dữ liệu đã thay đổi

- **Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA.
- **Điểm bắt đầu:** ROL-04 hoặc ROL-07 khi có người khác vừa đổi cấu hình quyền của cơ sở.
- **Nội dung:** giải thích **Cấu hình quyền của cơ sở vừa được thay đổi bởi người khác hoặc
  quyền của bạn đã thay đổi**; chưa lưu gì.
- **Thao tác chính:** **Tải lại** về ROL-02 với dữ liệu mới, bỏ thay đổi chưa lưu.
- **Không** cho gửi lại bằng dữ liệu cũ.

### ROL-07 — Đặt lại về mặc định của Blink

- **Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA.
- **Điểm bắt đầu:** ROL-02.
- **Nội dung:** giải thích xoá mọi tuỳ chỉnh mà người dùng được phép xoá và vai trò quay về quyền
  mặc định của Blink; nếu có quyền do Chủ cơ sở khoá mà người dùng không được xoá thì nêu rõ
  **một số quyền do Chủ cơ sở khoá sẽ được giữ nguyên**; số nhân sự bị ảnh hưởng; ô nhập
  **Lý do** bắt buộc.
- **Thao tác chính:** **Đặt lại**, bật khi đã nhập lý do. **Thao tác phụ:** **Hủy**.
- **Màn hình tiếp theo:** ROL-05 khi thành công; ROL-06 khi dữ liệu đã đổi.
- **Không còn gì để đặt lại:** nút **Đặt lại** ở ROL-02 không hiện; nếu vẫn xảy ra do dữ liệu
  vừa đổi thì hiển thị **Không còn tuỳ chỉnh nào để đặt lại** và quay về ROL-02.

### ROL-08 — Không thể chỉnh vai trò

- **Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA.
- **Điểm bắt đầu:** các tình huống bị chặn từ ROL-01 đến ROL-07.
- **Nội dung:** một trong các lý do sau, bằng ngôn ngữ người dùng:
  - **Bạn không có quyền thay đổi cấu hình quyền của cơ sở**;
  - **Chỉ chủ cơ sở chỉnh được vai trò Quản lý**;
  - **Vai trò này không thể cấu hình**.
- **Không** hiển thị mã quyền còn thiếu cho người không phải quản trị Blink.
- **Thao tác chính:** **Quay lại** danh sách vai trò.

## 7. Dữ liệu được hiển thị và phải che

- Hiển thị: tên vai trò, tên cùng mô tả quyền, trạng thái từng quyền, số nhân sự bị ảnh hưởng,
  dấu **Đã khoá**, lý do khi nhập.
- Không hiển thị: mã kỹ thuật của quyền, tên trạng thái nội bộ, quyền được bảo vệ, danh tính
  nhân sự, token hoặc số phiên bản.

## 8. Ngoài phạm vi wireframe này

- Tạo role mới hoặc đổi tên, đổi hạng role.
- Áp dụng một cấu hình cho nhiều cơ sở (mỗi cơ sở độc lập, không tính vào chuỗi).
- Quyền riêng của từng nhân sự (xem wireframe quyền riêng).
- Quyền của vị trí Cashier và thiết lập thiết bị Cashier.
- Màu sắc, phông chữ và phong cách hình ảnh.

## 9. Danh sách kiểm tra trước khi Figma bắt đầu

- [ ] Có đủ ROL-01 đến ROL-08 trên cả Flutter và React PWA.
- [ ] Ba trạng thái **Mặc định của Blink**, **Bật thêm tại cơ sở**, **Tắt tại cơ sở** được thể
      hiện nhất quán và có trạng thái khoá kèm lý do.
- [ ] Mọi xác nhận nêu số nhân sự bị ảnh hưởng và câu hiệu lực ngay.
- [ ] Có cảnh báo khi tắt quyền thắng quyền riêng, và khi thêm quyền ủy quyền cho Phó quản lý.
- [ ] Có luồng lỗi cho dữ liệu đã đổi, lỗi kết nối, quyền bị khoá và vai trò không cấu hình
      được.
- [ ] Mọi nút lưu đều yêu cầu lý do trước khi bật.
- [ ] Không màn hình nào dùng mã kỹ thuật làm nội dung chính.
