# Bản mô tả wireframe đặt phòng và vận hành phòng Karaoke

## 1. Mục đích

Tài liệu này chuyển thiết kế nghiệp vụ đã duyệt thành các màn hình và thao tác dễ
hiểu để Figma Designer dựng giao diện mà không cần đọc mã Backend.

Tài liệu không quyết định màu sắc, phông chữ hoặc phong cách hình ảnh. Tài liệu
chỉ trả lời: ai đang thao tác, đang ở đâu, nhìn thấy gì, được bấm gì và sau đó đi
đến đâu.

## 2. Chú thích nơi hiển thị

| Nhãn                 | Ý nghĩa                                                                            |
| -------------------- | ---------------------------------------------------------------------------------- |
| 🌐 **WEB CÔNG KHAI** | Trang mở từ đường link nhân viên chia sẻ. Khách không cần tài khoản hay đăng nhập. |
| 📱 **FLUTTER APP**   | Màn hình trong ứng dụng Flutter của nhân sự quán.                                  |
| 🖥️ **REACT PWA**     | Màn hình trong React PWA của nhân sự quán.                                         |

Màn hình nằm trên cả Flutter và React PWA phải có cùng nội dung và cùng quy tắc.
Cách bố trí có thể khác để phù hợp từng nền tảng. Mọi màn hình nhân sự dùng được
trên điện thoại cầm tay, vì nhân viên thao tác khi đang đứng tại quầy hoặc ở cửa
phòng.

## 3. Người sử dụng

- **Nhân viên Booking:** tạo đơn đặt trước và theo dõi đơn do mình tạo.
- **Quản lý (Owner, Manager, Vice), thu ngân:** tạo đơn hotline, mở phòng, kết
  thúc phòng, cấu hình đặt phòng và theo dõi toàn bộ đơn của quán.
- **TableHost (nhân viên phục vụ):** đón khách, mở phòng, chuyển phòng, mở phòng
  cho khách vãng lai và xem mọi đơn đang hoạt động của quán.
- **Khách:** chỉ mở link xác nhận. Khách thường không rành công nghệ hoặc đang
  say, nên mọi thao tác phía khách phải tối giản.

Ai được bấm nút nào xem bảng ở mục 5.

## 4. Quy tắc chung cho mọi màn hình

- Mọi trạng thái dùng cách gọi thân thiện: **Chờ xác nhận**, **Đã xác nhận**,
  **Đang hát**, **Hoàn tất**, **Đã huỷ**. Không hiển thị tên kỹ thuật.
- Một phòng có thể bán nhiều khung giờ trong ngày. Khi xem lịch phải thấy rõ phòng
  đã có đơn vào những giờ nào.
- Mọi giờ trong đơn là **giờ dự kiến**. Khách có thể đến sớm, muộn hoặc chơi quá
  giờ. Chỉ giờ mở phòng và giờ kết thúc thực tế mới dùng để tính tiền sau này.
- Giờ bắt đầu hiển thị là **giờ vào dự kiến**, giờ kết thúc hiển thị là **giờ ra
  dự kiến**. Không ghi "giờ đệm" cho nhân viên; thay vào đó hiển thị "Phòng được
  giữ đến HH:mm".
- Đặt trước tối đa 3 ngày. Màn chọn ngày chỉ cho chọn trong khoảng này.
- Khách không đến thì **huỷ đơn**, không có thao tác "khách không đến".
- Thao tác không hoàn tác được (mở phòng, kết thúc phòng) phải có một bước xác
  nhận ngắn gọn.
- Mọi lỗi phải nói rõ nguyên nhân và bước tiếp theo bằng ngôn ngữ nghiệp vụ.

## 5. Ai được bấm gì

