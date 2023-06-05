import { randomUUID } from "node:crypto";
import { Exclude } from "class-transformer";

export class User {
    readonly id: string;
    name: string;
    email: string;
    cpf: string;
    telephone: string;
    birthdate: Date;
    description: string;    

    @Exclude()
    password: string;

    constructor() {
        this.id = randomUUID();
    }
}
