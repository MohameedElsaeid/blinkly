
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface BlogFeaturedProps {
  post: BlogPost;
}

const BlogFeatured: React.FC<BlogFeaturedProps> = ({ post }) => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gray-900 text-white">
      <div className="absolute inset-0 z-0">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-gray-900/40" />
      </div>
      
      <div className="relative z-10 p-6 md:p-10 flex flex-col h-full min-h-[400px] justify-end">
        <div className="mb-4">
          <span className="inline-block bg-alchemy-purple/90 text-white text-sm font-medium px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>
        
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-3">
          {post.title}
        </h2>
        
        <p className="text-gray-200 mb-6 max-w-2xl line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="h-10 w-10 rounded-full border-2 border-white mr-3"
            />
            <span className="font-medium">{post.author.name}</span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readingTime}</span>
            </div>
          </div>
          
          <Button asChild className="ml-auto bg-alchemy-purple hover:bg-alchemy-purple-dark">
            <Link to={`/blog/${post.slug}`} className="flex items-center">
              Read article <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogFeatured;
