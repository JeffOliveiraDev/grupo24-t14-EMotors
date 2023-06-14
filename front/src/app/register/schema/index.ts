import z, { number } from "zod";

const registeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(50),
  email: z.string().email({ message: "required email" }).max(50),
  cpf: z
    .string()
    .min(11)
    .max(14)
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
  telephone: z
    .string()
    .min(13)
    .regex(/^(\d{2})(\d{8})$/)
    .refine((value) => {
      return value.replace(/\D/g, "").length >= 10;
    }, "Número de telefone inválido"),
  birthdate: z.date(),
  description: z.string().max(250).optional(),
  password: z.string().min(8).max(200),
  acoountType: z.string(),
  cep: z
    .string()
    .regex(/^\d{5}-?\d{3}$/)
    .min(8)
    .max(9),
  rua: z.string().max(200),
  city: z.string().min(5).max(200),
  state: z.string().min(1).max(50),
  number: z.number(),
  complement: z.string(),
});

const registeSchemaComplet = registeSchema
  .extend({
    confirmPassword: z.string().nonempty("As senhas precisam ser iguais"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

export { registeSchema, registeSchemaComplet };
