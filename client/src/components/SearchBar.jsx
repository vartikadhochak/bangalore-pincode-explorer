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
          `http://localhost:5000/api/pincode/${input}`
        );
      } else {
        res = await axios.get(
          `http://localhost:5000/api/area/${input}`
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 flex flex-col gap-6 items-center max-w-2xl mx-auto"
    >

      <div className="relative w-full md:w-96">

        <FiSearch
          className="absolute left-4 top-5 text-slate-500"
          size={22}
        />

        <input
          type="text"
          placeholder="Search area or pincode..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/70 border border-slate-300 outline-none text-slate-800 placeholder-slate-500 focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {suggestions.map((item, index) => (
          <button
            key={index}
            onClick={() => setInput(item)}
            className="bg-white/70 text-slate-800 border border-slate-300 px-4 py-2 rounded-full hover:bg-cyan-500 hover:text-white transition-all duration-300"
          >
            {item}
          </button>
        ))}
      </div>

      <button
        onClick={searchData}
        className="bg-cyan-500 hover:bg-cyan-400 hover:scale-105 transition-all duration-300 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg"
      >
        Search
      </button>

      {loading && (
        <p className="text-cyan-600 text-lg animate-pulse">
          Searching...
        </p>
      )}

      {error && (
        <p className="text-red-500 text-lg">
          {error}
        </p>
      )}

      {recentSearches.length > 0 && (
        <div className="w-full mt-4">

          <h3 className="text-slate-700 mb-3 text-lg font-semibold">
            Recent Searches
          </h3>

          <div className="flex flex-wrap gap-3">
            {recentSearches.map((item, index) => (
              <button
                key={index}
                onClick={() => setInput(item)}
                className="bg-cyan-100 text-slate-800 border border-cyan-300 px-4 py-2 rounded-full hover:bg-cyan-500 hover:text-white transition-all duration-300"
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