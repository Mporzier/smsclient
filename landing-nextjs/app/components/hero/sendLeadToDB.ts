import { supabase } from "@/lib/supabase";

export async function sendLeadToDB(phoneNumber: string, smsText: string) {
  if (!supabase) {
    throw new Error(
      "Configuration Supabase manquante. Vérifiez les variables d'environnement."
    );
  }

  // 1. Validation de base (commence par 06 ou 07 et fait 10 chiffres)
  const cleanNumber = phoneNumber.replace(/\s+/g, "");
  const frenchMobileRegex = /^(06|07)\d{8}$/;

  if (!frenchMobileRegex.test(cleanNumber)) {
    throw new Error("Format invalide (06/07 uniquement) 📱");
  }

  // 2. Formatage international pour la base de données
  const formattedPhone = "+33" + cleanNumber.substring(1);

  // 3. Envoi à Supabase
  const { error } = await supabase.from("leads").insert([
    {
      phone_number: formattedPhone,
      message: smsText,
      source: "landing_widget",
    },
  ]);

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error("Erreur lors de l'enregistrement ❌");
  }

  return { success: true };
}
