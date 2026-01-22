/**
 * Modern Logic:
 * Hum database ki base price (jo $ mein hai) ko 45 se multiply karenge.
 * Isse $100 wala hotel ₹4,500 ka dikhega, jo bilkul realistic hai.
 */

const MULTIPLIER = 45; // Aap ise 40-50 ke beech kuch bhi rakh sakte hain

// 1. Ye function "₹ 4,500" jaisa sundar text bana kar dega
export const formatPrice = (basePrice) => {
  if (!basePrice) return "₹ 0";

  const finalAmount = basePrice * MULTIPLIER;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0, // Paise (.00) nahi dikhayega, clean lagega
  }).format(finalAmount);
};

// 2. Ye function sirf number dega (Razorpay ke liye)
export const getRawPrice = (basePrice) => {
  return basePrice * MULTIPLIER;
};
