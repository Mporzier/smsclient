import { Check, X } from "lucide-react";

type FeatureItem = {
  text: string;
  excluded?: boolean;
  bold?: boolean;
};

type Tier = {
  id: string;
  name: string;
  priceAmount: string;
  pricePeriod: string;
  featured: boolean;
  features: FeatureItem[];
  smsCredit: FeatureItem[];
};

const tiers: Tier[] = [
  {
    id: "tier-free",
    name: "Free",
    priceAmount: "0€",
    pricePeriod: "pour toujours",
    featured: false,
    features: [
      { text: "Jusqu'à 20 contacts" },
      { text: "Scan intelligent" },
      { text: "1 campagne / mois" },
      { text: "Match Engine™ (5/jour)" },
      { text: "Mode hors-ligne", excluded: true },
      { text: "Statistiques avancées", excluded: true },
    ],
    smsCredit: [
      { text: "20 inclus" },
      { text: "0,15€ / Crédit supplémentaire" },
    ],
  },
  {
    id: "tier-starter",
    name: "Starter",
    priceAmount: "9,99€",
    pricePeriod: "/ mois",
    featured: true,
    features: [
      { text: "Cartes illimitées" },
      { text: "Scan intelligent" },
      { text: "Événements illimités" },
      { text: "Match Engine™ illimité" },
      { text: "Mode hors-ligne" },
      { text: "Statistiques avancées" },
    ],
    smsCredit: [
      { text: "100 inclus" },
      { text: "0,12€ / Crédit supplémentaire" },
    ],
  },
  {
    id: "tier-pro",
    name: "Pro",
    priceAmount: "19,99€",
    pricePeriod: "/ mois",
    featured: false,
    features: [
      { text: "Tout Premium, plus :" },
      { text: "Créer des événements" },
      { text: "Badge Organisateur" },
      { text: "Analytics événements" },
      { text: "Support prioritaire" },
      { text: "Accès beta features" },
    ],
    smsCredit: [
      { text: "200 inclus" },
      { text: "0,10€ / Crédit supplémentaire" },
    ],
  },
];

export default function Pricing() {
  return (
    <section className="py-24 sm:py-32" id="pricing">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-2 inline-block rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-800">
            Tarifs
          </span>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Simple et transparent
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-slate-600">
            Commencez gratuitement. Passez à Premium quand vous êtes prêt. Aucun
            engagement !
          </p>
        </div>

        <div className="isolate mx-auto mt-8 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:items-start lg:gap-x-4 xl:gap-x-8">
          {tiers.map((tier) => {
            const isFree = tier.priceAmount === "0€";
            const buttonText = isFree ? "Commencer" : `Choisir ${tier.name}`;
            return (
              <div
                key={tier.id}
                className={`rounded-xl bg-white p-8 xl:p-10 ${
                  tier.featured
                    ? "border-2 border-violet-300"
                    : "border border-slate-200"
                }`}
              >
                <div className="border-b border-b-slate-200 pb-8 text-center">
                  <h3 className="text-xl font-bold leading-8 text-slate-900">
                    {tier.name}
                  </h3>
                  <div className="mt-4 flex items-baseline justify-center gap-x-1">
                    <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                      {tier.priceAmount}
                    </span>
                    <span className="text-sm text-slate-400">
                      {tier.pricePeriod}
                    </span>
                  </div>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-6" role="list">
                  {tier.features.map((feature) => (
                    <li
                      key={feature.text}
                      className={`flex gap-x-3 text-slate-600 ${
                        feature.excluded ? "opacity-60" : ""
                      }`}
                    >
                      {feature.excluded ? (
                        <X
                          size={18}
                          strokeWidth={2}
                          className="mt-0.5 shrink-0 text-slate-400"
                          aria-hidden
                        />
                      ) : (
                        <Check
                          size={18}
                          strokeWidth={3}
                          className="mt-0.5 shrink-0 text-emerald-500"
                          aria-hidden
                        />
                      )}
                      <span>{feature.text}</span>
                    </li>
                  ))}
                  <li className="flex gap-x-3 text-slate-600 font-bold">
                    <span>Crédits SMS</span>
                  </li>
                  {tier.smsCredit.map((feature) => (
                    <li
                      key={feature.text}
                      className={`flex gap-x-3 text-slate-600 ${
                        feature.excluded ? "opacity-60" : ""
                      }`}
                    >
                      {feature.excluded ? (
                        <X
                          size={18}
                          strokeWidth={2}
                          className="mt-0.5 shrink-0 text-slate-400"
                          aria-hidden
                        />
                      ) : (
                        <Check
                          size={18}
                          strokeWidth={3}
                          className="mt-0.5 shrink-0 text-emerald-500"
                          aria-hidden
                        />
                      )}
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className="mt-10 block rounded-lg bg-slate-200 px-3 py-3 text-center text-sm font-semibold leading-6 text-slate-900 hover:bg-violet-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-800"
                >
                  {buttonText}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
