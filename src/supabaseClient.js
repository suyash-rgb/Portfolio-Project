import { createClient } from '@supabase/supabase-js';

// Read from env vars or localStorage fallback (convenient for instant testing)
const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const storedUrl = typeof window !== 'undefined' ? localStorage.getItem('sb_url') || '' : '';
const storedKey = typeof window !== 'undefined' ? localStorage.getItem('sb_anon_key') || '' : '';

export const supabaseUrl = envUrl || storedUrl;
export const supabaseAnonKey = envKey || storedKey;

export const isSupabaseConfigured = Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project-id')
);

export const supabase = isSupabaseConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const saveSupabaseCredentials = (url, key) => {
    localStorage.setItem('sb_url', url.trim());
    localStorage.setItem('sb_anon_key', key.trim());
    window.location.reload();
};

export const clearSupabaseCredentials = () => {
    localStorage.removeItem('sb_url');
    localStorage.removeItem('sb_anon_key');
    window.location.reload();
};
