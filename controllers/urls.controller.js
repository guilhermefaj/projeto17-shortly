import dayjs from "dayjs";
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
    try {
        const result = res.locals.result;

        const { linkId, shortCode, url } = result.rows[0];
        res.status(200).send({ id: linkId, shortUrl: shortCode, url });
    } catch (err) {
        res.status(500).send("Erro ao obter a URL encurtada");
    }
}


export async function openUrl(req, res) {
    try {
        const linkResult = res.locals.linkResult;

        const { url } = linkResult.rows[0];

        const clickDate = dayjs().format('YYYY-MM-DD')
        const { linkId } = linkResult.rows[0];
        const ipAddress = req.ip;
        const referer = req.headers.referer;

        await db.query(
            `INSERT INTO clicks 
             ("linkId", "clickDate", "ipAddress", "referer")
             VALUES ($1, $2, $3, $4)`,
            [linkId, clickDate, ipAddress, referer]
        );

        res.redirect(301, url);
    } catch (err) {
        res.status(500).send("Erro ao abrir a URL encurtada");
    }
}


export async function deleteUrl(req, res) {
    const { id } = req.params;
    const userId = res.locals.session.userId;

    try {
        const result = res.locals.result;

        const { userId: linkUserId } = result.rows[0];

        if (linkUserId !== userId) {
            return res.status(401).send("A URL encurtada não pertence ao usuário");
        }

        await db.query(
            `DELETE FROM links 
             WHERE "linkId" = $1`,
            [id]
        );

        res.status(204).end();
    } catch (err) {
        res.status(500).send("Erro ao excluir a URL encurtada");
    }
}
