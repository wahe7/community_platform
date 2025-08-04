"use client";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { setToken } from "../lib/token";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    console.log("baseUrl",  baseUrl);

    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Store token in localStorage
      setToken(data.token);


      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-400 flex items-center justify-center p-4">
      <motion.div
        className="backdrop-blur-xl bg-white/10 border border-white/30 rounded-2xl shadow-2xl p-6 w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleLogin}>
          <Card className="bg-transparent border-none shadow-none">
            <CardContent className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-100 text-center">Welcome Back</h2>
              <p className="text-slate-200 text-center text-sm opacity-80">
                Please login to continue
              </p>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-slate-200">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 text-slate-300 opacity-60" size={18} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-slate-200">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 text-slate-300 opacity-60" size={18} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>
              </div>

              {error && <p className="text-red-300 text-sm text-center">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-white text-indigo-600 font-semibold hover:bg-indigo-100 hover:shadow-md transition"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </CardContent>
          </Card>
        </form>
      </motion.div>
    </div>
  );
}
