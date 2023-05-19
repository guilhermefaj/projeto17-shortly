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
    const { email } = req.body;

    try {
        const user = res.locals.user;

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

export async function getUserProfile(req, res) {
    const userId = res.locals.session.userId;

    try {
        const userResult = await db.query(
            `SELECT "userId", "name"
            FROM users
            WHERE "userId" = $1`,
            [userId]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).send("Usuário não encontrado");
        }

        const { userId: id, name } = userResult.rows[0];

        const visitCountResult = await db.query(
            `SELECT links."linkId", COUNT(clicks."clickId") AS total_visits
             FROM links
             LEFT JOIN clicks ON links."linkId" = clicks."linkId"
             WHERE links."userId" = $1
             GROUP BY links."linkId"`,
            [userId]
        );

        const totalVisits = visitCountResult.rows[0].total_visits || 0;

        const linksResult = await db.query(
            `SELECT "links"."linkId", "links"."shortCode", "links"."url", COUNT("clicks") AS "link_visits"
            FROM "links"
            LEFT JOIN "clicks" ON "links"."linkId" = "clicks"."linkId"
            WHERE "links"."userId" = $1
            GROUP BY "links"."linkId", "links"."shortCode", "links"."url";`,
            [userId]
        );

        const shortenedUrls = linksResult.rows.map((row) => ({
            id: row.linkId,
            shortUrl: row.shortCode,
            url: row.url,
            visitCount: row.link_visits || 0,
        }));

        const userProfile = {
            id,
            name,
            visitCount: totalVisits,
            shortenedUrls,
        };

        res.status(200).send(userProfile);
    } catch (err) {
        res.status(500).send("Erro ao obter o perfil do usuário");
    }
}

