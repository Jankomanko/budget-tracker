export default function TransactionList({ transactions, onDelete }) {
    if (transactions.length === 0) {
        return <p className="text-sm text-gray-400 text-center py-8">No transactions yet. Add one above.</p>;
    }

    return (
        <ul className="space-y-2">
            {transactions.map(t => (
                <li
                    key={t.id}
                    className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3"
                >
                    <div>
                        <p className="text-sm font-medium text-gray-800">{t.description}</p>
                        <p className="text-xs text-gray-400">{t.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
            <span className={`text-sm font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
              {t.type === 'income' ? '+' : '-'}${parseFloat(t.amount).toFixed(2)}
            </span>
                        <button
                            onClick={() => onDelete(t.id)}
                            className="text-xs text-gray-300 hover:text-red-400 transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}