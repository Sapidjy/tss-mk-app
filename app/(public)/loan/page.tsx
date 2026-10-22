import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  HandCoins,
  CreditCard,
  Plus,
  Wallet,
} from "lucide-react";
import Link from "next/link";

const loans = [
  {
    id: "PRE-2026-001",
    type: "Prè Kenzèn",
    capital: 10000,
    rate: 10,
    interest: 1000,
    total: 11000,
    paid: 0,
    startDate: "11 oktòb 2026",
    dueDate: "26 oktòb 2026",
    status: "An kou",
  },
  {
    id: "PRE-2026-002",
    type: "Prè Mwa",
    capital: 5000,
    rate: 15,
    interest: 750,
    total: 5750,
    paid: 5750,
    startDate: "1 septanm 2026",
    dueDate: "1 oktòb 2026",
    status: "Peye",
  },
  {
    id: "PRE-2026-003",
    type: "Prè Kenzèn",
    capital: 8000,
    rate: 10,
    interest: 800,
    total: 8800,
    paid: 0,
    startDate: "1 oktòb 2026",
    dueDate: "16 oktòb 2026",
    status: "An reta",
  },
];

const money = (amount: number) =>
  new Intl.NumberFormat("fr-FR").format(amount) + " HTG";

const statusStyle: Record<string, string> = {
  "An kou": "bg-red-50 text-red-700 ring-1 ring-red-200",
  Peye: "bg-gray-100 text-gray-700 ring-1 ring-gray-200",
  "An reta": "bg-black text-white ring-1 ring-black",
};

export default function MyLoansPage() {
  const activeLoans = loans.filter(
    (loan) => loan.status === "An kou"
  );

  const totalCapital = activeLoans.reduce(
    (sum, loan) => sum + loan.capital,
    0
  );

  const loanInterest = activeLoans.reduce(
    (sum, loan) => sum + loan.interest,
    0
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Retour */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-red-600"
        >
          <ArrowLeft className="size-4" />
          Retounen nan Akèy
        </Link>

        {/* En-tête */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold tracking-widest text-red-600">
              ESPAS MANM
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-black">
              Prè mwen yo
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Swiv prè ou yo, enterè ak dat ou dwe peye yo.
            </p>
          </div>

          <Link
            href="/dashboard/loans/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
          >
            <Plus className="size-4" />
            Fè yon demann prè
          </Link>
        </section>

        {/* Résumé financier */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 border-t-4 border-t-black bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 text-gray-500">
              <Wallet className="size-5 text-black" />
              <span className="text-sm">
                Kapital prè aktif
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold text-black">
              {money(totalCapital)}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 border-t-4 border-t-red-600 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 text-gray-500">
              <CreditCard className="size-5 text-red-600" />
              <span className="text-sm">
                Kantite enterè pou remèt
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold text-black">
              {money(loanInterest)}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 border-t-4 border-t-red-600 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 text-gray-500">
              <HandCoins className="size-5 text-red-600" />
              <span className="text-sm">
                Total lajan pou remèt (Kapital + enterè)
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold text-black">
              {money(totalCapital + loanInterest)}
            </p>
          </div>
        </section>

        {/* Historique des prêts */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-5 sm:p-6">
            <h2 className="text-lg font-bold text-black">
              Istorik prè mwen yo
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Tout prè ki anrejistre sou kont ou.
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {loans.map((loan) => {
              const remaining = Math.max(
                loan.total - loan.paid,
                0
              );

              const progress =
                loan.total > 0
                  ? Math.min(
                      (loan.paid / loan.total) * 100,
                      100
                    )
                  : 0;

              return (
                <article
                  key={loan.id}
                  className="space-y-4 p-5 transition-colors hover:bg-gray-50/70 sm:p-6"
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-black">
                          {loan.id}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[loan.status]}`}
                        >
                          {loan.status}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-gray-500">
                        {loan.type} · {loan.rate}% enterè
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-xl font-bold text-black">
                        {money(loan.capital)}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Kapital prete
                      </p>
                    </div>
                  </div>

                  {/* Détails financiers */}
                  <div className="grid gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-gray-500">
                        Enterè
                      </p>

                      <p className="mt-1 font-semibold text-black">
                        {money(loan.interest)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Total pou remèt
                      </p>

                      <p className="mt-1 font-semibold text-black">
                        {money(loan.total)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Rès pou peye
                      </p>

                      <p className="mt-1 font-semibold text-red-600">
                        {money(remaining)}
                      </p>
                    </div>
                  </div>

                  {/* Progression du remboursement */}
                  <div>
                    <div className="mb-2 flex justify-between text-xs text-gray-500">
                      <span>Montan ki deja peye</span>
                      <span className="font-semibold text-black">
                        {Math.round(progress)}%
                      </span>
                    </div>

                    <div
                      className="h-2 overflow-hidden rounded-full bg-gray-200"
                      role="progressbar"
                      aria-label={`Remboursement du prêt ${loan.id}`}
                      aria-valuenow={Math.round(progress)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="h-full rounded-full bg-red-600 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex flex-col gap-2 text-sm text-gray-500 sm:flex-row sm:gap-6">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="size-4 shrink-0 text-red-600" />
                      Dat kòmansman: {loan.startDate}
                    </span>

                    <span className="inline-flex items-center gap-2">
                      <Clock3 className="size-4 shrink-0 text-red-600" />
                      Dat limit: {loan.dueDate}
                    </span>
                  </div>

                  {/* Détail du prêt */}
                  {loan.status === "An kou" && (
                    <div className="flex justify-end">
                      <Link
                        href="/dashboard/loans"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 transition-colors hover:text-red-800"
                      >
                        Gade detay
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <p className="text-center text-xs text-gray-400">
          TSS-MK · Done prè yo se egzanp demonstrasyon.
        </p>
      </div>
    </main>
  );
}
