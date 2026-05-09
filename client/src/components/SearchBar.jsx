import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  FiSearch,
  FiClock,
  FiMapPin,
} from 'react-icons/fi';

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
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        bg-white/10
        backdrop-blur-2xl
        border border-white/10
        rounded-[32px]
        shadow-2xl
        p-8 md:p-10
        max-w-5xl
        mx-auto
      "
    >

      {/* Search Input */}
      <div className="relative w-full">

        <FiSearch
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          size={24}
        />

        <input
          type="text"
          placeholder="Search area or pincode..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="
            w-full
            bg-white/90
            text-slate-800
            placeholder-slate-500
            rounded-3xl
            py-5
            pl-14
            pr-5
            text-lg
            outline-none
            border border-white/20
            focus:ring-4
            focus:ring-cyan-400/30
            shadow-lg
          "
        />

      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">

        {suggestions.map((item, index) => (
          <button
            key={index}
            onClick={() => setInput(item)}
            className="
              flex items-center gap-2
              px-5 py-3
              rounded-2xl
              bg-white/5
              border border-white/10
              text-white
              hover:bg-cyan-500
              hover:border-cyan-400
              transition-all duration-300
              shadow-lg
            "
          >
            <FiMapPin size={16} />
            {item}
          </button>
        ))}

      </div>

      {/* Search Button */}
      <div className="flex justify-center mt-8">

        <button
          onClick={searchData}
          className="
            flex items-center gap-3
            bg-gradient-to-r
            from-cyan-400
            to-blue-500
            hover:scale-105
            transition-all duration-300
            text-white
            px-10 py-4
            rounded-2xl
            font-bold
            text-lg
            shadow-2xl
          "
        >
          <FiSearch size={20} />
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
        <div className="mt-10 border-t border-white/10 pt-6">

          <div className="flex items-center justify-between mb-5">

            <div className="flex items-center gap-3">

              <FiClock
                className="text-cyan-400"
                size={22}
              />

              <h3 className="text-cyan-100 text-xl font-semibold">
                Recent Searches
              </h3>

            </div>

            <button
              onClick={() => setRecentSearches([])}
              className="
                text-cyan-300
                hover:text-white
                transition-all duration-300
                text-sm
              "
            >
              Clear All
            </button>

          </div>

          <div className="flex flex-wrap gap-4">

            {recentSearches.map((item, index) => (
              <button
                key={index}
                onClick={() => setInput(item)}
                className="
                  flex items-center gap-2
                  px-5 py-3
                  rounded-2xl
                  bg-white/5
                  border border-cyan-400/20
                  text-cyan-50
                  hover:bg-cyan-500
                  hover:border-cyan-400
                  hover:scale-105
                  transition-all duration-300
                  shadow-lg
                  backdrop-blur-xl
                "
              >
                <FiClock size={16} />
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