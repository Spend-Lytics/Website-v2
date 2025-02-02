import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FAQPage() {
  const faqs = [
    {
      question: "What is Spend-Lytics?",
      answer:
        "Spend-Lytics is an AI-powered financial assistant that helps you manage your finances, track spending, and achieve savings goals.",
    },
    {
      question: "How does the crypto reward system work?",
      answer:
        "Users can earn tokens by engaging with the app daily. These tokens can be withdrawn or staked for additional benefits.",
    },
    {
      question: "Is my financial data secure?",
      answer: "Yes, we use bank-level encryption and security measures to protect your financial data.",
    },
    {
      question: "Can I connect multiple bank accounts?",
      answer: "Spend-Lytics allows you to connect and manage multiple bank accounts in one place.",
    },
    {
      question: "How accurate are the AI insights?",
      answer:
        "Our AI insights are based on your actual spending patterns and are continuously improving. However, they should be used as guidance rather than financial advice.",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full max-w-3xl">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-8">
        <Button>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}

