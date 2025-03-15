
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import EnergySlider from '@/components/EnergySlider';
import TagSelector from '@/components/TagSelector';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

// Sample preset tags
const emotionTags = [
  'Happy', 'Calm', 'Anxious', 'Grateful', 'Sad', 
  'Excited', 'Frustrated', 'Hopeful', 'Overwhelmed', 'Peaceful',
  'Curious', 'Tired', 'Motivated', 'Confused', 'Proud'
];

const contextTags = [
  'Work', 'Life', 'Relationships', 'Health', 'Creativity',
  'Learning', 'AI', 'Growth', 'Challenges', 'Victories',
  'Goals', 'Reflection', 'Epiphanies', 'Projects', 'Future'
];

const NewEntry = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [selectedContexts, setSelectedContexts] = useState<string[]>([]);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [customEmotions, setCustomEmotions] = useState<string[]>([]);
  const [customContexts, setCustomContexts] = useState<string[]>([]);
  
  const allEmotions = [...emotionTags, ...customEmotions];
  const allContexts = [...contextTags, ...customContexts];
  
  const handleToggleEmotion = (emotion: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotion)
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };
  
  const handleToggleContext = (context: string) => {
    setSelectedContexts(prev => 
      prev.includes(context)
        ? prev.filter(c => c !== context)
        : [...prev, context]
    );
  };
  
  const handleAddCustomEmotion = (emotion: string) => {
    setCustomEmotions(prev => [...prev, emotion]);
    setSelectedEmotions(prev => [...prev, emotion]);
  };
  
  const handleAddCustomContext = (context: string) => {
    setCustomContexts(prev => [...prev, context]);
    setSelectedContexts(prev => [...prev, context]);
  };
  
  const handleSave = () => {
    if (!title.trim()) {
      toast.error("Please add a title for your entry");
      return;
    }
    
    if (!content.trim()) {
      toast.error("Please add some content to your entry");
      return;
    }
    
    // In a real app, this would save to a database or localStorage
    // For now, we'll just show a success toast and redirect
    
    toast.success("Journal entry saved successfully");
    setTimeout(() => navigate('/'), 1500);
  };
  
  return (
    <div className="p-6 ml-20">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 gradient-heading">New Journal Entry</h1>
          <p className="text-gray-600">Capture your thoughts, feelings, and insights</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title
              </label>
              <Input
                id="title"
                placeholder="What's the main theme of this entry?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">
                Your Thoughts
              </label>
              <Textarea
                id="content"
                placeholder="Share your thoughts, experiences, and reflections..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[200px] resize-none"
              />
            </div>
            
            <TagSelector
              title="How are you feeling?"
              tags={allEmotions}
              selectedTags={selectedEmotions}
              presetTags={emotionTags}
              onTagToggle={handleToggleEmotion}
              onAddCustomTag={handleAddCustomEmotion}
              type="emotion"
            />
            
            <TagSelector
              title="What's the context?"
              tags={allContexts}
              selectedTags={selectedContexts}
              presetTags={contextTags}
              onTagToggle={handleToggleContext}
              onAddCustomTag={handleAddCustomContext}
              type="context"
            />
            
            <EnergySlider value={energyLevel} onChange={setEnergyLevel} />
            
            <div className="pt-4">
              <Button 
                onClick={handleSave}
                className="w-full bg-journal-purple hover:bg-journal-purple/90"
              >
                <Save size={18} className="mr-2" />
                Save Journal Entry
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEntry;
