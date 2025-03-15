
import { NavLink } from 'react-router-dom';
import { BookOpenText, Brain, PenLine, Star, Rocket } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 h-full w-20 bg-sidebar shadow-md z-10 flex flex-col items-center py-8">
      <div className="mb-8 text-accent">
        <Star className="w-8 h-8" />
        <Rocket className="w-6 h-6 mt-1 ml-1" />
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
                end
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
