
import React, { useState } from 'react';
import { Lock, User, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface LoginProps {
  onLogin: (user: UserProfile) => void;
  systemUsers: UserProfile[];
}

export const Login: React.FC<LoginProps> = ({ onLogin, systemUsers }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulated delay for premium feel
    setTimeout(() => {
      const user = systemUsers.find(u => u.username === username && u.password === password);
      if (user) {
        if (user.status === 'Disabled') {
          setError('This account has been disabled. Please contact an administrator.');
          setLoading(false);
        } else {
          onLogin(user);
        }
      } else {
        setError('Invalid credentials. Please check your username and password.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-100/30 blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-[440px] z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex flex-col mb-6">
            <span className="text-5xl font-black text-slate-900 tracking-tighter leading-none">WRITER</span>
            <div className="flex flex-col mt-1">
              <span className="text-sm font-black text-[#E31E24] tracking-[0.4em] uppercase leading-none">Relocations</span>
              <span className="text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-1">United Arab Emirates</span>
            </div>
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Operations Portal</h2>
          <p className="text-slate-500 font-medium text-sm mt-2">Enter your credentials to access the terminal</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-200/60 p-10 lg:p-12 relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Username</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input
                  required
                  type="text"
                  autoComplete="username"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  required
                  type="password"
                  autoComplete="current-password"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl animate-in shake duration-300">
                <p className="text-xs font-bold text-rose-600 text-center">{error}</p>
              </div>
            )}

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-slate-800 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Authenticate Access
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">SSL Encrypted Channel</span>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Writer Relocations UAE • Dispatch Control System v2.4
        </p>
      </div>
    </div>
  );
};
