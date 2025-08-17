'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginClient() {
  const router = useRouter()
  const [email, setEmail] = useState('')

  const handleLogin = () => {
    // Твоя логика входа
    router.push('/cabinet/dashboard')
  }

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Введите email"
      />
      <button onClick={handleLogin}>Войти</button>
    </div>
  )
}
