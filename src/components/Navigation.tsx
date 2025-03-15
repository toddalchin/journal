
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpenText, Brain, PenLine } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 h-full w-20 bg-white shadow-md z-10 flex flex-col items-center py-8">
      <div className="mb-8 text-journal-purple">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-10 h-10"
        >
          <path d="M12 2L2 7l10 5l10-5l-10-5z" />
          <path d="M2 17l10 5l10-5" />
          <path d="M2 12l10 5l10-5" />
        </svg>
      </div>

      <div className="flex flex-col items-center space-y-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-link flex flex-col items-center justify-center w-14 h-14 ${
              isActive ? 'active' : ''
            }`
          }
        >
          <BookOpenText size={24} />
          <span className="text-xs mt-1">Journal</span>
        </NavLink>
        
        <NavLink
          to="/insight"
          className={({ isActive }) =>
            `nav-link flex flex-col items-center justify-center w-14 h-14 ${
              isActive ? 'active' : ''
            }`
          }
        >
          <Brain size={24} />
          <span className="text-xs mt-1">Insight</span>
        </NavLink>
        
        <NavLink
          to="/new"
          className={({ isActive }) =>
            `nav-link flex flex-col items-center justify-center w-14 h-14 ${
              isActive ? 'active' : ''
            }`
          }
        >
          <PenLine size={24} />
          <span className="text-xs mt-1">New</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
