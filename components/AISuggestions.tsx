"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Lightbulb } from "lucide-react"

interface FinancialData {
  income: number
  expenses: number
  savings: number
  investments: number
  debt: number
}

export function AISuggestions({ financialData }: { financialData: FinancialData }) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const generateSuggestions = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/ai-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(financialData),
      })
      const data = await response.json()
      setSuggestions(data.suggestions)
    } catch (error) {
      console.error("Error generating suggestions:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    generateSuggestions()
  }, [financialData, generateSuggestions]) // Added generateSuggestions to dependencies

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="mr-2" />
          AI-Powered Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Generating suggestions...</span>
          </div>
        ) : (
          <>
            <ul className="list-disc list-inside space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
            <Button onClick={generateSuggestions} className="mt-4">
              Refresh Suggestions
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

