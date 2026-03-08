"use client";

import { useState } from "react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.benitapets.com";

export default function LibroReclamaciones() {
  const [form, setForm] = useState({
    name: "",
    dni: "",
    email: "",
    phone: "",
    address: "",
    complaint_type: "reclamo",
    product_description: "",
    detail: "",
    request: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ number: number; message: string } | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${API}/api/complaints`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Error al enviar");
      }
      const data = await res.json();
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al enviar el formulario");
    } finally {
      setSubmitting(false);
    }
  };

  const update = (field: string, value: string) => setForm({ ...form, [field]: value });

  if (result) {
    return (
      <div className="min-h-screen bg-benita-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registro exitoso</h2>
          <p className="text-gray-600 mb-4">
            Tu {form.complaint_type} ha sido registrado con el número <strong>#{result.number}</strong>.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            De acuerdo con la normativa vigente, responderemos en un plazo máximo de 30 días calendario.
          </p>
          <Link
            href="/"
            className="inline-block bg-benita-orange text-white font-semibold px-6 py-3 rounded-full hover:bg-benita-orange-dark transition"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-benita-cream">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-jonesy text-2xl text-benita-orange-dark">
            benita pets
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition">
            Volver al inicio
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Libro de Reclamaciones Virtual
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Libro de Reclamaciones</h1>
          <p className="mt-2 text-gray-500 max-w-2xl mx-auto">
            Conforme a lo establecido en el Código de Protección y Defensa del Consumidor
            (Ley N° 29571) y el Decreto Supremo N° 006-2014-PCM.
          </p>
        </div>

        {/* Provider info */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-3">Identificación del proveedor</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
            <div><span className="font-medium text-gray-700">Razón social:</span> Benita Pets</div>
            <div><span className="font-medium text-gray-700">Dirección:</span> Avelino Cáceres, Arequipa, Perú</div>
            <div><span className="font-medium text-gray-700">Teléfono:</span> +51 950 326 992</div>
            <div><span className="font-medium text-gray-700">Email:</span> contacto@benitapets.com</div>
          </div>
        </div>

        {/* Info box */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-6 border border-blue-100">
          <h3 className="font-semibold text-blue-900 mb-2">Antes de llenar el formulario</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li><strong>Reclamo:</strong> Disconformidad relacionada a los productos o servicios adquiridos.</li>
            <li><strong>Queja:</strong> Disconformidad respecto a la atención al público, sin relación directa con el producto o servicio.</li>
          </ul>
          <p className="text-sm text-blue-700 mt-2">
            El plazo máximo de respuesta es de 30 días calendario desde la fecha de registro.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-gray-100 space-y-6">
          {/* Consumer info */}
          <div>
            <h2 className="font-bold text-gray-900 mb-4">1. Datos del consumidor</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-benita-orange focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">DNI / CE *</label>
                <input
                  type="text"
                  required
                  maxLength={15}
                  value={form.dni}
                  onChange={(e) => update("dni", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-benita-orange focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-benita-orange focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-benita-orange focus:border-transparent outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección *</label>
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-benita-orange focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          {/* Complaint type */}
          <div>
            <h2 className="font-bold text-gray-900 mb-4">2. Tipo</h2>
            <div className="flex gap-4">
              <label className={`flex-1 p-4 border-2 rounded-xl cursor-pointer transition text-center ${
                form.complaint_type === "reclamo"
                  ? "border-benita-orange bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}>
                <input
                  type="radio"
                  name="complaint_type"
                  value="reclamo"
                  checked={form.complaint_type === "reclamo"}
                  onChange={(e) => update("complaint_type", e.target.value)}
                  className="sr-only"
                />
                <span className="font-semibold text-gray-900">Reclamo</span>
                <p className="text-xs text-gray-500 mt-1">Sobre producto o servicio</p>
              </label>
              <label className={`flex-1 p-4 border-2 rounded-xl cursor-pointer transition text-center ${
                form.complaint_type === "queja"
                  ? "border-benita-orange bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}>
                <input
                  type="radio"
                  name="complaint_type"
                  value="queja"
                  checked={form.complaint_type === "queja"}
                  onChange={(e) => update("complaint_type", e.target.value)}
                  className="sr-only"
                />
                <span className="font-semibold text-gray-900">Queja</span>
                <p className="text-xs text-gray-500 mt-1">Sobre la atención</p>
              </label>
            </div>
          </div>

          {/* Details */}
          <div>
            <h2 className="font-bold text-gray-900 mb-4">3. Detalle</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Producto o servicio contratado *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Comida para perros Ricocan 15kg"
                  value={form.product_description}
                  onChange={(e) => update("product_description", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-benita-orange focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción del {form.complaint_type} *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe detalladamente lo sucedido..."
                  value={form.detail}
                  onChange={(e) => update("detail", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-benita-orange focus:border-transparent outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pedido del consumidor *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="¿Qué solución esperas?"
                  value={form.request}
                  onChange={(e) => update("request", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-benita-orange focus:border-transparent outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">{error}</div>
          )}

          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-gray-400">
              Los campos marcados con * son obligatorios.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="bg-benita-orange text-white font-semibold px-8 py-3 rounded-full hover:bg-benita-orange-dark transition disabled:opacity-50"
            >
              {submitting ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          La formulación del reclamo no impide acudir a otras vías de solución de controversias
          ni es requisito previo para interponer una denuncia ante el INDECOPI.
        </p>
      </div>
    </div>
  );
}
