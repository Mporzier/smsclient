'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "Ai-je besoin de compétences techniques pour utiliser l'IA ?",
      answer: "Aucune compétence technique n'est requise. Notre interface est conçue pour être aussi simple qu'une application de messagerie classique. Vous décrivez votre idée en quelques mots, l'IA rédige le message pour vous, et vous validez l'envoi. C'est accessible à tous, même si vous n'avez jamais fait de marketing."
    },
    {
      question: "Pourquoi le SMS est le canal de communication le plus efficace ?",
      answer: "Le SMS arrive directement dans la poche de vos clients, garantissant un taux de lecture bien supérieur à l'e-mail ou aux réseaux sociaux. Pour seulement 10€, vous touchez 100 personnes instantanément sans subir la complexité ni les coûts élevés des publicités Facebook ou Google. C'est l'outil le plus simple pour générer des ventes : une seule commande suffit souvent à rentabiliser votre envoi."
    },
    {
      question: "Qu'est-ce que le \"Nettoyage Inclus\" et pourquoi est-ce utile ?",
      answer: "Notre système vérifie la validité des numéros avant chaque envoi. Si un numéro est erroné ou n'existe plus, il est écarté pour vous éviter de payer pour un SMS qui ne sera jamais lu. 100% de votre budget arrive à destination."
    },
    {
      question: "Comment gérez-vous le RGPD et les désinscriptions ?",
      answer: "Nous automatisons la conformité légale. Pour vos messages commerciaux, la mention STOP est automatiquement ajoutée et les désinscriptions sont gérées sans action de votre part. Pour vos messages purement informatifs, cette mention n'est pas obligatoire et nous adaptons l'envoi selon la nature de votre campagne."
    },
    {
      question: "Mes fichiers clients sont-ils en sécurité ?",
      answer: "Vos données sont strictement confidentielles et cryptées. Nous ne revendons jamais vos fichiers et vous en restez l'unique propriétaire. Nos serveurs respectent les normes de sécurité européennes les plus strictes."
    },
    {
      question: "Y a-t-il un abonnement ou des frais cachés ?",
      answer: "Aucun abonnement, aucun frais d'entrée. Vous fonctionnez au crédit : vous achetez ce dont vous avez besoin (ex: 10€ pour 100 SMS). Vos crédits n'expirent pas et l'accès à l'IA rédactrice est inclus gratuitement."
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section w-full py-20 px-5 bg-transparent max-w-[900px] mx-auto">
      <h2 className="section-title scroll-reveal text-center text-5xl mb-[50px] text-[var(--color-black)] font-extrabold tracking-[-0.5px] relative z-10 max-w-[1400px] w-full mx-auto px-5 box-border">
        Questions fréquentes
      </h2>
      <div className="faq-container flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <div key={index} className={`faq-item scroll-reveal bg-white rounded-xl border border-black/8 overflow-hidden transition-all duration-[400ms] shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${activeIndex === index ? 'active' : ''}`}>
            <button 
              className={`faq-question w-full p-5 bg-transparent border-none text-left cursor-pointer flex justify-between items-center gap-4 text-[var(--color-black)] text-[1.05em] font-semibold transition-colors duration-300 ${activeIndex === index ? 'active text-[var(--primary)]' : ''} hover:text-[var(--primary)]`}
              onClick={() => toggleFaq(index)}
            >
              <span>{faq.question}</span>
              <svg 
                className={`faq-icon flex-shrink-0 transition-transform duration-[400ms] ${activeIndex === index ? 'rotate-180 text-[var(--primary)]' : 'text-[var(--color-black)]'}`}
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M6 9l4 4 4-4"></path>
              </svg>
            </button>
            <div className={`faq-answer overflow-hidden transition-all duration-500 ${activeIndex === index ? 'max-h-[500px] p-5 opacity-100' : 'max-h-0 p-0 opacity-0'}`}>
              <p className="text-[#6b7280] leading-[1.7] m-0 text-[0.95em]">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

