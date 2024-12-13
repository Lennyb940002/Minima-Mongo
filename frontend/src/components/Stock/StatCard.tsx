import React from 'react';

interface StatCardProps {
    title: string;
    value: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
    return (
        <div className="bg-white text-black text-center p-8 rounded-[28px] border border-white">
            <h3 className="text-2xl font-semibold p-3 mb-6">{title}</h3>
            <p className="text-6xl font-bold mb-8" >{value}</p>
        </div>
    );
};
