export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  tags: string[];
  date: string; // YYYY-MM-DD
}

export const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Utilities',
  'Entertainment',
  'Shopping',
  'Health',
  'Housing',
  'Personal Care',
  'Other'
];
