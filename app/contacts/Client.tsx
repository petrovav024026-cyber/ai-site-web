
"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import s from "./contacts.module.css";

export default function ContactsClient(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [service, setService] = useState("");
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<null | "ok" | "error">(null);

  const isValid = useMemo(()=>{
    const okName = name.trim().length > 1;
    const okEmail = /\S+@\S+\.\S+/.test(email);
    const okMsg = message.trim().length > 2;
    const okService = service !== "";
    return okName && okEmail && okMsg && okService && consent;
  }, [name,email,message,service,consent]);

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    if(!isValid) return;
    setSending(true);
    setStatus(null);
    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, service })
      });
      const json = await resp.json().catch(()=>({}));
      if (resp.ok && json?.ok) { setStatus("ok"); setName(""); setEmail(""); setMessage(""); setService(""); setConsent(false); }
      else setStatus("error");
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  }

  const wrapper: React.CSSProperties = { maxWidth: 960, margin: "24px auto", padding: 16 };
  const card: React.CSSProperties = { background:"#fff", border:"1px solid #E5E7EB", borderRadius:12, boxShadow:"0 4px 14px rgba(0,0,0,.06)", padding:24 };
  const fieldHalf: React.CSSProperties = { width: "50%", minWidth: 320 };
  const inputStyle: React.CSSProperties = { width:"100%", border:"1px solid #E5E7EB", borderRadius:12, padding:"10px 12px" };
  const labelStyle: React.CSSProperties = { display:"block", marginBottom:6, color:"#374151" };

  return (
    <div style={wrapper}>
      <div style={card}>
        <h1 style={{marginBottom:16}}>Контакты</h1>

        <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", gap:14, alignItems:"flex-start"}}>
          {/* Имя */}
          <div style={fieldHalf}>
            <label style={labelStyle}>Имя*</label>
            <input name="name" required value={name} onChange={e=>setName(e.target.value)} placeholder="Ваше имя" style={inputStyle} />
          </div>

          {/* Email */}
          <div style={fieldHalf}>
            <label style={labelStyle}>Email*</label>
            <input name="email" required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@company.com" style={inputStyle} />
          </div>

          {/* Комментарий */}
          <div style={fieldHalf}>
            <label style={labelStyle}>Комментарий*</label>
            <textarea name="message" required value={message} onChange={e=>setMessage(e.target.value)} placeholder="Коротко опишите запрос" rows={5} style={inputStyle as any} />
          </div>

          {/* Услуги — выпадающий список */}
          <div style={fieldHalf}>
            <label style={labelStyle}>Выберите услугу*</label>
            <select required value={service} onChange={e=>setService(e.target.value)} style={inputStyle}>
              <option value="">— выберите —</option>
              <option value="AI KP">AI KP — интерактивное КП</option>
              <option value="AI TOK">AI TOK — токенизатор внедрения</option>
              <option value="AI DOC">AI DOC — интерактивный договор</option>
            </select>
          </div>

          {/* Согласие */}
          <label style={{display:"flex", alignItems:"center", gap:8, fontSize:14}}>
            <input type="checkbox" required checked={consent} onChange={e=>setConsent(e.target.checked)} style={{width:16, height:16}} />
            <span>
              Я принимаю{" "}
              <Link href="/privacy_policy_ai_studio.pdf" target="_blank" rel="noopener noreferrer" className="text-[#00AEEF] underline">
                Политику обработки персональных данных
              </Link>
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || sending}
            style={{
              background:"#00AEEF",
              color:"#fff",
              border:"none",
              borderRadius:9999,
              padding:"10px 18px",
              boxShadow:"0 2px 6px rgba(0,0,0,.06)",
              transition:"background-color .2s ease",
              opacity: (!isValid || sending) ? .6 : 1,
              cursor: (!isValid || sending) ? "not-allowed" : "pointer"
            }}
          >
            {sending ? "Отправка..." : "Отправить"}
          </button>

          {status === "ok" && <p style={{color:"#059669", fontSize:14}}>Отправлено. Мы свяжемся с вами.</p>}
          {status === "error" && <p style={{color:"#DC2626", fontSize:14}}>Ошибка отправки. Попробуйте позже.</p>}

          <p style={{fontSize:12, color:"#6B7280"}}>* — обязательные поля</p>
        </form>
      </div>
    </div>
  );
}
