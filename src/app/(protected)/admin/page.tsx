"use client";

import { admin } from "@/actions/admin";
import RoleGate from "@/components/auth/RoleGate";
import FormSuccess from "@/components/share/FormSuccess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

type Props = {};

const AdminPage = (props: Props) => {
  const role = useCurrentRole();
  const onServerActionClick = () => {
    admin().then((result) => {
      if (result.success) toast.success("Server Action Allowed");
      if (result.error) toast.error("Server Action Forbidden!");
    });
  };

  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed API Routes");
      } else {
        toast.error("Forbidden");
      }
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2x font-semibold text-center">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
