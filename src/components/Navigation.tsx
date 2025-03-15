
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpenText, Brain, PenLine } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 h-full w-20 bg-sidebar shadow-md z-10 flex flex-col items-center py-8">
      <div className="mb-8 text-primary">
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link flex flex-col items-center justify-center w-14 h-14 ${
                    isActive ? 'active' : ''
                  }`
                }
              >
                <BookOpenText size={24} />
                <span className="text-xs mt-1">Entries</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>View all journal entries</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Get AI insights from your journal</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                to="/new"
                className={({ isActive }) =>
                  `nav-link flex flex-col items-center justify-center w-14 h-14 ${
                    isActive ? 'active' : ''
                  }`
                }
              >
                <PenLine size={24} />
                <span className="text-xs mt-1">Create</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Create a new journal entry</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </nav>
  );
};

export default Navigation;
