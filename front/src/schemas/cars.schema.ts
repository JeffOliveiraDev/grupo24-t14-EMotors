import z from "zod";

export const carSchema = z.object({
  id: z.string(),
  name: z.string(),
  brand: z.string(),
  year: z.string(),
  fuel: z.number(),
  value: z.number(),
});

export type CarData = z.infer<typeof carSchema>;
