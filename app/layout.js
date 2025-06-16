import "./globals.css";

export const metadata = {
  title: "Orders App",
  description: "Orders app built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      className="bg-gray-100/80 antialiased"
      >
        {children}
      </body>
    </html>
  );
}
