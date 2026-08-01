import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { CATEGORIES, Expense } from '../types';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (expense: Omit<Expense, 'id'>) => void;
}

export function ExpenseModal({ isOpen, onClose, onAdd }: ExpenseModalProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tags, setTags] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || !description) return;

    onAdd({
      amount: Number(amount),
      description,
      category,
      tags: tags.split(',').map(t => t.trim()).filter(t => t.length > 0),
      date,
    });

    // Reset form
    setAmount('');
    setDescription('');
    setCategory(CATEGORIES[0]);
    setTags('');
    setDate(new Date().toISOString().split('T')[0]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md bg-white dark:bg-zinc-900 rounded-t-3xl md:rounded-3xl p-6 z-50 shadow-2xl border border-black/10 dark:border-zinc-800"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">New Expense</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-1">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-semibold">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-black/10 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 outline-none transition-colors text-zinc-900 dark:text-white font-medium text-lg"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-1">Description</label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-black/10 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 outline-none transition-colors text-zinc-900 dark:text-white"
                  placeholder="Grocery run"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-500 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-black/10 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 outline-none transition-colors text-zinc-900 dark:text-white appearance-none"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-500 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-black/10 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 outline-none transition-colors text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-black/10 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 outline-none transition-colors text-zinc-900 dark:text-white"
                  placeholder="lunch, work, downtown"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-2 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-2xl flex items-center justify-center shadow-lg shadow-black/5 dark:shadow-white/5 active:scale-[0.98] transition-transform"
              >
                Add Expense
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
