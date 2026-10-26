import React, { useState, useEffect } from 'react';
import {
  Search,
  Building2,
  Users,
  ShieldCheck,
  ChevronRight,
  FolderTree,
  FoldVertical,
  ChevronsUpDown,
} from 'lucide-react';
import { useWireframe } from '../../context/WireframeContext';
import { Badge } from '../../design-system';
import './Sidebar.css';

export const Sidebar: React.FC = () => {
  const {
    initiatives,
    activeInitiative,
    activeScreen,
    selectInitiative,
    selectScreen,
    searchQuery,
    setSearchQuery,
  } = useWireframe();

  // Accordion state: only 1 domain group and 1 initiative open at a time
  const [openGroupKey, setOpenGroupKey] = useState<string | null>(activeInitiative.category);
  const [openInitiativeId, setOpenInitiativeId] = useState<string | null>(activeInitiative.id);
  const [isAllExpanded, setIsAllExpanded] = useState<boolean>(false);

  // Sync open states when activeInitiative changes
  useEffect(() => {
    setOpenGroupKey(activeInitiative.category);
    setOpenInitiativeId(activeInitiative.id);
  }, [activeInitiative.id, activeInitiative.category]);

  const domainGroups = [
    {
      key: 'business-ops',
      label: 'Cơ sở & Vận hành',
      icon: <Building2 size={14} />,
      items: initiatives.filter((i) => i.category === 'business-ops'),
    },
    {
      key: 'human-resources',
      label: 'Nhân sự & Phân quyền',
      icon: <Users size={14} />,
      items: initiatives.filter((i) => i.category === 'human-resources'),
    },
    {
      key: 'admin-platform',
      label: 'Quản trị Nền tảng (Admin)',
      icon: <ShieldCheck size={14} />,
      items: initiatives.filter((i) => i.category === 'admin-platform'),
    },
  ];

  // Accordion toggle for Domain Groups: opens this group and closes others
  const handleGroupToggle = (groupKey: string) => {
    if (isAllExpanded) {
      setIsAllExpanded(false);
      setOpenGroupKey(openGroupKey === groupKey ? null : groupKey);
      return;
    }
    setOpenGroupKey((prev) => (prev === groupKey ? null : groupKey));
  };

  // Accordion toggle for Initiatives: opens this card and closes others
  const handleInitiativeToggle = (initId: string, groupKey: string) => {
    if (openInitiativeId === initId) {
      // Toggle to close currently open card
      setOpenInitiativeId(null);
    } else {
      // Open this card and close any other open card
      setOpenInitiativeId(initId);
      setOpenGroupKey(groupKey);
      selectInitiative(initId);
    }
  };

  // Toggle Collapse All / Expand All
  const handleToggleAll = () => {
    if (isAllExpanded) {
      setIsAllExpanded(false);
      setOpenGroupKey(null);
      setOpenInitiativeId(null);
    } else {
      setIsAllExpanded(true);
      setOpenGroupKey(null);
      setOpenInitiativeId(null);
    }
  };

  const filteredGroups = domainGroups.map((group) => ({
    ...group,
    items: group.items.filter((item) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.screens.some((s) => s.id.toLowerCase().includes(q) || s.title.toLowerCase().includes(q))
      );
    }),
  }));

  const getEnvBadgeVariant = (env: string) => {
    switch (env) {
      case 'FLUTTER_APP': return 'env-flutter';
      case 'REACT_PWA': return 'env-react';
      case 'WEB_PUBLIC': return 'env-public';
      case 'ADMIN_UI': return 'env-admin';
      default: return 'env-transition';
    }
  };

  const getEnvShortLabel = (env: string) => {
    switch (env) {
      case 'FLUTTER_APP': return 'APP';
      case 'REACT_PWA': return 'PWA';
      case 'WEB_PUBLIC': return 'WEB';
      case 'ADMIN_UI': return 'ADM';
      default: return 'LNK';
    }
  };

  return (
    <aside className="wireframe-sidebar">
      {/* Sidebar Header: Compact title & accordion controls */}
      <div className="wireframe-sidebar__header">
        <div className="wireframe-sidebar__header-left">
          <FolderTree size={14} style={{ color: 'var(--color-primary)' }} />
          <span className="wireframe-sidebar__header-title">Danh Mục Nghiệp Vụ</span>
        </div>
        <button
          type="button"
          className="wireframe-sidebar__action-btn"
          onClick={handleToggleAll}
          title={isAllExpanded ? 'Thu gọn tất cả' : 'Mở rộng tất cả'}
          aria-label={isAllExpanded ? 'Thu gọn tất cả' : 'Mở rộng tất cả'}
        >
          {isAllExpanded ? <FoldVertical size={13} /> : <ChevronsUpDown size={13} />}
          <span>{isAllExpanded ? 'Thu gọn' : 'Tất cả'}</span>
        </button>
      </div>

      {/* Search Bar - Flush & zero top margin */}
      <div className="wireframe-sidebar__search">
        <div className="wireframe-sidebar__search-inner">
          <Search size={14} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm nghiệp vụ hoặc mã màn (OWN-01...)"
            className="wireframe-sidebar__search-input"
          />
        </div>
      </div>

      {/* Grouped Initiative & Screen Tree */}
      <div className="wireframe-sidebar__content">
        {filteredGroups.map((group) => {
          if (group.items.length === 0) return null;
          const isSearching = !!searchQuery.trim();
          // A group is open if searching, all expanded, or is the single open group
          const isGroupOpen = isSearching || isAllExpanded || openGroupKey === group.key;

          return (
            <div key={group.key} className="wireframe-sidebar__group">
              {/* Collapsible Group Header Button */}
              <button
                type="button"
                className={`wireframe-sidebar__group-title ${isGroupOpen ? 'wireframe-sidebar__group-title--open' : ''}`}
                onClick={() => handleGroupToggle(group.key)}
                title="Nhấn để đóng/mở nhóm nghiệp vụ này"
              >
                <span className="wireframe-sidebar__group-label">
                  <span className="wireframe-sidebar__group-icon">{group.icon}</span>
                  <span>{group.label}</span>
                </span>
                <span className="wireframe-sidebar__group-meta">
                  <span className="wireframe-sidebar__group-count">{group.items.length}</span>
                  <ChevronRight
                    size={13}
                    className={`wireframe-sidebar__group-chevron ${isGroupOpen ? 'wireframe-sidebar__group-chevron--open' : ''}`}
                  />
                </span>
              </button>

              {/* Group Initiatives (Accordion items) */}
              {isGroupOpen && (
                <div className="wireframe-sidebar__init-list">
                  {group.items.map((init) => {
                    // An initiative card is open if searching, all expanded, or is the single open initiative
                    const isCardOpen = isSearching || isAllExpanded || openInitiativeId === init.id;
                    const isSelected = activeInitiative.id === init.id;

                    return (
                      <div key={init.id} className="wireframe-sidebar__init-card">
                        {/* Initiative Card Header Button */}
                        <button
                          type="button"
                          className={`wireframe-sidebar__init-item ${isSelected ? 'wireframe-sidebar__init-item--active' : ''}`}
                          onClick={() => handleInitiativeToggle(init.id, group.key)}
                        >
                          <div className="wireframe-sidebar__init-row">
                            <span className="wireframe-sidebar__init-title">{init.title}</span>
                            <ChevronRight
                              size={14}
                              className={`wireframe-sidebar__init-chevron ${isCardOpen ? 'wireframe-sidebar__init-chevron--open' : ''}`}
                              style={{
                                color: isSelected ? 'var(--color-primary)' : 'var(--color-text-subtle)',
                              }}
                            />
                          </div>
                          <div className="wireframe-sidebar__init-meta">
                            <span>{init.screens.length} màn hình</span>
                            <span>•</span>
                            <span>{init.id}</span>
                          </div>
                        </button>

                        {/* Screens under initiative - Collapsible sub-tree */}
                        {isCardOpen && (
                          <div className="wireframe-sidebar__screens">
                            {init.screens.map((screen) => {
                              const isScreenActive = activeScreen.id === screen.id;
                              return (
                                <button
                                  key={screen.id}
                                  type="button"
                                  className={`wireframe-sidebar__screen-item ${isScreenActive ? 'wireframe-sidebar__screen-item--active' : ''}`}
                                  onClick={() => {
                                    selectScreen(screen.id);
                                    if (openInitiativeId !== init.id) {
                                      setOpenInitiativeId(init.id);
                                      setOpenGroupKey(group.key);
                                      selectInitiative(init.id);
                                    }
                                  }}
                                >
                                  <span className="wireframe-sidebar__screen-code">{screen.id}</span>
                                  <span className="wireframe-sidebar__screen-title">
                                    {screen.title}
                                  </span>
                                  <Badge
                                    variant={getEnvBadgeVariant(screen.environment) as any}
                                    style={{ fontSize: '9px', padding: '1px 4px' }}
                                  >
                                    {getEnvShortLabel(screen.environment)}
                                  </Badge>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
