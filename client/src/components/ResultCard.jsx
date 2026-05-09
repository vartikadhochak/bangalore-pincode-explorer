import { motion } from 'framer-motion';
import { FiMapPin } from 'react-icons/fi';

const ResultCard = ({ area, pincode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        rotateX: 5,
        rotateY: 5,
      }}
      transition={{ duration: 0.3 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-2xl"
    >

      <div className="flex items-center gap-3 mb-4">
        <FiMapPin className="text-cyan-300 text-3xl" />

        <h2 className="text-3xl font-bold text-cyan-300">
          {area}
        </h2>
      </div>

      <div className="bg-black/20 rounded-2xl p-4">
        <p className="text-xl text-gray-200">
          Pincode:
        </p>

        <p className="text-4xl font-black text-white mt-2">
          {pincode}
        </p>
      </div>

    </motion.div>
  );
};

export default ResultCard;