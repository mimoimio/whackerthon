// app/userlogin/page.jsx
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export default async function UserLogin() {
  const session = await getSession();

  if (session) {
    redirect('/dashboard');
  }

  return <LoginForm />;
}