export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    category: string;
    author: {
        name: string;
        avatar: string;
    };
    publishedAt: string;
    readingTime: string;
}
