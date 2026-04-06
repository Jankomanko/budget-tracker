'use client';

import { useState, useEffect } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

export default function Home() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch('/api/transactions')
            .then(res => res.json())
            .then(data => setTransactions(data));
    }, []);

    async function handleAdd(transaction) {
        const res = await fetch('/api/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transaction),
        });
        const saved = await res.json();
        setTransactions([saved, ...transactions]);
    }

    async function handleDelete(id) {
        await fetch(`/api/transactions?id=${id}`, { method: 'DELETE' });
        setTransactions(transactions.filter(t => t.id !== id));
    }

    const income  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const balance = income - expense;

    return (
        <main className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Budget Tracker</h1>

            <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                    { label: 'Balance',  value: balance, color: 'text-gray-800' },
                    { label: 'Income',   value: income,  color: 'text-green-600' },
                    { label: 'Expenses', value: expense, color: 'text-red-500' },
                ].map(({ label, value, color }) => (
                    <div key={label} className="bg-white border border-gray-200 rounded-xl p-4">
                        <p className="text-xs text-gray-400 mb-1">{label}</p>
                        <p className={`text-lg font-semibold ${color}`}>${value.toFixed(2)}</p>
                    </div>
                ))}
            </div>

            <TransactionForm onAdd={handleAdd} />
            <TransactionList transactions={transactions} onDelete={handleDelete} />
        </main>
    );
}