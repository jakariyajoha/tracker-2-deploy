import React from 'react';
import { motion } from 'motion/react';
import { Trash2, Tag } from 'lucide-react';
import { Expense } from '../types';

interface ExpenseItemProps {
  key?: React.Key;
  expense: Expense;
  onDelete: (id: string) => void;
}

export function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(expense.amount);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(expense.date));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl hover:bg-black/5 dark:hover:bg-zinc-800/50 transition-colors gap-3 sm:gap-0"
    >
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-500 rounded-xl flex items-center justify-center shrink-0">
          <Tag size={20} />
        </div>
        <div>
          <p className="font-medium text-zinc-900 dark:text-white">{expense.description}</p>
          <p className="text-xs text-zinc-500">{expense.category} &bull; {formattedDate}</p>
        </div>
      </div>
      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 sm:gap-1 pl-14 sm:pl-0">
        <div className="flex items-center gap-3">
          <p className="font-medium text-zinc-900 dark:text-white">-{formattedAmount}</p>
          <button
            onClick={() => onDelete(expense.id)}
            className="text-zinc-400 hover:text-red-500 transition-colors"
            aria-label="Delete expense"
          >
            <Trash2 size={16} />
          </button>
        </div>
        {expense.tags.length > 0 && (
          <div className="flex flex-wrap justify-end gap-1">
            {expense.tags.map(tag => (
              <span 
                key={tag}
                className="inline-block px-2 py-0.5 text-[10px] bg-zinc-200 dark:bg-zinc-800 rounded-md text-zinc-700 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
