"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, Moon, Sun, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { isAuthenticated, isLoading, checkAuth } = useAuth()

  // Mount effect
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "POST" })
      if (response.ok) {
        await checkAuth()
        router.push("/")
        toast({
          title: "Success",
          description: "Logged out successfully",
        })
      } else {
        throw new Error("Logout failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      })
    }
  }

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/subscription", label: "Subscription" },
    ...(isAuthenticated
      ? [{ href: "/dashboard", label: "Dashboard" }]
      : [
          { href: "/login", label: "Log In" },
          { href: "/register", label: "Register" },
        ]),
  ]

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <nav className="bg-background shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="animate-pulse bg-gray-200 h-8 w-32" />
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-background shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-foreground text-lg">Spend-Lytics</span>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-4 px-2 text-foreground font-semibold hover:text-primary transition duration-300 ${
                  pathname === link.href ? "text-primary border-b-2 border-primary" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && (
              <Button variant="ghost" onClick={handleLogout} className="ml-4">
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-4"
            >
              {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </Button>
          </div>
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="mobile-menu md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-2 px-4 text-sm hover:bg-primary hover:text-primary-foreground ${
                pathname === link.href ? "bg-primary text-primary-foreground" : "text-foreground"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated && (
            <Button variant="ghost" onClick={handleLogout} className="w-full text-left py-2 px-4">
              Logout
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full text-left py-2 px-4"
          >
            {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </Button>
        </div>
      )}
    </nav>
  )
}

