"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

const THEMES = [
  {
    id: "Dark Dev",
    name: "Dark Dev",
    description: "Pitch black minimal, neon accents",
    previewClass: "bg-black border border-zinc-800",
    textClass: "text-zinc-300",
  },
  {
    id: "Minimal Clean",
    name: "Minimal Clean",
    description: "Stark white, beautiful typography",
    previewClass: "bg-white border border-zinc-200",
    textClass: "text-zinc-600",
  },
  {
    id: "Creative Designer",
    name: "Creative Designer",
    description: "Colorful accents, expressive layout",
    previewClass: "bg-[#0f172a] border border-[#3b82f6]",
    textClass: "text-blue-200",
  },
  {
    id: "Glass Modern",
    name: "Glass Modern",
    description: "Blurred backdrop, gradient mesh",
    previewClass: "bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 backdrop-blur-md",
    textClass: "text-zinc-300",
  },
];

export default function ThemeSelectionPage() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [selected, setSelected] = useState("Dark Dev");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: selected }),
      });
      if (res.ok) {
        await update({ theme: selected });
        router.push("/dashboard");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10 pt-12">
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Choose Your Vibe</h1>
          <p className="text-zinc-400 text-xl font-medium">Select the core aesthetic for your portfolio engine. You can change this anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {THEMES.map((theme, i) => {
            const isSelected = selected === theme.id;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={theme.id}
                onClick={() => setSelected(theme.id)}
                className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] bg-zinc-900 border ${isSelected ? "border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]" : "border-zinc-800 opacity-60 hover:opacity-100"}`}
              >
                {/* Preview Window Box */}
                <div className={`h-48 w-full ${theme.previewClass} p-4 flex flex-col justify-between relative overflow-hidden`}>
                  {isSelected && (
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      className="absolute top-3 right-3 bg-blue-500 w-7 h-7 rounded-full flex items-center justify-center shadow-lg z-10"
                    >
                      <Check className="w-4 h-4 text-white font-bold" />
                    </motion.div>
                  )}
                  <div className="space-y-3 z-0">
                    <div className={`w-1/2 h-3 rounded-full ${isSelected ? "opacity-40" : "opacity-20"} bg-current ${theme.textClass}`} />
                    <div className={`w-3/4 h-2 rounded-full ${isSelected ? "opacity-30" : "opacity-10"} bg-current ${theme.textClass}`} />
                  </div>
                  <div className="space-x-3 flex z-0">
                    <div className={`w-14 h-16 rounded-lg ${theme.textClass} bg-current opacity-20`} />
                    <div className={`w-14 h-16 rounded-lg ${theme.textClass} bg-current opacity-10`} />
                  </div>
                </div>

                <div className="p-5 bg-zinc-950">
                  <h3 className={`font-semibold text-lg flex items-center gap-2 ${isSelected ? "text-blue-400" : "text-zinc-200"}`}>
                    {theme.name}
                  </h3>
                  <p className="text-sm text-zinc-500 mt-2 font-medium leading-relaxed">{theme.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center mt-12 animate-in fade-in duration-1000">
          <button
            onClick={handleSave}
            disabled={loading}
            className="group flex items-center gap-3 px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            Continue to Dashboard
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
