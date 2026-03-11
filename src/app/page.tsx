import Image from "next/image";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.benitapets.com";

const WHATSAPP_URL =
  "https://wa.me/51950326992?text=Hola%20Benita%20Pets!%20Quiero%20hacer%20un%20pedido";

interface ApiProduct {
  id: string;
  sku: string;
  name: string;
  brand: string | null;
  pet_type: string | null;
  weight_kg: number | null;
  price: number;
  image_url: string | null;
  is_active: boolean;
}

async function getProducts(): Promise<ApiProduct[]> {
  try {
    const res = await fetch(`${API}/api/products?limit=8`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
  } catch {
    return [];
  }
}

function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <span className="font-jonesy text-2xl text-benita-orange-dark">
          benita pets
        </span>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#productos" className="hover:text-benita-orange-dark transition">
            Productos
          </a>
          <a href="#precios" className="hover:text-benita-orange-dark transition">
            Compara precios
          </a>
          <a href="#delivery" className="hover:text-benita-orange-dark transition">
            Delivery
          </a>
          <a href="#nosotros" className="hover:text-benita-orange-dark transition">
            Nosotros
          </a>
        </div>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-benita-orange rounded-full px-5 py-2.5 text-white text-sm font-semibold hover:bg-benita-orange-dark transition shadow-lg shadow-orange-200"
        >
          Pedir por WhatsApp
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative pt-16 overflow-hidden bg-benita-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Tu mascota merece{" "}
            <span className="text-benita-orange-dark">lo mejor</span>, al{" "}
            <span className="text-benita-blue">mejor precio</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
            Comida y productos para perros y gatos con los precios más bajos de
            Arequipa. Compara y compruébalo tú mismo.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="/pedido"
              className="bg-benita-orange text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-benita-orange-dark transition shadow-lg shadow-orange-200"
            >
              Haz tu pedido
            </a>
            <a
              href="#precios"
              className="border-2 border-benita-blue text-benita-blue font-semibold px-8 py-4 rounded-full text-lg hover:bg-benita-blue hover:text-white transition"
            >
              Compara precios
            </a>
          </div>
          <div className="mt-8 flex items-center gap-6 justify-center md:justify-start text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-benita-orange" fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM2 2h2.5l.6 3H17a1 1 0 01.98 1.2l-1.5 7A1 1 0 0115.5 14h-9a1 1 0 01-.98-.8L3.5 3H2V2z"/></svg>
              Delivery en AQP
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-benita-blue" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              Precios verificados
            </span>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="relative w-full max-w-md mx-auto">
            <div className="absolute -inset-4 bg-benita-orange/20 rounded-full blur-3xl" />
            <Image
              src="/images/hero-dog.jpg"
              alt="Perro feliz"
              width={500}
              height={500}
              className="relative rounded-3xl object-cover shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

function ProductCard({
  product,
}: {
  product: ApiProduct;
}) {
  const weight = product.weight_kg ? `${product.weight_kg}kg` : "";
  const placeholder = product.pet_type === "cat" ? "/images/product-ricocat.png" : "/images/product-dogchow.png";
  const imageSrc = product.image_url ? `${API}${product.image_url}` : placeholder;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-xl transition-shadow group">
      <div className="relative bg-gray-50 rounded-xl p-4 flex items-center justify-center h-48">
        <Image
          src={imageSrc}
          alt={product.name}
          width={160}
          height={160}
          className="object-contain h-40 w-auto group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-400">
          {product.brand}{weight ? ` — ${weight}` : ""}
        </p>
        <div className="mt-2 flex items-baseline gap-3">
          <span className="text-2xl font-bold text-benita-orange-dark">
            S/{Number(product.price).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

function ProductsSection({ products }: { products: ApiProduct[] }) {
  if (products.length === 0) return null;

  return (
    <section id="productos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Productos <span className="text-benita-orange-dark">populares</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Las marcas que tu mascota ama, al precio que tu bolsillo agradece
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="/pedido"
            className="inline-flex items-center gap-2 bg-benita-orange text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-benita-orange-dark transition shadow-lg shadow-orange-200"
          >
            Ver todos los productos
          </a>
        </div>
      </div>
    </section>
  );
}

function PriceComparisonSection() {
  const comparisons = [
    { competitor: "SuperPet", product: "Dog Chow 15kg", theirPrice: 115.9, ourPrice: 89.9 },
    { competitor: "Fancy Pets", product: "Ricocat Sardina 9kg", theirPrice: 68.0, ourPrice: 52.9 },
    { competitor: "Tienda online", product: "Mimaskot 15kg", theirPrice: 99.9, ourPrice: 79.9 },
  ];

  return (
    <section id="precios" className="py-20 bg-benita-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Compara y <span className="text-benita-blue">compruébalo</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            No te pedimos que confíes, te pedimos que compares. Nuestros precios
            de Avelino Cáceres son consistentemente más bajos.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {comparisons.map((c) => {
            const savings = c.theirPrice - c.ourPrice;
            return (
              <div
                key={c.product}
                className="bg-white rounded-2xl p-5 shadow-sm"
              >
                <p className="text-sm font-medium text-gray-500 mb-3">
                  {c.product}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {c.competitor}
                      </span>
                      <span className="font-semibold text-gray-700">
                        S/{c.theirPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className="bg-gray-300 h-3 rounded-full"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-benita-orange-dark">
                        Benita Pets
                      </span>
                      <span className="font-bold text-benita-orange-dark">
                        S/{c.ourPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="w-full bg-orange-50 rounded-full h-3">
                      <div
                        className="bg-benita-orange h-3 rounded-full"
                        style={{
                          width: `${(c.ourPrice / c.theirPrice) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-right text-sm font-semibold text-green-600 mt-2">
                  Ahorras S/{savings.toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <div className="inline-block bg-benita-blue/10 text-benita-blue font-bold text-lg px-8 py-4 rounded-2xl">
            Ahorro promedio: ~S/47/mes comprando tu canasta aqui
          </div>
        </div>
      </div>
    </section>
  );
}

function DeliverySection() {
  return (
    <section id="delivery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Delivery en{" "}
              <span className="text-benita-orange-dark">toda Arequipa</span>
            </h2>
            <p className="mt-4 text-gray-500 text-lg">
              Pide por WhatsApp y te lo llevamos a la puerta de tu casa. Paga
              con Yape, efectivo o transferencia.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: "1", text: "Elige tus productos y escribenos por WhatsApp" },
                { icon: "2", text: "Confirmamos tu pedido y precio total" },
                { icon: "3", text: "Paga con Yape o al recibir" },
                { icon: "4", text: "Recibe en tu puerta" },
              ].map((step) => (
                <div key={step.icon} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-benita-orange rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {step.icon}
                  </div>
                  <p className="text-gray-700">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 relative">
            <Image
              src="/images/pets-collage.png"
              alt="Mascotas felices"
              width={500}
              height={400}
              className="rounded-3xl object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="nosotros" className="py-20 bg-benita-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Mas que mascotas,{" "}
          <span className="text-benita-pink">son familia</span>
        </h2>
        <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg">
          Somos una familia arequipeña con mas de 40 años vendiendo productos
          para mascotas en Avelino Caceres. Ahora llevamos los mismos precios
          de mayorista directo a tu casa.
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              number: "40+",
              label: "Años de experiencia",
              color: "text-benita-orange-dark",
            },
            {
              number: "500+",
              label: "Productos disponibles",
              color: "text-benita-blue",
            },
            {
              number: "10-20%",
              label: "Mas baratos que online",
              color: "text-green-600",
            },
          ].map((stat) => (
            <div key={stat.label}>
              <p className={`text-4xl font-bold ${stat.color}`}>
                {stat.number}
              </p>
              <p className="mt-2 text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <span className="font-jonesy text-2xl text-benita-orange">
              benita pets
            </span>
            <p className="mt-2 text-sm">
              Amor en cada huella. Arequipa, Perú.
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Avelino Cáceres, Arequipa
            </p>
            <p className="text-xs text-gray-500">Tel: +51 950 326 992</p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Navegación</span>
            <a href="#productos" className="hover:text-white transition">Productos</a>
            <a href="#precios" className="hover:text-white transition">Precios</a>
            <a href="#delivery" className="hover:text-white transition">Delivery</a>
            <a href="#nosotros" className="hover:text-white transition">Nosotros</a>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Legal</span>
            <a href="/terminos" className="hover:text-white transition">Términos y Condiciones</a>
            <a href="/privacidad" className="hover:text-white transition">Política de Privacidad</a>
            <a href="/libro-reclamaciones" className="hover:text-white transition">Libro de Reclamaciones</a>
          </div>
          <div className="flex flex-col gap-3 items-center md:items-end">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-green-600 transition"
            >
              WhatsApp
            </a>
            <a
              href="/libro-reclamaciones"
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-red-700 transition"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
              Libro de Reclamaciones
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs">
          <p>&copy; 2026 Benita Pets. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "PetStore",
    name: "Benita Pets",
    description:
      "Tienda de comida y productos para mascotas con los mejores precios de Arequipa. Mas de 40 años de experiencia en Avelino Caceres. Delivery a domicilio.",
    url: "https://benitapets.com",
    logo: "https://benitapets.com/icon-512.png",
    image: "https://benitapets.com/images/hero-dog.jpg",
    telephone: "+51950326992",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Avelino Cáceres",
      addressLocality: "Arequipa",
      addressRegion: "Arequipa",
      postalCode: "04001",
      addressCountry: "PE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -16.3989,
      longitude: -71.535,
    },
    areaServed: {
      "@type": "City",
      name: "Arequipa",
    },
    priceRange: "$",
    currenciesAccepted: "PEN",
    paymentAccepted: "Efectivo, Yape, Plin, Mercado Pago, Transferencia bancaria",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
      ],
      opens: "08:00",
      closes: "19:00",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Productos para mascotas",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Comida para perros",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Ricocan" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Dog Chow" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Thor" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Mimaskot" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Bosko" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Proplan" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Comida para gatos",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Ricocat" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Mimaskot Gatos" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Supercat" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Michicat" } },
          ],
        },
      ],
    },
    sameAs: [
      "https://wa.me/51950326992",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cuáles son los precios de comida para perros en Arequipa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "En Benita Pets ofrecemos los precios más bajos de Arequipa en comida para perros. Por ejemplo: Ricocan 15kg desde S/99, Thor 25kg desde S/105, Dog Chow 21kg desde S/169. Ahorra hasta 20% comparado con otras tiendas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Hacen delivery de comida para mascotas en Arequipa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, hacemos delivery a toda la ciudad de Arequipa. Puedes pedir por WhatsApp al 950 326 992 o a través de nuestra web. Aceptamos Yape, Plin, Mercado Pago, transferencia y efectivo contra entrega.",
        },
      },
      {
        "@type": "Question",
        name: "¿Dónde queda Benita Pets en Arequipa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Estamos ubicados en Avelino Cáceres, Arequipa. Tenemos más de 40 años de experiencia vendiendo productos para mascotas. También puedes comprar online con delivery a domicilio.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué marcas de comida para mascotas venden?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vendemos las mejores marcas: Dog Chow, Ricocan, Ricocat, Thor, Mimaskot, Proplan, Bosko, Supercan, Supercat, Michicat, Maxicat y más. Todas al mejor precio de Arequipa.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo comparo precios de comida para mascotas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "En nuestra web puedes comparar nuestros precios con tiendas como SuperPet, Fallabella, PlazaVea y Makro. Nuestros precios son consistentemente 10-20% más bajos que la competencia.",
        },
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Benita Pets",
    url: "https://benitapets.com",
    description: "Tienda online de comida para mascotas con los mejores precios de Arequipa",
    inLanguage: "es",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <JsonLd />
      <Navbar />
      <Hero />
      <ProductsSection products={products} />
      <PriceComparisonSection />
      <DeliverySection />
      <AboutSection />
      <Footer />
    </>
  );
}
