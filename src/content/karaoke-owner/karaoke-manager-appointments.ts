import type { Block, Flow, Screen } from '../../domain/types.ts';
import { bar, buttons, inApp } from '../helpers.ts';

const owner = 'Owner';
const receiver = 'Người nhận lời mời';
const branchCard: Block = {
  type: 'hero',
  title: 'Karaoke Blink Sài Gòn',
  logo: true,
  lines: ['123 Nguyễn Thị Minh Khai, Quận 1'],
};

const screens: Screen[] = [
  {
    ...inApp(owner),
    id: 'OWN-01',
    title: 'Trạng thái quản lý chi nhánh',
    entryPoint: 'Quản lý chi nhánh → Quản lý nhân sự → Quản lý chi nhánh',
    objective:
      'Cho Owner biết chi nhánh chưa có Manager, đang mời người mới hay đã có Manager.',
    visibleData: [
      'Tên và địa chỉ chi nhánh',
      'Trạng thái vị trí Manager',
      'Manager hiện tại hoặc lời mời đang xử lý',
      'Thời hạn lời mời nếu có',
    ],
    primaryAction: 'Bổ nhiệm quản lý → OWN-02',
    secondaryActions: ['Xem lời mời → OWN-04', 'Xem quản lý hiện tại → OWN-06'],
    nextScreen: 'OWN-02',
    layout: [
      bar('Quản lý chi nhánh'),
      branchCard,
      {
        type: 'keyValue',
        rows: [{ label: 'Vị trí Manager', value: 'Đang trống' }],
      },
      buttons(
        { label: 'Bổ nhiệm quản lý', goto: 'OWN-02' },
        { label: 'Xem lời mời', variant: 'secondary', goto: 'OWN-04' },
        { label: 'Xem quản lý hiện tại', variant: 'secondary', goto: 'OWN-06' },
      ),
    ],
  },
  {
    ...inApp(owner),
    id: 'OWN-02',
    title: 'Nhập người cần bổ nhiệm',
    entryPoint: 'OWN-01 khi vị trí Manager đang trống',
    objective:
      'Nhập số điện thoại người được mời. Lời mời có hiệu lực 3 ngày và người nhận phải xác minh đúng số.',
    visibleData: [
      'Chi nhánh được chọn',
      'Ô số điện thoại',
      'Chú thích hiệu lực 3 ngày và phải xác minh đúng số',
    ],
    userInput: ['Số điện thoại'],
    primaryAction: 'Tiếp tục → OWN-03',
    secondaryActions: ['Huỷ → OWN-01'],
    nextScreen: 'OWN-03',
    errorsOrOutcomes: [
      'Số không hợp lệ, chi nhánh đã có Manager hoặc lời mời khác, người được mời là Owner hoặc nhân sự đang tạm dừng: báo lỗi',
    ],
    layout: [
      bar('Bổ nhiệm quản lý'),
      branchCard,
      {
        type: 'field',
        kind: 'input',
        label: 'Số điện thoại người được mời',
        placeholder: '0912 345 678',
        helper:
          'Lời mời có hiệu lực 3 ngày. Người nhận phải xác minh đúng số điện thoại này.',
      },
      buttons(
        { label: 'Tiếp tục', goto: 'OWN-03' },
        { label: 'Huỷ', variant: 'secondary', goto: 'OWN-01' },
      ),
    ],
  },
  {
    ...inApp(owner),
    id: 'OWN-03',
    title: 'Xác nhận tạo lời mời',
    entryPoint: 'OWN-02 → Tiếp tục',
    objective:
      'Xem lại thông tin và các cảnh báo theo người nhận trước khi tạo lời mời.',
    visibleData: [
      'Tên, địa chỉ chi nhánh',
      'Số điện thoại đã che bớt',
      'Thời hạn 3 ngày',
      'Ảnh hưởng tới gói nhân sự',
      'Cảnh báo: nhân sự hiện tại sẽ bị đặt lại quyền riêng của vai trò cũ; người mới cần còn chỗ trong gói',
    ],
    primaryAction: 'Tạo lời mời → OWN-04',
    secondaryActions: ['Quay lại chỉnh sửa → OWN-02'],
    nextScreen: 'OWN-04',
    layout: [
      bar('Xác nhận lời mời'),
      branchCard,
      {
        type: 'keyValue',
        rows: [
          { label: 'Số điện thoại', value: '0912 ••• 678' },
          { label: 'Thời hạn', value: '3 ngày' },
        ],
      },
      {
        type: 'alert',
        variant: 'warning',
        text: 'Nếu người nhận đang là nhân sự, quyền bổ sung hoặc quyền bị thu hồi riêng của vai trò cũ sẽ được đặt lại khi bổ nhiệm hoàn tất. Người mới cần còn chỗ trong gói nhân sự.',
      },
      buttons(
        { label: 'Tạo lời mời', goto: 'OWN-04' },
        { label: 'Quay lại chỉnh sửa', variant: 'secondary', goto: 'OWN-02' },
      ),
    ],
  },
  {
    ...inApp(owner),
    id: 'OWN-04',
    title: 'Chi tiết lời mời đang xử lý',
    entryPoint: 'Sau khi tạo lời mời, hoặc OWN-01 → Xem lời mời',
    objective:
      'Xem tiến độ lời mời; sao chép hoặc chia sẻ lại link khi còn chờ xác nhận; thu hồi khi cần.',
    visibleData: [
      'Chi nhánh, vị trí Quản lý chi nhánh, số điện thoại che bớt',
      'Trạng thái: Chờ xác nhận, Đang hoàn thiện hồ sơ...',
      'Thời điểm hết hạn',
      'Khi người nhận đang hoàn thiện hồ sơ: không lấy lại link, người nhận tiếp tục trong Lời mời làm việc của họ',
    ],
    primaryAction: 'Sao chép link',
    secondaryActions: [
      'Chia sẻ lại',
      'Thu hồi lời mời → OWN-05',
      'Xem lịch sử → OWN-07',
    ],
    nextScreen: 'OWN-05',
    layout: [
      bar('Lời mời Quản lý chi nhánh'),
      {
        type: 'keyValue',
        rows: [
          { label: 'Vị trí', value: 'Quản lý chi nhánh' },
          { label: 'Số điện thoại', value: '0912 ••• 678' },
          { label: 'Trạng thái', value: 'Chờ xác nhận' },
          { label: 'Hết hạn', value: '07/11/2026 09:00' },
        ],
      },
      buttons(
        { label: 'Sao chép link' },
        { label: 'Chia sẻ lại', variant: 'secondary' },
        { label: 'Thu hồi lời mời', variant: 'danger', goto: 'OWN-05' },
      ),
    ],
  },
  {
    ...inApp(owner),
    id: 'OWN-05',
    title: 'Thu hồi lời mời',
    entryPoint: 'OWN-04 → Thu hồi lời mời',
    objective:
      'Chọn lý do thu hồi; link mất hiệu lực và quá trình bổ nhiệm kết thúc, vai trò hiện có của người nhận không mất.',
    visibleData: [
      'Lời nhắc link mất hiệu lực',
      'Chọn lý do: nhầm tài khoản, không còn cần, lý do khác',
      'Lý do khác bắt buộc nhập giải thích',
    ],
    userInput: ['Lý do thu hồi'],
    primaryAction: 'Xác nhận thu hồi → OWN-01',
    secondaryActions: ['Giữ lời mời → OWN-04'],
    nextScreen: 'OWN-01',
    errorsOrOutcomes: ['Muốn mời lại phải tạo lời mời mới'],
    layout: [
      bar('Thu hồi lời mời'),
      {
        type: 'alert',
        variant: 'warning',
        text: 'Link sẽ mất hiệu lực và việc bổ nhiệm hiện tại kết thúc. Vai trò hiện có của người nhận không bị mất.',
      },
      {
        type: 'field',
        kind: 'radio',
        label: 'Lý do',
        value: 'Nhầm tài khoản',
        options: ['Nhầm tài khoản', 'Không còn cần', 'Lý do khác'],
      },
      {
        type: 'field',
        kind: 'textarea',
        label: 'Giải thích (bắt buộc nếu chọn Lý do khác)',
        placeholder: 'Nhập lý do',
      },
      buttons(
        { label: 'Xác nhận thu hồi', variant: 'danger', goto: 'OWN-01' },
        { label: 'Giữ lời mời', variant: 'secondary', goto: 'OWN-04' },
      ),
    ],
  },
  {
    ...inApp(owner),
    id: 'OWN-06',
    title: 'Quản lý Manager hiện tại',
    entryPoint: 'OWN-01 → Xem quản lý hiện tại',
    objective:
      'Xem Manager hiện tại và tạm dừng, kích hoạt lại hoặc kết thúc vai trò.',
    visibleData: [
      'Ảnh công việc, biệt danh, mã nhân sự, số điện thoại che bớt, chi nhánh, trạng thái, ngày bắt đầu',
      'Đang làm: Tạm dừng hoặc Kết thúc vai trò; đang tạm dừng: Kích hoạt lại hoặc Kết thúc vai trò',
    ],
    primaryAction: 'Tạm dừng → OWN-08',
    secondaryActions: ['Kết thúc vai trò → OWN-08'],
    nextScreen: 'OWN-08',
    errorsOrOutcomes: [
      'Tạm dừng: Manager mất quyền thao tác nhưng giữ vị trí',
      'Kết thúc: mất quyền, vị trí được trả lại, Owner có thể tạo lời mời mới',
    ],
    layout: [
      bar('Quản lý chi nhánh'),
      {
        type: 'hero',
        title: 'Trần Quản Lý',
        logo: true,
        lines: [
          'Mã 02 · 0903 ••• 456',
          'Karaoke Blink Sài Gòn · bắt đầu 01/10/2026',
        ],
        status: 'Đang làm',
      },
      buttons(
        { label: 'Tạm dừng', goto: 'OWN-08' },
        { label: 'Kết thúc vai trò', variant: 'danger', goto: 'OWN-08' },
      ),
    ],
  },
  {
    ...inApp(owner),
    id: 'OWN-07',
    title: 'Lịch sử bổ nhiệm tại chi nhánh',
    entryPoint: 'OWN-04 hoặc OWN-06 → Lịch sử',
    objective:
      'Xem ai được mời, thời điểm, trạng thái và lý do thu hồi, tạm dừng, kích hoạt hoặc kết thúc. Đây không phải Admin Audit.',
    visibleData: [
      'Người được mời, thời điểm, trạng thái',
      'Lý do thu hồi, tạm dừng, kích hoạt, kết thúc',
      'Không có token, link bí mật hay dữ liệu hồ sơ riêng tư',
    ],
    primaryAction: 'Quay lại → OWN-01',
    nextScreen: 'OWN-01',
    layout: [
      bar('Lịch sử bổ nhiệm'),
      {
        type: 'cardList',
        items: [
          {
            icon: 'history',
            title: 'Tạm dừng Manager',
            subtitle: '03/11/2026 · "Nghỉ phép dài"',
          },
          {
            icon: 'history',
            title: 'Lời mời hoàn tất',
            subtitle: '01/10/2026 · 0903 ••• 456',
            badge: 'Đã hoàn tất',
            tone: 'success',
          },
          {
            icon: 'history',
            title: 'Lời mời bị thu hồi',
            subtitle: '20/09/2026 · "Nhầm tài khoản"',
            badge: 'Đã thu hồi',
            tone: 'neutral',
          },
        ],
      },
    ],
  },
  {
    ...inApp(owner),
    id: 'OWN-08',
    title: 'Xác nhận đổi trạng thái Manager',
    entryPoint: 'OWN-06 → Tạm dừng, Kích hoạt lại hoặc Kết thúc',
    objective:
      'Mọi thay đổi trạng thái đều bắt buộc nhập lý do trước khi xác nhận.',
    visibleData: ['Hành động đã chọn và ảnh hưởng', 'Ô lý do bắt buộc'],
    userInput: ['Lý do'],
    primaryAction: 'Xác nhận → OWN-06',
    secondaryActions: ['Huỷ → OWN-06'],
    nextScreen: 'OWN-06',
    layout: [
      bar('Quản lý chi nhánh'),
      {
        type: 'hero',
        title: 'Trần Quản Lý',
        lines: ['Quản lý chi nhánh · Mã 02'],
        status: 'Đang làm',
      },
      {
        type: 'modal',
        title: 'Tạm dừng Manager?',
        blocks: [
          {
            type: 'text',
            text: 'Manager mất quyền thao tác tại chi nhánh nhưng vẫn giữ vị trí.',
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
          { label: 'Tạm dừng', variant: 'danger', goto: 'OWN-06' },
          { label: 'Huỷ', variant: 'secondary', goto: 'OWN-06' },
        ],
      },
    ],
  },
  {
    environment: 'WEB_PUBLIC',
    actor: 'Người mở link',
    id: 'PUB-01',
    title: 'Xem lời mời từ đường link',
    entryPoint: 'Mở link lời mời Owner chia sẻ',
    objective:
      'Xem thông tin tối thiểu của lời mời. Mở link chưa được coi là người nhận.',
    visibleData: [
      'Tên và logo chi nhánh, địa chỉ',
      'Vị trí Quản lý chi nhánh, tên Owner, thời điểm hết hạn, số điện thoại che bớt',
      'Không có nhân sự, doanh thu, cấu hình hay dữ liệu vận hành',
    ],
    primaryAction: 'Mở ứng dụng Blink → PUB-02',
    secondaryActions: [
      'Tiếp tục trên web → PUB-02',
      'Link không dùng được → PUB-03',
    ],
    nextScreen: 'PUB-02',
    layout: [
      bar('Blink', false),
      {
        type: 'hero',
        title: 'Lời mời Quản lý chi nhánh',
        logo: true,
        lines: ['Karaoke Blink Sài Gòn', '123 Nguyễn Thị Minh Khai, Quận 1'],
      },
      {
        type: 'keyValue',
        rows: [
          { label: 'Vị trí', value: 'Quản lý chi nhánh' },
          { label: 'Người gửi', value: 'Nguyễn Văn Owner' },
          { label: 'Số điện thoại mời', value: '0912 ••• 678' },
          { label: 'Hết hạn', value: 'Còn 2 ngày 23 giờ' },
        ],
      },
      {
        type: 'text',
        text: 'Không hiển thị nhân sự, doanh thu hoặc cấu hình vận hành nội bộ.',
        muted: true,
      },
      buttons(
        { label: 'Mở ứng dụng Blink', goto: 'PUB-02' },
        { label: 'Tiếp tục trên web', variant: 'secondary', goto: 'PUB-02' },
      ),
    ],
  },
  {
    environment: 'TRANSITION',
    actor: 'Người mở link',
    id: 'PUB-02',
    title: 'Chọn nơi tiếp tục',
    entryPoint: 'PUB-01',
    objective:
      'Đưa người dùng từ web công khai vào ứng dụng Flutter hoặc React PWA. Người dùng hiểu mình đang rời web công khai và chưa nhận vai trò chỉ vì mở app.',
    visibleData: [
      'Mở trong ứng dụng Flutter; nếu chưa cài thì quay lại và tiếp tục bằng React PWA',
      'Tiếp tục trên web (React PWA): đăng nhập hoặc đăng ký rồi trở lại đúng lời mời',
    ],
    primaryAction: 'Vào ứng dụng → REC-01',
    nextScreen: 'REC-01',
    layout: [
      bar('Blink', false),
      { type: 'heading', text: 'Tiếp tục nhận lời mời' },
      {
        type: 'text',
        text: 'Bạn sẽ rời trang công khai để vào ứng dụng. Bạn chưa nhận vai trò cho tới khi xác nhận trong ứng dụng.',
        muted: true,
      },
      buttons(
        { label: 'Mở ứng dụng Blink', goto: 'REC-01' },
        { label: 'Tiếp tục bằng web', variant: 'secondary', goto: 'REC-01' },
      ),
    ],
  },
  {
    environment: 'WEB_PUBLIC',
    actor: 'Người mở link',
    id: 'PUB-03',
    title: 'Link không thể tiếp tục',
    entryPoint:
      'Mở link hết hạn, bị thu hồi, đã từ chối, đã hoàn tất hoặc không hợp lệ',
    objective: 'Giải thích riêng từng trường hợp và không có nút xác nhận lại.',
    visibleData: [
      'Hết hạn: "Lời mời đã hết hạn. Vui lòng liên hệ Owner để nhận lời mời mới."',
      'Đã thu hồi: "Lời mời đã được thu hồi."',
      'Đã từ chối: "Lời mời này đã được từ chối."',
      'Đã hoàn tất: "Lời mời đã được hoàn tất."',
      'Không hợp lệ: "Không thể mở lời mời này."',
    ],
    primaryAction: 'Đóng',
    secondaryActions: ['Mở ứng dụng Blink → PUB-02'],
    nextScreen: 'PUB-02',
    layout: [
      bar('Blink', false),
      {
        type: 'empty',
        icon: 'link',
        title: 'Lời mời đã hết hạn',
        text: 'Vui lòng liên hệ Owner để nhận lời mời mới.',
      },
      buttons(
        { label: 'Đóng' },
        { label: 'Mở ứng dụng Blink', variant: 'secondary', goto: 'PUB-02' },
      ),
    ],
  },
  {
    ...inApp(receiver),
    id: 'REC-01',
    title: 'Đăng nhập hoặc đăng ký',
    entryPoint: 'PUB-02 hoặc lời mời trong tài khoản',
    objective:
      'Xác định tài khoản nhận lời mời; số điện thoại phải được xác minh và trùng số Owner đã mời.',
    visibleData: [
      'Đăng nhập hoặc đăng ký',
      'Phiên cũ: xác minh lại số điện thoại bằng mã OTP',
      'Vừa đăng nhập trong chính luồng: không hỏi OTP lần hai',
    ],
    primaryAction: 'Tiếp tục → REC-02',
    nextScreen: 'REC-02',
    errorsOrOutcomes: [
      'Sai tài khoản: "Tài khoản này không phù hợp với lời mời. Vui lòng đăng nhập bằng số điện thoại được mời."',
    ],
    layout: [
      bar('Đăng nhập', false),
      {
        type: 'field',
        kind: 'input',
        label: 'Số điện thoại',
        value: '0912 345 678',
      },
      {
        type: 'field',
        kind: 'input',
        label: 'Mã OTP',
        placeholder: 'Nhập mã gồm 6 số',
      },
      {
        type: 'alert',
        variant: 'danger',
        text: 'Tài khoản này không phù hợp với lời mời. Vui lòng đăng nhập bằng số điện thoại được mời.',
      },
      buttons({ label: 'Tiếp tục', goto: 'REC-02' }),
    ],
  },
  {
    ...inApp(receiver),
    id: 'REC-02',
    title: 'Xem và quyết định nhận lời mời',
    entryPoint: 'Sau khi đăng nhập và xác minh đúng số',
    objective: 'Xem đầy đủ lời mời rồi xác nhận hoặc từ chối.',
    visibleData: [
      'Tên, logo, địa chỉ chi nhánh, vị trí, Owner gửi, thời hạn, số điện thoại che bớt',
      'Cảnh báo: đang là nhân sự thì quyền riêng vai trò cũ bị đặt lại; đang là CTV thì tư cách CTV kết thúc khi hoàn tất',
    ],
    primaryAction: 'Xác nhận nhận vai trò → REC-03',
    secondaryActions: [
      'Từ chối lời mời → REC-07',
      'Hoàn thiện hồ sơ → REC-04',
      'Bị chặn → REC-05',
    ],
    nextScreen: 'REC-03',
    errorsOrOutcomes: [
      'Xác nhận: kiểm tra lại chi nhánh, vị trí Manager, gói và trạng thái làm việc trước khi chuyển bước',
    ],
    layout: [
      bar('Lời mời làm việc'),
      branchCard,
      {
        type: 'keyValue',
        rows: [
          { label: 'Vị trí', value: 'Quản lý chi nhánh' },
          { label: 'Người gửi', value: 'Nguyễn Văn Owner' },
          { label: 'Hết hạn', value: 'Còn 2 ngày' },
        ],
      },
      {
        type: 'alert',
        variant: 'warning',
        text: 'Nếu bạn đang là nhân sự tại chi nhánh, quyền riêng của vai trò cũ sẽ được đặt lại. Nếu bạn đang là CTV, tư cách CTV sẽ kết thúc khi bổ nhiệm hoàn tất.',
      },
      buttons(
        { label: 'Xác nhận nhận vai trò', goto: 'REC-03' },
        { label: 'Từ chối lời mời', variant: 'secondary', goto: 'REC-07' },
      ),
    ],
  },
  {
    ...inApp(receiver),
    id: 'REC-03',
    title: 'Hoàn tất thăng chức nội bộ',
    entryPoint: 'Người nhận đang là nhân sự làm việc bình thường tại chi nhánh',
    objective:
      'Báo đã trở thành Manager; không yêu cầu nhập lại biệt danh hay ảnh. Gói đầy người không chặn trường hợp này nhưng gói phải còn hiệu lực.',
    visibleData: ['"Bạn đã trở thành Quản lý chi nhánh [Tên chi nhánh]."'],
    primaryAction: 'Vào chi nhánh',
    nextScreen: 'Bàn làm việc chi nhánh',
    layout: [
      bar('Hoàn tất', false),
      {
        type: 'alert',
        variant: 'success',
        title: 'Bạn đã trở thành Quản lý chi nhánh Karaoke Blink Sài Gòn',
      },
      buttons({ label: 'Vào chi nhánh' }),
    ],
  },
  {
    ...inApp(receiver),
    id: 'REC-04',
    title: 'Hoàn thiện hồ sơ công việc',
    entryPoint: 'Người mới hoặc người đã kết thúc làm việc tại chi nhánh',
    objective:
      'Nhập biệt danh và ảnh đại diện công việc. CCCD, ảnh chân dung, ngày sinh, hồ sơ rút tiền không bắt buộc.',
    visibleData: [
      'Tên chi nhánh, vị trí',
      'Biệt danh và ảnh đại diện công việc (bắt buộc)',
      'Người quay lại: hồ sơ đã có, cho chỉnh trước khi hoàn tất',
    ],
    userInput: ['Biệt danh', 'Ảnh đại diện'],
    primaryAction: 'Hoàn tất đăng ký → REC-06',
    secondaryActions: [
      'Để sau → Lời mời làm việc',
      'Từ chối tiếp tục → REC-07',
    ],
    nextScreen: 'REC-06',
    errorsOrOutcomes: [
      'Để sau: tiến trình nằm trong Tài khoản → Lời mời làm việc',
      'Từ chối tiếp tục: giải phóng vị trí đang giữ',
    ],
    layout: [
      bar('Hồ sơ công việc'),
      {
        type: 'keyValue',
        rows: [
          { label: 'Chi nhánh', value: 'Karaoke Blink Sài Gòn' },
          { label: 'Vị trí', value: 'Quản lý chi nhánh' },
        ],
      },
      {
        type: 'field',
        kind: 'input',
        label: 'Biệt danh công việc',
        placeholder: 'Ví dụ: Quản lý Minh',
      },
      {
        type: 'field',
        kind: 'input',
        label: 'Ảnh đại diện công việc',
        placeholder: 'Chọn ảnh',
      },
      buttons(
        { label: 'Hoàn tất đăng ký', goto: 'REC-06' },
        { label: 'Để sau', variant: 'secondary', goto: 'INB-01' },
        { label: 'Từ chối tiếp tục', variant: 'ghost', goto: 'REC-07' },
      ),
    ],
  },
  {
    ...inApp(receiver),
    id: 'REC-05',
    title: 'Bị chặn tạm thời',
    entryPoint:
      'Xác nhận lời mời khi gói, chi nhánh hoặc trạng thái chưa cho phép',
    objective:
      'Giải thích lý do dễ hiểu; chỉ cho Thử lại, Để sau hoặc về danh sách lời mời; không có nút xác nhận giả.',
    visibleData: [
      'Gói hoặc chi nhánh tạm không hoạt động: quay lại sau, lời mời vẫn hết hạn theo mốc ban đầu',
      '"Số lượng nhân sự đã đủ." cho người mới hoặc quay lại: thử lại trước khi hết hạn',
      'Nhân sự đang tạm dừng: liên hệ Owner',
    ],
    primaryAction: 'Thử lại → REC-02',
    secondaryActions: ['Để sau → INB-01'],
    nextScreen: 'INB-01',
    layout: [
      bar('Lời mời làm việc'),
      {
        type: 'alert',
        variant: 'warning',
        title: 'Số lượng nhân sự đã đủ.',
        text: 'Bạn có thể thử lại trước khi lời mời hết hạn.',
        actionLabel: 'Thử lại',
        goto: 'REC-02',
      },
      {
        type: 'alert',
        variant: 'warning',
        title:
          'Gói nhân sự của cơ sở hiện không hoạt động. Vui lòng thử lại sau.',
      },
      {
        type: 'alert',
        variant: 'warning',
        title: 'Chi nhánh hiện đang tạm dừng hoạt động. Vui lòng thử lại sau.',
      },
      {
        type: 'alert',
        variant: 'danger',
        title: 'Bạn chưa thể nhận vai trò khi đang bị tạm dừng làm việc.',
        text: 'Vui lòng liên hệ Owner để xử lý trạng thái hiện tại.',
      },
      buttons({ label: 'Để sau', variant: 'secondary', goto: 'INB-01' }),
    ],
  },
  {
    ...inApp(receiver),
    id: 'REC-06',
    title: 'Hoàn tất bổ nhiệm người mới hoặc người quay lại',
    entryPoint: 'Sau khi hoàn thiện hồ sơ công việc',
    objective:
      'Báo kết quả; nơi làm việc mới xuất hiện trong danh sách cơ sở của tài khoản.',
    visibleData: [
      'Ảnh, biệt danh, chi nhánh',
      '"Bạn đã trở thành Quản lý chi nhánh [Tên chi nhánh]."',
    ],
    primaryAction: 'Vào chi nhánh',
    nextScreen: 'Bàn làm việc chi nhánh',
    layout: [
      bar('Hoàn tất', false),
      {
        type: 'alert',
        variant: 'success',
        title: 'Bạn đã trở thành Quản lý chi nhánh Karaoke Blink Sài Gòn',
      },
      {
        type: 'hero',
        title: 'Quản lý Minh',
        logo: true,
        lines: ['Karaoke Blink Sài Gòn'],
      },
      buttons({ label: 'Vào chi nhánh' }),
    ],
  },
  {
    ...inApp(receiver),
    id: 'REC-07',
    title: 'Kết thúc lời mời',
    entryPoint:
      'Người nhận từ chối trước hoặc sau khi bắt đầu hoàn thiện hồ sơ',
    objective: 'Báo đã từ chối; muốn nhận lại vị trí phải có lời mời mới.',
    visibleData: ['"Bạn đã từ chối lời mời làm Quản lý chi nhánh."'],
    primaryAction: 'Về trang chính',
    secondaryActions: ['Xem lời mời khác → INB-01'],
    nextScreen: 'Trang chủ tài khoản',
    layout: [
      bar('Lời mời làm việc', false),
      {
        type: 'empty',
        icon: 'user-x',
        title: 'Bạn đã từ chối lời mời làm Quản lý chi nhánh.',
        text: 'Muốn nhận lại vị trí, bạn cần một lời mời mới.',
      },
      buttons(
        { label: 'Về trang chính' },
        { label: 'Xem lời mời khác', variant: 'secondary', goto: 'INB-01' },
      ),
    ],
  },
  {
    ...inApp(receiver),
    id: 'REC-08',
    title: 'Các thông báo lỗi khi nhận lời mời',
    entryPoint: 'Lời mời không còn hợp lệ trong lúc xử lý',
    objective:
      'Nội dung thông báo cho từng tình huống và cho biết có thể tiếp tục hay cần lời mời mới.',
    visibleData: [
      'Sai tài khoản: đăng nhập lại bằng đúng số điện thoại',
      'Không có quyền: "Bạn không có quyền truy cập."',
      'Lời mời hết hạn hoặc bị thu hồi: cần lời mời mới',
      'Vị trí đã có người: "Chi nhánh đã có Quản lý."',
    ],
    primaryAction: 'Về danh sách lời mời → INB-01',
    nextScreen: 'INB-01',
    layout: [
      bar('Lời mời làm việc'),
      {
        type: 'alert',
        variant: 'warning',
        title: 'Tài khoản này không phù hợp với lời mời.',
        text: 'Đăng nhập lại bằng đúng số điện thoại được mời.',
      },
      {
        type: 'alert',
        variant: 'danger',
        title:
          'Lời mời đã hết hạn. Vui lòng liên hệ Owner để nhận lời mời mới.',
      },
      { type: 'alert', variant: 'neutral', title: 'Lời mời đã được thu hồi.' },
      { type: 'alert', variant: 'neutral', title: 'Chi nhánh đã có Quản lý.' },
      {
        type: 'alert',
        variant: 'danger',
        title: 'Bạn không có quyền truy cập.',
      },
      buttons({ label: 'Về danh sách lời mời', goto: 'INB-01' }),
    ],
  },
  {
    ...inApp(receiver),
    id: 'INB-01',
    title: 'Hộp lời mời làm việc trong tài khoản',
    entryPoint: 'Tài khoản → Lời mời làm việc',
    objective:
      'Xử lý từng lời mời từ nhiều chi nhánh; không chặn trang chính. Mở lại ứng dụng: chỉ một đăng ký dở thì gợi ý Tiếp tục đăng ký, nhiều đăng ký dở thì mở danh sách chọn.',
    visibleData: [
      'Nhóm Lời mời mới (gắn đúng số, chưa xác nhận)',
      'Nhóm Đăng ký đang hoàn thiện',
      'Mỗi thẻ: chi nhánh, vị trí, thời hạn, trạng thái, Xem lời mời hoặc Tiếp tục đăng ký',
    ],
    primaryAction: 'Xem lời mời → REC-02',
    secondaryActions: ['Tiếp tục đăng ký → REC-04'],
    nextScreen: 'REC-02',
    layout: [
      bar('Lời mời làm việc'),
      { type: 'heading', text: 'Lời mời mới' },
      {
        type: 'cardList',
        items: [
          {
            icon: 'mail',
            title: 'Karaoke Blink Quận 7',
            subtitle: 'Quản lý chi nhánh · còn 2 ngày',
            badge: 'Chờ xác nhận',
            tone: 'warning',
            goto: 'REC-02',
          },
        ],
      },
      { type: 'heading', text: 'Đăng ký đang hoàn thiện' },
      {
        type: 'cardList',
        items: [
          {
            icon: 'user-plus',
            title: 'Karaoke Blink Sài Gòn',
            subtitle: 'Cần hoàn thiện hồ sơ công việc',
            badge: 'Đang hoàn thiện hồ sơ',
            tone: 'info',
            goto: 'REC-04',
          },
        ],
      },
    ],
  },
  {
    ...inApp('Manager hiện tại'),
    id: 'MGR-01',
    title: 'Xác nhận nghỉ việc',
    entryPoint: 'Thông tin nơi làm việc tại chi nhánh đang quản lý',
    objective:
      'Manager chủ động nghỉ việc tại một chi nhánh; các chi nhánh khác không bị ảnh hưởng.',
    visibleData: [
      'Chi nhánh bị ảnh hưởng',
      'Cảnh báo quyền tại chi nhánh bị thu hồi ngay',
      'Ghi chú không bắt buộc',
    ],
    userInput: ['Ghi chú (không bắt buộc)'],
    primaryAction: 'Xác nhận nghỉ việc → Danh sách nơi làm việc',
    secondaryActions: ['Tiếp tục làm việc'],
    nextScreen: 'Danh sách nơi làm việc',
    errorsOrOutcomes: [
      'Owner được thông báo; muốn quay lại phải nhận lời mời mới',
    ],
    layout: [
      bar('Nghỉ việc'),
      branchCard,
      {
        type: 'alert',
        variant: 'warning',
        text: 'Quyền của bạn tại chi nhánh này sẽ bị thu hồi ngay. Các chi nhánh khác không bị ảnh hưởng.',
      },
      {
        type: 'field',
        kind: 'textarea',
        label: 'Ghi chú (không bắt buộc)',
        placeholder: 'Nhập ghi chú',
      },
      buttons(
        { label: 'Xác nhận nghỉ việc', variant: 'danger' },
        { label: 'Tiếp tục làm việc', variant: 'secondary' },
      ),
    ],
  },
];

export const karaokeManagerAppointments: Flow = {
  id: 'karaoke-manager-appointments',
  title: 'Bổ nhiệm Quản lý chi nhánh',
  role: 'karaoke-owner',
  section: 'staff',
  summary:
    'Owner mời, thu hồi và quản lý Manager của chi nhánh; người nhận mở link công khai, vào ứng dụng, xác nhận và hoàn thiện hồ sơ; Manager có thể chủ động nghỉ việc.',
  actors: ['Owner', 'Người nhận lời mời', 'Manager hiện tại'],
  environments: ['FLUTTER_APP', 'WEB_PUBLIC', 'TRANSITION'],
  screens,
  source: 'docs/wireframes/karaoke-owner/karaoke-manager-appointments.md',
};
