"use client";

import UserInfo from "@/components/auth/UserInfo";
import { useCurrentUser } from "@/hooks/use-current-user";

type Props = {};

const ClientComponent = (props: Props) => {
  const user = useCurrentUser();
  return (
    <div>
      <div>
        <UserInfo user={user} label="📲 Client component" />
      </div>
    </div>
  );
};

export default ClientComponent;
