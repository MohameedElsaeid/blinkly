
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogFeatured from "@/components/blog/BlogFeatured";
import BlogCard from "@/components/blog/BlogCard";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  // Get the most recent post for the featured section
  const featuredPost = blogPosts[0];
  // Get all other posts
  const remainingPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Blog | Blinkly - URL Shortener & Link Management</title>
        <meta
          name="description"
          content="Read the latest articles on URL shortening, link management, and digital marketing strategies from the Blinkly team."
        />
      </Helmet>

      <Navbar />

      <main className="flex-grow">
        <section className="bg-gray-50 py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-16">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                Blinkly Blog
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Insights, tips, and strategies for URL shortening, link management, and digital marketing.
              </p>
            </div>

            {/* Featured post */}
            <div className="mb-16">
              <BlogFeatured post={featuredPost} />
            </div>

            {/* All blog posts grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {remainingPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
