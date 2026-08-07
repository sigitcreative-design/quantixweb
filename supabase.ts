import { createBrowserClient } from '@supabase/ssr'

// Definisikan tipe untuk variabel lingkungan agar lebih aman dengan TypeScript
interface SupabaseEnv {
  url: string;
  anonKey: string;
}

// Ambil URL dan Anon Key dari environment variables
const supabaseEnv: SupabaseEnv = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
};

// Buat dan ekspor Supabase client untuk digunakan di seluruh aplikasi
// Tanda seru (!) memberitahu TypeScript bahwa kita yakin variabel ini tidak akan null.
export const supabase = createBrowserClient(supabaseEnv.url, supabaseEnv.anonKey);