import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Heart, MessageCircle, Users, Zap, Globe, Lock, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@assets/generated_images/social_media_community_hero.png";
import appMockupImage from "@assets/generated_images/social_app_interface_mockup.png";
import communityImage from "@assets/generated_images/global_community_connection.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section with Image */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient background with more intensity */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 container max-w-7xl mx-auto px-4 py-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-primary">Welcome to the Future</p>
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Share Your
                  </span>
                  <br />
                  <span className="text-foreground">Moments Instantly</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
                  Join millions of users sharing their stories. Real-time messaging, instant notifications, and a community that cares about your content.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => (window.location.href = "/api/login")}
                  data-testid="button-login"
                  className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition-opacity"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-base font-semibold px-8 h-12"
                >
                  Explore Features
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border/50">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text">100%</p>
                  <p className="text-xs text-muted-foreground">Free Forever</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text">Real-time</p>
                  <p className="text-xs text-muted-foreground">Instant Chat</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text">Secure</p>
                  <p className="text-xs text-muted-foreground">Encrypted</p>
                </div>
              </div>
            </div>

            {/* Right Image - Hero */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl"></div>
              <img 
                src={heroImage} 
                alt="Socialgram Community" 
                className="relative w-full rounded-2xl shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* App Showcase Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>
        
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Left */}
            <div className="relative hidden lg:block order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl"></div>
              <img 
                src={appMockupImage} 
                alt="App Interface" 
                className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content Right */}
            <div className="space-y-6 order-1 lg:order-2">
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl font-bold">
                  Experience the Power of Real-time Connection
                </h2>
                <p className="text-lg text-muted-foreground">
                  Lightning-fast messaging, instant notifications, and a beautiful interface designed for modern social networking.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Share Photos Instantly", desc: "Upload to Cloudinary with automatic optimization" },
                  { title: "Real-time Messaging", desc: "WebSocket-powered instant communication" },
                  { title: "Live Notifications", desc: "Never miss likes, comments, or follows" },
                  { title: "Built for Speed", desc: "Optimized performance on every device" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group hover-elevate p-4 rounded-lg">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Powerful Features Built For You</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to stay connected with your community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <Card className="hover-elevate border-border/50 group bg-gradient-to-br from-transparent to-blue-500/5">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500/30 to-blue-400/10 flex items-center justify-center mx-auto group-hover:scale-125 transition-transform duration-300">
                <Camera className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold">Share Photos</h3>
              <p className="text-sm text-muted-foreground">
                Upload beautiful moments with instant cloud storage
              </p>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="hover-elevate border-border/50 group bg-gradient-to-br from-transparent to-red-500/5">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-red-500/30 to-red-400/10 flex items-center justify-center mx-auto group-hover:scale-125 transition-transform duration-300">
                <Heart className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-lg font-bold">Like & Engage</h3>
              <p className="text-sm text-muted-foreground">
                Like, comment, and engage instantly with the community
              </p>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="hover-elevate border-border/50 group bg-gradient-to-br from-transparent to-blue-600/5">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-600/30 to-blue-500/10 flex items-center justify-center mx-auto group-hover:scale-125 transition-transform duration-300">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold">Build Community</h3>
              <p className="text-sm text-muted-foreground">
                Follow friends and grow your social network
              </p>
            </CardContent>
          </Card>

          {/* Feature 4 */}
          <Card className="hover-elevate border-border/50 group bg-gradient-to-br from-transparent to-purple-500/5">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-purple-500/30 to-purple-400/10 flex items-center justify-center mx-auto group-hover:scale-125 transition-transform duration-300">
                <MessageCircle className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold">Real-time Chat</h3>
              <p className="text-sm text-muted-foreground">
                Message friends instantly with zero latency
              </p>
            </CardContent>
          </Card>

          {/* Feature 5 */}
          <Card className="hover-elevate border-border/50 group bg-gradient-to-br from-transparent to-yellow-500/5">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-yellow-500/30 to-yellow-400/10 flex items-center justify-center mx-auto group-hover:scale-125 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-lg font-bold">Discover Trends</h3>
              <p className="text-sm text-muted-foreground">
                Explore trending content from your community
              </p>
            </CardContent>
          </Card>

          {/* Feature 6 */}
          <Card className="hover-elevate border-border/50 group bg-gradient-to-br from-transparent to-green-500/5">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-green-500/30 to-green-400/10 flex items-center justify-center mx-auto group-hover:scale-125 transition-transform duration-300">
                <Zap className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-lg font-bold">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Built for instant load times and smooth performance
              </p>
            </CardContent>
          </Card>

          {/* Feature 7 */}
          <Card className="hover-elevate border-border/50 group bg-gradient-to-br from-transparent to-pink-500/5">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-pink-500/30 to-pink-400/10 flex items-center justify-center mx-auto group-hover:scale-125 transition-transform duration-300">
                <Lock className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-lg font-bold">Secure & Private</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade security with OAuth built-in
              </p>
            </CardContent>
          </Card>

          {/* Feature 8 */}
          <Card className="hover-elevate border-border/50 group bg-gradient-to-br from-transparent to-cyan-500/5">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-cyan-500/30 to-cyan-400/10 flex items-center justify-center mx-auto group-hover:scale-125 transition-transform duration-300">
                <Globe className="h-8 w-8 text-cyan-500" />
              </div>
              <h3 className="text-lg font-bold">Global Platform</h3>
              <p className="text-sm text-muted-foreground">
                Connect with people from around the world
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Community Section with Image */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Left */}
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold">
                Join a Global Community
              </h2>
              <p className="text-lg text-muted-foreground">
                Connect with millions of users sharing their passions, ideas, and moments. Build real relationships and grow your influence.
              </p>
              
              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={() => (window.location.href = "/api/login")}
                  className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-opacity"
                >
                  Join Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Image Right */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-2xl blur-2xl"></div>
              <img 
                src={communityImage} 
                alt="Global Community" 
                className="relative w-full rounded-2xl shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container max-w-7xl mx-auto px-4 py-24">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-primary/20 p-16 md:p-24">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="text-center space-y-8 relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold">Ready to Share Your Story?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of creators sharing their moments every day. It takes just 30 seconds to get started!
            </p>
            <Button
              size="lg"
              onClick={() => (window.location.href = "/api/login")}
              data-testid="button-cta-login"
              className="text-base font-semibold px-10 h-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity text-white"
            >
              Create Your Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border/50 py-12 bg-gradient-to-b from-transparent to-primary/5">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center space-y-2 text-muted-foreground">
            <p className="font-semibold">© 2024 Socialgram. All rights reserved.</p>
            <p className="text-sm">Built with React, Express, MongoDB, and ❤️</p>
            <p className="text-xs mt-4">Open source · Privacy first · Always free</p>
          </div>
        </div>
      </div>
    </div>
  );
}
