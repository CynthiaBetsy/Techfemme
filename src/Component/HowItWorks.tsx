import { ClipboardCheck, UserCheck, Users } from "lucide-react";

const steps = [
  {
    icon: UserCheck,
    title: "Sign Up",
    description: "Create your free Techfemme account to get started.",
  },
  {
    icon: ClipboardCheck,
    title: "Choose a Path",
    description: "Pick from learning tracks tailored to your goals.",
  },
  {
    icon: Users,
    title: "Join the Community",
    description: "Connect with mentors and peers for support and growth.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto bg-purple-50 rounded-xl mt-12">
      <h2 className="text-3xl font-extrabold text-purple-800 text-center mb-12">
        How It Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-4xl mx-auto text-center">
        {steps.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md"
            tabIndex={0}
            aria-label={`${title} step`}
          >
            <Icon className="w-14 h-14 text-purple-500 mb-4 mx-auto" />
            <h3 className="font-semibold text-xl text-purple-900 mb-3">{title}</h3>
            <p className="text-purple-700">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;