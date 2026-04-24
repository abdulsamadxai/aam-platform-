"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { useAdmin } from "@/lib/admin-context";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const router = useRouter();
  const { login } = useAdmin();

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const supabase = (await import("@/lib/supabase/client")).createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
      setLoading(false);
      return;
    }

    if (data.user) {
      // Check role to redirect appropriately
      const { data: profile } = await supabase
        .from('members')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profile?.role === 'admin') {
        login(); // Still sync with local admin context if needed
        router.push("/admin");
      } else {
        router.push("/member/dashboard");
      }
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black selection:bg-white selection:text-black font-sans pt-[160px] pb-12">
      {/* Background Layer - Match Home Page */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070')",
        }}
      />

      {/* Hero-like overlay for consistency */}
      <div className="absolute inset-0 z-10 bg-black/60" />

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-[420px] px-6">
        <div className="backdrop-blur-2xl bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center">

          <h1 className="text-4xl font-bold text-white mb-10 tracking-tight">Login</h1>

          {message && (
            <div className={`w-full p-4 rounded-2xl mb-6 text-xs text-center border ${message.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
              }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handlePasswordLogin} className="w-full space-y-6">
            {/* Email Input */}
            <div className="relative group">
              <Input
                type="email"
                placeholder="Email Address"
                className="w-full h-14 bg-white/5 border-white/10 rounded-full pl-6 pr-12 text-white placeholder:text-white/40 focus:ring-1 focus:ring-white/20 focus:bg-white/10 transition-all border-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <User className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 group-focus-within:text-white transition-colors" />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <Input
                type="password"
                placeholder="Password"
                className="w-full h-14 bg-white/5 border-white/10 rounded-full pl-6 pr-12 text-white placeholder:text-white/40 focus:ring-1 focus:ring-white/20 focus:bg-white/10 transition-all border-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 group-focus-within:text-white transition-colors" />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between px-2 text-[13px]">
              <div className="flex items-center space-x-2 group cursor-pointer">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-white checked:border-white transition-all cursor-pointer accent-white"
                />
                <Label htmlFor="remember" className="text-white/80 cursor-pointer group-hover:text-white transition-colors font-normal">
                  Remember me
                </Label>
              </div>
              <span className="text-white/30 cursor-not-allowed font-normal select-none">
                Forgot Password?
              </span>
            </div>

            {/* Log In Button */}
            <Button
              type="submit"
              className="w-full h-14 bg-white text-black hover:bg-white/90 active:scale-[0.98] rounded-full font-bold text-sm transition-all mt-4 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Log in"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-10 text-[13px] text-white/60">
            Don't have an account?{" "}
            <Link href="/register" className="text-white font-bold hover:underline transition-all">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

