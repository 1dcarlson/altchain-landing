export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-primary font-bold text-lg">AltChain</h2>
            <p className="text-gray-700 text-sm mt-1 font-medium">AI-Powered Global Sourcing</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <a href="/privacy-policy" className="text-gray-800 hover:text-primary text-sm font-medium">Privacy Policy</a>
            <a href="/terms-of-service" className="text-gray-800 hover:text-primary text-sm font-medium">Terms of Service</a>
            <a href="/contact" className="text-gray-800 hover:text-primary text-sm font-medium">Contact Us</a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-700 text-sm font-medium">
          &copy; {new Date().getFullYear()} AltChain. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
