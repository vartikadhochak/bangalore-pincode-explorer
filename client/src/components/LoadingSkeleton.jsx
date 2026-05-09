import { motion } from 'framer-motion';

const LoadingSkeleton = () => {

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

      {[1, 2, 3].map((item) => (

        <motion.div
          key={item}
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
          className="
            rounded-3xl
            bg-[#0e1d3c]
            border border-cyan-400/10
            p-8
            h-[180px]
            shadow-[0_0_40px_rgba(0,180,255,0.08)]
          "
        >

          <div className="h-5 w-32 bg-cyan-400/20 rounded-lg mb-6"></div>

          <div className="h-4 w-full bg-cyan-400/10 rounded-lg mb-4"></div>

          <div className="h-4 w-5/6 bg-cyan-400/10 rounded-lg mb-4"></div>

          <div className="h-4 w-2/3 bg-cyan-400/10 rounded-lg"></div>

        </motion.div>

      ))}

    </div>

  );
};

export default LoadingSkeleton;