import { getPostData, getSortedPostsData } from "@/lib/posts";
import { notFound } from "next/navigation";

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

  // 1. Fetch data outside the return statement
  let post;
  try {
    post = await getPostData(slug);
  } catch (error) {
    // This will trigger the Next.js 404 page
    notFound();
  }

  // 2. Return JSX cleanly without a try/catch wrapping it
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <article className="prose prose-slate lg:prose-xl mx-auto">
        <header className="not-prose mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
            {post.title}
          </h1>
          <time className="text-slate-500 text-sm">{post.date}</time>
        </header>

        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </main>
  );
}
