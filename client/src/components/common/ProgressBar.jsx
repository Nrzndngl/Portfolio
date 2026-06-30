import { motion } from 'framer-motion';

export default function ProgressBar({ value, label, index = 0 }) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-dark-200">{label}</span>
        <span className="text-xs font-mono text-primary-400">{value}%</span>
      </div>
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-purple-500"
        />
      </div>
    </div>
  );
}
