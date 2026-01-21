"use client";
import React, { useState } from 'react';

export default function CampaignSimulator() {
    const [budget, setBudget] = useState(100);

    // Constants for calculation
    const SMS_COST = 0.15; // 0.15€ per SMS
    const CONVERSION_RATE = 0.10; // 10%
    const AVERAGE_BASKET = 20; // 20€

    const smsCount = Math.floor(budget / SMS_COST);
    const conversions = Math.floor(smsCount * CONVERSION_RATE);
    const revenue = conversions * AVERAGE_BASKET;
    const roi = budget > 0 ? ((revenue - budget) / budget) * 100 : 0;

    return (
        <section id="campaign-simulator" className="py-24 px-4 relative overflow-hidden">
            {/* Decorative background blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[120px] -z-10" />

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Calculez votre <span className="text-fuchsia-900">ROI</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Découvrez combien votre campagne SMS peut vous rapporter en quelques secondes.
                    </p>
                </div>

                <div className="bg-white/40 backdrop-blur-xl border border-fuchsia-900/10 rounded-3xl p-8 md:p-12 shadow-2xl shadow-fuchsia-900/5">
                    {/* Slider Section */}
                    <div className="mb-16">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <label className="text-sm font-semibold uppercase tracking-wider text-fuchsia-900/60">
                                    Votre Budget SMS
                                </label>
                                <div className="text-4xl font-black text-gray-900">{budget}€</div>
                            </div>
                            <div className="hidden sm:block text-right text-xs text-gray-400 font-medium">
                                PRIX UNITAIRE : {SMS_COST}€ / SMS
                            </div>
                        </div>

                        <input
                            type="range"
                            min="10"
                            max="200"
                            step="10"
                            value={budget}
                            onChange={(e) => setBudget(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fuchsia-900 transition-all"
                        />
                        <div className="flex justify-between mt-3 text-xs font-bold text-gray-400 uppercase">
                            <span>10€</span>
                            <span>200€</span>
                        </div>
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ResultCard label="Volume SMS" value={smsCount.toLocaleString()} sub="Envoyés" />
                        <ResultCard label="Conversions" value={conversions.toLocaleString()} sub="Clients (10%)" />
                        <ResultCard label="CA Estimé" value={`${revenue.toLocaleString()}€`} sub="Généré" />

                        <div className="bg-fuchsia-900 rounded-2xl p-6 text-white shadow-xl shadow-fuchsia-900/20 transform hover:scale-105 transition-transform">
                            <div className="text-xs font-bold uppercase opacity-70 mb-1">💎 Retour / Inv.</div>
                            <div className="text-3xl font-black">{roi.toLocaleString()}%</div>
                            <div className="text-[10px] mt-2 opacity-50 leading-tight">
                                Soit {Math.floor(roi / 100)}x votre mise
                            </div>
                        </div>
                    </div>

                    <p className="mt-10 text-center text-xs text-gray-400 italic">
                        * Estimations basées sur un panier moyen de {AVERAGE_BASKET}€ et un taux de conversion de {CONVERSION_RATE * 100}%.
                    </p>
                </div>
            </div>
        </section>
    );
}

function ResultCard({ label, value, sub }: { label: string, value: string, sub: string }) {
    return (
        <div className="bg-white/60 border border-white p-6 rounded-2xl shadow-sm">
            <div className="text-xs font-bold uppercase text-gray-400 mb-1">{label}</div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-[10px] uppercase font-bold text-fuchsia-900/40 mt-1">{sub}</div>
        </div>
    );
}