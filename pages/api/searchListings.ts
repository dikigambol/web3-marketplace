import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const nameAsset = req.query.nameAsset;

  const db = await getDatabase(process.env.MONGODB_DBNAME);
  const collection = db.collection("listings");

  let data = await collection
    .find({ "metadata.name": { $regex: nameAsset, $options: "i" } })
    .toArray();

  data = data.map((item) => {
    item.unit = item.unit;
    return item;
  });

  res.status(200).json(data);
}
