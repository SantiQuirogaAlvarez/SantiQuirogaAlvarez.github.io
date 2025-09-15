import { useEffect, useState } from "react";
import { getSupabase } from "../lib/supabase";

export default function NotesList(){
  const [notes, setNotes] = useState([]);
  useEffect(()=>{ (async ()=>{
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("notes")
      .select("slug,title,updated_at")
      .eq("published", true)
      .order("updated_at", { ascending:false });
    if(error) console.error(error);
    setNotes(data || []);
  })(); },[]);
  return (
    <ul className="space-y-2">
      {notes.map(n=> (
        <li key={n.slug} className="rounded-xl border p-3 hover:bg-white/5">
          <a href={`/kb/view?slug=${encodeURIComponent(n.slug)}`} className="font-semibold">{n.title}</a>
          <div className="text-xs opacity-70">{new Date(n.updated_at).toLocaleString()}</div>
        </li>
      ))}
    </ul>
  );
}
