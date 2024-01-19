import NewVerificationForm from "@/components/auth/NewVerificationForm";
import NewVerificationForm2 from "@/components/auth/NewVerificationForm2";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";
import React from "react";

type Props = {
  searchParams: { token: string };
};

const NewVerificationPage = async ({ searchParams: { token } }: Props) => {
  const existingToken = await getVerificationTokenByToken(token);

  let message: string = "";
  let success: boolean = false;

  if (!existingToken) {
    message = "Verification failed, try register again.";
  } else {
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
      // remove expired token
      await db.verificationToken.delete({
        where: { id: existingToken.id },
      });

      message = "Token has expired!";
    } else {
      const existingUser = await getUserByEmail(existingToken.email);
      if (!existingUser) {
        message = "Email does not exist!";
      } else {
        await db.user.update({
          where: { id: existingUser.id },
          data: {
            emailVerified: new Date(),
            email: existingToken.email, // for users change their email
          },
        });

        await db.verificationToken.delete({
          where: { id: existingToken.id },
        });

        message = "Email verified!";
        success = true;
      }
    }
  }

  return (
    <div>
      <NewVerificationForm2 message={message} success={success} />
    </div>
  );
};

export default NewVerificationPage;
