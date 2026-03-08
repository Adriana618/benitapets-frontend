import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Términos y condiciones de uso del sitio web y servicio de venta de Benita Pets.",
};

export default function Terminos() {
  return (
    <div className="min-h-screen bg-benita-cream">
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Términos y Condiciones</h1>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 prose prose-gray max-w-none text-sm leading-relaxed">
          <p className="text-gray-500 mb-6">Última actualización: Marzo 2026</p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">1. Identificación del proveedor</h2>
          <p>
            Benita Pets es un negocio dedicado a la venta de productos para mascotas, con más de 40 años
            de experiencia en el mercado arequipeño. Ubicados en Avelino Cáceres, Arequipa, Perú.
            Teléfono de contacto: +51 950 326 992.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">2. Objeto</h2>
          <p>
            Los presentes Términos y Condiciones regulan el uso del sitio web www.benitapets.com y la
            adquisición de productos a través del mismo, de conformidad con lo dispuesto por la Ley
            N° 29571, Código de Protección y Defensa del Consumidor, y el Decreto Legislativo N° 1044.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">3. Productos y precios</h2>
          <p>
            Los productos ofrecidos a través del sitio web son alimentos y accesorios para mascotas.
            Los precios están expresados en soles peruanos (S/) e incluyen IGV cuando corresponda.
            Benita Pets se reserva el derecho de modificar los precios en cualquier momento, sin previo
            aviso. El precio aplicable será el vigente al momento de confirmar el pedido.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">4. Proceso de compra</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>El usuario selecciona los productos deseados y confirma su pedido.</li>
            <li>El pedido puede realizarse a través de la plataforma web o por WhatsApp.</li>
            <li>Una vez confirmado el pedido, se informará el monto total incluido el costo de envío si aplica.</li>
            <li>La disponibilidad de stock está sujeta a cambios sin previo aviso.</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">5. Medios de pago</h2>
          <p>Aceptamos los siguientes medios de pago:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Yape</li>
            <li>Plin</li>
            <li>Transferencia bancaria</li>
            <li>Mercado Pago (tarjetas de crédito y débito)</li>
            <li>Efectivo contra entrega</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">6. Entrega</h2>
          <p>
            Realizamos delivery en toda la ciudad de Arequipa. El plazo de entrega se coordinará con
            el cliente al momento de confirmar el pedido. El costo de envío, si aplica, será informado
            antes de la confirmación del pedido.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">7. Derecho de desistimiento y devoluciones</h2>
          <p>
            De acuerdo con el artículo 59 del Código de Protección y Defensa del Consumidor, el
            consumidor tiene derecho a devolver productos que presenten defectos o que no correspondan
            a lo ofrecido. Para ejercer este derecho, el consumidor debe comunicarse dentro de los 7
            días calendario siguientes a la recepción del producto.
          </p>
          <p>
            No se aceptan devoluciones de productos de alimentación que hayan sido abiertos, por
            razones de higiene y seguridad alimentaria, salvo que presenten defectos de fabricación.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">8. Garantía</h2>
          <p>
            Todos nuestros productos cuentan con la garantía legal establecida en el Código de
            Protección y Defensa del Consumidor. Si un producto presenta defectos de fábrica, el
            consumidor tiene derecho a la reparación, reposición o devolución del monto pagado.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">9. Propiedad intelectual</h2>
          <p>
            Todo el contenido del sitio web (textos, imágenes, logotipos, diseño) es propiedad de
            Benita Pets o de sus respectivos titulares. Queda prohibida su reproducción sin
            autorización previa y por escrito.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">10. Libro de Reclamaciones</h2>
          <p>
            De acuerdo con la Ley N° 29571 y el Decreto Supremo N° 006-2014-PCM, ponemos a
            disposición del consumidor nuestro{" "}
            <Link href="/libro-reclamaciones" className="text-benita-orange-dark font-medium hover:underline">
              Libro de Reclamaciones Virtual
            </Link>.
            El plazo máximo de respuesta es de 30 días calendario.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">11. Protección de datos personales</h2>
          <p>
            El tratamiento de datos personales se rige por nuestra{" "}
            <Link href="/privacidad" className="text-benita-orange-dark font-medium hover:underline">
              Política de Privacidad
            </Link>, en cumplimiento de la Ley N° 29733, Ley de Protección de Datos Personales.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">12. Legislación aplicable y jurisdicción</h2>
          <p>
            Los presentes Términos y Condiciones se rigen por la legislación peruana. Para cualquier
            controversia derivada del uso del sitio web o la adquisición de productos, las partes se
            someten a la jurisdicción de los jueces y tribunales de la ciudad de Arequipa, sin
            perjuicio del derecho del consumidor de acudir ante INDECOPI.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">13. Contacto</h2>
          <p>
            Para cualquier consulta sobre estos Términos y Condiciones, puede contactarnos a través de:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>WhatsApp: +51 950 326 992</li>
            <li>Dirección: Avelino Cáceres, Arequipa, Perú</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
