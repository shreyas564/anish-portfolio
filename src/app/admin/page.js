'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLogin from '@/components/admin/AdminLogin';
import SectionEditor from '@/components/admin/SectionEditor';
import InputField from '@/components/admin/InputField';
import FileUpload from '@/components/admin/FileUpload';
import {
  HiHome, HiUser, HiCollection, HiNewspaper, HiQuestionMarkCircle,
  HiShieldCheck, HiChartBar, HiGlobe, HiVideoCamera, HiDownload,
  HiCog, HiSave, HiEye, HiLogout, HiCheckCircle, HiPlus, HiTrash,
  HiViewGrid, HiMenu, HiX,
} from 'react-icons/hi';

const sidebarSections = [
  { id: 'hero', label: 'Hero Banner', icon: HiHome },
  { id: 'about', label: 'About & Profile', icon: HiUser },
  { id: 'projects', label: 'Projects', icon: HiCollection },
  { id: 'newsletter', label: 'Newsletter', icon: HiNewspaper },
  { id: 'quiz', label: 'Digital Quiz', icon: HiQuestionMarkCircle },
  { id: 'safety', label: 'Digital Safety', icon: HiShieldCheck },
  { id: 'mooc', label: 'MOOC Analysis', icon: HiChartBar },
  { id: 'iks', label: 'IKS Slides', icon: HiGlobe },
  { id: 'media', label: 'Media Gallery', icon: HiVideoCamera },
  { id: 'downloads', label: 'Downloads', icon: HiDownload },
  { id: 'footer', label: 'Footer / Settings', icon: HiCog },
];

