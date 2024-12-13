import React from 'react';
import { Trash } from 'lucide-react'; // Import de l'icône poubelle

interface SalesTableRowProps {
  sale: {
    id: string;
    product: string;
    quantity: number;
    salePrice: number;
    unitCost: number;
    saleDate: string;
    client: string;
    paymentMethod: 'cash' | 'card' | 'transfer';
    paymentStatus: 'completed' | 'pending' | 'cancelled';
    notes?: string;
  };
  onDelete: (id: string) => void;
}

export function SalesTableRow({ sale, onDelete }: SalesTableRowProps) {
  const margin =
    sale.salePrice && sale.unitCost && sale.quantity
      ? ((sale.salePrice - sale.unitCost * sale.quantity) /
        (sale.unitCost * sale.quantity) *
        100
      ).toFixed(2)
      : '0.00';

  const statusColors: Record<'completed' | 'pending' | 'cancelled', string> = {
    completed: 'bg-green-500/20 text-green-400',
    pending: 'bg-yellow-500/20 text-yellow-400',
    cancelled: 'bg-red-500/20 text-red-400',
  };

  const statusTranslations: Record<'completed' | 'pending' | 'cancelled', string> = {
    completed: 'Effectué',
    pending: 'En attente',
    cancelled: 'Annulé',
  };

  const paymentMethodTranslations: Record<'cash' | 'card' | 'transfer', string> = {
    cash: 'Espèces',
    card: 'Carte',
    transfer: 'Virement',
  };

  return (
    <tr className="group border-b border-white/10 hover:bg-white/10 transition">
      <td className="p-4">{sale.product || 'N/A'}</td>
      <td className="p-4 text-center">{sale.quantity || 0}</td>
      <td className="p-4 text-center">{(sale.salePrice || 0).toFixed(2)} €</td>
      <td className="p-4 text-center">{(sale.unitCost || 0).toFixed(2)} €</td>
      <td className="p-4 text-center">{margin}%</td>
      <td className="p-4 text-center">
        {sale.saleDate
          ? new Date(sale.saleDate).toLocaleDateString('fr-FR')
          : 'Date non définie'}
      </td>
      <td className="p-4 text-center">{sale.client || '-'}</td>
      <td className="p-4 text-center">{paymentMethodTranslations[sale.paymentMethod] || 'N/A'}</td>
      <td className="p-4 text-center">
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[sale.paymentStatus] || ''}`}
        >
          {statusTranslations[sale.paymentStatus] || 'Statut inconnu'}
        </span>
      </td>
      <td className="p-4">{sale.notes || '-'}</td>
      <td className="p-4 text-right">
        <button
          onClick={() => onDelete(sale.id)}
          className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-all inline-flex items-center text-center mr-5"
        >
          <Trash size={18} />
        </button>
      </td>
    </tr>
  );
}

export function SalesTable({ sales, onDelete }: { sales: SalesTableRowProps['sale'][]; onDelete: (id: string) => void }) {
  const totalSales = sales.reduce((sum, sale) => sum + sale.salePrice * sale.quantity, 0);
  const totalCosts = sales.reduce((sum, sale) => sum + sale.unitCost * sale.quantity, 0);
  const totalMargin = totalSales - totalCosts;
  const totalMarginPercentage = totalSales && totalCosts ? ((totalMargin / totalSales) * 100).toFixed(2) : '0.00';

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-lg border-b border-white/10 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sales Dashboard</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center space-x-2"
        >
          <span>Ajouter une vente</span>
        </button>
      </header>

      <div className="overflow-auto mt-8 mx-auto max-w-6xl">
        <table className="table-auto w-full bg-white/5 border border-white/10 rounded-xl text-sm">
          <thead className="bg-white/10 text-white">
            <tr>
              <th className="p-4 text-left">Produit</th>
              <th className="p-4 text-center">Quantité</th>
              <th className="p-4 text-right">Prix de vente</th>
              <th className="p-4 text-right">Coût unitaire</th>
              <th className="p-4 text-right">Marge (%)</th>
              <th className="p-4 text-left">Date de vente</th>
              <th className="p-4 text-left">Client</th>
              <th className="p-4 text-left">Mode de paiement</th>
              <th className="p-4 text-left">Statut</th>
              <th className="p-4 text-left">Notes</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <SalesTableRow key={sale.id} sale={sale} onDelete={onDelete} />
            ))}


          </tbody>
          {/* Ligne de total */}
          <tfoot>

          </tfoot>
        </table>
      </div>
    </div>
  );
}
