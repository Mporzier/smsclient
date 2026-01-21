import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

export default function BlogHome() {
  const posts = getSortedPostsData();

  return (
    <main className="max-w-2xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-8">My Blog</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <Link
              href={`/blog/${post.slug}`}
              className="text-xl font-semibold text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-gray-500 text-sm">{post.date}</p>
            <p className="mt-2 text-gray-700">{post.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
