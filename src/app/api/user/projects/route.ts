import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 })

    const { title, description, image, link, techStack } = await req.json()

    if (!title || !description) return new NextResponse("Missing title or description", { status: 400 })

    const project = await prisma.project.create({
      data: {
        title,
        description,
        image,
        link,
        techStack,
        userId: session.user.id
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error("PROJECT_CREATE_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 })

    const { id, title, description, image, link, techStack } = await req.json()
    if (!id) return new NextResponse("Invalid ID", { status: 400 })

    const existing = await prisma.project.findUnique({ where: { id } })
    if (existing?.userId !== session.user.id) return new NextResponse("Forbidden", { status: 403 })

    const updated = await prisma.project.update({
      where: { id },
      data: { title, description, image, link, techStack }
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("PROJECT_UPDATE_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(req: Request) {
   try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 })

    const { id } = await req.json()
    if (!id) return new NextResponse("Missing ID", { status: 400 })

    const existing = await prisma.project.findUnique({ where: { id } })
    if (existing?.userId !== session.user.id) return new NextResponse("Forbidden", { status: 403 })

    const deleted = await prisma.project.delete({ where: { id } })
    return NextResponse.json(deleted)
  } catch (error) {
    console.error("PROJECT_DELETE_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
