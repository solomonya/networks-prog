import type { AppProps } from 'next/app'
import styles from './index.module.css';
import './index.css';
import { Header } from '@/views/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
