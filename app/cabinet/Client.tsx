'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginClient() {
  const router = useRouter()
  const [state, setState] = useState('')

  return (
    <div>
      {/* твоя клиентская логика тут */}
      <button onClick={() => router.push('/dashboard')}>Войти</button>
    </div>
  )
}
