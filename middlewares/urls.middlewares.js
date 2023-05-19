import { db } from "../database/database.connection.js";

export async function shortUrlValidation(req, res, next) {
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

        res.locals.result = result;

        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function openUrlValidation(req, res, next) {
    const { shortUrl } = req.params;
    try {
        const linkResult = await db.query(
            `SELECT "url", "linkId" 
             FROM links 
             WHERE "shortCode" = $1`,
            [shortUrl]
        );

        if (linkResult.rows.length === 0) {
            return res.status(404).send("URL encurtada não encontrada");
        }

        res.locals.linkResult = linkResult;

        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
}