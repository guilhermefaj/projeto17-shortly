import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";
import dayjs from "dayjs";

export async function postUrl(req, res) {
    const { url } = req.body;
    if (!url) return res.status(422).send('Campo "url" é obrigatório');

    const shortUrl = nanoid();

    try {
        const todayDate = dayjs().format("YYYY-MM-DD");
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
