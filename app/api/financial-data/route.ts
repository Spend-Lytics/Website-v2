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

  // Mock financial data
  const financialData = {
    income: 5000,
    bankBalance: 12000,
    stocksBalance: 8000,
    cryptoBalance: 3000,
    expenses: 2500,
  }

  return NextResponse.json(financialData)
}

