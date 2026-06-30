import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useFetch from '../../hooks/useFetch';
import Modal from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import api from '../../utils/api';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { formatDate } from '../../utils/helpers';

const emptyForm = { title: '', organization: '', issueDate: '', credentialId: '', credentialUrl: '' };

export default function AdminCertificates() {
  const { data: certs, loading, refetch } = useFetch('/certificates');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const { addToast } = useToast();

  const openCreate = () => { setForm(emptyForm); setEditing(null); setModal(true); };
  const openEdit = (c) => { setForm({ ...c, issueDate: c.issueDate?.split('T')[0] || '' }); setEditing(c._id); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { title: form.title, organization: form.organization, issueDate: form.issueDate, credentialId: form.credentialId, credentialUrl: form.credentialUrl };
      if (editing) { await api.put(`/certificates/${editing}`, payload); addToast('Updated', 'success'); }
      else { await api.post('/certificates', payload); addToast('Created', 'success'); }
      setModal(false); refetch();
    } catch (err) { addToast(err.response?.data?.message || 'Error', 'error'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try { await api.delete(`/certificates/${id}`); addToast('Deleted', 'success'); refetch(); }
    catch (err) { addToast(err.response?.data?.message || 'Error', 'error'); }
  };

  return (
    <>
      <Helmet><title>Certificates | Admin</title></Helmet>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Certificates</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-medium transition-all"><FiPlus size={16} /> Add Certificate</button>
      </div>
      {loading ? <div className="text-center py-12 text-dark-400">Loading...</div> : (
        <div className="space-y-4">
          {certs?.map(c => (
            <div key={c._id} className="glass rounded-2xl p-5 border border-white/5 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{c.title}</h3>
                <p className="text-sm text-primary-400">{c.organization}</p>
                <p className="text-xs text-dark-400">{formatDate(c.issueDate)}{c.credentialId ? ` | ${c.credentialId}` : ''}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(c)} className="p-2 rounded-lg text-dark-400 hover:text-primary-400"><FiEdit2 size={16} /></button>
                <button onClick={() => handleDelete(c._id)} className="p-2 rounded-lg text-dark-400 hover:text-red-400"><FiTrash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Certificate' : 'Add Certificate'} size="max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-sm font-medium text-dark-300 mb-1">Certificate Title</label><input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" required /></div>
          <div><label className="block text-sm font-medium text-dark-300 mb-1">Organization</label><input type="text" value={form.organization} onChange={e => setForm({ ...form, organization: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" required /></div>
          <div><label className="block text-sm font-medium text-dark-300 mb-1">Issue Date</label><input type="date" value={form.issueDate} onChange={e => setForm({ ...form, issueDate: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" required /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-dark-300 mb-1">Credential ID</label><input type="text" value={form.credentialId} onChange={e => setForm({ ...form, credentialId: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" /></div>
            <div><label className="block text-sm font-medium text-dark-300 mb-1">Credential URL</label><input type="url" value={form.credentialUrl} onChange={e => setForm({ ...form, credentialUrl: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" /></div>
          </div>
          <button type="submit" className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-medium transition-all">{editing ? 'Update' : 'Add'} Certificate</button>
        </form>
      </Modal>
    </>
  );
}
