import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import api from '../../utils/api';
import { useToast } from '../../context/ToastContext';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [ref, isVisible] = useScrollAnimation(0.1);
  const { addToast } = useToast();

  useEffect(() => {
    api.get('/profile').then(res => setProfile(res.data)).catch(() => {});
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      addToast('All fields are required', 'error');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    try {
      setLoading(true);
      await api.post('/messages', form);
      addToast('Message sent successfully!', 'success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to send message', 'error');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: FiMail, label: 'Email', value: profile?.email || 'hello@example.com' },
    { icon: FiMapPin, label: 'Location', value: profile?.location || 'New York, USA' },
    { icon: FiPhone, label: 'Phone', value: profile?.phone || '+1 234 567 890' },
  ];

  return (
    <section id="contact" className="relative section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="section-title gradient-text">Get In Touch</h2>
          <p className="section-subtitle mx-auto">Have a project in mind? Let's work together to make it happen.</p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-2 space-y-6">
            {contactInfo.map((info, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
                  <info.icon className="text-primary-400" size={20} />
                </div>
                <div>
                  <p className="text-sm text-dark-400">{info.label}</p>
                  <p className="font-medium">{info.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: 30 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="lg:col-span-3 glass rounded-2xl p-6 md:p-8 border border-white/5 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500/50 transition-colors text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500/50 transition-colors text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Subject</label>
              <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Project Collaboration" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500/50 transition-colors text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell me about your project..." className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500/50 transition-colors text-sm resize-none" />
            </div>
            <button type="submit" disabled={loading} className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-500/25">
              {loading ? 'Sending...' : 'Send Message'} <FiSend size={16} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
