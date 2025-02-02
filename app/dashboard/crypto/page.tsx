"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

interface CryptoHolding {
  id: string
  name: string
  symbol: string
  amount: number
}

export default function CryptoPage() {
  const [holdings, setHoldings] = useState<CryptoHolding[]>([])
  const [newHolding, setNewHolding] = useState({ name: "", symbol: "", amount: 0 })
  const [coingeckoApiKey, setCoingeckoApiKey] = useState("")

  useEffect(() => {
    // Fetch user's crypto holdings from the backend
    fetchHoldings()
  }, [])

  const fetchHoldings = async () => {
    // Implement API call to fetch user's crypto holdings
  }

  const addHolding = async () => {
    // Implement API call to add a new crypto holding
    setHoldings([...holdings, { id: Date.now().toString(), ...newHolding }])
    setNewHolding({ name: "", symbol: "", amount: 0 })
  }

  const updateHolding = async (id: string, amount: number) => {
    // Implement API call to update a crypto holding
    setHoldings(holdings.map((h) => (h.id === id ? { ...h, amount } : h)))
  }

  const deleteHolding = async (id: string) => {
    // Implement API call to delete a crypto holding
    setHoldings(holdings.filter((h) => h.id !== id))
  }

  const connectCoingecko = async () => {
    // Implement API call to connect Coingecko account
    toast({
      title: "Success",
      description: "Coingecko account connected successfully",
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Crypto Balance</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Connect Coingecko</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Coingecko API Key"
              value={coingeckoApiKey}
              onChange={(e) => setCoingeckoApiKey(e.target.value)}
            />
            <Button onClick={connectCoingecko}>Connect</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Holding</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Name"
              value={newHolding.name}
              onChange={(e) => setNewHolding({ ...newHolding, name: e.target.value })}
            />
            <Input
              placeholder="Symbol"
              value={newHolding.symbol}
              onChange={(e) => setNewHolding({ ...newHolding, symbol: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Amount"
              value={newHolding.amount}
              onChange={(e) => setNewHolding({ ...newHolding, amount: Number.parseFloat(e.target.value) })}
            />
            <Button onClick={addHolding}>Add</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Crypto Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Symbol</th>
                <th className="text-right">Amount</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => (
                <tr key={holding.id}>
                  <td>{holding.name}</td>
                  <td>{holding.symbol}</td>
                  <td className="text-right">
                    <Input
                      type="number"
                      value={holding.amount}
                      onChange={(e) => updateHolding(holding.id, Number.parseFloat(e.target.value))}
                      className="w-24 inline-block"
                    />
                  </td>
                  <td className="text-right">
                    <Button variant="destructive" onClick={() => deleteHolding(holding.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

