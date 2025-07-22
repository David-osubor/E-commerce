"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
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
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <div className="space-y-3 text-sm">
              <p>support@digimart.com</p>
              <Link href="/contact" className="block hover:underline">
                Contact Us
              </Link>
            </div>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <div className="space-y-3 text-sm">
              <Link href="/about-us" className="block hover:underline">
                About Ibogun Market
              </Link>
              <Link href="#" className="block hover:underline">
                We are hiring!
              </Link>
              <Link
                href="/terms-and-conditions"
                className="block hover:underline"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Quick Link */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Link</h3>
            <div className="space-y-3 text-sm">
              <Link
                href="/terms-and-conditions"
                className="block hover:underline"
              >
                Terms Of Use
              </Link>
            </div>
          </div>

          {/* Download App */}
          <div>
            <div className="space-y-4">
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
          <p>© Copyright 2025. All right reserved</p>
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
  );
}
