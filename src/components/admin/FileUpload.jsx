'use client';
import { useState, useRef } from 'react';
import { HiUpload, HiX, HiPhotograph, HiDocumentText } from 'react-icons/hi';

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

  const isImage = accept.startsWith('image');

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-600 tracking-wide">{label}</label>
      {preview ? (
        <div className="relative group">
          {isImage ? (
            <img src={preview} alt="Preview" className="w-full h-36 object-cover rounded-xl border border-slate-200 bg-slate-50" />
          ) : (
            <div className="w-full h-16 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-3 px-4 text-sm text-slate-600">
              <HiDocumentText className="w-5 h-5 text-blue-500 shrink-0" />
              <span className="truncate">{preview.split('/').pop()}</span>
            </div>
          )}
          <button onClick={handleClear} className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-none shadow-sm">
            <HiX className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full py-5 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center gap-2 cursor-pointer bg-slate-50 text-slate-500 hover:border-blue-400 hover:bg-blue-50/50 hover:text-blue-600 transition-all duration-200"
        >
          {uploading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium">Uploading...</span>
            </div>
          ) : (
            <>
              <HiUpload className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </>
          )}
        </button>
      )}
      <input ref={inputRef} type="file" accept={accept} onChange={handleUpload} className="hidden" />
    </div>
  );
}
