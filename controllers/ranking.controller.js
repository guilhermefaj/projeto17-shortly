import { db } from "../database/database.connection.js";

export async function getRanking(req, res) {
    try {
        const result = await db.query(
            `SELECT "users"."userId" AS "id", "users"."name", COUNT("links"."linkId") AS "linksCount", COALESCE(SUM(1), 0) AS "visitCount"
            FROM "users"
            LEFT JOIN "links" ON "users"."userId" = "links"."userId"
            LEFT JOIN "clicks" ON "links"."linkId" = "clicks"."linkId"
            GROUP BY "users"."userId", "users"."name"
            ORDER BY "visitCount" DESC
            LIMIT 10;`
        );

        const ranking = result.rows.map((row) => ({
            id: row.id,
            name: row.name,
            linksCount: row.linksCount,
            visitCount: row.visitCount,
        }));

        res.status(200).json(ranking);
    } catch (err) {
        res.status(500).send("Erro ao obter o ranking");
    }
}
