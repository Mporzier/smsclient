import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

export default function BlogHome() {
  const posts = getSortedPostsData();

  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-fuchsia-900 tracking-tight mb-4">
            Blog & Ressources
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Conseils d&apos;experts, guides stratégiques et actualités sur le
            marketing mobile pour booster l&apos;engagement de vos clients.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group relative flex flex-col bg-white border border-gray-100 rounded-3xl p-2 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(112,26,117,0.1)] hover:-translate-y-1"
            >
              {/* Optional: Placeholder for an image if you add them later */}
              <div className="aspect-[16/9] w-full bg-fuchsia-50 rounded-2xl overflow-hidden mb-4 relative">
                <div className="absolute inset-0 flex items-center justify-center text-fuchsia-200 font-bold text-4xl">
                  SMS
                </div>
              </div>

              <div className="px-4 pb-6 flex flex-col flex-grow">
                {/* Date & Category */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-fuchsia-600 bg-fuchsia-50 px-2 py-0.5 rounded">
                    Stratégie
                  </span>
                  <time
                    className="text-xs text-gray-400 font-medium"
                    dateTime={post.date}
                  >
                    {post.date}
                  </time>
                </div>

                {/* Title */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="group-hover:text-fuchsia-900 transition-colors"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-3 leading-snug">
                    {post.title}
                  </h2>
                </Link>

                {/* Description */}
                <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                  {post.description}
                </p>

                {/* Read More Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-sm font-bold text-fuchsia-900 group/link"
                >
                  Lire l&apos;article
                  <svg
                    className="ml-1.5 w-4 h-4 transition-transform group-hover/link:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
