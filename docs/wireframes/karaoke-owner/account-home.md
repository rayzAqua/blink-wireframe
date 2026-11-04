# Bàn giao trải nghiệm — Màn hình Tài khoản của Owner Karaoke

**Phạm vi:** Bàn giao thiết kế giao diện, chưa phải giao diện đã triển khai. Tài
liệu này chỉ mô tả **màn hình Tài khoản của Owner Karaoke** và những màn hình mà
từng nút trên đó mở ra. Nội dung bên trong các màn hình đích được thiết kế ở các
tài liệu bàn giao riêng (xem phần "Kế hoạch bàn giao").

**Nơi hiển thị:** Flutter app và React PWA (giao diện di động). Không có màn hình
web công khai và không có màn hình trang quản trị Blink trong phạm vi này.

**Nguồn nghiệp vụ:** [Nghiệp vụ hệ thống](../../../system-business-rules.md),
mục "Tổng hợp nghiệp vụ vận hành của Owner Karaoke" và các mục được dẫn tại từng
dòng bên dưới.

## 1. Người dùng và nguyên tắc chung

**Người dùng:** Owner Karaoke, là chủ sở hữu của một hoặc nhiều cơ sở (cơ sở chính
và các chi nhánh). Các vai trò khác (Manager, Vice Manager, Booking, Receptionist,
TableHost, Thu ngân, CTV) có màn hình Tài khoản riêng và sẽ được bàn giao riêng.

Nguyên tắc cho cả màn hình:

1. Màn hình luôn gắn với **một chi nhánh đang chọn**. Thông tin cơ sở, các nút
   vận hành và trạng thái bên dưới đều thuộc chi nhánh này. Các nút cài đặt và nút
   tài khoản thuộc về chính tài khoản Owner, không đổi theo chi nhánh.
2. Owner có quyền trên mọi chi nhánh mình sở hữu. Quyền này đến từ quan hệ sở
   hữu, nên màn hình không có trạng thái "bị khoá do hết hạn mức nhân sự".
3. Nút nào chưa có chức năng thì vẫn hiển thị để Owner thấy lộ trình, nhưng nhìn
   rõ là chưa dùng được (xem mục 5). Không ẩn nút và không dẫn vào màn hình trống.
4. Ngôn ngữ trên màn hình là ngôn ngữ của chủ quán: "chi nhánh", "nhân sự", "đơn".
   Không dùng tên trạng thái kỹ thuật.
5. Giao diện ẩn hoặc làm mờ nút khi không được phép, nhưng hệ thống vẫn kiểm tra
   lại quyền ở mỗi thao tác.

## 2. Bố cục màn hình Tài khoản

Màn hình là một trang cuộn dọc, gồm sáu khối theo thứ tự từ trên xuống:

```text
┌──────────────────────────────────────┐
│ [Ảnh bìa cơ sở]                      │
│  ┌────┐                              │
│  │Logo│ Tên cơ sở ✔   ▾ Đổi chi nhánh│
│  └────┘ Chi nhánh / Địa chỉ          │
│         [Gói: Tên gói] (nếu có)      │
│         Hotline · Giờ mở cửa · …     │
│         [Trạng thái vận hành]  >     │
├──────────────────────────────────────┤
│ (Banner Blink yêu cầu bổ sung – nếu có)│
├──────────────────────────────────────┤
│ VẬN HÀNH QUÁN                        │
│  Thiết lập quán hát              >   │
│  Quản lý nhân sự                 >   │
│  Quản lý chi nhánh               >   │
│  Thu ngân                        >   │
│  Gói nhân sự                     >   │
│  Cộng tác viên                   >   │
│  QR phòng                  (Sắp có)  │
├──────────────────────────────────────┤
│ KHÁCH HÀNG VÀ KINH DOANH             │
│  Hợp tác đối tác                 >   │
│  Danh bạ khách hàng              >   │
│  Quà tặng                  (Sắp có)  │
│  Lời mời phòng             (Sắp có)  │
├──────────────────────────────────────┤
│ CÀI ĐẶT                              │
│  Thông báo                       >   │
│  Trợ giúp & hỗ trợ         (Sắp có)  │
├──────────────────────────────────────┤
│ TÀI KHOẢN                            │
│  Cập nhật thông tin tài khoản    >   │
│  Phương thức đăng nhập           >   │
│  Đăng xuất                           │
└──────────────────────────────────────┘
```

