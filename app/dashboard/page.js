'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function DashboardPage() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/me')
      .then((res) => {
        if (!res.ok) {
          router.push('/login');
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setStudent(data);
        }
        setLoading(false);
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  const markComplete = async (type, itemId) => {
    const res = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, itemId }),
    });
    if (res.ok) {
      const data = await res.json();
      setStudent((prev) => ({ ...prev, progress: data.progress }));
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!student) return null;

  const completedTasks = student.progress?.tasks?.length || 0;
  const completedTests = student.progress?.tests?.length || 0;

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Welcome, {student.fullName}</h1>
            <p className={styles.subtitle}>Track your English learning progress</p>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        </div>

        <div className={styles.progressGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{completedTasks}</div>
            <div className={styles.statLabel}>Tasks Completed</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{completedTests}</div>
            <div className={styles.statLabel}>Tests Completed</div>
          </div>
        </div>

        <div className={styles.sections}>
          <h2 className={styles.sectionTitle}>Learning Sections</h2>
          <div className={styles.links}>
            <a href="/tasks" className={styles.linkCard}>
              <div className={styles.linkIcon}>📝</div>
              <div className={styles.linkText}>Tasks</div>
            </a>
            <a href="/information" className={styles.linkCard}>
              <div className={styles.linkIcon}>ℹ️</div>
              <div className={styles.linkText}>Information</div>
            </a>
            <a href="/tests" className={styles.linkCard}>
              <div className={styles.linkIcon}>📋</div>
              <div className={styles.linkText}>Tests</div>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
