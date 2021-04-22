import { NextApiRequest, NextApiResponse } from "next";
import { firebaseClient } from "../../services/firebase-js";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { productID } = req.body;
    try {
      const response = await firebaseClient
        .getFirestore()
        .collection("products")
        .where("id", "==", productID)
        .get();
    } catch (error) {
      console.log(error.mensagem);
    }
  } else {
    res.setHeader("allow", "POST");
    res.status(405).end("Method not allowed");
  }
}
