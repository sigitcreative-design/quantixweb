import { createBrowserClient } from '@supabase/ssr'

// Ambil variabel lingkungan yang sudah Anda berikan
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Buat client Supabase untuk digunakan di sisi browser (client-side)
// Ini akan memungkinkan Anda berinteraksi dengan Supabase dari komponen React
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
