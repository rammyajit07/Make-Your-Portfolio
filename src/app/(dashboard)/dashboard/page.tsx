import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import DashboardClient from "./DashboardClient"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      skills: true,
      links: true,
      projects: true,
    }
  })

  if (!user) redirect("/login")

  const cleanData = {
     id: user.id,
     username: user.username || "",
     bio: user.bio || "",
     theme: user.theme || "Dark Dev",
     github: user.links?.github || "",
     instagram: user.links?.instagram || "",
     linkedin: user.links?.linkedin || "",
     skills: user.skills.map(s => s.name),
     projects: user.projects
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
       <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
             <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-zinc-400">Manage your portfolio details</p>
             </div>
             {cleanData.username ? (
                <a 
                  href={`/u/${cleanData.username}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition flex items-center gap-2"
                >
                  Live Preview
                  <span className="text-lg leading-none">↗</span>
                </a>
             ) : (
                <button 
                  className="mt-4 md:mt-0 px-6 py-2 bg-zinc-800 text-zinc-500 rounded-full font-medium cursor-not-allowed flex items-center gap-2"
                >
                  Set Username to Preview
                </button>
             )}
          </div>

          <DashboardClient initialData={cleanData} />
       </div>
    </main>
  )
}
