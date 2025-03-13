import { z } from "zod";

export const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export type SignupValues = z.infer<typeof signupSchema>;
