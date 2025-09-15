import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;
  if (typeof window === 'undefined') {
    // During SSR/build, return a dummy client to avoid init
    // Call sites should only use in browser via client:load islands
    throw new Error('Supabase client requested during SSR. Use inside browser-only code.');
  }
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const anon = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error('Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY');
  }
  client = createClient(url, anon);
  return client;
}
