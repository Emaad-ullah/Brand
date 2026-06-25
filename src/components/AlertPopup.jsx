import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertCircle, FiX } from 'react-icons/fi';

const AlertPopup = ({ isOpen, onClose, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-[200]"
          />
          
          {/* Popup Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[210] pointer-events-none p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-brand-lightNavy overflow-hidden"
            >
              {/* Header/Banner */}
              <div className="bg-brand-navy h-1 w-full" />
              
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <FiAlertCircle className="text-brand-gold" size={24} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif text-xl text-brand-navy tracking-tight">Notification</h3>
                      <button 
                        onClick={onClose}
                        className="text-brand-grey hover:text-brand-navy transition-colors -mt-1 -mr-1 p-1"
                      >
                        <FiX size={20} />
                      </button>
                    </div>
                    
                    <p className="font-sans text-brand-grey text-sm font-light leading-relaxed mb-8">
                      {message}
                    </p>
                    
                    <button
                      onClick={onClose}
                      className="w-full bg-brand-navy text-white py-4 uppercase tracking-[3px] text-[10px] font-bold hover:bg-brand-gold transition-all duration-500 shadow-lg"
                    >
                      Acknowledge
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AlertPopup;