Trên điện thoại, thẻ thông tin cơ sở nằm cố định đầu trang; khi cuộn xuống, ảnh bìa
thu nhỏ còn thanh tiêu đề gồm logo, tên cơ sở và nút đổi chi nhánh.

## 3. Khối thông tin cơ sở (đầu màn hình)

### 3.1. Nội dung hiển thị

| Thành phần          | Nội dung                                                                                                                                      | Khi thiếu dữ liệu                                    |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Ảnh bìa             | Ảnh bìa của chi nhánh đang chọn, phủ rộng đầu trang                                                                                           | Hiện nền mặc định của Blink kèm gợi ý "Thêm ảnh bìa" |
| Logo                | Ảnh logo của chi nhánh, đặt chồng lên mép dưới ảnh bìa                                                                                        | Hiện chữ cái đầu của tên cơ sở                       |
| Tên cơ sở           | Tên chi nhánh đang chọn; hiển thị đủ hai dòng, quá dài thì rút gọn                                                                            | Không thiếu, tên là bắt buộc                         |
| Tích xanh           | Biểu tượng tích xanh cạnh tên khi cơ sở **đã qua hậu kiểm với kết quả Đạt**                                                                   | Không hiện tích xanh; xem 3.2                        |
| Nhãn tên gói        | Nhãn nhỏ ghi tên gói nhân sự đang dùng của chi nhánh (ví dụ "Gói BASIC"), đặt dưới tên cơ sở; chạm vào nhãn mở màn hình Gói nhân sự (mục 6.6) | Cơ sở chưa có gói thì không hiện nhãn                |
| Địa chỉ             | Địa chỉ chi nhánh                                                                                                                             | Hiện "Chưa có địa chỉ"                               |
| Hotline             | Số hotline của chi nhánh                                                                                                                      | Ẩn dòng này                                          |
| Giờ mở cửa          | Một mốc giờ, kèm chú thích "Ngày hoạt động kéo dài 24 giờ"                                                                                    | Luôn có, vì giờ mở cửa là bắt buộc khi tạo cơ sở     |
| Trạng thái vận hành | Một trong: Đang hoạt động, Tạm dừng, Ngừng                                                                                                    | Luôn có                                              |

Tích xanh ở đây là **kết quả hậu kiểm cơ sở** do Blink thực hiện. Nó khác với tích
xanh xác minh danh tính cá nhân (CCCD) của tài khoản. Hai loại tích xanh không
được dùng chung một biểu tượng giống hệt nhau; Designer cần có cách phân biệt
(ví dụ nhãn "Cơ sở đã xác minh" khi chạm vào tích xanh của cơ sở).

### 3.2. Các trạng thái hậu kiểm hiển thị cạnh tên

| Kết quả hậu kiểm | Hiển thị                                           | Khi chạm vào                                             |
| ---------------- | -------------------------------------------------- | -------------------------------------------------------- |
| Đạt              | Tích xanh                                          | Giải thích ngắn: "Blink đã kiểm tra thông tin cơ sở này" |
| Chưa kiểm tra    | Không có tích xanh                                 | Không có thao tác                                        |
| Đang kiểm tra    | Không có tích xanh, nhãn nhỏ "Blink đang kiểm tra" | Giải thích ngắn                                          |
| Yêu cầu bổ sung  | Không có tích xanh; hiện banner ở mục 4            | Mở màn hình bổ sung hồ sơ                                |
| Không đạt        | Không có tích xanh, nhãn nhỏ "Chưa đạt kiểm tra"   | Giải thích ngắn và nội dung Blink nêu                    |

Kết quả hậu kiểm không làm cơ sở ngừng hoạt động. Cơ sở chưa có tích xanh vẫn dùng
đầy đủ các nút bên dưới.

### 3.3. Hành động

- **Chạm vào cả thẻ thông tin cơ sở (trừ nút đổi chi nhánh)** → mở màn hình
  **Cập nhật thông tin cơ sở** (xem mục 6.1).
- **Chạm vào nút đổi chi nhánh** → mở bảng chọn chi nhánh (xem mục 3.4).
- **Chạm vào nhãn Trạng thái vận hành** → mở màn hình Cập nhật thông tin cơ sở, ở
  ngay phần trạng thái vận hành.

