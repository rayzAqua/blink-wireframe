import type { Block, Flow, Screen } from '../../domain/types.ts';

const hero = (extra?: Partial<Extract<Block, { type: 'hero' }>>): Block => ({
  type: 'hero',
  title: 'Karaoke Blink Sài Gòn',
  verified: true,
  planTag: 'Gói Pro',
  cover: true,
  logo: true,
  lines: [
    '123 Nguyễn Thị Minh Khai, Quận 1',
    'Hotline 0901 234 567 · Mở cửa 11:00 (ngày hoạt động 24 giờ)',
  ],
  status: 'Đang hoạt động',
  goto: 'ACC-10',
  ...extra,
});

/** The four menu groups of the account screen. */
const menu: Block[] = [
  {
    type: 'listGroup',
    label: 'Vận hành quán',
    rows: [
      { icon: 'settings', title: 'Thiết lập quán hát', goto: 'ACC-11' },
      {
        icon: 'users',
        title: 'Quản lý nhân sự',
        goto: 'karaoke-staff-management/STF-01',
      },
      {
        icon: 'git-branch',
        title: 'Quản lý chi nhánh',
        goto: 'karaoke-branch-creation/BR-01',
      },
      {
        icon: 'key-round',
        title: 'Thu ngân',
        goto: 'cashier-terminal-authentication/CSH-01',
      },
      { icon: 'wallet', title: 'Gói nhân sự', chevron: true },
      { icon: 'handshake', title: 'Cộng tác viên', chevron: true },
      { icon: 'qr-code', title: 'QR phòng', badge: 'Sắp có', goto: 'ACC-03' },
    ],
  },
  {
    type: 'listGroup',
    label: 'Khách hàng và kinh doanh',
    rows: [
      { icon: 'handshake', title: 'Hợp tác đối tác', chevron: true },
      { icon: 'book-user', title: 'Danh bạ khách hàng', chevron: true },
      { icon: 'gift', title: 'Quà tặng', badge: 'Sắp có', goto: 'ACC-03' },
      { icon: 'mail', title: 'Lời mời phòng', badge: 'Sắp có', goto: 'ACC-03' },
    ],
  },
  {
    type: 'listGroup',
    label: 'Cài đặt',
    rows: [
      { icon: 'bell', title: 'Thông báo', chevron: true },
      {
        icon: 'help-circle',
        title: 'Trợ giúp & hỗ trợ',
        badge: 'Sắp có',
        goto: 'ACC-03',
      },
    ],
  },
  {
    type: 'listGroup',
    label: 'Tài khoản',
    rows: [
      { icon: 'user', title: 'Cập nhật thông tin tài khoản', chevron: true },
      { icon: 'lock', title: 'Phương thức đăng nhập', chevron: true },
      { icon: 'log-out', title: 'Đăng xuất', tone: 'danger', goto: 'ACC-04' },
    ],
  },
];

const appBar: Block = { type: 'appBar', title: 'Tài khoản', actions: ['bell'] };

const common = {
  environment: 'FLUTTER_APP' as const,
  actor: 'Owner Karaoke',
};

