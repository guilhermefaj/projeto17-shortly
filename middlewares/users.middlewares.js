import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export async function SignUpEmailValidation(req, res, next) {
    const { email } = req.body;
    try {
        const checkEmail = (await db.query(`SELECT * FROM users WHERE email = $1;`, [email]));
        const user = checkEmail.rows[0];
        if (user) return res.status(409).send("O e-mail já foi cadastrado");

        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function SignInEmailValidation(req, res, next) {
    const { email } = req.body;
    try {
        const checkEmail = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        const user = checkEmail.rows[0];
        if (!user) return res.status(401).send("O e-mail não está cadastrado");

        res.locals.user = user;

        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function passwordValidation(req, res, next) {
    const password = req.body.password;
    const user = res.locals.user;

    try {
        const passwordCorrect = bcrypt.compareSync(password, user.password);
        if (!passwordCorrect) return res.status(401).send("Senha incorreta");

        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
}