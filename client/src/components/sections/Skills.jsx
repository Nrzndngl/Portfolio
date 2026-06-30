import { motion } from 'framer-motion';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import ProgressBar from '../common/ProgressBar';
import Skeleton from '../common/Skeleton';
import useFetch from '../../hooks/useFetch';

export default function Skills() {
  const { data: skills, loading } = useFetch('/skills');
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section id="skills" className="relative section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="section-title gradient-text">Skills & Expertise</h2>
          <p className="section-subtitle mx-auto">Technologies and tools I use to bring ideas to life.</p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full mx-auto" />
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="p-6 rounded-2xl glass border border-white/5">
                <Skeleton className="h-6 w-24 mb-6" />
                <div className="space-y-4">{[1, 2, 3].map(j => <Skeleton key={j} className="h-8 w-full" />)}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills?.map((category, i) => (
              <motion.div key={category._id} initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} className="p-6 rounded-2xl glass border border-white/5 hover:border-primary-500/20 transition-all group">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-500" />
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.items?.map((skill, j) => (
                    <ProgressBar key={skill._id || j} label={skill.name} value={skill.level} index={j} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
