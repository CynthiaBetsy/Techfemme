import CommunityPics from "../assets/CommunityPics.jpg"
const JoinCommunity = () => {
    return (
      <section
        id="join"
        className="py-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto bg-white rounded-xl shadow-md mt-1 flex flex-col md:flex-row items-center gap-12"
      >
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-purple-800 mb-6">
            Join Our Community
          </h2>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed max-w-md">
            Connect with fellow learners, mentors, and industry leaders on our WhatsApp group and mailing list.
          </p>
          <a
            href="https:/wa.me/+2349030828658" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-800 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition"
            aria-label="Join WhatsappCommunity"
          >
            Join WhatsApp
          </a>
        </div>
        <img
          src={CommunityPics}
          alt="Community discussion"
          className="rounded-3xl shadow-xl max-w-lg w-full object-cover"
          aria-hidden="true"
        />
      </section>
    );
  };
  
  export default JoinCommunity;
  