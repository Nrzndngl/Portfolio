import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../../utils/api';
import { useToast } from '../../context/ToastContext';

export default function AdminProfile() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    api.get('/profile').then(res => { setForm(res.data); setLoading(false); }).catch(() => { setError('Failed to load profile'); setLoading(false); });
  }, []);

  const handleChange = (e) => { const { name, value } = e.target; setForm(prev => (prev ? { ...prev, [name]: value } : prev)); };
  const handleSocialChange = (e) => { const { name, value } = e.target; setForm(prev => (prev ? { ...prev, socialLinks: { ...prev.socialLinks, [name]: value } } : prev)); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.put('/profile', form);
      addToast('Profile updated', 'success');
    } catch (err) { addToast(err.response?.data?.message || 'Error', 'error'); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="text-center py-12 text-dark-400">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-400">{error}</div>;

  return (
    <>
      <Helmet><title>Profile | Admin</title></Helmet>
      <h1 className="text-2xl font-bold mb-8">Profile</h1>
      {form && (
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 border border-white/5 space-y-6 max-w-3xl">
          <div className="grid sm:grid-cols-2 gap-5">
            <div><label className="block text-sm font-medium text-dark-300 mb-1">Name</label><input type="text" name="name" value={form.name} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" /></div>
            <div><label className="block text-sm font-medium text-dark-300 mb-1">Title</label><input type="text" name="title" value={form.title} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" /></div>
          </div>
          <div><label className="block text-sm font-medium text-dark-300 mb-1">Bio</label><textarea rows={4} name="bio" value={form.bio} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50 resize-none" /></div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div><label className="block text-sm font-medium text-dark-300 mb-1">Location</label><input type="text" name="location" value={form.location} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" /></div>
            <div><label className="block text-sm font-medium text-dark-300 mb-1">Email</label><input type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" /></div>
          </div>
          <div><label className="block text-sm font-medium text-dark-300 mb-1">Resume URL</label><input type="url" name="resumeUrl" value={form.resumeUrl} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" /></div>
          <div><h3 className="text-sm font-semibold text-dark-300 mb-3">Social Links</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {['github', 'linkedin', 'twitter', 'instagram', 'website', 'leetcode'].map(social => (
                <div key={social}><label className="block text-xs font-medium text-dark-400 mb-1 capitalize">{social}</label><input type="url" name={social} value={form.socialLinks?.[social] || ''} onChange={handleSocialChange} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary-500/50" /></div>
              ))}
            </div>
          </div>
          <button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-all">{saving ? 'Saving...' : 'Save Profile'}</button>
        </form>
      )}
    </>
  );
}
