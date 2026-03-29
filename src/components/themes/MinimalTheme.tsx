"use client"
import { motion } from "framer-motion"
import { Github, Instagram, Linkedin, ArrowUpRight } from "lucide-react"

export default function MinimalTheme({ user, projects, skills, links }: any) {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-black selection:text-white">
      <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        <motion.header 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-32"
        >
          <p className="text-zinc-500 font-medium mb-4 tracking-widest uppercase text-sm">Portfolio // {user.username}</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
            {user.username}.
          </h1>
          <p className="text-2xl md:text-4xl text-zinc-600 max-w-3xl leading-tight font-light">
            {user.bio || "Crafting minimal and functional digital products."}
          </p>

          {links && (
             <div className="flex items-center gap-6 mt-12">
               {links.github && (
                 <a href={links.github} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-black transition flex items-center gap-2 font-medium">
                   Github <ArrowUpRight className="w-4 h-4" />
                 </a>
               )}
               {links.linkedin && (
                 <a href={links.linkedin} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-black transition flex items-center gap-2 font-medium">
                   LinkedIn <ArrowUpRight className="w-4 h-4" />
                 </a>
               )}
               {links.instagram && (
                 <a href={links.instagram} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-black transition flex items-center gap-2 font-medium">
                   Instagram <ArrowUpRight className="w-4 h-4" />
                 </a>
               )}
             </div>
          )}
        </motion.header>

        {skills?.length > 0 && (
          <motion.section 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }}
            className="mb-32 grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-zinc-200 pt-16"
          >
            <div className="md:col-span-1">
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Expertise</h2>
            </div>
            <div className="md:col-span-3">
              <div className="flex flex-wrap gap-x-8 gap-y-4 text-xl">
                {skills.map((s: any) => (
                   <span key={s.id} className="font-medium text-zinc-800 tracking-tight">
                      {s.name}
                   </span>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {projects?.length > 0 && (
          <motion.section 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }}
            className="border-t border-zinc-200 pt-16"
          >
            <div className="mb-16">
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Selected Work</h2>
            </div>
            <div className="space-y-24">
               {projects.map((p: any, i: number) => (
                  <motion.div 
                    key={p.id} 
                    initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.8 }} viewport={{ once: true }}
                    className="group flex flex-col md:flex-row gap-12 items-center"
                  >
                     {p.image && (
                       <div className="w-full md:w-1/2 overflow-hidden bg-zinc-100">
                         <img src={p.image} alt={p.title} className="w-full h-[400px] object-cover group-hover:scale-105 transition duration-700 ease-out" />
                       </div>
                     )}
                     <div className={`w-full ${p.image ? 'md:w-1/2' : 'md:w-full'}`}>
                        <div className="text-sm font-mono text-zinc-400 mb-4">{p.techStack}</div>
                        <h3 className="text-4xl font-bold mb-4">{p.title}</h3>
                        <p className="text-xl text-zinc-500 mb-8 leading-relaxed font-light">{p.description}</p>
                        {p.link && (
                          <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-black font-semibold border-b-2 border-black pb-1 hover:text-zinc-500 hover:border-zinc-500 transition">
                            Visit Project <ArrowUpRight className="w-5 h-5" />
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
