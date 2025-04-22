import { Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 md:px-12 lg:px-24 bg-blue-400 text-purple-200 mt-20 rounded-t-3xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-x-6 text-sm font-medium">
          <a href="#about" className="hover:underline">About</a>
          <a href="#courses" className="hover:underline">Courses</a>
          <a href="#join" className="hover:underline">Community</a>
          <a href="mailto:contact@techfemmeacademy.org" className="hover:underline">Contact</a>
        </div>
        <div className="flex gap-6">
          <a
            href="https://twitter.com/techfemme"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Twitter"
            className="hover:text-white"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://linkedin.com/company/techfemme"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="LinkedIn"
            className="hover:text-white"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://instagram.com/techfemme"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Instagram"
            className="hover:text-white"
          >
            <Instagram size={20} />
          </a>
        </div>
      </div>
      <div className="text-center text-xs mt-8 text-purple-300 select-none">
        &copy; {new Date().getFullYear()} Techfemme Academy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;