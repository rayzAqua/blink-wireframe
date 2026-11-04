import type { Block, Flow, Screen } from '../../domain/types.ts';
import { bar, buttons, inApp } from '../helpers.ts';
import { planCards } from './plan-catalog.ts';

const actor = 'Owner Karaoke';
const steps = ['Thông tin và ảnh', 'Gói', 'Tầng và phòng'];

const screens: Screen[] = [
  {
    ...inApp(actor),
    id: 'BR-01',
    title: 'Danh sách cơ sở của tôi',
    entryPoint: 'Cơ sở của tôi → Tạo chi nhánh',
    objective:
      'Xem chuỗi và các chi nhánh cùng cấp; chỉ Owner đang hoạt động có quyền tạo chi nhánh mới thấy hành động Tạo chi nhánh.',
    visibleData: [
      'Các chi nhánh cùng cấp của Owner (không vẽ quan hệ cha con)',
      'Nút Tạo chi nhánh',
    ],
    primaryAction: 'Tạo chi nhánh → BR-02',
    secondaryActions: [
      'Chọn cơ sở → trang quản lý của cơ sở',
      'Không có quyền → BR-06',
    ],
    nextScreen: 'BR-02',
    errorsOrOutcomes: ['Thiếu quyền: không cho bắt đầu'],
    layout: [
      bar('Cơ sở của tôi'),
      {
        type: 'cardList',
        items: [
          {
            icon: 'building',
            title: 'Karaoke Blink Sài Gòn',
            subtitle: 'Quận 1',
            badge: 'Đang hoạt động',
            tone: 'success',
          },
          {
            icon: 'building',
            title: 'Karaoke Blink Quận 7',
            subtitle: 'Quận 7',
            badge: 'Đang hoạt động',
            tone: 'success',
          },
        ],
      },
      {
        type: 'text',
        text: 'Chi nhánh mới không tự sao chép gói, nhân sự, phòng hay cấu hình từ chi nhánh khác.',
        muted: true,
      },
      buttons({ label: 'Tạo chi nhánh', goto: 'BR-02' }),
    ],
  },
  {
    ...inApp(actor),
    id: 'BR-02',
    title: 'Thông tin chi nhánh và hình ảnh',
    entryPoint: 'BR-01 → Tạo chi nhánh',
    objective:
      'Nhập thông tin chi nhánh và tải logo, ảnh bìa trong cùng một bước.',
    visibleData: [
      'Tên chi nhánh (bắt buộc)',
      'Địa chỉ (bắt buộc)',
      'Giờ mở cửa (bắt buộc; giờ đóng cửa là cùng giờ đó của ngày hôm sau)',
      'Hotline riêng (tuỳ chọn, duy nhất nếu nhập)',
      'Logo và ảnh bìa (tuỳ chọn): chưa chọn, đang xử lý, sẵn sàng',
    ],
    userInput: ['Tên', 'Địa chỉ', 'Hotline', 'Giờ mở cửa', 'Logo', 'Ảnh bìa'],
    primaryAction: 'Tiếp tục → BR-03',
    secondaryActions: ['Huỷ → BR-01'],
    nextScreen: 'BR-03',
    errorsOrOutcomes: [
      'Trùng hotline hoặc dữ liệu sai: giữ biểu mẫu để sửa',
      'Ảnh đang xử lý hoặc lỗi: thay ảnh hoặc chờ xử lý xong',
    ],
    layout: [
      bar('Thông tin chi nhánh'),
      { type: 'stepper', steps, current: 0 },
      { type: 'heading', text: 'Thông tin chi nhánh' },
      {
        type: 'field',
        kind: 'input',
        label: 'Tên chi nhánh',
        value: 'Karaoke Blink Thủ Đức',
      },
      {
        type: 'field',
        kind: 'input',
        label: 'Địa chỉ',
        value: '45 Võ Văn Ngân, Thủ Đức',
      },
      {
        type: 'field',
        kind: 'input',
        label: 'Hotline (tuỳ chọn)',
        value: '0909 111 222',
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
        { label: 'Tiếp tục', goto: 'BR-03' },
        { label: 'Huỷ', variant: 'secondary', goto: 'BR-01' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'BR-03',
    title: 'Chọn gói nhân sự',
    entryPoint: 'BR-02 → Tiếp tục',
    objective:
      'Chọn một gói và chu kỳ đang được cung cấp. Chi nhánh không kế thừa gói của chi nhánh khác; giá cuối do máy chủ tính.',
    visibleData: [
      'Năm gói: BASIC, Pro, Pro Max, Pro Ultra, Pro Ultra +',
      'Giá theo tháng, giá khi mua theo năm, giới hạn nhân sự, Max360',
      'Mua theo năm: trả cả năm một lần hoặc trả theo tháng 12 kỳ',
    ],
    primaryAction: 'Chọn gói → BR-04',
    secondaryActions: ['Quay lại → BR-02'],
    nextScreen: 'BR-04',
    errorsOrOutcomes: [
      'Gói vừa ngừng bán: tải lại',
      'Môi trường thực tế: gói có giá chưa chọn được khi tạo cơ sở vì chưa có thanh toán',
    ],
    layout: [
      bar('Chọn gói'),
      { type: 'stepper', steps, current: 1 },
      {
        type: 'alert',
        variant: 'info',
        text: 'Chi nhánh có gói riêng, không kế thừa gói của chi nhánh khác. Gói có giá gửi yêu cầu sau khi tạo; hiện chỉ BASIC chọn được ngay.',
      },
      planCards('BR-04', ['BASIC']),
      {
        type: 'field',
        kind: 'radio',
        label: 'Cách thanh toán khi mua theo năm',
        value: 'Trả theo tháng (12 kỳ)',
        options: ['Trả cả năm một lần', 'Trả theo tháng (12 kỳ)'],
      },
      buttons(
        { label: 'Chọn gói', goto: 'BR-04' },
        { label: 'Quay lại', variant: 'secondary', goto: 'BR-02' },
      ),
    ] as Block[],
  },
  {
    ...inApp(actor),
    id: 'BR-04',
    title: 'Tầng và phòng ban đầu',
    entryPoint: 'BR-03 → Chọn gói',
    objective:
      'Tạo tầng và phòng ban đầu hoặc bỏ qua để cấu hình sau. Bước cuối: bấm Tạo chi nhánh là tạo thành công ngay, không còn màn xác nhận riêng.',
    visibleData: [
      'Số tầng (tuỳ chọn)',
      'Danh sách phòng ban đầu, ảnh và bảng giá từng phòng',
      'Không có loại phòng, trạng thái dọn phòng hay bảo trì',
      'Nút Tạo chi nhánh ở cuối bước',
    ],
    userInput: ['Số tầng', 'Phòng'],
    primaryAction: 'Tạo chi nhánh → BR-05',
    secondaryActions: ['Quay lại → BR-03', 'Dữ liệu đã đổi → BR-06'],
    nextScreen: 'BR-05',
    errorsOrOutcomes: [
      'Khoá nút khi đang gửi; gửi lại cùng thao tác trả về kết quả cũ thay vì tạo trùng',
      'Không tạo chi nhánh dở; thất bại thì không hiện trạng thái thành công',
      'Cấu trúc tầng, phòng hoặc giá sai: chỉ rõ mục cần sửa',
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
        type: 'text',
        text: 'Có thể bỏ qua và cấu hình phòng sau trong Thiết lập quán.',
        muted: true,
      },
      buttons(
        { label: 'Tạo chi nhánh', goto: 'BR-05' },
        { label: 'Quay lại', variant: 'secondary', goto: 'BR-03' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'BR-05',
    title: 'Chi nhánh đã được tạo',
    entryPoint: 'Bấm Tạo chi nhánh ở BR-04 thành công',
    objective:
      'Báo chi nhánh đang hoạt động và chờ Blink hậu kiểm; gợi ý cấu hình phần đã bỏ qua. Không tự tạo Manager, nhân sự hay tài khoản Thu ngân.',
    visibleData: [
      'Trạng thái "Đang hoạt động — chờ Blink hậu kiểm"',
      'Chi nhánh xuất hiện ngang hàng trong danh sách cơ sở',
      'Gợi ý cấu hình phần đã bỏ qua',
    ],
    primaryAction: 'Vào quản lý chi nhánh',
    nextScreen: 'account-home/ACC-01',
    layout: [
      bar('Đã tạo chi nhánh', false),
      {
        type: 'alert',
        variant: 'success',
        title: 'Karaoke Blink Thủ Đức đang hoạt động',
        text: 'Chờ Blink hậu kiểm.',
      },
      {
        type: 'alert',
        variant: 'info',
        text: 'Bạn đã bỏ qua phần phòng. Hãy cấu hình phòng và giá trong Thiết lập quán.',
      },
      buttons({ label: 'Vào quản lý chi nhánh', goto: 'account-home/ACC-01' }),
    ],
  },
  {
    ...inApp(actor),
    id: 'BR-06',
    title: 'Lỗi khi tạo chi nhánh',
    entryPoint:
      'Thiếu quyền, gói ngừng cung cấp, trùng hotline hoặc dữ liệu đã đổi',
    objective: 'Báo từng lỗi chính và hướng xử lý.',
    visibleData: [
      'Không phải Owner hoặc thiếu quyền tạo chi nhánh',
      'Gói hay thời hạn vừa ngừng cung cấp',
      'Hotline bị trùng',
      'Ảnh chưa sẵn sàng',
      'Dữ liệu tầng, phòng hoặc giá không hợp lệ',
      'Dữ liệu đã đổi trong lúc tạo: tải lại trước khi gửi',
    ],
    primaryAction: 'Quay lại → BR-01',
    nextScreen: 'BR-01',
    layout: [
      bar('Tạo chi nhánh'),
      {
        type: 'alert',
        variant: 'danger',
        title: 'Bạn không có quyền tạo chi nhánh.',
      },
      {
        type: 'alert',
        variant: 'warning',
        title: 'Gói vừa ngừng cung cấp',
        text: 'Tải lại danh sách gói và chọn lại.',
      },
      {
        type: 'alert',
        variant: 'warning',
        title: 'Dữ liệu đã thay đổi',
        text: 'Tải lại trước khi gửi.',
      },
      buttons({ label: 'Quay lại', goto: 'BR-01' }),
    ],
  },
];

export const karaokeBranchCreation: Flow = {
  id: 'karaoke-branch-creation',
  title: 'Tạo chi nhánh Karaoke',
  role: 'karaoke-owner',
  section: 'branch-plan',
  summary:
    'Owner tạo thêm một chi nhánh độc lập qua ba bước: thông tin và ảnh, gói riêng, tầng và phòng tuỳ chọn. Bấm Tạo chi nhánh là tạo thành công ngay; chi nhánh hoạt động và chờ hậu kiểm.',
  actors: ['Owner Karaoke'],
  environments: ['FLUTTER_APP'],
  screens,
  source: 'docs/wireframes/karaoke-owner/karaoke-branch-creation.md',
};
