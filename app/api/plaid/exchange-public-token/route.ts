import { NextResponse } from "next/server"
import { plaidClient } from "@/utils/plaid"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { publicToken, userId } = await req.json()

    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    })

    const accessToken = exchangeResponse.data.access_token
    const itemId = exchangeResponse.data.item_id

    // Store the access token and item ID in your database
    await db.storeUserPlaidCredentials(userId, accessToken, itemId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error exchanging Plaid public token:", error)
    return NextResponse.json({ error: "Failed to link bank account" }, { status: 500 })
  }
}

