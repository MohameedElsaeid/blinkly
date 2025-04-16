import React, {useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import {getBlogPostBySlug, getRelatedPosts} from "@/data/blogPosts";
import {ArrowLeft, Bookmark, Calendar, Clock, Share2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";
import {generateStructuredData, SEO} from "@/utils/seo";
import {OptimizedImage} from "@/components/OptimizedImage";

const BlogPost = () => {
    const {slug} = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const post = getBlogPostBySlug(slug || "");
    const relatedPosts = post ? getRelatedPosts(post.id, post.category, 2) : [];

    useEffect(() => {
        if (!post) {
            navigate("/blog", {replace: true});
        }

        window.scrollTo(0, 0);
    }, [post, navigate, slug]);

    if (!post) {
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <SEO
                title={post.title}
                description={post.excerpt}
                image={post.coverImage}
                url={`https://blinkly.app/blog/${post.slug}`}
                type="article"
                article={{
                    publishedTime: post.publishedAt,
                    tags: [post.category],
                }}
                structuredData={generateStructuredData.blogPost(post)}
            />

            <Navbar/>

            <main className="flex-grow">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {/* Back to blog link */}
                    <Link
                        to="/blog"
                        className="inline-flex items-center text-alchemy-purple hover:underline mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2"/>
                        Back to all articles
                    </Link>

                    {/* Post header */}
                    <div className="mb-8">
                        <div className="mb-4">
              <span
                  className="inline-block bg-alchemy-purple/10 text-alchemy-purple text-sm font-medium px-3 py-1 rounded-full">
                {post.category}
              </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            {post.title}
                        </h1>

                        <p className="text-gray-600 text-lg mb-6">
                            {post.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center space-x-3 text-sm text-gray-500">
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1"/>
                                    <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1"/>
                                    <span>{post.readingTime}</span>
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                    <Share2 className="h-4 w-4 mr-2"/>
                                    Share
                                </Button>
                                <Button size="sm" variant="outline">
                                    <Bookmark className="h-4 w-4 mr-2"/>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Featured image */}
                    <div className="mb-10">
                        <OptimizedImage
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-auto rounded-xl"
                            width={1200}
                            height={600}
                            priority={true}
                        />
                    </div>

                    {/* Post content */}
                    <div className="prose prose-lg max-w-none mb-12">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>

                    <Separator className="my-10"/>

                    {/* Related posts */}
                    {relatedPosts.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {relatedPosts.map((relatedPost) => (
                                    <BlogCard key={relatedPost.id} post={relatedPost}/>
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </main>

            <Footer/>
        </div>
    );
};

export default BlogPost;
