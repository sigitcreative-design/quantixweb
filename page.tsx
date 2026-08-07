"use client";

import { useState } from "react";
import { Rocket, X, Loader2 } from "lucide-react"; // Mengganti Wrench dengan Rocket
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase"; // Menyesuaikan path ke file supabase

export default function ComingSoonPage() { // Mengganti nama komponen
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();

  // State untuk form login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    // Proses login menembak ke Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      // Jika salah password/email, tampilkan pesan merah
      setErrorMsg(error.message);
      setIsLoading(false);
    } else if (data.user) {
      // Jika berhasil, lempar ke dashboard
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans selection:bg-emerald-500/30 relative">
      
      {/* HEADER PUBLIK */}
      <header className="h-20 px-6 lg:px-12 flex items-center justify-between border-b border-gray-800 bg-gray-900/80 backdrop-blur-md fixed w-full top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl tracking-wide text-emerald-500">
            Quantix
          </span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setShowLoginModal(true)}
            className="text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-md transition-colors"
          >
            Log In
          </button>
          <button className="text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-md transition-colors shadow-lg shadow-emerald-900/20">
            Sign Up
          </button>
        </div>
      </header>

      {/* KONTEN UTAMA */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 mt-20 text-center">
        <div className="bg-gray-800/50 p-5 rounded-2xl mb-8 border border-gray-700 shadow-xl">
          <Rocket size={48} className="text-emerald-500" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white">
          Coming Soon
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          Platform web cerdas untuk analisis saham akan segera diluncurkan. Nantikan pembaruan dari kami!
        </p>
      </main>

      {/* WINDOW LOGIN (MODAL) */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-md p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-white mb-6 text-center">Masuk ke Quantix</h2>

            <button className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2.5 rounded-lg transition-colors mb-6">
              {/* Ikon Google SVG... */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Login with Google
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 border-t border-gray-600"></div>
              <span className="text-sm text-gray-400 font-medium">atau dengan email</span>
              <div className="flex-1 border-t border-gray-600"></div>
            </div>

            {/* Menampilkan pesan error jika login gagal */}
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg mb-4">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@email.com"
                  required
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/50 text-white font-medium py-2.5 rounded-lg transition-colors shadow-lg shadow-emerald-900/20"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Masuk"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}