import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Heart, MessageCircle, Users } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="container max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Welcome to Socialgram
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your moments, connect with friends, and discover amazing content
            from people around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              onClick={() => (window.location.href = "/api/login")}
              data-testid="button-login"
            >
              Log in to Get Started
            </Button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6 text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Share Photos</h3>
              <p className="text-sm text-muted-foreground">
                Upload and share your favorite moments with beautiful images
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Like & Comment</h3>
              <p className="text-sm text-muted-foreground">
                Engage with content you love through likes and comments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Follow Friends</h3>
              <p className="text-sm text-muted-foreground">
                Connect with friends and see their latest updates in your feed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Real-time Chat</h3>
              <p className="text-sm text-muted-foreground">
                Message your friends instantly with our real-time chat system
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
