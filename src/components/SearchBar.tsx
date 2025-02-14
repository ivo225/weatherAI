import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiLoader } from 'react-icons/fi';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
      setSuggestions([]);
    }
  };

  // Mock suggestions - in a real app, this would call an API
  useEffect(() => {
    if (query.trim().length > 2) {
      // Simulated API call for city suggestions
      const mockSuggestions = [
        `${query} City`,
        `${query} Town`,
        `New ${query}`,
      ];
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm
                   border border-gray-200 focus:outline-none focus:ring-2 
                   focus:ring-primary focus:border-transparent"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2
                   text-gray-600 hover:text-primary disabled:text-gray-400"
        >
          {isLoading ? (
            <FiLoader className="animate-spin" />
          ) : (
            <FiSearch />
          )}
        </button>
      </form>

      {suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => {
                onSearch(suggestion);
                setQuery('');
                setSuggestions([]);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
            >
              {suggestion}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};
