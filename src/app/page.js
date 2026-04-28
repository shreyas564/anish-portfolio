'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsOverview from '@/components/sections/ProjectsOverview';
import NewsletterSection from '@/components/sections/NewsletterSection';
import QuizSection from '@/components/sections/QuizSection';
import SafetySection from '@/components/sections/SafetySection';
import MoocSection from '@/components/sections/MoocSection';
import IksSection from '@/components/sections/IksSection';
import MediaSection from '@/components/sections/MediaSection';
import DownloadSection from '@/components/sections/DownloadSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch('/api/content', { cache: 'no-store' })
      .then((r) => r.json())
      .then(setContent)
      .catch(() => {});
  }, []);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection data={content?.hero} />
        <AboutSection data={content?.about} />
        <ProjectsOverview data={content?.projects} />
        <NewsletterSection data={content?.newsletter} />
        <QuizSection data={content?.quiz} />
        <SafetySection data={content?.safety} />
        <MoocSection data={content?.mooc} />
        <IksSection data={content?.iks} />
        <MediaSection data={content?.media} />
        <DownloadSection data={content?.downloads} />
      </main>
      <Footer data={content?.footer} />
    </>
  );
}
