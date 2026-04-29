'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import testData from '../../data/tests.json';

export default function TestsPage() {
  const [completedTests, setCompletedTests] = useState([]);
  const [loading, setLoading] = useState(true);

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
        if (data?.progress?.tests) {
          setCompletedTests(data.progress.tests);
        }
        setLoading(false);
      });
  }, []);

  const markComplete = async (itemId) => {
    const res = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'test', itemId }),
    });
    if (res.ok) {
      setCompletedTests((prev) => [...prev, itemId]);
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