### 3.4. Hiển thị và chuyển đổi chi nhánh

**Điểm vào:** nút "Đổi chi nhánh" trên thẻ thông tin cơ sở. Nếu Owner chỉ có một
cơ sở, nút này vẫn hiện để dẫn tới nút **Thêm chi nhánh** (xem bên dưới).

**Bảng chọn chi nhánh** mở từ dưới lên, gồm:

1. Tiêu đề "Chọn chi nhánh".
2. Danh sách các chi nhánh Owner sở hữu. Mỗi dòng gồm: **ảnh logo của chi nhánh**,
   tên chi nhánh, địa chỉ ngắn, nhãn trạng thái nếu có (Hạn chế, Tạm dừng, Ngừng,
   Chấm dứt) và dấu chọn ở chi nhánh đang dùng. Tích xanh hậu kiểm hiện cạnh tên
   nếu chi nhánh đã đạt.
3. Chi nhánh đang chọn nằm đầu danh sách, các chi nhánh còn lại sắp theo tên.
4. Nút **Thêm chi nhánh** ở cuối danh sách → mở màn hình tạo chi nhánh (thuộc nhóm
   Quản lý chi nhánh, xem mục 5).

**Hành vi:**

- Chọn một chi nhánh khác → đóng bảng, toàn bộ màn hình Tài khoản tải lại theo
  chi nhánh mới (ảnh bìa, logo, tên, trạng thái, banner). Mọi màn hình Owner mở sau
  đó cũng thuộc chi nhánh này. Hiện chỉ báo tải trong lúc đổi, không cho chạm nút
  vận hành cho đến khi tải xong.
- Chọn lại chi nhánh đang dùng → chỉ đóng bảng.
- Chi nhánh đang Chấm dứt vẫn chọn được để xem, nhưng mọi nút thao tác ghi bị làm
  mờ (xem mục 7).
- Danh sách chỉ gồm các chi nhánh còn hiệu lực với tài khoản. Nếu một chi nhánh vừa
  bị xoá hoặc không còn quyền trong lúc đang xem, hiện thông báo "Chi nhánh không
  còn khả dụng" và tự chuyển về một chi nhánh còn lại.
- Ứng dụng nhớ chi nhánh đã chọn lần trước trên thiết bị; lần đăng nhập đầu tiên
  chọn cơ sở đầu tiên của Owner.

## 4. Banner Blink yêu cầu bổ sung hồ sơ

Chỉ hiện khi chi nhánh đang chọn ở trạng thái **Yêu cầu bổ sung** hoặc **Không đạt**
sau hậu kiểm.

- Nội dung: "Blink cần bạn cập nhật thông tin cơ sở", trích nội dung yêu cầu và thời
  điểm gửi.
- Nút **Cập nhật hồ sơ** → mở màn hình Cập nhật thông tin cơ sở, kèm nội dung yêu
  cầu. Việc gửi bổ sung cho Blink được mô tả trong
  [luồng hậu kiểm](../../blink-admin/wireframes/business-post-review.md), mục B.
- Khi đã gửi bổ sung: banner đổi thành "Đã gửi — đang chờ Blink kiểm tra", không
  còn nút.
- Banner vẫn hiện khi cơ sở đang bị hạn chế hoặc tạm dừng, vì đây là lúc cần bổ sung
  nhất.

## 5. Các nhóm nút chức năng

Cột "Mở ra" là màn hình đích. Nội dung chi tiết của màn hình đích thuộc tài liệu
bàn giao tiếp theo. Cột "Tình trạng" cho biết nút đã có nghiệp vụ hay chưa, theo
mã Backend hiện hành.

### 5.1. Vận hành quán

