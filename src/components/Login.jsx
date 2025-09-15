import { useEffect, useState } from "react";
import { getSupabase } from "../lib/supabase";

export default function Login(){
  const [email, setEmail] = useState("");
  const [session, setSession] = useState(null);

  useEffect(()=> { supbaseInit(); },[]);

  async function supbaseInit(){
    const supabase = getSupabase();
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    supabase.auth.onAuthStateChange((_e, s)=>setSession(s));
  }

  async function signIn(e){ e.preventDefault();
    const supabase = getSupabase();
    const { error } = await supabase.auth.signInWithOtp({ email, options:{ emailRedirectTo: location.origin + "/kb/editor" } });
    alert(error ? error.message : "Check your email for a magic link.");
  }
  async function signOut(){ const supabase = getSupabase(); await supabase.auth.signOut(); }

  return session ? (
    <div className="space-y-3">
      <div>Signed in.</div>
      <a className="underline" href="/kb/editor">Open editor</a>
      <button className="rounded border px-3 py-1" onClick={signOut}>Sign out</button>
    </div>
  ) : (
    <form onSubmit={signIn} className="space-y-3">
      <input className="w-full rounded border px-3 py-2" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
      <button className="rounded px-3 py-2 border">Send magic link</button>
    </form>
  );
}
