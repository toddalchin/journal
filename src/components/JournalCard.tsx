
import { formatDistanceToNow } from 'date-fns';
import { Tag } from '@/components/Tag';

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: Date;
  emotions: string[];
  contexts: string[];
  energyLevel: number;
}

interface JournalCardProps {
  entry: JournalEntry;
}

const JournalCard = ({ entry }: JournalCardProps) => {
  const getEnergyLabel = (level: number) => {
    if (level <= 3) return 'Low';
    if (level <= 7) return 'Medium';
    return 'High';
  };

  const getEnergyClass = (level: number) => {
    if (level <= 3) return 'energy-low';
    if (level <= 7) return 'energy-medium';
    return 'energy-high';
  };

  const timeAgo = formatDistanceToNow(entry.date, { addSuffix: true });

  return (
    <div className="journal-card animate-slide-up">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold gradient-heading">{entry.title}</h3>
        <span className="text-sm text-gray-500">{timeAgo}</span>
      </div>
      
      <p className="text-gray-700 mb-4 line-clamp-3">{entry.content}</p>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {entry.emotions.map((emotion) => (
          <Tag key={emotion} type="emotion" label={emotion} />
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {entry.contexts.map((context) => (
          <Tag key={context} type="context" label={context} />
        ))}
      </div>
      
      <div className="flex items-center">
        <span className="text-sm mr-2">Energy:</span>
        <span className={`tag ${getEnergyClass(entry.energyLevel)}`}>
          {getEnergyLabel(entry.energyLevel)}
        </span>
      </div>
    </div>
  );
};

export default JournalCard;
