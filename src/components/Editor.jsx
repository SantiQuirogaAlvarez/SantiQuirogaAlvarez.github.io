import { useEffect, useRef, useState } from "react";
import { getSupabase } from "../lib/supabase";
import { EditorView, keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { markdown } from "@codemirror/lang-markdown";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";

function slugify(s){ return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }

export default function Editor(){
  const ref = useRef(null), viewRef = useRef(null);
  const [status, setStatus] = useState("");

  useEffect(()=>{ (async ()=>{
    const supabase = getSupabase();
    const { data: { session } } = await supabase.auth.getSession();
    if(!session){ location.href = "/kb/login"; return; }

    const start = "# Title\n\nWrite your note here. Use $e^{i\\pi}+1=0$.\n\n```js\nconsole.log('hello');\n```";
    const state = EditorState.create({
      doc: start,
      extensions: [
        markdown(), history(), keymap.of([...defaultKeymap, ...historyKeymap]),
        EditorView.lineWrapping
      ]
    });
    viewRef.current = new EditorView({ state, parent: ref.current });
  })(); },[]);

  async function save(publish=false){
    const md = viewRef.current.state.doc.toString();
    const title = (md.match(/^#\s+(.+)$/m)?.[1] ?? "Untitled").trim();
    const slug = slugify(title);
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("notes").upsert({
      slug, title, content: md, published: publish, user_id: user.id
    }, { onConflict: 'slug' });
    setStatus(error ? error.message : (publish ? "Published!" : "Saved"));
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button className="rounded border px-3 py-1" onClick={()=>save(false)}>Save draft</button>
        <button className="rounded border px-3 py-1" onClick={()=>save(true)}>Publish</button>
        <span className="text-sm opacity-70">{status}</span>
      </div>
      <div ref={ref} className="min-h-[60vh] rounded-xl border p-3 font-mono text-sm"/>
      <p className="text-xs opacity-70">Title = first <code># H1</code>. Slug auto-generates; use <code>[[Wiki Link]]</code> to link notes.</p>
    </div>
  );
}
