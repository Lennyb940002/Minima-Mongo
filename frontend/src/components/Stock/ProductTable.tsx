// ProductTable.tsx
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
        <table className="min-w-full table-auto text-white">
            <thead>
                <tr>
                    <th className="px-4 py-2">Produit</th>
                    <th className="px-4 py-2">Référence</th>
                    <th className="px-4 py-2">Quantité</th>
                    <th className="px-4 py-2">Prix Unitaire</th>
                    <th className="px-4 py-2">Prix Total</th>
                    <th className="px-4 py-2">Prix de Vente</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <tr key={index} className="border-t border-gray-700">
                        <td className="px-4 py-2">{product.title}</td>
                        <td className="px-4 py-2">{product.reference}</td>
                        <td className="px-4 py-2">{product.quantity}</td>
                        <td className="px-4 py-2">{product.unitPrice}</td>
                        <td className="px-4 py-2">{product.totalPrice}</td>
                        <td className="px-4 py-2">{product.salePrice}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
