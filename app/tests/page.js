import tests from '../../data/tests.json';
import styles from '../section.module.css';
import Link from 'next/link';

export const metadata = { title: 'Tests - English with Xurshid' };

export default function TestsPage() {
  return (
    <main className={styles.main}>
      <Link href="/" className={styles.back}>← Back to Home</Link>
      <h1 className={styles.title}>📋 Tests</h1>
      <div className={styles.list}>
        {tests.map((item) => (
          <div key={item.id} className={styles.card}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            {item.image && <img src={item.image} alt={item.title} className={styles.image} />}
            {item.file && <a href={item.file} target="_blank" rel="noreferrer" className={styles.btn}>📄 Download File</a>}
            {item.link && <a href={item.link} target="_blank" rel="noreferrer" className={styles.btn}>🔗 Open Link</a>}
          </div>
        ))}
      </div>
    </main>
  );
}
