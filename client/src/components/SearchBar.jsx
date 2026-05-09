
import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

import {
  FiSearch,
  FiMapPin,
  FiClock,
  FiTrash2,
  FiBriefcase,
  FiMic,
  FiMicOff,
} from 'react-icons/fi';

const suggestions = [
  {
    name: 'Whitefield',
    icon: <FiMapPin />,
  },
  {
    name: 'Koramangala',
    icon: <FiBriefcase />,
  },
  {
    name: 'Indiranagar',
    icon: <FiMapPin />,
  },
  {
    name: 'Electronic City',
    icon: <FiBriefcase />,
  },
];

const SearchBar = ({ setResults }) => {

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [isListening, setIsListening] = useState(false);
 

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
        setError('No results found');
      }

    } catch (err) {

      setError('Something went wrong');
      console.log(err);

    } finally {

      setLoading(false);

    }
  };

const startVoiceSearch = () => {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {

    alert('Voice Search not supported');

    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = 'en-IN';

  recognition.continuous = false;

  recognition.interimResults = false;

  recognition.maxAlternatives = 1;

  setIsListening(true);

  recognition.start();

  recognition.onstart = () => {
  console.log('VOICE STARTED');
};

  recognition.onresult = async (event) => {

    console.log('VOICE RESULT RECEIVED');
  try {

    const transcript =
      event.results[0][0].transcript;

    console.log('Transcript:', transcript);

    setInput(transcript);

    let res;

    if (/^[0-9]+$/.test(transcript)) {

      res = await axios.get(
        `https://bangalore-pincode-api.onrender.com/api/pincode/${transcript}`
      );

    } else {

      res = await axios.get(
        `https://bangalore-pincode-api.onrender.com/api/area/${transcript}`
      );

    }

    setResults(res.data);

  } catch (err) {

    console.log(err);

  } finally {

    setIsListening(false);

  }
};

 recognition.onerror = (event) => {

  console.log('VOICE ERROR:', event.error);

  setIsListening(false);
};

  recognition.onend = () => {
    setIsListening(false);
  };
};
  useEffect(() => {

    const delay = setTimeout(() => {

      if (input.length > 2) {
        searchData();
      }

    }, 700);

    return () => clearTimeout(delay);

  }, [input]);

  return (
    <>




      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          w-full
          max-w-6xl
          mx-auto
          rounded-[36px]
          border border-cyan-400/10
          bg-[#09152d]/80
          backdrop-blur-2xl
          shadow-[0_0_80px_rgba(0,180,255,0.15)]
          p-6 md:p-10
        "
      >

        {/* Search Input */}
        <div className="relative">

          <FiSearch
            size={24}
            className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
  type="text"
  placeholder="Search area or pincode..."
  value={input}
  onChange={(e) => setInput(e.target.value)}
  className="
    w-full
    rounded-2xl
    bg-white
    py-5
    pl-14
    pr-5
    text-lg
    text-slate-700
    outline-none
    border-2
    border-cyan-400
    shadow-[0_0_30px_rgba(0,180,255,0.35)]
    placeholder:text-slate-400
  "
/>


        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">

          {suggestions.map((item, index) => (

            <button
              key={index}
              onClick={() => setInput(item.name)}
              className="
                flex items-center gap-2
                px-5 py-3
                rounded-2xl
                bg-[#0e1d3c]
                border border-cyan-400/10
                text-cyan-100
                hover:bg-cyan-500
                hover:text-white
                transition-all duration-300
                shadow-lg
              "
            >

              <span className="text-cyan-300">
                {item.icon}
              </span>

              {item.name}

            </button>

          ))}

        </div>

        {/* Search Button */}
        <div className="flex justify-center items-center gap-4 mt-8">

          <button
            onClick={searchData}
            className="
              flex items-center gap-3
              px-10 py-4
              rounded-2xl
              bg-gradient-to-r
              from-cyan-400
              to-blue-500
              text-white
              text-lg
              font-bold
              shadow-[0_0_40px_rgba(0,180,255,0.4)]
              hover:scale-105
              transition-all duration-300
            "
          >

            <FiSearch size={20} />

            Search

          </button>
          <button
  onClick={startVoiceSearch}
  className={`
    h-[64px]
    px-6
    rounded-2xl
    border border-cyan-400/20
    flex
    items-center
    justify-center
    transition-all duration-300
    shadow-lg
    ${
      isListening
        ? 'bg-red-500 text-white animate-pulse'
        : 'bg-[#0d1f42] text-cyan-100 hover:bg-cyan-500'
    }
  `}
>

  {isListening ? (
    <FiMicOff size={22} />
  ) : (
    <FiMic size={22} />
  )}

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

          <div className="mt-10 border-t border-cyan-400/10 pt-6">

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
                  flex items-center gap-2
                  text-cyan-300
                  hover:text-white
                  transition-all duration-300
                "
              >

                Clear All

                <FiTrash2 size={16} />

              </button>

            </div>

            <div className="flex flex-wrap gap-4">

              {recentSearches.map((item, index) => (

                <button
                  key={index}
                  onClick={() => setInput(item)}
                  className="
                    flex items-center gap-3
                    px-5 py-3
                    rounded-2xl
                    bg-[#0e1d3c]
                    border border-cyan-400/10
                    text-cyan-100
                    hover:bg-cyan-500
                    hover:text-white
                    transition-all duration-300
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

    </>
  );
};

export default SearchBar;