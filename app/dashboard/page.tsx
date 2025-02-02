"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet, TrendingUp, Bitcoin, Edit2, Save, X } from "lucide-react"
import { toast } from "./components/ui/use-toast"
import { AccountLink } from "./components/account-link"
import { AISuggestions } from "./components/AISuggestions"

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
}

interface EditableTransaction extends Transaction {
  isEditing: boolean
}

interface LinkedAccount {
  type: "bank" | "crypto"
  data: any
}

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [financialData, setFinancialData] = useState({
    income: 5000,
    bankBalance: 12000,
    stocksBalance: 8000,
    cryptoBalance: 3000,
    expenses: 2500,
    debt: 5000, // New field for debt
  })
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<number>(0)
  const [transactions, setTransactions] = useState<EditableTransaction[]>([
    {
      id: "1",
      date: "2023-06-01",
      description: "Salary Deposit",
      amount: 5000,
      isEditing: false,
    },
    {
      id: "2",
      date: "2023-06-02",
      description: "Grocery Shopping",
      amount: -150,
      isEditing: false,
    },
    {
      id: "3",
      date: "2023-06-03",
      description: "Stock Dividend",
      amount: 75,
      isEditing: false,
    },
  ])
  const [linkedAccounts, setLinkedAccounts] = useState<LinkedAccount[]>([])
  const [showLinkAccount, setShowLinkAccount] = useState<"bank" | "crypto" | null>(null)

  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    fetchFinancialData()
  }, [])

  const fetchFinancialData = async () => {
    // In a real application, this would fetch data from your backend
    // For now, we'll use the mock data
    setFinancialData({
      income: 5000,
      bankBalance: 12000,
      stocksBalance: 8000,
      cryptoBalance: 3000,
      expenses: 2500,
      debt: 5000,
    })
  }

  const handleEdit = (field: string, value: number) => {
    setEditingField(field)
    setEditValue(value)
  }

  const handleSave = (field: string) => {
    setFinancialData((prev) => ({
      ...prev,
      [field]: editValue,
    }))
    setEditingField(null)
    toast({
      title: "Success",
      description: "Value updated successfully",
    })
  }

  const handleTransactionEdit = (id: string) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, isEditing: true } : t)))
  }

  const handleTransactionSave = (id: string) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, isEditing: false } : t)))
    toast({
      title: "Success",
      description: "Transaction updated successfully",
    })
  }

  const handleTransactionChange = (id: string, field: keyof Transaction, value: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: field === "amount" ? Number.parseFloat(value) : value } : t)),
    )
  }

  const handleAccountLinked = (type: "bank" | "crypto", accountData: any) => {
    setLinkedAccounts((prev) => [...prev, { type, data: accountData }])
    setShowLinkAccount(null)
    // In a real application, you would update the financial data based on the linked account
    // For this example, we'll just show a success message
    toast({
      title: "Success",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} account linked successfully`,
    })
  }

  const calculateNetWorth = () => {
    const totalAssets = financialData.bankBalance + financialData.stocksBalance + financialData.cryptoBalance
    const netWorth = totalAssets - financialData.debt
    return netWorth
  }

  const getNetWorthColor = () => {
    const netWorth = calculateNetWorth()
    if (netWorth > 0) return "text-green-500"
    if (netWorth < 0) return "text-red-500"
    return "text-white"
  }

  const pieChartData = [
    { name: "Bank Balance", value: financialData.bankBalance },
    { name: "Stocks Balance", value: financialData.stocksBalance },
    { name: "Crypto Balance", value: financialData.cryptoBalance },
    { name: "Debt", value: financialData.debt },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  if (!mounted) return null

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Financial Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {Object.entries(financialData).map(([key, value]) => (
          <Card key={key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium capitalize">{key}</CardTitle>
              {key === "income" && <DollarSign className="h-4 w-4 text-green-500" />}
              {key === "bankBalance" && <Wallet className="h-4 w-4 text-blue-500" />}
              {key === "stocksBalance" && <TrendingUp className="h-4 w-4 text-purple-500" />}
              {key === "cryptoBalance" && <Bitcoin className="h-4 w-4 text-orange-500" />}
              {key === "expenses" && <ArrowDownRight className="h-4 w-4 text-red-500" />}
              {key === "debt" && <ArrowUpRight className="h-4 w-4 text-red-500" />}
            </CardHeader>
            <CardContent>
              {editingField === key ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(Number(e.target.value))}
                    className="w-32"
                  />
                  <Button size="sm" variant="ghost" onClick={() => handleSave(key)}>
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditingField(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)}
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(key, value)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Net Worth Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4">
              <p className="text-lg font-semibold">Net Worth</p>
              <p className={`text-3xl font-bold ${getNetWorthColor()}`}>
                {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(calculateNetWorth())}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Net Worth Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={transactions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <AISuggestions financialData={financialData} />

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Linked Accounts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {linkedAccounts.map((account, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{account.type === "bank" ? "Bank Account" : "Crypto/Investment Account"}</CardTitle>
              </CardHeader>
              <CardContent>
                {account.type === "bank" ? (
                  <p>Account ending in: {account.data.accountNumber.slice(-4)}</p>
                ) : (
                  <p>
                    API Key: {account.data.apiKey.slice(0, 4)}...{account.data.apiKey.slice(-4)}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-4 space-x-4">
          <Button onClick={() => setShowLinkAccount("bank")}>Link Bank Account</Button>
          <Button onClick={() => setShowLinkAccount("crypto")}>Link Crypto/Investment Account</Button>
        </div>
      </div>

      {showLinkAccount && (
        <div className="mb-8">
          <AccountLink type={showLinkAccount} onAccountLinked={(data) => handleAccountLinked(showLinkAccount, data)} />
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Date</th>
                  <th className="text-left">Description</th>
                  <th className="text-right">Amount</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="py-2">
                      {transaction.isEditing ? (
                        <Input
                          type="date"
                          value={transaction.date}
                          onChange={(e) => handleTransactionChange(transaction.id, "date", e.target.value)}
                        />
                      ) : (
                        transaction.date
                      )}
                    </td>
                    <td className="py-2">
                      {transaction.isEditing ? (
                        <Input
                          type="text"
                          value={transaction.description}
                          onChange={(e) => handleTransactionChange(transaction.id, "description", e.target.value)}
                        />
                      ) : (
                        transaction.description
                      )}
                    </td>
                    <td className={`text-right py-2 ${transaction.amount >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {transaction.isEditing ? (
                        <Input
                          type="number"
                          value={transaction.amount}
                          onChange={(e) => handleTransactionChange(transaction.id, "amount", e.target.value)}
                          className="w-32 ml-auto"
                        />
                      ) : (
                        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                          transaction.amount,
                        )
                      )}
                    </td>
                    <td className="text-right py-2">
                      {transaction.isEditing ? (
                        <Button size="sm" variant="ghost" onClick={() => handleTransactionSave(transaction.id)}>
                          <Save className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button size="sm" variant="ghost" onClick={() => handleTransactionEdit(transaction.id)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

