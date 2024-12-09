'use client';

import './globals.css';
import { Provider } from 'react-redux';
import store from '../store/store';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

function ThemedMain({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <main
      className={`${theme === 'light' ? 'bg-[#ffffff]' : 'bg-[#000000]'} -mt-2 transition-colors duration-300`}
    >
      {children}
    </main>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider>
            <Header />
            <ThemedMain>{children}</ThemedMain>
            <Footer />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
