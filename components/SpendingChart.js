'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function SpendingChart({ transactions }) {
    const categories = ['Food', 'Rent', 'Salary', 'Transport', 'Entertainment', 'Other'];

    const data = categories.map(cat => ({
        name: cat,
        amount: transactions
            .filter(t => t.category === cat && t.type === 'expense')
            .reduce((s, t) => s + t.amount, 0),
    })).filter(d => d.amount > 0);

    if (data.length === 0) return null;

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
            <h2 className="text-base font-semibold text-gray-700 mb-4">Spending by category</h2>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data} barSize={32}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                    <Bar dataKey="amount" radius={[6, 6, 0, 0]} fill="#1f2937" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}