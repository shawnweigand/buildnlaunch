"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"
import { route } from "ziggy-js"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

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
            <Link href={`${route('home')}#services`} className="text-sm font-medium transition-colors hover:text-primary">
              Services
            </Link>
            <Link href={`${route('home')}#work`} className="text-sm font-medium transition-colors hover:text-primary">
              Work
            </Link>
            <Link href={`${route('home')}#about`} className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href={`${route('home')}#clients`} className="text-sm font-medium transition-colors hover:text-primary">
              Clients
            </Link>
            <Link href={`${route('home')}#contact`} className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
            <Link href={route('pricing')} className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm" className="rounded-3xl">
              Log In
            </Button>
            <Button size="sm" className="rounded-3xl">
              Get Started
            </Button>
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
            <nav className="flex flex-col space-y-6">
              <Link
                href={`${route('home')}#services`}
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={toggleMenu}
              >
                Services
              </Link>
              <Link
                href={`${route('home')}#work`}
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={toggleMenu}
              >
                Work
              </Link>
              <Link
                href={`${route('home')}#about`}
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                href={`${route('home')}#clients`}
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={toggleMenu}
              >
                Clients
              </Link>
              <Link
                href={`${route('home')}#contact`}
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Link
                href={route('pricing')}
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={toggleMenu}
              >
                Pricing
              </Link>
            </nav>
            <div className="mt-8 flex flex-col space-y-4">
              <Button variant="outline" className="w-full rounded-3xl">
                Log In
              </Button>
              <Button className="w-full rounded-3xl">
                Get Started
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}
