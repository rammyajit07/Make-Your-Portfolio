import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import DarkTheme from "@/components/themes/DarkTheme"
import MinimalTheme from "@/components/themes/MinimalTheme"
import CreativeTheme from "@/components/themes/CreativeTheme"
import GlassTheme from "@/components/themes/GlassTheme"

export default async function PortfolioPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const { username } = resolvedParams;

  if (!username) notFound()

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      skills: true,
      links: true,
      projects: true,
    }
  })

  if (!user) {
    notFound()
  }

  const props = {
     user,
     projects: user.projects,
     skills: user.skills,
     links: user.links
  }

  switch (user.theme) {
    case "Dark Dev":
      return <DarkTheme {...props} />
    case "Minimal Clean":
      return <MinimalTheme {...props} />
    case "Creative Designer":
      return <CreativeTheme {...props} />
    case "Glass Modern":
      return <GlassTheme {...props} />
    default:
      return <DarkTheme {...props} />
  }
}
