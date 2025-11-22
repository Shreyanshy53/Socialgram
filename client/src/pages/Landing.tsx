import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-amber-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
            Socialgram
          </h1>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setLocation("/login")}
              data-testid="button-nav-login"
            >
              Sign In
            </Button>
            <Button
              onClick={() => setLocation("/signup")}
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
              data-testid="button-nav-signup"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900">
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-amber-600 bg-clip-text text-transparent">
                Connect. Share. Grow.
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 max-w-2xl mx-auto">
              Your new social platform for sharing moments and connecting with friends
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              onClick={() => setLocation("/signup")}
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8"
              data-testid="button-signup-hero"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setLocation("/login")}
              className="px-8"
              data-testid="button-login-hero"
            >
              Sign In
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="p-6 rounded-lg bg-white/70 backdrop-blur border border-red-200/50 text-center space-y-3">
            <div className="text-4xl">📸</div>
            <h3 className="text-lg font-bold text-gray-900">Share Posts</h3>
            <p className="text-gray-700 text-sm">Upload photos and share your moments with the world</p>
          </div>

          <div className="p-6 rounded-lg bg-white/70 backdrop-blur border border-red-200/50 text-center space-y-3">
            <div className="text-4xl">💬</div>
            <h3 className="text-lg font-bold text-gray-900">Real-Time Chat</h3>
            <p className="text-gray-700 text-sm">Message friends instantly with our real-time chat</p>
          </div>

          <div className="p-6 rounded-lg bg-white/70 backdrop-blur border border-red-200/50 text-center space-y-3">
            <div className="text-4xl">❤️</div>
            <h3 className="text-lg font-bold text-gray-900">Like & Comment</h3>
            <p className="text-gray-700 text-sm">Engage with posts and build meaningful conversations</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 p-12 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to connect?</h2>
          <p className="text-lg opacity-90 mb-6 max-w-xl mx-auto">
            Join thousands of users sharing their stories and connecting with friends
          </p>
          <Button
            size="lg"
            onClick={() => setLocation("/signup")}
            className="bg-white text-red-600 hover:bg-gray-100"
            data-testid="button-cta-signup"
          >
            Create Your Account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-24 py-8 bg-white/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 Socialgram. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
