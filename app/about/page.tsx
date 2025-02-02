import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-4xl font-bold mb-6">About Spend-Lytics</h1>
      <p className="text-lg mb-6">
        Spend-Lytics is an AI-powered financial assistant designed to help you manage your finances, track your
        spending, and achieve your savings goals. With advanced analytics and personalized insights, we make it easy for
        you to take control of your financial future.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Key Features:</h2>
      <ul className="list-disc list-inside mb-6">
        <li>AI-driven budget recommendations</li>
        <li>Real-time spending tracking</li>
        <li>Personalized savings goals</li>
        <li>Crypto rewards for engagement</li>
        <li>Comprehensive financial analytics</li>
      </ul>
      <Button>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  )
}

