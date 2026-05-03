"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Loader } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { sendEmail, verifyEmail, authenticated } = useAuth();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authenticated) {
      router.push("/profile");
    }
  }, [authenticated, router]);

  if (authenticated) {
    return null;
  }

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await sendEmail(email);
      if (result.success) {
        setStep("code");
      } else {
        setError(result.error || "Failed to send email");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await verifyEmail(email, code);
      if (result.success) {
        router.push("/profile");
      } else {
        setError(result.error || "Invalid code");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inter outline-none bg-soft-beige min-h-screen flex flex-col">
      <Header variant="light" />

      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
          <h1 className="text-3xl font-black text-darkest-green mb-2">Login</h1>
          <p className="text-sm text-gray-600 mb-8">Sign in to your Velixaco account</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          {step === "email" ? (
            <form onSubmit={handleSendEmail} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-black mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-darkest-green bg-white text-black placeholder-gray-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-darkest-green text-white py-3 rounded-full font-black text-sm uppercase tracking-[0.1em] hover:opacity-90 disabled:opacity-60 transition-all flex items-center justify-center gap-2"
              >
                {loading && <Loader className="w-4 h-4 animate-spin" />}
                {loading ? "Sending code..." : "Send Code"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-6">
              <p className="text-sm text-gray-600">
                We sent a code to <strong>{email}</strong>
              </p>

              <div>
                <label className="block text-sm font-bold text-black mb-2">Verification Code</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="000000"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-darkest-green bg-white text-black placeholder-gray-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-darkest-green text-white py-3 rounded-full font-black text-sm uppercase tracking-[0.1em] hover:opacity-90 disabled:opacity-60 transition-all flex items-center justify-center gap-2"
              >
                {loading && <Loader className="w-4 h-4 animate-spin" />}
                {loading ? "Verifying..." : "Verify Code"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setCode("");
                  setError("");
                }}
                className="w-full text-darkest-green py-3 font-black text-sm uppercase tracking-[0.1em] hover:opacity-70 transition-all"
              >
                Back
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
