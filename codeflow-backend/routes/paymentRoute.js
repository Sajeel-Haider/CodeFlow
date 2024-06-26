const express = require("express");
const router = express.Router();
const db = require("../database/connectPostgresDb");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/payment", async (req, res) => {
  const { email, cardNumber, expMonth, expYear, cvc, amount } = req.body;

  const paymentMethod = await stripe.paymentMethods.create({
    type: "card",
    card: {
      number: cardNumber,
      exp_month: expMonth,
      exp_year: expYear,
      cvc: cvc,
    },
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method: paymentMethod.id,
    confirm: true,
  });

  const currentDate = new Date();
  const premiumStartDate = currentDate.toISOString();
  const premiumEndDate = new Date(
    currentDate.setFullYear(currentDate.getFullYear() + 1)
  ).toISOString();

  await db.query(
    "UPDATE users SET is_premium = $1, premium_start_date = $2, premium_end_date = $3 WHERE email = $4",
    [true, premiumStartDate, premiumEndDate, email]
  );

  res.status(200).send({ message: "Payment successful and premium activated" });
});

module.exports = router;
