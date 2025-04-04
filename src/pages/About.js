import { useState } from "react";
<<<<<<< HEAD
import styles from './About.module.css';
const About = () => {
  // State for contact form
=======
import React from 'react';

function About() {

  //  State for contact form
>>>>>>> b847cf93c8cdbe35edfcd85ec77df36ff6ea1f32
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

<<<<<<< HEAD
  return (
    <div className={styles.container}>
      {/* Title */}
      <h1 className={styles.title}>About Us</h1>
=======
>>>>>>> b847cf93c8cdbe35edfcd85ec77df36ff6ea1f32

  return (
    <div>
      {/* <section className = "py-4 bg-info">
        <div className ="container">
          <div className = "row">
            <div className = "col-md-4 my-auto">
              <h4> About Us </h4>
            </div>
            <div className = "col-md-8 my-auto">
              <h6 className = "float-end">
                Home / About Us
              </h6>
            </div>
          </div>
        </div>
      </section> */}

      <section className= "section bg-light border-bottom">
        <div className = "container">
          <div>
          <h5 className = "main-heading">Our Mission</h5>
          <div className = 'underline'></div>
          </div>
          <p>
          Grocery Gauge helps shoppers track grocery price inflation and find the best deals across different stores. Our goal is to make budgeting easier by providing real-time price comparisons and historical trends.
          </p>
        </div>
<<<<<<< HEAD
      
         {/*Possible group photo insert here, 
         -
         -
         under mission statement*/}
=======
      </section>

      <section className="section">
  <div className="container-fluid">
    <div className="card shadow" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6 border-right">
            <h6>Contact Us</h6>
            <hr />
            {/* Wrap the form fields in a form tag and connect it to handleSubmit */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="mb-1">Message</label>
                <textarea
                  name="message"
                  className="form-control"
                  placeholder="Enter Message"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="form-group py-3">
                <button type="submit" className="btn btn-primary shadow w-100">
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Our Info */}
          <div className="col-md-6 border-start">
            <h5 className="main-heading">Our Info</h5>
            <div className="underline"></div>

            <p>Email: grocery-gauge@email.com</p>
            <p>Phone: +1-111-111-1111</p>
          </div>
        </div>
>>>>>>> b847cf93c8cdbe35edfcd85ec77df36ff6ea1f32
      </div>
    </div>
  </div>
</section>

    </div>
    
  )
}

// const About = () => {
//   // State for contact form
//   const [formData, setFormData] = useState({ name: "", email: "", message: "" });

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission (for now, just log it)
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     alert("Message sent! We’ll get back to you soon.");
//     setFormData({ name: "", email: "", message: "" }); // Reset form
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col items-center p-8">
//       {/* Title */}
//       <h1 className="text-4xl font-bold mb-6">About Us</h1>

//       {/* Main Content */}
//       <div className="flex flex-col md:flex-row items-center max-w-5xl bg-white p-8 rounded-lg shadow-lg">
//         {/* Left Side - Text */}
//         <div className="md:w-1/2 text-gray-700">
//           <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
//           <p>
//             Grocery Gauge helps shoppers track grocery price inflation and find the best deals across different stores. 
//             Our goal is to make budgeting easier by providing real-time price comparisons and historical trends.
//           </p>
//         </div>

//         {/* Right Side - Images */}
//         <div className="md:w-1/2 flex justify-center">
//           <img src="/images/grocery1.jpg" alt="Grocery Items" className="w-40 h-40 object-cover rounded-lg m-2" />
//           <img src="/images/grocery2.jpg" alt="Shopping Cart" className="w-40 h-40 object-cover rounded-lg m-2" />
//         </div>
//       </div>

//       {/* Contact Form */}
//       <div className="mt-12 max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col">
//           <input
//             type="text"
//             name="name"
//             placeholder="Your Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="border p-2 mb-4 rounded"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Your Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="border p-2 mb-4 rounded"
//             required
//           />
//           <textarea
//             name="message"
//             placeholder="Your Message"
//             value={formData.message}
//             onChange={handleChange}
//             className="border p-2 mb-4 rounded h-24"
//             required
//           />
//           <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
//             Send Message
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

export default About;