import React, { useState } from 'react';
import { Plus, DollarSign, Type } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  title: string;
  amount: number;
  date: string;
  category?: string;
}

interface AddTransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ onAddTransaction }) => {
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    onAddTransaction({
      type,
      title,
      amount: parseFloat(amount),
      category: type === 'income' ? 'Ganho' : 'Gasto'
    });

    setTitle('');
    setAmount('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Adicionar Transação
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Nova Transação</h3>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ×
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                type === 'income'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Ganho
            </button>
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                type === 'expense'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Gasto
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
          <div className="relative">
            <Type className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Salário, Gasolina..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Valor</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              step="0.01"
              min="0"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
          >
            Adicionar
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTransactionForm;