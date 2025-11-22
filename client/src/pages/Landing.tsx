import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Heart, MessageCircle, Users, Zap, Globe, Lock, TrendingUp } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section with Gradient Background */}
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 container max-w-6xl mx-auto px-4 py-20">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
                <p className="text-sm font-semibold text-primary">✨ Welcome to Socialgram</p>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                  Share Your World,
                </span>
                <br />
                <span className="text-foreground">Connect With Everyone</span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                The modern social platform where your moments matter. Share photos, connect with friends, and discover inspiring content from around the globe.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button
                size="lg"
                onClick={() => (window.location.href = "/api/login")}
                data-testid="button-login"
                className="text-base font-semibold px-8 h-12"
              >
                Get Started Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                className="text-base font-semibold px-8 h-12"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-12 border-t border-border/50 mt-12">
              <div className="space-y-2">
                <p className="text-3xl font-bold text-primary">100%</p>
                <p className="text-sm text-muted-foreground">Free & Open Source</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-primary">Real-time</p>
                <p className="text-sm text-muted-foreground">Live Messaging</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-primary">Secure</p>
                <p className="text-sm text-muted-foreground">By Default</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Powerful Features Built For You</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to stay connected with your community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <Card className="hover-elevate border-border/50 group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Camera className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Share Photos</h3>
              <p className="text-sm text-muted-foreground">
                Upload beautiful moments with instant cloud storage via Cloudinary
              </p>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="hover-elevate border-border/50 group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-red-500/20 to-red-400/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Heart className="h-7 w-7 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold">Like & Engage</h3>
              <p className="text-sm text-muted-foreground">
                Like, comment, and engage with content from your community instantly
              </p>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="hover-elevate border-border/50 group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Users className="h-7 w-7 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold">Build Community</h3>
              <p className="text-sm text-muted-foreground">
                Follow friends and grow your network with a beautiful social graph
              </p>
            </CardContent>
          </Card>

          {/* Feature 4 */}
          <Card className="hover-elevate border-border/50 group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-400/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <MessageCircle className="h-7 w-7 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold">Real-time Chat</h3>
              <p className="text-sm text-muted-foreground">
                Message friends instantly with our WebSocket-powered chat system
              </p>
            </CardContent>
          </Card>

          {/* Feature 5 */}
          <Card className="hover-elevate border-border/50 group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-400/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <TrendingUp className="h-7 w-7 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold">Discover Trends</h3>
              <p className="text-sm text-muted-foreground">
                Explore trending content and find new accounts to follow
              </p>
            </CardContent>
          </Card>

          {/* Feature 6 */}
          <Card className="hover-elevate border-border/50 group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-500/20 to-green-400/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Zap className="h-7 w-7 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Built with modern tech for instant load times and smooth performance
              </p>
            </CardContent>
          </Card>

          {/* Feature 7 */}
          <Card className="hover-elevate border-border/50 group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-pink-400/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Lock className="h-7 w-7 text-pink-500" />
              </div>
              <h3 className="text-lg font-semibold">Secure & Private</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade security with OAuth authentication built-in
              </p>
            </CardContent>
          </Card>

          {/* Feature 8 */}
          <Card className="hover-elevate border-border/50 group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-400/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Globe className="h-7 w-7 text-cyan-500" />
              </div>
              <h3 className="text-lg font-semibold">Global Platform</h3>
              <p className="text-sm text-muted-foreground">
                Connect with people from around the world on Replit
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="container max-w-6xl mx-auto px-4 py-24">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/20 p-12 md:p-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="text-center space-y-6 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold">Ready to Join?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start sharing your moments and connecting with amazing people today. It's free, fast, and fun!
            </p>
            <Button
              size="lg"
              onClick={() => (window.location.href = "/api/login")}
              data-testid="button-cta-login"
              className="text-base font-semibold px-8 h-12"
            >
              Create Your Account
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border/50 py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p>© 2024 Socialgram. Built with React, Express, MongoDB, and ❤️</p>
            <p className="text-sm mt-2">Open source · Privacy first · Always free</p>
          </div>
        </div>
      </div>
    </div>
  );
}
