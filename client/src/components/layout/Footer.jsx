import { useEffect, useState } from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi';
import { scrollToSection } from '../../utils/helpers';
import api from '../../utils/api';

const footerLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const [profile, setProfile] = useState(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    api.get('/profile').then(res => setProfile(res.data)).catch(() => {});
  }, []);

  const socialLinks = [
    { icon: FiGithub, href: profile?.socialLinks?.github || 'https://github.com', label: 'GitHub' },
    { icon: FiLinkedin, href: profile?.socialLinks?.linkedin || 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiTwitter, href: profile?.socialLinks?.twitter || 'https://twitter.com', label: 'Twitter' },
    { icon: FiInstagram, href: profile?.socialLinks?.instagram || 'https://instagram.com', label: 'Instagram' },
    { icon: FiMail, href: `mailto:${profile?.email || 'hello@example.com'}`, label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-dark-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold gradient-text mb-3">{profile?.name || 'Portfolio'}</h3>
            <p className="text-dark-400 text-sm leading-relaxed">{profile?.title || 'Building digital experiences with modern technologies.'}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map(link => (
                <button key={link.label} onClick={() => scrollToSection(link.href.slice(1))} className="text-sm text-dark-400 hover:text-primary-400 transition-colors text-left">
                  {link.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map(social => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg glass flex items-center justify-center text-dark-400 hover:text-primary-400 hover:border-primary-500/30 transition-all" aria-label={social.label}>
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-sm">&copy; {year} {profile?.name || 'Portfolio'}. All rights reserved.</p>
          <p className="text-dark-500 text-xs">Built with React, Node.js & MongoDB</p>
        </div>
      </div>
    </footer>
  );
}
