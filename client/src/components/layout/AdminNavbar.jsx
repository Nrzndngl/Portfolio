import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function AdminNavbar({ onToggleSidebar, sidebarOpen }) {
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 glass-dark border-b border-white/5">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg text-dark-300 hover:text-white hover:bg-white/5 transition-all"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
          <Link to="/admin" className="text-lg font-bold gradient-text">
            Admin Panel
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-dark-400 hidden sm:block">
            {user?.name || 'Admin'}
          </span>
        </div>
      </div>
    </nav>
  );
}