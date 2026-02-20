"use client";

import React, { useState } from "react";
import {
  Flame,
  Calendar,
  Star,
  Send,
  ShoppingBag,
  Gift,
  CheckCircle2,
  Truck,
  Cake,
  Hourglass,
  Copy,
  RefreshCw,
  ChevronRight,
  MessageSquare,
  Tag,
  Heart,
  ChevronLeft,
  Phone,
} from "lucide-react";
import { sendLeadToDB } from "./sendLeadToDB";

interface Theme {
  key: string;
  icon: string;
  title: string;
}

const THEMES = [
  {
    key: "promo",
    icon: Flame,
    label: "Promo",
    color: "text-orange-500 bg-orange-50",
  },
  {
    key: "rdv",
    icon: Calendar,
    label: "RDV",
    color: "text-blue-500 bg-blue-50",
  },
  {
    key: "avis",
    icon: Star,
    label: "Avis",
    color: "text-yellow-500 bg-yellow-50",
  },
  {
    key: "new",
    icon: ShoppingBag,
    label: "Nouveau",
    color: "text-purple-500 bg-purple-50",
  },

  {
    key: "event", // NOUVEAU : Pour les restos, bars et lancements
    icon: Gift,
    label: "Événement",
    color: "text-pink-500 bg-pink-50",
  },
  {
    key: "ready",
    icon: Truck,
    label: "Prêt",
    color: "text-indigo-500 bg-indigo-50",
  },
  {
    key: "urgent",
    icon: Hourglass,
    label: "Urgent",
    color: "text-red-500 bg-red-50",
  },
  {
    key: "sales",
    icon: Tag,
    label: "Soldes",
    color: "text-red-600 bg-red-50",
  },
  {
    key: "thanks",
    icon: Heart,
    label: "Merci",
    color: "text-rose-500 bg-rose-50",
  },
  {
    key: "relance", // NOUVEAU : Stratégique pour le e-commerce (ROI élevé)
    icon: RefreshCw,
    label: "Relance",
    color: "text-emerald-500 bg-emerald-50",
  },
];

