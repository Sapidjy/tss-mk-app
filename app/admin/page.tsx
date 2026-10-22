import { Users, Wallet, CreditCard } from "lucide-react";

const stats = [
  {
    label: "Membres",
    value: "0",
    icon: Users,
  },
  {
    label: "Actions collectées",
    value: "0 HTG",
    icon: Wallet,
  },
  {
    label: "Crédits actifs",
    value: "0",
    icon: CreditCard,
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-6 p-5 sm:p-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Vue générale des activités de TSS-MK.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  {stat.label}
                </p>
                <Icon className="size-5 text-teal-700" />
              </div>

              <p className="mt-4 text-2xl font-bold text-slate-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
