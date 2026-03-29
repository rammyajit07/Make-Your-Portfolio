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

    const { theme } = await req.json()
    if (!theme) {
      return new NextResponse("Theme missing", { status: 400 })
    }

    const updated = await prisma.user.update({
      where: { id: session.user.id },
      data: { theme }
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("THEME_UPDATE_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
