import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useFetch from '../../hooks/useFetch';
import Modal from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import api from '../../utils/api';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { formatDate } from '../../utils/helpers';

const emptyForm = { company: '', position: '', startDate: '', endDate: '', current: false, description: '', location: '', responsibilities: '' };

export default function AdminExperience() {
  const { data: experiences, loading, refetch } = useFetch('/experiences');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const { addToast } = useToast();

  const openCreate = () => { setForm(emptyForm); setEditing(null); setModal(true); };
  const openEdit = (e) => { setForm({ ...e, startDate: e.startDate?.split('T')[0] || '', endDate: e.endDate?.split('T')[0] || '', responsibilities: e.responsibilities?.join('\n') || '' }); setEditing(e._id); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { company: form.company, position: form.position, startDate: form.startDate, endDate: form.endDate, current: form.current, description: form.description, location: form.location, responsibilities: form.responsibilities.split('\n').filter(Boolean) };
    try {
      if (editing) { await api.put(`/experiences/${editing}`, payload); addToast('Experience updated', 'success'); }
      else { await api.post('/experiences', payload); addToast('Experience created', 'success'); }
      setModal(false); refetch();
    } catch (err) { addToast(err.response?.data?.message || 'Error', 'error'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try { await api.delete(`/experiences/${id}`); addToast('Deleted', 'success'); refetch(); }
    catch (err) { addToast(err.response?.data?.message || 'Error', 'error'); }
  };

  return (
    <>
      <Helmet><title>Experience | Admin</title></Helmet>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Experience</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-medium transition-all"><FiPlus size={16} /> Add Experience</button>
      </div>
      {loading ? <div className="text-center py-12 text-dark-400">Loading...</div> : (
        <div className="space-y-4">
          {experiences?.map(e => (
            <div key={e._id} className="glass rounded-2xl p-5 border border-white/5 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold">{e.position}</h3>
                <p className="text-sm text-primary-400">{e.company}</p>
                <p className="text-xs text-dark-400">{formatDate(e.startDate)} - {e.current ? 'Present' : formatDate(e.endDate)}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(e)} className="p-2 rounded-lg text-dark-400 hover:text-primary-400"><FiEdit2 size={16} /></button>
                <button onClick={() => handleDelete(e._id)} className="p-2 rounded-lg text-dark-400 hover:text-red-400"><FiTrash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Experience' : 'Add Experience'} size="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-dark-300 mb-1">Company</label><input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" required /></div>
            <div><label className="block text-sm font-medium text-dark-300 mb-1">Position</label><input type="text" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" required /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-dark-300 mb-1">Start Date</label><input type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" required /></div>
            <div><label className="block text-sm font-medium text-dark-300 mb-1">End Date</label><div className="flex items-center gap-3"><input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} disabled={form.current} className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50 disabled:opacity-50" /><label className="flex items-center gap-1.5 text-sm text-dark-300"><input type="checkbox" checked={form.current} onChange={e => setForm({ ...form, current: e.target.checked, endDate: '' })} className="rounded bg-white/5 border-white/10 text-primary-600" /> Current</label></div></div>
          </div>
          <div><label className="block text-sm font-medium text-dark-300 mb-1">Location</label><input type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" /></div>
          <div><label className="block text-sm font-medium text-dark-300 mb-1">Description</label><textarea rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50 resize-none" /></div>
          <div><label className="block text-sm font-medium text-dark-300 mb-1">Responsibilities (one per line)</label><textarea rows={4} value={form.responsibilities} onChange={e => setForm({ ...form, responsibilities: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50 resize-none" /></div>
          <button type="submit" className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-medium transition-all">{editing ? 'Update' : 'Add'} Experience</button>
        </form>
      </Modal>
    </>
  );
}
