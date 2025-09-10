"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link, usePage } from "@inertiajs/react"
import { route } from "ziggy-js"
import { dashboard, login } from "@/routes"
import { type SharedData } from "@/types"
import { smoothScrollToElement } from "@/lib/smooth-scroll"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const { auth } = usePage<SharedData>().props

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSmoothScroll = (elementId: string) => {
    smoothScrollToElement(elementId, { offset: 100 })
    setIsMenuOpen(false) // Close mobile menu after clicking
  }

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${scrollY > 50 ? "shadow-md" : ""}`}
      >
        <div className="container flex h-16 items-center justify-between border-b border-muted mx-auto">
          <div className="flex items-center gap-3">
            <Link href={route('home')} className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="h-10 w-10 rounded-3xl bg-primary flex items-center justify-center"
              >
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </motion.div>
              <span className="font-bold text-xl">Studio</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-3">
            <button
              onClick={() => handleSmoothScroll('pricing')}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Pricing
            </button>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            {auth.user ? (
              <Link
                href={dashboard()}
                className="inline-flex items-center justify-center rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href={login()}
                className="inline-flex items-center justify-center rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
              >
                Log in
              </Link>
            )}
          </div>
          <button className="flex md:hidden" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background md:hidden"
        >
          <div className="container flex h-16 items-center justify-between mx-auto">
            <div className="flex items-center gap-3">
              <Link href={route('home')} className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-3xl bg-primary flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl">Studio</span>
              </Link>
            </div>
            <button className="flex md:hidden" onClick={toggleMenu}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <div className="container mx-auto px-4 py-8">
            <nav className="flex flex-col items-center space-y-6">
              <button
                onClick={() => handleSmoothScroll('pricing')}
                className="text-lg font-medium transition-colors hover:text-primary"
              >
                Pricing
              </button>
            </nav>
            <div className="mt-8 flex flex-col space-y-4">
              {auth.user ? (
                <Link
                  href={dashboard()}
                  className="inline-flex items-center justify-center rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href={login()}
                  className="inline-flex items-center justify-center rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                  onClick={toggleMenu}
                >
                  Log in
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}
