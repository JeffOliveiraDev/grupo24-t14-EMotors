import z from "zod";

const commentSchema = z.object({
  text: z
    .string()
    .min(1, { message: "O text deve ter pelo menos 1 caractere" })
    .max(250, { message: "O text deve ter no máximo 250 caracteres" }),
});

export default commentSchema;
