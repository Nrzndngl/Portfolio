import { motion } from 'framer-motion';
import { HiBriefcase, HiLocationMarker } from 'react-icons/hi';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import useFetch from '../../hooks/useFetch';
import Skeleton from '../common/Skeleton';
import { formatDate } from '../../utils/helpers';

export default function Experience() {
  const { data: experiences, loading } = useFetch('/experiences');
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section id="experience" className="relative section-padding" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="section-title gradient-text">Work Experience</h2>
          <p className="section-subtitle mx-auto">My professional journey and career highlights.</p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full mx-auto" />
        </motion.div>

        {loading ? (
          <div className="space-y-6">{[1, 2].map(i => <Skeleton key={i} className="h-40 w-full rounded-2xl" />)}</div>
        ) : (
          <div className="relative">
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-purple-500 to-transparent" />
            {experiences?.map((exp, i) => (
              <motion.div key={exp._id} initial={{ opacity: 0, x: -30 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.15 }} className="relative pl-16 md:pl-20 pb-10 last:pb-0">
                <div className="absolute left-4 md:left-6 top-1 w-4 h-4 rounded-full bg-primary-500 border-4 border-dark-950 shadow-lg shadow-primary-500/25" />
                <div className="glass rounded-2xl p-6 border border-white/5 hover:border-primary-500/20 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold">{exp.position}</h3>
                      <div className="flex items-center gap-2 text-primary-400 text-sm">
                        <HiBriefcase size={14} />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-primary-500/10 text-primary-400 text-xs rounded-full whitespace-nowrap">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.location && (
                    <div className="flex items-center gap-1 text-dark-400 text-xs mb-3">
                      <HiLocationMarker size={12} /> {exp.location}
                    </div>
                  )}
                  <p className="text-dark-300 text-sm leading-relaxed mb-3">{exp.description}</p>
                  {exp.responsibilities?.length > 0 && (
                    <ul className="space-y-1.5">
                      {exp.responsibilities.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-dark-400 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
