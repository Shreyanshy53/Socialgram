import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Heart, MessageCircle, Users, Zap, Globe, Lock, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@assets/generated_images/social_media_community_hero.png";
import appMockupImage from "@assets/generated_images/social_app_interface_mockup.png";
import communityImage from "@assets/generated_images/global_community_connection.png";
import backgroundImage from "@assets/generated_images/elegant_red_luxury_background.png";

export default function Landing() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 -z-20 pointer-events-none bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Overlay for better content readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/40"></div>
      </div>

      {/* Hero Section with Image */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 container max-w-7xl mx-auto px-4 py-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100/70 backdrop-blur-sm rounded-full border border-red-300/60 shadow-lg">
                  <Sparkles className="h-4 w-4 text-red-600" />
                  <p className="text-sm font-semibold text-red-700">Premium Social Experience</p>
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-gray-900">
                  <span className="bg-gradient-to-r from-red-600 via-red-500 to-amber-600 bg-clip-text text-transparent">
                    Share Your
                  </span>
                  <br />
                  <span className="text-gray-900">Finest Moments</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-800 max-w-xl leading-relaxed font-medium">
                  An elegantly designed social platform for meaningful connections. Share your stories, connect with sophisticated minds, and build a community that values quality.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => (window.location.href = "/api/login")}
                  data-testid="button-login"
                  className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 transition-all text-white shadow-lg"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-base font-semibold px-8 h-12 border-red-300 text-red-700 hover:bg-red-100/70 backdrop-blur-sm bg-white/50"
                >
                  Learn More
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-red-200/60">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-red-600">100%</p>
                  <p className="text-xs text-gray-800 font-medium">Free Forever</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-red-600">Real-time</p>
                  <p className="text-xs text-gray-800 font-medium">Instant Chat</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-red-600">Secure</p>
                  <p className="text-xs text-gray-800 font-medium">Enterprise Grade</p>
                </div>
              </div>
            </div>

            {/* Right Image - Hero */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-br from-red-200/30 via-amber-100/30 to-red-100/30 rounded-2xl blur-3xl"></div>
              <img 
                src={heroImage} 
                alt="Socialgram Community" 
                className="relative w-full rounded-3xl shadow-2xl border border-red-200/60 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* App Showcase Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Left */}
            <div className="relative hidden lg:block order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-200/30 via-amber-100/30 to-red-100/30 rounded-2xl blur-3xl"></div>
              <img 
                src={appMockupImage} 
                alt="App Interface" 
                className="relative w-full max-w-md mx-auto rounded-3xl shadow-2xl border border-red-200/60 hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content Right */}
            <div className="space-y-6 order-1 lg:order-2">
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
                  The Premium Way to Connect
                </h2>
                <p className="text-lg text-gray-800 font-medium">
                  Experience elegant design meets powerful functionality. Share moments with grace, engage thoughtfully, and build meaningful relationships.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Share Photos Elegantly", desc: "Upload with professional-grade cloud storage" },
                  { title: "Real-time Conversations", desc: "Instant messaging with seamless connectivity" },
                  { title: "Smart Notifications", desc: "Stay informed about what matters to you" },
                  { title: "Refined Performance", desc: "Lightning-fast experience on every device" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group hover:bg-white/40 p-4 rounded-xl transition-colors backdrop-blur-sm">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-red-200 to-amber-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                      <Sparkles className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-800">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container max-w-7xl mx-auto px-4 py-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Premium Features</h2>
          <p className="text-xl text-gray-800 font-medium max-w-2xl mx-auto">
            Everything you need for a superior social experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <Card className="hover:shadow-xl transition-shadow border-red-200/60 bg-white/70 backdrop-blur-sm group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-red-200 to-amber-100 flex items-center justify-center mx-auto group-hover:scale-125 transition-transform duration-300 shadow-md">
                <Camera className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Share Photos</h3>
              <p className="text-sm text-gray-800">
                Upload beautiful moments with professional cloud storage
              </p>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="hover:shadow-xl transition-shadow border-red-200/60 bg-white/70 backdrop-blur-sm group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-red-200 to-amber-100 flex items-center justify-center mx-auto group-hover:scale-125 transition-transform duration-300 shadow-md">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Engage & Connect</h3>
              <p className="text-sm text-gray-800">
                Like, comment, and engage meaningfully with your circle
              </p>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="hover:shadow-xl transition-shadow border-red-200/60 bg-white/70 backdrop-blur-sm group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-red-200 to-amber-100 flex items-center justify-center mx-auto group-hover:scale-125 transition-transform duration-300 shadow-md">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Build Your Network</h3>
              <p className="text-sm text-gray-800">
                Follow influencers and grow your sophisticated network
              </p>
            </CardContent>
          </Card>

          {/* Feature 4 */}
          <Card className="hover:shadow-xl transition-shadow border-red-200/60 bg-white/70 backdrop-blur-sm group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-red-200 to-amber-100 flex items-center justify-center mx-auto group-hover:scale-125 transition-transform duration-300 shadow-md">
                <MessageCircle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Private Messaging</h3>
              <p className="text-sm text-gray-800">
                Seamless real-time conversations with zero latency
              </p>
            </CardContent>
          </Card>

          {/* Feature 5 */}
          <Card className="hover:shadow-xl transition-shadow border-red-200/60 bg-white/70 backdrop-blur-sm group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-red-200 to-amber-100 flex items-center justify-center mx-auto group-hover:scale-125 transition-transform duration-300 shadow-md">
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Discover Trends</h3>
              <p className="text-sm text-gray-800">
                Explore curated content from your community
              </p>
            </CardContent>
          </Card>

          {/* Feature 6 */}
          <Card className="hover:shadow-xl transition-shadow border-red-200/60 bg-white/70 backdrop-blur-sm group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-red-200 to-amber-100 flex items-center justify-center mx-auto group-hover:scale-125 transition-transform duration-300 shadow-md">
                <Zap className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Blazingly Fast</h3>
              <p className="text-sm text-gray-800">
                Optimized performance for instant load times
              </p>
            </CardContent>
          </Card>

          {/* Feature 7 */}
          <Card className="hover:shadow-xl transition-shadow border-red-200/60 bg-white/70 backdrop-blur-sm group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-red-200 to-amber-100 flex items-center justify-center mx-auto group-hover:scale-125 transition-transform duration-300 shadow-md">
                <Lock className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Private & Secure</h3>
              <p className="text-sm text-gray-800">
                Enterprise-grade security with OAuth protection
              </p>
            </CardContent>
          </Card>

          {/* Feature 8 */}
          <Card className="hover:shadow-xl transition-shadow border-red-200/60 bg-white/70 backdrop-blur-sm group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-red-200 to-amber-100 flex items-center justify-center mx-auto group-hover:scale-125 transition-transform duration-300 shadow-md">
                <Globe className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Global Community</h3>
              <p className="text-sm text-gray-800">
                Connect with refined individuals worldwide
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Community Section with Image */}
      <div className="relative py-24 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Left */}
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
                Join Our Exclusive Community
              </h2>
              <p className="text-lg text-gray-800 font-medium">
                Connect with millions of thoughtful users sharing their passions. Build real relationships, discover inspiring content, and grow your influence in a refined digital space.
              </p>
              
              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={() => (window.location.href = "/api/login")}
                  className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 transition-all text-white shadow-lg"
                >
                  Join Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Image Right */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-200/30 via-amber-100/30 to-red-100/30 rounded-2xl blur-3xl"></div>
              <img 
                src={communityImage} 
                alt="Global Community" 
                className="relative w-full rounded-3xl shadow-2xl border border-red-200/60 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container max-w-7xl mx-auto px-4 py-24 relative z-10">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-red-600 via-red-500 to-red-700 border border-red-600 p-16 md:p-24 shadow-2xl">
          <div className="absolute inset-0 opacity-30">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <defs>
                <pattern id="cta-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-pattern)" />
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-400/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-400/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="text-center space-y-8 relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to Share Your Story?</h2>
            <p className="text-xl text-red-100">
              Join thousands of creators sharing their finest moments. Get started in just 30 seconds.
            </p>
            <Button
              size="lg"
              onClick={() => (window.location.href = "/api/login")}
              data-testid="button-cta-login"
              className="text-base font-semibold px-10 h-14 bg-white hover:bg-gray-100 text-red-600 transition-colors"
            >
              Create Your Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-red-200/60 py-12 relative z-10 bg-white/40 backdrop-blur-sm">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center space-y-2 text-gray-800">
            <p className="font-semibold text-gray-900">© 2024 Socialgram. Elegantly Crafted.</p>
            <p className="text-sm">Built with React, Express, MongoDB, and care</p>
            <p className="text-xs mt-4">Open source · Privacy first · Always free</p>
          </div>
        </div>
      </div>
    </div>
  );
}
