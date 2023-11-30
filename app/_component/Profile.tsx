"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();
  return (
    <>
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              {session?.user?.name && session.user.image && (
                <AvatarImage
                  src={session?.user?.image}
                  alt={session?.user?.name}
                />
              )}
              <AvatarFallback>{session?.user?.name}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{session?.user?.email}</DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                variant={"destructive"}
                size={"sm"}
                className="w-full"
                onClick={() => {
                  signOut({ callbackUrl: "/login" });
                  localStorage.removeItem("shoppingCartState");
                }}
              >
                <LogOut /> Sign out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">
                <User />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Login to continue</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};

export default Profile;
