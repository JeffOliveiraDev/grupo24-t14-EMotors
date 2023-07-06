import z from "zod";

export const EditAdressSchema = z.object({
  cep: z.string(),
  state: z.string(),
  city: z.string(),
  street: z.string(),
  homeNumber: z.string(),
  reference: z.string(),
});

export type EditAdressData = z.infer<typeof EditAdressSchema>;
