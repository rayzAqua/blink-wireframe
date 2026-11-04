# BBN-076 — Luồng màn hình đóng/mở nhận đặt phòng

**Nơi hiển thị:** FLUTTER APP / REACT PWA. Không có màn hình public hoặc
chuyển tiếp từ link. Tài liệu chuẩn bị theo thiết kế; chưa triển khai giao diện.

## Danh sách và sơ đồ phòng

Giữ ba trạng thái Trống/Đã đặt/Đang hát. Phòng ngừng nhận đặt có nhãn riêng
**Ngừng nhận đặt mới**, vẫn nhìn thấy khách/đơn cũ theo quyền. Phòng trên tầng
đóng có giải thích tầng đang đóng, không giả định công tắc riêng của phòng tắt.

Người có quyền chọn phòng → Chi tiết phòng → **Nhận đặt mới**. Người không
có quyền chỉ xem trạng thái, không thấy nút điều chỉnh. Bộ chọn phòng khi tạo
đơn/chuyển phòng không đưa phòng đóng vào danh sách lựa chọn.

## Ngừng nhận đặt

Màn xác nhận ghi tên phòng, tên cơ sở và nội dung:
**Phòng sẽ không nhận đơn mới. Các đơn đã đặt và khách đang sử dụng vẫn được giữ.**
Nút **Ngừng nhận đặt** / **Quay lại**. Trong lúc gửi khóa nút chống bấm lặp.
Thành công → Chi tiết và sơ đồ phòng cập nhật nhãn; không nhảy sang Trống,
không hiện thông báo đơn bị hủy.

## Nhận đặt trở lại

Chọn **Mở nhận đặt** → xác nhận → phòng nhận đơn theo lịch và điều kiện hiện tại.
Nếu tầng đóng, ghi rõ **Phòng đã bật nhận đặt, nhưng tầng đang đóng nên chưa
nhận được đơn mới**. Không tự mở tầng hoặc cơ sở.

## Đơn cũ và lỗi có thể phục hồi

- Đơn đã đặt vẫn xem, xác nhận, mở phòng hoặc hủy theo quyền hiện có.
- Khách đang hát vẫn được hoàn thành đơn hoặc chuyển ra phòng phù hợp.
- Chuyển vào/đổi lịch gặp phòng vừa đóng → Báo không nhận đặt mới; giữ dữ liệu
  đã nhập, cho chọn phòng khác hoặc quay lại. Không tạo đơn thay thế tự động.
- Người khác vừa đóng/mở → **Thông tin phòng đã thay đổi. Vui lòng tải lại.**
- Mất kết nối → Không tuyên bố thành công; tải lại trạng thái trước khi thử lại.
- Mất quyền → **Bạn không có quyền truy cập.** Không hiển thị mã quyền nội bộ.
