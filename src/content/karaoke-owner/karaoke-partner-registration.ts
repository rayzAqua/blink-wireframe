import type { Flow, Screen } from '../../domain/types.ts';
import { bar, buttons, inApp } from '../helpers.ts';
import { planCards } from './plan-catalog.ts';

const actor = 'Người đăng ký làm Owner';
const steps = ['Gói', 'Thông tin', 'Ảnh', 'Tầng và phòng', 'Xác nhận'];

const screens: Screen[] = [
  {
    ...inApp(actor),
    id: 'REG-01',
    title: 'Chọn gói nhân sự ban đầu',
    entryPoint: 'Đăng ký đối tác → Karaoke',
    objective:
      'Chọn gói và thời hạn đang được Blink cung cấp. Giao diện không tự tính giá cuối.',
    visibleData: [
      'Năm gói: BASIC, Pro, Pro Max, Pro Ultra, Pro Ultra +',
      'Tên gói, thời hạn, giới hạn nhân sự, giá theo tháng và giá khi mua theo năm, Max360',
      'Mua năm: trả cả năm một lần hoặc trả theo tháng 12 kỳ',
      'Khi chưa có thanh toán, môi trường thật chỉ cho tiếp tục với lựa chọn có giá cuối bằng 0 đồng',
    ],
    primaryAction: 'Chọn gói → REG-02',
    secondaryActions: ['Huỷ → trang trước', 'Lỗi đủ điều kiện → REG-07'],
    nextScreen: 'REG-02',
    errorsOrOutcomes: ['Gói ngừng bán: tải lại danh mục'],
    layout: [
      bar('Chọn gói'),
      { type: 'stepper', steps, current: 0 },
      {
        type: 'alert',
        variant: 'info',
        text: 'Hiện chỉ gói BASIC (miễn phí) chọn được khi đăng ký. Gói có giá gửi yêu cầu sau khi cơ sở đã tạo, Admin xác nhận sau khi thu tiền.',
      },
      planCards('REG-02', ['BASIC']),
      {
        type: 'field',
        kind: 'radio',
        label: 'Cách thanh toán khi mua theo năm',
        value: 'Trả theo tháng (12 kỳ)',
        options: ['Trả cả năm một lần', 'Trả theo tháng (12 kỳ)'],
      },
      buttons(
        { label: 'Chọn gói', goto: 'REG-02' },
        { label: 'Huỷ', variant: 'secondary' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'REG-02',
    title: 'Thông tin cơ sở Karaoke',
    entryPoint: 'REG-01 → Chọn gói',
    objective:
      'Nhập tên, địa chỉ, hotline tuỳ chọn và một giờ mở cửa. Số điện thoại Owner không dùng làm hotline cơ sở.',
    visibleData: [
      'Tên cơ sở (bắt buộc)',
      'Địa chỉ (bắt buộc)',
      'Giờ mở cửa (một mốc; giờ đóng cửa là cùng giờ đó của ngày hôm sau)',
      'Hotline (tuỳ chọn, duy nhất nếu nhập)',
    ],
    userInput: ['Tên cơ sở', 'Địa chỉ', 'Hotline', 'Giờ mở cửa'],
    primaryAction: 'Tiếp tục → REG-03',
    secondaryActions: ['Quay lại → REG-01'],
    nextScreen: 'REG-03',
    errorsOrOutcomes: ['Trùng hotline hoặc dữ liệu sai: giữ biểu mẫu để sửa'],
    layout: [
      bar('Thông tin cơ sở'),
      { type: 'stepper', steps, current: 1 },
      {
        type: 'field',
        kind: 'input',
        label: 'Tên cơ sở',
        value: 'Karaoke Blink Sài Gòn',
      },
      {
        type: 'field',
        kind: 'input',
        label: 'Địa chỉ',
        value: '123 Nguyễn Thị Minh Khai, Quận 1',
      },
      {
        type: 'field',
        kind: 'input',
        label: 'Hotline (tuỳ chọn)',
        placeholder: '0901 234 567',
        error: 'Số hotline đã được cơ sở khác sử dụng.',
      },
      {
        type: 'field',
        kind: 'input',
        label: 'Giờ mở cửa',
        value: '11:00',
        helper: 'Giờ đóng cửa là 11:00 ngày hôm sau.',
      },
      buttons(
        { label: 'Tiếp tục', goto: 'REG-03' },
        { label: 'Quay lại', variant: 'secondary', goto: 'REG-01' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'REG-03',
    title: 'Logo và ảnh bìa',
    entryPoint: 'REG-02 → Tiếp tục',
    objective:
      'Tải logo và ảnh bìa; mỗi vùng ảnh có ba trạng thái: chưa chọn, đang tải hoặc xử lý, sẵn sàng. Không gửi khi ảnh còn xử lý hoặc lỗi.',
    visibleData: [
      'Vùng chọn ảnh logo và ảnh bìa',
      'Trạng thái chưa chọn, đang xử lý, sẵn sàng; ảnh xem trước; nút thay hoặc xoá',
    ],
    primaryAction: 'Tiếp tục → REG-04',
    secondaryActions: ['Bỏ qua → REG-04'],
    nextScreen: 'REG-04',
    errorsOrOutcomes: ['Ảnh lỗi hoặc chưa sẵn sàng: thay ảnh hoặc chờ xử lý'],
    layout: [
      bar('Logo và ảnh bìa'),
      { type: 'stepper', steps, current: 2 },
      {
        type: 'keyValue',
        rows: [
          { label: 'Logo', value: 'Sẵn sàng' },
          { label: 'Ảnh bìa', value: 'Đang xử lý' },
        ],
      },
      {
        type: 'alert',
        variant: 'warning',
        text: 'Ảnh bìa chưa xử lý xong. Chờ hoặc thay ảnh trước khi gửi đăng ký.',
      },
      buttons(
        { label: 'Tiếp tục', goto: 'REG-04' },
        { label: 'Bỏ qua', variant: 'secondary', goto: 'REG-04' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'REG-04',
    title: 'Tầng và phòng ban đầu',
    entryPoint: 'REG-03 → Tiếp tục hoặc Bỏ qua',
    objective:
      'Có thể bỏ qua toàn bộ. Nếu nhập số tầng thì tạo danh sách tầng và gắn phòng vào tầng; nếu không thì phòng là danh sách thẳng.',
    visibleData: [
      'Số tầng (tuỳ chọn, tối đa 100)',
      'Mỗi phòng: tên, sức chứa tuỳ chọn, ảnh tuỳ chọn, các khung giá',
      'Không có loại phòng, trạng thái dọn phòng hay bảo trì',
    ],
    userInput: ['Số tầng', 'Phòng'],
    primaryAction: 'Tiếp tục → REG-05',
    secondaryActions: ['Quay lại → REG-03'],
    nextScreen: 'REG-05',
    errorsOrOutcomes: ['Cấu trúc tầng, phòng hoặc giá sai: chỉ rõ mục cần sửa'],
    layout: [
      bar('Tầng và phòng'),
      { type: 'stepper', steps, current: 3 },
      { type: 'field', kind: 'input', label: 'Số tầng (tuỳ chọn)', value: '2' },
      {
        type: 'cardList',
        items: [
          {
            icon: 'door-open',
            title: 'Phòng 101',
            subtitle: 'Tầng 1 · sức chứa 10 · 250.000đ/giờ',
          },
          {
            icon: 'door-open',
            title: 'Phòng 201',
            subtitle: 'Tầng 2 · sức chứa 8 · 200.000đ/giờ',
          },
        ],
      },
      {
        type: 'alert',
        variant: 'danger',
        text: 'Bảng giá của Phòng 201 chưa phủ đủ 24 giờ. Hãy bổ sung khung giờ còn thiếu.',
      },
      buttons(
        { label: 'Tiếp tục', goto: 'REG-05' },
        { label: 'Quay lại', variant: 'secondary', goto: 'REG-03' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'REG-05',
    title: 'Xác nhận tạo cơ sở',
    entryPoint: 'REG-04 → Tiếp tục',
    objective:
      'Xem tóm tắt bốn khối: gói, thông tin cơ sở, hình ảnh, tầng và phòng; mỗi khối có nút quay lại chỉnh sửa. Khoá nút khi gửi; gửi lại do mất mạng trả đúng kết quả đã tạo.',
    visibleData: [
      'Gói đã chọn',
      'Thông tin cơ sở',
      'Hình ảnh',
      'Tầng và phòng',
    ],
    primaryAction: 'Tạo cơ sở → REG-06',
    secondaryActions: ['Chỉnh sửa → REG-02'],
    nextScreen: 'REG-06',
    errorsOrOutcomes: [
      'Mất mạng: gửi lại an toàn, không tạo cơ sở dở',
      'Một phần thất bại: không hiển thị cơ sở được tạo dở',
    ],
    layout: [
      bar('Xác nhận'),
      { type: 'stepper', steps, current: 4 },
      {
        type: 'keyValue',
        rows: [
          { label: 'Gói', value: 'BASIC · Miễn phí · 5 nhân sự' },
          { label: 'Cơ sở', value: 'Karaoke Blink Sài Gòn · mở cửa 11:00' },
          { label: 'Hình ảnh', value: 'Logo, ảnh bìa' },
          { label: 'Tầng và phòng', value: '2 tầng · 2 phòng' },
        ],
      },
      buttons(
        { label: 'Tạo cơ sở', goto: 'REG-06' },
        { label: 'Chỉnh sửa', variant: 'secondary', goto: 'REG-02' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'REG-06',
    title: 'Cơ sở đã được tạo',
    entryPoint: 'Tạo cơ sở thành công',
    objective:
      'Báo cơ sở đang hoạt động và chờ Blink hậu kiểm; không có bước chờ Admin duyệt trước khi sử dụng.',
    visibleData: [
      'Tên, địa chỉ cơ sở',
      'Gói và ngày hết hạn',
      'Trạng thái "Đang hoạt động — chờ Blink hậu kiểm"',
      'Gợi ý bổ sung logo, tầng hoặc phòng nếu đã bỏ qua',
    ],
    primaryAction: 'Vào quản lý cơ sở → Tài khoản Owner',
    nextScreen: 'account-home/ACC-01',
    layout: [
      bar('Đã tạo cơ sở', false),
      {
        type: 'alert',
        variant: 'success',
        title: 'Karaoke Blink Sài Gòn đang hoạt động',
        text: 'Gói BASIC, không có ngày hết hạn. Chờ Blink hậu kiểm.',
      },
      {
        type: 'alert',
        variant: 'info',
        text: 'Bạn đã bỏ qua một số phần. Bổ sung logo, tầng hoặc phòng trong Thiết lập quán.',
      },
      buttons({ label: 'Vào quản lý cơ sở', goto: 'account-home/ACC-01' }),
    ],
  },
  {
    ...inApp(actor),
    id: 'REG-07',
    title: 'Lỗi chính khi đăng ký',
    entryPoint: 'Tài khoản chưa đủ điều kiện hoặc dữ liệu không hợp lệ',
    objective: 'Báo các lỗi chính và hướng xử lý.',
    visibleData: [
      'Tài khoản hoặc số điện thoại chưa đủ điều kiện',
      'Đã là Owner: dùng luồng tạo chi nhánh',
      'Gói hoặc thời hạn vừa ngừng cung cấp',
      'Hotline đã được dùng',
      'Ảnh chưa sẵn sàng hoặc không thuộc người đăng ký',
      'Dữ liệu tầng, phòng hoặc giá không hợp lệ',
    ],
    primaryAction: 'Quay lại → REG-01',
    nextScreen: 'REG-01',
    layout: [
      bar('Đăng ký đối tác'),
      {
        type: 'alert',
        variant: 'danger',
        title: 'Tài khoản chưa xác minh số điện thoại',
        text: 'Hãy xác minh số điện thoại trước khi đăng ký.',
      },
      {
        type: 'alert',
        variant: 'info',
        title: 'Bạn đã là Owner',
        text: 'Hãy dùng luồng Tạo chi nhánh để thêm cơ sở.',
        actionLabel: 'Tạo chi nhánh',
        goto: 'karaoke-branch-creation/BR-01',
      },
      {
        type: 'alert',
        variant: 'warning',
        title: 'Gói vừa ngừng cung cấp',
        text: 'Tải lại danh mục gói và chọn lại.',
      },
      buttons({ label: 'Quay lại', goto: 'REG-01' }),
    ],
  },
];

export const karaokePartnerRegistration: Flow = {
  id: 'karaoke-partner-registration',
  title: 'Đăng ký đối tác Karaoke',
  role: 'karaoke-owner',
  section: 'start',
  summary:
    'Người dùng đã đăng nhập đăng ký cơ sở Karaoke đầu tiên và trở thành Owner: chọn gói, nhập thông tin, ảnh, tầng và phòng, xác nhận. Cơ sở hoạt động ngay và chờ hậu kiểm.',
  actors: ['Người đăng ký làm Owner'],
  environments: ['FLUTTER_APP'],
  screens,
  source: 'docs/wireframes/karaoke-owner/karaoke-partner-registration.md',
};
