import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "@/lib/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const updatedUser = req.body.updatedUser;

    try {
        const db = await getDatabase(process.env.MONGODB_DBNAME);
        const collection = db.collection("users");

        let data = await collection.updateOne(
            { address: updatedUser.address },
            {
                $set: {
                    name: updatedUser.name,
                    about: updatedUser.about,
                    photo: updatedUser.photo
                }
            }
        );

        res.status(200).json({ data: data });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