| Nút                | Mở ra                               | Nội dung đích (tóm tắt)                                                                                                                                      | Tình trạng                                                                                       |
| ------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Thiết lập quán hát | Trang **Thiết lập quán** (mục 6.2)  | Phòng và giá, tầng, giờ mở cửa, cấu hình đặt phòng, nhãn đơn, hoa hồng, tài khoản ngân hàng                                                                  | Có nghiệp vụ; hoa hồng chung của cơ sở và VAT phòng chưa triển khai                              |
| Quản lý nhân sự    | Danh sách nhân sự của chi nhánh     | Xem, tìm, lọc nhân sự; mời; sửa hồ sơ làm việc; đổi vai trò, tạm dừng, kích hoạt lại, kết thúc; phân quyền theo vai trò và theo từng người; bổ nhiệm Manager | Có nghiệp vụ (mục 6, 7, 8 của nghiệp vụ hệ thống)                                                |
| Quản lý chi nhánh  | Danh sách chi nhánh của Owner       | Xem từng chi nhánh, thêm chi nhánh, bổ nhiệm hoặc kết thúc Manager của chi nhánh                                                                             | Có nghiệp vụ (mục 5, 8)                                                                          |
| Thu ngân           | Màn hình quản lý Thu ngân (mục 6.5) | Mật khẩu terminal, phiên đang đăng nhập, kết thúc ca từ xa, mẫu quyền Thu ngân                                                                               | Có nghiệp vụ (mục 14)                                                                            |
| Gói nhân sự        | Màn hình Gói nhân sự (mục 6.6)      | Xem gói đang dùng, gửi yêu cầu nâng cấp hoặc gia hạn, rút yêu cầu, đặt huỷ cuối kỳ                                                                           | Có nghiệp vụ (mục 6); không có thanh toán trong ứng dụng                                         |
| Cộng tác viên      | Màn hình cộng tác viên của quán     | Tạo lời mời CTV gắn nguồn quán và danh sách lời mời                                                                                                          | Một phần: có tạo lời mời CTV; xem, cập nhật và kết thúc quan hệ CTV tại quán **chưa triển khai** |
| QR phòng           | Màn hình QR phòng                   | Xuất QR theo phòng                                                                                                                                           | **Chưa triển khai**                                                                              |

### 5.2. Khách hàng và kinh doanh

| Nút                | Mở ra                                  | Nội dung đích (tóm tắt)                                                              | Tình trạng            |
| ------------------ | -------------------------------------- | ------------------------------------------------------------------------------------ | --------------------- |
| Hợp tác đối tác    | Danh sách quan hệ hợp tác với nhà hàng | Gửi, chấp nhận hoặc từ chối yêu cầu hợp tác; kết thúc; khôi phục quan hệ đã tạm dừng | Có nghiệp vụ (mục 16) |
| Danh bạ khách hàng | Danh bạ khách                          | Xem danh bạ trong cơ sở; chỉ sửa, xoá, dùng liên hệ của chính mình                   | Có nghiệp vụ (mục 10) |
| Quà tặng           | Màn hình chương trình quà              | Chương trình quà giờ chơi, yêu cầu quà                                               | **Chưa triển khai**   |
| Lời mời phòng      | Màn hình lời mời phòng                 | Tạo, huỷ, gia hạn lời mời phòng                                                      | **Chưa triển khai**   |

### 5.3. Cài đặt

| Nút               | Mở ra                                                | Nội dung đích (tóm tắt)                                                    | Tình trạng                                                                            |
| ----------------- | ---------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Thông báo         | Màn hình cài đặt thông báo                           | Bật hoặc tắt nhận thông báo đẩy trên thiết bị; danh sách thông báo đã nhận | Một phần: có bật/tắt Web Push và danh sách thông báo; chưa có tuỳ chọn theo từng loại |
| Trợ giúp & hỗ trợ | Không mở màn hình; hiện thông báo "Sắp có" (mục 5.6) | Chưa có nội dung                                                           | **Chưa có nghiệp vụ**                                                                 |

### 5.4. Tài khoản

| Nút                          | Mở ra                      | Nội dung đích (tóm tắt)                                                               | Tình trạng           |
| ---------------------------- | -------------------------- | ------------------------------------------------------------------------------------- | -------------------- |
| Cập nhật thông tin tài khoản | Hồ sơ cá nhân của Owner    | Họ tên, ngày sinh, giới tính, ảnh đại diện, biệt danh, email; xác minh danh tính CCCD | Có nghiệp vụ (mục 3) |
| Phương thức đăng nhập        | Màn hình quản lý đăng nhập | Mật khẩu, số điện thoại, Google, Apple: liên kết, đổi mật khẩu                        | Có nghiệp vụ (mục 2) |
| Đăng xuất                    | Hộp xác nhận (mục 5.5)     | Kết thúc phiên trên thiết bị này                                                      | Có nghiệp vụ         |

