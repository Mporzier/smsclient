import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface PostData {
  slug: string;
  title: string;
  date: string;
  description?: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), "posts");

// Keep this for your blog listing page (it's fast and synchronous)
export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...(data as Omit<PostData, "slug" | "content">),
    } as PostData;
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// ADD THIS: New async function for the individual post page
export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  // Combine the data with the slug and contentHtml
  return {
    slug,
    content: contentHtml,
    ...(data as Omit<PostData, "slug" | "content">),
  } as PostData;
}
