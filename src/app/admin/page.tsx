"use client";

import { useState, useEffect, useCallback } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.benitapets.com";

interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string | null;
  category: string | null;
  pet_type: string | null;
  weight_kg: number | null;
  price: number;
  cost: number | null;
  stock: number;
  flavor: string | null;
  age_range: string | null;
  image_url: string | null;
  is_active: boolean;
}

interface Competitor {
  id: string;
  name: string;
}

interface CompetitorPriceEntry {
  competitor_id: string;
  competitor: string;
  price: number;
}

const EMPTY_PRODUCT = {
  sku: "",
  name: "",
  brand: "",
  category: "food",
  pet_type: "dog",
  weight_kg: 0,
  price: 0,
  cost: 0,
  stock: 100,
  flavor: "",
  age_range: "",
  image_url: "",
  is_active: true,
};

function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Credenciales incorrectas");
      }
      const data = await res.json();
      onLogin(data.access_token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de conexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border shadow-sm p-8 max-w-sm w-full">
        <div className="text-center mb-6">
          <a href="/" className="font-jonesy text-2xl text-benita-orange-dark">
            benita pets
          </a>
          <p className="text-sm text-gray-500 mt-1">Panel de administracion</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 font-medium">Usuario</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm mt-1"
              placeholder="admin"
              autoFocus
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 font-medium">Contrasena</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm mt-1"
              placeholder="••••••••"
            />
          </div>
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg border border-red-200">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full bg-benita-blue text-white py-2.5 rounded-full font-semibold text-sm disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"products" | "competitors" | "add" | "seed">("products");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [priceEditor, setPriceEditor] = useState<string | null>(null);
  const [compPrices, setCompPrices] = useState<CompetitorPriceEntry[]>([]);
  const [newCompName, setNewCompName] = useState("");
  const [seedText, setSeedText] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("admin_token");
    if (saved) setToken(saved);
    setAuthChecked(true);
  }, []);

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("admin_token", newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("admin_token");
  };

  const authFetch = useCallback(async (url: string, options?: RequestInit) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 401 || res.status === 403) {
      handleLogout();
      return null;
    }
    return res;
  }, [token]);

  const fetchProducts = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    const res = await authFetch(`${API}/api/admin/products?limit=500`);
    if (!res) return;
    const data = await res.json();
    setProducts(data.products || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [token, authFetch]);

  const fetchCompetitors = useCallback(async () => {
    if (!token) return;
    const res = await authFetch(`${API}/api/admin/competitors`);
    if (!res) return;
    const data = await res.json();
    setCompetitors(data.competitors || []);
  }, [token, authFetch]);

  useEffect(() => {
    if (token) {
      fetchProducts();
      fetchCompetitors();
    }
  }, [token, fetchProducts, fetchCompetitors]);

  const flash = (m: string) => {
    setMsg(m);
    setTimeout(() => setMsg(""), 3000);
  };

  // --- CRUD ---
  const saveProduct = async () => {
    const body = {
      ...form,
      weight_kg: form.weight_kg || null,
      cost: form.cost || null,
    };

    if (editingId) {
      await authFetch(`${API}/api/admin/products/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      flash("Producto actualizado");
    } else {
      await authFetch(`${API}/api/admin/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      flash("Producto creado");
    }
    setEditingId(null);
    setForm(EMPTY_PRODUCT);
    setTab("products");
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Eliminar este producto?")) return;
    await authFetch(`${API}/api/admin/products/${id}`, { method: "DELETE" });
    flash("Producto eliminado");
    fetchProducts();
  };

  const editProduct = (p: Product) => {
    setEditingId(p.id);
    setForm({
      sku: p.sku,
      name: p.name,
      brand: p.brand || "",
      category: p.category || "food",
      pet_type: p.pet_type || "dog",
      weight_kg: p.weight_kg || 0,
      price: p.price,
      cost: p.cost || 0,
      stock: p.stock,
      flavor: p.flavor || "",
      age_range: p.age_range || "",
      image_url: p.image_url || "",
      is_active: p.is_active,
    });
    setTab("add");
  };

  // --- Competitor Prices ---
  const openPriceEditor = async (productId: string) => {
    setPriceEditor(productId);
    const res = await authFetch(`${API}/api/admin/competitor-prices/${productId}`);
    if (!res) return;
    const data = await res.json();
    setCompPrices(data.prices || []);
  };

  const saveCompPrice = async (competitorId: string, price: number) => {
    if (!priceEditor || !price) return;
    await authFetch(`${API}/api/admin/competitor-prices`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: priceEditor,
        competitor_id: competitorId,
        price,
      }),
    });
    openPriceEditor(priceEditor);
    flash("Precio competidor guardado");
  };

  const addCompetitor = async () => {
    if (!newCompName.trim()) return;
    await authFetch(`${API}/api/admin/competitors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCompName.trim(), base_url: "" }),
    });
    setNewCompName("");
    fetchCompetitors();
    flash("Competidor agregado");
  };

  // --- Seed from paste ---
  const seedFromText = async () => {
    const lines = seedText.trim().split("\n").filter((l) => l.trim());
    const products = lines.map((line, i) => {
      const cols = line.split("\t");
      const brand = cols[0]?.trim() || "";
      const weight = parseFloat(cols[1]) || 0;
      const flavor = cols[2]?.trim() || "";
      const age = cols[3]?.trim() || "";
      const priceStr = (cols[4] || "").replace(/[^0-9.]/g, "");
      const price = parseFloat(priceStr) || 0;
      const costStr = (cols[5] || "").replace(/[^0-9.]/g, "");
      const cost = parseFloat(costStr) || 0;
      const petType = brand.toLowerCase().includes("cat") || brand.toLowerCase().includes("michi") || brand.toLowerCase().includes("rico" + "cat") || brand.toLowerCase().includes("pituk") || brand.toLowerCase().includes("maxicat") || brand.toLowerCase().includes("supercat")
        ? "cat" : "dog";

      return {
        sku: `${brand.toLowerCase().replace(/\s+/g, "-")}-${weight}kg-${i}`,
        name: `${brand} ${flavor}`.trim(),
        brand,
        category: "food",
        pet_type: petType,
        weight_kg: weight || null,
        price: price || 0,
        cost: cost || null,
        stock: 100,
        flavor,
        age_range: age,
        image_url: null,
        is_active: true,
      };
    });

    const res = await authFetch(`${API}/api/admin/products/bulk`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(products),
    });
    if (!res) return;
    const data = await res.json();
    flash(`${data.created} productos creados`);
    setSeedText("");
    setTab("products");
    fetchProducts();
  };

  if (!authChecked) return null;
  if (!token) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="font-jonesy text-xl text-benita-orange-dark">
              benita pets
            </a>
            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full font-medium">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{total} productos</span>
            <button
              onClick={handleLogout}
              className="text-xs text-red-400 hover:text-red-600 font-medium"
            >
              Cerrar sesion
            </button>
          </div>
        </div>
      </header>

      {/* Flash message */}
      {msg && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl border border-green-200">
            {msg}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex gap-2 mb-6">
          {(["products", "add", "competitors", "seed"] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                if (t === "add" && !editingId) setForm(EMPTY_PRODUCT);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                tab === t
                  ? "bg-benita-blue text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border"
              }`}
            >
              {t === "products" && "Productos"}
              {t === "add" && (editingId ? "Editar" : "Nuevo")}
              {t === "competitors" && "Competidores"}
              {t === "seed" && "Importar"}
            </button>
          ))}
        </div>

        {/* --- Products Table --- */}
        {tab === "products" && (
          <div className="bg-white rounded-2xl border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase">
                    <th className="px-4 py-3">Marca</th>
                    <th className="px-4 py-3">Nombre</th>
                    <th className="px-4 py-3">Kg</th>
                    <th className="px-4 py-3">Sabor</th>
                    <th className="px-4 py-3">Edad</th>
                    <th className="px-4 py-3">Tipo</th>
                    <th className="px-4 py-3 text-right">Precio</th>
                    <th className="px-4 py-3 text-right">Costo</th>
                    <th className="px-4 py-3 text-right">Margen</th>
                    <th className="px-4 py-3 text-center">Activo</th>
                    <th className="px-4 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={11} className="px-4 py-8 text-center text-gray-400">
                        Cargando...
                      </td>
                    </tr>
                  ) : products.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="px-4 py-8 text-center text-gray-400">
                        No hay productos. Agrega uno o importa desde la pestana Importar.
                      </td>
                    </tr>
                  ) : (
                    products.map((p) => {
                      const margin = p.cost ? ((p.price - p.cost) / p.price * 100).toFixed(1) : "-";
                      return (
                        <tr key={p.id} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">
                            <div className="flex items-center gap-2">
                              {p.image_url ? (
                                <img src={p.image_url} alt="" className="w-8 h-8 object-contain rounded" />
                              ) : (
                                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-300 text-xs">—</div>
                              )}
                              {p.brand}
                            </div>
                          </td>
                          <td className="px-4 py-3">{p.name}</td>
                          <td className="px-4 py-3">{p.weight_kg || "-"}</td>
                          <td className="px-4 py-3 text-xs">{p.flavor || "-"}</td>
                          <td className="px-4 py-3 text-xs">{p.age_range || "-"}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              p.pet_type === "cat" ? "bg-purple-100 text-purple-700" : "bg-amber-100 text-amber-700"
                            }`}>
                              {p.pet_type === "cat" ? "Gato" : "Perro"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-benita-orange-dark">
                            S/{Number(p.price).toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-right text-gray-500">
                            {p.cost ? `S/${Number(p.cost).toFixed(2)}` : "-"}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {margin !== "-" && (
                              <span className={`text-xs font-medium ${Number(margin) > 10 ? "text-green-600" : "text-amber-600"}`}>
                                {margin}%
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`w-2.5 h-2.5 rounded-full inline-block ${p.is_active ? "bg-green-500" : "bg-gray-300"}`} />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <button
                                onClick={() => editProduct(p)}
                                className="text-xs text-benita-blue hover:underline"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => openPriceEditor(p.id)}
                                className="text-xs text-benita-orange hover:underline"
                              >
                                Precios
                              </button>
                              <button
                                onClick={() => deleteProduct(p.id)}
                                className="text-xs text-red-400 hover:underline"
                              >
                                Borrar
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- Add/Edit Product Form --- */}
        {tab === "add" && (
          <div className="bg-white rounded-2xl border p-6 max-w-2xl">
            <h2 className="font-bold text-lg mb-4">
              {editingId ? "Editar Producto" : "Nuevo Producto"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 font-medium">SKU</label>
                <input
                  value={form.sku}
                  onChange={(e) => setForm({ ...form, sku: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm mt-1"
                  placeholder="ricocat-9kg"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium">Marca</label>
                <input
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm mt-1"
                  placeholder="Ricocat"
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-gray-500 font-medium">Nombre completo</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm mt-1"
                  placeholder="Ricocat Festival de Sabores 9kg"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium">Sabor</label>
                <input
                  value={form.flavor}
                  onChange={(e) => setForm({ ...form, flavor: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm mt-1"
                  placeholder="Festival de sabores"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium">Edad / Rango</label>
                <input
                  value={form.age_range}
                  onChange={(e) => setForm({ ...form, age_range: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm mt-1"
                  placeholder="Adulto razas medianas"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium">Peso (kg)</label>
                <input
                  type="number"
                  value={form.weight_kg}
                  onChange={(e) => setForm({ ...form, weight_kg: parseFloat(e.target.value) || 0 })}
                  className="w-full border rounded-lg px-3 py-2 text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium">Tipo mascota</label>
                <select
                  value={form.pet_type}
                  onChange={(e) => setForm({ ...form, pet_type: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm mt-1"
                >
                  <option value="dog">Perro</option>
                  <option value="cat">Gato</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium">Precio venta (S/)</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                  className="w-full border rounded-lg px-3 py-2 text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium">Costo (S/)</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.cost}
                  onChange={(e) => setForm({ ...form, cost: parseFloat(e.target.value) || 0 })}
                  className="w-full border rounded-lg px-3 py-2 text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium">Stock</label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })}
                  className="w-full border rounded-lg px-3 py-2 text-sm mt-1"
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-gray-500 font-medium">Imagen del producto</label>
                <div className="flex items-center gap-3 mt-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const fd = new FormData();
                      fd.append("file", file);
                      const res = await authFetch(`${API}/api/admin/upload-image`, {
                        method: "POST",
                        body: fd,
                      });
                      if (res) {
                        const data = await res.json();
                        setForm({ ...form, image_url: `${API}${data.url}` });
                        flash("Imagen subida");
                      }
                    }}
                    className="text-sm file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-benita-blue file:text-white hover:file:bg-blue-600 file:cursor-pointer"
                  />
                  {form.image_url && (
                    <img src={form.image_url} alt="Preview" className="w-12 h-12 object-contain rounded border" />
                  )}
                </div>
                <input
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm mt-2"
                  placeholder="o pega una URL directamente..."
                />
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                  className="accent-benita-blue"
                />
                <label className="text-sm">Producto activo (visible en tienda)</label>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={saveProduct}
                disabled={!form.sku || !form.name || !form.price}
                className="bg-benita-blue text-white px-6 py-2.5 rounded-full font-semibold text-sm disabled:opacity-50"
              >
                {editingId ? "Guardar cambios" : "Crear producto"}
              </button>
              {editingId && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setForm(EMPTY_PRODUCT);
                  }}
                  className="text-gray-500 text-sm"
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>
        )}

        {/* --- Competitors --- */}
        {tab === "competitors" && (
          <div className="max-w-xl">
            <div className="bg-white rounded-2xl border p-6 mb-4">
              <h2 className="font-bold text-lg mb-4">Competidores</h2>
              <div className="space-y-2 mb-4">
                {competitors.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium text-sm">{c.name}</span>
                    <span className="text-xs text-gray-400">{c.id.slice(0, 8)}</span>
                  </div>
                ))}
                {competitors.length === 0 && (
                  <p className="text-sm text-gray-400">
                    No hay competidores. Agrega SuperPet, Fallabella, PlazaVea, Makro...
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  value={newCompName}
                  onChange={(e) => setNewCompName(e.target.value)}
                  placeholder="Nombre del competidor"
                  className="flex-1 border rounded-lg px-3 py-2 text-sm"
                  onKeyDown={(e) => e.key === "Enter" && addCompetitor()}
                />
                <button
                  onClick={addCompetitor}
                  className="bg-benita-orange text-white px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- Seed / Import --- */}
        {tab === "seed" && (
          <div className="max-w-3xl">
            <div className="bg-white rounded-2xl border p-6">
              <h2 className="font-bold text-lg mb-2">Importar productos</h2>
              <p className="text-sm text-gray-500 mb-4">
                Pega las filas de tu Excel/Google Sheets. Formato por columnas separadas por TAB:
                <br />
                <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                  Marca → Peso KG → Sabor → Edad → Precio → Costo
                </code>
              </p>
              <textarea
                value={seedText}
                onChange={(e) => setSeedText(e.target.value)}
                rows={12}
                className="w-full border rounded-lg px-4 py-3 text-sm font-mono"
                placeholder={`Ricocat\t9\tFestival de sabores\t+1 gatos\tS/.80\t75\nRicocan\t15\tMultisabores\tToda raza Adulto\tS/.99\t94.5`}
              />
              <div className="mt-4 flex items-center gap-4">
                <button
                  onClick={seedFromText}
                  disabled={!seedText.trim()}
                  className="bg-benita-blue text-white px-6 py-2.5 rounded-full font-semibold text-sm disabled:opacity-50"
                >
                  Importar {seedText.trim().split("\n").filter((l) => l.trim()).length} productos
                </button>
                <span className="text-xs text-gray-400">
                  Los productos se crean con stock=100 por defecto
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- Competitor Price Modal --- */}
      {priceEditor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Precios competidores</h3>
              <button
                onClick={() => setPriceEditor(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                Cerrar
              </button>
            </div>
            {competitors.length === 0 ? (
              <p className="text-sm text-gray-400">
                Primero agrega competidores en la pestana Competidores.
              </p>
            ) : (
              <div className="space-y-3">
                {competitors.map((comp) => {
                  const existing = compPrices.find(
                    (cp) => cp.competitor_id === comp.id
                  );
                  return (
                    <div key={comp.id} className="flex items-center gap-3">
                      <span className="text-sm font-medium w-28 truncate">
                        {comp.name}
                      </span>
                      <input
                        type="number"
                        step="0.1"
                        defaultValue={existing?.price || ""}
                        placeholder="S/"
                        className="flex-1 border rounded-lg px-3 py-2 text-sm"
                        onBlur={(e) => {
                          const val = parseFloat(e.target.value);
                          if (val > 0) saveCompPrice(comp.id, val);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const val = parseFloat((e.target as HTMLInputElement).value);
                            if (val > 0) saveCompPrice(comp.id, val);
                          }
                        }}
                      />
                      {existing && (
                        <span className="text-xs text-gray-400">
                          S/{existing.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
