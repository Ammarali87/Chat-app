export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-400 text-gray-800 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {year} Chat App. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-600">Terms</a>
            <a href="#" className="hover:text-gray-600">Privacy</a>
            <a href="#" className="hover:text-gray-600">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}