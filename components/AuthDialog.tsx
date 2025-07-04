"use client"

import { useState, FormEvent, useEffect } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "./ui/input"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"

export default function AuthDialog({ authType }: { authType: "login" | "signup" }) {
  const [mode, setMode] = useState<"login" | "signup">(authType);
  const { user, login, signup, logout, sendVerificationEmail } = useAuth();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [showVerification, setShowVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && !user.emailVerified) {
      setShowVerification(true);
    }
  }, [user]);
  const toggleMode = () => setMode(mode === "login" ? "signup" : "login");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await signup(email, password);
        setShowVerification(true)
      }
      // Optional: redirect or close dialog
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-white text-blue-600 hover:bg-white/90 px-6 rounded-full">
          {mode === "login" ? "Login" : "Sign up"}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="text-lg font-semibold text-gray-800">
          {showVerification && user && !user.emailVerified ? (
            <>
              <p className="text-sm pb-2">Email Sent!</p>
              <p>Verify You Email Address</p>
            </>
          ) : mode === "login" ? (
            <>
              <p className="text-sm pb-2">Welcome Back!</p>
              <p>Fill in your details to proceed</p>
            </>
          ) : (
            <>
              <p className="text-sm pb-2">Hi there! </p>
              <p>Create an account to get started!</p>
            </>
          )}
        </DialogTitle>

        {showVerification && user && !user.emailVerified ? (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700">
              A verification email has been sent to {user.email}. Please verify
              your email address to continue.
            </p>
            <Button
              className="w-full mt-2"
              onClick={() => sendVerificationEmail()}
            >
              Resend Verification Email
              {loading && "..."}
            </Button>
          </div>
        ) : (
          <>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                <Image
                  src="/google.png"
                  width={20}
                  height={20}
                  alt="google auth"
                />
                {mode === "login"
                  ? "Log in with Google"
                  : "Sign up with Google"}
              </Button>
            </div>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-400">Or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  required
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {mode === "signup" ? (
                <div className="flex items-center">
                  <Input
                    type="checkbox"
                    id="terms"
                    required
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    I agree with Terms and Privacy
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Input
                      type="checkbox"
                      id="remember"
                      className="h-3 w-3 text-blue-600 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 block text-xs text-gray-900"
                    >
                      Remember Me
                    </label>
                  </div>
                  <Link href="#" className="underline text-xs">
                    Forget Password?
                  </Link>
                </div>
              )}

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                {loading
                  ? "Processing..."
                  : mode === "login"
                  ? "Sign in"
                  : "Sign up"}
              </Button>
            </form>

            {user && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-700">
                  Logged in as: {user.email}
                </p>
                <Input
                  type="text"
                  value={
                    user.emailVerified ? "Email Verified" : "Email Not Verified"
                  }
                  readOnly
                  className={`mt-2 text-center ${
                    user.emailVerified ? "text-green-600" : "text-red-600"
                  }`}
                />
                <Button className="w-full mt-2" onClick={logout}>
                  Logout
                </Button>
              </div>
            )}
          </>
        )}
        <div className="mt-4 text-center text-xs">
          {mode === "login" ? (
            <>
              <p>
                Don't have an account?{" "}
                <button
                  onClick={toggleMode}
                  className="text-blue-600 hover:underline"
                >
                  Sign up
                </button>
              </p>
            </>
          ) : (
            <>
              <p>
                Already have an account?{" "}
                <button
                  onClick={toggleMode}
                  className="text-blue-600 hover:underline"
                >
                  Sign in
                </button>
              </p>
              <p className="pt-2">
                Want to Sell?{" "}
                <Link
                  href="#"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Create Merchant Account
                </Link>
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
