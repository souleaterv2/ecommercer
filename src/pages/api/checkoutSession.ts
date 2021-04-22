import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import { fauncaClient } from "../../services/fauna";

import { stripe } from "../../services/stripe";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    const { user } = await getSession({ req });

    const { line_items, discounts } = req.body;

    let customerID = "rodrigo";

    if (!customerID) {
      const stripeCustomer = await stripe.customers.create({
        email: user.email,
      });

      customerID = stripeCustomer.id;
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerID,
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      line_items,
      mode: "payment",
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
