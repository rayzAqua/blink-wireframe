# Bản mô tả wireframe phân quyền riêng cho nhân sự Karaoke

## 1. Mục đích

Tài liệu này chuyển thiết kế nghiệp vụ đã duyệt thành các màn hình và thao tác
dễ hiểu để Figma Designer dựng giao diện mà không cần đọc mã Backend.

Tài liệu không quyết định màu sắc, phông chữ hoặc phong cách hình ảnh. Tài liệu
chỉ trả lời: ai đang thao tác, đang ở đâu, nhìn thấy gì, được bấm gì và sau đó đi
đến đâu.

## 2. Chú thích nơi hiển thị

| Nhãn               | Ý nghĩa                                              |
| ------------------ | ---------------------------------------------------- |
| 📱 **FLUTTER APP** | Màn hình nằm trong ứng dụng Flutter của cấp quản lý. |
| 🖥️ **REACT PWA**   | Màn hình nằm trong React PWA của cấp quản lý.        |

Luồng này không có trang web công khai và không có bước chuyển tiếp từ đường
link. Mọi màn hình xuất hiện trên cả Flutter và React PWA phải có cùng nội dung
và cùng quy tắc; cách bố trí có thể khác theo nền tảng.

## 3. Người sử dụng

- **Chủ cơ sở (Owner):** chỉnh quyền riêng của Quản lý, Phó quản lý và nhân sự cấp
  thấp hơn; là người duy nhất được khoá một quyền đã chặn.
- **Quản lý chi nhánh:** chỉnh quyền riêng của Phó quản lý và nhân sự cấp thấp
  hơn tại chi nhánh được giao.
- **Phó quản lý được ủy quyền:** chỉ chỉnh quyền thông thường của Đặt phòng, Lễ
  tân và Phục vụ phòng. Phó quản lý chưa được ủy quyền chỉ xem hoặc không thấy
  màn hình này.
- **Nhân sự bị đổi quyền:** chỉ nhận thông báo; không có màn hình chỉnh quyền của
  chính mình.

Không ai được chỉnh quyền của chính mình hoặc của người cùng cấp trở lên. Các
màn hình phải thể hiện đúng điều này thay vì để người dùng thử rồi gặp lỗi.

## 4. Quy tắc chung cho mọi màn hình

- Dùng ba trạng thái dễ hiểu cho từng quyền: **Theo vai trò**, **Cấp thêm**,
  **Chặn**. Không hiển thị tên kỹ thuật hoặc mã quyền.
- Mỗi quyền có tên và mô tả ngắn bằng tiếng Việt; quyền nhạy cảm có nhãn
  **Quyền nhạy cảm** để người chỉnh biết mức ảnh hưởng.
- Quyền được gom theo nhóm chức năng (ví dụ phòng, đơn, nhân sự), có thể mở rộng
  hoặc thu gọn.
- Mỗi quyền cho biết nhân sự **đang được dùng hay không** sau khi áp dụng mọi
  nguồn. Một quyền được cấp thêm nhưng bị chặn ở cấp vai trò phải hiện rõ là
  chưa dùng được, không hiện như đang bật.
- Điều khiển không được phép chỉnh phải bị khoá kèm lý do ngắn (ví dụ **Chủ cơ sở
  đã khoá**, **Bạn không được cấp quyền này**), không được ẩn lặng lẽ.
- Mọi lần lưu và đặt lại đều bắt buộc có **lý do** từ 1 đến 500 ký tự.
- Thay đổi có hiệu lực ngay ở thao tác tiếp theo của nhân sự, không cần họ đăng
  nhập lại. Màn hình xác nhận và kết quả phải nói rõ điều này.
- Không hiển thị thông tin danh tính nhạy cảm của nhân sự trong luồng này.

## 5. Bản đồ luồng tổng quát

```text
Hồ sơ nhân sự → PRM-01 → PRM-02 Xem quyền
                              ├─ (được phép chỉnh) → PRM-03 Chỉnh quyền
                              │                          └─ PRM-04 Xác nhận → PRM-05 Thành công
                              │                                         └─ PRM-06 Dữ liệu đã đổi → PRM-02
                              └─ (được phép) → PRM-07 Đặt lại → PRM-05
Không được phép chỉnh → PRM-08 Không thể chỉnh quyền
Nhân sự bị đổi quyền → NTF-01 Thông báo
```

## 6. Màn hình

### PRM-01 — Lối vào từ hồ sơ nhân sự

- **Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA.
- **Người dùng:** Owner, Quản lý, Phó quản lý được ủy quyền.
- **Điểm bắt đầu:** màn hình hồ sơ công việc của một nhân sự.
- **Nội dung:** nút **Phân quyền** cạnh các thao tác nhân sự khác.
- **Điều kiện hiện nút:** người xem được xem quyền của nhân sự này. Nút hiện nhưng
  chỉ cho xem nếu người xem không có quyền chỉnh.
