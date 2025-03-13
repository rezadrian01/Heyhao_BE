import { z } from "zod";

export const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const signinSchema = signupSchema.pick({
  email: true,
  password: true,
});

export type SigninValues = z.infer<typeof signinSchema>;
export type SignupValues = z.infer<typeof signupSchema>;
