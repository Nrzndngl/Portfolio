import { useToast } from '../../context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheckCircle, HiXCircle, HiInformationCircle, HiX } from 'react-icons/hi';

const icons = { success: HiCheckCircle, error: HiXCircle, info: HiInformationCircle };
const colors = { success: 'bg-green-500/10 border-green-500 text-green-400', error: 'bg-red-500/10 border-red-500 text-red-400', info: 'bg-blue-500/10 border-blue-500 text-blue-400' };

export default function Toast() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2">
      <AnimatePresence>
        {toasts.map(toast => {
          const Icon = icons[toast.type] || HiInformationCircle;
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${colors[toast.type] || colors.info} min-w-[280px] shadow-lg`}
            >
              <Icon size={20} className="shrink-0" />
              <span className="text-sm flex-1">{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} className="p-0.5 hover:opacity-70">
                <HiX size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
