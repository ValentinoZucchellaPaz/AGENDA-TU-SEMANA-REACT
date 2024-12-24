import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import { TasksProvider } from '@/context/tasksContext';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <TasksProvider>
        <ChakraProvider>
          <Header />
          <main
            className={`flex min-h-screen  flex-col items-center gap-5 px-5 md:px-24 ${inter.className} bg-secondary relative`}
          >
            <Component {...pageProps} />
          </main>
          <Footer />
        </ChakraProvider>
      </TasksProvider>
    </AuthProvider>
  );
}
