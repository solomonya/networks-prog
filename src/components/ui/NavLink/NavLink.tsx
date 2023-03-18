import Link from "next/link";
import styles from './navlink.module.css';

interface Props {
  path: string;
  title: string;
}

const NavLink = ({ path, title }: Props): React.ReactElement => {
  return (
    <Link href={path} className={styles.link}>{title}</Link>
  );
};

export { NavLink };
