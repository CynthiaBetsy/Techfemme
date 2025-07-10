import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Before TechFemme, I was stuck watching tutorials with no direction. Now, I’ve built my first React project and even contributed to open source!",
    name: "Amina Yusuf",
    title: "Frontend Developer",
    avatar: "https://img.freepik.com/premium-photo/generative-ai-black-middle-aged-businesswoman-posing-isolated-background_108985-3533.jpg",
  },
  {
    quote:
      "I started as a Virtual Assistant with no tech background. TechFemme’s learning path helped me transition into digital marketing confidently.",
    name: "Ruth Adebayo",
    title: "Virtual Assistant turned Digital Marketer",
    avatar: "https://stock.pincel.app/wp-content/uploads/2023/11/00154-Professional_headshot_of_a_young_black_woman_with_straight_black_hair_a_corporate_lawyer_in_a_classic_navy_suit.jpg",
  },
  {
    quote:
      "TechFemme helped me turn my passion for storytelling into a career. I now write SEO content for startups and tech blogs.",
    name: "Ngozi Chukwu",
    title: "Content Writer",
    avatar: "https://randomuser.me/api/portraits/women/62.jpg",
  },
  {
    quote:
      "As a graphic designer, I always felt left out of tech. TechFemme showed me how design fits into tech and boosted my confidence.",
    name: "Zainab Ibrahim",
    title: "Graphics Designer",
    avatar: "https://photoai.com/cdn-cgi/image/format%3Djpeg%2Cfit%3Dcover%2Cwidth%3D1024%2Cheight%3D1536%2Cquality%3D85/https%3A//r2-us-west.photoai.com/1726227079-4780ec5cadfe8e4eecab7d8ccc00c35d-3.png",
  },
  {
    quote:
      "Thanks to TechFemme, I built my first landing page and now freelance as a web designer. I never thought I could code!",
    name: "Chisom Nwankwo",
    title: "Web Designer",
    avatar: "https://img.freepik.com/premium-photo/portrait-happy-black-woman-smile-fashion-style-with-afro-isolated-against-studio-pink-background-face-casual-female-person-excited-confident-beauty-happiness_590464-167783.jpg",
  },
  {
    quote:
      "TechFemme connected me with a mentor who believed in me. I'm now redesigning websites and charging what I’m worth.",
    name: "Fatima Bello",
    title: "UI/UX Designer",
    avatar: "https://img.freepik.com/premium-photo/portrait-smiling-black-cute-young-woman_484921-98668.jpg",
  },
  {
    quote:
      "Every time I doubted myself, TechFemme reminded me that I belong. Today, I build digital products that solve real problems.",
    name: "Tari Okoro",
    title: "Digital Marketer",
    avatar: "https://cdn.prod.website-files.com/5fd2ba952bcd68835f2c8254/65a5cf3ebf8d7e43e8c77962_ai-generated-headshot-example.webp ",
  },
];

                                                                             
const TestimonialsCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[index];

  // Auto-play every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [total]);

  const prev = () => setIndex((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setIndex((i) => (i === total - 1 ? 0 : i + 1));

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold text-center text-purple-800 mb-12">
        Testimonials from Our Community
      </h2>

      <div className="relative bg-white rounded-xl shadow-md p-10 max-w-3xl mx-auto transition-all duration-500">
        <p className="text-lg text-gray-800 italic mb-6">“{current.quote}”</p>

        <div className="flex items-center gap-4">
          <img
            src={current.avatar}
            alt={current.name}
            className="w-14 h-14 rounded-full object-cover"
            loading="lazy"
          />
          <div>
            <p className="font-semibold text-purple-900">{current.name}</p>
            <p className="text-sm text-purple-700">{current.title}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            aria-label="Previous testimonial"
            onClick={prev}
            className="p-2 rounded-full bg-purple-200 hover:bg-purple-300 transition"
          >
            <ChevronLeft className="w-6 h-6 text-purple-700" />
          </button>
          <button
            aria-label="Next testimonial"
            onClick={next}
            className="p-2 rounded-full bg-purple-200 hover:bg-purple-300 transition"
          >
            <ChevronRight className="w-6 h-6 text-purple-700" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition ${
                i === index ? "bg-purple-600" : "bg-purple-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
