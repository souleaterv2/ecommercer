import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from "faunadb";

import { fauncaClient } from "../../services/fauna";
import { stripe } from "../../services/stripe";
import { CouponIndex, FaunaCollectioData, FaunaCoupon } from "../../@Types";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { coupon } = req.body;

    let couponId = null;

    try {
      const response = await fauncaClient.query<
        FaunaCollectioData<FaunaCoupon>
      >(q.Get(q.Match(q.Index(CouponIndex.name), coupon)));

      couponId = response.data.id;
    } catch {
      res.status(404).end("Coupon not cadastred on database");
    }

    try {
      const stripeCoupon = await stripe.coupons.retrieve(couponId);

      res.json({ stripeCoupon });
    } catch (error) {
      console.log(error);
      res.status(404).end("Coupon invalid");
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
}
