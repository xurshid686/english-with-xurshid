import '../styles/globals.css';

export const metadata = {
  title: 'English with Xurshid',
  description: 'Tasks, Information and Tests for English learners',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
