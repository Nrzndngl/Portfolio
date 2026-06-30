import { Helmet } from 'react-helmet-async';
import useFetch from '../../hooks/useFetch';
import { useToast } from '../../context/ToastContext';
import api from '../../utils/api';
import { FiTrash2, FiMail } from 'react-icons/fi';
import { formatFullDate } from '../../utils/helpers';

export default function AdminMessages() {
  const { data: messages, loading, refetch } = useFetch('/messages');
  const { addToast } = useToast();

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    try { await api.delete(`/messages/${id}`); addToast('Deleted', 'success'); refetch(); }
    catch (err) { addToast('Error deleting', 'error'); }
  };

  const handleMarkRead = async (id) => {
    try { await api.put(`/messages/${id}/read`); refetch(); }
    catch (err) { addToast('Error', 'error'); }
  };

  return (
    <>
      <Helmet><title>Messages | Admin</title></Helmet>
      <h1 className="text-2xl font-bold mb-8">Contact Messages</h1>
      {loading ? <div className="text-center py-12 text-dark-400">Loading...</div> : (
        <div className="space-y-4">
          {messages?.length === 0 && <p className="text-center text-dark-400 py-12">No messages yet.</p>}
          {messages?.map(m => (
            <div key={m._id} className={`glass rounded-2xl p-5 border transition-all ${m.read ? 'border-white/5' : 'border-primary-500/30 bg-primary-500/5'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0" onClick={() => !m.read && handleMarkRead(m._id)}>
                  <div className="flex items-center gap-2 mb-1">
                    <FiMail className={m.read ? 'text-dark-500' : 'text-primary-400'} size={14} />
                    <h3 className="font-semibold truncate">{m.name}</h3>
                    {!m.read && <span className="w-2 h-2 rounded-full bg-primary-500" />}
                  </div>
                  <p className="text-sm text-primary-400 mb-1">{m.subject}</p>
                  <p className="text-sm text-dark-300 mb-2">{m.message}</p>
                  <p className="text-xs text-dark-500">{m.email} • {formatFullDate(m.createdAt)}</p>
                </div>
                <button onClick={() => handleDelete(m._id)} className="p-2 rounded-lg text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0"><FiTrash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
