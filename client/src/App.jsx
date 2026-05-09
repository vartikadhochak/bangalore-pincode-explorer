import { useState } from 'react';
import SearchBar from './components/SearchBar';
import ResultCard from './components/ResultCard';
import MapView from './components/MapView';
import { motion } from 'framer-motion';
import { FiMoon, FiSun } from 'react-icons/fi';

function App() {
  const [results, setResults] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      className={`min-h-screen transition-all duration-500 overflow-x-hidden ${
        darkMode
          ? 'bg-[#050816] text-white'
          : 'bg-[#f4f7fb] text-slate-900'
      }`}
    >

      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-[180px] rounded-full"></div>

      <div className="fixed bottom-0 right-0 w-96 h-96 bg-blue-500/20 blur-[180px] rounded-full"></div>

      {/* Navbar */}
      <div className="relative z-20 flex justify-between items-center px-6 md:px-16 py-8">

        <h1 className="text-3xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Bangalore Pincode Explorer
        </h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl hover:scale-110 transition-all duration-300"
        >
          {darkMode ? (
            <FiSun size={24} />
          ) : (
            <FiMoon size={24} />
          )}
        </button>

      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 mt-10">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl"
        >
          <SearchBar setResults={setResults} />
        </motion.div>

        {/* Results */}
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-6xl mt-14"
          >

            {/* Map */}
            <MapView area={results[0]?.area} />

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

              {results.map((item, index) => (
                <ResultCard
                  key={index}
                  area={item.area}
                  pincode={item.pincode}
                />
              ))}

            </div>

          </motion.div>
        )}

        {results.length === 0 && (
          <p
            className={`mt-12 text-lg ${
              darkMode
                ? 'text-gray-400'
                : 'text-slate-600'
            }`}
          >
            Search any Bangalore area or pincode
          </p>
        )}

      </div>

      {/* Footer */}
      <div
        className={`mt-24 border-t ${
          darkMode
            ? 'border-white/10'
            : 'border-slate-300'
        } py-8 text-center`}
      >
        <p
          className={
            darkMode
              ? 'text-gray-400'
              : 'text-slate-600'
          }
        >
          Built with React, Express, MongoDB & India Post API
        </p>
      </div>

    </div>
  );
}

export default App;