- **Thao tác chính:** mở PRM-02.
- **Không hiện nút khi:** nhân sự là chính người xem, là Owner, hoặc đã nghỉ việc.

### PRM-02 — Xem quyền của nhân sự

- **Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA.
- **Điểm bắt đầu:** PRM-01.
- **Nội dung:** tên nhân sự, vị trí hiện tại, trạng thái làm việc; danh sách quyền
  theo nhóm, mỗi quyền thể hiện trạng thái (**Theo vai trò**, **Cấp thêm**,
  **Chặn**), có đang dùng hay không, và dấu **Đã khoá** nếu có; số lượng quyền cấp
  thêm và quyền bị chặn.
- **Thao tác chính:** **Chỉnh quyền** (chỉ hiện khi được phép) mở PRM-03.
- **Thao tác phụ:** **Đặt lại về quyền theo vai trò** mở PRM-07 (chỉ hiện khi có
  quyền riêng và được phép); quay lại hồ sơ nhân sự.
- **Nhân sự đang tạm dừng:** hiển thị cảnh báo **Nhân sự đang tạm dừng, các quyền
  này chỉ dùng được sau khi kích hoạt lại**; vẫn được chỉnh theo quy tắc chung.
- **Lỗi có thể thử lại:** không tải được dữ liệu, có nút **Thử lại**.
- **Lỗi cần xử lý khác:** nhân sự không còn thuộc cơ sở hoặc đã nghỉ việc, đưa tới
  PRM-08.

### PRM-03 — Chỉnh quyền

- **Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA.
- **Điểm bắt đầu:** PRM-02 qua **Chỉnh quyền**.
- **Nội dung:** cùng danh sách như PRM-02, nhưng mỗi quyền cho đổi giữa **Theo vai
  trò**, **Cấp thêm** và **Chặn** khi được phép. Mỗi lựa chọn không được phép bị
  khoá kèm lý do. Quyền chưa có ở vai trò chỉ có lựa chọn **Cấp thêm** hoặc giữ
  nguyên; quyền đang có ở vai trò chỉ có **Chặn** hoặc giữ nguyên.
- **Riêng Owner:** khi chọn **Chặn**, có thêm tuỳ chọn **Khoá để cấp dưới không mở
  lại được**, kèm giải thích ngắn.
- **Phó quản lý ủy quyền:** chỉ thấy các quyền thông thường mình đang có; không
  thấy lựa chọn **Cấp thêm** cho quyền mình không có.
- **Thao tác chính:** **Tiếp tục** khi có ít nhất một thay đổi, mở PRM-04.
- **Thao tác phụ:** **Hủy** quay lại PRM-02 và bỏ thay đổi chưa lưu, có hỏi lại nếu
  đã chỉnh.
- **Điều kiện chuyển bước:** ít nhất một quyền đã đổi so với trạng thái ban đầu.

### PRM-04 — Xác nhận thay đổi

- **Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA.
- **Điểm bắt đầu:** PRM-03.
- **Nội dung:** tóm tắt bằng lời: quyền sẽ **được cấp thêm**, **bị chặn**, **được
  trả về theo vai trò**, và quyền nào **được khoá**; ô nhập **Lý do** bắt buộc;
  câu nhắc **Thay đổi có hiệu lực ngay**.
- **Thao tác chính:** **Lưu thay đổi**, chỉ bật khi đã nhập lý do.
- **Thao tác phụ:** **Quay lại chỉnh** về PRM-03 giữ nguyên lựa chọn.
- **Màn hình tiếp theo:** PRM-05 khi thành công; PRM-06 khi dữ liệu đã đổi.
- **Lỗi có thể thử lại:** lỗi kết nối, giữ nguyên lựa chọn và lý do, có nút **Thử
  lại**.
- **Lỗi cần chỉnh lại:** một quyền không còn hợp lệ (ví dụ người xem vừa mất quyền
  đó); nêu quyền nào cần bỏ chọn rồi quay lại PRM-03.

### PRM-05 — Đã cập nhật quyền

- **Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA.
- **Điểm bắt đầu:** PRM-04 hoặc PRM-07 thành công.
- **Nội dung:** thông báo thành công, số quyền được cấp thêm, bị chặn và trả về
  theo vai trò; câu **Nhân sự đã nhận thông báo** nếu thông báo gửi được, hoặc
  **Chưa gửi được thông báo cho nhân sự** nếu không gửi được (thay đổi vẫn có
  hiệu lực).
- **Thao tác chính:** **Xong** về PRM-02 với dữ liệu mới.

