"use client"
import { motion } from "framer-motion"
import { Github, Instagram, Linkedin, ExternalLink } from "lucide-react"

export default function DarkTheme({ user, projects, skills, links }: any) {
  return (
    <div className="min-h-screen bg-[#070707] text-zinc-300 font-sans selection:bg-emerald-500/30">
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-32">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="inline-block px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-emerald-400 text-sm font-mono mb-6">
            Developer Portfolio
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            {user.username}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed">
            {user.bio || "Building digital experiences."}
          </p>

          {links && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-4 mt-8">
               {links.github && (
                 <a href={links.github} target="_blank" rel="noreferrer" className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all">
                   <Github className="w-6 h-6" />
                 </a>
               )}
               {links.linkedin && (
                 <a href={links.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all">
                   <Linkedin className="w-6 h-6" />
                 </a>
               )}
               {links.instagram && (
                 <a href={links.instagram} target="_blank" rel="noreferrer" className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:border-pink-500/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.2)] transition-all">
                   <Instagram className="w-6 h-6" />
                 </a>
               )}
             </motion.div>
          )}
        </motion.header>

        {skills?.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
            className="mb-24"
          >
            <h2 className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-8">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((s: any, i: number) => (
                 <motion.span 
                   key={s.id} 
                   initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                   className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 font-medium"
                 >
                    {s.name}
                 </motion.span>
              ))}
            </div>
          </motion.section>
        )}

        {projects?.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
            <h2 className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-8">Selected Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {projects.map((p: any, i: number) => (
                  <motion.div 
                    key={p.id} 
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                    className="group flex flex-col p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:bg-zinc-900 hover:border-emerald-500/30 transition-all"
                  >
                     {p.image && <img src={p.image} alt={p.title} className="w-full h-48 object-cover rounded-xl mb-6 opacity-70 group-hover:opacity-100 transition" />}
                     <h3 className="text-2xl font-bold text-white mb-3">{p.title}</h3>
                     <p className="text-zinc-400 mb-6 flex-grow leading-relaxed">{p.description}</p>
                     <div className="flex items-center justify-between">
                         <div className="text-xs font-mono text-zinc-500 border border-zinc-800 px-2 py-1 rounded bg-zinc-950">{p.techStack}</div>
                         {p.link && (
                           <a href={p.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors">
                             View <ExternalLink className="w-4 h-4" />
                           </a>
                         )}
                     </div>
                  </motion.div>
               ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}
