import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const financialData = await req.json()

    const prompt = `
      Based on the following financial data:
      Income: $${financialData.income}
      Expenses: $${financialData.expenses}
      Savings: $${financialData.savings}
      Investments: $${financialData.investments}
      Debt: $${financialData.debt}

      Provide 3-5 concise, actionable suggestions to improve the user's financial situation. 
      Focus on budgeting, saving money, and reaching financial milestones.
    `

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
      temperature: 0.7,
    })

    const suggestions = response.choices[0].message.content?.split("\n").filter(Boolean) || []

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error("Error generating AI suggestions:", error)
    return NextResponse.json({ error: "Failed to generate suggestions" }, { status: 500 })
  }
}

