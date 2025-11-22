import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Home, 
  Compass, 
  MessageCircle, 
  Bell, 
  PlusSquare,
  Search,
  LogOut
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { NotificationWithDetails } from "@shared/schema";
import { useState } from "react";

export default function Navbar({ onCreatePost }: { onCreatePost: () => void }) {
  const { user } = useAuth();
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: notifications = [] } = useQuery<NotificationWithDetails[]>({
    queryKey: ["/api/notifications"],
    enabled: !!user,
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/explore?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const getInitials = (firstName?: string | null, lastName?: string | null) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase() || "U";
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/">
          <a className="text-xl font-bold" data-testid="link-home">
            Socialgram
          </a>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="hidden md:block flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users and posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search"
            />
          </div>
        </form>

        {/* Navigation Icons */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className={location === "/" ? "bg-accent" : ""}
              data-testid="button-nav-home"
            >
              <Home className="h-6 w-6" />
            </Button>
          </Link>

          <Link href="/explore">
            <Button
              variant="ghost"
              size="icon"
              className={location === "/explore" ? "bg-accent" : ""}
              data-testid="button-nav-explore"
            >
              <Compass className="h-6 w-6" />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={onCreatePost}
            data-testid="button-create-post"
          >
            <PlusSquare className="h-6 w-6" />
          </Button>

          <Link href="/messages">
            <Button
              variant="ghost"
              size="icon"
              className={location === "/messages" ? "bg-accent" : ""}
              data-testid="button-nav-messages"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </Link>

          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" data-testid="button-notifications">
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2">
                <h3 className="font-semibold mb-2">Notifications</h3>
                {notifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4 text-center">
                    No notifications yet
                  </p>
                ) : (
                  <div className="space-y-1 max-h-96 overflow-y-auto">
                    {notifications.slice(0, 10).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-2 rounded-md text-sm ${
                          !notification.read ? "bg-accent" : ""
                        }`}
                        data-testid={`notification-${notification.id}`}
                      >
                        <div className="flex items-start gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={notification.actor.profileImageUrl || undefined} />
                            <AvatarFallback>
                              {getInitials(notification.actor.firstName, notification.actor.lastName)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p>
                              <span className="font-semibold">
                                {notification.actor.firstName} {notification.actor.lastName}
                              </span>{" "}
                              {notification.type === "like" && "liked your post"}
                              {notification.type === "comment" && "commented on your post"}
                              {notification.type === "follow" && "started following you"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(notification.createdAt!).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full" data-testid="button-profile-menu">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.profileImageUrl || undefined} />
                  <AvatarFallback>
                    {getInitials(user?.firstName, user?.lastName)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/profile/${user?.id}`}>
                <DropdownMenuItem data-testid="menu-profile">Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => (window.location.href = "/api/logout")}
                data-testid="menu-logout"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
