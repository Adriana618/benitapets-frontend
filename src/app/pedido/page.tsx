"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.benitapets.com";

interface CatalogProduct {
  id: string;
  name: string;
  brand: string | null;
  pet_type: string | null;
  weight_kg: number | null;
  price: number;
  image_url: string | null;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function PedidoPage() {
  const [catalog, setCatalog] = useState<CatalogProduct[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [step, setStep] = useState<"products" | "checkout" | "paying">("products");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"mercadopago" | "yape">("mercadopago");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCatalog() {
      try {
        const res = await fetch(`${API_URL}/api/products?limit=100`);
        if (res.ok) {
          const data = await res.json();
          setCatalog(data.products || []);
        }
      } catch {
        // API unavailable
      } finally {
        setCatalogLoading(false);
      }
    }
    fetchCatalog();
  }, []);

  const getProductImage = (p: CatalogProduct) => {
    if (p.image_url) return p.image_url;
    return p.pet_type === "cat" ? "/images/product-ricocat.png" : "/images/product-dogchow.png";
  };

  const addToCart = (product: CatalogProduct) => {
    const image = getProductImage(product);
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        { id: product.id, name: product.name, price: Number(product.price), quantity: 1, image },
      ];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const handleCheckout = async () => {
    if (!name || !phone || !address || !district) return;
    setLoading(true);

    try {
      // Create order with real product UUIDs
      const orderRes = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((i) => ({
            product_id: i.id,
            quantity: i.quantity,
          })),
          delivery_address: `${address}, ${district}, Arequipa`,
          payment_method: paymentMethod,
          notes: `Cliente: ${name} | Tel: ${phone}`,
        }),
      });

      if (!orderRes.ok) {
        const msg = encodeURIComponent(
          `Hola Benita Pets! Quiero pedir:\n${cart.map((i) => `- ${i.quantity}x ${i.name} (S/${i.price})`).join("\n")}\n\nTotal: S/${total.toFixed(2)}\nNombre: ${name}\nTel: ${phone}\nDireccion: ${address}, ${district}\nPago: ${paymentMethod === "mercadopago" ? "Mercado Pago" : "Yape"}`
        );
        window.open(`https://wa.me/51950326992?text=${msg}`, "_blank");
        setLoading(false);
        return;
      }

      const order = await orderRes.json();

      if (paymentMethod === "mercadopago") {
        const mpRes = await fetch(`${API_URL}/api/payments/create-preference`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id: order.order_id }),
        });

        if (mpRes.ok) {
          const mp = await mpRes.json();
          window.location.href = mp.init_point;
          return;
        }
      }

      // Fallback: WhatsApp
      const msg = encodeURIComponent(
        `Hola! Pedido #${order.order_id}\nTotal: S/${total.toFixed(2)}\nPago: ${paymentMethod === "yape" ? "Yape" : "Mercado Pago"}`
      );
      window.open(`https://wa.me/51950326992?text=${msg}`, "_blank");
    } catch {
      const msg = encodeURIComponent(
        `Hola Benita Pets! Quiero pedir:\n${cart.map((i) => `- ${i.quantity}x ${i.name}`).join("\n")}\nTotal: S/${total.toFixed(2)}\nNombre: ${name}\nDireccion: ${address}, ${district}`
      );
      window.open(`https://wa.me/51950326992?text=${msg}`, "_blank");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="font-jonesy text-2xl text-benita-orange-dark">
            benita pets
          </a>
          {step === "products" && cartCount > 0 && (
            <button
              onClick={() => setStep("checkout")}
              className="bg-benita-orange text-white px-6 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM2 2h2.5l.6 3H17a1 1 0 01.98 1.2l-1.5 7A1 1 0 0115.5 14h-9a1 1 0 01-.98-.8L3.5 3H2V2z"/>
              </svg>
              Carrito ({cartCount}) — S/{total.toFixed(2)}
            </button>
          )}
          {step === "checkout" && (
            <button
              onClick={() => setStep("products")}
              className="text-benita-blue font-medium text-sm"
            >
              Seguir comprando
            </button>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {step === "products" && (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Elige tus productos
            </h1>
            {catalogLoading ? (
              <div className="text-center py-12 text-gray-400">Cargando productos...</div>
            ) : catalog.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No pudimos cargar los productos.</p>
                <a
                  href="https://wa.me/51950326992?text=Hola%20Benita%20Pets!%20Quiero%20hacer%20un%20pedido"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold"
                >
                  Pedir por WhatsApp
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {catalog.map((product) => {
                  const inCart = cart.find((i) => i.id === product.id);
                  const image = getProductImage(product);
                  const weight = product.weight_kg ? `${product.weight_kg}kg` : "";
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl border p-4 flex flex-col"
                    >
                      <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-center h-36 mb-3">
                        <Image
                          src={image}
                          alt={product.name}
                          width={120}
                          height={120}
                          className="object-contain h-28 w-auto"
                        />
                      </div>
                      <h3 className="font-semibold text-sm text-gray-900">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {product.brand}{weight ? ` — ${weight}` : ""}
                      </p>
                      <p className="text-lg font-bold text-benita-orange-dark mt-1">
                        S/{Number(product.price).toFixed(2)}
                      </p>
                      <div className="mt-auto pt-3">
                        {inCart ? (
                          <div className="flex items-center justify-between bg-benita-cream rounded-full px-3 py-1.5">
                            <button
                              onClick={() => removeFromCart(product.id)}
                              className="w-8 h-8 rounded-full bg-white text-benita-orange-dark font-bold shadow-sm"
                            >
                              -
                            </button>
                            <span className="font-bold">{inCart.quantity}</span>
                            <button
                              onClick={() => addToCart(product)}
                              className="w-8 h-8 rounded-full bg-benita-orange text-white font-bold shadow-sm"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(product)}
                            className="w-full bg-benita-blue text-white py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition"
                          >
                            Agregar
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {step === "checkout" && (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Tu pedido
            </h1>

            {/* Cart summary */}
            <div className="bg-white rounded-2xl border p-5 mb-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3 border-b last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400">
                        {item.quantity}x S/{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-benita-orange-dark">
                    S/{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="flex justify-between pt-4 mt-2 border-t">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-xl text-benita-orange-dark">
                  S/{total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Delivery info */}
            <div className="bg-white rounded-2xl border p-5 mb-6">
              <h2 className="font-bold text-gray-900 mb-4">
                Datos de entrega
              </h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-benita-blue"
                />
                <input
                  type="tel"
                  placeholder="Celular (WhatsApp)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-benita-blue"
                />
                <input
                  type="text"
                  placeholder="Direccion"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-benita-blue"
                />
                <input
                  type="text"
                  placeholder="Distrito (ej: Cayma, Cerro Colorado...)"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-benita-blue"
                />
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white rounded-2xl border p-5 mb-6">
              <h2 className="font-bold text-gray-900 mb-4">Metodo de pago</h2>
              <div className="space-y-3">
                <label
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${
                    paymentMethod === "mercadopago"
                      ? "border-benita-blue bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "mercadopago"}
                    onChange={() => setPaymentMethod("mercadopago")}
                    className="accent-benita-blue"
                  />
                  <div>
                    <p className="font-semibold text-sm">Mercado Pago</p>
                    <p className="text-xs text-gray-400">
                      Tarjeta, billetera MP o cuotas
                    </p>
                  </div>
                </label>
                <label
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${
                    paymentMethod === "yape"
                      ? "border-benita-blue bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "yape"}
                    onChange={() => setPaymentMethod("yape")}
                    className="accent-benita-blue"
                  />
                  <div>
                    <p className="font-semibold text-sm">Yape / Efectivo</p>
                    <p className="text-xs text-gray-400">
                      Coordinamos por WhatsApp
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Pay button */}
            <button
              onClick={handleCheckout}
              disabled={loading || !name || !phone || !address || !district}
              className="w-full bg-benita-orange text-white font-bold py-4 rounded-full text-lg hover:bg-benita-orange-dark transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Procesando..."
                : paymentMethod === "mercadopago"
                ? `Pagar S/${total.toFixed(2)} con Mercado Pago`
                : `Confirmar pedido — S/${total.toFixed(2)}`}
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
              {paymentMethod === "mercadopago"
                ? "Seras redirigido a Mercado Pago para completar el pago de forma segura."
                : "Te contactaremos por WhatsApp para coordinar el pago."}
            </p>
          </>
        )}
      </main>
    </div>
  );
}
