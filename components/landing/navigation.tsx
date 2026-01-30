"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Zap, Menu } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed w-full bg-background/90 backdrop-blur-sm z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">
              goalFlow<span className="text-primary">Pro</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">
              Testimonials
            </a>
            <Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">
              Login
            </Link>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/register">Start Free Trial</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <a href="#features" className="block text-muted-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#pricing" className="block text-muted-foreground hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="block text-muted-foreground hover:text-primary transition-colors">
              Testimonials
            </a>
            <Link href="/login" className="block text-muted-foreground hover:text-primary transition-colors">
              Login
            </Link>
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link href="/register">Start Free Trial</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
