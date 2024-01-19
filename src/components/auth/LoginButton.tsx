"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

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
    return <span>Todo: Implement modal</span>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LoginButton;
