import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number.parseInt(process.env.EMAIL_PORT || "587"),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function POST(req: Request) {
  try {
    const { name, email, feedback, captchaToken } = await req.json()

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

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: "spendlytics1@gmail.com",
      subject: "New Feedback Submission",
      html: `
        <h1>New Feedback Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Feedback:</strong></p>
        <p>${feedback}</p>
      `,
    })

    return NextResponse.json({ message: "Feedback sent successfully" })
  } catch (error) {
    console.error("Error sending feedback:", error)
    return NextResponse.json({ error: "Failed to send feedback" }, { status: 500 })
  }
}

