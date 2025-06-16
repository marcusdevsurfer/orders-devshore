import "./globals.css";
//importa bootstrap icons
import "bootstrap-icons/font/bootstrap-icons.css";

export const metadata = {
  title: "Orders App",
  description: "Orders app built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
