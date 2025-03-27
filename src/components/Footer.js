const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto text-center">
          {/* Links to Terms and Conditions & Privacy Policy */}
          <div className="mb-4">
            <a href="/terms" className="text-gray-400 hover:text-white mx-4">Terms and Conditions</a> {/* Added margin-right */}
            <a href="/privacy" className="text-gray-400 hover:text-white mx-4">Privacy Policy</a> {/* Added margin-left */}
          </div>
  
          {/* Contact Us */}
          <div>
            <p className="text-gray-400">Contact us: <a href="mailto:contact@grocerygauge.com" className="text-white hover:text-blue-400">contact@grocerygauge.com</a></p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;