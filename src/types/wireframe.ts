import React from 'react';

export type WireframeEnvironment =
  | 'FLUTTER_APP'   // 📱 Màn hình ứng dụng Flutter
  | 'REACT_PWA'     // 🖥️ Màn hình React PWA (giao diện Mobile Web sau đăng nhập)
  | 'WEB_PUBLIC'    // 🌐 Trang web công khai mở từ link chia sẻ
  | 'TRANSITION'    // ↗️ Bước chuyển tiếp giữa link và ứng dụng
  | 'ADMIN_UI';     // 🖥️ Màn hình quản trị Blink Admin (Desktop)

export type DomainCategory =
  | 'business-ops'     // Cơ sở & Vận hành (Cơ sở, chi nhánh, tầng, phòng)
  | 'human-resources'  // Nhân sự & Phân quyền (Quản lý, nhân viên, phân quyền, thu ngân)
  | 'admin-platform';  // Nền tảng Blink Admin (Gói, auth, policy, release, audit)

export interface WireframeScreenSpec {
  id: string;               // Ví dụ: OWN-01, PUB-01, REG-01
  title: string;            // Ví dụ: Trạng thái quản lý chi nhánh
  environment: WireframeEnvironment;
  actor: string;            // Ví dụ: Owner, Người nhận, Manager, Blink Admin
  entryPoint: string;       // Điểm vào luồng
  objective: string;        // Mục đích màn hình
  visibleData: string[];    // Dữ liệu người dùng nhìn thấy
  userInput?: string[];     // Dữ liệu người dùng nhập
  primaryAction: string;    // Hành động chính
  secondaryActions?: string[]; // Hành động phụ
  nextScreen?: string;      // Màn hình tiếp theo
  errorsOrOutcomes?: string[]; // Lỗi và kết quả xử lý
  auditNote?: string;       // Ghi chú Audit nếu có
  component?: React.ComponentType; // Component render giao diện wireframe
}

export interface WireframeInitiative {
  id: string;               // Slug: karaoke-manager-appointments
  title: string;            // Tên tiếng Việt: Bổ nhiệm Quản lý chi nhánh
  category: DomainCategory;
  categoryLabel: string;
  folderPath: string;       // nexlink-blink-backend/docs/initiatives/...
  summary: string;          // Tóm tắt mục đích
  actors: string[];         // Các bên tham gia
  environments: WireframeEnvironment[];
  screens: WireframeScreenSpec[];
}
