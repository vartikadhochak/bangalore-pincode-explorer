import { useState } from 'react';
import SearchBar from './components/SearchBar';
import ResultCard from './components/ResultCard';
import { motion } from 'framer-motion';
import { FiMoon, FiSun } from 'react-icons/fi';

function App() {
  const [results, setResults] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      className={`min-h-screen relative overflow-hidden p-10 transition-all duration-500 ${
        darkMode
          ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white'
          : 'bg-gradient-to-br from-slate-100 via-cyan-50 to-blue-100 text-slate-900'
      }`}
    >

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500 rounded-full blur-[140px] opacity-20"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 rounded-full blur-[140px] opacity-20"></div>

      {/* Theme Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-8 right-8 z-20 bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl hover:scale-110 transition-all duration-300"
      >
        {darkMode ? (
          <FiSun size={24} />
        ) : (
          <FiMoon size={24} />
        )}
      </button>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl md:text-7xl font-black text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-16 relative z-10"
      >
        Bangalore Pincode Explorer
      </motion.h1>

      {/* Search */}
      <div className="relative z-10">
        <SearchBar setResults={setResults} />
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center mt-16 text-xl relative z-10 ${
            darkMode ? 'text-gray-300' : 'text-slate-700'
          }`}
        >
          Search any Bangalore area or pincode.
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 relative z-10"
        >
          {results.map((item, index) => (
            <ResultCard
              key={index}
              area={item.area}
              pincode={item.pincode}
            />
          ))}
        </motion.div>
      )}

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24 relative z-10">

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-cyan-300 mb-3">
            Fast Search
          </h2>

          <p className={darkMode ? 'text-gray-300' : 'text-slate-700'}>
            Instantly search Bangalore pincodes and locations.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-cyan-300 mb-3">
            Accurate Data
          </h2>

          <p className={darkMode ? 'text-gray-300' : 'text-slate-700'}>
            MongoDB-powered area and pincode mapping.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-cyan-300 mb-3">
            Smart UX
          </h2>

          <p className={darkMode ? 'text-gray-300' : 'text-slate-700'}>
            Modern responsive design with smooth animations.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-cyan-300 mb-3">
            Full Stack
          </h2>

          <p className={darkMode ? 'text-gray-300' : 'text-slate-700'}>
            React + Express + MongoDB architecture.
          </p>
        </motion.div>

      </div>
    </div>
  );
}

export default App;