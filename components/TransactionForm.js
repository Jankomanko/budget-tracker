'use client';

import { useState } from 'react';

const CATEGORIES = ['Food', 'Rent', 'Salary', 'Transport', 'Entertainment', 'Other'];

export default function TransactionForm({ onAdd }) {
    const [form, setForm] = useState({
        description: '',
        amount: '',
        type: 'expense',
        category: 'Food',
    });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!form.description || !form.amount) return;

        onAdd({
            ...form,
            amount: parseFloat(form.amount),
            id: Date.now(),
        });

        setForm({ description: '', amount: '', type: 'expense', category: 'Food' });
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
            <h2 className="text-base font-semibold text-gray-700 mb-4">Add transaction</h2>

            <div className="grid grid-cols-2 gap-3 mb-3">
                <input
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                />
                <input
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                    type="number"
                    min="0"
                    step="0.01"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                />
                <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                >
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-gray-800 text-white text-sm rounded-lg py-2 hover:bg-gray-700 transition-colors"
            >
                Add
            </button>
        </form>
    );
}