'use client';
import { useState, useRef } from 'react';
import { HiUpload, HiX, HiPhotograph } from 'react-icons/hi';

export default function FileUpload({ value, onChange, password, category = 'general', accept = 'image/*', label = 'Upload File' }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || '');
  const inputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    formData.append('password', password);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        setPreview(data.url);
        onChange(data.url);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
    setUploading(false);
  };

  const handleClear = () => {
    setPreview('');
    onChange('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[var(--text-primary)] opacity-80">{label}</label>
      {preview ? (
        <div className="relative group">
          {accept.startsWith('image') ? (
            <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-xl border border-[var(--glass-border)]" />
          ) : (
            <div className="w-full h-20 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] flex items-center justify-center text-sm opacity-60">
              📎 {preview.split('/').pop()}
            </div>
          )}
          <button onClick={handleClear} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-none">
            <HiX className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full py-6 border-2 border-dashed border-indigo-500/30 rounded-xl flex flex-col items-center gap-2 cursor-pointer bg-transparent text-[var(--text-primary)] hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all"
        >
          {uploading ? (
            <span className="text-sm opacity-60">Uploading...</span>
          ) : (
            <>
              <HiUpload className="w-6 h-6 opacity-40" />
              <span className="text-sm opacity-60">{label}</span>
            </>
          )}
        </button>
      )}
      <input ref={inputRef} type="file" accept={accept} onChange={handleUpload} className="hidden" />
    </div>
  );
}
