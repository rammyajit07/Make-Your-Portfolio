"use client"
import { motion } from "framer-motion"
import { Github, Instagram, Linkedin, Mail, ArrowRight, Layers, Sparkles } from "lucide-react"

export default function GlassTheme({ user, projects, skills, links }: any) {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Dynamic Animated Background Mesh */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 flex flex-col items-center">
        <motion.header 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-32 w-full max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-zinc-400 text-xs font-medium mb-8 backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-yellow-400" /> New Portfolio Live
          </div>
          <h1 className="text-6xl md:text-9xl font-bold mb-8 tracking-tighter text-white leading-[0.9]">
            {user.username}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-12">
            {user.bio || "Designing the digital frontier with clarity and precision."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
             {links?.github && (
                 <a href={links.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-zinc-300 hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md">
                   <Github className="w-5 h-5" /> GitHub
                 </a>
             )}
              {links?.linkedin && (
                 <a href={links.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-zinc-300 hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md">
                   <Linkedin className="w-5 h-5" /> LinkedIn
                 </a>
             )}
          </div>
        </motion.header>

        {skills?.length > 0 && (
          <section className="mb-32 w-full max-w-5xl">
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-12 flex items-center gap-4">
              <Layers className="w-4 h-4" /> Core Competencies
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {skills.map((s: any, i: number) => (
                 <motion.div 
                   key={s.id} 
                   initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}
                   className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl backdrop-blur-md flex flex-col items-center justify-center gap-3 hover:bg-white/[0.06] transition-colors group"
                 >
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                       {i+1}
                    </div>
                    <span className="text-sm font-semibold text-zinc-400 group-hover:text-white transition-colors">{s.name}</span>
                 </motion.div>
              ))}
            </div>
          </section>
        )}

        {projects?.length > 0 && (
          <section className="w-full max-w-5xl">
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-16 flex items-center gap-4">
              <ArrowRight className="w-4 h-4" /> Case Studies
            </h2>
            <div className="space-y-6">
               {projects.map((p: any, i: number) => (
                  <motion.div 
                    key={p.id} 
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
                    className="group relative p-8 md:p-12 bg-white/[0.02] border border-white/5 rounded-[40px] backdrop-blur-xl flex flex-col md:flex-row gap-8 items-center overflow-hidden hover:bg-white/[0.04] transition-all"
                  >
                     <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-[80px] group-hover:bg-indigo-600/10 transition-colors" />
                     {p.image && (
                       <div className="w-full md:w-1/2 aspect-square md:aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-2xl relative z-10">
                         <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-1000" />
                       </div>
                     )}
                     <div className={`w-full ${p.image ? 'md:w-1/2' : 'md:w-full'} relative z-10`}>
                        <div className="flex flex-wrap gap-2 mb-6">
                           {p.techStack.split(',').map((tech: string, i: number) => (
                              <span key={i} className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 py-1 px-3 bg-indigo-500/10 rounded-full border border-indigo-500/20">{tech.trim()}</span>
                           ))}
                        </div>
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{p.title}</h3>
                        <p className="text-lg text-zinc-400 mb-8 leading-relaxed font-light">{p.description}</p>
                        {p.link && (
                          <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-white font-semibold py-4 px-8 bg-zinc-900 border border-white/10 rounded-2xl hover:bg-zinc-800 transition shadow-xl group-hover:border-white/20">
                            Explore Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </a>
                        )}
                     </div>
                  </motion.div>
               ))}
            </div>
          </section>
        )}
      </div>

      <footer className="py-32 text-center max-w-xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-white mb-8 tracking-tighter">Stay Connected</h2>
        <div className="flex justify-center gap-4 mb-20">
            {links?.github && <a href={links.github} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-zinc-400 hover:text-white transition-all"><Github /></a>}
            {links?.instagram && <a href={links.instagram} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-zinc-400 hover:text-white transition-all"><Instagram /></a>}
            {links?.linkedin && <a href={links.linkedin} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-zinc-400 hover:text-white transition-all"><Linkedin /></a>}
        </div>
        <p className="text-zinc-600 text-sm font-medium tracking-widest uppercase">© {new Date().getFullYear()} {user.username}. Build your own engine.</p>
      </footer>
    </div>
  )
}
