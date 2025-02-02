import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { sendPasswordResetEmail } from "@/utils/email"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const user = await db.findUserByEmail(email)

    if (!user) {
      // Don't reveal that the user doesn't exist
      return NextResponse.json(
        { message: "If an account exists, a password reset email has been sent." },
        { status: 200 },
      )
    }

    const resetToken = Math.random().toString(36).substr(2, 8)
    await db.setPasswordResetToken(user.id, resetToken)

    await sendPasswordResetEmail(email, resetToken)

    return NextResponse.json(
      { message: "If an account exists, a password reset email has been sent." },
      { status: 200 },
    )
  } catch (error) {
    console.error("Password reset request error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

