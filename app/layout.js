import "./globals.css";

export const metadata = {
  title: "SSIP Bullet Generator",
  description:
    "Turn the work you actually do into executive-ready resume bullets. Built on Erica Rivera's SSIP™ framework.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
