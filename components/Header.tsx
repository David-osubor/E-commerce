"use client"
import Link from "next/link"
import AuthDialog from "./AuthDialog"
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const isMerchant = pathname.includes("/merchant")

  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Tagline */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-white text-xl font-semibold">
            Digi<span className="text-orange-300">Mart</span>
          </Link>
          <span className="text-white/80 text-sm font-medium hidden md:block">
            SELL FASTER, BUY SMARTER
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {user && user.emailVerified ? (
            <>
              {!isMerchant && (
              <Link href="/merchant/register">
                <Button className="rounded-none bg-orange-500">Sell</Button>
              </Link>
              )}
              <Button size="sm" variant="destructive" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <AuthDialog authType="login" />
              <AuthDialog authType="signup" />
            </>
          )}
        </div>
      </div>
    </header>
  );
}





















