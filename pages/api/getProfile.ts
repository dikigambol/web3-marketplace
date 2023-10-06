import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "@/lib/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const username = req.query.username;
    const db = await getDatabase(process.env.MONGODB_DBNAME);
    const collection = db.collection("users");
    try {
        const data = await collection.findOne({ username: username });
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(200).json({ notfound: "not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
}