### PRM-06 — Dữ liệu đã thay đổi

- **Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA.
- **Điểm bắt đầu:** PRM-04 hoặc PRM-07 khi có người khác vừa đổi nhân sự này.
- **Nội dung:** giải thích **Quyền của nhân sự này vừa được thay đổi bởi người
  khác**; chưa lưu gì.
- **Thao tác chính:** **Tải lại** về PRM-02 với dữ liệu mới, bỏ thay đổi chưa lưu.
- **Không** cho gửi lại bằng dữ liệu cũ.

### PRM-07 — Đặt lại về quyền theo vai trò

- **Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA.
- **Điểm bắt đầu:** PRM-02.
- **Nội dung:** giải thích xoá mọi quyền cấp thêm và quyền bị chặn mà người dùng
  được phép xoá; nếu có quyền bị khoá mà người dùng không được xoá, nêu rõ **một
  số quyền do Chủ cơ sở khoá sẽ được giữ nguyên**; ô nhập **Lý do** bắt buộc.
- **Thao tác chính:** **Đặt lại**, bật khi đã nhập lý do. **Thao tác phụ:** **Hủy**.
- **Màn hình tiếp theo:** PRM-05 khi thành công; PRM-06 khi dữ liệu đã đổi.
- **Không có gì để đặt lại:** nút **Đặt lại** ở PRM-02 không hiện; nếu vẫn xảy ra do
  dữ liệu vừa đổi thì hiển thị **Không còn quyền riêng nào để đặt lại** và quay về
  PRM-02.

### PRM-08 — Không thể chỉnh quyền

- **Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA.
- **Điểm bắt đầu:** các tình huống bị chặn từ PRM-01 đến PRM-07.
- **Nội dung:** một trong các lý do sau, bằng ngôn ngữ người dùng:
  - **Bạn không có quyền thay đổi quyền của nhân sự này**;
  - **Không thể chỉnh quyền của chính mình hoặc của người cùng cấp trở lên**;
  - **Nhân sự đã nghỉ việc**.
- **Không** hiển thị mã quyền còn thiếu cho người không phải quản trị Blink.
- **Thao tác chính:** **Quay lại** hồ sơ nhân sự.

### NTF-01 — Thông báo cho nhân sự bị đổi quyền

- **Nơi hiển thị:** thông báo trong 📱 FLUTTER APP và 🖥️ REACT PWA.
- **Nội dung:** **Quyền làm việc của bạn tại [tên cơ sở] đã được thay đổi.** Không
  liệt kê quyền nào, không nêu lý do chi tiết hay người thực hiện.
- **Khi mở thông báo:** đưa nhân sự tới màn hình tài khoản hoặc cơ sở đang làm việc
  để họ thấy các chức năng hiện có.

## 7. Dữ liệu được hiển thị và phải che

- Hiển thị: tên và vị trí nhân sự, tên cùng mô tả quyền, trạng thái từng quyền,
  dấu **Đã khoá**, lý do khi nhập.
- Không hiển thị: mã kỹ thuật của quyền, tên trạng thái nội bộ, quyền được bảo vệ
  của Owner hoặc Admin, thông tin danh tính nhạy cảm, token hoặc mã phiên bản.
- Lý do chỉ do người chỉnh nhập; không hiển thị cho nhân sự bị đổi quyền trong
  thông báo.

## 8. Ngoài phạm vi wireframe này

- Cấu hình quyền chung của một vai trò tại cơ sở.
- Quyền của vị trí Cashier và thiết lập thiết bị Cashier.
- Chỉnh quyền hàng loạt cho nhiều nhân sự.
- Lịch sử thay đổi quyền chi tiết trong giao diện (lịch sử nhân sự hiện có chỉ
  hiển thị loại thay đổi và lý do).
- Màu sắc, phông chữ và phong cách hình ảnh.

## 9. Danh sách kiểm tra trước khi Figma bắt đầu

- [ ] Có đủ PRM-01 đến PRM-08 và NTF-01 trên cả Flutter và React PWA.
- [ ] Ba trạng thái **Theo vai trò**, **Cấp thêm**, **Chặn** được thể hiện nhất
      quán và có trạng thái khoá kèm lý do.
- [ ] Quyền nhạy cảm có nhãn riêng và quyền chưa dùng được vì bị chặn ở cấp vai
      trò hiện rõ.
- [ ] Có luồng lỗi cho dữ liệu đã đổi, lỗi kết nối, quyền bị khoá và nhân sự đã
      nghỉ.
- [ ] Mọi nút lưu đều yêu cầu lý do trước khi bật.
- [ ] Không màn hình nào dùng mã kỹ thuật hoặc mã quyền làm nội dung chính.
