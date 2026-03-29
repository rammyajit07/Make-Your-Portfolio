import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl text-center animate-in fade-in zoom-in duration-500">
        <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 mb-8">
          🚀 Portfolio Engine v1.0
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Your Premium Portfolio in <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">60 Seconds</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-2xl mx-auto">
          Choose a stunning theme, add your developer projects, and deploy a professional presence instantly.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/register" 
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
          >
            Start Building Free
          </Link>
          <Link 
            href="/login" 
            className="w-full sm:w-auto px-8 py-4 border border-zinc-700 text-white font-semibold rounded-full hover:bg-zinc-900 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
