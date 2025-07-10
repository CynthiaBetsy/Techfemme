import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "../Component/ui/Card";
import { Button } from "../Component/ui/Button";

// Types
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Breaking Into Tech: A Complete Guide for Beginners",
    excerpt: "Discover the essential steps to start your journey in technology, from choosing your first programming language to landing your first job.",
    content: "Starting a career in technology can feel overwhelming, but with the right roadmap, anyone can succeed...",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Career"
  },
  {
    id: "2",
    title: "Why Women Should Lead the Future of AI",
    excerpt: "Exploring the importance of diversity in artificial intelligence and how women can shape the future of technology.",
    content: "Artificial Intelligence is reshaping our world, and it's crucial that diverse voices lead this transformation...",
    author: "Dr. Amina Hassan",
    date: "2024-01-12",
    readTime: "6 min read",
    category: "Technology"
  },
  {
    id: "3",
    title: "Building Your First Portfolio: Tips That Actually Work",
    excerpt: "Learn how to create a portfolio that stands out to employers and showcases your skills effectively.",
    content: "Your portfolio is often the first impression you make on potential employers...",
    author: "Emily Chen",
    date: "2024-01-10",
    readTime: "5 min read",
    category: "Learning"
  },
  {
    id: "4",
    title: "The Power of Community in Tech Learning",
    excerpt: "How joining tech communities can accelerate your learning and open doors to new opportunities.",
    content: "Learning to code doesn't have to be a solo journey. In fact, the most successful developers...",
    author: "Priya Sharma",
    date: "2024-01-08",
    readTime: "7 min read",
    category: "Community"
  },
  {
    id: "5",
    title: "Remote Work Skills Every Tech Professional Needs",
    excerpt: "Master the essential skills for thriving in remote tech roles and building a successful distributed career.",
    content: "The tech industry has embraced remote work like no other, but succeeding remotely requires...",
    author: "Lisa Rodriguez",
    date: "2024-01-05",
    readTime: "9 min read",
    category: "Career"
  },
  {
    id: "6",
    title: "From Bootcamp to Big Tech: Success Stories",
    excerpt: "Real stories from graduates who transitioned from coding bootcamps to positions at major tech companies.",
    content: "The path from bootcamp to big tech isn't always straightforward, but these inspiring stories show...",
    author: "Michelle Kim",
    date: "2024-01-03",
    readTime: "12 min read",
    category: "Success Stories"
  }
];

const Blog = () => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-purple-100 via-purple-50 to-pink-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-purple-800 mb-4">
            TechFemme Blog
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Explore articles, stories, and tips that will help you grow in your tech journey.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="h-full flex flex-col justify-between">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-purple-900">{post.title}</h3>
                  <p className="text-sm text-gray-600">{post.excerpt}</p>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="text-xs text-gray-500 mb-2">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-between group hover:bg-primary/5"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-white/50 backdrop-blur-sm py-16 px-6 md:px-12 lg:px-24">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Updated with Our Latest Posts
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Get weekly insights, career tips, and tech trends delivered straight to your inbox.
            Join our community of learners and professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Button className="px-8 py-3">
              Subscribe
            </Button>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Blog;