| Thao tác                    | Booking      | TableHost                         | Thu ngân            | Quản lý (Owner, Manager, Vice)         |
| --------------------------- | ------------ | --------------------------------- | ------------------- | -------------------------------------- |
| Tạo đơn đặt trước           | Có           | Chỉ khi được cấp thêm quyền       | Có                  | Có                                     |
| Tạo đơn hotline             | Không        | Không                             | Có                  | Có                                     |
| Mở phòng cho khách vãng lai | Không        | Có                                | Có                  | Có                                     |
| Xem đơn                     | Đơn mình tạo | Mọi đơn đang hoạt động + đơn mình | Theo quyền được cấp | Toàn quán                              |
| Mở phòng (khách đến)        | Không        | Có, với mọi đơn                   | Có                  | Có                                     |
| Chuyển phòng                | Không        | Có, với mọi đơn                   | Có                  | Có                                     |
| Kết thúc phòng              | Không        | Không                             | Có                  | Có                                     |
| Sửa, đổi lịch, huỷ đơn      | Đơn mình tạo | Đơn mình tạo                      | Có                  | Có                                     |
| Xác nhận thay khách         | Đơn mình tạo | Không                             | Có                  | Có                                     |
| Cấu hình đặt phòng          | Không        | Không                             | Không               | Owner, Manager; Vice khi được cấp thêm |

Nếu một người không có quyền, nút tương ứng không hiển thị thay vì hiển thị mờ.

Cột **Thu ngân** là quyền mặc định của vị trí thu ngân. Màn hình thu ngân chưa nằm
trong giai đoạn này, nên trước mắt các thao tác của thu ngân (đặc biệt Kết thúc
phòng) do quản lý thực hiện.

## 6. Bản đồ luồng tổng quát

```text
Nhân viên tạo đơn ─> Chia sẻ link cho khách ─> Khách xác nhận (web công khai)
        │                                           │
        │                                           v
        │                                    Đơn "Đã xác nhận"
        v                                           │
  Đơn "Chờ xác nhận" ──── (hết hạn) ──> Đã huỷ      │
        │                                           │
        └──────────── Khách đến ───────────────────>┤
                                                    v
                                            Mở phòng → "Đang hát"
                                                    │
                          (phòng đang có khách khác)│──> Chuyển phòng
                                                    v
                                         Kết thúc phòng → "Hoàn tất" (phòng trống ngay)

Khách vãng lai ─> Chọn phòng trống ─> Mở phòng ngay → "Đang hát"
```

## 7. Màn hình

### 7.1. Tạo đơn đặt phòng

**Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA. **Người dùng:** Booking, quản
lý, thu ngân (hotline).

**Cách vào:** nút "Tạo đơn" trên danh sách đơn hoặc từ một phòng trống trên lịch
phòng.

**Nội dung hiển thị:**

- Loại đơn: Đặt trước (có hoa hồng) hoặc Hotline. Người không có quyền hotline
  không thấy lựa chọn này.
- Ngày vào, giờ vào dự kiến (chỉ trong 3 ngày tới và trong giờ mở cửa).
- Thời lượng chơi: danh sách chọn, mặc định là **thời gian chơi dự kiến mặc định
  của quán** (ví dụ 2 giờ). Hiển thị luôn giờ ra dự kiến tính được.
- Số khách, tên khách (bắt buộc), số điện thoại (không bắt buộc), ghi chú.
- Danh sách phòng trống cho khung giờ đã chọn, kèm sức chứa. Phòng không đủ chỗ
  hoặc đã có đơn trong khung giờ đó hiển thị rõ lý do.

**Thao tác và kết quả:**

- Chọn phòng, bấm "Tạo đơn" → sang màn chia sẻ link (7.2). Đơn ở trạng thái **Chờ
  xác nhận**.
- Đổi giờ hoặc thời lượng → danh sách phòng trống tự tải lại.

