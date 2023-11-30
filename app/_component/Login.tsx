"use client";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="flex justify-center items-center mt-8">
      <Button onClick={() => signIn("github", { callbackUrl: "/" })}>
        <LogIn /> Sign in with Github
      </Button>
    </div>
  );
};

export default Login;
