import React from 'react';
import { Calculator, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import FinancialCard from './components/FinancialCard';
import TransactionList from './components/TransactionList';
import AddTransactionForm from './components/AddTransactionForm';
import { useTransactions } from './hooks/useTransactions';

function App() {
  const {
    transactions,
    addTransaction,
    getTotalIncome,
    getTotalExpense,
    getBalance,
  } = useTransactions();

  const totalIncome = getTotalIncome();
  const totalExpense = getTotalExpense();
  const balance = getBalance();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-xl">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gerenciador Financeiro</h1>
                <p className="text-sm text-gray-600">Controle seus ganhos e gastos</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Saldo Atual</p>
              <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                R$ {Math.abs(balance).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cards and Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Financial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FinancialCard
                title="Ganhos"
                amount={totalIncome}
                type="income"
                icon={<TrendingUp className="w-6 h-6" />}
              />
              <FinancialCard
                title="Gastos"
                amount={totalExpense}
                type="expense"
                icon={<TrendingDown className="w-6 h-6" />}
              />
              <FinancialCard
                title="Saldo"
                amount={balance}
                type="balance"
                icon={<Wallet className="w-6 h-6" />}
              />
            </div>

            {/* Add Transaction Form */}
            <AddTransactionForm onAddTransaction={addTransaction} />

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumo Rápido</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <p className="text-sm text-green-600 font-medium">Total de Ganhos</p>
                  <p className="text-2xl font-bold text-green-700">R$ {totalIncome.toFixed(2)}</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <p className="text-sm text-red-600 font-medium">Total de Gastos</p>
                  <p className="text-2xl font-bold text-red-700">R$ {totalExpense.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Transaction List */}
          <div className="lg:col-span-1">
            <TransactionList transactions={transactions} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500">
            <p className="text-sm mb-2">
              Gerenciador Financeiro - Preparado para integração com WhatsApp
            </p>
            <p className="text-xs mt-16">
              Totos direitos reservados &copy; {new Date().getFullYear()} - Desenvolvido por 
              <a
                href="">
                  <span className="text-blue-600 hover:underline ml-1">Juan Santos</span>
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;