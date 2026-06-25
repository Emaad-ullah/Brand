import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const SizeGuideModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-navy/60 z-[60] backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-2xl bg-white z-[70] shadow-2xl overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-brand-lightNavy">
              <h2 className="font-serif text-2xl text-brand-navy">Size Guide</h2>
              <button onClick={onClose} className="text-brand-grey hover:text-brand-navy transition-colors">
                <FiX size={24} />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <p className="text-brand-grey text-sm mb-6">
                Measurements are provided as a guide. Please note that exact measurements may vary slightly depending on the style and fabric.
              </p>

              <h3 className="font-serif font-semibold text-sm uppercase tracking-widest text-brand-navy mb-4">Men's Tops & Outerwear</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm text-left">
                  <thead className="bg-brand-lightNavy text-brand-navy uppercase text-xs tracking-wider">
                    <tr>
                      <th className="px-4 py-3">Size</th>
                      <th className="px-4 py-3">Chest (in)</th>
                      <th className="px-4 py-3">Waist (in)</th>
                      <th className="px-4 py-3">Sleeve (in)</th>
                    </tr>
                  </thead>
                  <tbody className="text-brand-grey">
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 font-medium text-brand-navy">S</td>
                      <td className="px-4 py-3">36 - 38</td>
                      <td className="px-4 py-3">30 - 32</td>
                      <td className="px-4 py-3">32.5</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 font-medium text-brand-navy">M</td>
                      <td className="px-4 py-3">39 - 41</td>
                      <td className="px-4 py-3">33 - 35</td>
                      <td className="px-4 py-3">33.5</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 font-medium text-brand-navy">L</td>
                      <td className="px-4 py-3">42 - 44</td>
                      <td className="px-4 py-3">36 - 38</td>
                      <td className="px-4 py-3">34.5</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-brand-navy">XL</td>
                      <td className="px-4 py-3">45 - 47</td>
                      <td className="px-4 py-3">39 - 41</td>
                      <td className="px-4 py-3">35.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="font-serif font-semibold text-sm uppercase tracking-widest text-brand-navy mb-4">How to Measure</h3>
              <ul className="list-disc pl-5 text-sm text-brand-grey space-y-2">
                <li><strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.</li>
                <li><strong>Waist:</strong> Measure around the narrowest part (typically where your body bends side to side), keeping the tape horizontal.</li>
                <li><strong>Sleeve:</strong> Measure from the center back of your neck, across the shoulder, and down to your wrist.</li>
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SizeGuideModal;
