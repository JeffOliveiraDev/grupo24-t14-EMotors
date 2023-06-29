import z from "zod";

export const EditUserSchema = z.object({
  nome: z.string(),
  email: z.string(),
  cpf: z.string(),
  celular: z.string(),
  dataDeNascimento: z.string(),
  descrição: z.string(),
});

export type EditUserData = z.infer<typeof EditUserSchema>;