**Lỗi có thể thử lại:** phòng vừa bị người khác đặt ("Phòng vừa có người đặt, chọn
phòng khác"), giờ ngoài giờ mở cửa, quá 3 ngày.

### 7.2. Chia sẻ link xác nhận

**Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA.

**Nội dung hiển thị:** tóm tắt đơn (phòng, giờ vào, giờ ra dự kiến, tên khách);
lời nhắc "Nếu khách không xác nhận, đơn sẽ tự huỷ sau X phút"; link xác nhận; mã QR.

**Thao tác:** Sao chép link, Chia sẻ (qua ứng dụng nhắn tin của điện thoại), Hiện QR
cho khách quét. Nút "Xong" quay về chi tiết đơn.

**Ghi chú:** hệ thống không tự gửi tin nhắn cho khách; nhân viên tự chia sẻ.

### 7.3. Trang xác nhận của khách

**Nơi hiển thị:** 🌐 WEB CÔNG KHAI.

**Cách vào:** khách mở link do nhân viên gửi. Không cần đăng nhập.

**Nội dung hiển thị:** tên quán, tên và ảnh phòng, ngày giờ, tên khách (rút gọn),
một nút lớn "Xác nhận đặt phòng". Không hiển thị số điện thoại, ghi chú nội bộ hay
tên nhân viên. Sau khi xác nhận, trang nhắc khách giờ nhận phòng cuối cùng (ví dụ
"Vui lòng đến trước 20:00, quá giờ này đơn sẽ tự huỷ").

**Kết quả:**

- Xác nhận thành công: thông báo "Đã xác nhận" kèm mã check-in 6 ký tự để khách đưa
  khi đến quán.
- Bấm lặp lại: vẫn hiện "Đã xác nhận", không tạo thêm gì.
- Link hết hạn hoặc đơn đã bị huỷ: nói rõ "Link đã hết hạn, vui lòng liên hệ nhân
  viên đặt phòng".

### 7.4. Lịch phòng và danh sách đơn

**Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA. **Người dùng:** mọi nhân sự có
quyền xem đơn.

**Nội dung hiển thị:**

- Hai cách xem: **Theo phòng** (mỗi phòng một dòng thời gian, thấy các khung giờ đã
  đặt trong 3 ngày) và **Danh sách đơn** (lọc theo trạng thái, ngày, tìm theo tên
  hoặc mã).
- Mỗi đơn hiển thị: trạng thái, phòng, giờ vào và giờ ra dự kiến, tên khách, số
  khách.
- Các nhãn đặc biệt:
  - **Quá giờ X phút** cho đơn Đang hát đã vượt giờ ra dự kiến.
  - **Phòng được giữ đến HH:mm** cho đơn Đang hát.
  - **Tự huỷ nếu chưa mở phòng lúc HH:mm** cho đơn Đã xác nhận (giờ nhận phòng cuối
    cùng). Đơn bị huỷ vì quá giờ hiển thị **Đã huỷ tự động (khách không đến)**.
  - **Có nguy cơ trùng với đơn HH:mm** khi hệ thống không thể giữ thêm phòng vì đã
    có đơn sau. Đây là cảnh báo để TableHost chuẩn bị chuyển phòng.
  - **Mở khi khách chưa xác nhận** trên đơn đã được mở phòng từ Chờ xác nhận.
- Với phòng đang quá giờ, lịch hiển thị rõ khung giờ sau đó còn trống từ lúc nào
  (kèm ghi chú "chưa chắc chắn" nếu khách vẫn đang hát).

**Thao tác:** bấm một đơn để vào chi tiết; bấm một phòng trống để tạo đơn hoặc mở
phòng cho khách vãng lai (nếu có quyền).

### 7.5. Chi tiết đơn

**Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA.

**Nội dung hiển thị:** trạng thái, phòng, giờ vào dự kiến, giờ ra dự kiến, giờ mở
phòng thực tế và người mở phòng (khi có), tên và số điện thoại khách, số khách,
ghi chú, người tạo đơn, lịch sử thao tác.

**Các nút theo trạng thái** (chỉ hiện nút người đó được phép bấm):

| Trạng thái       | Nút hiển thị                                                                                              |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| Chờ xác nhận     | Mở phòng (khi quán bật cho phép), Xác nhận thay khách, Sửa, Đổi lịch, Chuyển phòng, Huỷ đơn, Lấy lại link |
| Đã xác nhận      | Mở phòng, Sửa, Đổi lịch, Chuyển phòng, Huỷ đơn                                                            |
| Đang hát         | Chuyển phòng, Kết thúc phòng                                                                              |
| Hoàn tất, Đã huỷ | Chỉ xem                                                                                                   |

**Đổi lịch:** màn con cho phép đổi giờ vào, thời lượng và phòng. Đơn Đã xác nhận đổi
lịch vẫn là Đã xác nhận; khách không phải xác nhận lại. Phòng và khung giờ trống
được kiểm tra lại trước khi lưu.

### 7.6. Mở phòng cho khách đã đặt

**Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA. **Người dùng:** TableHost, thu
ngân, quản lý.

**Cách vào:** nút "Mở phòng" ở chi tiết đơn, hoặc tìm đơn bằng mã check-in khách
đưa. Mã chỉ giúp tìm nhanh; không nhập mã vẫn mở phòng được.

**Trường hợp đơn Đã xác nhận:** hiển thị hộp xác nhận ngắn "Mở phòng X cho khách
Y?". Bấm "Mở phòng" → đơn chuyển Đang hát và giờ mở phòng được ghi lại.

**Trường hợp đơn Chờ xác nhận** (khách chưa bấm link):

- Nếu quán **đã bật** cho mở phòng khi khách chưa xác nhận: hiển thị cảnh báo nổi
  bật "Khách chưa xác nhận đơn. Thao tác này sẽ mở phòng và không thể hoàn tác."
  với nút "Vẫn mở phòng" và "Quay lại". Chọn "Vẫn mở phòng" mới tiếp tục.
- Nếu quán **tắt**: hiển thị "Quán yêu cầu khách xác nhận trước khi mở phòng."
  Người có quyền thấy thêm nút "Xác nhận thay khách" rồi mới mở phòng; người khác
  được nhắc liên hệ quản lý.

**Khách đến sớm hoặc muộn:** đến sớm, nếu phòng trống thì mở được ngay. Đến muộn
trong giờ nhận phòng cho phép thì mở bình thường và giờ ra dự kiến không thay đổi.
Nếu đã quá giờ nhận phòng cuối cùng, đơn đã tự huỷ và hiển thị "Đơn đã hết hạn nhận
phòng. Có thể mở phòng cho khách vãng lai nếu phòng còn trống." kèm nút "Khách vãng
lai".

**Khi phòng đang có khách khác:** xem màn 7.8.

### 7.7. Mở phòng cho khách vãng lai

**Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA. **Người dùng:** TableHost, thu
ngân, quản lý.

**Cách vào:** nút "Khách vãng lai" hoặc bấm vào một phòng trống trên lịch phòng.

**Nội dung nhập:** chọn một phòng trống (ngay lúc này), số khách, thời lượng dự kiến
(mặc định theo cấu hình quán), ghi chú. Không cần tên hay số điện thoại.

**Kết quả:** bấm "Mở phòng" → đơn **Đang hát** bắt đầu từ lúc bấm. Hiển thị phòng và
giờ ra dự kiến.

**Lỗi:** phòng đang có khách hoặc có đơn đặt sắp đến ("Phòng 101 đã có đơn lúc
19:00, chọn thời lượng ngắn hơn hoặc phòng khác").

### 7.8. Phòng đang có khách khác

**Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA.

**Cách vào:** khi mở phòng cho đơn B mà phòng vẫn còn khách của đơn A đang hát (hoặc
khi chuyển một đơn vào phòng đó).

**Nội dung hiển thị:** "Phòng 101 đang có khách (đơn A, giờ ra dự kiến 21:00, quá
giờ 20 phút)", tóm tắt hai đơn A và B.

**Hai hướng xử lý** (hai nút):

1. **Chuyển đơn đang chờ sang phòng trống khác:** mở danh sách phòng trống ngay lúc
   này và chuyển đơn B (xem 7.9).
2. **Mời khách đang hát đổi phòng:** mở danh sách phòng trống và chuyển đơn A sang
   phòng khác để dành phòng cho đơn B.

Không có nút "ép khách ra". Nếu không còn phòng trống nào, hiển thị "Hiện không còn
phòng trống, vui lòng chờ hoặc huỷ đơn" và cho phép huỷ đơn B kèm lý do.

### 7.9. Chuyển phòng

**Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA. **Người dùng:** TableHost, thu
ngân, quản lý.

**Nội dung hiển thị:** đơn đang chuyển, phòng hiện tại, danh sách phòng trống kèm
sức chứa. Với đơn Đang hát, danh sách là các phòng trống từ bây giờ.

**Thao tác:** chọn phòng → hộp xác nhận "Chuyển đơn của khách Y từ phòng 101 sang
phòng 102?" → bấm "Chuyển phòng".

**Kết quả:**

- Toàn bộ thông tin đơn giữ nguyên, giờ ra dự kiến không đổi. Với đơn Đang hát,
  đồng hồ tính giờ tiếp tục không gián đoạn.
- Phòng cũ trống ngay. Tiền phòng sau này tính theo phòng mới trên toàn bộ thời
  gian.
- Lịch sử đơn ghi lại phòng cũ, phòng mới, người chuyển và giờ chuyển.

**Lỗi có thể thử lại:** phòng đích vừa có người đặt ("Phòng vừa có đơn khác, chọn
phòng khác").

### 7.10. Kết thúc phòng (check-out)

**Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA. **Người dùng:** thu ngân, quản
lý.

**Cách vào:** nút "Kết thúc phòng" ở chi tiết đơn Đang hát.

**Nội dung hiển thị:** hộp xác nhận "Kết thúc phòng 101? Thao tác này không thể hoàn
tác." kèm giờ mở phòng, giờ kết thúc (bây giờ) và tổng thời gian đã dùng.

**Kết quả:** đơn chuyển **Hoàn tất**, phòng trống ngay. Chưa có thanh toán trong màn
này; ghi chú nhỏ "Tính tiền sẽ có ở phiên bản sau".

### 7.11. Huỷ đơn

**Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA.

**Nội dung hiển thị:** danh sách lý do (Khách không đến, Khách đổi ý, Nhập nhầm, Lý
do khác) và ô ghi chú. Bắt buộc chọn lý do.

**Kết quả:** đơn chuyển **Đã huỷ**, phòng trống ngay. Chỉ huỷ được đơn Chờ xác nhận
và Đã xác nhận; đơn Đang hát không có nút huỷ.

### 7.12. Cấu hình đặt phòng

**Nơi hiển thị:** 📱 FLUTTER APP và 🖥️ REACT PWA. **Người dùng:** Owner, Manager và
Vice khi được cấp quyền.

**Nội dung hiển thị và nhập:**

- **Thời gian giữ chỗ chờ xác nhận** (số phút): đơn Chờ xác nhận quá hạn này sẽ tự
  huỷ.
- **Cho phép mở phòng khi khách chưa xác nhận** (công tắc): giải thích ngắn "Dùng
  khi khách không biết cách bấm link. Nhân viên vẫn thấy cảnh báo trước khi mở."
- **Thời gian chơi dự kiến mặc định** (giờ, phút): áp dụng cho mọi đơn khi người tạo
  không chọn thời lượng khác.
- **Thời gian chờ khách đến muộn** (số phút, mặc định 60): quá giờ vào dự kiến chừng
  này mà chưa mở phòng thì đơn Đã xác nhận tự huỷ. Ghi chú "Áp dụng cả cho các đơn
  đang chờ khách".

**Kết quả:** bấm "Lưu" → thông báo đã lưu. Thay đổi áp dụng cho đơn tạo từ lúc lưu.

## 8. Thông báo và cảnh báo tạm thời

Giai đoạn này chưa có thông báo đẩy. Cảnh báo chỉ hiển thị khi người dùng đang mở
lịch phòng, danh sách đơn hoặc chi tiết đơn (các nhãn ở mục 7.4). Khi có module
thông báo, các cảnh báo sau sẽ được đẩy cho đúng người:

- Đơn Đang hát quá giờ.
- Không giữ thêm được phòng vì có đơn kế tiếp.
- Đơn Đã xác nhận sắp quá giờ nhận phòng (gửi cho người tạo đơn).
- Đơn bị huỷ, kể cả huỷ tự động.

## 9. Trường hợp cần Designer lưu ý

- Màn chọn thời lượng phải thao tác nhanh bằng một ngón tay; mặc định phải rõ để
  nhân viên không phải chọn lại mỗi lần.
- Cảnh báo "khách chưa xác nhận" phải nổi bật hơn hộp xác nhận thông thường, nhưng
  không gây sợ hãi; mục tiêu là làm nhân viên dừng lại một nhịp.
- Phòng quá giờ và phòng có nguy cơ trùng cần nhìn thấy ngay trên lịch phòng mà
  không phải mở từng đơn.
- Danh sách phòng trống khi chuyển phòng phải ưu tiên phòng đủ sức chứa và gần
  phòng hiện tại (nếu có thông tin tầng).
- Tên khách có thể rất dài hoặc có dấu; số điện thoại để trống phải hiển thị tự
  nhiên.
