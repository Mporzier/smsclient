"use client";
import React, { useState } from 'react';
import { Sparkles, Send, Wand2 } from 'lucide-react';

export default function SMSGenerator() {
    const [text, setText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [userInput, setUserInput] = useState("");

    const sampleSMS = "Salut ! ⚡ Profite de -20% sur toute notre nouvelle collection avec le code ETE24. Valable uniquement ce week-end ! 👉 https://monsite.fr";

    const generateAI = () => {
        if (isTyping) return;
        setIsTyping(true);
        setText("");
        let i = 0;
        const interval = setInterval(() => {
            setText(sampleSMS.slice(0, i));
            i++;
            if (i > sampleSMS.length) {
                clearInterval(interval);
                setIsTyping(false);
            }
        }, 25); // Vitesse de frappe
    };

    return (
        <section id="sms-generator" className="py-24 px-4 relative overflow-hidden">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/60 overflow-hidden flex flex-col md:flex-row min-h-[450px]">

                {/* PARTIE GAUCHE : INPUTS */}
                <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100">
                    <div className="w-12 h-12 bg-fuchsia-100 rounded-2xl flex items-center justify-center mb-6">
                        <Sparkles className="text-fuchsia-600 w-6 h-6" />
                    </div>

                    <h3 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                        L&apos;IA qui rédige <br />vos campagnes
                    </h3>

                    <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                        Décrivez votre offre simplement. Notre IA optimise chaque mot pour maximiser votre taux de clic.
                    </p>

                    <div className="space-y-4">
                        <div className="relative">
                            <label className="text-[10px] font-bold uppercase text-slate-400 ml-2 mb-1 block">Votre intention</label>
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Ex: Promotion été -20%..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 transition-all"
                            />
                        </div>

                        <button
                            onClick={generateAI}
                            disabled={isTyping}
                            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-fuchsia-600 text-white font-bold py-4 px-8 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 group"
                        >
                            <Wand2 className={`w-5 h-5 transition-transform ${isTyping ? 'animate-spin' : 'group-hover:rotate-12'}`} />
                            {isTyping ? "L'IA réfléchit..." : "Générer avec l'IA"}
                        </button>
                    </div>
                </div>

                {/* PARTIE DROITE : PRÉVISUALISATION MOBILE */}
                <div className="bg-slate-50 p-8 md:w-1/2 flex items-center justify-center relative overflow-hidden">
                    {/* Décoration de fond */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-200/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl" />

                    {/* Téléphone */}
                    <div className="w-full max-w-[260px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl relative z-10 transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
                        <div className="bg-white rounded-[2.2rem] h-full w-full overflow-hidden pt-6 pb-4 px-4 flex flex-col">

                            {/* Header SMS */}
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mb-1">
                                    <span className="text-slate-500 text-xs font-bold">JD</span>
                                </div>
                                <span className="text-[10px] font-medium text-slate-400">Aujourd&apos;hui 14:02</span>
                            </div>

                            {/* Bulle SMS */}
                            <div className="flex-1">
                                <div className="bg-slate-100 rounded-2xl rounded-tl-none p-4 text-[13px] text-slate-800 leading-relaxed shadow-sm min-h-[100px] relative">
                                    {text}
                                    {isTyping && (
                                        <span className="inline-block w-1.5 h-4 bg-fuchsia-600 animate-pulse ml-1 align-middle" />
                                    )}
                                    {!text && !isTyping && (
                                        <span className="text-slate-300 italic">Votre message apparaîtra ici...</span>
                                    )}
                                </div>
                            </div>

                            {/* Barre d'input factice */}
                            <div className="mt-4 flex gap-2 items-center">
                                <div className="h-8 flex-1 bg-slate-100 rounded-full px-4 flex items-center">
                                    <div className="w-1/2 h-2 bg-slate-200 rounded-full" />
                                </div>
                                <div className="w-8 h-8 bg-fuchsia-500 rounded-full flex items-center justify-center shadow-lg shadow-fuchsia-200">
                                    <Send className="w-4 h-4 text-white" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}