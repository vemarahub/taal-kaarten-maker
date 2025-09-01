import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, BookOpen, ChevronRight } from 'lucide-react';

interface VocabularyWord {
  dutch: string;
  english: string;
  article?: string;
  pronunciation?: string;
  example?: string;
}

interface VocabularyCardProps {
  thema: {
    id: number;
    title: string;
    description: string;
    words: VocabularyWord[];
    color: string;
  };
  onStartPractice: (themaId: number) => void;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({ thema, onStartPractice }) => {
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
        className="absolute inset-0 opacity-10"
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
            <span className="bg-accent/20 text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
              {thema.words.length} woorden
            </span>
            <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
        <p className="text-muted-foreground mt-2">{thema.description}</p>
      </CardHeader>
      
      <CardContent className="relative">
        <div className="space-y-3">
          {/* Preview of first 4 words */}
          {thema.words.slice(0, 4).map((word, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-md bg-muted/30">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-foreground">
                    {word.article && <span className="text-primary text-sm">{word.article} </span>}
                    {word.dutch}
                  </span>
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">{word.english}</span>
              </div>
            </div>
          ))}
          
          {thema.words.length > 4 && (
            <div className="text-center text-sm text-muted-foreground">
              +{thema.words.length - 4} meer woorden...
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
            <BookOpen className="w-4 h-4 mr-2" />
            Woordenlijst Bekijken
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};