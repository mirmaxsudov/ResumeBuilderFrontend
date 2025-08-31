"use client";

import React from "react";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  Eye, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Bookmark,
  Tag
} from "lucide-react";

interface BlogPost {
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    title: string;
    avatar: string;
    bio: string;
  };
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  views: string;
  featured: boolean;
}

interface BlogPostContentProps {
  post: BlogPost;
}

const BlogPostContent = ({ post }: BlogPostContentProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-8 border-b border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <Link
            href={`/blog/category/${post.category.toLowerCase().replace(' ', '-')}`}
            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full hover:bg-blue-200 transition-colors"
          >
            {post.category}
          </Link>
          {post.featured && (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
              Featured
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>

        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(post.publishDate)}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {post.readTime}
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              {post.views} views
            </div>
          </div>

          {/* Social Share */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Share:</span>
            <button
              onClick={() => handleShare('facebook')}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-50 rounded-full transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="p-2 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </button>
            <button
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
              aria-label="Bookmark article"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div 
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* Tags */}
      <div className="px-8 pb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Tag className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Tags:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag.toLowerCase().replace(' ', '-')}`}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Author */}
      <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {post.author.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {post.author.title}
            </p>
            <p className="text-sm text-gray-700">
              {post.author.bio}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostContent;
