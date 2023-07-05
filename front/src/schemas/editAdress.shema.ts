import z from "zod";

export const EditAdressSchema = z.object({
  cep: z.string(),
  estado: z.string(),
  cidade: z.string(),
  rua: z.string(),
  numero: z.string(),
  complemento: z.string(),
});

export type EditAdressData = z.infer<typeof EditAdressSchema>;
