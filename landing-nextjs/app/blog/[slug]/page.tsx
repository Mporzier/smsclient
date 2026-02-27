import { getPostData, getSortedPostsData } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";

// Force static generation to avoid performance measurement issues
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostData(slug);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <article className="max-w-4xl mx-auto px-6">
        {/* Navigation & Metadata */}
        <div className="mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-fuchsia-900 hover:text-fuchsia-700 transition-colors mb-8 group"
          >
            <svg
              className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Retour au blog
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-600 bg-fuchsia-50 px-3 py-1 rounded-full">
              Guide Expert
            </span>
            <span className="text-gray-300">•</span>
            <time
              className="text-sm text-gray-500 font-medium"
              dateTime={post.date}
            >
              {post.date}
            </time>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
            {post.title}
          </h1>

          {/* Optional: Add a brief abstract/description if available */}
          {post.description && (
            <p className="text-xl text-gray-600 leading-relaxed italic border-l-4 border-fuchsia-100 pl-6">
              {post.description}
            </p>
          )}
        </div>

        {/* Featured Image Placeholder */}
        <div className="aspect-[21/9] w-full bg-gradient-to-br from-fuchsia-50 to-slate-100 rounded-3xl mb-16 overflow-hidden flex items-center justify-center border border-gray-100 shadow-sm">
          <span className="text-fuchsia-200 font-black text-6xl select-none">
            SMS CLIENT
          </span>
        </div>

        {/* Content Section */}
        <div
          className="prose max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h3:text-fuchsia-900 prose-p:text-gray-600 prose-a:text-fuchsia-600 prose-a:font-medium prose-a:underline prose-a:underline-offset-2 prose-a:decoration-fuchsia-200 hover:prose-a:text-fuchsia-800 prose-strong:text-gray-900 prose-strong:font-semibold prose-li:text-gray-600 prose-img:rounded-2xl prose-img:shadow-lg"
        >
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Bottom CTA / Newsletter */}
        <div className="mt-20 p-8 md:p-12 bg-fuchsia-900 rounded-[2.5rem] text-white overflow-hidden relative group">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Prêt à transformer votre marketing SMS ?
            </h3>
            <p className="text-fuchsia-100 mb-8 max-w-xl text-lg">
              Rejoignez des centaines d&apos;entreprises qui utilisent SMS
              Client pour booster leur engagement.
            </p>
            <button className="bg-white text-fuchsia-900 px-8 py-3 rounded-xl font-bold hover:bg-fuchsia-50 transition-all active:scale-95 shadow-xl">
              Commencer gratuitement
            </button>
          </div>
          {/* Decorative background circle */}
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-fuchsia-800 rounded-full blur-3xl opacity-50 transition-transform group-hover:scale-110" />
        </div>
      </article>
    </main>
  );
}
