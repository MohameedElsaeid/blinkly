
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, className }) => {
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md ${className}`}>
      <Link to={`/blog/${post.slug}`}>
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      </Link>
      
      <CardHeader className="p-4 pb-0">
        <div className="mb-2">
          <span className="inline-block bg-alchemy-purple/10 text-alchemy-purple text-xs font-medium px-2.5 py-0.5 rounded">
            {post.category}
          </span>
        </div>
        <Link to={`/blog/${post.slug}`} className="group">
          <h3 className="text-xl font-bold group-hover:text-alchemy-purple transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <p className="text-gray-600 text-sm line-clamp-3">
          {post.excerpt}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src={post.author.avatar} 
            alt={post.author.name} 
            className="h-6 w-6 rounded-full"
          />
          <span className="text-sm text-gray-700">{post.author.name}</span>
        </div>
        
        <div className="flex items-center space-x-3 text-xs text-gray-500">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{post.readingTime}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
