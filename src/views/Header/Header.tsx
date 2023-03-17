import Link from 'next/link';
import styles from './header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href={'/'}>
          <span className={styles.link}>Регистрация</span>
        </Link>
        <Link href={'/reports'}>
          <span className={styles.link}>Доклады</span>
        </Link>
        <Link href={'/employees'}>
          <span className={styles.link}>Сотрудники</span>
        </Link>
      </nav>
    </header>
  );
};

export {
  Header
};