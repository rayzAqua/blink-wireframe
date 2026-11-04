import React, { useState, useEffect } from 'react';
import {
  Search,
  Building2,
  ShieldCheck,
  ChevronRight,
  FolderTree,
  FoldVertical,
  ChevronsUpDown,
  X,
} from 'lucide-react';
import { useSelection, useWorkspace } from '../workspace';
import { ROLES } from '../../content/roles';
import type { RoleId } from '../../domain/types';
import './Sidebar.css';

export const Sidebar: React.FC = () => {
  const { flows, activeFlow, activeScreen, selectFlow, selectScreen } = useSelection();
  const { isSidebarOpen, setIsSidebarOpen } = useWorkspace();
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Accordion state: only 1 domain group and 1 flow/initiative open at a time
  const [openGroupKey, setOpenGroupKey] = useState<string | null>(activeFlow.role);
  const [openInitiativeId, setOpenInitiativeId] = useState<string | null>(activeFlow.id);
  const [isAllExpanded, setIsAllExpanded] = useState<boolean>(false);

  // Sync open states when activeFlow changes
  useEffect(() => {
    setOpenGroupKey(activeFlow.role);
    setOpenInitiativeId(activeFlow.id);
  }, [activeFlow.id, activeFlow.role]);

  const ROLE_ICONS: Record<RoleId, React.ReactNode> = {
    'karaoke-owner': <Building2 size={14} />,
    'blink-admin': <ShieldCheck size={14} />,
  };

  const domainGroups = ROLES.map((role) => ({
    key: role.id,
    label: role.label,
    icon: ROLE_ICONS[role.id],
    items: flows.filter((i) => i.role === role.id),
  }));

  // Accordion toggle for Domain Groups
  const handleGroupToggle = (groupKey: string) => {
    if (isAllExpanded) {
      setIsAllExpanded(false);
      setOpenGroupKey(openGroupKey === groupKey ? null : groupKey);
      return;
    }
    setOpenGroupKey((prev) => (prev === groupKey ? null : groupKey));
  };

  // Accordion toggle for Flows/Initiatives
  const handleInitiativeToggle = (initId: string, groupKey: string) => {
    if (openInitiativeId === initId) {
      // Toggle to close currently open card
      setOpenInitiativeId(null);
    } else {
      // Open this card and close any other open card
      setOpenInitiativeId(initId);
      setOpenGroupKey(groupKey);
      selectFlow(initId);
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

  return (
    <aside
      className={`wireframe-sidebar ${isSidebarOpen ? 'wireframe-sidebar--open' : 'wireframe-sidebar--closed'}`}
      aria-label="Danh mục luồng nghiệp vụ"
    >
      {/* Sidebar Header: Compact title & accordion controls */}
      <div className="wireframe-sidebar__header">
        <div className="wireframe-sidebar__header-left">
          <FolderTree size={14} style={{ color: 'var(--color-primary)' }} />
          <span className="wireframe-sidebar__header-title">Danh Sách Luồng</span>
        </div>
        <div className="wireframe-sidebar__header-right">
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
          <button
            type="button"
            className="wireframe-sidebar__close-btn"
            onClick={() => setIsSidebarOpen(false)}
            title="Đóng thanh điều hướng"
            aria-label="Đóng thanh điều hướng"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="wireframe-sidebar__search">
        <div className="wireframe-sidebar__search-inner">
          <Search size={14} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm tên luồng nghiệp vụ..."
            className="wireframe-sidebar__search-input"
          />
        </div>
      </div>

      {/* Grouped Flows & Screen Tree */}
      <div className="wireframe-sidebar__content">
        {filteredGroups.map((group) => {
          if (group.items.length === 0) return null;
          const isSearching = !!searchQuery.trim();
          const isGroupOpen = isSearching || isAllExpanded || openGroupKey === group.key;

          return (
            <div key={group.key} className="wireframe-sidebar__group">
              {/* Group Category Header */}
              <button
                type="button"
                className={`wireframe-sidebar__group-title ${isGroupOpen ? 'wireframe-sidebar__group-title--open' : ''}`}
                onClick={() => handleGroupToggle(group.key)}
                title="Nhấn để đóng/mở nhóm luồng này"
              >
                <span className="wireframe-sidebar__group-label">
                  <span className="wireframe-sidebar__group-icon">{group.icon}</span>
                  <span>{group.label}</span>
                </span>
                <ChevronRight
                  size={13}
                  className={`wireframe-sidebar__group-chevron ${isGroupOpen ? 'wireframe-sidebar__group-chevron--open' : ''}`}
                />
              </button>

              {/* Flows under group (Clean & minimal) */}
              {isGroupOpen && (
                <div className="wireframe-sidebar__init-list">
                  {group.items.map((init) => {
                    const isCardOpen = isSearching || isAllExpanded || openInitiativeId === init.id;
                    const isSelected = activeFlow.id === init.id;
                    const flowIndex = flows.findIndex((i) => i.id === init.id) + 1;
                    const formattedIndex = String(flowIndex).padStart(2, '0');

                    return (
                      <div key={init.id} className="wireframe-sidebar__init-card">
                        {/* Flow Item - Displays numbered index and flow title */}
                        <button
                          type="button"
                          className={`wireframe-sidebar__init-item ${isSelected ? 'wireframe-sidebar__init-item--active' : ''}`}
                          onClick={() => handleInitiativeToggle(init.id, group.key)}
                          title={`Luồng ${formattedIndex}: ${init.title}`}
                        >
                          <div className="wireframe-sidebar__init-title-group">
                            <span className="wireframe-sidebar__init-index">{formattedIndex}</span>
                            <span className="wireframe-sidebar__init-title">{init.title}</span>
                          </div>
                          <ChevronRight
                            size={14}
                            className={`wireframe-sidebar__init-chevron ${isCardOpen ? 'wireframe-sidebar__init-chevron--open' : ''}`}
                          />
                        </button>

                        {/* Screens under flow - Collapsible sub-tree */}
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
                                      selectFlow(init.id);
                                    }
                                  }}
                                  title={`${screen.id} • ${screen.title}`}
                                >
                                  <span className="wireframe-sidebar__screen-code">{screen.id}</span>
                                  <span className="wireframe-sidebar__screen-title">
                                    {screen.title}
                                  </span>
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
