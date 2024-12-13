import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { StatCard } from '../../components/Stock/StatCard';
import { ProductTable } from '../../components/Stock/ProductTable';

export function StockPage() {
  const [activeTab, setActiveTab] = useState('apercu');

  // Exemple réaliste de données pour les produits
  const products = [
    { title: 'T-Shirt', reference: 'Noir/M', quantity: 120, unitPrice: '7,99€', totalPrice: '958,80€', salePrice: '19,99€' },
    { title: 'Jeans', reference: 'Bleu/32', quantity: 50, unitPrice: '29,50€', totalPrice: '1 475,00€', salePrice: '79,99€' },
    { title: 'Veste', reference: 'Cuir/XL', quantity: 30, unitPrice: '85,00€', totalPrice: '2 550,00€', salePrice: '199,99€' },
    { title: 'Chaussures', reference: 'Basket/42', quantity: 80, unitPrice: '45,00€', totalPrice: '3 600,00€', salePrice: '99,99€' },
    { title: 'Sweat', reference: 'Blanc/L', quantity: 60, unitPrice: '15,00€', totalPrice: '900,00€', salePrice: '39,99€' },
    { title: 'Pantalon', reference: 'Chino/40', quantity: 75, unitPrice: '22,00€', totalPrice: '1 650,00€', salePrice: '59,99€' },
    { title: 'T-Shirt', reference: 'Gris/XS', quantity: 200, unitPrice: '6,50€', totalPrice: '1 300,00€', salePrice: '14,99€' },
    { title: 'Chemise', reference: 'Bleue/41', quantity: 90, unitPrice: '18,00€', totalPrice: '1 620,00€', salePrice: '49,99€' },
    { title: 'Manteau', reference: 'Hiver/M', quantity: 25, unitPrice: '95,00€', totalPrice: '2 375,00€', salePrice: '249,99€' },
    { title: 'Short', reference: 'Sport/XXL', quantity: 60, unitPrice: '12,00€', totalPrice: '720,00€', salePrice: '29,99€' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Gestion des Stocks</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('apercu')}
            className={`px-4 py-2 rounded ${activeTab === 'apercu' ? 'bg-white text-black' : 'text-white border border-white'}`}
          >
            Aperçu
          </button>
          <button
            onClick={() => setActiveTab('alertes')}
            className={`px-4 py-2 rounded flex items-center gap-2 ${activeTab === 'alertes' ? 'bg-white text-black' : 'text-white border border-white'}`}
          >
            <AlertTriangle className="w-4 h-4" />
            Alertes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Statistiques côte à côte */}
        <div className="col-span-1">
          <StatCard title="Total Produits" value="725" />
        </div>
        <div className="col-span-1">
          <StatCard title="Valeur Stock" value="13 600,80€" />
        </div>
        <div className="col-span-1">
          <StatCard title="Commandes en Attente" value="15" />
        </div>

        {/* Tableau des produits */}
        <div className="col-span-3 bg-black border border-white rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Détails des Produits</h2>
          {/* Passer les données de produits à ProductTable */}
          <ProductTable products={products} />
        </div>
      </div>
    </div>
  );
}
