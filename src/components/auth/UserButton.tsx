"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AvatarIcon, ExitIcon } from "@radix-ui/react-icons";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import LogoutButton from "./LogoutButton";

type Props = {};

const UserButton = (props: Props) => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            {/* <AvatarIcon className="w-8 h-8 text-white" /> */}
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
