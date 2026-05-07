import React from 'react';
import '../styles/Sidebar.css';
import { Menu, BarChart3, BookOpen, Lightbulb, Settings as SettingsIcon } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, onToggle }) => {
  const menuItems = [
    { id: 'analysis', label: 'Analysis Board', icon: BarChart3 },
    { id: 'games', label: 'Game Analyzer', icon: BookOpen },
    { id: 'openings', label: 'Opening Explorer', icon: BookOpen },
    { id: 'puzzles', label: 'Puzzle Mode', icon: Lightbulb },
    { id: 'settings', label: 'Settings', icon: SettingsIcon }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>ChessDaddy</h1>
        <button className="toggle-btn" onClick={onToggle}>
          <Menu size={24} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => onViewChange(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <p className="version">v1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;