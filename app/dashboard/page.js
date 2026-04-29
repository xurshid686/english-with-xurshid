'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function DashboardPage() {
  const [student, setStudent] = useState(null);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [completedTests, setCompletedTests] = useState(0);
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
          const tasksStored = localStorage.getItem(`progress_tasks_${data.username}`);
          const testsStored = localStorage.getItem(`progress_tests_${data.username}`);
          if (tasksStored) setCompletedTasks(JSON.parse(tasksStored).length);
          if (testsStored) setCompletedTests(JSON.parse(testsStored).length);
        }
        setLoading(false);
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!student) return null;

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
