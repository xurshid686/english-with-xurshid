import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function HomePage() {
  const cookieStore = cookies();
  const studentCookie = cookieStore.get('student');

  if (studentCookie?.value) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}
