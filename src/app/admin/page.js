'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminLogin from '@/components/admin/AdminLogin';
import SectionEditor from '@/components/admin/SectionEditor';
import InputField from '@/components/admin/InputField';
import FileUpload from '@/components/admin/FileUpload';
import {
  HiHome, HiUser, HiCollection, HiNewspaper, HiQuestionMarkCircle,
  HiShieldCheck, HiChartBar, HiGlobe, HiVideoCamera, HiDownload,
  HiCog, HiSave, HiEye, HiLogout, HiCheckCircle, HiPlus, HiTrash,
} from 'react-icons/hi';

export default function AdminPage() {
  const [password, setPassword] = useState(null);
  const [content, setContent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadContent = async () => {
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      setContent(data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    if (password) loadContent();
  }, [password]);

  const save = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, content }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert('Save failed — check password');
      }
    } catch {
      alert('Connection error');
    }
    setSaving(false);
  };

  const update = (path, value) => {
    setContent((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let obj = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = isNaN(keys[i]) ? keys[i] : parseInt(keys[i]);
        obj = obj[k];
      }
      const lastKey = isNaN(keys[keys.length - 1]) ? keys[keys.length - 1] : parseInt(keys[keys.length - 1]);
      obj[lastKey] = value;
      return copy;
    });
  };

  if (!password) return <AdminLogin onLogin={setPassword} />;
  if (loading || !content) return <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]"><p className="opacity-60">Loading...</p></div>;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 navbar-glass">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <HiCog className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold font-['Outfit'] text-[var(--text-primary)]">Content Manager</span>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <motion.span initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="text-sm text-green-500 flex items-center gap-1">
                <HiCheckCircle className="w-4 h-4" /> Saved!
              </motion.span>
            )}
            <a href="/" target="_blank" className="btn-outline !py-2 !px-4 !text-xs">
              <HiEye className="w-4 h-4" /> Preview
            </a>
            <button onClick={save} disabled={saving} className="btn-primary !py-2 !px-4 !text-xs">
              <HiSave className="w-4 h-4" /> {saving ? 'Saving...' : 'Save All'}
            </button>
            <button onClick={() => setPassword(null)} className="w-9 h-9 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center cursor-pointer border-none hover:bg-red-500/20 transition-colors">
              <HiLogout className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Editor Sections */}
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-4">

        {/* HERO */}
        <SectionEditor title="Hero Section" icon={HiHome} defaultOpen={true}>
          <InputField label="Your Name" value={content.hero.name} onChange={(v) => update('hero.name', v)} />
          <InputField label="Tagline / Introduction" value={content.hero.tagline} onChange={(v) => update('hero.tagline', v)} rows={3} />
          <InputField label="Academic Year" value={content.hero.academicYear} onChange={(v) => update('hero.academicYear', v)} />
        </SectionEditor>

        {/* ABOUT */}
        <SectionEditor title="About Section" icon={HiUser}>
          <InputField label="Display Name" value={content.about.name} onChange={(v) => update('about.name', v)} />
          <InputField label="Introduction Paragraph" value={content.about.paragraph1} onChange={(v) => update('about.paragraph1', v)} rows={4} />
          <InputField label="Second Paragraph" value={content.about.paragraph2} onChange={(v) => update('about.paragraph2', v)} rows={4} />
          <FileUpload label="Profile Image" value={content.about.profileImage} onChange={(v) => update('about.profileImage', v)} password={password} category="profile" />
          <div className="space-y-3">
            <p className="text-sm font-medium opacity-80">Highlight Cards</p>
            {content.about.highlights.map((h, i) => (
              <div key={i} className="grid grid-cols-2 gap-3">
                <InputField placeholder="Label" value={h.label} onChange={(v) => update(`about.highlights.${i}.label`, v)} />
                <InputField placeholder="Detail" value={h.desc} onChange={(v) => update(`about.highlights.${i}.desc`, v)} />
              </div>
            ))}
          </div>
        </SectionEditor>

        {/* PROJECTS */}
        <SectionEditor title="Projects Overview" icon={HiCollection}>
          {content.projects.map((p, i) => (
            <div key={i} className="p-4 rounded-xl bg-indigo-500/5 space-y-3">
              <p className="text-sm font-semibold opacity-70">Project {i + 1}</p>
              <InputField placeholder="Title" value={p.title} onChange={(v) => update(`projects.${i}.title`, v)} />
              <InputField placeholder="Description" value={p.desc} onChange={(v) => update(`projects.${i}.desc`, v)} rows={2} />
            </div>
          ))}
        </SectionEditor>

        {/* NEWSLETTER */}
        <SectionEditor title="Digital Newsletter" icon={HiNewspaper}>
          {content.newsletter.items.map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-indigo-500/5 space-y-3">
              <p className="text-sm font-semibold opacity-70">Page {i + 1}</p>
              <InputField placeholder="Page Title" value={item.title} onChange={(v) => update(`newsletter.items.${i}.title`, v)} />
              <InputField placeholder="Description" value={item.description} onChange={(v) => update(`newsletter.items.${i}.description`, v)} />
              <FileUpload label="Page Image" value={item.image} onChange={(v) => update(`newsletter.items.${i}.image`, v)} password={password} category="newsletter" />
            </div>
          ))}
          <button onClick={() => {
            const items = [...content.newsletter.items, { title: '[New Page Title]', description: '[Description]', image: '' }];
            update('newsletter.items', items);
          }} className="btn-outline !py-2 !px-4 !text-xs w-full justify-center">
            <HiPlus className="w-4 h-4" /> Add Page
          </button>
        </SectionEditor>

        {/* QUIZ */}
        <SectionEditor title="Digital Quiz" icon={HiQuestionMarkCircle}>
          <InputField label="Quiz Title" value={content.quiz.title} onChange={(v) => update('quiz.title', v)} />
          <InputField label="Platform Name" value={content.quiz.platform} onChange={(v) => update('quiz.platform', v)} />
          <InputField label="Embed URL (iframe src)" value={content.quiz.embedUrl} onChange={(v) => update('quiz.embedUrl', v)} placeholder="https://docs.google.com/forms/d/e/.../viewform?embedded=true" />
          <InputField label="External Link" value={content.quiz.externalUrl} onChange={(v) => update('quiz.externalUrl', v)} />
          <div className="space-y-3">
            <p className="text-sm font-medium opacity-80">Stats</p>
            {content.quiz.stats.map((s, i) => (
              <InputField key={i} placeholder={`Stat ${i + 1}`} value={s} onChange={(v) => {
                const stats = [...content.quiz.stats];
                stats[i] = v;
                update('quiz.stats', stats);
              }} />
            ))}
          </div>
        </SectionEditor>

        {/* SAFETY */}
        <SectionEditor title="Digital Safety" icon={HiShieldCheck}>
          <InputField label="Poster Description" value={content.safety.posterDescription} onChange={(v) => update('safety.posterDescription', v)} />
          <FileUpload label="Safety Poster Image" value={content.safety.posterImage} onChange={(v) => update('safety.posterImage', v)} password={password} category="safety" />
          <InputField label="Video Description" value={content.safety.videoDescription} onChange={(v) => update('safety.videoDescription', v)} />
          <InputField label="Video URL (YouTube embed or file)" value={content.safety.videoUrl} onChange={(v) => update('safety.videoUrl', v)} placeholder="https://youtube.com/embed/..." />
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Video Duration" value={content.safety.videoDuration} onChange={(v) => update('safety.videoDuration', v)} />
            <InputField label="Video Format" value={content.safety.videoFormat} onChange={(v) => update('safety.videoFormat', v)} />
          </div>
        </SectionEditor>

        {/* MOOC */}
        <SectionEditor title="MOOC Analysis" icon={HiChartBar}>
          {content.mooc.timeline.map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-indigo-500/5 space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold opacity-70">Step {item.step}</p>
                {content.mooc.timeline.length > 1 && (
                  <button onClick={() => {
                    const tl = content.mooc.timeline.filter((_, idx) => idx !== i);
                    update('mooc.timeline', tl);
                  }} className="text-red-500 cursor-pointer border-none bg-transparent"><HiTrash className="w-4 h-4" /></button>
                )}
              </div>
              <InputField placeholder="Title" value={item.title} onChange={(v) => update(`mooc.timeline.${i}.title`, v)} />
              <InputField placeholder="Description" value={item.desc} onChange={(v) => update(`mooc.timeline.${i}.desc`, v)} rows={2} />
              <InputField placeholder="Status" value={item.status} onChange={(v) => update(`mooc.timeline.${i}.status`, v)} />
            </div>
          ))}
          <button onClick={() => {
            const tl = [...content.mooc.timeline, { step: String(content.mooc.timeline.length + 1).padStart(2, '0'), title: '[New Step]', desc: '[Description]', status: '[Status]' }];
            update('mooc.timeline', tl);
          }} className="btn-outline !py-2 !px-4 !text-xs w-full justify-center">
            <HiPlus className="w-4 h-4" /> Add Step
          </button>
          <InputField label="Key Takeaways" value={content.mooc.takeaways} onChange={(v) => update('mooc.takeaways', v)} rows={4} />
        </SectionEditor>

        {/* IKS */}
        <SectionEditor title="IKS Project" icon={HiGlobe}>
          {content.iks.slides.map((slide, i) => (
            <div key={i} className="p-4 rounded-xl bg-indigo-500/5 space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold opacity-70">Slide {i + 1}</p>
                {content.iks.slides.length > 1 && (
                  <button onClick={() => {
                    const sl = content.iks.slides.filter((_, idx) => idx !== i);
                    update('iks.slides', sl);
                  }} className="text-red-500 cursor-pointer border-none bg-transparent"><HiTrash className="w-4 h-4" /></button>
                )}
              </div>
              <InputField placeholder="Slide Title" value={slide.title} onChange={(v) => update(`iks.slides.${i}.title`, v)} />
              <InputField placeholder="Slide Content" value={slide.desc} onChange={(v) => update(`iks.slides.${i}.desc`, v)} rows={2} />
              <FileUpload label="Slide Image" value={slide.image} onChange={(v) => update(`iks.slides.${i}.image`, v)} password={password} category="iks" />
            </div>
          ))}
          <button onClick={() => {
            const sl = [...content.iks.slides, { title: '[New Slide]', desc: '[Content]', image: '' }];
            update('iks.slides', sl);
          }} className="btn-outline !py-2 !px-4 !text-xs w-full justify-center">
            <HiPlus className="w-4 h-4" /> Add Slide
          </button>
        </SectionEditor>

        {/* MEDIA */}
        <SectionEditor title="Media Gallery" icon={HiVideoCamera}>
          <InputField label="Video Title" value={content.media.videoTitle} onChange={(v) => update('media.videoTitle', v)} />
          <InputField label="Video Description" value={content.media.videoDescription} onChange={(v) => update('media.videoDescription', v)} />
          <InputField label="Video Embed URL" value={content.media.videoUrl} onChange={(v) => update('media.videoUrl', v)} placeholder="https://youtube.com/embed/..." />
          <div className="space-y-3">
            <p className="text-sm font-medium opacity-80">Gallery Images</p>
            {content.media.gallery.map((g, i) => (
              <div key={i} className="p-4 rounded-xl bg-indigo-500/5 space-y-3">
                <FileUpload label={`Image ${i + 1}`} value={g.image} onChange={(v) => update(`media.gallery.${i}.image`, v)} password={password} category="gallery" />
                <InputField placeholder="Caption" value={g.caption} onChange={(v) => update(`media.gallery.${i}.caption`, v)} />
              </div>
            ))}
            <button onClick={() => {
              const g = [...content.media.gallery, { image: '', caption: '' }];
              update('media.gallery', g);
            }} className="btn-outline !py-2 !px-4 !text-xs w-full justify-center">
              <HiPlus className="w-4 h-4" /> Add Image
            </button>
          </div>
        </SectionEditor>

        {/* DOWNLOADS */}
        <SectionEditor title="Downloads" icon={HiDownload}>
          {content.downloads.map((d, i) => (
            <div key={i} className="p-4 rounded-xl bg-indigo-500/5 space-y-3">
              <InputField placeholder="Button Title" value={d.title} onChange={(v) => update(`downloads.${i}.title`, v)} />
              <InputField placeholder="Description" value={d.desc} onChange={(v) => update(`downloads.${i}.desc`, v)} />
              <FileUpload label="Upload File" value={d.file} onChange={(v) => update(`downloads.${i}.file`, v)} password={password} category="downloads" accept="*/*" />
            </div>
          ))}
        </SectionEditor>

        {/* FOOTER */}
        <SectionEditor title="Footer & Socials" icon={HiCog}>
          <InputField label="Name" value={content.footer.name} onChange={(v) => update('footer.name', v)} />
          <InputField label="College Name" value={content.footer.college} onChange={(v) => update('footer.college', v)} />
          <InputField label="Academic Year" value={content.footer.year} onChange={(v) => update('footer.year', v)} />
          <div className="space-y-3">
            <p className="text-sm font-medium opacity-80">Social Links</p>
            <InputField placeholder="GitHub URL" value={content.footer.socials.github} onChange={(v) => update('footer.socials.github', v)} />
            <InputField placeholder="LinkedIn URL" value={content.footer.socials.linkedin} onChange={(v) => update('footer.socials.linkedin', v)} />
            <InputField placeholder="Twitter URL" value={content.footer.socials.twitter} onChange={(v) => update('footer.socials.twitter', v)} />
            <InputField placeholder="Instagram URL" value={content.footer.socials.instagram} onChange={(v) => update('footer.socials.instagram', v)} />
            <InputField placeholder="Email Address" value={content.footer.socials.email} onChange={(v) => update('footer.socials.email', v)} />
          </div>
        </SectionEditor>

        {/* Bottom Save */}
        <div className="flex justify-center pt-4 pb-12">
          <button onClick={save} disabled={saving} className="btn-primary !px-12">
            <HiSave className="w-5 h-5" /> {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
