import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, MessageCircle, Zap, User, Bell, Lock, ArrowRight, Star } from "lucide-react";
import heroImage from "@assets/generated_images/social_media_community_hero.png";
import appMockupImage from "@assets/generated_images/social_app_interface_mockup.png";
import communityImage from "@assets/generated_images/global_community_connection.png";
import backgroundImage from "@assets/generated_images/minimalist_elegant_background.png";

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
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/40"></div>
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 container max-w-7xl mx-auto px-4 py-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-gray-900">
                  <span className="bg-gradient-to-r from-red-600 via-red-500 to-amber-600 bg-clip-text text-transparent">
                    Connect.
                  </span>
                  <br />
                  <span className="text-gray-900">Share.</span>
                  <br />
                  <span className="bg-gradient-to-r from-red-600 via-red-500 to-amber-600 bg-clip-text text-transparent">
                    Grow.
                  </span>
                </h1>
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                  Your Digital Social World Starts Here.
                </h2>
                <p className="text-lg text-gray-700 max-w-xl leading-relaxed">
                  Create posts, chat with friends, share your thoughts, build your profile, and grow your network — all in one place.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => (window.location.href = "/")}
                  className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 transition-all text-white shadow-lg"
                >
                  🚀 Get Started — Sign Up Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => (window.location.href = "/")}
                  className="text-base font-semibold px-8 h-12 border-red-300 text-red-700 hover:bg-red-100/70 backdrop-blur-sm bg-white/50"
                >
                  🔑 Already have an account? Login
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-br from-red-200/30 via-amber-100/30 to-red-100/30 rounded-2xl blur-3xl"></div>
              <img 
                src={heroImage} 
                alt="Digital social world" 
                className="relative w-full rounded-3xl shadow-2xl border border-red-200/60 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container max-w-7xl mx-auto px-4 py-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">⭐ Features</h2>
          <p className="text-xl text-gray-800 font-medium max-w-2xl mx-auto">
            Everything you need to connect, create, and grow
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <Card className="hover:shadow-xl transition-shadow border-red-200/60 bg-white/70 backdrop-blur-sm group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-red-200 to-amber-100 flex items-center justify-center mx-auto group-hover:scale-125 transition-transform duration-300 shadow-md">
                <Camera className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">📸 Share Your Story</h3>
              <p className="text-sm text-gray-800">
                Post photos, videos, and thoughts that matter to you. Express yourself with style and let your voice be heard.
              </p>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="hover:shadow-xl transition-shadow border-red-200/60 bg-white/70 backdrop-blur-sm group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-red-200 to-amber-100 flex items-center justify-center mx-auto group-hover:scale-125 transition-transform duration-300 shadow-md">
                <MessageCircle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">💬 Real-Time Chat</h3>
              <p className="text-sm text-gray-800">
                Connect instantly with friends and professionals using our fast, secure, and private messaging system.
              </p>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="hover:shadow-xl transition-shadow border-red-200/60 bg-white/70 backdrop-blur-sm group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-red-200 to-amber-100 flex items-center justify-center mx-auto group-hover:scale-125 transition-transform duration-300 shadow-md">
                <Zap className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">✨ Smart Feed</h3>
              <p className="text-sm text-gray-800">
                Discover trending posts, follow people, explore hashtags, and enjoy personalized content made just for you.
              </p>
            </CardContent>
          </Card>

          {/* Feature 4 */}
          <Card className="hover:shadow-xl transition-shadow border-red-200/60 bg-white/70 backdrop-blur-sm group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-red-200 to-amber-100 flex items-center justify-center mx-auto group-hover:scale-125 transition-transform duration-300 shadow-md">
                <User className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">👤 Build Your Profile</h3>
              <p className="text-sm text-gray-800">
                Craft your digital identity — Set your profile, add a bio, track followers and showcase your personality.
              </p>
            </CardContent>
          </Card>

          {/* Feature 5 */}
          <Card className="hover:shadow-xl transition-shadow border-red-200/60 bg-white/70 backdrop-blur-sm group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-red-200 to-amber-100 flex items-center justify-center mx-auto group-hover:scale-125 transition-transform duration-300 shadow-md">
                <Bell className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">🔔 Notifications</h3>
              <p className="text-sm text-gray-800">
                Stay updated with likes, comments, follows, and messages — all in real-time.
              </p>
            </CardContent>
          </Card>

          {/* Feature 6 */}
          <Card className="hover:shadow-xl transition-shadow border-red-200/60 bg-white/70 backdrop-blur-sm group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-red-200 to-amber-100 flex items-center justify-center mx-auto group-hover:scale-125 transition-transform duration-300 shadow-md">
                <Lock className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">⚡ Secure & Fast</h3>
              <p className="text-sm text-gray-800">
                Powered by MERN + MongoDB with advanced security — smooth, safe, and reliable experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/70 backdrop-blur-sm border border-red-200/60 rounded-3xl p-12 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xl text-gray-800 font-medium mb-6">
                "This platform helped me connect with professionals and friends in the easiest way possible! Amazing UI and great features."
              </p>
              <p className="text-lg font-bold text-gray-900">Riya Sharma</p>
              <p className="text-sm text-gray-600">Verified User</p>
            </div>
          </div>
        </div>
      </div>

      {/* Who's It For Section */}
      <div className="container max-w-7xl mx-auto px-4 py-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">🤝 Who's It For?</h2>
          <p className="text-xl text-gray-800 font-medium max-w-2xl mx-auto">
            A modern social space for everyone
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { icon: "📸", title: "Creators", desc: "Share your artistic work and grow your audience" },
            { icon: "💼", title: "Professionals", desc: "Build your professional network and brand" },
            { icon: "🧑‍🤝‍🧑", title: "Friends & Community", desc: "Stay connected with people you care about" },
            { icon: "🚀", title: "Influencers", desc: "Engage with followers and build influence" },
            { icon: "✍️", title: "Bloggers", desc: "Share stories and connect with readers" },
          ].map((item, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow border-red-200/60 bg-white/70 backdrop-blur-sm text-center">
              <CardContent className="pt-8 space-y-4">
                <div className="text-4xl">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-800">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Security Section */}
      <div className="container max-w-7xl mx-auto px-4 py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-red-600 via-red-500 to-red-700 rounded-3xl p-16 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-6">🔐 Your Privacy Matters.</h2>
            <div className="space-y-4 text-white text-lg">
              <p>✅ End-to-end secure authentication</p>
              <p>✅ Protected media storage</p>
              <p>✅ Encrypted personal data</p>
              <p>✅ Strict access control</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="container max-w-7xl mx-auto px-4 py-24 relative z-10">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-red-600 via-red-500 to-red-700 border border-red-600 p-16 md:p-24 shadow-2xl">
          <div className="absolute inset-0 opacity-30">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <defs>
                <pattern id="final-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#final-pattern)" />
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-400/20 rounded-full blur-3xl -z-10"></div>
          
          <div className="text-center space-y-8 relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white">🌟 Join thousands of users building their digital social space.</h2>
            <p className="text-xl text-red-100">
              It takes less than 30 seconds to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => (window.location.href = "/")}
                className="text-base font-semibold px-10 h-14 bg-white hover:bg-gray-100 text-red-600 transition-colors"
              >
                👉 Create Account — It's Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                className="text-base font-semibold px-10 h-14 border-white text-white hover:bg-white/10"
              >
                👉 Explore Features
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-red-200/60 py-12 relative z-10 bg-white/40 backdrop-blur-sm">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center space-y-2 text-gray-800">
            <p className="font-semibold text-gray-900">© 2024 Socialgram</p>
            <p className="text-sm">Connect. Share. Grow. Your Digital Social World.</p>
            <p className="text-xs mt-4">Open source • Privacy first • Always free</p>
          </div>
        </div>
      </div>
    </div>
  );
}
