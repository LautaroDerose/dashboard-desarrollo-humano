'use client';

import { useState } from 'react';
import FormLogin from '@/components/auth/form-login';
import Spinner from './spinner';

export default function HomeClient() {
  const [loading] = useState(false); // Aquí no necesitas lógica de carga ya que la sesión se verifica en el servidor.

  if (loading) {
    return <Spinner />; // Mostrar spinner si lo necesitas
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-2xl font-bold mb-4">HomePage</h1>
      <FormLogin />
    </main>
  );
}