const screens: Screen[] = [
  {
    ...common,
    id: 'ACC-01',
    title: 'Tài khoản Owner',
    entryPoint: 'Thẻ Tài khoản trong thanh điều hướng của ứng dụng',
    objective:
      'Xem thông tin chi nhánh đang chọn, đổi chi nhánh và mở các chức năng vận hành, kinh doanh, cài đặt và tài khoản.',
    visibleData: [
      'Ảnh bìa, logo, tên cơ sở, tích xanh hậu kiểm, nhãn tên gói',
      'Địa chỉ, hotline, giờ mở cửa, trạng thái vận hành',
      'Bốn nhóm nút: Vận hành quán, Khách hàng và kinh doanh, Cài đặt, Tài khoản',
    ],
    primaryAction: 'Chạm thẻ cơ sở → ACC-10',
    secondaryActions: [
      'Đổi chi nhánh → ACC-02',
      'Thiết lập quán hát → ACC-11',
      'Đăng xuất → ACC-04',
    ],
    nextScreen: 'ACC-10',
    layout: [appBar, hero(), ...menu],
  },
  {
    ...common,
    id: 'ACC-02',
    title: 'Chọn chi nhánh',
    entryPoint: 'Nút Đổi chi nhánh trên thẻ cơ sở',
    objective:
      'Chuyển sang chi nhánh khác của Owner. Mỗi dòng có logo, tên, địa chỉ ngắn, nhãn trạng thái và dấu chọn ở chi nhánh đang dùng.',
    visibleData: [
      'Danh sách chi nhánh của Owner',
      'Logo và nhãn trạng thái từng chi nhánh',
      'Nút Thêm chi nhánh',
    ],
    primaryAction: 'Chọn chi nhánh → ACC-01',
    secondaryActions: ['Thêm chi nhánh (sang luồng tạo chi nhánh)'],
    nextScreen: 'ACC-01',
    errorsOrOutcomes: [
      'Chi nhánh không còn khả dụng: báo và tự chuyển sang chi nhánh còn lại',
    ],
    layout: [
      appBar,
      hero(),
      {
        type: 'bottomSheet',
        title: 'Chọn chi nhánh',
        blocks: [
          {
            type: 'cardList',
            items: [
              {
                icon: 'building',
                title: 'Karaoke Blink Sài Gòn',
                subtitle: 'Quận 1 · đang chọn',
                badge: 'Đang hoạt động',
                tone: 'success',
                goto: 'ACC-01',
              },
              {
                icon: 'building',
                title: 'Karaoke Blink Quận 7',
                subtitle: 'Quận 7',
                badge: 'Hạn chế',
                tone: 'warning',
                goto: 'ACC-08',
              },
              {
                icon: 'building',
                title: 'Karaoke Blink Thủ Đức',
                subtitle: 'Thủ Đức',
                badge: 'Chấm dứt',
                tone: 'danger',
                goto: 'ACC-09',
              },
            ],
          },
          {
            type: 'actions',
            buttons: [
              {
                label: 'Thêm chi nhánh',
                variant: 'secondary',
                goto: 'karaoke-branch-creation/BR-01',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    ...common,
    id: 'ACC-03',
    title: 'Chức năng sắp có',
    entryPoint: 'Chạm QR phòng, Quà tặng, Lời mời phòng hoặc Trợ giúp & hỗ trợ',
    objective: 'Báo ngắn rằng chức năng chưa có, không mở màn hình mới.',
    visibleData: [
      'Thông báo ngắn "Sắp có" ở cuối màn hình',
      'Nhãn "Sắp có" ở cuối các dòng chưa dùng được',
    ],
    primaryAction: 'Thông báo tự tắt → ACC-01',
    nextScreen: 'ACC-01',
    layout: [appBar, hero(), ...menu, { type: 'toast', text: 'Sắp có' }],
  },
  {
    ...common,
    id: 'ACC-04',
    title: 'Xác nhận đăng xuất',
    entryPoint: 'Dòng Đăng xuất',
    objective: 'Xác nhận kết thúc phiên trên thiết bị này.',
    visibleData: [
      'Câu hỏi "Đăng xuất khỏi Blink trên thiết bị này?"',
      'Nút Đăng xuất và nút Huỷ',
    ],
    primaryAction: 'Đăng xuất → quay về đăng nhập',
    secondaryActions: ['Huỷ → ACC-01'],
    nextScreen: 'Màn hình đăng nhập',
    errorsOrOutcomes: [
      'Mất kết nối: vẫn thoát khỏi ứng dụng, phiên trên máy chủ được dọn khi có mạng',
      'Thiết bị ngừng nhận thông báo riêng của tài khoản và xoá chi nhánh đã nhớ',
    ],
    layout: [
      appBar,
      hero(),
      ...menu,
      {
        type: 'modal',
        title: 'Đăng xuất khỏi Blink trên thiết bị này?',
        blocks: [
          {
            type: 'text',
            text: 'Bạn sẽ ngừng nhận thông báo của tài khoản này trên thiết bị.',
            muted: true,
          },
        ],
        buttons: [
          { label: 'Đăng xuất', variant: 'danger' },
          { label: 'Huỷ', variant: 'secondary', goto: 'ACC-01' },
        ],
      },
    ],
  },
  {
    ...common,
    id: 'ACC-05',
    title: 'Đang tải thông tin cơ sở',
    entryPoint: 'Mở màn hình Tài khoản hoặc đổi chi nhánh',
    objective: 'Cho biết đang tải; các nút Cài đặt và Tài khoản vẫn dùng được.',
    visibleData: [
      'Khung chờ thay cho thẻ cơ sở',
      'Các nút Cài đặt và Tài khoản',
    ],
    primaryAction: 'Tải xong → ACC-01',
    nextScreen: 'ACC-01',
    layout: [appBar, { type: 'skeleton', lines: 3 }, menu[2], menu[3]],
  },
  {
    ...common,
    id: 'ACC-06',
    title: 'Không tải được thông tin cơ sở',
    entryPoint: 'Mất mạng hoặc lỗi khi tải',
    objective:
      'Báo lỗi tại thẻ cơ sở và cho thử lại; phần còn lại của màn hình vẫn dùng được.',
    visibleData: [
      'Thông báo lỗi kèm nút Thử lại',
      'Các nút Cài đặt và Tài khoản',
    ],
    primaryAction: 'Thử lại → ACC-05',
    secondaryActions: ['Đăng xuất → ACC-04'],
    nextScreen: 'ACC-05',
    layout: [
      appBar,
      {
        type: 'alert',
        variant: 'danger',
        title: 'Không tải được thông tin cơ sở',
        text: 'Kiểm tra kết nối rồi thử lại.',
        actionLabel: 'Thử lại',
        goto: 'ACC-05',
      },
      menu[2],
      menu[3],
    ],
  },
  {
    ...common,
    id: 'ACC-07',
    title: 'Blink yêu cầu bổ sung hồ sơ',
    entryPoint:
      'Chi nhánh đang chọn có kết quả hậu kiểm Yêu cầu bổ sung hoặc Không đạt',
    objective:
      'Cho Owner thấy nội dung Blink yêu cầu và đưa tới màn hình cập nhật hồ sơ.',
    visibleData: [
      'Banner nội dung yêu cầu và thời điểm gửi',
      'Nút Cập nhật hồ sơ',
      'Không có tích xanh cạnh tên',
    ],
    primaryAction: 'Cập nhật hồ sơ → ACC-10',
    nextScreen: 'ACC-10',
    errorsOrOutcomes: [
      'Sau khi gửi bổ sung: banner đổi thành "Đã gửi — đang chờ Blink kiểm tra", không còn nút',
    ],
    layout: [
      appBar,
      {
        type: 'alert',
        variant: 'warning',
        title: 'Blink cần bạn cập nhật thông tin cơ sở',
        text: 'Bổ sung địa chỉ chi nhánh. Gửi lúc 09:30 ngày 03/11.',
        actionLabel: 'Cập nhật hồ sơ',
        goto: 'ACC-10',
      },
      hero({ verified: false }),
      ...menu,
    ],
  },
  {
    ...common,
    id: 'ACC-08',
    title: 'Cơ sở bị hạn chế bởi Blink',
    entryPoint: 'Chi nhánh đang chọn bị hạn chế hoặc tạm ngưng trên nền tảng',
    objective:
      'Cho biết cơ sở bị hạn chế; hồ sơ và trạng thái vận hành vẫn sửa được, nhiều thiết lập bị khoá.',
    visibleData: [
      'Dải thông báo đầu trang',
      'Nhãn trạng thái trên thẻ cơ sở',
      'Các nút vẫn mở được nhưng thiết lập bên trong bị khoá',
    ],
    primaryAction: 'Cập nhật hồ sơ → ACC-10',
    nextScreen: 'ACC-10',
    layout: [
      appBar,
      {
        type: 'alert',
        variant: 'danger',
        title: 'Cơ sở đang bị hạn chế bởi Blink',
        text: 'Giờ mở cửa, ngân hàng, phòng và giá, cấu hình đặt phòng, quản lý Thu ngân đang bị khoá.',
      },
      hero({ status: 'Hạn chế' }),
      ...menu,
    ],
  },
  {
    ...common,
    id: 'ACC-09',
    title: 'Cơ sở đã chấm dứt hợp tác',
    entryPoint: 'Chi nhánh đang chọn đã chấm dứt hoặc đã xoá',
    objective:
      'Chỉ xem; mọi nút thao tác ghi bị mờ. Vẫn đổi được sang chi nhánh khác và đăng xuất được.',
    visibleData: [
      'Dải thông báo cơ sở đã chấm dứt hợp tác',
      'Các nút thao tác bị mờ',
      'Nút Đổi chi nhánh và Đăng xuất vẫn dùng được',
    ],
    primaryAction: 'Đổi chi nhánh → ACC-02',
    nextScreen: 'ACC-02',
    layout: [
      appBar,
      {
        type: 'alert',
        variant: 'neutral',
        title: 'Cơ sở đã chấm dứt hợp tác',
        text: 'Bạn chỉ xem được thông tin. Hãy chọn chi nhánh khác để tiếp tục vận hành.',
        actionLabel: 'Đổi chi nhánh',
        goto: 'ACC-02',
      },
      hero({ status: 'Đã chấm dứt', verified: false, goto: undefined }),
      {
        type: 'listGroup',
        label: 'Vận hành quán',
        rows: [
          { icon: 'settings', title: 'Thiết lập quán hát', disabled: true },
          { icon: 'users', title: 'Quản lý nhân sự', disabled: true },
          { icon: 'key-round', title: 'Thu ngân', disabled: true },
        ],
      },
      menu[3],
    ],
  },
  {
    ...common,
    id: 'ACC-10',
    title: 'Cập nhật thông tin cơ sở',
    entryPoint: 'Thẻ cơ sở, nhãn trạng thái vận hành hoặc nút Cập nhật hồ sơ',
    objective:
      'Sửa hồ sơ cơ sở: hình ảnh, thông tin chung, giờ mở cửa, tài khoản ngân hàng và trạng thái vận hành.',
    visibleData: [
      'Ảnh bìa, logo và ảnh liên quan',
      'Tên, địa chỉ, hotline, thông tin liên hệ',
      'Một mốc giờ mở cửa; giờ đóng cửa là cùng giờ đó của ngày hôm sau',
      'Tài khoản ngân hàng',
      'Trạng thái vận hành: Đang hoạt động, Tạm dừng, Ngừng',
    ],
    userInput: [
      'Tên',
      'Địa chỉ',
      'Hotline',
      'Giờ mở cửa',
      'Tài khoản ngân hàng',
      'Trạng thái vận hành',
    ],
    primaryAction: 'Lưu → ACC-01',
    secondaryActions: ['Huỷ → ACC-01'],
    nextScreen: 'ACC-01',
    errorsOrOutcomes: [
      'Hotline trùng: báo ngay tại ô nhập và giữ nguyên dữ liệu',
      'Đổi hotline thì số đăng nhập Thu ngân đổi theo; gỡ hotline thì dùng số điện thoại của Owner',
      'Đổi giờ mở cửa bị chặn nếu ngày nghiệp vụ hiện tại đã có đơn',
      'Cơ sở bị Blink hạn chế: giờ mở cửa và tài khoản ngân hàng bị khoá kèm giải thích',
    ],
    layout: [
      { type: 'appBar', title: 'Cập nhật thông tin cơ sở', back: true },
      { type: 'heading', text: 'Hình ảnh' },
      {
        type: 'keyValue',
        rows: [
          { label: 'Ảnh bìa', value: 'Đã có' },
          { label: 'Logo', value: 'Đã có' },
          { label: 'Ảnh liên quan', value: '4 ảnh' },
        ],
      },
      { type: 'heading', text: 'Thông tin chung' },
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
        label: 'Hotline',
        value: '0901 234 567',
        error: 'Số hotline đã được cơ sở khác sử dụng.',
      },
      { type: 'heading', text: 'Giờ mở cửa' },
      {
        type: 'field',
        kind: 'input',
        label: 'Giờ mở cửa',
        value: '11:00',
        helper:
          'Giờ đóng cửa là 11:00 ngày hôm sau. Đổi giờ sẽ dịch bảng giá của mọi phòng.',
      },
      { type: 'heading', text: 'Tài khoản ngân hàng' },
      {
        type: 'field',
        kind: 'input',
        label: 'Số tài khoản',
        value: '0123 456 789 · Vietcombank',
      },
      { type: 'heading', text: 'Trạng thái vận hành' },
      {
        type: 'field',
        kind: 'radio',
        label: 'Trạng thái',
        value: 'Đang hoạt động',
        options: ['Đang hoạt động', 'Tạm dừng', 'Ngừng'],
        helper:
          'Tạm dừng hoặc Ngừng: cơ sở không hiện khi khách chọn quán và Thu ngân không đăng nhập được.',
      },
      {
        type: 'actions',
        buttons: [
          { label: 'Lưu', goto: 'ACC-01' },
          { label: 'Huỷ', variant: 'secondary', goto: 'ACC-01' },
        ],
      },
    ],
  },
  {
    ...common,
    id: 'ACC-11',
    title: 'Thiết lập quán',
    entryPoint: 'Nút Thiết lập quán hát',
    objective:
      'Danh mục các thiết lập của cơ sở: phòng và giá, tầng, giờ mở cửa, đặt phòng, nhãn đơn, hoa hồng, ngân hàng.',
    visibleData: [
      'Phòng và giá',
      'Tầng',
      'Giờ mở cửa',
      'Cấu hình đặt phòng',
      'Nhãn đơn',
      'Hoa hồng',
      'Tài khoản ngân hàng',
    ],
    primaryAction: 'Chọn một dòng thiết lập',
    secondaryActions: ['Quay lại → ACC-01'],
    nextScreen: 'ACC-01',
    errorsOrOutcomes: [
      'Cơ sở bị Blink hạn chế: các dòng phòng và giá, đặt phòng, giờ mở cửa, ngân hàng bị khoá',
    ],
    layout: [
      { type: 'appBar', title: 'Thiết lập quán', back: true },
      {
        type: 'listGroup',
        rows: [
          {
            icon: 'door-open',
            title: 'Phòng và giá',
            description: 'Phòng, ảnh, bảng giá, nhận đặt từng phòng',
            goto: 'karaoke-room-management/ROOM-01',
          },
          {
            icon: 'layers',
            title: 'Tầng',
            description: 'Số tầng, đóng hoặc mở từng tầng',
            goto: 'karaoke-floors/FLR-01',
          },
          {
            icon: 'clock',
            title: 'Giờ mở cửa',
            description: 'Một mốc giờ dùng chung cả tuần',
            goto: 'ACC-10',
          },
          {
            icon: 'calendar',
            title: 'Cấu hình đặt phòng',
            description:
              'Thời gian giữ chỗ, hạn nhận phòng, thời lượng mặc định',
            chevron: true,
          },
          {
            icon: 'tag',
            title: 'Nhãn đơn',
            description: 'Tạo, sửa, ngừng dùng nhãn',
            chevron: true,
          },
          {
            icon: 'percent',
            title: 'Hoa hồng',
            description: 'Tỷ lệ hoa hồng phòng và món, tối đa 50%',
            chevron: true,
          },
          { icon: 'landmark', title: 'Tài khoản ngân hàng', goto: 'ACC-10' },
        ],
      },
    ],
  },
];

export const accountHome: Flow = {
  id: 'account-home',
  title: 'Tài khoản Owner Karaoke',
  role: 'karaoke-owner',
  section: 'account',
  summary:
    'Màn hình Tài khoản của Owner: thông tin cơ sở và chi nhánh đang chọn, các nhóm chức năng vận hành, kinh doanh, cài đặt, tài khoản, và các màn hình mà từng nút mở ra ở cấp một.',
  actors: ['Owner Karaoke'],
  environments: ['FLUTTER_APP'],
  screens,
  source: 'docs/wireframes/karaoke-owner/account-home.md',
};
