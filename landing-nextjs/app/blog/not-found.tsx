import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <h2 className="text-6xl font-bold text-slate-900">404</h2>
      <h3 className="mt-4 text-2xl font-semibold">Post or Page Not Found</h3>
      <p className="mt-2 text-slate-600">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link
        href="/blog"
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Back to Blog
      </Link>
    </main>
  );
}
