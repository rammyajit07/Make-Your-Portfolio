import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { bio, username, github, instagram, linkedin, skills } = await req.json()

    // Enforce unique username ignoring current user
    if (username) {
      const exist = await prisma.user.findUnique({ where: { username } })
      if (exist && exist.id !== session.user.id) {
        return new NextResponse("Username taken", { status: 400 })
      }
    }

    // Update User
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        bio,
        username,
      }
    })

    // Update Social Links
    const currentLinks = await prisma.socialLink.findUnique({
      where: { userId: session.user.id }
    })

    if (currentLinks) {
       await prisma.socialLink.update({
         where: { userId: session.user.id },
         data: { github, instagram, linkedin }
       })
    } else {
       await prisma.socialLink.create({
         data: { github, instagram, linkedin, userId: session.user.id }
       })
    }

    // Update Skills (Clear and recreate)
    await prisma.skill.deleteMany({
      where: { userId: session.user.id }
    })

    if (skills && Array.isArray(skills)) {
      await prisma.skill.createMany({
        data: skills.map((name: string) => ({
          name,
          userId: session.user.id
        }))
      })
    }

    return new NextResponse("Profile Updated", { status: 200 })
  } catch (error) {
    console.error("PROFILE_UPDATE_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
