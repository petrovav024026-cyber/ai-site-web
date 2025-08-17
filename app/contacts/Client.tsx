
"use client";
import { useMemo, useState } from "react";
import Link from "next/link";

type Services = "ai-kp" | "ai-tok" | "ai-doc";

export default function ContactsClient(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [services, setServices] = useState<Services[]>([]);
  const [consent, setConsent] = useState(false);

  const toggleService = (s: Services) => {
    setServices(prev => prev.includes(s) ? prev.filter(x=>x!==s) : [...prev, s]);
  };

  const isValid = useMemo(()=>{
    const hasAllFields = name.trim().length>1 && /\S+@\S+\.\S+/.test(email) && message.trim().length>2;
    const hasService = services.length>0;
    return hasAllFields && hasService && consent;
  }, [name,email,message,services,consent]);

  function handleSubmit(e: React.FormEvent){
    if(!isValid){ e.preventDefault(); return; }
    // Здесь может быть интеграция отправки на backend / webhook
    alert("Заявка отправлена. Спасибо!");
  }

  return (
    <div style={{maxWidth:760, margin:"24px auto", background:"#fff", border:"1px solid #E5E7EB", borderRadius:12, boxShadow:"0 4px 14px rgba(0,0,0,.06)", padding:20}}>
      <h1 style={{marginBottom:12}}>Контакты</h1>

      <form onSubmit={handleSubmit}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:12}}>
          <div>
            <label style={{display:"block", marginBottom:6}}>Имя*</label>
            <input
              required
              value={name}
              onChange={e=>setName(e.target.value)}
              placeholder="Ваше имя"
              style={{width:"100%", border:"1px solid #E5E7EB", borderRadius:12, padding:"10px 12px"}}
              name="name"
            />
          </div>
          <div>
            <label style={{display:"block", marginBottom:6}}>Email*</label>
            <input
              required
              type="email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              placeholder="name@company.com"
              style={{width:"100%", border:"1px solid #E5E7EB", borderRadius:12, padding:"10px 12px"}}
              name="email"
            />
          </div>
        </div>

        <div style={{marginBottom:12}}>
          <label style={{display:"block", marginBottom:6}}>Комментарий*</label>
          <textarea
            required
            value={message}
            onChange={e=>setMessage(e.target.value)}
            placeholder="Коротко опишите запрос"
            rows={5}
            style={{width:"100%", border:"1px solid #E5E7EB", borderRadius:12, padding:"10px 12px"}}
            name="message"
          />
        </div>

        {/* Выбор услуг */}
        <div style={{marginBottom:12}}>
          <p style={{marginBottom:8, color:"#374151", fontWeight:500}}>Выберите интересующие услуги*:</p>
          <label style={{display:"flex", alignItems:"center", marginBottom:8}}>
            <input type="checkbox" checked={services.includes("ai-kp")} onChange={()=>toggleService("ai-kp")} className="mr-2" />
            <span>AI KP — интерактивное КП</span>
          </label>
          <label style={{display:"flex", alignItems:"center", marginBottom:8}}>
            <input type="checkbox" checked={services.includes("ai-tok")} onChange={()=>toggleService("ai-tok")} className="mr-2" />
            <span>AI TOK — токенизатор внедрения</span>
          </label>
          <label style={{display:"flex", alignItems:"center", marginBottom:8}}>
            <input type="checkbox" checked={services.includes("ai-doc")} onChange={()=>toggleService("ai-doc")} className="mr-2" />
            <span>AI DOC — интерактивный договор</span>
          </label>
        </div>

        {/* Согласие с политикой */}
        <label style={{display:"flex", alignItems:"center", gap:8, margin:"12px 0"}}>
          <input type="checkbox" required checked={consent} onChange={e=>setConsent(e.target.checked)} />
          <span>
            Я принимаю{" "}
            <Link href="/privacy_policy_ai_studio.pdf" target="_blank" rel="noopener noreferrer" className="text-[#00AEEF] underline">
              Политику обработки персональных данных
            </Link>
          </span>
        </label>

        <div style={{display:"flex", justifyContent:"flex-end", marginTop:8}}>
          <button
            type="submit"
            disabled={!isValid}
            style={{
              background:"#00AEEF",
              color:"#fff",
              border:"none",
              borderRadius:12,
              padding:"10px 18px",
              boxShadow:"0 2px 6px rgba(0,0,0,.06)",
              transition:"background-color .2s ease",
              opacity: isValid ? 1 : 0.6,
              cursor: isValid ? "pointer" : "not-allowed"
            }}
          >
            Отправить
          </button>
        </div>

        <p style={{fontSize:12, color:"#6B7280", marginTop:8}}>* — обязательные поля</p>
      </form>
    </div>
  );
}
