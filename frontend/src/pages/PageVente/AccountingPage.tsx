import React, { useState } from 'react';
import { Euro, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { StatCard } from '/src/components/Accounting/StatCard';
import { TransactionList } from '/src/components/Accounting/TransactionList';
import { AddTransactionModal } from '/src/components/Accounting/AddTransactionModal';

interface Transaction {
  type: 'revenus' | 'dépenses';
  amount: number;
  date: string;
  description?: string;
}

export function AccountingPage() {
  const [period, setPeriod] = useState<'jour' | 'semaine' | 'mois'>('mois');
  const [transactions, setTransactions] = useState<{
    revenues: Record<string, number>;
    expenses: Record<string, number>;
  }>({
    revenues: {
      '10/12/24': 1200,
      '09/12/24': 800,
      total: 2000,
    },
    expenses: {
      marketing: 300,
      ursaff: 150,
      other: 100,
      total: 550,
    },
  });

  const addTransaction = (transaction: Transaction) => {
    const { type, amount, date } = transaction;

    setTransactions(prev => {
      const updatedTransactions = { ...prev };

      // Ajouter la transaction au bon endroit
      if (type === 'revenus') {
        updatedTransactions.revenues[date] = amount;
        updatedTransactions.revenues.total += amount;
      } else {
        updatedTransactions.expenses[date] = amount;
        updatedTransactions.expenses.total += amount;
      }

      return updatedTransactions;
    });
  };

  const profit = transactions.revenues.total - transactions.expenses.total;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Comptabilité</h1>
        <div className="flex gap-2">
          {(['jour', 'semaine', 'mois'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded ${period === p ? 'bg-white text-black' : 'text-white border border-white'}`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <StatCard
          title="Revenus"
          value={transactions.revenues.total}
          icon={<Euro className="w-6 h-6 text-white" />}
        />

        <StatCard
          title="Dépenses"
          value={transactions.expenses.total}
          icon={<TrendingDown className="w-6 h-6 text-white" />}
        />

        <StatCard
          title="Bénéfices"
          value={profit}
          icon={<TrendingUp className="w-6 h-6 text-white" />}
        />
      </div>

      <div className="bg-black border border-white rounded-lg p-6 mt-6">
        <TransactionList data={transactions.revenues} period={period} />
      </div>

      <AddTransactionModal onAddTransaction={addTransaction} />
    </div>
  );
}