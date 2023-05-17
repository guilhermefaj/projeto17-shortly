import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
    const { name, email, password } = req.body;

    try {
        const hash = bcrypt.hashSync(password, 10);

        await db.query(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
            [name, email, hash]
        );

        res.status(201).send("Conta criada com sucesso");
    } catch (err) {
        res.status(500).send(err.message);
    }
}



export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = res.locals.user;

        const passwordCorrect = bcrypt.compareSync(password, user.password);
        if (!passwordCorrect) return res.status(401).send("Senha incorreta");

        const token = uuid();

        await db.query(
            `INSERT INTO sessions (token, "userId")
            VALUES ($1, $2)
            ON CONFLICT ("userId")
            DO UPDATE SET token = EXCLUDED.token;
            `,
            [token, user.userId]
        );

        res.send({
            name: user.name,
            userId: user.userId,
            email: user.email,
            token
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
}
