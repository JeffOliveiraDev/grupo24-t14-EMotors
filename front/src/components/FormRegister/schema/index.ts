import z from "zod";

const registeSchemaComplet = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, { message: "O nome deve ter pelo menos 1 caractere" })
    .max(50, { message: "O nome deve ter no máximo 50 caracteres" }),
  email: z
    .string()
    .email({ message: "E-mail inválido" })
    .max(50, { message: "O e-mail deve ter no máximo 50 caracteres" }),
  cpf: z
    .string()
    .min(11, { message: "O CPF deve ter 11 dígitos" })
    .max(14, { message: "O CPF deve ter no máximo 14 dígitos" })
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: "CPF inválido" })
    .transform((value: string) => value.replace(/[-.()]/g, "")),
  telephone: z
    .string()
    .min(11, { message: "O telefone deve ter 11 dígitos" })
    .transform((value: string) => value.replace(/[-.()]/g, "")),
  birthDate: z
    .string()
    .nonempty("Data de nascimento é obrigatória")
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, { message: "Data de nascimento inválida" })
    .superRefine((value, ctx) => {
      const date = new Date(value);
      const now = new Date();
      if (
        date.getFullYear() > now.getFullYear() ||
        date.getDate() > 31 ||
        date.getMonth() > 11
      ) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Data de nascimento inválida",
        });
      }

      if (now.getFullYear() - date.getFullYear() < 18) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Apenas maiores de idade são permitidos",
        });
      }

      return value;
    }),
  description: z
    .string()
    .max(250, { message: "A descrição deve ter no máximo 250 caracteres" })
    .optional(),
  accountType: z.string().nullable().default("comprador").optional(),
  cep: z
    .string()
    .min(8, { message: "O CEP deve ter no mínimo 8 dígitos" })
    .max(9, { message: "O CEP deve ter no máximo 9 dígitos" })
    .transform((value: string) => value.replace(/[-.()/]/g, "")),
  street: z
    .string()
    .max(200, { message: "O nome da rua deve ter no máximo 200 caracteres" })
    .nonempty(),
  city: z
    .string()
    .min(5, { message: "A cidade deve ter no mínimo 5 caracteres" })
    .max(200, { message: "A cidade deve ter no máximo 200 caracteres" }),
  state: z
    .string()
    .min(2, { message: "O estado deve ser informado" })
    .max(50, { message: "O estado deve ter no máximo 50 caracteres" }),
  homeNumber: z
    .string()
    .nonempty({ message: "O número residencial é obrigatório" }),
  reference: z.string().optional(),
  confirmPassword: z.string().nonempty({ message: "Esse campo é obrigatório" }),
  password: z.string().min(8).max(200),
});

export { registeSchemaComplet };
