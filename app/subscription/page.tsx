import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"

export default function SubscriptionPage() {
  const plans = [
    {
      name: "Basic",
      price: "$9.99/month",
      features: ["AI-powered budgeting", "Expense tracking", "Basic insights"],
    },
    {
      name: "Pro",
      price: "$19.99/month",
      features: ["Everything in Basic", "Advanced AI insights", "Crypto rewards", "Multiple account support"],
    },
    {
      name: "Enterprise",
      price: "Custom pricing",
      features: ["Everything in Pro", "Dedicated support", "Custom integrations", "Team management"],
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-4xl font-bold mb-6">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.price}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Subscribe</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Button>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  )
}

