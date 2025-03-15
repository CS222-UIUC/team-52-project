import { useState } from "react";

const About = () => {
  // State for contact form
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (for now, just log it)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent! We’ll get back to you soon.");
    setFormData({ name: "", email: "", message: "" }); // Reset form
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-8">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">About Us</h1>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center max-w-5xl bg-white p-8 rounded-lg shadow-lg">
        {/* Left Side - Text */}
        <div className="md:w-1/2 text-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p>
            Grocery Gauge helps shoppers track grocery price inflation and find the best deals across different stores. 
            Our goal is to make budgeting easier by providing real-time price comparisons and historical trends.
          </p>
        </div>

        {/* Right Side - Images */}
        <div className="md:w-1/2 flex justify-center">
          <img src="/images/grocery1.jpg" alt="Grocery Items" className="w-40 h-40 object-cover rounded-lg m-2" />
          <img src="/images/grocery2.jpg" alt="Shopping Cart" className="w-40 h-40 object-cover rounded-lg m-2" />
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-12 max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 mb-4 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 mb-4 rounded"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="border p-2 mb-4 rounded h-24"
            required
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default About;