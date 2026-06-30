import { Helmet } from 'react-helmet-async';
import { FiFolder, FiCode, FiBriefcase, FiMessageSquare } from 'react-icons/fi';
import useFetch from '../../hooks/useFetch';

export default function AdminDashboard() {
  const { data: projects } = useFetch('/projects');
  const { data: skills } = useFetch('/skills');
  const { data: experiences } = useFetch('/experiences');
  const { data: messages } = useFetch('/messages');

  const stats = [
    { label: 'Projects', value: projects?.length || 0, icon: FiFolder, color: 'from-blue-500 to-cyan-500' },
    { label: 'Skills', value: skills?.length || 0, icon: FiCode, color: 'from-purple-500 to-pink-500' },
    { label: 'Experience', value: experiences?.length || 0, icon: FiBriefcase, color: 'from-orange-500 to-red-500' },
    { label: 'Messages', value: messages?.length || 0, icon: FiMessageSquare, color: 'from-green-500 to-teal-500' },
  ];

  const totalSkills = skills?.reduce((acc, s) => acc + (s.items?.length || 0), 0) || 0;
  const unreadMessages = messages?.filter(m => !m.read)?.length || 0;

  return (
    <>
      <Helmet><title>Dashboard | Admin</title></Helmet>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="glass rounded-2xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="text-white" size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-dark-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6 border border-white/5">
          <h2 className="text-lg font-semibold mb-4">Quick Info</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm"><span className="text-dark-400">Total Skills</span><span>{totalSkills}</span></div>
            <div className="flex justify-between text-sm"><span className="text-dark-400">Unread Messages</span><span className={unreadMessages > 0 ? 'text-primary-400' : ''}>{unreadMessages}</span></div>
            <div className="flex justify-between text-sm"><span className="text-dark-400">Workplaces</span><span>{experiences?.length || 0}</span></div>
          </div>
        </div>
        <div className="glass rounded-2xl p-6 border border-white/5">
          <h2 className="text-lg font-semibold mb-4">Recent Messages</h2>
          {messages?.slice(0, 3).map(msg => (
            <div key={msg._id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
              <div className={`w-2 h-2 rounded-full ${msg.read ? 'bg-dark-500' : 'bg-primary-500'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{msg.name}</p>
                <p className="text-xs text-dark-400 truncate">{msg.subject}</p>
              </div>
            </div>
          )) || <p className="text-dark-400 text-sm">No messages yet.</p>}
        </div>
      </div>
    </>
  );
}
