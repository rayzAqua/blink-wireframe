import type { Flow, Screen } from '../../domain/types.ts';
import { bar, buttons, inApp } from '../helpers.ts';

const actor = 'Owner, Manager hoặc Vice Manager có quyền xem báo cáo';

const screens: Screen[] = [
  {
    ...inApp(actor),
    id: 'RPT-01',
    title: 'Trang chủ cơ sở — Đang dùng và Đã dùng',
    entryPoint: 'Sau đăng nhập, chọn cơ sở được phép quản lý',
    objective:
      'Chỉ hiển thị hai thông tin thống kê: Đang dùng (đơn vị phòng) và Đã dùng (đơn vị lượt) của ngày vận hành hiện tại.',
    visibleData: [
      'Tên cơ sở đang xem, thời điểm cập nhật gần nhất',
      'Đang dùng (phòng) là hiện tại; Đã dùng (lượt) là lượt đã hoàn thành thuộc ngày bắt đầu hát',
      'Khoảng ngày vận hành bằng ngày và giờ cụ thể; không có bộ lọc ngày',
    ],
    primaryAction: 'Xem thống kê → RPT-02',
    secondaryActions: ['Làm mới', 'Lỗi và trạng thái → RPT-04'],
    nextScreen: 'RPT-02',
    errorsOrOutcomes: [
      'Chưa có lượt: hiển thị 0',
      'Lỗi: "Chưa tải được số liệu" và Thử lại, không thay bằng 0',
      'Đổi cơ sở: tải lại và bỏ kết quả trả chậm của cơ sở trước',
    ],
    layout: [
      bar('Karaoke Blink Sài Gòn', false, ['bell']),
      {
        type: 'text',
        text: 'Cập nhật lúc 14:05 · Ngày vận hành 04/11/2026 11:00 – 05/11/2026 11:00',
        muted: true,
      },
      {
        type: 'keyValue',
        rows: [
          { label: 'Đang dùng (phòng)', value: '1' },
          { label: 'Đã dùng (lượt)', value: '4' },
        ],
      },
      buttons(
        { label: 'Xem thống kê', goto: 'RPT-02' },
        { label: 'Làm mới', variant: 'secondary' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'RPT-02',
    title: 'Thống kê vận hành',
    entryPoint: 'RPT-01 → Xem thống kê',
    objective:
      'Xem số liệu theo kỳ: Hôm nay, 7 ngày, Tháng này hoặc tuỳ chọn; biểu đồ theo ngày, phân bố theo nguồn đơn và số đơn huỷ.',
    visibleData: [
      'Bộ chọn Hôm nay, 7 ngày, Tháng này, Tuỳ chọn; ngày bắt đầu và kết thúc; không chọn ngày tương lai',
      'Đang dùng nằm riêng, ghi rõ thời điểm hiện tại, không vẽ đường lịch sử',
      'Các số trong kỳ: tổng lượt mở đơn, đã dùng, đơn huỷ, thời lượng trung bình (Chưa có dữ liệu nếu chưa có lượt hoàn thành)',
      'Biểu đồ theo ngày (lượt mở, đã dùng, huỷ) kèm danh sách số liệu thay thế',
      'Phân bố lượt mở theo nguồn: Booking, Hotline, Khách trực tiếp',
    ],
    primaryAction: 'Chạm số đơn huỷ → RPT-03',
    secondaryActions: [
      'Quay lại → RPT-01',
      'Khoảng không hợp lệ hoặc lỗi → RPT-04',
    ],
    nextScreen: 'RPT-03',
    errorsOrOutcomes: [
      'Không có nút xem doanh thu, thanh toán, khách hàng hay xếp hạng trong phạm vi này',
    ],
    layout: [
      bar('Thống kê vận hành'),
      {
        type: 'tabs',
        items: ['Hôm nay', '7 ngày', 'Tháng này', 'Tuỳ chọn'],
        active: 1,
      },
      {
        type: 'text',
        text: '28/10/2026 – 03/11/2026 · theo ngày vận hành (mở cửa 11:00)',
        muted: true,
      },
      {
        type: 'keyValue',
        rows: [
          { label: 'Đang sử dụng lúc 14:05', value: '1 phòng' },
          { label: 'Tổng lượt mở', value: '5' },
          { label: 'Đã dùng', value: '4' },
          { label: 'Đơn huỷ', value: '2' },
          { label: 'Thời lượng trung bình', value: '1 giờ 40 phút' },
        ],
      },
      { type: 'heading', text: 'Theo ngày' },
      {
        type: 'table',
        columns: ['Ngày', 'Lượt mở', 'Đã dùng', 'Huỷ'],
        rows: [
          ['03/11', '5', '4', '1'],
          ['02/11', '3', '3', '0'],
          ['01/11', '4', '2', '1'],
        ],
      },
      { type: 'heading', text: 'Theo nguồn' },
      {
        type: 'keyValue',
        rows: [
          { label: 'Booking', value: '3' },
          { label: 'Hotline', value: '1' },
          { label: 'Khách trực tiếp', value: '1' },
        ],
      },
      buttons({
        label: 'Xem chi tiết đơn huỷ',
        variant: 'secondary',
        goto: 'RPT-03',
      }),
    ],
  },
  {
    ...inApp(actor),
    id: 'RPT-03',
    title: 'Chi tiết số đơn huỷ',
    entryPoint: 'Chạm số đơn huỷ ở RPT-02',
    objective:
      'Bảng thông tin ngay trên màn thống kê: tổng số và ba lý do huỷ; tính theo thời điểm hệ thống ghi nhận huỷ.',
    visibleData: [
      'Khoảng đang chọn và tổng số huỷ',
      'Huỷ chủ động hoặc lý do khác; Hết hạn xác nhận; Khách không đến trong thời hạn',
      'Tổng ba dòng bằng số đơn huỷ',
      'Chú thích tính theo thời điểm ghi nhận huỷ, không theo ngày tạo đơn',
    ],
    primaryAction: 'Đóng → RPT-02',
    nextScreen: 'RPT-02',
    errorsOrOutcomes: [
      'Không cần danh sách khách hay đơn, cũng không cần quyền Admin Audit',
    ],
    layout: [
      bar('Thống kê vận hành'),
      { type: 'keyValue', rows: [{ label: 'Đơn huỷ trong kỳ', value: '2' }] },
      {
        type: 'bottomSheet',
        title: 'Chi tiết đơn huỷ · 28/10 – 03/11',
        blocks: [
          {
            type: 'keyValue',
            rows: [
              { label: 'Huỷ chủ động hoặc lý do khác', value: '1' },
              { label: 'Hết hạn xác nhận', value: '1' },
              { label: 'Khách không đến trong thời hạn', value: '0' },
              { label: 'Tổng', value: '2' },
            ],
          },
          {
            type: 'text',
            text: 'Tính theo thời điểm hệ thống ghi nhận huỷ, không theo ngày tạo đơn.',
            muted: true,
          },
          {
            type: 'actions',
            buttons: [{ label: 'Đóng', variant: 'secondary', goto: 'RPT-02' }],
          },
        ],
      },
    ],
  },
  {
    ...inApp(actor),
    id: 'RPT-04',
    title: 'Trạng thái tải, rỗng, lỗi và thiếu quyền',
    entryPoint:
      'Tải số liệu, khoảng rỗng, khoảng không hợp lệ, lỗi hoặc thiếu quyền',
    objective:
      'Mô tả đúng từng trạng thái: khung chờ, số 0 khi khoảng rỗng, hướng dẫn chọn lại khoảng tối đa 90 ngày, thử lại khi lỗi, thiếu quyền.',
    visibleData: [
      'Đang tải: khung chờ',
      'Khoảng rỗng: các số bằng 0, biểu đồ không có lượt, không báo lỗi',
      'Khoảng quá dài hoặc đảo ngày: hướng dẫn chọn lại tối đa 90 ngày',
      'Lỗi tải: giữ bộ lọc, cho Thử lại; không trình bày số cũ như vừa cập nhật',
      '"Bạn không có quyền truy cập"; cho quay lại hoặc chọn cơ sở khác',
    ],
    primaryAction: 'Thử lại → RPT-02',
    nextScreen: 'RPT-02',
    errorsOrOutcomes: ['Lỗi báo cáo không chặn thao tác phòng'],
    layout: [
      bar('Thống kê vận hành'),
      { type: 'skeleton', lines: 3 },
      {
        type: 'alert',
        variant: 'warning',
        title: 'Khoảng ngày không hợp lệ',
        text: 'Chọn lại khoảng tối đa 90 ngày, ngày bắt đầu trước ngày kết thúc.',
      },
      {
        type: 'alert',
        variant: 'danger',
        title: 'Chưa tải được số liệu',
        text: 'Bộ lọc được giữ nguyên.',
        actionLabel: 'Thử lại',
        goto: 'RPT-02',
      },
      {
        type: 'alert',
        variant: 'danger',
        title: 'Bạn không có quyền truy cập.',
      },
    ],
  },
];

export const karaokeOperationsReporting: Flow = {
  id: 'karaoke-operations-reporting',
  title: 'Thống kê vận hành Karaoke',
  role: 'karaoke-owner',
  section: 'report',
  summary:
    'Trang chủ cơ sở với hai số Đang dùng và Đã dùng, trang thống kê theo kỳ và chi tiết số đơn huỷ; không gồm doanh thu, thanh toán, khách hàng hay xếp hạng.',
  actors: ['Owner', 'Manager', 'Vice Manager có quyền xem báo cáo'],
  environments: ['FLUTTER_APP'],
  screens,
  source: 'docs/wireframes/karaoke-owner/karaoke-operations-reporting.md',
};
