import { db } from "../database/database.connection.js";

export async function authValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.status(401).send("Token não encontrado");

    try {
        const auth = await db.query("SELECT * FROM sessoes WHERE token = $1"
            , [token]);

        const session = auth.rows[0];

        if (!session) return res.status(401).send("Token inválido");

        res.locals.session = session;

        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
}
