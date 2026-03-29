"use client"
import { motion } from "framer-motion"
import { Github, Instagram, Linkedin, Zap, Layout, Palette, Code } from "lucide-react"

export default function CreativeTheme({ user, projects, skills, links }: any) {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <motion.header 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "backOut" }}
          className="text-center mb-32"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-bold mb-8 uppercase tracking-widest">
            <Zap className="w-4 h-4 fill-current" /> Creative Mind
          </div>
          <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter text-white">
            {user.username}<span className="text-blue-500">.</span>
          </h1>
          <p className="text-2xl md:text-3xl text-slate-400 max-w-3xl mx-auto leading-tight font-medium">
            {user.bio || "Designing the future, one pixel at a time."}
          </p>

          {links && (
             <div className="flex items-center justify-center gap-8 mt-12">
               {links.github && (
                 <a href={links.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-transform hover:scale-125">
                   <Github className="w-7 h-7" />
                 </a>
               )}
               {links.linkedin && (
                 <a href={links.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-transform hover:scale-125">
                   <Linkedin className="w-7 h-7" />
                 </a>
               )}
               {links.instagram && (
                 <a href={links.instagram} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-transform hover:scale-125">
                   <Instagram className="w-7 h-7" />
                 </a>
               )}
             </div>
          )}
        </motion.header>

        {skills?.length > 0 && (
          <section className="mb-32">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px bg-slate-800 flex-grow" />
              <h2 className="text-2xl font-bold text-white whitespace-nowrap px-4">Superpowers</h2>
              <div className="h-px bg-slate-800 flex-grow" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {skills.map((s: any, i: number) => (
                 <motion.div 
                   key={s.id} 
                   initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}
                   className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-center hover:border-blue-500/50 hover:bg-slate-800 transition-all cursor-default"
                 >
                    <span className="text-sm font-bold text-slate-300">{s.name}</span>
                 </motion.div>
              ))}
            </div>
          </section>
        )}

        {projects?.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-16">
              <div className="h-px bg-slate-800 flex-grow" />
              <h2 className="text-2xl font-bold text-white whitespace-nowrap px-4">Creations</h2>
              <div className="h-px bg-slate-800 flex-grow" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
               {projects.map((p: any, i: number) => (
                  <motion.div 
                    key={p.id} 
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
                    className="relative group lg:even:translate-y-20"
                  >
                     <div className="relative aspect-[4/3] overflow-hidden rounded-3xl mb-6 bg-slate-800 border-4 border-slate-900 shadow-2xl">
                        {p.image ? (
                          <img src={p.image} alt={p.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
                             <Palette className="w-20 h-20 text-white/20" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                     </div>
                     <div className="px-2">
                        <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase mb-2">
                          <Code className="w-3 h-3" /> {p.techStack}
                        </div>
                        <h3 className="text-3xl font-black text-white mb-4 group-hover:text-blue-400 transition-colors uppercase italic">{p.title}</h3>
                        <p className="text-slate-400 mb-6 leading-relaxed text-lg">{p.description}</p>
                        {p.link && (
                          <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white font-bold bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-500 hover:-translate-y-1 transition-all shadow-[0_10px_20px_rgba(37,99,235,0.3)]">
                            Launch Project <Layout className="w-4 h-4" />
                          </a>
                        )}
                     </div>
                  </motion.div>
               ))}
            </div>
          </section>
        )}
      </div>

      <footer className="py-20 text-center border-t border-slate-900 mt-40">
        <p className="text-slate-500 font-mono text-sm">© {new Date().getFullYear()} {user.username} powered by Portfolio Engine</p>
      </footer>
    </div>
  )
}
