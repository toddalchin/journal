
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Sparkles, User, BookOpenText } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'ai';
  timestamp: Date;
}

const sampleMessages: Message[] = [
  {
    id: '1',
    content: "Welcome to your personal insight space. I'm here to help you reflect, gain clarity, and grow. What's on your mind today?",
    role: 'ai',
    timestamp: new Date()
  }
];

const Insight = () => {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample AI responses - in a real app, this would connect to an AI API
  const aiResponses = [
    "That's a really insightful observation. When you notice this pattern, how does it make you feel?",
    "I hear that you're struggling with this situation. What would growth look like for you here?",
    "It sounds like you've made significant progress! What specific changes have you noticed in yourself?",
    "That's a complex challenge. Let's break it down together. What aspect feels most urgent to address?",
    "I'm noticing a theme of self-doubt in what you're sharing. What would you say to a friend facing the same situation?",
    "Your awareness around this is impressive. How might you apply this insight moving forward?",
    "This is a valuable reflection. How does this realization connect to your core values?",
    "I'm curious - what might be the small next step you could take in this direction?",
    "Thank you for sharing that. What support do you need to navigate this challenge?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        role: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-6 ml-20 h-screen flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 gradient-heading">AI Insight</h1>
          <p className="text-muted-foreground">Your personal coach, therapist, and guide for self-reflection</p>
        </div>
        
        <div className="flex-1 overflow-hidden flex flex-col bg-card rounded-xl shadow-sm border border-muted">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`insight-bubble ${msg.role === 'ai' ? 'ai' : 'user'}`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-2 bg-card">
                      {msg.role === 'ai' ? (
                        <Sparkles className="text-accent" size={18} />
                      ) : (
                        <User className="text-muted-foreground" size={18} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${msg.role === 'ai' ? 'text-accent' : 'text-foreground'}`}>
                        {msg.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="insight-bubble ai">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <div className="p-4 border-t border-muted">
            <div className="flex items-end space-x-2">
              <Textarea
                placeholder="Ask for guidance, reflection, or share your thoughts..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 min-h-[80px] max-h-[160px] resize-none bg-muted/50 border-muted"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-accent hover:bg-accent/90 h-[40px] w-[40px] rounded-full p-0 flex items-center justify-center"
              >
                <Send size={18} />
              </Button>
            </div>
            
            <div className="mt-4 text-xs text-muted-foreground flex items-center">
              <BookOpenText size={12} className="mr-1" />
              <span>Your conversations help me provide personalized insights over time</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insight;
