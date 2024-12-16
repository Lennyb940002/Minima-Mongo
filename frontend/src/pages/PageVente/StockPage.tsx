import { useState } from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { StatCard } from '../../components/Stock/StatCard';
import { ProductTable } from '../../components/Stock/ProductTable';

export const StockPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'apercu' | 'alertes'>('apercu');
  const [lowStockProducts, setLowStockProducts] = useState([
    { title: 'T-Shirt', reference: 'Noir/M', quantity: 120, unitPrice: '7,99€', totalPrice: '958,80€', salePrice: '19,99€' },
    { title: 'Jeans', reference: 'Bleu/32', quantity: 50, unitPrice: '29,50€', totalPrice: '1 475,00€', salePrice: '79,99€' },
    { title: 'Veste', reference: 'Cuir/XL', quantity: 30, unitPrice: '85,00€', totalPrice: '2 550,00€', salePrice: '199,99€' },
    { title: 'Chaussures', reference: 'Basket/42', quantity: 80, unitPrice: '45,00€', totalPrice: '3 600,00€', salePrice: '99,99€' },
    { title: 'Sweat', reference: 'Blanc/L', quantity: 60, unitPrice: '15,00€', totalPrice: '900,00€', salePrice: '39,99€' },
    { title: 'Pantalon', reference: 'Chino/40', quantity: 75, unitPrice: '22,00€', totalPrice: '1 650,00€', salePrice: '59,99€' },
    { title: 'T-Shirt', reference: 'Gris/XS', quantity: 200, unitPrice: '6,50€', totalPrice: '1 300,00€', salePrice: '14,99€' },
    { title: 'Chemise', reference: 'Bleue/41', quantity: 90, unitPrice: '18,00€', totalPrice: '1 620,00€', salePrice: '49,99€' },
    { title: 'Manteau', reference: 'Hiver/M', quantity: 5, unitPrice: '95,00€', totalPrice: '2 375,00€', salePrice: '249,99€' },
    { title: 'Short', reference: 'Sport/XXL', quantity: 3, unitPrice: '12,00€', totalPrice: '720,00€', salePrice: '29,99€' },
  ]);

  // Filtrer les produits avec un stock bas
  const criticalStockProducts = lowStockProducts.filter(product => product.quantity <= 5);

  // Fonction pour supprimer un produit de la liste des alertes
  const handleRemoveAlert = (productToRemove) => {
    setLowStockProducts(prevProducts =>
      prevProducts.filter(product =>
        product.title !== productToRemove.title ||
        product.reference !== productToRemove.reference
      )
    );
  };

  return (
    <div className="bg-black text-white min-h-screen space-y-8 p-6">
      {/* En-tête */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Stocks</h1>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-xl transition ${activeTab === 'apercu' ? 'bg-blue-600 text-white' : 'border border-white text-white'
              }`}
            onClick={() => setActiveTab('apercu')}
          >
            Aperçu
          </button>
          <button
            className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition ${activeTab === 'alertes' ? 'bg-blue-600 text-white' : 'border border-white text-white'
              }`}
            onClick={() => setActiveTab('alertes')}
          >
            <AlertTriangle className="w-5 h-5" />
            <span>Alertes</span>
          </button>
        </div>
      </header>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Produits" value="725" />
        <StatCard title="Valeur Stock" value="13 600,80€" />
        <StatCard title="Commandes en Attente" value="15" />
      </div>

      {/* Contenu principal avec colonne de droite pour stocks bas */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
        {/* Tableau des produits */}
        <div className="bg-black/50 border border-white/10 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Détails des Produits</h2>
          <ProductTable products={lowStockProducts} />
        </div>

        {/* Colonne de droite pour stocks bas */}
        {criticalStockProducts.length > 0 && (
          <div className="bg-red-900/30 border border-red-600 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-red-300">Stocks Critiques</h3>
              <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs">
                {criticalStockProducts.length}
              </span>
            </div>

            {criticalStockProducts.map((product) => (
              <div
                key={`${product.title}-${product.reference}`}
                className="bg-black/50 rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{product.title}</p>
                  <p className="text-sm text-white/70">{product.reference}</p>
                  <p className="text-sm text-red-400">Stock: {product.quantity}</p>
                </div>
                <button
                  onClick={() => handleRemoveAlert(product)}
                  className="bg-red-600 text-white px-1 py-1 rounded-lg flex items-center space-x-0 hover:bg-red-700 transition"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Supprimer</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {activeTab === 'alertes' && (
        <div className="bg-black/50 border border-white/10 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Aucune alerte pour le moment</h2>
          <p className="text-white/70">Tout semble en ordre pour vos stocks.</p>
        </div>
      )}
    </div>
  );
};