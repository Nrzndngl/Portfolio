import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiSearch, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import useFetch from '../../hooks/useFetch';
import Skeleton from '../common/Skeleton';

const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'Mobile'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [ref, isVisible] = useScrollAnimation(0.1);
  const { data: projects, loading } = useFetch('/projects');

  const filtered = projects?.filter(p => {
    if (activeFilter !== 'All' && (p.category || '').toLowerCase() !== activeFilter.toLowerCase()) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.technologies?.some(t => t.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  return (
    <section id="projects" className="relative section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="section-title gradient-text">Featured Projects</h2>
          <p className="section-subtitle mx-auto">A showcase of my recent work and personal projects.</p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full mx-auto" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === cat ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25' : 'glass text-dark-300 hover:text-white border border-white/5'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-auto">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" size={16} />
            <input type="text" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-full glass border border-white/5 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-primary-500/50 transition-colors" />
          </div>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="rounded-2xl overflow-hidden glass border border-white/5">
                <Skeleton className="h-48 w-full" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered?.map((project, i) => (
                <motion.div key={project._id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3, delay: i * 0.05 }}
                  onClick={() => { setSelectedProject(project); setImageIndex(0); }}
                  className="group cursor-pointer rounded-2xl overflow-hidden glass border border-white/5 hover:border-primary-500/30 transition-all"
                >
                  <div className="h-48 bg-gradient-to-br from-primary-500/10 to-purple-600/10 flex items-center justify-center overflow-hidden">
                    {project.images?.[0] ? (
                      <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="text-4xl font-bold gradient-text">{project.title?.[0] || '?'}</div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      {project.featured && <span className="px-2 py-0.5 bg-primary-500/20 text-primary-400 text-xs rounded-full">Featured</span>}
                      <span className="px-2 py-0.5 bg-white/5 text-dark-400 text-xs rounded-full">{project.category}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-400 transition-colors">{project.title}</h3>
                    <p className="text-dark-400 text-sm line-clamp-2 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies?.slice(0, 3).map((tech, j) => (
                        <span key={j} className="px-2 py-0.5 bg-primary-500/10 text-primary-400 text-xs rounded-full">{tech}</span>
                      ))}
                      {project.technologies?.length > 3 && <span className="text-dark-500 text-xs">+{project.technologies.length - 3}</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {filtered?.length === 0 && !loading && (
          <p className="text-center text-dark-400 py-12">No projects found.</p>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedProject(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="glass-dark rounded-2xl border border-white/10 p-6">
                <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 p-1 rounded-lg text-dark-400 hover:text-white hover:bg-white/5 transition-all z-10">
                  <FiX size={22} />
                </button>

                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6 bg-dark-900">
                  {selectedProject.images?.length > 0 ? (
                    <>
                      <img src={selectedProject.images[imageIndex]} alt={selectedProject.title} className="w-full h-full object-cover" />
                      {selectedProject.images.length > 1 && (
                        <div className="absolute inset-0 flex items-center justify-between px-4">
                          <button onClick={(e) => { e.stopPropagation(); setImageIndex(i => (i - 1 + selectedProject.images.length) % selectedProject.images.length); }} className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"><FiChevronLeft size={20} /></button>
                          <button onClick={(e) => { e.stopPropagation(); setImageIndex(i => (i + 1) % selectedProject.images.length); }} className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"><FiChevronRight size={20} /></button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl font-bold gradient-text">{selectedProject.title?.[0] || '?'}</div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {selectedProject.featured && <span className="px-2 py-0.5 bg-primary-500/20 text-primary-400 text-xs rounded-full">Featured</span>}
                    <span className="px-2 py-0.5 bg-white/5 text-dark-400 text-xs rounded-full">{selectedProject.category}</span>
                  </div>
                  <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                  <p className="text-dark-300 leading-relaxed">{selectedProject.description}</p>
                  <div>
                    <h4 className="text-sm font-medium text-dark-400 mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies?.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-primary-500/10 text-primary-400 text-sm rounded-full">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    {selectedProject.githubLink && (
                      <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 glass hover:bg-white/10 text-white rounded-full text-sm font-medium transition-all border border-white/10">
                        <FiGithub size={16} /> GitHub
                      </a>
                    )}
                    {selectedProject.liveDemo && (
                      <a href={selectedProject.liveDemo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-sm font-medium transition-all">
                        <FiExternalLink size={16} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
