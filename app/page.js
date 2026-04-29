import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>English with Xurshid</h1>
        <p>Your place for tasks, information, and tests</p>
      </header>
      <nav className={styles.nav}>
        <Link href="/tasks" className={styles.card}>
          <span className={styles.icon}>📝</span>
          <h2>Tasks</h2>
          <p>Controlled exercises and writing tasks</p>
        </Link>
        <Link href="/information" className={styles.card}>
          <span className={styles.icon}>ℹ️</span>
          <h2>Information</h2>
          <p>Reading materials and class notes</p>
        </Link>
        <Link href="/tests" className={styles.card}>
          <span className={styles.icon}>📋</span>
          <h2>Tests</h2>
          <p>Quizzes and downloadable test files</p>
        </Link>
      </nav>
    </main>
  );
}
