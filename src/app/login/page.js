"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import bg from "./../../../public/background.png";
import { supabase } from "@/utils/supabase";
import {ChildContext} from './../context/childcontext';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setChildInfo } = useContext(ChildContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await supabase
        .from("childrens")
        .select()
        .eq("Email", email)
        .eq("Password", password);
      console.log(result.data[0]);

      if (result?.error) {
        setError(result.error);
      } else {
        
        setChildInfo(result.data[0]);
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <header className="h-20 bg-black w-full flex items-center relative">
        <div className="absolute left-4">
          <Image
            src="/1025.png"
            width={100}
            height={180}
            alt="logo"
            sizes="18"
            priority
          />
        </div>

        <p className="text-2xl font-bold text-center text-white w-full">
          Login page
        </p>
      </header>

      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-black/90 backdrop-blur-sm rounded-xl shadow-lg p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center text-white">
            Welcome Back
          </h1>

          {error && (
            <div className="bg-red-500/20 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-white"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-white"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
