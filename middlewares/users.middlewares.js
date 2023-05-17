import { db } from "../database/database.connection.js";

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