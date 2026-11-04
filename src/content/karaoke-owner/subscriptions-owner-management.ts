import type { Block, Flow, Screen } from '../../domain/types.ts';
import { bar, buttons, inApp } from '../helpers.ts';
import { planCards } from './plan-catalog.ts';

const actor = 'Owner Karaoke';
const admin = { environment: 'ADMIN_UI' as const, actor: 'Blink Admin' };

const planCard = (status: string): Block => ({
  type: 'hero',
  title: 'Gói Pro',
  planTag: status,
  lines: [
    'Đăng ký đến 30/09/2027 · Đã thanh toán đến kỳ tháng 3/12',
    '8/10 nhân sự · Có Max360',
  ],
  goto: 'SUB-01',
});

const screens: Screen[] = [
  {
    ...inApp(actor),
    id: 'SUB-01',
    title: 'Gói sử dụng',
    entryPoint: 'Tài khoản → Gói nhân sự (cơ sở đang chọn)',
    objective:
      'Xem gói hiện tại của cơ sở và đi tới nâng cấp, gia hạn, huỷ cuối kỳ hoặc lịch sử. Nhãn gói chỉ là quyền lợi dịch vụ, không phải dấu xác minh danh tính.',
    visibleData: [
      'Tên gói, trạng thái (Đang sử dụng, Đang ân hạn, Sẽ kết thúc vào ngày...)',
      'Thời hạn đăng ký, Đã thanh toán đến, số nhân sự được dùng, quyền lợi Max360',
      'BASIC ghi rõ không có ngày hết hạn',
      'Gói trả góp năm phân biệt thời hạn đăng ký và kỳ tháng đã thanh toán',
      'Thẻ Chờ xử lý nếu có yêu cầu (không đổi nhãn hay quyền lợi hiện tại)',
    ],
    primaryAction: 'Nâng cấp gói → SUB-02',
    secondaryActions: [
      'Gia hạn → SUB-03',
      'Huỷ gói → SUB-06',
      'Xem lịch sử → SUB-08',
      'Xem yêu cầu → SUB-05',
    ],
    nextScreen: 'SUB-02',
    errorsOrOutcomes: [
      'BASIC: Đăng ký gói hoặc Nâng cấp, không gọi là gia hạn; không cho huỷ BASIC; không có lựa chọn hạ gói',
    ],
    layout: [
      bar('Gói sử dụng'),
      planCard('Đang sử dụng'),
      {
        type: 'cardList',
        items: [
          {
            icon: 'clock',
            title: 'Yêu cầu nâng cấp lên Pro Max',
            subtitle: 'Gửi 02/11/2026 · chu kỳ năm',
            badge: 'Chờ xử lý',
            tone: 'warning',
            goto: 'SUB-05',
          },
        ],
      },
      buttons(
        { label: 'Nâng cấp gói', goto: 'SUB-02' },
        { label: 'Gia hạn', variant: 'secondary', goto: 'SUB-03' },
        { label: 'Huỷ gói', variant: 'danger', goto: 'SUB-06' },
        { label: 'Xem lịch sử', variant: 'ghost', goto: 'SUB-08' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'SUB-02',
    title: 'Nâng cấp hoặc đăng ký gói',
    entryPoint: 'SUB-01 → Nâng cấp',
    objective:
      'Chọn gói được nâng cấp, chu kỳ tháng hoặc năm và cách trả. Giá chỉ để biết, không có nút thanh toán trực tuyến.',
    visibleData: [
      'Chỉ các gói được nâng cấp: tên, nhân sự, quyền lợi Max360',
      'Giá theo tháng và giá khi mua theo năm (nửa giá mỗi tháng)',
      'Mua năm: trả cả năm một lần hoặc trả theo tháng 12 kỳ, kèm số tiền mỗi kỳ',
      'Gói hữu hạn: "Gói mới áp dụng từ kỳ tiếp theo sau khi Admin xác nhận đã thu tiền"; BASIC: "Gói được kích hoạt khi Admin xác nhận đã thu tiền"',
    ],
    userInput: ['Gói', 'Chu kỳ', 'Cách trả'],
    primaryAction: 'Tiếp tục → SUB-04',
    secondaryActions: ['Quay lại → SUB-01', 'Đang dùng gói cao nhất → SUB-09'],
    nextScreen: 'SUB-04',
    layout: [
      bar('Nâng cấp gói'),
      {
        type: 'alert',
        variant: 'info',
        text: 'Gói mới áp dụng từ kỳ tiếp theo sau khi Admin xác nhận đã thu tiền. Ứng dụng không thanh toán trực tuyến.',
      },
      planCards('SUB-04'),
      {
        type: 'field',
        kind: 'radio',
        label: 'Chu kỳ',
        value: 'Theo năm',
        options: ['Theo tháng', 'Theo năm'],
      },
      {
        type: 'field',
        kind: 'radio',
        label: 'Cách trả khi mua theo năm',
        value: 'Trả theo tháng (12 kỳ × 5.000.000đ)',
        options: [
          'Trả cả năm một lần (60.000.000đ)',
          'Trả theo tháng (12 kỳ × 5.000.000đ)',
        ],
      },
      buttons(
        { label: 'Tiếp tục', goto: 'SUB-04' },
        { label: 'Quay lại', variant: 'secondary', goto: 'SUB-01' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'SUB-03',
    title: 'Gia hạn gói',
    entryPoint: 'SUB-01 → Gia hạn',
    objective:
      'Gia hạn cùng gói đang dùng. Trả theo tháng trong gói năm thì ghi rõ xác nhận kỳ tháng tiếp theo, không phải đăng ký lại một năm mới.',
    visibleData: [
      'Cùng gói đang dùng và kỳ sắp tới',
      'Kỳ góp đã xác lập: số tiền kỳ đó',
      'Phí vượt nhân sự đã đến hạn tách thành dòng riêng',
      'Đã về BASIC: chuyển sang chọn đăng ký mới',
    ],
    primaryAction: 'Tiếp tục → SUB-04',
    secondaryActions: ['Gói không còn khả dụng → báo và quay lại chọn gói'],
    nextScreen: 'SUB-04',
    layout: [
      bar('Gia hạn gói Pro'),
      {
        type: 'keyValue',
        rows: [
          { label: 'Gói', value: 'Pro' },
          { label: 'Kỳ sắp tới', value: 'Kỳ tháng 4/12' },
          { label: 'Số tiền kỳ', value: '2.500.000đ' },
          { label: 'Phí vượt nhân sự đến hạn', value: '0đ' },
        ],
      },
      {
        type: 'alert',
        variant: 'info',
        text: 'Bạn đang xác nhận kỳ tháng tiếp theo, không phải đăng ký lại một năm mới.',
      },
      buttons(
        { label: 'Tiếp tục', goto: 'SUB-04' },
        { label: 'Quay lại', variant: 'secondary', goto: 'SUB-01' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'SUB-04',
    title: 'Xem lại và gửi yêu cầu',
    entryPoint: 'SUB-02 hoặc SUB-03 → Tiếp tục',
    objective:
      'Xem lại yêu cầu và gửi. Thành công chuyển sang Chờ xử lý, không hiện thanh toán thành công hay cấp nhãn gói mới.',
    visibleData: [
      'Tên cơ sở, loại yêu cầu, gói, chu kỳ, cách trả, mốc áp dụng dự kiến',
      '"Admin sẽ xử lý sau khi thu tiền"',
      'Đã có yêu cầu: mở yêu cầu hiện tại để sửa',
      'Đang có lịch huỷ: gửi yêu cầu tiếp tục sử dụng sẽ bỏ lịch huỷ, Owner xác nhận trước',
    ],
    primaryAction: 'Gửi yêu cầu → SUB-05',
    secondaryActions: ['Quay lại → SUB-02'],
    nextScreen: 'SUB-05',
    layout: [
      bar('Xem lại yêu cầu'),
      {
        type: 'keyValue',
        rows: [
          { label: 'Cơ sở', value: 'Karaoke Blink Sài Gòn' },
          { label: 'Loại yêu cầu', value: 'Nâng cấp' },
          { label: 'Gói', value: 'Pro Max' },
          {
            label: 'Chu kỳ',
            value: 'Năm · trả theo tháng (12 kỳ × 5.000.000đ)',
          },
          {
            label: 'Áp dụng dự kiến',
            value: 'Từ kỳ tiếp theo, sau khi Admin xác nhận thu tiền',
          },
        ],
      },
      {
        type: 'alert',
        variant: 'info',
        text: 'Admin sẽ xử lý sau khi thu tiền.',
      },
      buttons(
        { label: 'Gửi yêu cầu', goto: 'SUB-05' },
        { label: 'Quay lại', variant: 'secondary', goto: 'SUB-02' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'SUB-05',
    title: 'Chi tiết yêu cầu',
    entryPoint: 'Thẻ yêu cầu ở Gói sử dụng hoặc lịch sử',
    objective:
      'Xem, sửa, rút yêu cầu đang chờ; xem lý do bị từ chối hoặc kết quả đã duyệt.',
    visibleData: [
      'Chờ xử lý: gói, chu kỳ, ngày gửi, kỳ áp dụng, Sửa yêu cầu, Rút yêu cầu (có xác nhận, kết quả Đã rút)',
      'Bị từ chối: lý do, ngày xử lý, Tạo yêu cầu mới',
      'Đã được duyệt: ngày áp dụng, gói và chu kỳ thực tế, Admin đã xác nhận thu; không sửa lại',
    ],
    primaryAction: 'Sửa yêu cầu → SUB-04',
    secondaryActions: ['Rút yêu cầu → SUB-01', 'Tạo yêu cầu mới → SUB-02'],
    nextScreen: 'SUB-04',
    errorsOrOutcomes: [
      'Admin đã xử lý trong lúc sửa hoặc rút: báo "Dữ liệu đã thay đổi" và hiện kết quả mới nhất',
    ],
    layout: [
      bar('Yêu cầu nâng cấp'),
      {
        type: 'tabs',
        items: ['Chờ xử lý', 'Bị từ chối', 'Đã duyệt'],
        active: 0,
      },
      {
        type: 'keyValue',
        rows: [
          { label: 'Gói', value: 'Pro Max' },
          { label: 'Chu kỳ', value: 'Năm · trả theo tháng' },
          { label: 'Ngày gửi', value: '02/11/2026' },
          { label: 'Kỳ áp dụng', value: 'Kỳ tiếp theo' },
        ],
      },
      {
        type: 'alert',
        variant: 'warning',
        title: 'Dữ liệu đã thay đổi',
        text: 'Admin vừa xử lý yêu cầu này. Xem kết quả mới nhất.',
      },
      buttons(
        { label: 'Sửa yêu cầu', goto: 'SUB-04' },
        { label: 'Rút yêu cầu', variant: 'danger', goto: 'SUB-01' },
      ),
    ],
  },
  {
    ...inApp(actor),
    id: 'SUB-06',
    title: 'Huỷ gói cuối kỳ',
    entryPoint: 'SUB-01 → Huỷ gói',
    objective:
      'Đặt huỷ cuối kỳ đã thanh toán. Owner vẫn dùng gói đến hết kỳ rồi cơ sở về BASIC.',
    visibleData: [
      '"Bạn vẫn được sử dụng gói đến ...; sau thời điểm này cơ sở chuyển về BASIC."',
      'Hạn mức BASIC, Max360 không còn, nhân sự vượt hạn mức có thể bị khoá',
      'Có yêu cầu chờ: thao tác cũng rút yêu cầu đó',
    ],
    primaryAction: 'Xác nhận huỷ → SUB-01',
    secondaryActions: ['Quay lại → SUB-01'],
    nextScreen: 'SUB-01',
    errorsOrOutcomes: [
      'Không ghi là xoá nhân sự hay xoá cơ sở; không có bước chờ Admin duyệt huỷ',
    ],
    layout: [
      bar('Gói sử dụng'),
      planCard('Đang sử dụng'),
      {
        type: 'modal',
        title: 'Huỷ gói Pro cuối kỳ?',
        blocks: [
          {
            type: 'text',
            text: 'Bạn vẫn được sử dụng gói đến 30/09/2027; sau thời điểm này cơ sở chuyển về BASIC (5 nhân sự, không Max360). Nhân sự vượt hạn mức có thể bị khoá.',
          },
          {
            type: 'alert',
            variant: 'warning',
            text: 'Yêu cầu nâng cấp đang chờ cũng sẽ bị rút.',
          },
        ],
        buttons: [
          { label: 'Xác nhận huỷ', variant: 'danger', goto: 'SUB-01' },
          { label: 'Quay lại', variant: 'secondary', goto: 'SUB-01' },
        ],
      },
    ],
  },
  {
    ...inApp(actor),
    id: 'SUB-07',
    title: 'Ân hạn và hết hạn',
    entryPoint: 'Gói quá hạn thu hoặc đã về BASIC',
    objective:
      'Cho Owner biết đang trong thời gian ân hạn hoặc cơ sở đã về BASIC, và yêu cầu chưa xử lý vẫn xem được.',
    visibleData: [
      'Đang ân hạn: ngày hết hạn cũ, ngày kết thúc ân hạn, trạng thái yêu cầu, hướng dẫn chờ hoặc liên hệ Admin',
      'Đã về BASIC: nhãn đổi thành BASIC; yêu cầu được duyệt sau đó bắt đầu từ lúc duyệt',
      'Chủ động huỷ: về BASIC đúng mốc, không hiện ân hạn',
    ],
    primaryAction: 'Xem yêu cầu → SUB-05',
    nextScreen: 'SUB-05',
    layout: [
      bar('Gói sử dụng'),
      {
        type: 'alert',
        variant: 'warning',
        title: 'Gói Pro đang trong thời gian ân hạn',
        text: 'Hết hạn 30/09/2027. Ân hạn kết thúc 07/10/2027. Liên hệ Admin hoặc chờ xử lý yêu cầu.',
        actionLabel: 'Xem yêu cầu',
        goto: 'SUB-05',
      },
      {
        type: 'alert',
        variant: 'neutral',
        title: 'Cơ sở đã về gói BASIC',
        text: 'Yêu cầu chưa xử lý vẫn xem được; nếu được duyệt, gói mới bắt đầu từ lúc duyệt.',
      },
    ],
  },
  {
    ...inApp(actor),
    id: 'SUB-08',
    title: 'Lịch sử gói và yêu cầu',
    entryPoint: 'SUB-01 → Xem lịch sử',
    objective:
      'Xem lịch sử gói và yêu cầu của đúng cơ sở: gói, chu kỳ, thời hạn, kết quả, lý do từ chối. Không có Audit toàn nền tảng.',
    visibleData: ['Gói, chu kỳ, thời hạn, kết quả', 'Lý do từ chối'],
    primaryAction: 'Quay lại → SUB-01',
    nextScreen: 'SUB-01',
    layout: [
      bar('Lịch sử gói'),
      {
        type: 'cardList',
        items: [
          {
            icon: 'history',
            title: 'Nâng cấp lên Pro Max',
            subtitle: 'Gửi 02/11/2026',
            badge: 'Chờ xử lý',
            tone: 'warning',
            goto: 'SUB-05',
          },
          {
            icon: 'history',
            title: 'Đăng ký gói Pro (năm)',
            subtitle: '01/10/2026',
            badge: 'Đã duyệt',
            tone: 'success',
          },
          {
            icon: 'history',
            title: 'Yêu cầu gia hạn',
            subtitle: '15/08/2026 · "Chưa nhận được tiền"',
            badge: 'Bị từ chối',
            tone: 'danger',
          },
        ],
      },
    ],
  },
  {
    ...inApp(actor),
    id: 'SUB-09',
    title: 'Đang dùng gói cao nhất',
    entryPoint: 'Nâng cấp khi không còn gói cao hơn',
    objective: 'Báo rõ không còn gói cao hơn thay vì danh sách trắng.',
    visibleData: ['"Bạn đang sử dụng gói cao nhất"'],
    primaryAction: 'Quay lại → SUB-01',
    nextScreen: 'SUB-01',
    layout: [
      bar('Nâng cấp gói'),
      {
        type: 'empty',
        icon: 'star',
        title: 'Bạn đang sử dụng gói cao nhất',
        text: 'Không còn gói cao hơn để nâng cấp.',
        actionLabel: 'Quay lại',
        goto: 'SUB-01',
      },
    ],
  },
  {
    ...admin,
    id: 'ADM-01',
    title: 'Danh sách yêu cầu gói từ cơ sở',
    entryPoint: 'Quản lý gói → Yêu cầu từ cơ sở',
    objective:
      'Admin xem các yêu cầu gói: cơ sở, chủ gửi, loại, gói và chu kỳ, thời điểm gửi, ngày đến kỳ, trạng thái; lọc và phân trang.',
    visibleData: [
      'Cơ sở, chủ gửi, loại yêu cầu, gói và chu kỳ, thời điểm gửi, ngày đến kỳ, trạng thái',
      'Lọc theo trạng thái, cơ sở, loại',
    ],
    primaryAction: 'Xem chi tiết → ADM-02',
    nextScreen: 'ADM-02',
  },
  {
    ...admin,
    id: 'ADM-02',
    title: 'Chi tiết và duyệt yêu cầu',
    entryPoint: 'ADM-01 hoặc cơ sở → yêu cầu gói',
    objective:
      'So sánh gói hiện tại với gói yêu cầu; sau khi đã thu tiền bên ngoài, Admin duyệt và kích hoạt. Admin không nhập gói khác thay yêu cầu.',
    visibleData: [
      'Gói hiện tại và gói yêu cầu, chu kỳ, kỳ đã trả, mốc áp dụng',
      'Số tiền kỳ cần thu và phí vượt nhân sự đến hạn tách dòng, có tổng',
      'Chưa đến kỳ: khoá nút duyệt kèm giải thích',
      'Ô "Tôi xác nhận đã thu các khoản hiển thị" rồi Duyệt và kích hoạt',
    ],
    primaryAction: 'Duyệt và kích hoạt → ADM-01',
    secondaryActions: ['Từ chối → ADM-03'],
    nextScreen: 'ADM-01',
    errorsOrOutcomes: [
      'Mất kết nối sau khi bấm: tải lại kết quả trước khi gửi lại',
      'Yêu cầu đã đổi: báo "Yêu cầu đã thay đổi", tải lại',
    ],
  },
  {
    ...admin,
    id: 'ADM-03',
    title: 'Từ chối yêu cầu gói',
    entryPoint: 'ADM-02 → Từ chối',
    objective:
      'Từ chối bằng lý do bắt buộc; gói hiện tại giữ theo vòng đời của nó. Gói ngừng bán không được thay âm thầm bằng gói khác.',
    visibleData: ['Ô lý do bắt buộc', 'Kết quả Đã từ chối'],
    userInput: ['Lý do'],
    primaryAction: 'Gửi từ chối → ADM-01',
    nextScreen: 'ADM-01',
  },
];

export const subscriptionsOwnerManagement: Flow = {
  id: 'subscriptions-owner-management',
  title: 'Quản lý gói của cơ sở',
  role: 'karaoke-owner',
  section: 'branch-plan',
  summary:
    'Owner xem gói, gửi yêu cầu nâng cấp hoặc gia hạn, rút yêu cầu và đặt huỷ cuối kỳ; Blink Admin xử lý yêu cầu sau khi thu tiền bên ngoài. Không có thanh toán trong ứng dụng.',
  actors: ['Owner Karaoke', 'Blink Admin'],
  environments: ['FLUTTER_APP', 'ADMIN_UI'],
  screens,
  source: 'docs/wireframes/karaoke-owner/subscriptions-owner-management.md',
};
