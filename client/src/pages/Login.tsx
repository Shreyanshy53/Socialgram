import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { queryClient } from "@/lib/queryClient";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    try {
      console.log("Submitting login with:", data);
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const responseData = await response.json();
      console.log("Login response:", responseData);

      if (!response.ok) {
        toast({ title: "Error", description: responseData.message || "Login failed", variant: "destructive" });
        return;
      }

      toast({ title: "Success", description: "Logged in successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      setLocation("/");
    } catch (error) {
      console.error("Login error:", error);
      toast({ title: "Error", description: "Login failed - " + (error as Error).message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-amber-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} data-testid="input-password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600" 
                disabled={isLoading}
                data-testid="button-submit"
              >
                {isLoading ? "Signing in..." : "Sign In"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <button
              onClick={() => setLocation("/signup")}
              className="text-red-600 hover:underline font-semibold"
              data-testid="link-signup"
            >
              Sign up
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
