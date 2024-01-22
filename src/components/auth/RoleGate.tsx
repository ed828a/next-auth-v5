import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import React, { ReactNode } from "react";
import FormError from "../share/FormError";

type Props = {
  children: ReactNode;
  allowedRole: UserRole;
};

const RoleGate = ({ children, allowedRole }: Props) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message="You don't have permission to view this content!" />
    );
  }

  return <div>{children}</div>;
};

export default RoleGate;
