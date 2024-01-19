// this is used in [...nextauth]/route.ts
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface User {
    role: UserRole;
  }

  interface Session {}
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db), // prisma-adapter is non-edge supported adapter.
  session: { strategy: "jwt" }, // prisma can not use database strategy
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      console.log("linkAccount event called");
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }, // this can't be boolean for furture check.
      });
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      console.log("callback signIn", { user, account });

      // todo: add a check if the provider is one of my settings in authConfig.

      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      // Prevent sign in without email verification
      if (user.id) {
        const existingUser = await getUserById(user.id);
        if (!existingUser || !existingUser.emailVerified) {
          return false;
        }
      }

      // todo: Add 2FA check

      return true;
    },
    async jwt({ token, user }) {
      console.log({ token, user }); // token.sub is the user.id

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },

    //@ts-expect-error
    async session({ session, token }) {
      console.log({ session, token });

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },
  debug: false,
});

/**
 * signIn, signOut can use in server component and server action
 */
