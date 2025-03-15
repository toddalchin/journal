import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JournalCard, { JournalEntry } from '@/components/JournalCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Calendar, SlidersHorizontal, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample data
const sampleEntries: JournalEntry[] = [
  {
    id: '1',
    title: 'Finding clarity in chaos',
    content: "Today I realized that much of my anxiety comes from trying to control things that are fundamentally outside my control. When I focus on what I can actually influence, I feel much more centered and effective.",
    date: new Date('2023-06-15T14:32:00'),
    emotions: ['Calm', 'Grateful', 'Reflective'],
    contexts: ['Life', 'Epiphanies'],
    energyLevel: 4,
  },
  {
    id: '2',
    title: 'Breakthrough at work',
    content: "The project I've been stuck on for weeks finally clicked today. Sometimes stepping away and giving your brain space to process is the most productive thing you can do.",
    date: new Date('2023-06-12T09:15:00'),
    emotions: ['Excited', 'Proud', 'Energized'],
    contexts: ['Work', 'AI'],
    energyLevel: 8,
  },
  {
    id: '3',
    title: 'Morning meditation insights',
    content: "During meditation this morning, I had a powerful realization about how I've been approaching relationships. I've been seeking validation instead of connection. This shift in perspective feels significant.",
    date: new Date('2023-06-10T07:45:00'),
    emotions: ['Peaceful', 'Curious', 'Hopeful'],
    contexts: ['Life', 'Relationships', 'Epiphanies'],
    energyLevel: 6,
  },
];

const JournalEntries = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<JournalEntry[]>(sampleEntries);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterTag, setFilterTag] = useState('');
  
  // Get all unique tags from entries
  const allTags = Array.from(
    new Set(
      entries.flatMap(entry => [
        ...entry.emotions.map(e => ({ type: 'emotion', value: e })),
        ...entry.contexts.map(c => ({ type: 'context', value: c }))
      ]).map(tag => `${tag.type}:${tag.value}`)
    )
  );

  // Filter and sort entries
  const filteredEntries = entries
    .filter(entry => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !entry.title.toLowerCase().includes(query) &&
          !entry.content.toLowerCase().includes(query) &&
          !entry.emotions.some(e => e.toLowerCase().includes(query)) &&
          !entry.contexts.some(c => c.toLowerCase().includes(query))
        ) {
          return false;
        }
      }
      
      // Tag filter
      if (filterTag) {
        const [type, value] = filterTag.split(':');
        if (type === 'emotion' && !entry.emotions.includes(value)) {
          return false;
        }
        if (type === 'context' && !entry.contexts.includes(value)) {
          return false;
        }
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return b.date.getTime() - a.date.getTime();
      } else if (sortBy === 'oldest') {
        return a.date.getTime() - b.date.getTime();
      } else if (sortBy === 'energy-high') {
        return b.energyLevel - a.energyLevel;
      } else if (sortBy === 'energy-low') {
        return a.energyLevel - b.energyLevel;
      }
      return 0;
    });

  return (
    <div className="p-6 ml-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 gradient-heading">Your Journal</h1>
          <p className="text-gray-600">Reflect on your journey and growth over time</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <Calendar size={16} className="mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="energy-high">High energy</SelectItem>
                <SelectItem value="energy-low">Low energy</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterTag} onValueChange={setFilterTag}>
              <SelectTrigger className="w-[160px]">
                <SlidersHorizontal size={16} className="mr-2" />
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All entries</SelectItem>
                {allTags.map(tag => {
                  const [type, value] = tag.split(':');
                  return (
                    <SelectItem key={tag} value={tag}>
                      {type === 'emotion' ? '😊' : '🔖'} {value}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4 mb-8">
          {filteredEntries.length > 0 ? (
            filteredEntries.map(entry => (
              <JournalCard key={entry.id} entry={entry} />
            ))
          ) : (
            <div className="p-8 text-center bg-white rounded-lg shadow-sm">
              <p className="text-gray-500 mb-4">No journal entries found</p>
              <Button 
                onClick={() => navigate('/new')}
                className="bg-journal-purple hover:bg-journal-purple/90"
              >
                Create your first entry
              </Button>
            </div>
          )}
        </div>
        
        <div className="fixed bottom-8 right-8">
          <Button 
            onClick={() => navigate('/new')}
            size="lg"
            className="rounded-full h-14 w-14 bg-journal-purple hover:bg-journal-purple/90 shadow-lg"
          >
            <PlusCircle size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JournalEntries;
