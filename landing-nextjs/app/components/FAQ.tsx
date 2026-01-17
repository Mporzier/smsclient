'use client';

import React, { useState } from 'react';

const faqData = [
    {
        question: "Ai-je besoin de compétences techniques pour utiliser l'IA ?",
        answer: "Aucune compétence technique n'est requise. Notre interface est conçue pour être aussi simple qu'une application de messagerie classique. Vous décrivez votre idée en quelques mots, l'IA rédige le message pour vous, et vous validez l'envoi. C'est accessible à tous, même si vous n'avez jamais fait de marketing."
    },
    {
        question: "Pourquoi le SMS est le canal de communication le plus efficace ?",
        answer: "Le SMS arrive directement dans la poche de vos clients, garantissant un taux de lecture bien supérieur à l'e-mail ou aux réseaux sociaux. Pour seulement 10€, vous touchez 100 personnes instantanément sans subir la complexité ni les coûts élevés des publicités Facebook ou Google. C'est l'outil le plus simple pour générer des ventes."
    },
    {
        question: "Qu'est-ce que le 'Nettoyage Inclus' et pourquoi est-ce utile ?",
        answer: "Notre système vérifie la validité des numéros avant chaque envoi. Si un numéro est erroné ou n'existe plus, il est écarté pour vous éviter de payer pour un SMS qui ne sera jamais lu. 100% de votre budget arrive à destination."
    },
    {
        question: "Comment gérez-vous le RGPD et les désinscriptions ?",
        answer: "Nous automatisons la conformité légale. Pour vos messages commerciaux, la mention STOP est automatiquement ajoutée et les désinscriptions sont gérées sans action de votre part. Pour vos messages purement informatifs, cette mention n'est pas obligatoire."
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
                            className="w-full flex items-center justify-between p-5 text-left font-medium text-gray-800 hover:bg-gray-50 transition-colors"
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
                                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                            >
                                <path d="M6 9l4 4 4-4"></path>
                            </svg>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
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