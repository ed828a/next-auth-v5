// schemas here can be used in frontend and backend
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required." }),
  password: z.string().min(1, { message: "Password is required" }), // no need to limit the length here, should be  in register
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required." }),
  password: z.string().min(6, { message: "Minimum 6 characters required." }),
  name: z.string().min(1, { message: "Name is required" }),
});
