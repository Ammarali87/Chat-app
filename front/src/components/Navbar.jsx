import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext'; 

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const { authUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');  
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="relative z-50">
      <div className="flex items-center justify-between p-4 bg-gray-100 text-white shadow-md rounded-xl m-2 font-semibold">
        <h1 className="text-xl text-violet-900/66">Navbar</h1>

        <ul className="hidden sm:flex gap-6 text-sm font-semibold text-violet-900/66">
          <li className="hover:underline cursor-pointer">Home</li>
          <li className="hover:underline cursor-pointer">About</li>
          <li className="hover:underline cursor-pointer">Contact</li>
          {authUser ? (
            <>
              <li className="hover:underline cursor-pointer" onClick={() => navigate('/profile')}>Profile</li>
              <li className="hover:underline cursor-pointer" onClick={handleLogout}>Logout</li>
            </>
          ) : (
            <li className="hover:underline cursor-pointer" onClick={() => navigate('/login')}>Login</li>
          )}
        </ul>

        <button
          className="sm:hidden text-violet-900"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 right-0 w-1/2 h-full bg-white shadow-lg flex flex-col items-start p-4 gap-4 text-violet-900/80 transition-transform duration-300 sm:hidden"
        >
          <p className="text-lg mx-auto font-bold mb-2">Menu</p>

          <button
            className="sm:hidden mt-[-22px] text-violet-900"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <ul className="flex flex-col gap-4 text-base w-full">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">About</li>
            <li className="hover:underline cursor-pointer">Contact</li>
            {authUser ? (
              <>
                <li className="hover:underline cursor-pointer" onClick={() => navigate('/profile')}>Profile</li>
                <li className="hover:underline cursor-pointer" onClick={handleLogout}>Logout</li>
              </>
            ) : (
              <li className="hover:underline cursor-pointer" onClick={() => navigate('/login')}>Login</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
