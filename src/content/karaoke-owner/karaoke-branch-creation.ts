import type { Block, Flow, Screen } from '../../domain/types.ts';
import { bar, buttons, inApp } from '../helpers.ts';
import { planCards } from './plan-catalog.ts';

const actor = 'Owner Karaoke';

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
      'Không có quyền → BR-07',
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
    title: 'Thông tin chi nhánh',
    entryPoint: 'BR-01 → Tạo chi nhánh',
    objective: 'Nhập tên, địa chỉ, hotline tuỳ chọn và giờ mở cửa.',
    visibleData: [
      'Tên chi nhánh (bắt buộc)',
      'Địa chỉ (bắt buộc)',
      'Giờ mở cửa (bắt buộc; giờ đóng cửa là cùng giờ đó của ngày hôm sau)',
      'Hotline riêng (tuỳ chọn, duy nhất nếu nhập)',
    ],
    userInput: ['Tên', 'Địa chỉ', 'Hotline', 'Giờ mở cửa'],
    primaryAction: 'Tiếp tục → BR-03',
    secondaryActions: ['Huỷ → BR-01'],
    nextScreen: 'BR-03',
    errorsOrOutcomes: ['Trùng hotline hoặc dữ liệu sai: giữ biểu mẫu để sửa'],
    layout: [
      bar('Thông tin chi nhánh'),
      {
        type: 'stepper',
        steps: ['Thông tin', 'Gói', 'Ảnh và phòng', 'Xác nhận'],
        current: 0,
      },
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
      {
        type: 'stepper',
        steps: ['Thông tin', 'Gói', 'Ảnh và phòng', 'Xác nhận'],
        current: 1,
      },
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
    title: 'Hình ảnh, tầng và phòng',
    entryPoint: 'BR-03 → Chọn gói',
    objective:
      'Tải logo, ảnh bìa; tạo tầng và phòng ban đầu hoặc bỏ qua để cấu hình sau.',
    visibleData: [
      'Logo, ảnh bìa (trạng thái chưa chọn, đang xử lý, sẵn sàng)',
      'Số tầng (tuỳ chọn)',
      'Danh sách phòng ban đầu, ảnh và bảng giá từng phòng',
      'Không có loại phòng, trạng thái dọn phòng hay bảo trì',
    ],
    userInput: ['Logo', 'Ảnh bìa', 'Số tầng', 'Phòng'],
    primaryAction: 'Tiếp tục → BR-05',
    secondaryActions: ['Bỏ qua → BR-05'],
    nextScreen: 'BR-05',
    errorsOrOutcomes: ['Ảnh hoặc cấu trúc sai: chỉ rõ mục cần sửa'],
    layout: [
      bar('Hình ảnh, tầng và phòng'),
      {
        type: 'stepper',
        steps: ['Thông tin', 'Gói', 'Ảnh và phòng', 'Xác nhận'],
        current: 2,
      },
      {
        type: 'keyValue',
        rows: [
          { label: 'Logo', value: 'Đã chọn · Sẵn sàng' },
          { label: 'Ảnh bìa', value: 'Đang xử lý' },
        ],
      },
      { type: 'field', kind: 'input', label: 'Số tầng (tuỳ chọn)', value: '2' },
      {
        type: 'field',
        kind: 'input',
        label: 'Phòng ban đầu',
        value: '3 phòng',
        helper: 'Có thể tạo danh sách phòng thẳng nếu không dùng tầng.',
      },
      {
        type: 'alert',
        variant: 'warning',
        text: 'Ảnh bìa chưa xử lý xong. Chờ hoặc thay ảnh trước khi tiếp tục.',
      },
      buttons(
        { label: 'Tiếp tục', goto: 'BR-05' },
        { label: 'Bỏ qua', variant: 'secondary', goto: 'BR-05' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'BR-05',
    title: 'Xác nhận tạo chi nhánh',
    entryPoint: 'BR-04 → Tiếp tục hoặc Bỏ qua',
    objective:
      'Xem tóm tắt toàn bộ chi nhánh rồi gửi. Nút bị khoá khi gửi; gửi lại cùng thao tác trả về kết quả cũ thay vì tạo trùng.',
    visibleData: ['Chi nhánh, gói, hình ảnh, tầng, phòng'],
    primaryAction: 'Tạo chi nhánh → BR-06',
    secondaryActions: ['Chỉnh sửa → BR-02', 'Dữ liệu đã đổi → BR-07'],
    nextScreen: 'BR-06',
    errorsOrOutcomes: [
      'Không tạo chi nhánh dở; thất bại thì không hiện trạng thái thành công',
    ],
    layout: [
      bar('Xác nhận'),
      {
        type: 'stepper',
        steps: ['Thông tin', 'Gói', 'Ảnh và phòng', 'Xác nhận'],
        current: 3,
      },
      {
        type: 'keyValue',
        rows: [
          { label: 'Chi nhánh', value: 'Karaoke Blink Thủ Đức' },
          { label: 'Giờ mở cửa', value: '11:00' },
          { label: 'Gói', value: 'BASIC · Miễn phí · 5 nhân sự' },
          { label: 'Tầng và phòng', value: '2 tầng · 3 phòng' },
        ],
      },
      buttons(
        { label: 'Tạo chi nhánh', goto: 'BR-06' },
        { label: 'Chỉnh sửa', variant: 'secondary', goto: 'BR-02' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'BR-06',
    title: 'Chi nhánh đã được tạo',
    entryPoint: 'Tạo chi nhánh thành công',
    objective:
      'Báo chi nhánh đang hoạt động và chờ Blink hậu kiểm; gợi ý cấu hình phần đã bỏ qua. Không tự tạo Manager, nhân sự hay tài khoản Thu ngân.',
    visibleData: [
      'Trạng thái "Đang hoạt động — chờ Blink hậu kiểm"',
      'Chi nhánh xuất hiện ngang hàng trong danh sách cơ sở',
      'Gợi ý cấu hình phần đã bỏ qua',
    ],
    primaryAction: 'Vào quản lý chi nhánh',
    nextScreen: 'Trang quản lý chi nhánh',
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
      buttons({ label: 'Vào quản lý chi nhánh' }),
    ],
  },
  {
    ...inApp(actor),
    id: 'BR-07',
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
      'Dữ liệu đã đổi trong lúc xác nhận: tải lại trước khi gửi',
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
    'Owner tạo thêm một chi nhánh độc lập: thông tin, gói riêng, hình ảnh, tầng và phòng tuỳ chọn, xác nhận và chờ hậu kiểm.',
  actors: ['Owner Karaoke'],
  environments: ['FLUTTER_APP'],
  screens,
  source: 'docs/wireframes/karaoke-owner/karaoke-branch-creation.md',
};