### 5.5. Đăng xuất

- Chạm **Đăng xuất** → hộp xác nhận "Đăng xuất khỏi Blink trên thiết bị này?" với hai
  nút **Huỷ** và **Đăng xuất**.
- Xác nhận → thiết bị ngừng nhận thông báo riêng của tài khoản này, xoá chi nhánh đã
  nhớ, quay về màn hình đăng nhập.
- Nếu mất kết nối khi đăng xuất, vẫn thoát khỏi ứng dụng trên thiết bị và báo rằng
  phiên trên máy chủ sẽ được dọn khi có mạng.

### 5.6. Nút chưa có chức năng

Các nút **QR phòng**, **Quà tặng**, **Lời mời phòng** và **Trợ giúp & hỗ trợ** hiển thị
bình thường trong danh sách, kèm nhãn "Sắp có" ở cuối dòng. Khi chạm, hiện một thông
báo ngắn "Sắp có" và không mở màn hình mới. Nút **Cộng tác viên** và **Thông báo** là
nút dùng được nhưng màn hình đích chỉ hiện phần đã có.

## 6. Màn hình mở ra từ các nút chính

Các màn hình dưới đây là điểm đến cấp một. Tài liệu này chỉ chốt cấu trúc và lối
đi; chi tiết từng màn hình thuộc tài liệu riêng.

### 6.1. Cập nhật thông tin cơ sở

**Điểm vào:** chạm thẻ thông tin cơ sở, nhãn trạng thái vận hành hoặc nút Cập nhật
hồ sơ ở banner.

Nhóm thông tin, theo thứ tự:

1. **Hình ảnh:** ảnh bìa, logo và ảnh liên quan; thêm, thay, xoá.
2. **Thông tin chung:** tên, địa chỉ, hotline, thông tin liên hệ.
3. **Giờ mở cửa:** một mốc giờ, kèm dòng giải thích giờ đóng cửa là cùng giờ đó của
   ngày hôm sau. Đổi giờ mở cửa kéo theo dịch bảng giá của mọi phòng; màn hình phải
   cảnh báo trước khi lưu.
4. **Tài khoản ngân hàng** của cơ sở.
5. **Trạng thái vận hành:** Đang hoạt động, Tạm dừng, Ngừng; mỗi lựa chọn có giải
   thích tác động (Tạm dừng hoặc Ngừng: cơ sở không hiện khi khách chọn quán, Thu ngân
   không đăng nhập được).

Quy tắc hiển thị:

- Hotline phải duy nhất; trùng thì báo ngay tại ô nhập và giữ nguyên dữ liệu.
- Đổi hotline thì số đăng nhập Thu ngân đổi theo; màn hình báo điều này trước khi lưu.
  Gỡ hotline thì thông tin đăng nhập Thu ngân dùng số điện thoại của Owner.
- Đổi giờ mở cửa bị chặn nếu ngày nghiệp vụ hiện tại đã có đơn; nói rõ lý do và cho
  quay lại.
- Khi cơ sở bị Blink hạn chế hoặc tạm ngưng: hồ sơ và trạng thái vận hành vẫn sửa
  được; giờ mở cửa và tài khoản ngân hàng bị khoá kèm giải thích.
- Lưu thành công quay về màn hình Tài khoản, thẻ thông tin cơ sở cập nhật ngay.

### 6.2. Thiết lập quán

**Điểm vào:** nút Thiết lập quán hát. Đây là trang danh mục, mỗi dòng mở ra một màn
hình thiết lập riêng:

