
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import BlogCard from "./BlogCard";

const BlogPreviewSection = () => {
  // Get only the first 3 blog posts for the preview
  const previewPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest from Our Blog</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tips, strategies, and insights to help you optimize your links and improve your marketing campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {previewPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild className="bg-blinkly-purple hover:bg-blinkly-purple/90">
            <Link to="/blog" className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              Read All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
