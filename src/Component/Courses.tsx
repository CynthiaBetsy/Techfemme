import React, { useState } from "react";

// Types
interface SubscriptionPlan {
  title: string;
  courses: string;
  price: number;
  discounted?: number;
  isBundle?: boolean;
}

const subscriptionPlans: SubscriptionPlan[] = [
    {
    title: "🛠 Career Builder",
    courses: "Resume Writing, LinkedIn Optimization, Freelance Skills, Interview Prep",
    price: 12000,
    discounted: 9000,
  },
  {
    title: "📢 Tech Marketing",
    courses: "SEO, Social Media Strategy, Content Marketing, Analytics, Branding",
    price: 18000,
    discounted: 13000,
  },
  {
    title: "🧠 Starter Developer",
    courses: "HTML, CSS, JavaScript Basics, Git & GitHub, Building First Portfolio",
    price: 15000,
  },
  {
    title: "💻 Frontend Pro",
    courses: "React, Responsive Design, UI Libraries, APIs, State Management, Hosting",
    price: 25000,
    discounted: 20000,
  },
  

  {
    title: "🌟 All Access Pro",
    courses: "All 4 categories + mentorship + certificate + community support",
    price: 90000,
    discounted: 65000,
    isBundle: true,
  },
];

const bankDetails = {
  accountName: "TechFemme Academy",
  bankName: "First Bank of Nigeria",
  accountNumber: "1234567890",
  whatsappLink: "https://wa.me/2349030828658?text=Hi%2C%20I%20just%20made%20a%20payment%20for%20TechFemme%20courses.%20Here%20is%20my%20proof%20of%20payment%3A"
};

const PricingCard: React.FC<SubscriptionPlan> = ({ title, courses, price, discounted, isBundle }) => {
  const [showBank, setShowBank] = useState(false);

  return (
    <div
      className={`border rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition bg-white ${isBundle ? "border-2 border-purple-600" : "border-purple-200"}`}
    >
      <div>
        <h3 className="text-xl font-semibold text-purple-900 mb-3">{title}</h3>
        <p className="text-purple-700 text-sm mb-4">{courses}</p>
        <div className="text-lg font-bold text-purple-800">
          {discounted ? (
            <>
              <span className="line-through mr-2 text-gray-500">₦{price.toLocaleString()}</span>
              <span className="text-green-600">₦{discounted.toLocaleString()}</span>
            </>
          ) : (
            <>₦{price.toLocaleString()}</>
          )}
        </div>
      </div>

      {!showBank && (
        <button
          onClick={() => setShowBank(true)}
          className="mt-4 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-semibold transition"
        >
          Pay Now
        </button>
      )}

      {showBank && (
        <div className="mt-6 text-sm text-purple-800 bg-purple-50 p-4 rounded-md">
          <p className="mb-1 font-semibold">Pay via Bank Transfer:</p>
          <p><strong>Account Name:</strong> {bankDetails.accountName}</p>
          <p><strong>Bank Name:</strong> {bankDetails.bankName}</p>
          <p><strong>Account Number:</strong> {bankDetails.accountNumber}</p>

          <a
            href={bankDetails.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 text-center py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold transition"
          >
            Send Proof of Payment on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
};

const SubscriptionPlans: React.FC = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto bg-white rounded-xl">
      <h2 className="text-3xl font-extrabold text-center text-purple-500 mb-12">
        Available Courses
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {subscriptionPlans.map((plan) => (
          <PricingCard key={plan.title} {...plan} />
        ))}
      </div>
    </section>
  );
};

export default SubscriptionPlans;
