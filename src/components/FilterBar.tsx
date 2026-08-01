import { Calendar, Tag } from 'lucide-react';

interface FilterBarProps {
  filterDate: string;
  setFilterDate: (date: string) => void;
  filterTag: string;
  setFilterTag: (tag: string) => void;
  availableTags: string[];
}

export function FilterBar({ filterDate, setFilterDate, filterTag, setFilterTag, availableTags }: FilterBarProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-zinc-500 mb-2">By Date</p>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
            <Calendar size={14} />
          </div>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-transparent dark:border-zinc-700 outline-none focus:border-zinc-400 dark:focus:border-zinc-500 text-zinc-900 dark:text-white transition-colors text-sm"
          />
          {filterDate && (
            <button 
              onClick={() => setFilterDate('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      
      <div>
        <p className="text-xs text-zinc-500 mb-2">By Custom Tag</p>
        <div className="flex flex-wrap gap-2">
          <span 
            onClick={() => setFilterTag('')}
            className={`px-3 py-1 text-xs rounded-full cursor-pointer ${filterTag === '' ? 'bg-zinc-900 dark:bg-white text-white dark:text-black' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'}`}
          >
            All
          </span>
          {availableTags.map(tag => (
            <span 
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-3 py-1 text-xs cursor-pointer ${filterTag === tag ? 'bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full' : 'border border-black/10 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-lg italic'}`}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
