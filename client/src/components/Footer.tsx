export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-primary font-bold text-lg">AltChain</h2>
            <p className="text-gray-400 text-sm mt-1">AI-Powered Global Sourcing</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <a href="#" className="text-gray-600 hover:text-primary text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-primary text-sm">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-primary text-sm">Contact Us</a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} AltChain. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
