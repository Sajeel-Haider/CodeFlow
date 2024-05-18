import React, { useState } from "react";
import axios from "axios";

const Payment = () => {
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvc: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/payment`,
        formData
      );
      console.log(response.data.message);
      alert("Payment successful!"); // Replace with a more suitable response handling
    } catch (error) {
      console.error("Payment error:", error.response.data.error);
      alert("Payment failed!"); // Replace with a more suitable response handling
    }
  };

  return (
    <div className="h-screen">
      {" "}
      <div className=" max-w-md mx-auto mt-10  bg-black text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-lg font-semibold mb-4">Enter Payment Details</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 bg-black text-white">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className=" bg-black text-white mt-1 block w-full px-3 py-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-sm font-medium ">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
              className=" bg-black text-white mt-1 block w-full px-3 py-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label htmlFor="expMonth" className="block text-sm font-medium ">
                Exp Month
              </label>
              <input
                type="text"
                id="expMonth"
                name="expMonth"
                value={formData.expMonth}
                onChange={handleChange}
                required
                className=" bg-black text-white mt-1 block w-full px-3 py-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="expYear" className="block text-sm font-medium ">
                Exp Year
              </label>
              <input
                type="text"
                id="expYear"
                name="expYear"
                value={formData.expYear}
                onChange={handleChange}
                required
                className=" bg-black text-white mt-1 block w-full px-3 py-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="cvc" className="block text-sm font-medium ">
                CVC
              </label>
              <input
                type="text"
                id="cvc"
                name="cvc"
                value={formData.cvc}
                onChange={handleChange}
                required
                className="  bg-black text-white mt-1 block w-full px-3 py-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium ">
              Amount (USD)
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="  bg-black text-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary_color hover:bg-secondary_color text-white font-bold py-2 px-4 rounded"
          >
            Submit Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
