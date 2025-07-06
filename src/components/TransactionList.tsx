import React from 'react';
import { Calendar, Tag, Trash2 } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  title: string;
  amount: number;
  date: string;
  category?: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Tag className="w-5 h-5" />
          Transações Recentes
        </h2>
      </div>
      <div className="max-h-[520px] overflow-y-auto">
        {transactions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Tag className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-lg font-medium">Nenhuma transação encontrada</p>
            <p className="text-sm">Adicione seu primeiro ganho ou gasto</p>
          </div>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                    <h3 className="font-medium text-gray-800">{transaction.title}</h3>
                    {transaction.category && (
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        {transaction.category}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {transaction.date}
                  </div>
                </div>
                <div className="text-right gap-5 flex items-center">
                  <span
                    className={`text-lg font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}R$ {transaction.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="text-red-400 hover:text-red-600 transition"
                    title="Remover transação"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;