import React from 'react';

interface Product {
    title: string;
    reference: string;
    quantity: number;
    unitPrice: string;
    totalPrice: string;
    salePrice: string;
}

interface ProductTableProps {
    products: Product[];
}

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
    return (
        <table className="w-full text-left text-sm bg-black/50 border-collapse border border-white/10 rounded-xl">
            <thead className="bg-white/10 text-white">
                <tr>
                    <th className="px-4 py-3">Produit</th>
                    <th className="px-4 py-3">Référence</th>
                    <th className="px-4 py-3">Quantité</th>
                    <th className="px-4 py-3">Prix Unitaire</th>
                    <th className="px-4 py-3">Prix Total</th>
                    <th className="px-4 py-3">Prix de Vente</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <tr
                        key={index}
                        className={`border-t border-white/10 ${index % 2 === 0 ? 'bg-black/5' : 'bg-black/10'
                            } hover:bg-white/10`}
                    >
                        <td className="px-4 py-3">{product.title}</td>
                        <td className="px-4 py-3">{product.reference}</td>
                        <td className="px-4 py-3">{product.quantity}</td>
                        <td className="px-4 py-3">{product.unitPrice}</td>
                        <td className="px-4 py-3">{product.totalPrice}</td>
                        <td className="px-4 py-3">{product.salePrice}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
