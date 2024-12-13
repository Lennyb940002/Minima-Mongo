// src/components/Accounting/StatCard.tsx
interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
}

export function StatCard({ title, value, icon }: StatCardProps) {
    return (
        <div className="bg-white text-black border border-white rounded-lg p-6">
            <div className="flex items-center mb-4 text-black">
                {/* Appliquez text-black à l'icône pour la rendre noire */}
                <div className="text-black">{icon}</div>
                <h3 className="ml-2 text-lg font-semibold">{title}</h3>
            </div>
            <p className="text-xl font-bold">{value}€</p>
        </div>
    );
}
