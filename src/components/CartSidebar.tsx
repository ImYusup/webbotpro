// src/components/CartSidebar.ts
"use client";

import { useCart, CartItem } from "@/lib/cart-store";

export default function CartSidebar() {
    const { items, removeItem, clearCart, showCart, setShowCart } = useCart();

    if (!showCart) return null;

    const checkout = async () => {
        try {
            const payload = {
                items: items.map((i: CartItem) => ({
                    handle: i.variantId,
                    quantity: i.quantity,
                })),
            };

            console.log("🛒 Checkout payload:", payload);

            // ✅ Step 1: Fetch private access token (pake runtime config atau hardcode sementara)
            const tokenRes = await fetch("/api/private_access_tokens?id=70c3ac4", { // Sesuaikan ID
                method: "GET",
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_INTERNAL_ACCESS_TOKEN || "dev-test"}`,
                },
            });

            if (!tokenRes.ok) {
                const errorText = await tokenRes.text();
                console.error("❌ Token fetch failed:", { status: tokenRes.status, error: errorText });
                return;
            }

            const tokenData = await tokenRes.json();
            console.log("🔐 Token received:", tokenData);

            // ✅ Step 2: Create cart with token
            const res = await fetch("/api/shopify/create-cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                console.error("❌ Server error:", res.status, res.statusText);
                return;
            }

            const data = await res.json();
            console.log("✅ Checkout response:", data);

            const checkoutUrl = data?.checkoutUrl;

            if (!checkoutUrl || typeof checkoutUrl !== "string") {
                console.error("❌ Missing or invalid checkoutUrl:", data);
                return;
            }

            console.log("🚀 Redirecting to:", checkoutUrl);
            window.location.href = checkoutUrl;
        } catch (err) {
            console.error("❌ Checkout failed:", err);
        }
    };

    const total = items.reduce((sum: number, i: CartItem) => sum + i.price * i.quantity, 0);

    return (
        <aside className="fixed right-0 top-0 w-[320px] h-full bg-white shadow-lg p-4 z-50">
            <button
                onClick={() => setShowCart(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                aria-label="Close cart"
            >
                ×
            </button>
            <h2 className="text-lg font-bold mb-4">Your Cart</h2>
            {items.length === 0 ? (
                <p className="text-gray-500">Cart is empty</p>
            ) : (
                <>
                    <ul className="space-y-3">
                        {items.map((item: CartItem) => (
                            <li key={item.variantId} className="flex gap-3 items-center">
                                {item.image && <img src={item.image} className="w-12 h-12 object-cover rounded" />}
                                <div className="flex-1">
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-sm text-gray-600">{item.quantity} × ${item.price}</p>
                                </div>
                                <button
                                    onClick={() => removeItem(item.variantId)}
                                    className="text-red-500 text-sm"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 border-t pt-4">
                        <p className="font-bold">Total: ${total.toFixed(2)}</p>
                        <button
                            onClick={checkout}
                            className="mt-2 w-full bg-black text-white py-2 rounded hover:opacity-90"
                        >
                            Checkout
                        </button>
                        <button
                            onClick={clearCart}
                            className="mt-2 w-full text-sm text-gray-500 hover:underline"
                        >
                            Clear Cart
                        </button>
                    </div>
                </>
            )}
        </aside>
    );
}