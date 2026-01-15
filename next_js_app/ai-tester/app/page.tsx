"use client";
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Home() {
  const [formData, setFormData] = useState({
    product_name: "",
    offer: "",
    link: ""
  });
  const [smsResult, setSmsResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSMS = async () => {
    setLoading(true);
    // Ensure the function name matches your supabase/functions folder name
    const { data, error } = await supabase.functions.invoke('gemini-api', {
      body: formData,
    });

    if (error) {
      setSmsResult("Error: " + error.message);
    } else {
      // Accessing .sms because your function returns { sms: resultText }
      setSmsResult(data.sms || "No SMS generated");
    }
    setLoading(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <h1 className="text-2xl font-bold mb-2 text-slate-800">SMS Marketer AI</h1>
        <p className="text-slate-500 mb-6 text-sm">Générez des messages percutants en un clic.</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Produit</label>
            <input
              name="product_name"
              className="w-full p-2.5 border rounded-lg text-black focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="ex: Sneakers Air Max"
              onChange={handleInput}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Offre</label>
            <input
              name="offer"
              className="w-full p-2.5 border rounded-lg text-black focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="ex: -50% jusqu'à minuit"
              onChange={handleInput}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Lien</label>
            <input
              name="link"
              className="w-full p-2.5 border rounded-lg text-black focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="ex: bit.ly/promo-sneakers"
              onChange={handleInput}
            />
          </div>

          <button
            onClick={generateSMS}
            disabled={loading || !formData.product_name}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-all disabled:bg-slate-300"
          >
            {loading ? "Génération..." : "Créer l'SMS 🚀"}
          </button>
        </div>

        {smsResult && (
          <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100 relative">
            <span className="absolute -top-3 left-4 bg-indigo-600 text-white text-[10px] px-2 py-1 rounded uppercase font-bold">
              Résultat
            </span>
            <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap italic">
              &quot;{smsResult}&quot;
            </p>
            <div className="mt-2 text-[10px] text-slate-400 text-right">
              {smsResult.length} / 160 caractères
            </div>
          </div>
        )}
      </div>
    </main>
  );
}