"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FloatingAnimals from "@/components/floating-animals";
import BackgroundMusic from "@/components/BackgroundMusic";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showNameEntry, setShowNameEntry] = useState(false);
  const [name, setName] = useState("");
  const [ownerMode, setOwnerMode] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      setShowNameEntry(true);

      // Check if user has visited before
      const visitors = JSON.parse(localStorage.getItem("visitors") || "[]");
      const savedName = localStorage.getItem("visitorName");
      if (savedName && visitors.includes(savedName)) {
        setName(savedName);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      // Store visitor name in localStorage
      localStorage.setItem("visitorName", name);
      const visitors = JSON.parse(localStorage.getItem("visitors") || "[]");
      if (!visitors.includes(name)) {
        visitors.push(name);
        localStorage.setItem("visitors", JSON.stringify(visitors));
      }

      // Add to today's visitors
      const today = new Date().toDateString();
      const todayVisitors = JSON.parse(
        localStorage.getItem(`visitors_${today}`) || "[]"
      );
      if (!todayVisitors.includes(name)) {
        todayVisitors.push(name);
        localStorage.setItem(
          `visitors_${today}`,
          JSON.stringify(todayVisitors)
        );
      }

      router.push("/gallery");
    }
  };

  const handleOwnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in a real app, use proper authentication
    if (password === "naxxa444") {
      localStorage.setItem("isOwner", "true");
      router.push("/gallery");
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      <BackgroundMusic />
      <FloatingAnimals />

      {loading ? (
        <div className="text-center z-10">
          <Loader2 className="h-16 w-16 animate-spin mx-auto mb-4 text-purple-500" />
          <h1 className="text-3xl font-gothic mb-4">
            Loading Naxxa&apos;s Gallery...
          </h1>
          <div className="y2k-animal">
            <div className="y2k-animal-container">
              <div className="y2k-animal-emoji">🦇</div>
              <div className="y2k-glow"></div>
              <div className="y2k-sparkle"></div>
              <div className="y2k-ring"></div>
              <div className="y2k-ring"></div>
            </div>
          </div>
        </div>
      ) : showNameEntry ? (
        <div className="z-10 bg-gray-900/80 p-8 rounded-lg border border-purple-500 max-w-md w-full rounded-2xl">
          <h1 className="text-3xl font-gothic mb-6 text-center text-purple-400">
            Naxxa&apos;s Gallery
          </h1>

          <form onSubmit={handleNameSubmit} className="mb-6">
            <label className="block mb-2 text-lg">
              Please enter your name:
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-800 border-purple-500 mb-4"
              placeholder="Your name"
              required
            />
            <Button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-600">
              Enter Gallery
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="outline"
              className="border-purple-500 text-purple-400"
              onClick={() => setOwnerMode(true)}>
              <Lock className="mr-2 h-4 w-4" />
              Owner Access
            </Button>
          </div>

          {ownerMode && (
            <form onSubmit={handleOwnerSubmit} className="mt-6">
              <label className="block mb-2 text-lg">Owner Password:</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-purple-500 mb-4"
                placeholder="Password"
                required
              />
              <Button
                type="submit"
                className="w-full bg-purple-700 hover:bg-purple-600">
                Login as Owner
              </Button>
            </form>
          )}
        </div>
      ) : null}
    </main>
  );
}
