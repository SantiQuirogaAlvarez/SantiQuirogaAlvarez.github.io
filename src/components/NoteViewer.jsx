import { useEffect, useState } from "react";
import { getSupabase } from "../lib/supabase";
import MarkdownIt from "markdown-it";
import mila from "markdown-it-link-attributes";
import katex from "markdown-it-katex";

const md = new MarkdownIt({ html:false, linkify:true, typographer:true })
  .use(katex)
  .use(mila, { attrs: { target:"_blank", rel:"noopener" } })
  // simple [[Wiki Link]] → /kb/slug
  .use((md)=>{ md.inline.ruler.before('emphasis','wikilink',(state,silent)=>{
    const src = state.src.slice(state.pos);
    const m = src.match(/^\[\[([^\]]+)\]\]/);
    if(!m) return false;
    if(!silent){
      const text = m[1].trim();
      const slug = text.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
      const token = state.push('link_open','a',1); token.attrSet('href', `/kb/view?slug=${slug}`);
      const t2 = state.push('text','',0); t2.content = text;
      state.push('link_close','a',-1);
    }
    state.pos += m[0].length; return true;
  });});

export default function NoteViewer({ slug }){
  const [note, setNote] = useState(null);
  const [error, setError] = useState("");
  useEffect(()=>{ (async ()=>{
    const s = slug && slug.length ? slug : new URLSearchParams(location.search).get('slug');
    if(!s){ setError('Missing slug'); return; }
    const supabase = getSupabase();
    const { data, error } = await supabase.from("notes").select("*").eq("slug", s).single();
    if(error) setError(error.message);
    setNote(data);
  })(); }, [slug]);

  if(error) return <div className="text-red-500">{error}</div>;
  if(!note) return <div>Loading…</div>;
  return (
    <article className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: md.render(note.content) }} />
  );
}
