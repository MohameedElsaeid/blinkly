
import { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Ultimate Guide to URL Shortening",
    slug: "ultimate-guide-url-shortening",
    excerpt: "Learn how URL shortening works and why it's essential for modern digital marketing strategies.",
    content: `
# The Ultimate Guide to URL Shortening

URL shortening has become an essential tool in modern digital marketing. This guide will walk you through everything you need to know about URL shortening, from how it works to why it's important.

## What is URL Shortening?

URL shortening is the process of reducing the length of a URL while still directing users to the intended page. This is typically done using a redirect on a short domain name.

## Why Use URL Shorteners?

1. **Improved aesthetics** - Long URLs can look messy and take up too much space.
2. **Better tracking** - Most URL shorteners offer analytics to track clicks and user engagement.
3. **Social media optimization** - Platforms like Twitter have character limits, making shorter URLs necessary.
4. **Enhanced user experience** - Short URLs are easier to share, remember, and type.

## How Blinkly Makes URL Shortening Better

Blinkly offers a comprehensive URL shortening solution with advanced features like:

- Custom branded links
- Detailed analytics
- QR code generation
- Link expiration options
- Password protection for links

Start using Blinkly today to take your URL management to the next level!
`,
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070",
    category: "Marketing",
    author: {
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    publishedAt: "2025-04-02",
    readingTime: "5 min read",
  },
  {
    id: "2",
    title: "Maximize Your Social Media Reach with Short Links",
    slug: "maximize-social-media-reach-short-links",
    excerpt: "Discover how using shortened URLs can significantly boost your social media engagement and click-through rates.",
    content: `
# Maximize Your Social Media Reach with Short Links

In the fast-paced world of social media, every character counts. Learn how shortened URLs can boost your engagement and improve campaign effectiveness.

## The Problem with Long URLs

Social media platforms often limit your character count, and long URLs can eat up valuable space that could be used for your message. Additionally, lengthy URLs appear unprofessional and can deter users from clicking.

## Benefits of Short Links on Social Media

1. **Save character space** - Use more of your limited characters for your actual message
2. **Improve appearance** - Create cleaner, more professional-looking posts
3. **Track performance** - Gain insights into which platforms drive the most traffic
4. **A/B test campaigns** - Create multiple short links to test different approaches
5. **Enhance cross-platform consistency** - Maintain brand identity across different channels

## Best Practices for Using Short Links

- Use custom branded domains for increased trust
- Include UTM parameters for better analytics
- Create memorable links when possible
- Always test your links before posting
- Monitor performance and adjust your strategy accordingly

Short links are a simple yet powerful tool for any social media marketer. Start implementing them today to see improved results in your campaigns!
`,
    coverImage: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=2074",
    category: "Social Media",
    author: {
      name: "Sarah Martinez",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    publishedAt: "2025-03-28",
    readingTime: "4 min read",
  },
  {
    id: "3",
    title: "QR Codes: The Bridge Between Physical and Digital Marketing",
    slug: "qr-codes-bridge-physical-digital-marketing",
    excerpt: "Explore how QR codes connected to short links can transform your offline marketing and create seamless customer experiences.",
    content: `
# QR Codes: The Bridge Between Physical and Digital Marketing

QR codes have revolutionized how businesses connect their physical and digital marketing efforts. This article explores how to effectively implement QR codes in your marketing strategy.

## The QR Code Renaissance

After a period of limited adoption, QR codes have made a dramatic comeback, particularly following the COVID-19 pandemic when contactless options became essential. Today's smartphones come with built-in QR code scanning capabilities, eliminating the need for special apps.

## Benefits of Using QR Codes with Short Links

1. **Trackable offline marketing** - Measure the effectiveness of print materials
2. **Seamless user experience** - No need to type long URLs
3. **Enhanced engagement** - Connect physical items to digital experiences
4. **Versatility** - Can be used on packaging, business cards, billboards, etc.
5. **Dynamic content** - Update the destination without changing the QR code

## Creative Ways to Use QR Codes

- Restaurant menus that link to detailed dish information
- Product packaging that connects to usage tutorials
- Business cards linking to full portfolios
- Event posters connecting to registration pages
- In-store displays linking to online exclusives

## Design Tips for Effective QR Codes

- Ensure sufficient contrast between the code and background
- Include a clear call-to-action near the code
- Test the code in different lighting conditions
- Don't make the code too small
- Consider using custom branded QR codes for better brand recognition

QR codes and short links together create a powerful tool for bridging the gap between your physical and digital marketing efforts.
`,
    coverImage: "https://images.unsplash.com/photo-1623282033815-40b05d96c903?q=80&w=2070",
    category: "Marketing",
    author: {
      name: "David Chen",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    publishedAt: "2025-03-15",
    readingTime: "6 min read",
  },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRecentPosts = (count: number = 3): BlogPost[] => {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count);
};

export const getRelatedPosts = (currentPostId: string, category: string, count: number = 2): BlogPost[] => {
  return blogPosts
    .filter(post => post.id !== currentPostId && post.category === category)
    .slice(0, count);
};
