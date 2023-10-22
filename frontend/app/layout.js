import './globals.css';
import { Inter } from 'next/font/google';
import { Header } from './components/header/header.js';
import { Footer } from './components/Footer/footer.js';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  // link:
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
