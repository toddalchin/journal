
import { useState } from 'react';
import { Tag } from '@/components/Tag';
import { Input } from '@/components/ui/input';
import { PlusCircle } from 'lucide-react';

interface TagSelectorProps {
  title: string;
  tags: string[];
  selectedTags: string[];
  presetTags: string[];
  onTagToggle: (tag: string) => void;
  onAddCustomTag: (tag: string) => void;
  type: 'emotion' | 'context';
}

const TagSelector = ({
  title,
  tags,
  selectedTags,
  presetTags,
  onTagToggle,
  onAddCustomTag,
  type
}: TagSelectorProps) => {
  const [customTag, setCustomTag] = useState('');
  
  const handleAddCustomTag = () => {
    if (customTag.trim() && !tags.includes(customTag.trim())) {
      onAddCustomTag(customTag.trim());
      setCustomTag('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomTag();
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-md font-medium">{title}</h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {presetTags.map((tag) => (
          <Tag
            key={tag}
            label={tag}
            type={type}
            selected={selectedTags.includes(tag)}
            onClick={() => onTagToggle(tag)}
          />
        ))}
      </div>
      
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Add custom tag..."
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <button
          type="button"
          onClick={handleAddCustomTag}
          className="p-2 rounded-md bg-journal-purple bg-opacity-10 text-journal-purple hover:bg-opacity-20 transition-colors"
        >
          <PlusCircle size={18} />
        </button>
      </div>
    </div>
  );
};

export default TagSelector;
