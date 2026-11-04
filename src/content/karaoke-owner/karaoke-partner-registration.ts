import type { Flow } from '../../domain/types.ts';

export const karaokePartnerRegistration: Flow = {
  id: 'karaoke-partner-registration',
  title: 'Đăng ký đối tác Karaoke',
  role: 'karaoke-owner',
  summary:
    'Quy trình tạo cơ sở Karaoke đầu tiên dành cho đối tác Owner mới, từ chọn gói, cấu hình giờ mở cửa đến tầng/phòng ban đầu.',
  actors: ['Owner đăng ký mới'],
  environments: ['FLUTTER_APP', 'REACT_PWA'],
  screens: [
    {
      id: 'REG-01',
      title: 'Chọn gói nhân sự ban đầu',
      environment: 'FLUTTER_APP',
      actor: 'Owner',
      entryPoint: 'Đăng ký đối tác → Karaoke',
      objective:
        'Chọn gói và thời hạn đang được Blink cung cấp với giá niêm yết, ưu đãi và giới hạn nhân sự.',
      visibleData: [
        'Tên gói',
        'Thời hạn',
        'Giới hạn nhân sự',
        'Giá niêm yết',
        'Giá cuối',
      ],
      primaryAction: 'Chọn gói → REG-02',
      secondaryActions: ['Hủy → Quay về trang trước'],
      nextScreen: 'REG-02',
      errorsOrOutcomes: [
        'Gói ngừng bán: Tải lại danh mục',
        'Môi trường thực tế chỉ cho tiếp tục gói 0đ khi chưa có cổng thanh toán',
      ],
    },
    {
      id: 'REG-02',
      title: 'Thông tin cơ sở Karaoke',
      environment: 'FLUTTER_APP',
      actor: 'Owner',
      entryPoint: 'Sau khi chọn gói ở REG-01',
      objective:
        'Nhập tên cơ sở, địa chỉ, hotline riêng (tùy chọn) và giờ mở/đóng cửa cố định.',
      visibleData: [
        'Tên cơ sở',
        'Địa chỉ',
        'Hotline cơ sở',
        'Giờ mở/đóng cửa',
        'Tùy chọn mở cả ngày 00:00 - 24:00',
      ],
      userInput: [
        'Tên cơ sở (bắt buộc)',
        'Địa chỉ (bắt buộc)',
        'Hotline (duy nhất nếu nhập)',
        'Giờ mở cửa/đóng cửa',
      ],
      primaryAction: 'Tiếp tục → REG-03',
      secondaryActions: ['Quay lại → REG-01'],
      nextScreen: 'REG-03',
      errorsOrOutcomes: ['Trùng hotline hoặc dữ liệu sai: giữ biểu mẫu để sửa'],
    },
    {
      id: 'REG-03',
      title: 'Logo và ảnh bìa cơ sở',
      environment: 'FLUTTER_APP',
      actor: 'Owner',
      entryPoint: 'Sau khi nhập thông tin cơ sở',
      objective:
        'Tải logo và ảnh bìa đại diện, theo dõi trạng thái xử lý ảnh qua Media service.',
      visibleData: [
        'Vùng chọn ảnh',
        'Trạng thái xử lý (chưa chọn / đang xử lý / sẵn sàng)',
        'Ảnh xem trước',
      ],
      primaryAction: 'Tiếp tục → REG-04',
      secondaryActions: ['Bỏ qua bước này → REG-04'],
      nextScreen: 'REG-04',
      errorsOrOutcomes: [
        'Ảnh lỗi/chưa sẵn sàng: yêu cầu thay ảnh hoặc chờ xử lý hoàn tất',
      ],
    },
    {
      id: 'REG-04',
      title: 'Thiết lập tầng và phòng ban đầu',
      environment: 'FLUTTER_APP',
      actor: 'Owner',
      entryPoint: 'Sau bước hình ảnh',
      objective:
        'Nhập số tầng hoặc danh sách phòng ban đầu với sức chứa và khung giá. Có thể bỏ qua toàn bộ.',
      visibleData: [
        'Tùy chọn có/không dùng tầng',
        'Danh sách tầng',
        'Danh sách phòng ban đầu',
        'Khung giá',
      ],
      primaryAction: 'Tiếp tục → REG-05',
      secondaryActions: ['Bỏ qua bước này → REG-05', 'Quay lại → REG-03'],
      nextScreen: 'REG-05',
      errorsOrOutcomes: ['Cấu trúc tầng/phòng/giá sai: chỉ rõ mục cần sửa'],
    },
    {
      id: 'REG-05',
      title: 'Xác nhận tạo cơ sở',
      environment: 'FLUTTER_APP',
      actor: 'Owner',
      entryPoint: 'Sau khi hoàn thiện các bước đăng ký',
      objective:
        'Tóm tắt 4 khối thông tin: gói dịch vụ, thông tin cơ sở, hình ảnh, tầng & phòng.',
      visibleData: [
        'Tóm tắt gói',
        'Tóm tắt cơ sở',
        'Ảnh xem trước',
        'Số tầng và phòng',
      ],
      primaryAction: 'Tạo cơ sở → REG-06',
      secondaryActions: ['Chỉnh sửa từng khối tương ứng'],
      nextScreen: 'REG-06',
      errorsOrOutcomes: [
        'Mất mạng: gửi lại an toàn không tạo trùng',
        'Không tạo cơ sở dở nếu một phần thất bại',
      ],
    },
    {
      id: 'REG-06',
      title: 'Kết quả đăng ký thành công',
      environment: 'FLUTTER_APP',
      actor: 'Owner',
      entryPoint: 'Sau khi Backend tạo cơ sở thành công',
      objective:
        'Thông báo cơ sở đang hoạt động và chờ Blink hậu kiểm, kèm gợi ý hoàn thiện dữ liệu còn thiếu.',
      visibleData: [
        'Tên và địa chỉ cơ sở',
        'Gói & ngày hết hạn',
        'Trạng thái: Đang hoạt động — chờ Blink hậu kiểm',
      ],
      primaryAction: 'Vào quản lý cơ sở',
      nextScreen: 'Trang chủ cơ sở',
    },
  ],
  source: 'docs/wireframes/karaoke-owner/karaoke-partner-registration.md',
};
