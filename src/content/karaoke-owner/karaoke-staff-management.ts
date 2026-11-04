import type { Flow, Screen } from '../../domain/types.ts';
import { bar, buttons, inApp } from '../helpers.ts';

const actor = 'Owner, Manager hoặc Vice Manager theo cấp bậc và quyền';

const profileTabs = (active: number) => ({
  type: 'tabs' as const,
  items: ['Hồ sơ công việc', 'Hồ sơ danh tính', 'Lịch sử làm việc'],
  active,
});

const screens: Screen[] = [
  {
    ...inApp(actor),
    id: 'STF-01',
    title: 'Danh sách nhân sự',
    entryPoint: 'Quản lý nhân sự',
    objective:
      'Xem ba thống kê tách riêng, tìm, lọc và mở nhân sự. Không hiển thị CCCD trong danh sách.',
    visibleData: [
      'Ba số liệu: Đang làm việc, Đang tạm dừng, Đã nghỉ việc (không gộp)',
      'Tìm theo biệt danh hoặc mã nhân sự; lọc theo vị trí và trạng thái; phân trang',
      'Mỗi mục: ảnh công việc, biệt danh, mã, vị trí, trạng thái, ngày bắt đầu',
    ],
    primaryAction: 'Chọn nhân sự → STF-02',
    secondaryActions: ['Sang lời mời nhân sự → karaoke-staff-onboarding'],
    nextScreen: 'STF-02',
    errorsOrOutcomes: ['Danh sách trống hoặc lỗi tải: hướng dẫn hoặc thử lại'],
    layout: [
      bar('Nhân sự', true, ['search']),
      {
        type: 'keyValue',
        rows: [
          { label: 'Đang làm việc', value: '6' },
          { label: 'Đang tạm dừng', value: '1' },
          { label: 'Đã nghỉ việc', value: '3' },
        ],
      },
      {
        type: 'field',
        kind: 'input',
        label: 'Tìm nhân sự',
        placeholder: 'Biệt danh hoặc mã nhân sự',
      },
      {
        type: 'tabs',
        items: ['Tất cả vị trí', 'Booking', 'Lễ tân'],
        active: 0,
      },
      {
        type: 'cardList',
        items: [
          {
            icon: 'user',
            title: 'An Booking · 01',
            subtitle: 'Booking · bắt đầu 12/09/2026',
            badge: 'Đang làm',
            tone: 'success',
            goto: 'STF-02',
          },
          {
            icon: 'user',
            title: 'Bình Lễ tân · 02',
            subtitle: 'Lễ tân · bắt đầu 01/10/2026',
            badge: 'Tạm dừng',
            tone: 'warning',
            goto: 'STF-02',
          },
        ],
      },
      buttons({
        label: 'Mời nhân sự',
        variant: 'secondary',
        goto: 'karaoke-staff-onboarding/ONB-02',
      }),
    ],
  },
  {
    ...inApp(actor),
    id: 'STF-02',
    title: 'Chi tiết nhân sự — Hồ sơ công việc',
    entryPoint: 'Chọn một nhân sự ở danh sách',
    objective:
      'Xem hồ sơ công việc và đi tới sửa hồ sơ, xem danh tính, đổi vị trí, đổi trạng thái. Thao tác ngoài cấp bậc bị ẩn.',
    visibleData: [
      'Ảnh đại diện, biệt danh, mã, vị trí, cơ sở',
      'Ba tab: Hồ sơ công việc, Hồ sơ danh tính, Lịch sử làm việc',
    ],
    primaryAction: 'Sửa hồ sơ → STF-03',
    secondaryActions: [
      'Xem danh tính → STF-04',
      'Đổi vị trí → STF-05',
      'Đổi trạng thái → STF-06',
      'Lịch sử → STF-07',
    ],
    nextScreen: 'STF-03',
    errorsOrOutcomes: ['Thiếu quyền: thông báo chung'],
    layout: [
      bar('An Booking'),
      profileTabs(0),
      {
        type: 'hero',
        title: 'An Booking',
        logo: true,
        lines: ['Mã 01 · Booking', 'Karaoke Blink Sài Gòn'],
        status: 'Đang làm',
      },
      {
        type: 'listGroup',
        rows: [
          { icon: 'pencil', title: 'Sửa hồ sơ công việc', goto: 'STF-03' },
          {
            icon: 'shield-check',
            title: 'Xem hồ sơ danh tính',
            goto: 'STF-04',
          },
          { icon: 'user-cog', title: 'Đổi vị trí', goto: 'STF-05' },
          { icon: 'user-x', title: 'Tạm dừng hoặc kết thúc', goto: 'STF-06' },
          { icon: 'history', title: 'Lịch sử làm việc', goto: 'STF-07' },
        ],
      },
    ],
  },
  {
    ...inApp(actor),
    id: 'STF-03',
    title: 'Sửa hồ sơ công việc',
    entryPoint: 'Chi tiết nhân sự → Sửa hồ sơ',
    objective:
      'Sửa biệt danh và ảnh đại diện công việc. Ảnh mới phải xử lý xong trước khi lưu; quan hệ đã kết thúc chỉ xem.',
    visibleData: [
      'Biệt danh (bắt buộc)',
      'Ảnh đại diện công việc (bắt buộc)',
      'Ảnh chân dung danh tính không dùng thay ảnh này',
    ],
    userInput: ['Biệt danh', 'Ảnh đại diện'],
    primaryAction: 'Lưu → STF-02',
    secondaryActions: ['Huỷ → STF-02'],
    nextScreen: 'STF-02',
    errorsOrOutcomes: [
      'Ảnh chưa sẵn sàng: chờ hoặc thay ảnh',
      'Dữ liệu vừa đổi: "Thông tin nhân sự đã thay đổi, vui lòng tải lại", không ghi đè',
    ],
    layout: [
      bar('Sửa hồ sơ công việc'),
      { type: 'field', kind: 'input', label: 'Biệt danh', value: 'An Booking' },
      {
        type: 'field',
        kind: 'input',
        label: 'Ảnh đại diện công việc',
        value: 'Đang xử lý ảnh mới',
      },
      {
        type: 'alert',
        variant: 'warning',
        text: 'Ảnh mới chưa sẵn sàng. Chờ xử lý xong trước khi lưu.',
      },
      buttons(
        { label: 'Lưu', goto: 'STF-02' },
        { label: 'Huỷ', variant: 'secondary', goto: 'STF-02' },
      ),
    ],
  },
  {
    ...inApp('Người có quyền xem danh tính nhạy cảm'),
    id: 'STF-04',
    title: 'Xem hồ sơ danh tính',
    entryPoint: 'Chi tiết nhân sự → Hồ sơ danh tính',
    objective:
      'Xem dữ liệu danh tính được phép. Mỗi lần xem được ghi nhật ký; sau khi nghỉ chỉ hiện dữ liệu đã che, Owner mở lại phải nhập lý do. Không được sửa.',
    visibleData: [
      'Dữ liệu danh tính được phép xem',
      'Ảnh dùng liên kết có thời hạn ngắn',
      'Ô lý do khi mở dữ liệu của nhân sự đã nghỉ',
    ],
    userInput: ['Lý do (khi cần)'],
    primaryAction: 'Mở dữ liệu → STF-04',
    secondaryActions: ['Đóng → STF-02'],
    nextScreen: 'STF-02',
    errorsOrOutcomes: [
      'Liên kết hết hạn hoặc thiếu quyền: che dữ liệu, không tự tải lại',
    ],
    layout: [
      bar('Hồ sơ danh tính'),
      profileTabs(1),
      {
        type: 'alert',
        variant: 'info',
        text: 'Mỗi lần xem hồ sơ danh tính đều được ghi nhật ký.',
      },
      {
        type: 'keyValue',
        rows: [
          { label: 'Họ tên', value: 'Nguyễn Văn A' },
          { label: 'Số định danh', value: '•••• •••• 1234' },
          { label: 'Ảnh chân dung', value: 'Đã che' },
        ],
      },
      {
        type: 'field',
        kind: 'textarea',
        label: 'Lý do mở dữ liệu',
        placeholder: 'Bắt buộc với nhân sự đã nghỉ',
      },
      buttons(
        { label: 'Mở dữ liệu', goto: 'STF-04' },
        { label: 'Đóng', variant: 'secondary', goto: 'STF-02' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'STF-05',
    title: 'Đổi vị trí công việc',
    entryPoint: 'Chi tiết nhân sự → Đổi vị trí',
    objective:
      'Chọn vị trí mới trong các vai trò hợp lệ theo cấp bậc. Không tự sửa mình, sửa Owner, người ngang hoặc cao hơn; không chọn Manager, Owner, Cashier hay vai trò nền Blink.',
    visibleData: [
      'Các vị trí hợp lệ theo cấp bậc',
      'Mỗi cơ sở chỉ có một Vice Manager hiện hành',
    ],
    userInput: ['Vị trí mới'],
    primaryAction: 'Xác nhận → STF-02',
    secondaryActions: ['Huỷ → STF-02'],
    nextScreen: 'STF-02',
    errorsOrOutcomes: ['Vị trí không còn trống hoặc dữ liệu đổi: tải lại'],
    layout: [
      bar('Đổi vị trí'),
      {
        type: 'field',
        kind: 'radio',
        label: 'Vị trí mới',
        value: 'Lễ tân',
        options: ['Booking', 'Lễ tân', 'Phục vụ'],
        helper: 'Bổ nhiệm Manager dùng luồng riêng.',
      },
      {
        type: 'alert',
        variant: 'warning',
        text: 'Vị trí Vice Manager đã có người, không chọn được.',
      },
      buttons(
        { label: 'Xác nhận', goto: 'STF-02' },
        { label: 'Huỷ', variant: 'secondary', goto: 'STF-02' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'STF-06',
    title: 'Tạm dừng, kích hoạt lại hoặc kết thúc',
    entryPoint: 'Chi tiết nhân sự → Đổi trạng thái',
    objective:
      'Xác nhận đổi trạng thái và nhập lý do bắt buộc. Tạm dừng giữ chỗ trong gói; kết thúc trả chỗ và không xoá hồ sơ.',
    visibleData: [
      'Tạm dừng: mất quyền thao tác, vẫn giữ chỗ trong gói, có thể kích hoạt lại',
      'Kích hoạt lại: hiện lý do tạm dừng trước đó, cần lý do kích hoạt lại',
      'Kết thúc: mất quyền, trả chỗ trong gói, giữ hồ sơ, lịch sử, đơn cũ; muốn quay lại phải nhận lời mời mới',
    ],
    userInput: ['Lý do (bắt buộc)'],
    primaryAction: 'Xác nhận → STF-02',
    secondaryActions: ['Huỷ → STF-02'],
    nextScreen: 'STF-02',
    errorsOrOutcomes: ['Trạng thái vừa đổi: không ghi đè, tải lại'],
    layout: [
      bar('An Booking'),
      {
        type: 'hero',
        title: 'An Booking',
        lines: ['Booking · Mã 01'],
        status: 'Đang làm',
      },
      {
        type: 'modal',
        title: 'Tạm dừng nhân sự?',
        blocks: [
          {
            type: 'text',
            text: 'Nhân sự mất toàn bộ quyền thao tác tại cơ sở nhưng vẫn giữ chỗ trong gói và có thể được kích hoạt lại.',
            muted: true,
          },
          {
            type: 'field',
            kind: 'textarea',
            label: 'Lý do (bắt buộc)',
            placeholder: 'Nhập lý do',
          },
        ],
        buttons: [
          { label: 'Tạm dừng', variant: 'danger', goto: 'STF-02' },
          { label: 'Huỷ', variant: 'secondary', goto: 'STF-02' },
        ],
      },
    ],
  },
  {
    ...inApp(actor),
    id: 'STF-07',
    title: 'Lịch sử làm việc',
    entryPoint: 'Chi tiết nhân sự → tab Lịch sử làm việc',
    objective:
      'Xem thay đổi vị trí, hồ sơ và trạng thái kèm người thực hiện, lý do, thời điểm. Đây là lịch sử nghiệp vụ, không phải Admin Audit.',
    visibleData: [
      'Thay đổi vị trí, hồ sơ, trạng thái',
      'Người thực hiện, lý do, thời điểm',
    ],
    primaryAction: 'Quay lại → STF-02',
    nextScreen: 'STF-02',
    layout: [
      bar('Lịch sử làm việc'),
      profileTabs(2),
      {
        type: 'cardList',
        items: [
          {
            icon: 'history',
            title: 'Tạm dừng',
            subtitle: 'Bởi Nguyễn Văn Owner · 03/11/2026 · "Nghỉ phép dài"',
          },
          {
            icon: 'history',
            title: 'Đổi vị trí Lễ tân → Booking',
            subtitle: 'Bởi Trần Quản Lý · 20/10/2026',
          },
          {
            icon: 'history',
            title: 'Bắt đầu làm việc',
            subtitle: '12/09/2026',
          },
        ],
      },
    ],
  },
  {
    ...inApp(actor),
    id: 'STF-08',
    title: 'Không có quyền hoặc dữ liệu đã đổi',
    entryPoint: 'Thao tác ngoài cấp bậc hoặc dữ liệu vừa đổi ở thiết bị khác',
    objective:
      'Thông báo chung khi thiếu quyền; yêu cầu tải lại khi dữ liệu nhân sự vừa thay đổi.',
    visibleData: [
      '"Bạn không có quyền truy cập"',
      '"Thông tin nhân sự đã thay đổi, vui lòng tải lại"',
    ],
    primaryAction: 'Tải lại → STF-01',
    nextScreen: 'STF-01',
    layout: [
      bar('Nhân sự'),
      {
        type: 'alert',
        variant: 'danger',
        title: 'Bạn không có quyền truy cập.',
      },
      {
        type: 'alert',
        variant: 'warning',
        title: 'Thông tin nhân sự đã thay đổi, vui lòng tải lại.',
        actionLabel: 'Tải lại',
        goto: 'STF-01',
      },
    ],
  },
];

export const karaokeStaffManagement: Flow = {
  id: 'karaoke-staff-management',
  title: 'Quản trị nhân sự Karaoke',
  role: 'karaoke-owner',
  section: 'staff',
  summary:
    'Danh sách, hồ sơ, xem danh tính, đổi vị trí, tạm dừng, kích hoạt lại và kết thúc quan hệ làm việc của nhân sự đã vào làm.',
  actors: ['Owner, Manager hoặc Vice Manager theo cấp bậc'],
  environments: ['FLUTTER_APP'],
  screens,
  source: 'docs/wireframes/karaoke-owner/karaoke-staff-management.md',
};
