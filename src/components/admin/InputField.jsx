'use client';

export default function InputField({ label, value, onChange, type = 'text', placeholder, rows }) {
  const baseClass = "w-full px-4 py-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-primary)] outline-none focus:border-indigo-500 transition-colors text-sm";
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-[var(--text-primary)] opacity-80">{label}</label>}
      {rows ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows} className={baseClass + ' resize-none'} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={baseClass} />
      )}
    </div>
  );
}
