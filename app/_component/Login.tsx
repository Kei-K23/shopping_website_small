"use client";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="flex justify-center flex-col items-center mt-8 gap-3">
      <Button onClick={() => signIn("github", { callbackUrl: "/" })}>
        <LogIn /> Sign in with Github
      </Button>
      <Button onClick={() => signIn("google", { callbackUrl: "/" })}>
        <LogIn /> Sign in with Google
      </Button>
    </div>
  );
};

export default Login;
