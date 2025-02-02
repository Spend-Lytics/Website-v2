import { NextResponse } from "next/server"
import { plaidClient } from "@/utils/plaid"
import { CountryCode, Products } from "plaid"

export async function POST(req: Request) {
  try {
    const { userId } = await req.json()

    const createTokenResponse = await plaidClient.linkTokenCreate({
      user: { client_user_id: userId },
      client_name: "Spend-Lytics",
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: "en",
    })

    return NextResponse.json({ linkToken: createTokenResponse.data.link_token })
  } catch (error) {
    console.error("Error creating Plaid link token:", error)
    return NextResponse.json({ error: "Failed to create Plaid link token" }, { status: 500 })
  }
}

