'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import testData from '../../data/tests.json';

export default function TestsPage() {
  const [completedTests, setCompletedTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch('/api/me')
      .then((res) => {
        if (!res.ok) {
          window.location.href = '/login';
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setUsername(data.username);
          const key = `progress_tests_${data.username}`;
          const stored = localStorage.getItem(key);
          if (stored) {
            setCompletedTests(JSON.parse(stored));
          }
        }
        setLoading(false);
      });
  }, []);

  const markComplete = (itemId) => {
    if (!completedTests.includes(itemId)) {
      const updated = [...completedTests, itemId];
      setCompletedTests(updated);
      localStorage.setItem(`progress_tests_${username}`, JSON.stringify(updated));
    }
  };

  return (
    <main className={styles.main}>
      <Link href="/dashboard" className={styles.back}>
        <span className={styles.backArrow}>&larr;</span> Back to Dashboard
      </Link>
      <h1 className={styles.title}>📋 Tests</h1>
      <p className={styles.subtitle}>Quizzes and test files</p>

      {loading ? (
        <p className={styles.loading}>Loading your progress...</p>
      ) : (
        <div className={styles.list}>
          {testData.map((item) => {
            const isCompleted = completedTests.includes(item.id);
            return (
              <div key={item.id} className={`${styles.card} ${isCompleted ? styles.completed : ''}`}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                {item.image && (
                  <img src={item.image} alt={item.title} className={styles.image} />
                )}
                {item.file && (
                  <a href={item.file} target="_blank" rel="noreferrer" className={styles.fileLink}>
                    Download File
                  </a>
                )}
                {item.link && (
                  <a href={item.link} target="_blank" rel="noreferrer" className={styles.externalLink}>
                    Open Link
                  </a>
                )}
                {!isCompleted && (
                  <button onClick={() => markComplete(item.id)} className={styles.completeBtn}>
                    Mark as Completed
                  </button>
                )}
                {isCompleted && (
                  <span className={styles.completedBadge}>✅ Completed</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
