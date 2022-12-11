const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  const transformedItems = items.map((item) => ({
    price_data: {
      currency: "INR",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
        description: item.description,
      },
    },
    quantity: 1,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: transformedItems,
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 6000, currency: "inr" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 2 },
            maximum: { unit: "business_day", value: 4 },
          },
        },
      },
    ],
    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA", "IN"],
    },

    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  res.status(200).json({ id: session.id });
};
