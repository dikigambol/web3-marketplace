import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "@/lib/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const newUser = req.body.newUser;

    const db = await getDatabase(process.env.MONGODB_DBNAME);
    const collection = db.collection("users");

    let data = await collection.insertOne(newUser);

    res.status(200).json({ data: data });
}