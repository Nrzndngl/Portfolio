import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useFetch from '../../hooks/useFetch';
import Modal from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import api from '../../utils/api';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

const emptyForm = { title: '', description: '', technologies: '', githubLink: '', liveDemo: '', category: 'Full Stack', featured: false, completionDate: '' };

export default function AdminProjects() {
  const { data: projects, loading, refetch } = useFetch('/projects');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const { addToast } = useToast();

  const openCreate = () => { setForm(emptyForm); setEditing(null); setModal(true); };
  const openEdit = (p) => { setForm({ ...p, technologies: p.technologies?.join(', ') || '' }); setEditing(p._id); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title: form.title, description: form.description, technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean), githubLink: form.githubLink, liveDemo: form.liveDemo, category: form.category, featured: form.featured, completionDate: form.completionDate, images: form.images || [] };
    try {
      if (editing) { await api.put(`/projects/${editing}`, payload); addToast('Project updated', 'success'); }
      else { await api.post('/projects', payload); addToast('Project created', 'success'); }
      setModal(false); refetch();
    } catch (err) { addToast(err.response?.data?.message || 'Error', 'error'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try { await api.delete(`/projects/${id}`); addToast('Project deleted', 'success'); refetch(); }
    catch (err) { addToast(err.response?.data?.message || 'Error', 'error'); }
  };

  return (
    <>
      <Helmet><title>Projects | Admin</title></Helmet>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-medium transition-all"><FiPlus size={16} /> Add Project</button>
      </div>
      {loading ? <div className="text-center py-12 text-dark-400">Loading...</div> : (
        <div className="grid gap-4">
          {projects?.map(p => (
            <div key={p._id} className="glass rounded-2xl p-5 border border-white/5 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold truncate">{p.title}</h3>
                  {p.featured && <span className="px-2 py-0.5 bg-primary-500/20 text-primary-400 text-xs rounded-full">Featured</span>}
                </div>
                <p className="text-dark-400 text-sm truncate">{p.category} • {p.technologies?.join(', ')}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(p)} className="p-2 rounded-lg text-dark-400 hover:text-primary-400 hover:bg-primary-500/10 transition-all"><FiEdit2 size={16} /></button>
                <button onClick={() => handleDelete(p._id)} className="p-2 rounded-lg text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-all"><FiTrash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Project' : 'Add Project'} size="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-dark-300 mb-1">Title</label><input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" required /></div>
            <div><label className="block text-sm font-medium text-dark-300 mb-1">Category</label><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50"><option>Full Stack</option><option>Frontend</option><option>Backend</option><option>Mobile</option></select></div>
          </div>
          <div><label className="block text-sm font-medium text-dark-300 mb-1">Description</label><textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50 resize-none" required /></div>
          <div><label className="block text-sm font-medium text-dark-300 mb-1">Technologies (comma separated)</label><input type="text" value={form.technologies} onChange={e => setForm({ ...form, technologies: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" placeholder="React, Node.js, MongoDB" /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-dark-300 mb-1">GitHub Link</label><input type="url" value={form.githubLink} onChange={e => setForm({ ...form, githubLink: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" /></div>
            <div><label className="block text-sm font-medium text-dark-300 mb-1">Live Demo</label><input type="url" value={form.liveDemo} onChange={e => setForm({ ...form, liveDemo: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" /></div>
          </div>
          <div><label className="block text-sm font-medium text-dark-300 mb-1">Image URL</label><input type="url" value={form.images?.[0] || ''} onChange={e => setForm({ ...form, images: e.target.value ? [e.target.value] : [] })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" placeholder="https://example.com/image.jpg" /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-dark-300 mb-1">Completion Date</label><input type="date" value={form.completionDate ? form.completionDate.split('T')[0] : ''} onChange={e => setForm({ ...form, completionDate: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" /></div>
            <div className="flex items-center gap-2 pt-7"><input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="rounded bg-white/5 border-white/10 text-primary-600" /><label htmlFor="featured" className="text-sm text-dark-300">Featured project</label></div>
          </div>
          <button type="submit" className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-medium transition-all">{editing ? 'Update' : 'Create'} Project</button>
        </form>
      </Modal>
    </>
  );
}
