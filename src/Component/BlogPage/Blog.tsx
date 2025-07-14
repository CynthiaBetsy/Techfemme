import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  published_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  cover_image: string | null;
  user: {
    name: string;
  };
  url: string;
}

const categories = ["All", "Career", "Technology", "Learning", "Community", "Success Stories"];

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://dev.to/api/articles?username=techfemme"); 
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) =>
          post.tag_list.includes(selectedCategory.toLowerCase())
        );

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
          <h1 className="text-4xl font-bold text-purple-800 mb-4">TechFemme Blog</h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Explore articles, stories, and tips that will help you grow in your tech journey.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex justify-center gap-3 mt-8 mb-8 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === selectedCategory ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Blog Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              className="rounded-xl overflow-hidden shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full flex flex-col">
                {post.cover_image && (
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-700 mb-4">{post.description}</p>
                  <div className="text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.user.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.reading_time_minutes} min read</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.published_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="mt-auto justify-between group hover:bg-primary/5"
                    onClick={() => window.open(post.url, "_blank")}
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
    </motion.div>
  );
};

export default Blog;
