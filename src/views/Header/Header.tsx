import Link from 'next/link';
import styles from './header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href={'/'} className={styles.link}>
          Регистрация
        </Link>
        <Link href={'/reports'} className={styles.link}>
          Доклады
        </Link>
        <Link href={'/employees'} className={styles.link}>
          Сотрудники
        </Link>
      </nav>
    </header>
  );
};

export {
  Header
};
