import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useFetch from '../../hooks/useFetch';
import Modal from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import api from '../../utils/api';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { formatDate } from '../../utils/helpers';

const emptyForm = { institution: '', degree: '', field: '', startDate: '', endDate: '', grade: '', description: '' };

export default function AdminEducation() {
  const { data: educations, loading, refetch } = useFetch('/educations');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const { addToast } = useToast();

  const openCreate = () => { setForm(emptyForm); setEditing(null); setModal(true); };
  const openEdit = (e) => { setForm({ ...e, startDate: e.startDate?.split('T')[0] || '', endDate: e.endDate?.split('T')[0] || '' }); setEditing(e._id); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { institution: form.institution, degree: form.degree, field: form.field, startDate: form.startDate, endDate: form.endDate, grade: form.grade, description: form.description };
      if (editing) { await api.put(`/educations/${editing}`, payload); addToast('Updated', 'success'); }
      else { await api.post('/educations', payload); addToast('Created', 'success'); }
      setModal(false); refetch();
    } catch (err) { addToast(err.response?.data?.message || 'Error', 'error'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try { await api.delete(`/educations/${id}`); addToast('Deleted', 'success'); refetch(); }
    catch (err) { addToast(err.response?.data?.message || 'Error', 'error'); }
  };

  return (
    <>
      <Helmet><title>Education | Admin</title></Helmet>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Education</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-medium transition-all"><FiPlus size={16} /> Add Education</button>
      </div>
      {loading ? <div className="text-center py-12 text-dark-400">Loading...</div> : (
        <div className="space-y-4">
          {educations?.map(e => (
            <div key={e._id} className="glass rounded-2xl p-5 border border-white/5 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold">{e.degree} in {e.field}</h3>
                <p className="text-sm text-primary-400">{e.institution}</p>
                <p className="text-xs text-dark-400">{formatDate(e.startDate)} - {e.endDate ? formatDate(e.endDate) : 'Present'}{e.grade ? ` | ${e.grade}` : ''}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(e)} className="p-2 rounded-lg text-dark-400 hover:text-primary-400"><FiEdit2 size={16} /></button>
                <button onClick={() => handleDelete(e._id)} className="p-2 rounded-lg text-dark-400 hover:text-red-400"><FiTrash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Education' : 'Add Education'} size="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-dark-300 mb-1">Institution</label><input type="text" value={form.institution} onChange={e => setForm({ ...form, institution: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" required /></div>
            <div><label className="block text-sm font-medium text-dark-300 mb-1">Degree</label><input type="text" value={form.degree} onChange={e => setForm({ ...form, degree: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" required /></div>
          </div>
          <div><label className="block text-sm font-medium text-dark-300 mb-1">Field of Study</label><input type="text" value={form.field} onChange={e => setForm({ ...form, field: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" required /></div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div><label className="block text-sm font-medium text-dark-300 mb-1">Start Date</label><input type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" required /></div>
            <div><label className="block text-sm font-medium text-dark-300 mb-1">End Date</label><input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" /></div>
            <div><label className="block text-sm font-medium text-dark-300 mb-1">Grade</label><input type="text" value={form.grade} onChange={e => setForm({ ...form, grade: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" placeholder="3.8 GPA" /></div>
          </div>
          <div><label className="block text-sm font-medium text-dark-300 mb-1">Description</label><textarea rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50 resize-none" /></div>
          <button type="submit" className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-medium transition-all">{editing ? 'Update' : 'Add'} Education</button>
        </form>
      </Modal>
    </>
  );
}
