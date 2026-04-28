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
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }
      if (data.url) {
        setPreview(data.url);
        onChange(data.url);
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload Error: ' + err.message);
    }
    setUploading(false);
  };

  const handleClear = () => {
    setPreview('');
    onChange('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const isImage = accept.startsWith('image');
  const [mode, setMode] = useState('upload'); // 'upload' or 'link'
  const [linkInput, setLinkInput] = useState('');

  const handleLinkSubmit = () => {
    if (linkInput.trim()) {
      setPreview(linkInput.trim());
      onChange(linkInput.trim());
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-600 tracking-wide">{label}</label>
        {!preview && (
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setMode('upload')} className={`text-[10px] px-2 py-0.5 rounded font-semibold ${mode === 'upload' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:bg-slate-100'}`}>Upload</button>
            <button type="button" onClick={() => setMode('link')} className={`text-[10px] px-2 py-0.5 rounded font-semibold ${mode === 'link' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:bg-slate-100'}`}>Link</button>
          </div>
        )}
      </div>

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
          <button onClick={handleLinkSubmit} className="hidden" /> {/* Dummy */}
          <button onClick={handleClear} className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-none shadow-sm">
            <HiX className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : mode === 'upload' ? (
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
      ) : (
        <div className="flex items-center gap-2">
          <input type="text" value={linkInput} onChange={(e) => setLinkInput(e.target.value)} placeholder="Paste external URL here" className="flex-1 px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 border border-slate-200 outline-none focus:border-blue-500" />
          <button onClick={handleLinkSubmit} className="px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">Add</button>
        </div>
      )}
      <input ref={inputRef} type="file" accept={accept} onChange={handleUpload} className="hidden" />
    </div>
  );
}
