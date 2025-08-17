"use client";
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export const metadata = { title: 'Вход (админ)' };

export default function AdminLogin(){
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin'|'owner'>('admin');
  const [err, setErr] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const next = useSearchParams().get('next') || '/cabinet/admin/services';
  const router = useRouter();

  async function login(){
    setLoading(true); setErr('');
    try{
      const r = await fetch('/api/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ password, role }) });
      if(!r.ok){ const j = await r.json().catch(()=>({error:'Ошибка входа'})); setErr(j.error || 'Ошибка входа'); return; }
      router.push(next);
    } finally{ setLoading(false); }
  }

  return (
    <div className="container" style={{maxWidth:480}}>
      <h1>Вход в админку</h1>
      <p className="helper">Демо‑защита: пароль берётся из <code>process.env.ADMIN_PASS</code> (по умолчанию <b>admin</b>). Роль: admin/owner.</p>
      <label>Пароль</label>
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="admin" />
      <label>Роль</label>
      <select value={role} onChange={e=>setRole(e.target.value as any)}>
        <option value="admin">admin</option>
        <option value="owner">owner</option>
      </select>
      {err && <div style={{color:"crimson", marginTop:8}}>{err}</div>}
      <div className="actions" style={{marginTop:12}}>
        <button className="pill" onClick={login} disabled={loading || !password}>Войти</button>
      </div>
    </div>
  );
}
