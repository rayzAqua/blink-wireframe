import type { Flow, Screen } from '../../domain/types.ts';
import { bar, buttons, inApp } from '../helpers.ts';
import { planCards } from './plan-catalog.ts';

const actor = 'Người đăng ký làm Owner';
const steps = ['Gói', 'Thông tin và ảnh', 'Tầng và phòng'];

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
    secondaryActions: ['Huỷ → trang trước', 'Lỗi đủ điều kiện → REG-05'],
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
    title: 'Thông tin cơ sở và hình ảnh',
    entryPoint: 'REG-01 → Chọn gói',
    objective:
      'Nhập thông tin cơ sở và tải logo, ảnh bìa trong cùng một bước. Số điện thoại Owner không dùng làm hotline cơ sở.',
    visibleData: [
      'Tên cơ sở (bắt buộc)',
      'Địa chỉ (bắt buộc)',
      'Giờ mở cửa (một mốc; giờ đóng cửa là cùng giờ đó của ngày hôm sau)',
      'Hotline (tuỳ chọn, duy nhất nếu nhập)',
      'Logo và ảnh bìa (tuỳ chọn): chưa chọn, đang xử lý, sẵn sàng, có ảnh xem trước và nút thay hoặc xoá',
    ],
    userInput: [
      'Tên cơ sở',
      'Địa chỉ',
      'Hotline',
      'Giờ mở cửa',
      'Logo',
      'Ảnh bìa',
    ],
    primaryAction: 'Tiếp tục → REG-03',
    secondaryActions: ['Quay lại → REG-01'],
    nextScreen: 'REG-03',
    errorsOrOutcomes: [
      'Trùng hotline hoặc dữ liệu sai: giữ biểu mẫu để sửa',
      'Ảnh đang xử lý hoặc lỗi: không cho tiếp tục; thay ảnh hoặc chờ xử lý xong',
    ],
    layout: [
      bar('Thông tin và hình ảnh'),
      { type: 'stepper', steps, current: 1 },
      { type: 'heading', text: 'Thông tin cơ sở' },
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
      { type: 'heading', text: 'Hình ảnh (tuỳ chọn)' },
      {
        type: 'keyValue',
        rows: [
          { label: 'Logo', value: 'Sẵn sàng · có thể thay hoặc xoá' },
          { label: 'Ảnh bìa', value: 'Đang xử lý' },
        ],
      },
      {
        type: 'alert',
        variant: 'warning',
        text: 'Ảnh bìa chưa xử lý xong. Chờ hoặc thay ảnh trước khi tiếp tục.',
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
    title: 'Tầng và phòng ban đầu',
    entryPoint: 'REG-02 → Tiếp tục',
    objective:
      'Có thể bỏ qua toàn bộ. Nếu nhập số tầng thì tạo danh sách tầng và gắn phòng vào tầng; nếu không thì phòng là danh sách thẳng. Bước cuối: bấm Tạo cơ sở là đăng ký thành công ngay, không còn màn xác nhận riêng.',
    visibleData: [
      'Số tầng (tuỳ chọn, tối đa 100)',
      'Mỗi phòng: tên, sức chứa tuỳ chọn, các khung giá',
      'Ảnh phòng (tuỳ chọn): tối đa 5 ảnh mỗi phòng; đủ 5 ảnh thì khoá nút Thêm ảnh và báo giới hạn',
      'Không có loại phòng, trạng thái dọn phòng hay bảo trì',
      'Nút Tạo cơ sở ở cuối bước',
    ],
    userInput: ['Số tầng', 'Phòng'],
    primaryAction: 'Tạo cơ sở → REG-04',
    secondaryActions: ['Quay lại → REG-02'],
    nextScreen: 'REG-04',
    errorsOrOutcomes: [
      'Khoá nút khi đang gửi; gửi lại do mất mạng trả đúng kết quả đã tạo, không tạo thêm cơ sở',
      'Một phần thất bại: không hiển thị cơ sở được tạo dở',
      'Cấu trúc tầng, phòng hoặc giá sai: chỉ rõ mục cần sửa',
      'Chọn quá 5 ảnh cho một phòng: chỉ nhận 5 ảnh đầu và báo "Mỗi phòng tối đa 5 ảnh"',
    ],
    layout: [
      bar('Tầng và phòng'),
      { type: 'stepper', steps, current: 2 },
      { type: 'field', kind: 'input', label: 'Số tầng (tuỳ chọn)', value: '2' },
      {
        type: 'cardList',
        items: [
          {
            icon: 'door-open',
            title: 'Phòng 101',
            subtitle: 'Tầng 1 · sức chứa 10 · 250.000đ/giờ · ảnh 2/5',
          },
          {
            icon: 'door-open',
            title: 'Phòng 201',
            subtitle: 'Tầng 2 · sức chứa 8 · 200.000đ/giờ · ảnh 5/5',
          },
        ],
      },
      {
        type: 'alert',
        variant: 'danger',
        text: 'Bảng giá của Phòng 201 chưa phủ đủ 24 giờ. Hãy bổ sung khung giờ còn thiếu.',
      },
      buttons(
        { label: 'Tạo cơ sở', goto: 'REG-04' },
        { label: 'Quay lại', variant: 'secondary', goto: 'REG-02' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'REG-04',
    title: 'Cơ sở đã được tạo',
    entryPoint: 'Bấm Tạo cơ sở ở REG-03 thành công',
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
    id: 'REG-05',
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
    'Người dùng đã đăng nhập đăng ký cơ sở Karaoke đầu tiên và trở thành Owner qua ba bước: chọn gói, nhập thông tin và ảnh, tầng và phòng. Bấm Tạo cơ sở là đăng ký thành công ngay; cơ sở hoạt động và chờ hậu kiểm.',
  actors: ['Người đăng ký làm Owner'],
  environments: ['FLUTTER_APP'],
  screens,
  source: 'docs/wireframes/karaoke-owner/karaoke-partner-registration.md',
};
