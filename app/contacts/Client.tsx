"use client";
import { useMemo, useState } from "react";

type Product = "AI KP" | "AI TOK" | "AI DOC";
const isEmail = (s:string)=> /.+@.+\..+/.test(s);

export default function Contacts(){
  const search = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const productInit = (search?.get("product") as Product) || "AI KP";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState<Product>(productInit);
  const [comment, setComment] = useState("");
  const [accepted, setAccepted] = useState(false);
  const canSubmit = useMemo(()=> name.trim().length>1 && isEmail(email) && comment.trim().length>0 && accepted, [name,email,comment,accepted]);

  async function submit(e:React.FormEvent){
    e.preventDefault();
    if(!canSubmit) return;
    await fetch("/api/contacts", {
      method:"POST", headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ name, email, product, comment, accepted })
    });
    alert("Заявка отправлена. Спасибо!");
    setName(""); setEmail(""); setComment(""); setAccepted(false);
  }

  return (
    <div className="container">
      <h1>Контакты</h1>
      <p>Оставьте заявку — мы ответим в ближайшее время.</p>
      <form onSubmit={submit} className="stack" noValidate>
        <div className="grid-2">
          <div>
            <label htmlFor="name">Ваше имя</label>
            <input id="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Иван"/>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com"/>
          </div>
        </div>

        <div>
          <label htmlFor="product">Продукт</label>
          <select id="product" value={product} onChange={e=>setProduct(e.target.value as Product)}>
            <option>AI KP</option>
            <option>AI TOK</option>
            <option>AI DOC</option>
          </select>
        </div>

        <div>
          <label htmlFor="comment">Комментарий</label>
          <textarea id="comment" value={comment} onChange={e=>setComment(e.target.value)} placeholder="Кратко опишите задачу"/>
        </div>

        <label className="consent">
          <input type="checkbox" checked={accepted} onChange={e=>setAccepted(e.target.checked)}/>
          <span>Я принимаю Политику обработки персональных данных.</span>
        </label>

        <div className="form-actions">
          <button className="pill" disabled={!canSubmit}>Отправить</button>
        </div>
      </form>
    </div>
  );
}