import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function postUrl(req, res) {
    const { url } = req.body;
    if (!url) return res.status(422).send('Campo "url" é obrigatório');

    const shortUrl = nanoid();

    try {
        const session = res.locals.session;
        const userId = session.userId;

        const result = await db.query(
            `INSERT INTO links 
             ("url", "shortCode", "userId") 
             VALUES ($1, $2, $3)
             RETURNING "linkId"`,
            [url, shortUrl, userId]
        );

        const linkId = result.rows[0].linkId;

        res.status(201).send({ id: linkId, shortUrl: shortUrl });
    } catch (err) {
        res.status(500).send('Erro ao salvar a URL');
    }
}


export async function getUrl(req, res) {
    const id = req.params.id;

    try {
        const result = await db.query(
            `SELECT "linkId", "shortCode", "url" 
             FROM links 
             WHERE "linkId" = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send("URL encurtada não encontrada");
        }

        const { linkId, shortCode, url } = result.rows[0];
        res.status(200).send({ id: linkId, shortUrl: shortCode, url });
    } catch (err) {
        res.status(500).send("Erro ao obter a URL encurtada");
    }
}