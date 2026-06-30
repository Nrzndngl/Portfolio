import { motion } from 'framer-motion';
import { HiAcademicCap } from 'react-icons/hi';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import useFetch from '../../hooks/useFetch';
import Skeleton from '../common/Skeleton';
import { formatDate } from '../../utils/helpers';

export default function Education() {
  const { data: educations, loading } = useFetch('/educations');
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section id="education" className="relative section-padding">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="section-title gradient-text">Education</h2>
          <p className="section-subtitle mx-auto">My academic background and qualifications.</p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full mx-auto" />
        </motion.div>

        {loading ? (
          <div className="space-y-6">{[1, 2].map(i => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}</div>
        ) : (
          <div className="space-y-6">
            {educations?.map((edu, i) => (
              <motion.div key={edu._id} initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.15 }} className="glass rounded-2xl p-6 border border-white/5 hover:border-primary-500/20 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
                    <HiAcademicCap className="text-primary-400" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <div>
                        <h3 className="text-lg font-semibold">{edu.degree} in {edu.field}</h3>
                        <p className="text-primary-400 text-sm">{edu.institution}</p>
                      </div>
                      <span className="px-3 py-1 bg-primary-500/10 text-primary-400 text-xs rounded-full whitespace-nowrap">
                        {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                      </span>
                    </div>
                    {edu.grade && <p className="text-dark-400 text-sm mt-2">Grade: {edu.grade}</p>}
                    {edu.description && <p className="text-dark-300 text-sm mt-2 leading-relaxed">{edu.description}</p>}
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
