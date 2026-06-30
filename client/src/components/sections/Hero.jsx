import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';
import { scrollToSection } from '../../utils/helpers';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function Hero() {
  const [profile, setProfile] = useState(null);
  const [ref, isVisible] = useScrollAnimation(0.1);

  useEffect(() => {
    api.get('/profile').then(res => setProfile(res.data)).catch(() => {});
  }, []);

  const socialIcons = [
    { icon: FiGithub, href: profile?.socialLinks?.github || '#' },
    { icon: FiLinkedin, href: profile?.socialLinks?.linkedin || '#' },
    { icon: FiTwitter, href: profile?.socialLinks?.twitter || '#' },
    { icon: FiInstagram, href: profile?.socialLinks?.instagram || '#' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding pt-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-primary-500/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-purple-500/5 rounded-full" />
      </div>

      <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={isVisible ? 'visible' : 'hidden'} className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div variants={itemVariants} className="mb-8">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-primary-500/30 p-1 mb-6">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white">
              {profile?.name ? profile.name.split(' ').map(n => n[0]).join('') : 'JD'}
            </div>
          </div>
        </motion.div>

        <motion.p variants={itemVariants} className="text-primary-400 font-mono text-sm mb-4 tracking-wider">
          Hello, I'm
        </motion.p>

        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-balance">
          <span className="gradient-text">{profile?.name || 'John Doe'}</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-xl sm:text-2xl text-dark-300 mb-4 font-medium">
          {profile?.title || 'Full Stack Developer'}
        </motion.p>

        <motion.p variants={itemVariants} className="text-dark-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          {profile?.bio || 'Passionate about building exceptional digital experiences. Crafting beautiful, performant web applications with modern technologies.'}
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a href={profile?.resumeUrl || '#'} className="group px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium text-sm transition-all flex items-center gap-2 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40">
            <FiDownload size={16} />
            Download Resume
          </a>
          <button onClick={() => scrollToSection('contact')} className="group px-6 py-3 glass hover:bg-white/10 text-white rounded-full font-medium text-sm transition-all flex items-center gap-2 border border-white/10">
            Contact Me
            <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center justify-center gap-4">
          {socialIcons.map((social, i) => (
            <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full glass flex items-center justify-center text-dark-400 hover:text-primary-400 hover:border-primary-500/30 transition-all border border-white/5">
              <social.icon size={18} />
            </a>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="mt-16">
          <button onClick={() => scrollToSection('about')} className="text-dark-500 flex flex-col items-center gap-2 mx-auto hover:text-dark-400 transition-colors group">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-5 h-8 border-2 border-dark-500 rounded-full flex justify-center">
              <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-1 h-2 bg-dark-500 rounded-full mt-2" />
            </motion.div>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
