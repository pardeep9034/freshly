import React from "react";
import PrintableBill from "../Shared/BillFormat";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const features = [
    {
      title: "Fresh Inventory",
      description: "Keep track of the freshest vegetables with real-time updates.",
      icon: "🛒",
    },
    {
      title: "Easy Management",
      description: "Simplified stock and price management for store owners.",
      icon: "📋",
    },
    {
      title: "User-Friendly Interface",
      description: "Enjoy a seamless experience with an intuitive design.",
      icon: "✨",
    },
    {
      title: "Analytics Dashboard",
      description: "Gain insights with sales tracking and performance metrics.",
      icon: "📊",
    },
  ];

  const testimonials = [
    {
      name: "John Doe",
      feedback: "Freshly has revolutionized the way I manage my store. It's simple and effective!",
      role: "Store Manager",
    },
    {
      name: "Jane Smith",
      feedback: "I love the analytics dashboard. It helps me track sales and plan ahead.",
      role: "Owner",
    },
    {
      name: "Mark Lee",
      feedback: "This tool is a must-have for any vegetable store. Highly recommended!",
      role: "Employee",
    },
  ];

  const faqs = [
    {
      question: "How do I add inventory?",
      answer: "Log in as a store manager and navigate to the inventory section to add or update stocks.",
    },
    {
      question: "Can employees update prices?",
      answer: "No, only store managers have access to update prices and manage stock details.",
    },
    {
      question: "What is the analytics dashboard?",
      answer: "The dashboard provides insights into sales, performance metrics, and more to help you manage your store effectively.",
    },
    {
      question: "Is Freshly mobile-friendly?",
      answer: "Yes, Freshly is fully responsive and works seamlessly across all devices.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div
  className="relative flex items-center justify-center bg-fixed"
  style={{
    minHeight: "100vh",
    backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9)), url('bg.jpg')",
    backgroundSize: "cover",
    // backgroundPosition: "center",
  }}
>
  {/* Content */}
 <div className="relative text-center text-white px-6 flex flex-col items-center justify-center h-screen">
    <h1
      className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg animate-typing"
      style={{
        fontFamily: "'Poppins', sans-serif",
        letterSpacing: "0.15rem",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
    >
      <span className="inline-block w-full">
        Freshly
      </span>
    </h1>
    <p
      className="text-lg md:text-2xl mb-8 font-medium drop-shadow-md animate-slideIn"
      style={{
        maxWidth: "600px",
        lineHeight: "1.6",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      Managing Freshness, One Veggie at a Time. 
      <br />
      Discover the freshest produce today.
    </p>
    <button
      className="px-8 py-3 bg-gradient-to-r from-green-500 to-purple-600 text-white font-semibold text-lg md:text-xl rounded-full shadow-md hover:scale-105 transform transition-transform duration-300"
      style={{
        letterSpacing: "0.1rem",
      }}
      type="submit"
      onClick={() => {
        navigate("/login");
      }}
    >
      Get Started
    </button>
  </div>

  {/* Optional Subtle Animation for Background */}
  <div
    className="absolute inset-0"
    style={{
      background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
      animation: "pulse 8s infinite",
    }}
  ></div>
</div>


      {/* Features Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-6 sm:px-12 lg:px-20 text-center">
          <h2 className="text-4xl font-extrabold mb-6">Key Features</h2>
          <p className="text-lg text-gray-300 mb-8">
            Explore how Freshly makes managing your store easier and more efficient.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md hover:bg-opacity-20 transition-all duration-300"
                style={{ backdropFilter: "blur(10px)" }}
              >
                <div className="text-5xl text-purple-300 mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="container mx-auto px-6 sm:px-12 lg:px-20 text-center">
          <h2 className="text-4xl font-extrabold mb-6">What Our Users Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg">
                <p className="italic mb-4">"{testimonial.feedback}"</p>
                <h3 className="font-semibold">{testimonial.name}</h3>
                <span className="text-sm text-gray-300">{testimonial.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100 text-gray-800">
        <div className="container mx-auto px-6 sm:px-12 lg:px-20">
          <h2 className="text-4xl font-extrabold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="font-semibold text-xl mb-2">{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <div className="container mx-auto px-6 sm:px-12 lg:px-20">
          <h2 className="text-4xl font-extrabold mb-6">Contact Us</h2>
          <p className="mb-8">Have questions or need help? We're here to assist you.</p>
          <form className="max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full mb-4 p-4 bg-gray-800 text-white rounded-lg"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full mb-4 p-4 bg-gray-800 text-white rounded-lg"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full mb-4 p-4 bg-gray-800 text-white rounded-lg"
            ></textarea>
            <button className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg">
              Send Message
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default Home;
