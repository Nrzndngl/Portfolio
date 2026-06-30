import { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminNavbar from '../../components/layout/AdminNavbar';
import { FiGrid, FiFolder, FiCode, FiBriefcase, FiBookOpen, FiAward, FiMessageSquare, FiUser, FiLogOut, FiX } from 'react-icons/fi';

const sidebarLinks = [
  { label: 'Dashboard', icon: FiGrid, path: '/admin' },
  { label: 'Projects', icon: FiFolder, path: '/admin/projects' },
  { label: 'Skills', icon: FiCode, path: '/admin/skills' },
  { label: 'Experience', icon: FiBriefcase, path: '/admin/experience' },
  { label: 'Education', icon: FiBookOpen, path: '/admin/education' },
  { label: 'Certificates', icon: FiAward, path: '/admin/certificates' },
  { label: 'Messages', icon: FiMessageSquare, path: '/admin/messages' },
  { label: 'Profile', icon: FiUser, path: '/admin/profile' },
];

export default function AdminLayout() {
  const { isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate('/admin/login');
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" /></div>;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen pt-16">
      <AdminNavbar onToggleSidebar={() => setSidebarOpen(prev => !prev)} sidebarOpen={sidebarOpen} />

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex flex-col w-64 h-[calc(100vh-4rem)] sticky top-16 border-r border-white/5 p-4 gap-1">
          {sidebarLinks.map(link => (
            <Link key={link.path} to={link.path} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${location.pathname === link.path ? 'bg-primary-600/20 text-primary-400' : 'text-dark-300 hover:text-white hover:bg-white/5'}`}>
              <link.icon size={18} />
              {link.label}
            </Link>
          ))}
          <div className="flex-1" />
          <button onClick={logout} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all">
            <FiLogOut size={18} /> Logout
          </button>
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <aside className="relative w-64 h-full glass-dark border-r border-white/5 p-4 pt-6 flex flex-col gap-1 overflow-y-auto">
              <div className="flex items-center justify-between mb-4 px-4">
                <span className="text-sm font-semibold text-dark-400 uppercase tracking-wider">Navigation</span>
                <button onClick={() => setSidebarOpen(false)} className="p-1 rounded text-dark-400 hover:text-white">
                  <FiX size={18} />
                </button>
              </div>
              {sidebarLinks.map(link => (
                <Link key={link.path} to={link.path} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${location.pathname === link.path ? 'bg-primary-600/20 text-primary-400' : 'text-dark-300 hover:text-white hover:bg-white/5'}`}>
                  <link.icon size={18} />
                  {link.label}
                </Link>
              ))}
              <div className="flex-1" />
              <button onClick={logout} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all mt-2">
                <FiLogOut size={18} /> Logout
              </button>
            </aside>
          </div>
        )}

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
