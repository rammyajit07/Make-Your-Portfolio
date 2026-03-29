import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { email, password, username } = await req.json()

    if (!email || !password) {
      return new NextResponse("Missing Email or Password", { status: 400 })
    }

    const exist = await prisma.user.findUnique({
      where: { email },
    })

    if (exist) {
      return new NextResponse("Email already exists", { status: 400 })
    }
    
    let isUsernameTaken = false
    if (username) {
       const existUsername = await prisma.user.findUnique({
         where: { username }
       })
       if (existUsername) isUsernameTaken = true
    }
    
    if (isUsernameTaken) {
      return new NextResponse("Username already exists", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username: username || email.split("@")[0],
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error("REGISTRATION_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
