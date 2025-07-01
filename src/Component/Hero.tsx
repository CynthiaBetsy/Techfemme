import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AboutPics from "../assets/Techfemme pic.jpg";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
} as const;

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut" as const,
      duration: 0.8,
    },
  },
} as const;

const Hero = () => {
  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate("/regform");
  };

  return (
    <section className="relative py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-purple-400 to-pink-400 text-white overflow-hidden">
      <motion.div
        className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <motion.div className="max-w-xl space-y-6" variants={item}>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Empowering the Next Generation of Women in Tech
          </h1>
          <p className="text-lg md:text-xl font-medium opacity-90">
            Inclusive mentorship, community support, and growth for every woman.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={handleRegisterClick}
              className="inline-flex items-center gap-2 bg-white bg-opacity-90 text-purple-700 font-semibold py-3 px-5 rounded-lg shadow-lg hover:bg-opacity-100 transition cursor-pointer"
              aria-label="Join the Academy"
            >
              Join TechFemme <ChevronRight size={18} />
            </button>
            <a
              href="#courses"
              className="inline-flex items-center gap-2 border border-white border-opacity-80 text-white font-semibold py-3 px-5 rounded-lg hover:bg-purple-300 hover:bg-opacity-20 transition cursor-pointer"
              aria-label="Explore Courses"
            >
              Explore Courses <ChevronRight size={18} />
            </a>
          </div>
        </motion.div>
        <motion.div className="max-w-lg w-full" variants={item} aria-hidden="true">
          <img
            src={AboutPics}
            alt="Diverse women coding collaboratively"
            className="rounded-3xl shadow-xl object-cover w-full aspect-[4/3]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
