"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

function VerifyEmailContent() {
  const [isVerifying, setIsVerifying] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  useEffect(() => {
    if (token) {
      verifyEmail(token)
    } else {
      setIsVerifying(false)
      toast({
        title: "Error",
        description: "Invalid verification link",
        variant: "destructive",
      })
    }
  }, [token])

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Email verified successfully",
        })
        router.push("/login")
      } else {
        const data = await response.json()
        toast({
          title: "Error",
          description: data.error || "Email verification failed",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Email Verification</h1>
        {isVerifying ? (
          <p>Verifying your email...</p>
        ) : (
          <Button onClick={() => router.push("/login")}>Go to Login</Button>
        )}
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}

