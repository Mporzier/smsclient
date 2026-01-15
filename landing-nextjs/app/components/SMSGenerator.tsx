'use client';

import { useState, useEffect } from 'react';

interface Templates {
  [key: string]: {
    [key: string]: string[];
  };
}

export default function SMSGenerator() {
  const [templates, setTemplates] = useState<Templates>({});
  const [campaignType, setCampaignType] = useState('promo');
  const [tone, setTone] = useState('friendly');
  const [includePromo, setIncludePromo] = useState(true);
  const [smsPreview, setSmsPreview] = useState('Cliquez sur "Générer le SMS" pour voir votre message...');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sendConfirmation, setSendConfirmation] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });
  const [lastTemplateIndex, setLastTemplateIndex] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetch('/templates.json')
      .then(response => response.json())
      .then(data => setTemplates(data))
      .catch(error => {
        console.error('Erreur lors du chargement des templates:', error);
        setTemplates({
          promo: {
            friendly: ["🎉 Hey {prenom} ! Offre spéciale : -30% avec le code {code} ! 🛍️"]
          }
        });
      });
  }, []);

  const generateSMS = () => {
    if (!templates || Object.keys(templates).length === 0) return;
    
    const templateList = templates[campaignType]?.[tone];
    if (!templateList || templateList.length === 0) return;

    const prenoms = ['Marie', 'Sophie', 'Julie', 'Emma', 'Laura', 'Léa', 'Chloé', 'Alice', 'Clara', 'Nina', 'Lucie', 'Camille', 'Sarah', 'Lisa'];
    const jours = ['dimanche', 'ce week-end', "aujourd'hui", 'demain', 'cette semaine', 'samedi', 'vendredi', 'ce soir', 'maintenant'];
    const codes = ['PROMO30', 'DEAL20', 'VIP25', 'HAPPY30', 'FLASH20', 'SAVE25', 'EXTRA15', 'SUPER40', 'BEST50', 'TOP35'];
    
    const comboKey = `${campaignType}-${tone}-${includePromo}`;
    const lastIndex = lastTemplateIndex[comboKey] ?? -1;
    
    let templateIndex;
    if (templateList.length === 1) {
      templateIndex = 0;
    } else {
      do {
        templateIndex = Math.floor(Math.random() * templateList.length);
      } while (templateIndex === lastIndex && templateList.length > 1);
    }
    
    const randomPrenom = prenoms[Math.floor(Math.random() * prenoms.length)];
    const randomJour = jours[Math.floor(Math.random() * jours.length)];
    const randomCode = codes[Math.floor(Math.random() * codes.length)];
    
    let sms = templateList[templateIndex]
      .replace('{prenom}', randomPrenom)
      .replace('{date}', randomJour)
      .replace('{code}', includePromo ? randomCode : '');
    
    if (!includePromo) {
      sms = sms.replace(/avec le code [A-Z0-9]+/gi, '')
                .replace(/Code[: ]*[A-Z0-9]+/gi, '')
                .replace(/\{code\}/g, '')
                .replace(/  +/g, ' ')
                .trim();
    }
    
    setLastTemplateIndex(prev => ({ ...prev, [comboKey]: templateIndex }));
    setSmsPreview(sms);
  };

  const sendSMS = () => {
    if (!smsPreview || smsPreview === 'Cliquez sur "Générer le SMS" pour voir votre message...') {
      setSendConfirmation({ message: "⚠️ Veuillez d'abord générer un SMS", type: 'error' });
      setTimeout(() => setSendConfirmation({ message: '', type: '' }), 3000);
      return;
    }
    
    if (!phoneNumber.trim()) {
      setSendConfirmation({ message: '⚠️ Veuillez entrer un numéro de téléphone', type: 'error' });
      setTimeout(() => setSendConfirmation({ message: '', type: '' }), 3000);
      return;
    }
    
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(phoneNumber)) {
      setSendConfirmation({ message: '⚠️ Numéro de téléphone invalide', type: 'error' });
      setTimeout(() => setSendConfirmation({ message: '', type: '' }), 3000);
      return;
    }
    
    setSendConfirmation({ message: '✅ SMS envoyé !', type: 'success' });
    setTimeout(() => setSendConfirmation({ message: '', type: '' }), 3000);
  };

  const charCount = smsPreview === 'Cliquez sur "Générer le SMS" pour voir votre message...' ? 0 : smsPreview.length;

  return (
    <section className="sms-generator py-[70px_20px] bg-white w-full max-w-full overflow-hidden">
      <h2 className="section-title scroll-reveal text-center text-5xl mb-[50px] text-[var(--color-black)] font-extrabold tracking-[-0.5px] relative z-10 max-w-[1400px] w-full mx-auto px-5 box-border mb-9">
        Testez gratuitement un SMS généré par IA
      </h2>
      
      <div className="generator-container max-w-[1000px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-9 box-border">
        <div className="generator-panel scroll-reveal-left bg-white p-9 rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 w-full max-w-full box-border hover:shadow-[0_15px_50px_rgba(0,0,0,0.12)]">
          <h3 className="panel-title mb-8 text-[#1a202c] text-[1.4em] font-bold flex items-center gap-2.5">
            ⚙️ Paramètres
          </h3>
          
          <div className="form-group mb-6">
            <label className="form-label block mb-2.5 font-semibold text-[#2d3748] text-[0.95em]">Type de campagne</label>
            <select 
              id="campaignType" 
              className="form-select w-full p-[14px_16px] border-2 border-[#e2e8f0] rounded-xl text-base text-[#2d3748] bg-white transition-all duration-300 cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'24\\' height=\\'24\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'%23667eea\\' stroke-width=\\'2\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\'%3E%3Cpolyline points=\\'6 9 12 15 18 9\\'%3E%3C/polyline%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center] bg-[length:20px] pr-[45px] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]"
              value={campaignType}
              onChange={(e) => setCampaignType(e.target.value)}
            >
              <option value="promo">🎉 Promotion / Soldes</option>
              <option value="birthday">🎂 Anniversaire client</option>
              <option value="cart">🛒 Panier abandonné</option>
              <option value="vip">💎 Invitation VIP</option>
              <option value="newproduct">🆕 Nouveau produit</option>
            </select>
          </div>
          
          <div className="form-group mb-6">
            <label className="form-label block mb-2.5 font-semibold text-[#2d3748] text-[0.95em]">Ton du message</label>
            <select 
              id="tone" 
              className="form-select w-full p-[14px_16px] border-2 border-[#e2e8f0] rounded-xl text-base text-[#2d3748] bg-white transition-all duration-300 cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'24\\' height=\\'24\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'%23667eea\\' stroke-width=\\'2\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\'%3E%3Cpolyline points=\\'6 9 12 15 18 9\\'%3E%3C/polyline%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center] bg-[length:20px] pr-[45px] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="friendly">😊 Amical</option>
              <option value="professional">💼 Professionnel</option>
              <option value="urgent">⚡ Urgent</option>
              <option value="exclusive">✨ Exclusif</option>
            </select>
          </div>
          
          <div className="form-group mb-6">
            <label className="checkbox-container flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                id="includePromo" 
                checked={includePromo}
                onChange={(e) => setIncludePromo(e.target.checked)}
                className="form-checkbox w-6 h-6 cursor-pointer accent-[#667eea]"
              />
              <span className="checkbox-label font-medium text-[#2d3748] cursor-pointer">Inclure un code promo</span>
            </label>
          </div>
          
          <button 
            onClick={generateSMS}
            className="btn-generate w-full bg-transparent text-white p-4 rounded-xl text-[1.1em] font-bold cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(102,126,234,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(102,126,234,0.4)] active:translate-y-0"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            ✨ Générer le SMS
          </button>
        </div>
        
        <div className="generator-panel preview-panel scroll-reveal-right bg-white p-9 rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 w-full max-w-full box-border hover:shadow-[0_15px_50px_rgba(0,0,0,0.12)] border-2 border-[#e2e8f0]">
          <div className="preview-header flex justify-between items-center mb-5">
            <h3 className="text-[#667eea] text-[1.3em] font-bold m-0">📱 Prévisualisation</h3>
            <span id="charCount" className="char-count text-[#718096] text-[0.9em] font-medium">{charCount}/160 caractères</span>
          </div>
          
          <div className="preview-box bg-white p-6 rounded-xl min-h-[160px] border-2 border-dashed border-[#cbd5e0] relative mb-5">
            <span className="sms-badge absolute top-3 right-3 bg-transparent text-white p-[6px_12px] rounded-lg text-[0.8em] font-bold shadow-[0_2px_8px_rgba(102,126,234,0.3)]" style={{ backgroundColor: 'var(--primary)' }}>SMS</span>
            <p id="smsPreview" className="preview-text font-mono leading-[1.7] text-[#2d3748] whitespace-pre-wrap text-[0.95em] pr-[70px] transition-opacity duration-200">{smsPreview}</p>
          </div>
          
          <div className="preview-tip p-4 bg-white rounded-[10px] border-l-4 border-[#2196f3]">
            <p className="m-0 text-[0.9em] text-[#1976d2] leading-[1.6]">
              <strong>💡 Astuce :</strong> Les SMS de moins de 160 caractères ont un meilleur taux d'engagement.
            </p>
          </div>
          
          <div className="action-section mt-6 flex gap-4 items-end">
            <div className="phone-input-container flex-1">
              <label htmlFor="phoneNumber" className="phone-label block text-[0.9em] font-semibold text-[#2d3748] mb-2">📱 Numéro de téléphone</label>
              <input 
                type="tel" 
                id="phoneNumber" 
                className="phone-input w-full p-[14px_16px] border-2 border-[#e2e8f0] rounded-[10px] text-base text-[#2d3748] bg-white transition-all duration-300 focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] placeholder:text-[#a0aec0]"
                placeholder="06 12 34 56 78"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <button 
              onClick={sendSMS}
              className="btn-regenerate-full bg-transparent text-white p-[14px_30px] border-none rounded-[10px] text-base font-semibold cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(102,126,234,0.3)] whitespace-nowrap hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(102,126,234,0.4)]"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              📤 Envoyer
            </button>
          </div>
          {sendConfirmation.message && (
            <div className={`send-confirmation mt-4 p-[15px_20px] rounded-[10px] text-center font-semibold text-base transition-all duration-300 ${sendConfirmation.type === 'success' ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700'}`}>
              {sendConfirmation.message}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