export default function SmsWidget() {
  const [view, setView] = useState<"choose" | "editor" | "phone">("choose");
  const [smsText, setSmsText] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1500);
  };

  const handleStart = (themeKey: string) => {
    setSmsText(
      `Bonjour ! On a une offre pour vous concernant ${themeKey}. Ça vous tente ? — L'équipe`
    );
    setView("editor");
    triggerToast("Généré ! ✨");
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await sendLeadToDB(phoneNumber, smsText);

      triggerToast("Test envoyé ! ✨");
      setPhoneNumber("");
      // Optionnel : setView("success");
    } catch (error) {
      // On affiche l'erreur balancée par la fonction (format invalide ou erreur serveur)
      triggerToast((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full text-slate-900 select-none overflow-hidden relative font-sans bg-white">
      {/* BACKGROUND VIVANT */}
      <div className="absolute inset-0 z-0 bg-white">
        <div className="absolute top-[-5%] right-[-10%] w-[80%] h-[60%] bg-fuchsia-400 rounded-full blur-[90px] opacity-80 animate-pulse" />
        <div className="absolute bottom-[10%] left-[-15%] w-[70%] h-[70%] bg-cyan-200 rounded-full blur-[80px] opacity-90" />
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-amber-500 rounded-full blur-[70px] opacity-60 animate-bounce [animation-duration:10s]" />
        <div className="absolute bottom-[-10%] right-[0%] w-[60%] h-[50%] bg-indigo-400 rounded-full blur-[90px] opacity-70" />
      </div>

      {/* OVERLAY DE FLOU "MILKY GLASS" */}
      <div className="absolute inset-0 z-10 backdrop-blur-[50px] bg-white/40" />

      {/* CONTENU DU WIDGET */}
      <div className="flex-grow px-2 flex flex-col relative z-20">
        {view === "choose" && (
          <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header : Ajusté à pt-14 pour remonter légèrement */}
            <div className="pt-14 mb-10 text-center">
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter drop-shadow-sm leading-tight">
                Testez l&apos;envoi de{" "}
                <span className="text-fuchsia-600 relative inline-block">
                  SMS
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-fuchsia-600/20 rounded-full"></span>
                </span>
              </h2>
              <p className="text-slate-600 font-medium text-sm mt-2 opacity-80 max-w-[220px] mx-auto leading-tight">
                Choisissez un thème pour que l&apos;IA génère votre message
              </p>
            </div>

            {/* Grille de boutons - Espacement vertical optimal */}
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-4.5 px-2 pb-10">
              {THEMES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => handleStart(t.key)}
                  className="
              group relative flex items-center gap-3 px-5 py-3
              bg-white/40 backdrop-blur-2xl border border-white/40 
              rounded-2xl transition-all duration-300
              hover:bg-white/60 hover:scale-105 active:scale-95 
              shadow-[0_8px_30px_rgb(0,0,0,0.04)]
            "
                >
                  <t.icon
                    size={16}
                    strokeWidth={2.5}
                    className="text-slate-700 group-hover:text-fuchsia-600 transition-colors"
                  />
                  <span className="text-[14px] font-bold text-slate-800 tracking-tight whitespace-nowrap">
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {view === "editor" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6 pt-10">
            {/* Zone de texte style iOS Messages - Adaptée au style clair */}
            <div className="bg-white/40 backdrop-blur-2xl rounded-[2.2rem] p-6 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden">
              <textarea
                value={smsText}
                onChange={(e) => setSmsText(e.target.value)}
                className="w-full h-44 bg-transparent border-none text-[16px] font-semibold leading-relaxed resize-none outline-none text-slate-800 placeholder-slate-400"
                placeholder="Votre message ici..."
              />

              <div className="pt-4 border-t border-slate-200/50 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 font-black tracking-widest uppercase">
                    {smsText.length} Caractères
                  </span>
                  <span className="text-[9px] text-fuchsia-600 font-bold">
                    {Math.ceil(smsText.length / 160)} SMS
                  </span>
                </div>

                <button
                  onClick={() => setView("choose")}
                  className="text-[11px] font-bold text-slate-700 bg-white/60 px-4 py-2 rounded-xl hover:bg-white/80 transition-colors shadow-sm border border-white"
                >
                  RETOUR
                </button>
              </div>
            </div>

            {/* Actions Secondaires (Copy & Magic) */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(smsText);
                  triggerToast("Copié ! 📋");
                }}
                className="flex items-center justify-center gap-2 py-4 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl font-bold text-sm text-slate-800 hover:bg-white/60 transition-all shadow-sm active:scale-95"
              >
                <Copy size={18} className="text-slate-600" /> Copier
              </button>
              <button
                onClick={() => handleStart("nouveau style")}
                className="flex items-center justify-center gap-2 py-4 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl font-bold text-sm text-slate-800 hover:bg-white/60 transition-all shadow-sm active:scale-95"
              >
                <RefreshCw size={18} className="text-fuchsia-600" /> Magie
              </button>
            </div>

            {/* Bouton d'action principal - Contraste fort */}
            <button
              onClick={() => setView("phone")}
              className="w-full bg-slate-900 text-white py-5 rounded-[1.8rem] font-black text-lg shadow-xl active:scale-[0.98] hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group"
            >
              Envoyer la campagne
              <Send
                size={20}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </button>
          </div>
        )}

        {/* VUE 3 : PHONE NUMBER */}
        {view === "phone" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6 pt-10 px-4">
            <button
              onClick={() => setView("editor")}
              className="flex items-center gap-1 text-slate-500 font-bold text-xs hover:text-slate-800 transition-colors mb-2"
            >
              <ChevronLeft size={14} /> MODIFIER LE MESSAGE
            </button>
            <div className="text-center mb-4">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Où l&apos;envoyer ?
              </h3>
              <p className="text-slate-500 text-sm font-medium">
                Entrez un numéro pour tester l&apos;IA
              </p>
            </div>
            <div className="bg-white/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center gap-4">
              <Phone className="text-fuchsia-600" size={24} />
              <input
                type="tel"
                placeholder="06 12 34 56 78"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-transparent border-none outline-none text-2xl font-bold text-slate-800 placeholder-slate-300 w-full"
              />
            </div>
            <button
              disabled={phoneNumber.length < 10 || loading}
              onClick={handleSubmit}
              className="w-full bg-fuchsia-600 disabled:bg-slate-300 text-white py-5 rounded-[1.8rem] font-black text-lg shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              {loading ? (
                <span className="animate-pulse">Envoi en cours...</span>
              ) : (
                <>
                  {" "}
                  Envoyer le SMS gratuit <Send size={20} />{" "}
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-slate-400 font-medium px-4">
              En cliquant, vous acceptez de recevoir ce SMS de test. <br />{" "}
              Garanti sans spam.
            </p>
          </div>
        )}
      </div>

      {/* Toast style iOS "Dynamic Island Mini" */}
      {toast && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4">
          <div className="bg-black/80 backdrop-blur-2xl text-white px-6 py-2.5 rounded-full text-xs font-black shadow-2xl border border-white/10 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
