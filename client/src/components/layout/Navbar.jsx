import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { scrollToSection } from '../../utils/helpers';
import api from '../../utils/api';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [profile, setProfile] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    api.get('/profile').then(res => setProfile(res.data)).catch(() => { });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.3 });
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    if (href.startsWith('#')) {
      if (!isHome) {
        navigate('/#' + href.slice(1));
      } else {
        scrollToSection(href.slice(1));
      }
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileOpen ? 'glass-dark shadow-lg shadow-black/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" onClick={() => setMobileOpen(false)} className="text-xl font-bold gradient-text">{profile?.name || 'Portfolio'}</Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <button key={link.href} onClick={() => handleNavClick(link.href)} className={`text-sm font-medium transition-colors relative ${activeSection === link.href.slice(1) ? 'text-primary-400' : 'text-dark-300 hover:text-white'}`}>
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <motion.div layoutId="activeNav" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => setMobileOpen(prev => !prev)} className="md:hidden p-2 rounded-lg text-dark-300 hover:text-white hover:bg-white/5 transition-all" aria-label="Toggle menu" aria-expanded={mobileOpen}>
                {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="md:hidden glass-dark border-t border-white/5"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map(link => (
                  <button key={link.href} onClick={() => handleNavClick(link.href)} className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeSection === link.href.slice(1) ? 'text-primary-400 bg-primary-500/10' : 'text-dark-300 hover:text-white hover:bg-white/5'}`}>
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
