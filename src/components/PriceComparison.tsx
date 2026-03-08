interface ComparisonData {
  competitor: string;
  logo: string;
  price: number;
  difference: number;
  percentage: number;
  url: string;
  lastVerified: string;
}

export function PriceComparison({
  ourPrice,
  comparisons,
  monthlySavings,
}: {
  ourPrice: number;
  comparisons: ComparisonData[];
  monthlySavings: number;
}) {
  return (
    <div className="border rounded-xl p-6 bg-green-50">
      <h3 className="text-lg font-bold text-green-800 mb-4">
        Compara y compruébalo tú mismo
      </h3>

      <div className="space-y-3">
        {/* Nuestro precio destacado */}
        <div className="flex justify-between items-center p-3 bg-green-100 rounded-lg border-2 border-green-500">
          <span className="font-bold">PetShop AQP (nosotros)</span>
          <span className="text-2xl font-bold text-green-700">
            S/{ourPrice.toFixed(2)}
          </span>
        </div>

        {/* Precios competencia con links */}
        {comparisons
          .sort((a, b) => a.price - b.price)
          .map((comp) => (
            <a
              key={comp.competitor}
              href={comp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-center p-3 bg-white rounded-lg border hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <img src={comp.logo} alt="" className="w-6 h-6" />
                <span>{comp.competitor}</span>
                <span className="text-xs text-gray-400">ver producto</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold text-gray-700">
                  S/{comp.price.toFixed(2)}
                </span>
                <span className="block text-sm text-red-500">
                  +S/{Math.abs(comp.difference).toFixed(2)} más caro
                </span>
              </div>
            </a>
          ))}
      </div>

      {/* Ahorro mensual estimado */}
      <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-center">
        <p className="text-sm text-gray-600">
          Comprando aquí tu canasta mensual de mascota
        </p>
        <p className="text-xl font-bold text-yellow-700">
          Ahorras ~S/{monthlySavings.toFixed(0)}/mes (S/
          {(monthlySavings * 12).toFixed(0)}/año)
        </p>
      </div>

      <p className="text-xs text-gray-400 mt-2 text-center">
        Precios verificados automáticamente. Click en cada tienda para
        comprobarlo tú mismo.
      </p>
    </div>
  );
}
