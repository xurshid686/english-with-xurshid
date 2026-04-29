import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const cookieStore = await cookies();
  const username = cookieStore.get('student')?.value;

  if (!username) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }

  const dataPath = path.join(process.cwd(), 'data', 'students.json');
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(fileContent);

  const student = data.students.find((s) => s.username === username);
  if (!student) {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }

  return NextResponse.json({ username: student.username, fullName: student.fullName, progress: student.progress });
}
