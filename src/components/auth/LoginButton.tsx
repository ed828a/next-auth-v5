"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import LoginForm from "./LoginForm";

type Props = {
  children: ReactNode;
  mode?: "redirect" | "modal";
  asChild?: boolean;
};

const LoginButton = ({ children, mode = "redirect", asChild }: Props) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LoginButton;
