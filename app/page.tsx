"use client"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTheme } from "next-themes"

export default function SplashScreen() {
  const { theme, setTheme } = useTheme()

  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.documentElement.classList.add("dark")
  //   } else {
  //     document.documentElement.classList.remove("dark")
  //   }
  // }, [isDarkMode])

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${
        theme === "dark" ? "from-gray-900 to-gray-700" : "from-blue-100 to-white"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className={`text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>Spend-Lytics</h1>
        <p className={`text-xl mb-8 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
          Your AI-Powered Financial Assistant
        </p>
        <div className="space-x-4">
          <Button size="lg" className="px-8 py-3 rounded-full text-lg">
            <Link href="/login">Log In</Link>
          </Button>
          <Button size="lg" variant="outline" className="px-8 py-3 rounded-full text-lg">
            <Link href="/about">About</Link>
          </Button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-12"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </Button>
      </motion.div>
    </div>
  )
}

