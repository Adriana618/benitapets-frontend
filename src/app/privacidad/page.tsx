import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad y protección de datos personales de Benita Pets.",
};

export default function Privacidad() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidad</h1>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 prose prose-gray max-w-none text-sm leading-relaxed">
          <p className="text-gray-500 mb-6">Última actualización: Marzo 2026</p>

          <p>
            La presente Política de Privacidad tiene como finalidad informar al usuario sobre el
            tratamiento de sus datos personales, de conformidad con la Ley N° 29733, Ley de
            Protección de Datos Personales, y su Reglamento aprobado por Decreto Supremo N° 003-2013-JUS.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">1. Responsable del tratamiento</h2>
          <p>
            Benita Pets, con domicilio en Avelino Cáceres, Arequipa, Perú, es responsable del
            tratamiento de los datos personales recopilados a través del sitio web www.benitapets.com.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">2. Datos personales que recopilamos</h2>
          <p>Podemos recopilar los siguientes datos personales:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Nombre completo</li>
            <li>Documento de identidad (DNI / CE)</li>
            <li>Correo electrónico</li>
            <li>Número de teléfono</li>
            <li>Dirección de entrega</li>
            <li>Datos de navegación (cookies, dirección IP)</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">3. Finalidad del tratamiento</h2>
          <p>Los datos personales son utilizados para las siguientes finalidades:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Gestionar y procesar pedidos de productos</li>
            <li>Coordinar la entrega de productos</li>
            <li>Atender consultas, reclamos y quejas a través del Libro de Reclamaciones</li>
            <li>Enviar comunicaciones relacionadas con pedidos realizados</li>
            <li>Mejorar la experiencia del usuario en el sitio web</li>
            <li>Cumplir con obligaciones legales</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">4. Base legal</h2>
          <p>
            El tratamiento de datos se realiza con base en: (a) el consentimiento del titular al
            proporcionar voluntariamente sus datos, (b) la ejecución de la relación contractual de
            compraventa, y (c) el cumplimiento de obligaciones legales.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">5. Almacenamiento y seguridad</h2>
          <p>
            Los datos personales son almacenados en servidores seguros. Implementamos medidas técnicas
            y organizativas apropiadas para proteger los datos personales contra el acceso no autorizado,
            pérdida, alteración o destrucción. Los datos se conservarán por el tiempo necesario para
            cumplir con las finalidades descritas y las obligaciones legales aplicables.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">6. Compartición de datos</h2>
          <p>
            No vendemos ni compartimos datos personales con terceros para fines comerciales. Los datos
            pueden ser compartidos únicamente con:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Procesadores de pago (Mercado Pago) para procesar transacciones</li>
            <li>Autoridades competentes cuando sea requerido por ley</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">7. Derechos del titular</h2>
          <p>
            De acuerdo con la Ley N° 29733, el titular de los datos personales tiene derecho a:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Acceso:</strong> Obtener información sobre el tratamiento de sus datos</li>
            <li><strong>Rectificación:</strong> Solicitar la corrección de datos inexactos</li>
            <li><strong>Cancelación:</strong> Solicitar la supresión de sus datos cuando ya no sean necesarios</li>
            <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos en determinados supuestos</li>
          </ul>
          <p>
            Para ejercer estos derechos, el titular puede comunicarse a través de WhatsApp al
            +51 950 326 992 o enviar un correo a contacto@benitapets.com, indicando su nombre completo
            y número de documento de identidad.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">8. Cookies</h2>
          <p>
            El sitio web puede utilizar cookies propias y de terceros para mejorar la experiencia de
            navegación. Las cookies son pequeños archivos de texto almacenados en el dispositivo del
            usuario. El usuario puede configurar su navegador para rechazar cookies, aunque esto
            podría afectar la funcionalidad del sitio.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">9. Modificaciones</h2>
          <p>
            Benita Pets se reserva el derecho de modificar esta Política de Privacidad en cualquier
            momento. Las modificaciones serán publicadas en esta misma página con la fecha de
            actualización.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">10. Contacto</h2>
          <p>
            Para cualquier consulta sobre esta Política de Privacidad o el tratamiento de sus datos
            personales:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>WhatsApp: +51 950 326 992</li>
            <li>Dirección: Avelino Cáceres, Arequipa, Perú</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">11. Autoridad de protección de datos</h2>
          <p>
            Si considera que el tratamiento de sus datos no ha sido adecuado, puede presentar una
            reclamación ante la Autoridad Nacional de Protección de Datos Personales del Ministerio
            de Justicia y Derechos Humanos del Perú.
          </p>
        </div>
      </div>
    </div>
  );
}
