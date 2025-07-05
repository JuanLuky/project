import { useState, useEffect } from 'react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  title: string;
  amount: number;
  date: string;
  category?: string;
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('financial-transactions');
    return saved ? JSON.parse(saved) : [];
  });

  // // Carregar transações do localStorage
  // useEffect(() => {
  //   const savedTransactions = localStorage.getItem('financial-transactions');
  //   if (savedTransactions) {
  //     setTransactions(JSON.parse(savedTransactions));
  //   }
  // }, []);

  // Salvar transações no localStorage
  useEffect(() => {
    localStorage.setItem('financial-transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR'),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const removeTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const getTotalIncome = () => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getTotalExpense = () => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getBalance = () => {
    return getTotalIncome() - getTotalExpense();
  };

  return {
    transactions,
    addTransaction,
    removeTransaction,
    getTotalIncome,
    getTotalExpense,
    getBalance,
    setTransactions, // Expose setTransactions for direct updates if needed
  };
};