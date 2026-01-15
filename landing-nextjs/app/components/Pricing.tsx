'use client';

import { useState } from 'react';

export default function Pricing() {
  const [budget, setBudget] = useState(100);
  
  const smsNumber = Math.floor(budget / 0.05);
  const conversionNumber = Math.floor(smsNumber * 0.10);
  const revenueAmount = conversionNumber * 20;
  const roiPercent = Math.floor(((revenueAmount - budget) / budget) * 100);

  return (
    <section id="pricing" className="pricing py-[50px_20px_80px] text-center bg-transparent relative overflow-hidden w-full max-w-full">
      <h2 className="section-title scroll-reveal text-center text-5xl mb-[50px] text-[var(--color-black)] font-extrabold tracking-[-0.5px] relative z-10 max-w-[1400px] w-full mx-auto px-5 box-border">
        Calculez votre retour sur investissement
      </h2>
      
      <div className="roi-calculator scroll-reveal-scale max-w-[850px] w-full mx-auto bg-white/95 backdrop-blur-[10px] p-[35px_40px] rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] relative z-10 box-border">
        <div className="slider-container mb-[30px]">
          <label className="slider-label block text-[1.15em] mb-4 text-[#1a202c] font-semibold">
            Budget SMS : <strong className="text-[#667eea] text-[1.15em]" id="budgetDisplay">{budget}€</strong>
          </label>
          <input 
            type="range" 
            id="budgetSlider" 
            className="budget-slider w-full h-2 rounded-[10px] outline-none bg-[#ddd] appearance-none cursor-pointer relative transition-all duration-300"
            min="10" 
            max="200" 
            value={budget} 
            step="10"
            onChange={(e) => setBudget(parseInt(e.target.value))}
            style={{
              background: `linear-gradient(to right, #667eea 0%, #667eea ${((budget - 10) / (200 - 10)) * 100}%, #ddd ${((budget - 10) / (200 - 10)) * 100}%, #ddd 100%)`
            }}
          />
          <div className="slider-range flex justify-between mt-2.5 text-[#718096] text-[0.85em] font-medium">
            <span>10€</span>
            <span>200€</span>
          </div>
        </div>
        
        <div className="roi-results bg-transparent p-[30px_25px] rounded-2xl text-white mb-5 shadow-[0_10px_40px_rgba(102,126,234,0.3)]" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <div className="results-grid grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-5 text-center">
            <div className="result-item transition-transform duration-300 hover:-translate-y-1">
              <div className="result-label text-[0.85em] opacity-95 mb-2 font-medium">Nombre de SMS</div>
              <div className="result-value text-[1.8em] font-extrabold" id="smsCount">{smsNumber.toLocaleString('fr-FR').replace(/\s/g, ' ')}</div>
            </div>
            <div className="result-item transition-transform duration-300 hover:-translate-y-1">
              <div className="result-label text-[0.85em] opacity-95 mb-2 font-medium">Taux conversion (10%)</div>
              <div className="result-value text-[1.8em] font-extrabold" id="conversions">{conversionNumber.toLocaleString('fr-FR').replace(/\s/g, ' ')}</div>
            </div>
            <div className="result-item transition-transform duration-300 hover:-translate-y-1">
              <div className="result-label text-[0.85em] opacity-95 mb-2 font-medium">CA moyen/vente: 20€</div>
              <div className="result-value text-[1.8em] font-extrabold" id="revenue">{revenueAmount.toLocaleString('fr-FR').replace(/\s/g, ' ')}€</div>
            </div>
            <div className="result-item result-highlight transition-transform duration-300 hover:-translate-y-1 bg-white/25 p-4 rounded-xl backdrop-blur-[10px]">
              <div className="result-label text-[0.85em] opacity-95 mb-2 font-medium">💎 ROI</div>
              <div className="result-value text-[2.2em] text-[#ffd700] font-extrabold shadow-[0_2px_10px_rgba(0,0,0,0.2)]" id="roi">{roiPercent.toLocaleString('fr-FR').replace(/\s/g, ' ')}%</div>
            </div>
          </div>
        </div>
        
        <p className="roi-disclaimer text-center text-[#4a5568] text-[0.85em] italic leading-[1.5] m-0">
          * Calculs basés sur un taux de conversion moyen de 10% et un panier moyen de 20€
        </p>
      </div>
    </section>
  );
}

