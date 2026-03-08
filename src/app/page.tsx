import Image from "next/image";

const WHATSAPP_URL =
  "https://wa.me/51999999999?text=Hola%20Benita%20Pets!%20Quiero%20hacer%20un%20pedido";

const PRODUCTS = [
  {
    name: "Dog Chow Carne y Pollo",
    weight: "15kg",
    ourPrice: 89.9,
    competitorPrice: 109.9,
    image: "/images/product-dogchow.png",
  },
  {
    name: "Ricocat Sardina",
    weight: "9kg",
    ourPrice: 52.9,
    competitorPrice: 64.9,
    image: "/images/product-ricocat.png",
  },
  {
    name: "Mimaskot Carne y Pollo",
    weight: "15kg",
    ourPrice: 79.9,
    competitorPrice: 95.0,
    image: "/images/product-mimaskot.png",
  },
  {
    name: "Bosko Plus",
    weight: "15kg",
    ourPrice: 64.9,
    competitorPrice: 78.0,
    image: "/images/product-bosko.png",
  },
];

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
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
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
  product: (typeof PRODUCTS)[number];
}) {
  const savings = product.competitorPrice - product.ourPrice;
  const pct = Math.round((savings / product.competitorPrice) * 100);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-xl transition-shadow group">
      <div className="relative bg-gray-50 rounded-xl p-4 flex items-center justify-center h-48">
        <Image
          src={product.image}
          alt={product.name}
          width={160}
          height={160}
          className="object-contain h-40 w-auto group-hover:scale-105 transition-transform"
        />
        <span className="absolute top-2 right-2 bg-benita-orange text-white text-xs font-bold px-2.5 py-1 rounded-full">
          -{pct}%
        </span>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-400">{product.weight}</p>
        <div className="mt-2 flex items-baseline gap-3">
          <span className="text-2xl font-bold text-benita-orange-dark">
            S/{product.ourPrice.toFixed(2)}
          </span>
          <span className="text-sm text-gray-400 line-through">
            S/{product.competitorPrice.toFixed(2)}
          </span>
        </div>
        <p className="text-xs text-green-600 mt-1 font-medium">
          Ahorras S/{savings.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

function ProductsSection() {
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
          {PRODUCTS.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-green-600 transition shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Pedir todo por WhatsApp
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
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="font-jonesy text-2xl text-benita-orange">
              benita pets
            </span>
            <p className="mt-2 text-sm">
              Amor en cada huella. Arequipa, Peru.
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#productos" className="hover:text-white transition">
              Productos
            </a>
            <a href="#precios" className="hover:text-white transition">
              Precios
            </a>
            <a href="#delivery" className="hover:text-white transition">
              Delivery
            </a>
            <a href="#nosotros" className="hover:text-white transition">
              Nosotros
            </a>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-green-600 transition"
          >
            WhatsApp
          </a>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs">
          <p>&copy; 2025 Benita Pets. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductsSection />
      <PriceComparisonSection />
      <DeliverySection />
      <AboutSection />
      <Footer />
    </>
  );
}
