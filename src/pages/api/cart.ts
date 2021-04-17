import { NextApiRequest, NextApiResponse } from "next";

import { query as q } from "faunadb";
import { FaunaCollectioData, FaunaStock, StockIndex } from "../../@Types";
import { fauncaClient } from "../../services/fauna";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { productID } = req.body;
    try {
      const stock = await fauncaClient.query<FaunaCollectioData<FaunaStock>>(
        q.Get(q.Match(q.Index(StockIndex.id), productID))
      );

      res.json(stock.data);
    } catch (error) {
      console.log(error.mensagem);
    }
  } else {
    res.setHeader("allow", "POST");
    res.status(405).end("Method not allowed");
  }
}
