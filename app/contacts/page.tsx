import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Оставьте заявку — мы ответим в ближайшее время"
};

export default function Page(){ return <Client />; }