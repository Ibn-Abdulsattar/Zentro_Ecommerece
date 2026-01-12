import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const success_url = `${process.env.FRONTEND_URL}/success`;
const cancel_url = `${process.env.FRONTEND_URL}/cancel`;

// Checkout Session
export const createStripeCheckoutSession = async (req, res) => {
 const { cartItems } = req.body;

  const lineItems = cartItems.map((item) => {
    const imagesArray = Array.isArray(item.image) ? item.image : item.image ? [item.image] : [];
    
    return {
      price_data: {
        product_data: {
          name: item.name,
          images: imagesArray,
        },
        currency: "usd",
        unit_amount: item.price * 100, 
      },
      quantity: item.quantity, 
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: success_url,
    cancel_url: cancel_url,
  });

  res.status(200).send({
    message: "Stripe session created successfully",
    sessionId: session.id,
    url: session.url,
  });
};


//  Stripe Webhook
export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      console.log(" Payment completed:", session.id);
      break;

    case "checkout.session.expired":
      const expired = event.data.object;

      console.log("Payment expired:", expired.id);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