| Dòng                | Nội dung đích                                                                                              | Ghi chú                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Phòng và giá        | Danh sách phòng; tạo, sửa, xoá phòng; ảnh phòng; bảng giá theo khung giờ; bật hoặc tắt nhận đặt từng phòng | Quản lý phòng nằm trong mục này. Bảng giá phải phủ 24 giờ |
| Tầng                | Số tầng (tối đa 100), đóng hoặc mở từng tầng                                                               | Chỉ hiện đầy đủ khi cơ sở dùng tầng                       |
| Giờ mở cửa          | Đường tắt tới phần giờ mở cửa trong Cập nhật thông tin cơ sở                                               | Tránh nhập giờ ở hai nơi                                  |
| Cấu hình đặt phòng  | Thời gian giữ chỗ chờ xác nhận, hạn nhận phòng, thời lượng mặc định, cho phép mở phòng khi chờ xác nhận    | Khoảng đệm 60 phút là cố định, chỉ hiển thị để biết       |
| Nhãn đơn            | Danh sách nhãn; tạo, sửa, ngừng dùng                                                                       | Thiết kế đã có ở [booking-tagging](booking-tagging.md)    |
| Hoa hồng            | Tỷ lệ hoa hồng phòng và món theo từng nhân sự (tối đa 50% mỗi loại); mức chung của cơ sở (tối đa 50%)      | Mức chung chưa triển khai, hiện nhãn "Sắp có"             |
| Tài khoản ngân hàng | Đường tắt tới phần ngân hàng trong Cập nhật thông tin cơ sở                                                | Tránh nhập ở hai nơi                                      |

Các dòng bị khoá theo trạng thái cơ sở nêu ở mục 7.

### 6.3. Quản lý nhân sự

Danh sách nhân sự chia theo vai trò, có tìm kiếm và bộ lọc theo trạng thái. Nút
**Mời nhân sự** ở đầu danh sách. Chọn một người mở hồ sơ làm việc với các thao tác
đổi vai trò, tạm dừng, kích hoạt lại, kết thúc, và phân quyền riêng. Phần phân quyền
chung theo vai trò nằm ở một mục riêng trong màn hình này. Bổ nhiệm Manager không đi
qua màn hình này mà qua Quản lý chi nhánh (mục 6.4).

### 6.4. Quản lý chi nhánh

Danh sách chi nhánh của Owner, mỗi dòng gồm logo, tên, trạng thái và Manager hiện
tại. Chọn một chi nhánh mở trang chi tiết gồm: thông tin chi nhánh, Manager (mời,
thu hồi lời mời, tạm dừng, kích hoạt lại, kết thúc, mỗi chi nhánh một Manager). Nút
**Thêm chi nhánh** ở đầu danh sách. Gói nhân sự và Thu ngân có nút riêng (mục 6.5 và 6.6).

Chọn một chi nhánh trong màn hình này **không** đổi chi nhánh đang chọn của màn hình
Tài khoản. Muốn thao tác với chi nhánh đó, Owner đổi chi nhánh bằng bảng ở mục 3.4.
Chi tiết hai màn hình này sẽ được bàn giao riêng.

### 6.5. Thu ngân

Màn hình quản lý Thu ngân của chi nhánh đang chọn, gồm: thông tin đăng nhập Thu ngân
của cơ sở (số đăng nhập là hotline hoặc số điện thoại của Owner); xem lại mật khẩu sau
khi Owner nhập lại mật khẩu của chính mình; đặt lại hoặc vô hiệu hoá mật khẩu; danh
sách phiên terminal đang đăng nhập và nút xoá phiên; người đang trực ca kèm nút kết
thúc ca từ xa (bắt buộc nhập lý do); mẫu quyền của vị trí Thu ngân. Khi cơ sở bị hạn
chế bởi Blink, các thao tác quản lý mật khẩu và phiên bị khoá kèm giải thích.

### 6.6. Gói nhân sự

Màn hình hiển thị gói đang dùng của chi nhánh đang chọn (tên gói, số vị trí nhân sự đã
dùng trên tổng, trạng thái và ngày hết hạn nếu có, quyền lợi Max360), các yêu cầu đã
gửi và nút gửi yêu cầu nâng cấp hoặc gia hạn, rút yêu cầu, đặt huỷ cuối kỳ. Owner luôn
vào được màn hình này kể cả khi hạn mức nhân sự đã hết. Không có thanh toán trong ứng
dụng: Blink thu tiền bên ngoài rồi xác nhận, màn hình cần nói rõ điều này. Cơ sở Ngừng
hợp tác không gửi, sửa hay huỷ gói được.

## 7. Trạng thái của cơ sở ảnh hưởng đến màn hình

