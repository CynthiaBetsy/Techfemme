import { Twitter, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";
import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";

// Newsletter Component
function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }
  };

  return (
    <div className="relative py-10 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-purple-400 to-pink-400 py-10 sm:py-14 lg:py-15">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight text-white">
              Subscribe to our newsletter
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Want product news and updates? Sign up for our newsletter below.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 outline-white focus:ring-2 focus:ring-white/75"
              />
              <button
                onClick={handleSubscribe}
                className="bg-white hover:bg-purple-200 text-purple-400 font-medium py-2 px-4 rounded-md cursor-pointer transition duration-200 ease-in-out"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>

          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CalendarDaysIcon aria-hidden="true" className="size-6 text-white" />
              </div>
              <dt className="mt-4 text-base font-semibold text-white">Weekly articles</dt>
              <dd className="mt-2 text-base/7 text-white">
                Get insightful articles weekly—no fluff, just valuable content to keep you informed and inspired
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <HandRaisedIcon aria-hidden="true" className="size-6 text-white" />
              </div>
              <dt className="mt-4 text-base font-semibold text-white">No spam</dt>
              <dd className="mt-2 text-base/7 text-white">
                We respect your inbox—only meaningful updates, no unnecessary emails.
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
    </div>
  );
}

// Footer Component
const Footer = () => {
  return (
    <footer className="mt-0 bg-purple-200 rounded-t-3xl">
      <Newsletter />
      <div className="py-12 px-6 md:px-12 lg:px-24 text-purple-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-x-6 text-sm font-medium">
            <a href="#aboutPage" className="hover:underline">About</a>
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
        <div className="text-center text-xs mt-8 text-purple-400 select-none">
          &copy; {new Date().getFullYear()} Techfemme Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
