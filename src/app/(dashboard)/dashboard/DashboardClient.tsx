"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Plus, Trash2, Github, Instagram, Linkedin, Link as LinkIcon, Edit3, Check } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardClient({ initialData }: { initialData: any }) {
  const router = useRouter()
  
  // Profile State
  const [username, setUsername] = useState(initialData.username)
  const [bio, setBio] = useState(initialData.bio)
  const [github, setGithub] = useState(initialData.github)
  const [instagram, setInstagram] = useState(initialData.instagram)
  const [linkedin, setLinkedin] = useState(initialData.linkedin)
  
  // Skills State
  const [skills, setSkills] = useState<string[]>(initialData.skills || [])
  const [newSkill, setNewSkill] = useState("")

  // Projects State
  const [projects, setProjects] = useState<any[]>(initialData.projects || [])
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState<any>(null)

  // System State
  const [savingProfile, setSavingProfile] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")

  const copyPortfolioLink = () => {
    const link = `${window.location.origin}/u/${username}`
    navigator.clipboard.writeText(link)
    setSuccessMsg("Link copied to clipboard!")
    setTimeout(() => setSuccessMsg(""), 3000)
  }

  const handleSaveProfile = async () => {
    setSavingProfile(true)
    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, bio, github, instagram, linkedin, skills })
      })
      if (res.ok) {
         setSuccessMsg("Profile saved successfully!")
         setTimeout(() => setSuccessMsg(""), 3000)
         router.refresh()
      } else {
         alert(await res.text())
      }
    } catch (e) {
      console.error(e)
    } finally {
      setSavingProfile(false)
    }
  }

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newSkill.trim() !== "") {
      e.preventDefault()
      if (!skills.includes(newSkill.trim())) {
        setSkills([...skills, newSkill.trim()])
      }
      setNewSkill("")
    }
  }

  const removeSkill = (sk: string) => {
    setSkills(skills.filter(s => s !== sk))
  }

  const handleSaveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      id: currentProject?.id,
      title: formData.get("title"),
      description: formData.get("description"),
      image: formData.get("image"),
      link: formData.get("link"),
      techStack: formData.get("techStack"),
    }

    const res = await fetch("/api/user/projects", {
      method: currentProject?.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    if (res.ok) {
      const savedProject = await res.json()
      if (currentProject?.id) {
         setProjects(projects.map(p => p.id === savedProject.id ? savedProject : p))
      } else {
         setProjects([...projects, savedProject])
      }
      setIsProjectModalOpen(false)
      setCurrentProject(null)
      router.refresh()
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    const res = await fetch("/api/user/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
    if (res.ok) {
      setProjects(projects.filter(p => p.id !== id))
      router.refresh()
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20 mt-8 relative">
       {/* Sidebar / Profile Section */}
       <div className="col-span-1 space-y-6">
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl relative overflow-hidden">
             <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500 left-0" />
             <h2 className="text-xl font-bold mb-4">Core Info</h2>
             <div className="space-y-4">
                <div>
                   <label className="text-zinc-400 text-sm font-medium">Unique Username</label>
                   <input value={username} onChange={e => setUsername(e.target.value)} className="w-full mt-1 px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm" placeholder="johndoe" />
                </div>
                <div>
                   <label className="text-zinc-400 text-sm font-medium">Quick Bio</label>
                   <textarea value={bio} onChange={e => setBio(e.target.value)} rows={4} className="w-full mt-1 px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none" placeholder="I build modern web apps..." />
                </div>
             </div>
          </div>

          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
             <h2 className="text-xl font-bold mb-4">Social Presence</h2>
             <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-zinc-800 rounded-lg"><Github className="w-5 h-5 text-white" /></div>
                   <input value={github} onChange={e => setGithub(e.target.value)} className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-blue-500" placeholder="GitHub Profile URL" />
                </div>
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-[#0077B5] rounded-lg"><Linkedin className="w-5 h-5 text-white" /></div>
                   <input value={linkedin} onChange={e => setLinkedin(e.target.value)} className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-blue-500" placeholder="LinkedIn Profile URL" />
                </div>
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 rounded-lg"><Instagram className="w-5 h-5 text-white" /></div>
                   <input value={instagram} onChange={e => setInstagram(e.target.value)} className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-blue-500" placeholder="Instagram Profile URL" />
                </div>
             </div>
          </div>

          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
             <h2 className="text-xl font-bold mb-4">Tech Skills</h2>
             <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                   <AnimatePresence>
                     {skills.map(sk => (
                       <motion.span initial={{scale:0}} animate={{scale:1}} exit={{scale:0}} key={sk} className="px-3 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm font-medium rounded-full flex items-center gap-2">
                          {sk}
                          <button onClick={() => removeSkill(sk)} className="text-blue-400/50 hover:text-red-400 transition">&times;</button>
                       </motion.span>
                     ))}
                   </AnimatePresence>
                </div>
                <input 
                  value={newSkill} 
                  onChange={e => setNewSkill(e.target.value)} 
                  onKeyDown={handleAddSkill}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-blue-500 text-sm" 
                  placeholder="Type a skill and press Enter..." 
                />
             </div>
          </div>

          <div className="sticky bottom-6 space-y-3">
            <button 
               onClick={copyPortfolioLink}
               className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-800 text-white font-bold rounded-2xl hover:bg-zinc-700 transition-all border border-zinc-700 shadow-xl"
            >
               <LinkIcon className="w-5 h-5" /> Copy Portfolio Link
            </button>
            <button 
               onClick={handleSaveProfile} 
               disabled={savingProfile} 
               className="w-full flex items-center justify-center gap-2 py-4 bg-white text-black font-bold text-lg rounded-2xl hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-2xl"
            >
               {savingProfile ? <Loader2 className="w-6 h-6 animate-spin" /> : 
                successMsg ? <><Check className="w-6 h-6 text-green-600"/> Saved</> : "Save Profile Data"}
            </button>
          </div>
       </div>

       {/* Projects Section */}
       <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
             <div>
               <h2 className="text-2xl font-bold">Your Showcase</h2>
               <p className="text-zinc-500 text-sm mt-1">Manage the projects that appear on your portfolio</p>
             </div>
             <button 
                onClick={() => { setCurrentProject(null); setIsProjectModalOpen(true); }}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-3 rounded-xl transition text-sm font-semibold shadow-lg hover:shadow-blue-500/20"
             >
                <Plus className="w-5 h-5" /> Add Project
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
             {projects.map((p) => (
                <motion.div key={p.id} initial={{opacity:0, y: 10}} animate={{opacity:1, y: 0}} className="group p-1 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl">
                   <div className="h-full bg-zinc-950 p-5 rounded-xl flex flex-col justify-between">
                     <div>
                        {p.image ? (
                           <img src={p.image} alt={p.title} className="w-full h-48 object-cover rounded-lg mb-5 border border-zinc-800 group-hover:border-zinc-700 transition" />
                        ) : (
                           <div className="w-full h-48 bg-zinc-900 rounded-lg mb-5 border border-zinc-800 flex items-center justify-center text-zinc-600 font-mono text-sm">No Image Provided</div>
                        )}
                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{p.title}</h3>
                        <p className="text-zinc-400 text-sm mb-5 leading-relaxed overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>{p.description}</p>
                        {p.techStack && (
                           <div className="flex flex-wrap gap-2 mb-5">
                             {p.techStack.split(',').map((tech: string, i: number) => (
                               <span key={i} className="px-2 py-1 bg-zinc-800 text-xs rounded text-zinc-300 font-mono">{tech.trim()}</span>
                             ))}
                           </div>
                        )}
                     </div>
                     <div className="flex items-center justify-between pt-4 mt-auto border-t border-zinc-800/50">
                        {p.link ? (
                          <a href={p.link} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition text-sm font-medium">
                            <LinkIcon className="w-4 h-4" /> Live Demo
                          </a>
                        ) : <span/>}
                        <div className="flex items-center gap-1">
                           <button onClick={() => { setCurrentProject(p); setIsProjectModalOpen(true); }} className="text-zinc-500 hover:text-white p-2 transition bg-zinc-900/50 hover:bg-zinc-800 rounded-lg">
                              <Edit3 className="w-4 h-4" />
                           </button>
                           <button onClick={() => handleDeleteProject(p.id)} className="text-zinc-500 hover:text-red-400 p-2 transition bg-zinc-900/50 hover:bg-zinc-800 rounded-lg">
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                   </div>
                </motion.div>
             ))}

             {projects.length === 0 && (
                <div className="col-span-1 md:col-span-2 py-20 flex flex-col items-center justify-center text-zinc-500 border-2 border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
                   <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                     <Plus className="w-8 h-8 text-zinc-600" />
                   </div>
                   <h3 className="text-xl font-semibold text-zinc-300 mb-1">No projects yet</h3>
                   <p>Showcase your best work to start building your portfolio.</p>
                </div>
             )}
          </div>
       </div>

       {/* Project Modal Engine */}
       <AnimatePresence>
         {isProjectModalOpen && (
           <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             exit={{ opacity: 0 }} 
             className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
           >
             <motion.div 
               initial={{ scale: 0.95, y: 20 }} 
               animate={{ scale: 1, y: 0 }} 
               exit={{ scale: 0.95, y: 20 }} 
               className="bg-zinc-950 border border-zinc-800 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl relative"
             >
               <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
               <div className="p-6 border-b border-zinc-900 flex justify-between items-center bg-zinc-900/30">
                  <h2 className="text-2xl font-bold">{currentProject ? 'Edit' : 'Create'} Project</h2>
                  <button onClick={() => setIsProjectModalOpen(false)} className="text-zinc-500 hover:text-white hover:bg-zinc-800 p-2 rounded-full transition">&times;</button>
               </div>
               
               <form onSubmit={handleSaveProject} className="p-6 space-y-5">
                  <div>
                    <label className="text-zinc-400 text-sm font-medium">Project Title</label>
                    <input name="title" defaultValue={currentProject?.title} required className="w-full mt-1.5 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="e.g. Acme E-commerce platform" />
                  </div>
                  <div>
                    <label className="text-zinc-400 text-sm font-medium">Description</label>
                    <textarea name="description" defaultValue={currentProject?.description} required rows={4} className="w-full mt-1.5 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none" placeholder="Built a full stack platform resolving X and Y..." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-zinc-400 text-sm font-medium">Cover Image URL</label>
                      <input name="image" defaultValue={currentProject?.image} className="w-full mt-1.5 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="https://..." />
                    </div>
                    <div>
                      <label className="text-zinc-400 text-sm font-medium">Live Demo Link</label>
                      <input name="link" defaultValue={currentProject?.link} className="w-full mt-1.5 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="https://..." />
                    </div>
                  </div>
                  <div>
                    <label className="text-zinc-400 text-sm font-medium">Tech Stack (comma separated)</label>
                    <input name="techStack" defaultValue={currentProject?.techStack} className="w-full mt-1.5 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono text-sm pl-4" placeholder="React, Next.js, Tailwind, Prisma..." />
                  </div>
                  <div className="pt-4 flex justify-end gap-3 border-t border-zinc-800/50 mt-6 pt-6">
                     <button type="button" onClick={() => setIsProjectModalOpen(false)} className="px-6 py-2.5 rounded-xl text-zinc-300 font-medium hover:bg-zinc-800 transition">Cancel</button>
                     <button type="submit" className="px-8 py-2.5 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition">Save Project</button>
                  </div>
               </form>
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  )
}
