const paths = [
  {
    title: "Frontend Development",
    description:
      "Build engaging user interfaces with HTML, CSS, JavaScript, and React.",
  },
  {
    title: "Backend Development",
    description:
      "Master server-side programming, databases, and APIs with Node.js and more.",
  },
  {
    title: "Product Design",
    description:
      "Learn to create intuitive and beautiful user experiences and interfaces.",
  },
  {
    title: "Data Analytics",
    description:
      "Analyze and visualize data to make data-driven decisions using Python and SQL.",
  },
  {
    title: "Tech Career Prep",
    description:
      "Prepare for interviews, build portfolios, and develop career strategies.",
  },
];

const Courses = () => {
  return (
    <section
      id="courses"
      className="py-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto bg-purple-50 rounded-xl mt-12"
    >
      <h2 className="text-3xl font-extrabold text-center text-purple-800 mb-12">
        Learning Paths
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-7xl mx-auto">
        {paths.map(({ title, description }) => (
          <div
            key={title}
            className="border border-purple-200 rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition cursor-pointer bg-white"
            tabIndex={0}
            aria-label={`Explore ${title} courses`}
          >
            <div>
              <h3 className="text-xl font-semibold text-purple-900 mb-3">
                {title}
              </h3>
              <p className="text-purple-700 text-sm">{description}</p>
            </div>
            <button
              type="button"
              className="mt-6 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-semibold transition"
            >
              Explore
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;