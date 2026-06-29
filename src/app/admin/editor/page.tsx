import { redirect } from "next/navigation";
import type { Data } from "@measured/puck";
import { createClient } from "@/lib/supabase/server";
import { defaultHomeData } from "@/puck/seed";
import { Editor } from "./Editor";

export const metadata = { title: "Editor del sitio — IdentiPet" };

export default async function EditorPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "administrador") redirect("/panel");

  const { data: page } = await supabase.from("pages").select("data").eq("slug", "home").maybeSingle();
  const saved = page?.data as Data | undefined;
  const initialData = saved && Array.isArray(saved.content) && saved.content.length > 0 ? saved : defaultHomeData;

  return <Editor initialData={initialData} />;
}
