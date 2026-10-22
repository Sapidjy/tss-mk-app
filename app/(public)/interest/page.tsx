import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  ChartNoAxesCombined,
  CircleDollarSign,
  HandCoins,
  Info,
  Wallet,
} from "lucide-react";

const money = (amount: number) =>
  new Intl.NumberFormat("fr-FR").format(amount) + " HTG";

const interestSummary = [
  {
    title: "Enterè ki deja touche",
    amount: 18500,
    description: "Enterè ki deja antre nan kès la.",
    icon: CircleDollarSign,
    color: "bg-red-50 text-red-600",
    border: "border-t-red-600",
  },
  {
    title: "Enterè ki poko antre",
    amount: 6200,
    description: "Enterè prevwa sou prè ki poko fin regle.",
    icon: HandCoins,
    color: "bg-gray-100 text-black",
    border: "border-t-black",
  },
  {
    title: "Benefis nèt disponib",
    amount: 12000,
    description:
      "Benefis egzanp ki rete disponib pou distribisyon.",
    icon: Wallet,
    color: "bg-red-50 text-red-600",
    border: "border-t-red-600",
  },
];

const distribution = [
  {
    label: "Pati manm ki prete a",
    percentage: 50,
    amount: 6000,
    color: "bg-red-600",
  },
  {
    label: "Pati gwoupman TSS-MK",
    percentage: 25,
    amount: 3000,
    color: "bg-black",
  },
  {
    label: "Pati pou lòt manm yo",
    percentage: 25,
    amount: 3000,
    color: "bg-gray-400",
  },
];

export default function InterestPage() {
  const totalDistributed = distribution.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Retour */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-red-600"
        >
          <ArrowLeft className="size-4" />
          Retounen nan Akèy
        </Link>

        {/* En-tête */}
        <section>
          <p className="text-sm font-bold tracking-widest text-red-600">
            RAPÒ FINANSYE
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-black">
            Enterè ak benefis
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Konsilte enterè prè yo rapòte, benefis gwoupman
            an ak prensip distribisyon benefis yo.
          </p>
        </section>

        {/* Chiffres principaux */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {interestSummary.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className={`rounded-2xl border border-gray-200 border-t-4 ${item.border} bg-white p-5 shadow-sm transition-shadow hover:shadow-md`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-gray-500">
                      {item.title}
                    </p>

                    <p className="mt-3 text-2xl font-bold text-black">
                      {money(item.amount)}
                    </p>
                  </div>

                  <div className={`rounded-xl p-3 ${item.color}`}>
                    <Icon className="size-5" />
                  </div>
                </div>

                <p className="mt-4 text-xs leading-5 text-gray-500">
                  {item.description}
                </p>
              </article>
            );
          })}
        </section>

        {/* Explication */}
        <section className="flex items-start gap-3 rounded-2xl border border-red-200 bg-white p-5">
          <Info className="mt-0.5 size-5 shrink-0 text-red-600" />

          <div>
            <h2 className="font-semibold text-black">
              Kijan pou w li enfòmasyon sa yo
            </h2>

            <p className="mt-1 text-sm leading-6 text-gray-600">
              Enterè ki poko antre se yon montan prevwa,
              li poko yon lajan ki disponib nan kès la.
              Benefis nèt la dwe pran an konsiderasyon depans,
              obligasyon ak règ kontablite gwoupman an.
            </p>
          </div>
        </section>

        {/* Distribution des bénéfices */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-red-50 p-3 text-red-600">
              <ChartNoAxesCombined className="size-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-black">
                Egzanp distribisyon benefis
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Sou baz yon benefis nèt egzanp 12,000 HTG.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div
              className="flex h-3 overflow-hidden rounded-full bg-gray-100"
              role="img"
              aria-label="Répartition illustrative des bénéfices"
            >
              {distribution.map((item) => (
                <div
                  key={item.label}
                  className={item.color}
                  style={{ width: `${item.percentage}%` }}
                  title={`${item.label}: ${item.percentage}%`}
                />
              ))}
            </div>

            <div className="mt-6 space-y-5">
              {distribution.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`size-3 shrink-0 rounded-full ${item.color}`}
                    />

                    <div>
                      <p className="text-sm font-medium text-black">
                        {item.label}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {item.percentage}% nan benefis la
                      </p>
                    </div>
                  </div>

                  <p className="shrink-0 font-semibold text-black">
                    {money(item.amount)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-5">
              <p className="font-semibold text-black">
                Total distribisyon egzanp
              </p>

              <p className="text-lg font-bold text-red-600">
                {money(totalDistributed)}
              </p>
            </div>
          </div>
        </section>

        {/* Bénéfice personnel */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-black">
            Benefis pèsonèl mwen
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Montan egzanp ki ta ka koresponn ak pati pa w,
            selon règ distribisyon gwoupman an.
          </p>

          <div className="mt-5 rounded-xl border border-red-100 bg-gray-50 p-5">
            <p className="text-sm text-gray-500">
              Benefis pèsonèl estime
            </p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              1,250 HTG
            </p>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Sa a se yon valè demonstrasyon. Montan reyèl
              la dwe kalkile apati règ distribisyon ki apwouve
              yo ak done manm nan.
            </p>
          </div>
        </section>

        {/* Règles de calcul */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-black">
            Règ kalkil enterè yo
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Paramèt prè yo dwe konfòm ak règ gwoupman an.
          </p>

          <div className="mt-5 divide-y divide-gray-200">
            <div className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="font-medium text-black">
                  Prè Kenzèn
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Dire nòmal: 15 jou
                </p>
              </div>

              <span className="rounded-full bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700">
                10%
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="font-medium text-black">
                  Prè Mwa
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Dire nòmal: 1 mwa
                </p>
              </div>

              <span className="rounded-full bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700">
                15%
              </span>
            </div>
          </div>

          <Link
            href="/dashboard/loans"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-600 transition-colors hover:text-red-800"
          >
            Konsilte prè mwen yo
            <ArrowUpRight className="size-4" />
          </Link>
        </section>

        <p className="text-center text-xs text-gray-400">
          TSS-MK · Chif yo se done demonstrasyon, yo pa yon rapò kontab reyèl.
        </p>
      </div>
    </main>
  );
}
