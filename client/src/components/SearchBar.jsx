import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';

const suggestions = [
  'Whitefield',
  'Koramangala',
  'Indiranagar',
  'Electronic City',
];

const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  const searchData = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);
      setError('');

      let res;

      if (/^[0-9]+$/.test(input)) {
        res = await axios.get(
          `https://bangalore-pincode-api.onrender.com/api/pincode/${input}`
        );
      } else {
        res = await axios.get(
          `https://bangalore-pincode-api.onrender.com/api/area/${input}`
        );
      }

      setResults(res.data);

      if (!recentSearches.includes(input)) {
        setRecentSearches((prev) => [
          input,
          ...prev.slice(0, 4),
        ]);
      }

      if (res.data.length === 0) {
        setError('No results found.');
      }

    } catch (err) {
      setError('Something went wrong.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (input.length > 2) {
        searchData();
      }
    }, 600);

    return () => clearTimeout(delay);
  }, [input]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl"
    >

      {/* Search Input */}
      <div className="relative max-w-2xl mx-auto">

        <FiSearch
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          size={22}
        />

        <input
          type="text"
          placeholder="Search area or pincode..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-white/90 text-slate-800 placeholder-slate-500 rounded-2xl py-5 pl-14 pr-5 text-lg outline-none border border-slate-200 focus:ring-4 focus:ring-cyan-400/40"
        />

      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">

        {suggestions.map((item, index) => (
          <button
            key={index}
            onClick={() => setInput(item)}
            className="px-5 py-3 rounded-2xl bg-white/80 hover:bg-cyan-500 hover:text-white transition-all duration-300 text-slate-700 font-medium shadow-md"
          >
            {item}
          </button>
        ))}

      </div>

      {/* Search Button */}
      <div className="flex justify-center mt-8">

        <button
          onClick={searchData}
          className="bg-cyan-500 hover:bg-cyan-400 hover:scale-105 transition-all duration-300 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl"
        >
          Search
        </button>

      </div>

      {/* Loading */}
      {loading && (
        <p className="text-cyan-300 text-center mt-6 animate-pulse">
          Searching...
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-400 text-center mt-6">
          {error}
        </p>
      )}

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="mt-10">

          <h3 className="text-slate-300 text-sm uppercase tracking-wider mb-4 text-center">
            Recent Searches
          </h3>

          <div className="flex flex-wrap justify-center gap-3">

            {recentSearches.map((item, index) => (
              <button
                key={index}
                onClick={() => setInput(item)}
                className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/20 hover:bg-cyan-500 hover:text-white transition-all duration-300 text-cyan-100"
              >
                {item}
              </button>
            ))}

          </div>

        </div>
      )}

    </motion.div>
  );
};

export default SearchBar;