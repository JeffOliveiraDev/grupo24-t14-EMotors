import z from "zod";

export const EditUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  cpf: z.string(),
  telephone: z.string(),
  birthDate: z.string(),
  description: z.string(),
});

export type EditUserData = z.infer<typeof EditUserSchema>;
