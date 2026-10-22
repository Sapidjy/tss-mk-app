import Link from "next/link";
import {
  Wallet,
  Phone,
  MapPin,
  ArrowRight,
  Mail,
} from "lucide-react";

const services = [
  { label: "Nos services", href: "/services" },
  { label: "Comment ça marche", href: "/comment-ca-marche" },
  { label: "Conditions de crédit", href: "/conditions" },
];

const usefulLinks = [
  { label: "Accueil", href: "/" },
  { label: "À propos de TSS", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export default function UserFooter() {
  return (
    <footer className="border-t-2 border-red-600 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Identité */}
          <div>
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-3"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-red-600 text-white">
                <Wallet className="size-6" />
              </span>

              <span>
                <span className="block font-bold text-white">
                  Team Sans Stress
                </span>
                <span className="text-xs tracking-widest text-red-500">
                  MICRO CRÉDIT
                </span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-6 text-gray-300">
              Une communauté engagée dans l'entraide,
              l'épargne et l'accès au microcrédit.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-semibold text-white">
              Nos services
            </h3>

            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 transition-colors hover:text-red-500"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="mb-4 font-semibold text-white">
              Liens utiles
            </h3>

            <ul className="space-y-3">
              {usefulLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-red-500"
                  >
                    {item.label}
                    <ArrowRight className="size-3 text-red-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-white">
              Contactez-nous
            </h3>

            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-red-500" />
                <span>Plaine-du-Nord, Haïti</span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-red-500" />
                <span>41 14 9129</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-red-500" />
                <span className="break-all">
                  teamsansstress21@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bas de page */}
        <div className="mt-10 flex flex-col gap-4 border-t border-gray-700 pt-6 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 Team Sans Stress. Tous droits réservés.
          </p>

          <p>
            <span className="text-red-500">Entraide</span>
            {" · "}
            <span className="text-white">Engagement</span>
            {" · "}
            <span className="text-red-500">Progrès</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
