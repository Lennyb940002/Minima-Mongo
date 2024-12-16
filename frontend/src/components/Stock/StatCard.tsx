import React from 'react';

interface StatCardProps {
    title: string;
    value: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
    return (
        <div className="bg-white/10 border border-white/10 rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-4xl font-bold">{value}</p>
        </div>
    );
};
