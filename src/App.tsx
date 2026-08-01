import { useState, useMemo } from 'react';
import { Plus, Moon, Sun, Wallet } from 'lucide-react';
import { useExpenses } from './hooks/useExpenses';
import { useDarkMode } from './hooks/useDarkMode';
import { ExpenseModal } from './components/ExpenseModal';
import { ExpenseItem } from './components/ExpenseItem';
import { FilterBar } from './components/FilterBar';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { expenses, addExpense, deleteExpense } = useExpenses();
  const { isDark, toggle } = useDarkMode();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterDate, setFilterDate] = useState('');
  const [filterTag, setFilterTag] = useState('');

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    expenses.forEach(e => e.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter(e => {
      const matchDate = filterDate ? e.date === filterDate : true;
      const matchTag = filterTag ? e.tags.includes(filterTag) : true;
      return matchDate && matchTag;
    });
  }, [expenses, filterDate, filterTag]);

  const totalSpent = useMemo(() => {
    return filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  }, [filteredExpenses]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="h-16 border-b border-black/10 dark:border-zinc-800 flex items-center justify-between px-4 md:px-8 bg-white/50 dark:bg-zinc-900/20 backdrop-blur-md sticky top-0 z-30">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Wallet size={18} />
            </div>
            <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">WealthTrack</span>
          </div>
          <button
            onClick={toggle}
            className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-6xl w-full mx-auto p-4 md:p-8 space-y-8">
        {/* Summary Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
          <div className="bg-white dark:bg-zinc-900 border border-black/10 dark:border-zinc-800 p-6 rounded-2xl">
            <p className="text-zinc-500 text-sm mb-1">{filterDate ? 'Spent on Date' : 'Available Balance'}</p>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
              ${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
          </div>
        </section>

        {/* Main Data Area */}
        <section className="flex-1 flex flex-col md:flex-row md:space-x-8 min-h-0 space-y-8 md:space-y-0">
          {/* Left: Transaction Feed */}
          <div className="flex-[2] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-medium text-zinc-900 dark:text-white">Recent Transactions</h3>
            </div>
            <div className="flex-1 overflow-hidden bg-zinc-50 dark:bg-zinc-900/50 border border-black/10 dark:border-zinc-800 rounded-3xl p-4 space-y-3">
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {filteredExpenses.length > 0 ? (
                    filteredExpenses.map((expense) => (
                      <ExpenseItem 
                        key={expense.id} 
                        expense={expense} 
                        onDelete={deleteExpense} 
                      />
                    ))
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12"
                    >
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">No expenses found</h3>
                      <p className="text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
                        {expenses.length === 0 
                          ? "You haven't tracked any expenses yet."
                          : "No expenses match your current filters."}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right: Quick Filters & Add */}
          <div className="flex-1 flex flex-col space-y-6">
            <div className="bg-white dark:bg-zinc-900 border border-black/10 dark:border-zinc-800 rounded-3xl p-6">
              <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">Filters</h4>
              <FilterBar 
                filterDate={filterDate}
                setFilterDate={setFilterDate}
                filterTag={filterTag}
                setFilterTag={setFilterTag}
                availableTags={availableTags}
              />
            </div>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-2xl flex items-center justify-center space-x-2 shadow-lg shadow-black/5 dark:shadow-white/5 active:scale-[0.98] transition-transform"
            >
              <Plus size={20} />
              <span>Add Expense</span>
            </button>
          </div>
        </section>
      </main>

      {/* Modal */}
      <ExpenseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onAdd={addExpense}
      />
    </div>
  );
}
