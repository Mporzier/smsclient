import { createClient } from "@supabase/supabase-js";

// Récupération des variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Check your .env.local"
  );
}

// Initialisation du client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
