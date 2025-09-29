// src/lib/db.ts
export async function saveOrderToDB(order: {
  orderID: string;
  payerEmail: string;
  productHandle: string;
}) {
  console.log("✅ Saving order to DB:", order);

  // Simulasi simpan ke DB (ganti dengan real logic lo)
  return true;
}

