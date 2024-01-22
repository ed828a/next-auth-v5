import { auth } from "@/auth";
import UserInfo from "@/components/auth/UserInfo";
import { currentUser } from "@/lib/auth";
import React from "react";

type Props = {};

const ServerPage = async (props: Props) => {
  const user = await currentUser();

  return (
    <div>
      <UserInfo user={user} label="💻Server component" />
    </div>
  );
};

export default ServerPage;
