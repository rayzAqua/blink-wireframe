# Luồng xem lịch sử chơi theo phòng

Phạm vi tài liệu: bàn giao hành vi, không triển khai giao diện trong task BE.

## Chi tiết đơn — Lịch sử chơi

Nơi hiển thị: REACT PWA; FLUTTER APP áp dụng cùng luồng khi triển khai.

Người sử dụng: tài khoản được xem đầy đủ đơn trong phạm vi công việc. Bản xem
hạn chế của Lễ tân không bổ sung quyền xem lịch sử này.

Điểm bắt đầu: từ chi tiết đơn, mở phần Lịch sử chơi theo phòng.
Nội dung: các phòng theo thứ tự sử dụng, tên phòng lúc sử dụng, giờ vào/ra,
thời gian đã chơi. Phòng đang chơi hiển thị Đang sử dụng và thời lượng tạm tính.
Không hiển thị tiền trong giai đoạn này.

Thao tác: quay lại chi tiết đơn hoặc tải lại lịch sử. Khi chuyển phòng trong
luồng vận hành, lịch sử bổ sung đoạn phòng mới; khi kết thúc chơi, đoạn cuối
có giờ ra. Đơn cũ thiếu dữ liệu phải hiển thị Lịch sử chưa đầy đủ, không diễn
giải phần thiếu là khách chưa chơi.

Lỗi có thể khôi phục: mất kết nối thì cho thử lại; không còn được xem đơn thì
đi về danh sách đơn. Đơn không tồn tại hoặc ngoài phạm vi không tiết lộ nội dung.

## Thu ngân — React máy tính/tablet

Từ chi tiết đơn của cơ sở đang trực → Lịch sử chơi theo phòng. Hiển thị cùng
các đoạn phòng và thời lượng ở trên, không giá/tổng tiền. Mất lượt trực hoặc
bị tắt quyền xem: dừng đọc, tải lại context/chọn người trực hợp lệ. Không yêu
cầu nhập User token để thay cho phiên thiết bị. Chưa xây UI trong task BE.
