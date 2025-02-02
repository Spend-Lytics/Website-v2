import { NextResponse } from "next/server"
import { verifyToken } from "@/utils/jwt"

export async function GET(req: Request) {
  const token = req.headers
    .get("Cookie")
    ?.split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1]

  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({ message: "Authenticated" }, { status: 200 })
}

