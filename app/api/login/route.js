import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  const { username, password } = await request.json();

  // Read students data
  const dataPath = path.join(process.cwd(), 'data', 'students.json');
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(fileContent);

  // Find student
  const student = data.students.find(
    (s) => s.username === username && s.password === password
  );

  if (!student) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  }

  // Set cookie
  const cookieStore = await cookies();
  cookieStore.set('student', username, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  return NextResponse.json({ success: true, username: student.username, fullName: student.fullName });
}
