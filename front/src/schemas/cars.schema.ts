import { type } from "os";
import z from "zod";

export const carBrandSchema = z.object({
  id: z.string(),
  name: z.string(),
  brand: z.string(),
  year: z.string(),
  fuel: z.number(),
  value: z.number(),
});

const carSchema = z.record(
  z.array(
    z.object({
      name: z.string(),
    })
  )
);

export const registerNewAnnounceSchema = z.object({
  marca: z.string(),
  modelo: z.string(),
  ano: z.string(),
  combustivel: z.string(),
  quilometragem: z.string(),
  cor: z.string(),
  precoFipe: z.string(),
  preco: z.string(),
  descrição: z.string(),
  urlImagemCapa: z.string(),
  primeiraImagemGaleria: z.string(),
  imagensGaleria: z.array(z.string()),
});

export type RegisterNewAnnounceData = z.infer<typeof registerNewAnnounceSchema>;
export type CarData = z.infer<typeof carSchema>;
export type CarBrandData = z.infer<typeof carBrandSchema>;
