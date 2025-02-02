import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { signToken } from "@/utils/jwt"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const user = await db.findUserByEmail(email)

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = signToken({ userId: user.id })

    const response = NextResponse.json({ message: "Login successful" }, { status: 200 })
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

