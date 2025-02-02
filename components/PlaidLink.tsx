"use client"

import { useState, useCallback } from "react"
import { usePlaidLink } from "react-plaid-link"
import { Button } from "@/components/ui/button"

interface PlaidLinkProps {
  userId: string
  onSuccess: () => void
}

export function PlaidLink({ userId, onSuccess }: PlaidLinkProps) {
  const [linkToken, setLinkToken] = useState(null)

  const generateToken = useCallback(async () => {
    const response = await fetch("/api/plaid/create-link-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
    const { linkToken } = await response.json()
    setLinkToken(linkToken)
  }, [userId])

  const onSuccess = useCallback(
    async (publicToken: string) => {
      await fetch("/api/plaid/exchange-public-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicToken, userId }),
      })
      onSuccess()
    },
    [userId, onSuccess],
  ) //onSuccess dependency removed here

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
  })

  return (
    <Button onClick={() => (linkToken ? open() : generateToken())} disabled={!ready}>
      Connect Bank Account
    </Button>
  )
}

