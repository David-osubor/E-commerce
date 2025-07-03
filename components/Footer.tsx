"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Ibogun Market */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Ibogun Market</h3>
            <div className="space-y-3">
              <p className="text-sm">Subscribe</p>
              <p className="text-sm">Get 10% off your first order</p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent border-white text-white placeholder:text-white/70 rounded-r-none"
                />
                <Button className="bg-white text-blue-600 hover:bg-white/90 rounded-l-none">→</Button>
              </div>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <div className="space-y-3 text-sm">
              <p>support@digimart.com</p>
              <p>Safety tips</p>
              <p>Contact Us</p>
            </div>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <div className="space-y-3 text-sm">
              <Link href="#" className="block hover:underline">
                About Ibogun Market
              </Link>
              <Link href="#" className="block hover:underline">
                We are hiring!
              </Link>
              <Link href="#" className="block hover:underline">
                Terms & Conditions
              </Link>
              <Link href="#" className="block hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="block hover:underline">
                Billing Policy
              </Link>
              <Link href="#" className="block hover:underline">
                Candidate Privacy Policy
              </Link>
            </div>
          </div>

          {/* Quick Link */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Link</h3>
            <div className="space-y-3 text-sm">
              <Link href="#" className="block hover:underline">
                Terms Of Use
              </Link>
              <Link href="#" className="block hover:underline">
                FAQ
              </Link>
            </div>
          </div>

          {/* Download App */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Download App</h3>
            <div className="space-y-4">
              {/* QR Code Placeholder */}
              <div className="w-20 h-20 bg-white rounded"></div>

              {/* Social Media Icons */}
              <div className="flex space-x-3">
                <Facebook className="h-5 w-5 cursor-pointer hover:opacity-80" />
                <Twitter className="h-5 w-5 cursor-pointer hover:opacity-80" />
                <Instagram className="h-5 w-5 cursor-pointer hover:opacity-80" />
                <Linkedin className="h-5 w-5 cursor-pointer hover:opacity-80" />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm">
          <p>© Copyright 2021. All right reserved</p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <Button
        className="fixed bottom-6 right-6 bg-gray-300/90 rounded-full p-3 shadow-lg text-foreground"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </footer>
  )
}