| Trạng thái chi nhánh đang chọn              | Màn hình Tài khoản hiển thị                                                                                                                                                                                                             |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Đang hoạt động                              | Mọi nút dùng được                                                                                                                                                                                                                       |
| Hạn chế hoặc tạm ngưng bởi Blink            | Dải thông báo "Cơ sở đang bị hạn chế bởi Blink" đầu trang. Nút dùng được nhưng nhiều thiết lập bị khoá bên trong (giờ mở cửa, ngân hàng, phòng và giá, cấu hình đặt phòng, quản lý Thu ngân). Hồ sơ và trạng thái vận hành vẫn sửa được |
| Vận hành Tạm dừng hoặc Ngừng (do Owner đặt) | Nhãn trạng thái nổi bật trên thẻ cơ sở, kèm gợi ý "Khách không thấy quán này"                                                                                                                                                           |
| Chấm dứt hoặc đã xoá                        | Dải thông báo "Cơ sở đã chấm dứt hợp tác"; chỉ xem, mọi nút thao tác ghi bị mờ. Vẫn đổi được sang chi nhánh khác và vẫn đăng xuất được                                                                                                  |

Các nút Cài đặt và Tài khoản không phụ thuộc trạng thái cơ sở.

## 8. Lỗi và trường hợp đặc biệt

| Tình huống                                                               | Hành vi mong muốn                                                                                                                                |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tải thông tin cơ sở lỗi hoặc mất mạng                                    | Hiện khung xương khi đang tải; khi lỗi, giữ phần nút Cài đặt và Tài khoản dùng được, phần thông tin cơ sở hiện thông báo lỗi kèm nút **Thử lại** |
| Thiếu ảnh bìa hoặc logo                                                  | Dùng ảnh thay thế mặc định, không làm lệch bố cục                                                                                                |
| Tài khoản chưa chấp thuận chính sách pháp lý mới (khi tính năng này bật) | Màn hình Tài khoản không mở được; Owner được chuyển tới màn hình xác nhận chính sách, xong thì quay lại. Vẫn đăng xuất được                      |
| Owner bị mất quyền trên chi nhánh đang chọn                              | Báo "Bạn không còn quyền với chi nhánh này", chuyển sang chi nhánh khác nếu có                                                                   |
| Dữ liệu cơ sở vừa được người khác thay đổi                               | Khi mở màn hình đích, báo "Dữ liệu đã thay đổi" và tải lại; không tự ghi đè                                                                      |
| Owner chưa có cơ sở Karaoke nào                                          | Không thuộc phạm vi màn hình này; người dùng thấy màn hình Tài khoản của vai trò khách hàng                                                      |

## 9. Điểm cần xác nhận trước khi thiết kế chi tiết

Đã chốt: cấu hình Thu ngân và Gói nhân sự là hai nút riêng trong nhóm Vận hành quán; thẻ thông tin cơ sở hiển thị nhãn tên gói; giữ tên hai nút Cộng tác viên và Hợp tác đối tác; các nút chưa có chức năng (kể cả Trợ giúp & hỗ trợ) hiển thị nhãn "Sắp có" và báo "Sắp có" khi chạm.

Hiện không còn câu hỏi mở.

## 10. Kế hoạch bàn giao

Các tài liệu bàn giao tiếp theo, mỗi tài liệu mô tả đầy đủ các màn hình bên trong một
nút. Thứ tự gợi ý:

| STT | Tài liệu                                   | Phạm vi                            |
| --- | ------------------------------------------ | ---------------------------------- |
| 1   | Cập nhật thông tin cơ sở                   | Mục 6.1 và bổ sung hồ sơ hậu kiểm  |
| 2   | Thiết lập quán — phòng, giá, tầng          | Mục 6.2, ba dòng đầu               |
| 3   | Thiết lập quán — đặt phòng, nhãn, hoa hồng | Mục 6.2, các dòng còn lại          |
| 4   | Quản lý nhân sự và phân quyền              | Mục 6.3                            |
| 5   | Quản lý chi nhánh và Manager               | Mục 6.4                            |
| 5b  | Thu ngân; Gói nhân sự                      | Mục 6.5 và 6.6                     |
| 6   | Hợp tác đối tác và Cộng tác viên           | Mục 5.1 và 5.2                     |
| 7   | Danh bạ khách hàng                         | Mục 5.2                            |
| 8   | Thông báo                                  | Mục 5.3                            |
| 9   | Tài khoản cá nhân và phương thức đăng nhập | Mục 5.4                            |
| 10  | QR phòng, Quà tặng, Lời mời phòng          | Khi các chức năng này có nghiệp vụ |
