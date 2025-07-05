import React from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface FinancialCardProps {
  title: string;
  amount: number;
  type: 'income' | 'expense' | 'balance';
  icon?: React.ReactNode;
}

const FinancialCard: React.FC<FinancialCardProps> = ({ title, amount, type, icon }) => {
  const getCardStyles = () => {
    switch (type) {
      case 'income':
        return 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200';
      case 'expense':
        return 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200';
      case 'balance':
        return 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'income':
        return 'text-green-600';
      case 'expense':
        return 'text-red-600';
      case 'balance':
        return amount >= 0 ? 'text-blue-600' : 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getIcon = () => {
    if (icon) return icon;
    switch (type) {
      case 'income':
        return <TrendingUp className="w-6 h-6" />;
      case 'expense':
        return <TrendingDown className="w-6 h-6" />;
      case 'balance':
        return <Wallet className="w-6 h-6" />;
      default:
        return <Wallet className="w-6 h-6" />;
    }
  };

  return (
    <div className={`p-6 rounded-2xl border-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${getCardStyles()}`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-xl ${getTextColor()}`}>
          {getIcon()}
        </div>
        <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</h3>
      </div>
      <div className="flex items-center justify-between">
        <span className={`text-2xl font-bold ${getTextColor()}`}>
          R$ {Math.abs(amount).toFixed(2)}
        </span>
        {type === 'balance' && amount < 0 && (
          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
            Negativo
          </span>
        )}
      </div>
    </div>
  );
};

export default FinancialCard;