export default function Features() {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" x2="12" y1="2" y2="22"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
      title: "Rentabilité Immédiate",
      description: "Envoyez 100 SMS pour seulement 10€. Un SMS à 0,10€ peut générer un panier à 20€ : votre campagne est rentable dès la première vente."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      ),
      title: "Ciblage Client Précis",
      description: "Ne parlez qu'aux bons clients. Créez des groupes (ex: \"VIP\", \"Inactifs\") pour multiplier vos conversions par 3 avec des offres qui les concernent vraiment."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
        </svg>
      ),
      title: "Envoi Flash ou Planifié",
      description: "Envoyez une promo en 30 secondes ou programmez-la pour les heures de pointe. 98% de vos messages sont lus dans les 90 secondes suivant la réception."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      ),
      title: "Nettoyage Inclus",
      description: "Évitez de payer pour rien. Notre système vérifie la validité des numéros avant l'envoi pour garantir que 100% de votre budget arrive à destination."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
          <path d="M20 3v4"></path>
          <path d="M22 5h-4"></path>
          <path d="M4 17v2"></path>
          <path d="M5 18H3"></path>
        </svg>
      ),
      title: "IA Rédactrice Intégrée",
      description: "Panne d'inspiration ? L'IA écrit vos messages de vente à votre place. Générez des messages percutants qui donnent envie de cliquer en un instant."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" x2="12" y1="15" y2="3"></line>
        </svg>
      ),
      title: "Importation en 1 Clic",
      description: "Glissez-déposez votre fichier client (Excel, CRM) et commencez à communiquer avec votre base en moins de 2 minutes."
    }
  ];

  return (
    <section id="features" className="w-full py-10 px-4 flex flex-col items-center bg-transparent">
      <h2 className="section-title scroll-reveal text-center text-5xl mb-[50px] text-[var(--color-black)] font-extrabold tracking-[-0.5px] relative z-10 max-w-[1400px] w-full mx-auto px-5 box-border">
        Transformez vos SMS en ventes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {features.map((feature, index) => (
          <div key={index} className="scroll-reveal" style={{ opacity: 1, transform: 'none' }}>
            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border p-0 w-full shadow-none border-none max-w-md mx-auto min-h-[200px]">
              <div className="group relative rounded-[inherit] p-0 min-h-[200px]">
                <div 
                  className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-60 duration-300 group-hover:opacity-100"
                  style={{
                    background: 'radial-gradient(200px circle at -200px -200px, #6B4DB8, #C85A8B, var(--border) 100%)'
                  }}
                />
                <div className="absolute inset-px rounded-[inherit] bg-background" />
                <div 
                  className="pointer-events-none absolute inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    opacity: 0.8,
                    background: 'radial-gradient(200px at -200px -200px, rgba(217, 217, 217, 0.333), transparent 100%)'
                  }}
                />
                <div className="relative">
                  <div className="@container/card-header auto-rows-min grid-rows-[auto_auto] has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 p-6 pb-2 flex flex-row items-center gap-3">
                    <div className="rounded-full bg-muted p-2">
                      <div className="w-6 h-6 text-primary">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="font-semibold text-lg">{feature.title}</div>
                  </div>
                  <div className="p-6 pt-2 text-muted-foreground text-sm">
                    {feature.description.split(' : ').map((part, i, arr) => 
                      i === arr.length - 1 ? (
                        <span key={i}><strong>{part}</strong></span>
                      ) : (
                        <span key={i}>{part} : </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

