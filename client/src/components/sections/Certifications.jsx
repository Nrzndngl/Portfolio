import { motion } from 'framer-motion';
import { FiExternalLink, FiAward } from 'react-icons/fi';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import useFetch from '../../hooks/useFetch';
import Skeleton from '../common/Skeleton';
import { formatDate } from '../../utils/helpers';

export default function Certifications() {
  const { data: certs, loading } = useFetch('/certificates');
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section id="certifications" className="relative section-padding">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="section-title gradient-text">Certifications</h2>
          <p className="section-subtitle mx-auto">Professional certifications and achievements.</p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full mx-auto" />
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-40 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certs?.map((cert, i) => (
              <motion.div key={cert._id} initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass rounded-2xl p-6 border border-white/5 hover:border-primary-500/20 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
                    <FiAward className="text-primary-400" size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1 truncate group-hover:text-primary-400 transition-colors">{cert.title}</h3>
                    <p className="text-dark-400 text-sm mb-2">{cert.organization}</p>
                    <p className="text-dark-500 text-xs mb-3">Issued: {formatDate(cert.issueDate)}</p>
                    {cert.credentialUrl && (
                      <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary-400 text-xs hover:text-primary-300 transition-colors">
                        View Credential <FiExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
