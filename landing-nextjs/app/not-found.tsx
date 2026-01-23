import Link from "next/link";

export default function NotFound() {
  return (
    /* We use min-h with a calculation. 
       If your header + footer roughly take up 400px together, 
       this ensures the 404 area fills the rest perfectly.
    */
    <main className="flex flex-col items-center justify-center min-h-[70vh] py-20 px-6 text-center bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-50/50 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Stylized Error Code */}
        <div className="relative inline-block mb-4">
          <span className="text-[10rem] md:text-[14rem] font-black text-fuchsia-50 leading-none select-none">
            404
          </span>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-fuchsia-600">
              Page introuvable
            </h2>
          </div>
        </div>

        <p className="max-w-md mx-auto text-lg text-gray-600 mb-10 leading-relaxed">
          Oups ! Il semblerait que le lien soit rompu ou que la page ait été
          déplacée.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-4 bg-fuchsia-900 text-white rounded-2xl font-bold hover:bg-fuchsia-800 transition-all active:scale-95 shadow-[0_15px_30px_-10px_rgba(112,26,117,0.3)]"
          >
            Retour à l&apos;accueil
          </Link>

          <Link
            href="/blog"
            className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all"
          >
            Explorer le blog
          </Link>
        </div>
      </div>
    </main>
  );
}
