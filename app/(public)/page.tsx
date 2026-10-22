import Link from "next/link";
import {
  Wallet,
  HandCoins,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  Clock3,
  CircleCheck,
  Plus,
} from "lucide-react";

const stats = [
  {
    label: "Lajan disponib nan kès la",
    value: "125,000 HTG",
    detail: "Lajan ki disponib pou operasyon yo",
    icon: Wallet,
    color: "text-red-700 bg-red-50",
  },
  {
    label: "Prè an kou",
    value: "8",
    detail: "Prè ki poko fin regle",
    icon: HandCoins,
    color: "text-gray-900 bg-gray-100",
  },
  {
    label: "Manm aktif",
    value: "25",
    detail: "Manm nan gwoupman an",
    icon: Users,
    color: "text-red-800 bg-red-100",
  },
  {
    label: "Enterè touche",
    value: "18,500 HTG",
    detail: "Enterè ki deja antre",
    icon: TrendingUp,
    color: "text-gray-700 bg-gray-100",
  },
];

const recentLoans = [
  {
    id: "PRE-001",
    member: "Jean Dupont",
    amount: 10000,
    dueDate: "25 oktòb 2026",
    status: "An kou",
  },
  {
    id: "PRE-002",
    member: "Marie Joseph",
    amount: 5000,
    dueDate: "28 oktòb 2026",
    status: "An kou",
  },
  {
    id: "PRE-003",
    member: "Paul Pierre",
    amount: 15000,
    dueDate: "30 oktòb 2026",
    status: "An kou",
  },
];

const money = (amount: number) =>
  new Intl.NumberFormat("fr-FR").format(amount) + " HTG";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome */}
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-red-700">
              ESPAS MANM TSS-MK
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              Byenveni, Sadeley Mickerly!
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Men yon rezime sitiyasyon finansye gwoupman an.
            </p>
          </div>

          <Link
            href="/dashboard/loans/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-800"
          >
            <Plus className="size-5" />
            Fè yon demann prè
          </Link>
        </section>

        {/* Financial statistics */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-gray-500">
                      {stat.label}
                    </p>

                    <p className="mt-3 text-2xl font-bold text-gray-950">
                      {stat.value}
                    </p>
                  </div>

                  <div className={`rounded-xl p-3 ${stat.color}`}>
                    <Icon className="size-5" />
                  </div>
                </div>

                <p className="mt-4 text-xs text-gray-500">
                  {stat.detail}
                </p>
              </div>
            );
          })}
        </section>

        {/* Loan request banner */}
        <section className="overflow-hidden rounded-2xl bg-white border border-gray p-6 text-white sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <p className="text-sm font-semibold text-red-700">
                BEZWEN YON PRÈ?
              </p>

              <h2 className="mt-2 text-2xl font-bold text-red-700">
                Fè demann ou an sou entènèt.
              </h2>

              <p className="mt-2 text-sm leading-6 text-black">
                Chwazi kalite prè a, antre montan ou bezwen an epi suiv
                estati demann ou an nan espas manm ou.
              </p>
            </div>

            <Link
              href="/dashboard/loans/new"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-red-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
            >
              Kòmanse demann lan
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        {/* Interest and capital */}
        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-red-50 p-3 text-red-700">
                <TrendingUp className="size-5" />
              </div>

              <div>
                <h2 className="font-semibold text-gray-950">
                  Enterè ki deja touche
                </h2>

                <p className="text-sm text-gray-500">
                  Sou prè ki deja peye enterè yo
                </p>
              </div>
            </div>

            <p className="mt-5 text-3xl font-bold text-gray-950">
              18,500 HTG
            </p>

            <Link
              href="/dashboard/benefits"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-red-700 transition hover:text-red-900"
            >
              Gade enterè ak benefis yo
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gray-100 p-3 text-gray-900">
                <HandCoins className="size-5" />
              </div>

              <div>
                <h2 className="font-semibold text-gray-950">
                  Kapital prè ki poko remèt
                </h2>

                <p className="text-sm text-gray-500">
                  Kapital ki toujou deyò nan prè yo
                </p>
              </div>
            </div>

            <p className="mt-5 text-3xl font-bold text-gray-950">
              75,000 HTG
            </p>

            <Link
              href="/dashboard/loans"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-red-700 transition hover:text-red-900"
            >
              Gade detay prè yo
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </section>

        {/* Recent loans */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <h2 className="text-lg font-bold text-gray-950">
                Dènye prè yo
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Yon ti rezime prè ki an kou nan gwoupman an.
              </p>
            </div>

            <Link
              href="/dashboard/loans"
              className="inline-flex items-center gap-2 text-sm font-semibold text-red-700 transition hover:text-red-900"
            >
              Tout prè mwen yo
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {recentLoans.map((loan) => (
              <div
                key={loan.id}
                className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center sm:px-6"
              >
                <div>
                  <p className="font-semibold text-gray-950">
                    {loan.id}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {loan.member}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-950">
                    {money(loan.amount)}
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                    <Clock3 className="size-3.5" />
                    Limit: {loan.dueDate}
                  </p>
                </div>

                <span className="inline-flex w-fit items-center gap-1 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                  <CircleCheck className="size-3.5" />
                  {loan.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-gray-400">
          TSS-MK · Tout ansanm, n ap avanse.
        </p>
      </main>
    </div>
  );
}
