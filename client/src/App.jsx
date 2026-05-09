import MapView from './components/MapView';
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
      className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
        darkMode
          ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white'
          : 'bg-gradient-to-br from-slate-100 via-cyan-50 to-blue-100 text-slate-900'
      }`}
    >

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-[160px] opacity-20"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[160px] opacity-20"></div>

      {/* Hero Section */}
      {/* Hero Section */}
<div className="relative z-20 px-6 md:px-10 pt-8">

  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="
      relative
      overflow-hidden
      rounded-[34px]
      border border-cyan-400/10
      bg-gradient-to-r
      from-[#041225]
      via-[#081b3c]
      to-[#122c63]
      px-8 md:px-14
      py-10 md:py-12
      shadow-[0_0_100px_rgba(0,180,255,0.08)]
    "
  >

    {/* Glow */}
    <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/10 blur-[140px] rounded-full"></div>

    <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 blur-[140px] rounded-full"></div>

    {/* Content */}
    <div className="relative z-10 flex items-start justify-between">

      {/* Left */}
      <div className="max-w-4xl">

        <h1
          className="
            text-5xl
            md:text-7xl
            font-black
            leading-[1]
            tracking-tight
            bg-gradient-to-r
            from-cyan-300
            via-sky-300
            to-white
            bg-clip-text
            text-transparent
          "
        >
          Bangalore Pincode Explorer
        </h1>

        <p className="text-slate-300 text-lg md:text-xl mt-5 leading-relaxed max-w-3xl">
          Search any Bangalore area or pincode and instantly explore accurate location information with a modern interactive experience.
        </p>

      </div>

      {/* Theme Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="
          w-16
          h-16
          min-w-[64px]
          rounded-2xl
          bg-[#0a1d40]/90
          border border-cyan-400/20
          backdrop-blur-xl
          flex
          items-center
          justify-center
          hover:bg-cyan-500
          hover:scale-105
          transition-all duration-300
          shadow-[0_0_25px_rgba(0,180,255,0.2)]
        "
      >

        {darkMode ? (
          <FiSun size={28} className="text-white" />
        ) : (
          <FiMoon size={28} className="text-white" />
        )}

      </button>

    </div>

  </motion.div>

</div>
      {/* Search */}
      <div className="relative z-10 px-6 md:px-16 mt-12">

        <SearchBar setResults={setResults} />

      </div>

      {/* Map */}
      <div className="relative z-10 px-6 md:px-16 mt-12">

        <MapView
          area={results.length > 0 ? results[0].area : 'Bangalore'}
        />

      </div>

      {/* Results */}
      {results.length === 0 ? (

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center mt-16 text-xl relative z-10 ${
            darkMode
              ? 'text-gray-300'
              : 'text-slate-700'
          }`}
        >
          Search any Bangalore area or pincode.
        </motion.p>

      ) : (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
            mt-16
            px-6
            md:px-16
            relative
            z-10
          "
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
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
          mt-24
          px-6
          md:px-16
          pb-16
          relative
          z-10
        "
      >

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="
            bg-white/10
            backdrop-blur-lg
            border border-white/10
            rounded-3xl
            p-6
            shadow-xl
          "
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
          className="
            bg-white/10
            backdrop-blur-lg
            border border-white/10
            rounded-3xl
            p-6
            shadow-xl
          "
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
          className="
            bg-white/10
            backdrop-blur-lg
            border border-white/10
            rounded-3xl
            p-6
            shadow-xl
          "
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
          className="
            bg-white/10
            backdrop-blur-lg
            border border-white/10
            rounded-3xl
            p-6
            shadow-xl
          "
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