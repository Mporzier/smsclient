import { Shield, MonitorSmartphone, Users, Zap } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    text: "100% Sécurisé",
    iconColor: "text-indigo-400", // Équivalent Lilac
  },
  {
    icon: MonitorSmartphone,
    text: "PC & Smartphone",
    iconColor: "text-cyan-400", // Équivalent Mint
  },
  {
    icon: Users,
    text: "Entreprise Française",
    iconColor: "text-amber-500", // Équivalent Yellow
  },
  {
    icon: Zap,
    text: "Délivrabilité 100%",
    iconColor: "text-rose-400", // Équivalent Coral
  },
];

export default function TrustBar() {
  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-slate-100 py-6 border-y border-slate-200 antialiased">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <p className="text-sm text-slate-400 text-center mb-2">
          Pensé par et pour les commerçants
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex items-center gap-3 px-5 py-3  rounded-2xl text-slate-800 font-medium text-sm md:text-base whitespace-nowrap transition-all duration-300`}
              >
                <span className={item.iconColor}>
                  <Icon size={18} />
                </span>
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
