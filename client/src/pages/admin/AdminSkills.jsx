import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useFetch from '../../hooks/useFetch';
import Modal from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import api from '../../utils/api';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

export default function AdminSkills() {
  const { data: skills, loading, refetch } = useFetch('/skills');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ category: '', name: '', level: 50 });
  const { addToast } = useToast();

  const openCreate = () => { setForm({ category: '', name: '', level: 50 }); setEditing(null); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        const skill = skills.find(s => s._id === editing);
        if (skill.category === form.category) {
          const updatedItems = skill.items.map(item => item._id === form.itemId ? { ...item, name: form.name, level: form.level } : item);
          await api.put(`/skills/${editing}`, { category: skill.category, items: updatedItems });
        } else {
          await api.put(`/skills/${editing}`, { category: skill.category, items: skill.items.filter(i => i._id !== form.itemId) });
          let target = skills.find(s => s.category === form.category);
          if (target) {
            await api.put(`/skills/${target._id}`, { category: form.category, items: [...target.items, { name: form.name, level: form.level }] });
          } else {
            await api.post('/skills', { category: form.category, items: [{ name: form.name, level: form.level }] });
          }
        }
        addToast('Skill updated', 'success');
      } else {
        let existing = skills.find(s => s.category === form.category);
        if (existing) {
          await api.put(`/skills/${existing._id}`, { category: existing.category, items: [...existing.items, { name: form.name, level: form.level }] });
        } else {
          await api.post('/skills', { category: form.category, items: [{ name: form.name, level: form.level }] });
        }
        addToast('Skill added', 'success');
      }
      setModal(false); refetch();
    } catch (err) { addToast(err.response?.data?.message || 'Error', 'error'); }
  };

  const handleDelete = async (skillId, itemId) => {
    if (!confirm('Delete this skill?')) return;
    try {
      const skill = skills.find(s => s._id === skillId);
      if (skill.items.length === 1) {
        await api.delete(`/skills/${skillId}`);
      } else {
        await api.put(`/skills/${skillId}`, { category: skill.category, items: skill.items.filter(i => i._id !== itemId) });
      }
      addToast('Skill deleted', 'success'); refetch();
    } catch (err) { addToast(err.response?.data?.message || 'Error', 'error'); }
  };

  const openEdit = (skillId, item) => { setEditing(skillId); setForm({ category: skills.find(s => s._id === skillId)?.category || '', name: item.name, level: item.level, itemId: item._id }); setModal(true); };

  return (
    <>
      <Helmet><title>Skills | Admin</title></Helmet>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Skills</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-medium transition-all"><FiPlus size={16} /> Add Skill</button>
      </div>
      {loading ? <div className="text-center py-12 text-dark-400">Loading...</div> : (
        <div className="grid md:grid-cols-2 gap-6">
          {skills?.map(s => (
            <div key={s._id} className="glass rounded-2xl p-5 border border-white/5">
              <h3 className="font-semibold mb-4 text-primary-400">{s.category}</h3>
              <div className="space-y-3">
                {s.items?.map(item => (
                  <div key={item._id} className="flex items-center justify-between group">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1"><span>{item.name}</span><span className="text-primary-400 font-mono">{item.level}%</span></div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full" style={{ width: `${item.level}%` }} /></div>
                    </div>
                    <div className="flex gap-1 ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(s._id, item)} className="p-1.5 rounded text-dark-400 hover:text-primary-400"><FiEdit2 size={14} /></button>
                      <button onClick={() => handleDelete(s._id, item)} className="p-1.5 rounded text-dark-400 hover:text-red-400"><FiTrash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Skill' : 'Add Skill'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-sm font-medium text-dark-300 mb-1">Category</label><input type="text" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" placeholder="Frontend, Backend, ..." required /></div>
          <div><label className="block text-sm font-medium text-dark-300 mb-1">Skill Name</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" placeholder="React" required /></div>
          <div><label className="block text-sm font-medium text-dark-300 mb-1">Level ({form.level}%)</label><input type="range" min={0} max={100} value={form.level} onChange={e => setForm({ ...form, level: parseInt(e.target.value) })} className="w-full accent-primary-500" /></div>
          <button type="submit" className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-medium transition-all">{editing ? 'Update' : 'Add'} Skill</button>
        </form>
      </Modal>
    </>
  );
}
