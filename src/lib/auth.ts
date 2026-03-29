import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password")
        }
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || (!user.password && user.email)) {
          throw new Error("Invalid email or password")
        }

        if (user.password) {
          const isValidCheck = await bcrypt.compare(credentials.password, user.password)
          if (!isValidCheck) {
            throw new Error("Invalid email or password")
          }
        }
        
        return user as any
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.username = token.username as string | undefined
        session.user.theme = token.theme as string | undefined
      }
      return session
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.username = (user as any).username
        token.theme = (user as any).theme
      }
      if (trigger === "update" && session) {
        if (session.username) token.username = session.username
        if (session.theme) token.theme = session.theme
      }
      return token
    }
  }
}
