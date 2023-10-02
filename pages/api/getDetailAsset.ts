import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "@/lib/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const unitId = req.query.unitId;

    const db = await getDatabase(process.env.MONGODB_DBNAME);
    const collection = db.collection("listings");

    try {
        const data = await collection.findOne({ unit: unitId });

        if (data) {
            res.status(200).json(data);
        } else {
            res.status(200).json({ notfound: "not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
}
