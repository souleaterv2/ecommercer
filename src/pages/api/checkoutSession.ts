import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { query as q } from "faunadb";

import { fauncaClient } from "../../services/fauna";
import {
  FaunaCollectioData,
  FaunaCollections,
  FaunaUser,
  UserIndex,
} from "../../@Types";
import { stripe } from "../../services/stripe";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    const { user } = await getSession({ req });
    const { checkout } = req.body;

    const { line_items, discounts } = checkout;

    const faunaUser = await fauncaClient.query<FaunaCollectioData<FaunaUser>>(
      q.Get(q.Match(q.Index(UserIndex.email), q.Casefold(user.email)))
    );

    let customerID = faunaUser.data.stripe_customer_id;

    if (!customerID) {
      const stripeCustomer = await stripe.customers.create({
        email: user.email,
      });

      await fauncaClient.query(
        q.Update(
          q.Ref(q.Collection(FaunaCollections.users), faunaUser.ref.id),
          {
            data: {
              stripe_customer_id: stripeCustomer.id,
            },
          }
        )
      );

      customerID = stripeCustomer.id;
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerID,
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      line_items,
      mode: "payment",
      allow_promotion_codes: true,
      discounts,
      success_url: process.env.STRIPE_SUCCES_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return res.json({ sessionId: checkoutSession.id });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
}
