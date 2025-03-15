
import { useState } from 'react';

interface TagProps {
  label: string;
  type: 'emotion' | 'context';
  selected?: boolean;
  onClick?: () => void;
}

export const Tag = ({ label, type, selected = false, onClick }: TagProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const baseClass = `tag ${type === 'emotion' ? 'tag-emotion' : 'tag-context'}`;
  const selectedClass = selected ? 'ring-2 ring-offset-1 ring-opacity-50' : '';
  const hoverClass = isHovered && onClick ? 'scale-105' : '';
  
  return (
    <span
      className={`${baseClass} ${selectedClass} ${hoverClass} cursor-${onClick ? 'pointer' : 'default'}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </span>
  );
};
