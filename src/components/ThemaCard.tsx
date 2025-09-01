import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Volume2, CheckCircle } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  answer: string;
}

interface ThemaCardProps {
  thema: {
    id: number;
    title: string;
    description: string;
    questions: Question[];
    color: string;
  };
  onStartPractice: (themaId: number) => void;
}

export const ThemaCard: React.FC<ThemaCardProps> = ({ thema, onStartPractice }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={`relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 ${
        isHovered ? 'shadow-xl' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onStartPractice(thema.id)}
    >
      {/* Gradient overlay */}
      <div 
        className={`absolute inset-0 opacity-10 ${thema.color}`}
        style={{ 
          background: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)` 
        }}
      />
      
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-foreground">
            {thema.title}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {thema.questions.length} vragen
            </span>
            <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
        <p className="text-muted-foreground mt-2">{thema.description}</p>
      </CardHeader>
      
      <CardContent className="relative">
        <div className="space-y-3">
          {/* Preview of first 3 questions */}
          {thema.questions.slice(0, 3).map((question, index) => (
            <div key={question.id} className="flex items-center space-x-3 p-2 rounded-md bg-muted/30">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                {index + 1}
              </span>
              <span className="text-sm text-foreground truncate flex-1">
                {question.question}
              </span>
              <Volume2 className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
          
          {thema.questions.length > 3 && (
            <div className="text-center text-sm text-muted-foreground">
              +{thema.questions.length - 3} meer vragen...
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <Button 
            variant="hero" 
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              onStartPractice(thema.id);
            }}
          >
            Start Oefening
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};