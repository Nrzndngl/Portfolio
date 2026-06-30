import { motion } from 'framer-motion';
import { HiAcademicCap, HiBriefcase, HiCode } from 'react-icons/hi';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function About() {
  const [profile, setProfile] = useState(null);
  const [ref, isVisible] = useScrollAnimation(0.1);

  useEffect(() => {
    api.get('/profile').then(res => setProfile(res.data)).catch(() => {});
  }, []);

  const stats = [
    { icon: HiBriefcase, label: 'Experience', value: '5+ Years' },
    { icon: HiCode, label: 'Projects', value: '50+' },
    { icon: HiAcademicCap, label: 'Clients', value: '30+' },
  ];

  return (
    <section id="about" className="relative section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="section-title gradient-text">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="relative">
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden glass">
                <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-purple-600/20 flex items-center justify-center">
                  {profile?.aboutImage ? (
                    <img src={profile.aboutImage} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <div className="text-8xl mb-4">{profile?.name?.[0] || 'J'}</div>
                      <p className="text-dark-400 text-sm">Your Photo</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-xl">
                5+
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
            <h3 className="text-2xl font-bold mb-4">{profile?.name || 'John Doe'}</h3>
            <p className="text-dark-400 leading-relaxed mb-6">
              {profile?.bio || 'Full-stack developer with expertise in modern web technologies. Passionate about creating elegant, scalable solutions that solve real-world problems.'}
            </p>
            <div className="space-y-4 mb-8">
              {[
                { label: 'Location', value: profile?.location || 'New York, USA' },
                { label: 'Email', value: profile?.email || 'john@example.com' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-dark-400 text-sm w-24 shrink-0">{item.label}</span>
                  <span className="h-px flex-1 bg-white/5" />
                  <span className="text-sm text-dark-200">{item.value}</span>
                </div>
              ))}
            </div>
            <a href={profile?.resumeUrl || '#'} download className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-sm font-medium transition-all shadow-lg shadow-primary-500/25">
              Download Resume
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }} className="text-center p-4 md:p-6 rounded-2xl glass border border-white/5">
              <stat.icon className="text-primary-400 w-6 h-6 md:w-8 md:h-8 mx-auto mb-3" />
              <p className="text-xl md:text-2xl font-bold gradient-text mb-1">{stat.value}</p>
              <p className="text-dark-400 text-xs md:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
