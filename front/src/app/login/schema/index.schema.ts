import { z } from "zod";

const SchemaLogin = z.object({
  email: z.string().email({ message: "required email" }),
  password: z
    .string()
    .min(8, { message: "minimum 8 characters" })
    .max(200, { message: "max 200 characters" }),
});

export default SchemaLogin;
