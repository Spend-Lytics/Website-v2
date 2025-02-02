import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { db } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/mailer"

async function POST(req: Request) {
  try {
    const { name, email, password, dateOfBirth, postcode, country, address, mobileNumber, captchaToken } =
      await req.json()

    // Validate input
    if (
      !name ||
      !email ||
      !password ||
      !dateOfBirth ||
      !postcode ||
      !country ||
      !address ||
      !mobileNumber ||
      !captchaToken
    ) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Verify CAPTCHA token
    const captchaVerification = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
      {
        method: "POST",
      },
    )
    const captchaResult = await captchaVerification.json()

    if (!captchaResult.success) {
      return NextResponse.json({ error: "CAPTCHA verification failed" }, { status: 400 })
    }

    const existingUser = await db.findUserByEmail(email)

    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const verificationToken = Math.random().toString(36).substr(2, 8)
    const user = await db.createUser({
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
      postcode,
      country,
      address,
      mobileNumber,
      verificationToken,
      isVerified: false,
    })

    // Send verification email
    await sendVerificationEmail(email, verificationToken)

    return NextResponse.json(
      { message: "User registered. Please check your email to verify your account." },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export { POST }

