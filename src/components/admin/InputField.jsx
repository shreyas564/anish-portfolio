'use client';

export default function InputField({ label, value, onChange, type = 'text', placeholder, rows }) {
  const base = "w-full px-3.5 py-2.5 rounded-lg text-sm text-slate-900 bg-slate-50 border border-slate-200 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:bg-white";
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-xs font-semibold text-slate-600 tracking-wide">{label}</label>
      )}
      {rows ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows} className={base + ' resize-none'} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={base} />
      )}
    </div>
  );
}
