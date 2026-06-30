import { getAllPostIds } from "@/lib/firestore";
import type { MetadataRoute } from "next";

const BASE_URL = "https://policyhub.kr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostIds();

  const postEntries: MetadataRoute.Sitemap = posts.map(({ id, updatedAt }) => ({
    url: `${BASE_URL}/posts/${id}`,
    lastModified: updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/posts`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...postEntries,
  ];
}