export default function AdminPage() {
  const [password, setPassword] = useState(null);
  const [content, setContent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadContent = async () => {
    try { const res = await fetch('/api/content', { cache: 'no-store' }); setContent(await res.json()); } catch {}
    setLoading(false);
  };
  useEffect(() => { if (password) loadContent(); }, [password]);

  const save = async () => {
    setSaving(true); setSaved(false);
    try {
      const res = await fetch('/api/content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password, content }) });
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); } else alert('Save failed');
    } catch { alert('Connection error'); }
    setSaving(false);
  };

  const update = (path, value) => {
    setContent((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let obj = copy;
      for (let i = 0; i < keys.length - 1; i++) { const k = isNaN(keys[i]) ? keys[i] : parseInt(keys[i]); obj = obj[k]; }
      obj[isNaN(keys[keys.length - 1]) ? keys[keys.length - 1] : parseInt(keys[keys.length - 1])] = value;
      return copy;
    });
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    setSidebarOpen(false);
    document.getElementById(`admin-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!password) return <AdminLogin onLogin={setPassword} />;
  if (loading || !content) return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: '#F7F9FB', fontFamily: "'Inter', sans-serif" }}>
      <div className="w-10 h-10 border-[3px] border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
      <p className="text-slate-500 text-sm font-medium">Loading Content Studio...</p>
    </div>
  );

  return (
    <div className="min-h-screen flex" style={{ background: '#F7F9FB', fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar Overlay (mobile) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-[260px] flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ background: '#1A2B3C' }}>
        <div className="px-5 pt-6 pb-4">
          <h1 className="text-[15px] font-bold text-white tracking-tight">Admin Console</h1>
          <p className="text-[11px] text-slate-400 mt-0.5">Content Management</p>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 space-y-0.5 pb-4">
          {sidebarSections.map((s) => {
            const active = activeSection === s.id;
            return (
              <button key={s.id} onClick={() => scrollToSection(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 border-none cursor-pointer ${
                  active ? 'bg-blue-500/15 text-white shadow-[0_0_12px_rgba(59,130,246,0.25)]' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 bg-transparent'
                }`}
              >
                <s.icon className={`w-4 h-4 shrink-0 ${active ? 'text-blue-400' : ''}`} />
                {s.label}
              </button>
            );
          })}
        </nav>
        <div className="px-4 py-4 border-t border-slate-700/50 mt-auto">
          <button onClick={() => setPassword(null)} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer border-none bg-transparent">
            <HiLogout className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen lg:ml-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
          <div className="flex items-center justify-between px-4 sm:px-6 h-14">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer border-none bg-transparent">
                <HiMenu className="w-5 h-5" />
              </button>
              <h2 className="text-sm font-semibold text-slate-800">Content Studio</h2>
            </div>
            <div className="flex items-center gap-2.5">
              <AnimatePresence>
                {saved && (
                  <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                    <HiCheckCircle className="w-3.5 h-3.5" /> Saved
                  </motion.span>
                )}
              </AnimatePresence>
              <a href="/" target="_blank" className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors no-underline border border-slate-200">
                <HiEye className="w-3.5 h-3.5" /> Preview
              </a>
              <button onClick={save} disabled={saving} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white border-none cursor-pointer transition-colors disabled:opacity-50" style={{ background: '#0058BE' }}>
                <HiSave className="w-3.5 h-3.5" /> {saving ? 'Saving...' : 'Publish'}
              </button>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-5">
          {/* Welcome */}
          <div className="rounded-xl p-6 text-white relative overflow-hidden" style={{ background: '#1A2B3C' }}>
            <div className="absolute top-[-30px] right-[-30px] w-40 h-40 rounded-full opacity-20 blur-3xl" style={{ background: '#3B82F6' }} />
            <div className="relative z-10">
              <h2 className="text-lg font-bold tracking-tight">Welcome back, Admin</h2>
              <p className="text-slate-300 text-sm mt-1 max-w-lg">Manage your B.Ed portfolio content. Changes publish instantly to the live site.</p>
            </div>
          </div>

          {/* --- Sections --- */}
          <div id="admin-hero"><SectionEditor title="Hero Banner" icon={HiHome} defaultOpen>
            <InputField label="Full Name" value={content.hero.name} onChange={(v) => update('hero.name', v)} placeholder="e.g. Anish Shriram Paranjape" />
            <InputField label="Tagline" value={content.hero.tagline} onChange={(v) => update('hero.tagline', v)} rows={3} />
            <InputField label="Academic Year" value={content.hero.academicYear} onChange={(v) => update('hero.academicYear', v)} />
          </SectionEditor></div>

          <div id="admin-about"><SectionEditor title="About & Profile" icon={HiUser}>
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <InputField label="Display Name" value={content.about.name} onChange={(v) => update('about.name', v)} />
              <FileUpload label="Profile Image" value={content.about.profileImage} onChange={(v) => update('about.profileImage', v)} password={password} category="profile" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <InputField label="Paragraph 1" value={content.about.paragraph1} onChange={(v) => update('about.paragraph1', v)} rows={5} />
              <InputField label="Paragraph 2" value={content.about.paragraph2} onChange={(v) => update('about.paragraph2', v)} rows={5} />
            </div>
            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-600 mb-3">Highlights</p>
              <div className="grid md:grid-cols-3 gap-3">
                {content.about.highlights.map((h, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-2">
                    <InputField placeholder="Label" value={h.label} onChange={(v) => update(`about.highlights.${i}.label`, v)} />
                    <InputField placeholder="Description" value={h.desc} onChange={(v) => update(`about.highlights.${i}.desc`, v)} />
                  </div>
                ))}
              </div>
            </div>
          </SectionEditor></div>

          <div id="admin-projects"><SectionEditor title="Projects Showcase" icon={HiCollection}>
            <div className="grid md:grid-cols-2 gap-4">
              {content.projects.map((p, i) => (
                <div key={i} className="p-4 rounded-lg border border-slate-100 bg-slate-50 space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <span className="text-sm font-semibold text-slate-700">Card {i + 1}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-600 font-mono font-medium">{p.href}</span>
                  </div>
                  <InputField label="Title" value={p.title} onChange={(v) => update(`projects.${i}.title`, v)} />
                  <InputField label="Description" value={p.desc} onChange={(v) => update(`projects.${i}.desc`, v)} rows={2} />
                </div>
              ))}
            </div>
          </SectionEditor></div>

          <div id="admin-newsletter"><SectionEditor title="Digital Newsletter" icon={HiNewspaper}>
            <div className="mb-6 p-5 rounded-xl bg-blue-50 border border-blue-200">
              <h3 className="text-sm font-bold text-slate-800 mb-1">Master PDF Upload</h3>
              <p className="text-xs text-slate-500 mb-3">Upload the complete newsletter PDF for visitors to download.</p>
              <FileUpload label="Newsletter PDF" value={content.newsletter.pdfUrl} onChange={(v) => update('newsletter.pdfUrl', v)} password={password} category="newsletter" accept="application/pdf" />
            </div>
            <p className="text-xs font-semibold text-slate-600 mb-3">Flipbook Pages</p>
            <div className="space-y-4">
              {content.newsletter.items.map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-4 p-4 rounded-lg border border-slate-100 bg-white">
                  <div className="md:w-1/3"><FileUpload label={`Page ${i+1}`} value={item.image} onChange={(v) => update(`newsletter.items.${i}.image`, v)} password={password} category="newsletter" /></div>
                  <div className="md:w-2/3 space-y-3">
                    <InputField label="Headline" value={item.title} onChange={(v) => update(`newsletter.items.${i}.title`, v)} />
                    <InputField label="Description" value={item.description} onChange={(v) => update(`newsletter.items.${i}.description`, v)} rows={2} />
                  </div>
                </div>
              ))}
              <button onClick={() => update('newsletter.items', [...content.newsletter.items, { title: 'New Page', description: '', image: '' }])} className="w-full py-3 rounded-lg border-2 border-dashed border-slate-200 text-slate-400 text-sm font-medium hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer bg-transparent flex justify-center items-center gap-1.5">
                <HiPlus className="w-4 h-4" /> Add Page
              </button>
            </div>
          </SectionEditor></div>

          <div id="admin-quiz"><SectionEditor title="Digital Quiz" icon={HiQuestionMarkCircle}>
            <div className="grid md:grid-cols-2 gap-4">
              <InputField label="Quiz Title" value={content.quiz.title} onChange={(v) => update('quiz.title', v)} />
              <InputField label="Platform" value={content.quiz.platform} onChange={(v) => update('quiz.platform', v)} />
            </div>
            <InputField label="Embed URL" value={content.quiz.embedUrl} onChange={(v) => update('quiz.embedUrl', v)} rows={3} placeholder="https://docs.google.com/forms/..." />
            <InputField label="External Link" value={content.quiz.externalUrl} onChange={(v) => update('quiz.externalUrl', v)} />
            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-600 mb-2">Stats</p>
              <div className="grid grid-cols-3 gap-3">
                {content.quiz.stats.map((s, i) => (
                  <InputField key={i} placeholder={`Stat ${i+1}`} value={s} onChange={(v) => { const st = [...content.quiz.stats]; st[i] = v; update('quiz.stats', st); }} />
                ))}
              </div>
            </div>
          </SectionEditor></div>

          <div id="admin-safety"><SectionEditor title="Digital Safety" icon={HiShieldCheck}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Poster</p>
                <InputField label="Description" value={content.safety.posterDescription} onChange={(v) => update('safety.posterDescription', v)} rows={2} />
                <FileUpload label="Poster Image" value={content.safety.posterImage} onChange={(v) => update('safety.posterImage', v)} password={password} category="safety" />
              </div>
              <div className="space-y-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Video</p>
                <InputField label="Description" value={content.safety.videoDescription} onChange={(v) => update('safety.videoDescription', v)} rows={2} />
                <InputField label="Embed URL" value={content.safety.videoUrl} onChange={(v) => update('safety.videoUrl', v)} />
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Duration" value={content.safety.videoDuration} onChange={(v) => update('safety.videoDuration', v)} />
                  <InputField label="Format" value={content.safety.videoFormat} onChange={(v) => update('safety.videoFormat', v)} />
                </div>
              </div>
            </div>
          </SectionEditor></div>

          <div id="admin-mooc"><SectionEditor title="MOOC Analysis" icon={HiChartBar}>
            <div className="space-y-4">
              {content.mooc.timeline.map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-slate-50 border border-slate-100 relative">
                  {content.mooc.timeline.length > 1 && (
                    <button onClick={() => update('mooc.timeline', content.mooc.timeline.filter((_, idx) => idx !== i))} className="absolute top-3 right-3 w-7 h-7 rounded-md bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors cursor-pointer border-none">
                      <HiTrash className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <div className="grid md:grid-cols-3 gap-3">
                    <InputField label="Title" value={item.title} onChange={(v) => update(`mooc.timeline.${i}.title`, v)} />
                    <InputField label="Status" value={item.status} onChange={(v) => update(`mooc.timeline.${i}.status`, v)} />
                    <InputField label="Step #" value={item.step} onChange={(v) => update(`mooc.timeline.${i}.step`, v)} />
                  </div>
                  <div className="mt-3"><InputField label="Description" value={item.desc} onChange={(v) => update(`mooc.timeline.${i}.desc`, v)} rows={2} /></div>
                </div>
              ))}
              <button onClick={() => update('mooc.timeline', [...content.mooc.timeline, { step: String(content.mooc.timeline.length + 1).padStart(2, '0'), title: '', desc: '', status: '' }])} className="w-full py-3 rounded-lg border-2 border-dashed border-slate-200 text-slate-400 text-sm font-medium hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer bg-transparent flex justify-center items-center gap-1.5">
                <HiPlus className="w-4 h-4" /> Add Node
              </button>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-4">
              <InputField label="Key Takeaways" value={content.mooc.takeaways} onChange={(v) => update('mooc.takeaways', v)} rows={3} />
            </div>
          </SectionEditor></div>

          <div id="admin-iks"><SectionEditor title="IKS Presentation" icon={HiGlobe}>
            <div className="space-y-4">
              {content.iks.slides.map((slide, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-4 p-4 rounded-lg border border-slate-100 bg-white relative group">
                  {content.iks.slides.length > 1 && (
                    <button onClick={() => update('iks.slides', content.iks.slides.filter((_, idx) => idx !== i))} className="absolute top-3 right-3 w-7 h-7 rounded-md bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all cursor-pointer border-none">
                      <HiTrash className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <div className="md:w-1/3"><FileUpload label={`Slide ${i+1}`} value={slide.image} onChange={(v) => update(`iks.slides.${i}.image`, v)} password={password} category="iks" /></div>
                  <div className="md:w-2/3 space-y-3">
                    <InputField label="Title" value={slide.title} onChange={(v) => update(`iks.slides.${i}.title`, v)} />
                    <InputField label="Content" value={slide.desc} onChange={(v) => update(`iks.slides.${i}.desc`, v)} rows={3} />
                  </div>
                </div>
              ))}
              <button onClick={() => update('iks.slides', [...content.iks.slides, { title: '', desc: '', image: '' }])} className="w-full py-3 rounded-lg border-2 border-dashed border-slate-200 text-slate-400 text-sm font-medium hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer bg-transparent flex justify-center items-center gap-1.5">
                <HiPlus className="w-4 h-4" /> Add Slide
              </button>
            </div>
          </SectionEditor></div>

          <div id="admin-media"><SectionEditor title="Media Gallery" icon={HiVideoCamera}>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-3 mb-4">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Featured Video</p>
              <div className="grid md:grid-cols-2 gap-3">
                <InputField label="Title" value={content.media.videoTitle} onChange={(v) => update('media.videoTitle', v)} />
                <InputField label="Description" value={content.media.videoDescription} onChange={(v) => update('media.videoDescription', v)} />
              </div>
              <InputField label="Embed URL" value={content.media.videoUrl} onChange={(v) => update('media.videoUrl', v)} />
            </div>
            <p className="text-xs font-semibold text-slate-600 mb-3">Image Grid</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {content.media.gallery.map((g, i) => (
                <div key={i} className="p-3 rounded-lg border border-slate-100 bg-white space-y-3">
                  <FileUpload label={`Photo ${i+1}`} value={g.image} onChange={(v) => update(`media.gallery.${i}.image`, v)} password={password} category="gallery" />
                  <InputField placeholder="Caption" value={g.caption} onChange={(v) => update(`media.gallery.${i}.caption`, v)} />
                </div>
              ))}
            </div>
          </SectionEditor></div>

          <div id="admin-downloads"><SectionEditor title="Downloads Hub" icon={HiDownload}>
            <div className="grid md:grid-cols-3 gap-4">
              {content.downloads.map((d, i) => (
                <div key={i} className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">{i+1}</div>
                  <InputField label="Title" value={d.title} onChange={(v) => update(`downloads.${i}.title`, v)} />
                  <InputField label="Description" value={d.desc} onChange={(v) => update(`downloads.${i}.desc`, v)} />
                  <FileUpload label="File" value={d.file} onChange={(v) => update(`downloads.${i}.file`, v)} password={password} category="downloads" accept="*/*" />
                </div>
              ))}
            </div>
          </SectionEditor></div>

          <div id="admin-footer"><SectionEditor title="Footer / Settings" icon={HiCog}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider pb-2 border-b border-slate-200">Identity</p>
                <InputField label="Name" value={content.footer.name} onChange={(v) => update('footer.name', v)} />
                <InputField label="College" value={content.footer.college} onChange={(v) => update('footer.college', v)} />
                <InputField label="Year" value={content.footer.year} onChange={(v) => update('footer.year', v)} />
              </div>
              <div className="space-y-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider pb-2 border-b border-slate-200">Social Links</p>
                <InputField label="Email" value={content.footer.socials.email} onChange={(v) => update('footer.socials.email', v)} type="email" />
                <InputField label="LinkedIn" value={content.footer.socials.linkedin} onChange={(v) => update('footer.socials.linkedin', v)} />
                <InputField label="GitHub" value={content.footer.socials.github} onChange={(v) => update('footer.socials.github', v)} />
                <InputField label="Twitter" value={content.footer.socials.twitter} onChange={(v) => update('footer.socials.twitter', v)} />
                <InputField label="Instagram" value={content.footer.socials.instagram} onChange={(v) => update('footer.socials.instagram', v)} />
              </div>
            </div>
          </SectionEditor></div>

          {/* Bottom spacer */}
          <div className="h-16" />
        </div>
      </main>
    </div>
  );
}
