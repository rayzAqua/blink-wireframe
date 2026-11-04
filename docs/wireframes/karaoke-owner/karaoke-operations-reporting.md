# BBN-077 — Luồng màn hình thống kê vận hành Karaoke

Cơ sở: [Thiết kế](../../../../initiatives/karaoke-operations-reporting/design.md). Dành cho Owner, Manager, Vice có quyền xem
báo cáo tại cơ sở. Các nhãn có thể điều chỉnh sau; định nghĩa số liệu phải giữ.

## 1. Trang chủ cơ sở

**FLUTTER APP / REACT PWA** — sau đăng nhập, chọn cơ sở được phép quản lý.

- Tên cơ sở đang xem, thời điểm cập nhật gần nhất.
- Chỉ hiển thị hai thông tin thống kê: Đang dùng (đơn vị phòng), Đã dùng
  (đơn vị lượt). Không hiển thị các số/biểu đồ khác trên trang chủ.
- Chú thích: Đang dùng là hiện tại; Đã dùng là lượt đã hoàn thành thuộc ngày
  bắt đầu hát. Hiển thị khoảng ngày vận hành bằng ngày và giờ cụ thể.
- Nút Xem thống kê đi đến màn hình 2. Làm mới cập nhật cả hai số.
- Trang chủ luôn là ngày vận hành hiện tại; không có bộ lọc ngày. Chỉ khi
  mở trang chi tiết mới tải đầy đủ báo cáo, không chờ báo cáo để hiện trang chủ.
- Chưa có lượt: hiển thị 0. Đang tải: khung chờ; lỗi: Chưa tải được số liệu
  và Thử lại, không thay bằng 0. Lỗi báo cáo không chặn thao tác phòng.
- Đổi cơ sở: tải lại số liệu và bỏ kết quả trả chậm của cơ sở trước.

## 2. Thống kê vận hành

**FLUTTER APP / REACT PWA** — từ Xem thống kê, giữ cơ sở đang chọn.

- Bộ chọn Hôm nay, 7 ngày, Tháng này, Tuỳ chọn; hiển thị ngày bắt đầu/kết thúc
  và quy tắc ngày vận hành theo giờ mở cửa. Không chọn ngày tương lai.
- Đang dùng nằm riêng, ghi rõ Đang sử dụng lúc [thời điểm hiện tại], kể cả
  đang xem ngày cũ. Không vẽ đường lịch sử cho số phòng hiện tại.
- Các số trong kỳ: tổng lượt mở đơn, đã dùng, đơn huỷ, thời lượng trung bình.
- Không có lượt hoàn thành: thời lượng hiển thị Chưa có dữ liệu.
- Biểu đồ theo ngày: chọn xem lượt mở, đã dùng hoặc huỷ; chạm ngày xem số.
  Có danh sách số liệu theo ngày thay thế để đọc được khi không dùng biểu đồ.
- Phân bố lượt mở theo nguồn: Booking, Hotline, Khách trực tiếp; hiển thị số
  lượt từng nguồn, không dùng nhãn vai trò nhân sự để thay nguồn đơn.
- Chú thích huỷ: gồm huỷ chủ động, hết hạn xác nhận, quá hạn khách đến.
- Chạm số đơn huỷ mở phần 3; quay lại về trang chủ. Không có nút xem doanh
  thu, thanh toán, khách hàng hoặc xếp hạng trong phạm vi này.
- Khoảng rỗng: các số bằng 0, biểu đồ không có lượt, không báo lỗi.
- Khoảng quá dài/đảo ngày: hướng dẫn chọn lại tối đa 90 ngày.
- Thiếu quyền: Bạn không có quyền truy cập; cho quay lại/chọn cơ sở khác.
- Lỗi tải: giữ bộ lọc, cho Thử lại; không trình bày số liệu cũ như vừa cập nhật.

## 3. Chi tiết số đơn huỷ

**FLUTTER APP / REACT PWA** — mở bảng thông tin ngay trên màn hình thống kê.

Hiển thị khoảng đang chọn, tổng số và ba dòng:

- Huỷ chủ động hoặc lý do khác.
- Hết hạn xác nhận.
- Khách không đến trong thời hạn.

Tổng ba dòng bằng số đơn huỷ. Chú thích: tính theo thời điểm hệ thống ghi
nhận huỷ, không theo ngày tạo đơn. Nút Đóng trở lại màn hình 2, giữ bộ lọc.
Không cần danh sách khách/đơn hoặc quyền Admin Audit để xem phần này.

## Ví dụ để designer kiểm tra

Phòng 101 hoàn thành 3 lượt, 102 hoàn thành 1 lượt, 103 đang hát, tất cả mở
trong ngày đang xem: Đang dùng 1 phòng; Đã dùng 4 lượt; Tổng mở 5 lượt.
Chuyển phòng không tăng lượt. Lượt hát qua ngày chỉ cộng Đã dùng về ngày mở
khi hoàn thành; số liệu ngày trước có thể tăng sau khi ngày đó kết thúc.

Không có WEB CÔNG KHAI, link mời, ADMIN UI hoặc chuyển ứng dụng trong luồng này.
