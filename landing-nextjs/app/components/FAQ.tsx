"use client";

import React, { useState } from "react";

const faqData = [
  {
    question:
      "Pourquoi le SMS est le canal de communication le plus efficace ?",
    answer:
      "Le SMS arrive directement dans la poche de vos clients, garantissant un taux de lecture bien supérieur à l'e-mail ou aux réseaux sociaux. Pour seulement 10€, vous touchez 100 personnes instantanément sans subir la complexité ni les coûts élevés des publicités Facebook ou Google. C'est l'outil le plus simple pour générer des ventes.",
  },
  {
    question: "Combien de temps faut-il pour envoyer ma première campagne ?",
    answer:
      "Moins de 2 minutes. Importez vos clients, laissez l'IA rédiger votre message et cliquez sur envoyer. C'est immédiat, sans configuration complexe ni délai d'attente.",
  },
  {
    question: "Pourquoi ne pas simplement utiliser mon forfait mobile ?",
    answer:
      "L'envoi manuel est chronophage et limite votre portée : vous perdez un temps précieux avec un risque élevé d'oublier des contacts, sans aucune visibilité sur la réception. Notre solution automatise vos campagnes en un clic avec un suivi de délivrance précis.",
  },
  {
    question:
      "Je ne sais pas quel message écrire à mes clients, comment faire ?",
    answer:
      "C'est tout l'intérêt de notre IA : elle rédige pour vous des SMS percutants en quelques secondes. Choisissez simplement votre objectif (promo, relance, etc.), le ton du message (urgent, chaleureux, etc.), et validez l'envoi. C'est aussi simple qu'une application de messagerie, sans aucune compétence technique ou marketing requise.",
  },
  {
    question: "Y a-t-il un abonnement ou des frais cachés ?",
    answer:
      "Aucun abonnement, aucun frais d'entrée. Vous fonctionnez au crédit : vous achetez ce dont vous avez besoin (ex: 10€ pour 100 SMS). Vos crédits n'expirent pas et l'accès à l'IA rédactrice est inclus gratuitement.",
  },
  {
    question: "Qu'est-ce que le 'Nettoyage Inclus' et pourquoi est-ce utile ?",
    answer:
      "Notre système vérifie la validité des numéros avant chaque envoi. Si un numéro est erroné ou n'existe plus, il est écarté pour vous éviter de payer pour un SMS qui ne sera jamais lu. 100% de votre budget arrive à destination.",
  },
  {
    question: "Comment gérez-vous le RGPD et les désabonnements (STOP) ?",
    answer:
      "Nous automatisons tout : la mention STOP est ajoutée et gérée sans action de votre part sur vos envois commerciaux (elle n'est pas obligatoire pour vos messages informatifs). C'est une opportunité pour votre business : en éliminant les contacts inactifs, vous ne payez que pour les clients engagés, ce qui maximise la rentabilité de chaque envoi.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
        Questions fréquentes
      </h2>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 bg-white shadow-sm"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex items-center justify-between p-5 text-left font-medium text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer"
              aria-expanded={openIndex === index}
            >
              <span>{item.question}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                <path d="M6 9l4 4 4-4"></path>
              </svg>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
