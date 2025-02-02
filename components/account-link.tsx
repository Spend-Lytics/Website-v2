"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface AccountLinkProps {
  type: "bank" | "crypto"
  onAccountLinked: (accountData: any) => void
}

export function AccountLink({ type, onAccountLinked }: AccountLinkProps) {
  const [accountNumber, setAccountNumber] = useState("")
  const [routingNumber, setRoutingNumber] = useState("")
  const [apiKey, setApiKey] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // In a real application, you would make an API call to link the account
      // For this example, we'll simulate a successful account linking
      const accountData = type === "bank" ? { accountNumber, routingNumber } : { apiKey }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onAccountLinked(accountData)
      toast({
        title: "Success",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} account linked successfully`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to link ${type} account`,
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{type === "bank" ? "Link Bank Account" : "Link Crypto/Investment Account"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {type === "bank" ? (
            <>
              <div className="mb-4">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="routingNumber">Routing Number</Label>
                <Input
                  id="routingNumber"
                  value={routingNumber}
                  onChange={(e) => setRoutingNumber(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <div className="mb-4">
              <Label htmlFor="apiKey">API Key</Label>
              <Input id="apiKey" value={apiKey} onChange={(e) => setApiKey(e.target.value)} required />
            </div>
          )}
          <Button type="submit">Link Account</Button>
        </form>
      </CardContent>
    </Card>
  )
}

