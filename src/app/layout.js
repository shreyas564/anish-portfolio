import "./globals.css";

export const metadata = {
  title: "[Student Name] — B.Ed Portfolio",
  description: "Educational portfolio website for B.Ed Second Semester student showcasing academic projects, digital newsletters, quizzes, and more.",
  keywords: ["B.Ed", "portfolio", "education", "second semester", "academic", "digital newsletter", "MOOC"],
  authors: [{ name: "[Student Name]" }],
  openGraph: {
    title: "[Student Name] — B.Ed Portfolio",
    description: "Educational portfolio website for B.Ed Second Semester student.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
