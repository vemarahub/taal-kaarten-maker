import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';

interface VocabularyWord {
  dutch: string;
  english: string;
  article?: string;
  pronunciation?: string;
  example?: string;
}

interface VocabularyPracticeProps {
  word: VocabularyWord;
  wordNumber: number;
  totalWords: number;
  onNext: () => void;
  onPrevious: () => void;
  showNavigation: boolean;
}

export const VocabularyPractice: React.FC<VocabularyPracticeProps> = ({
  word,
  wordNumber,
  totalWords,
  onNext,
  onPrevious,
  showNavigation
}) => {
  const [showTranslation, setShowTranslation] = useState(false);

  const speakWord = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word.dutch);
      utterance.lang = 'nl-NL';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg text-foreground">
                Woord {wordNumber} van {totalWords}
              </CardTitle>
            </div>
            <div className="text-sm text-muted-foreground">
              Woordenlijst
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8">
          {/* Dutch Word */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                {word.article && (
                  <span className="text-primary text-3xl md:text-4xl mr-2">
                    {word.article}
                  </span>
                )}
                {word.dutch}
              </div>
              {word.pronunciation && (
                <div className="text-lg text-muted-foreground font-mono">
                  [{word.pronunciation}]
                </div>
              )}
            </div>
            
            <Button
              onClick={speakWord}
              variant="outline"
              size="lg"
              className="mb-6"
            >
              <Volume2 className="w-5 h-5 mr-2" />
              Uitspraak
            </Button>
          </div>

          {/* Translation Toggle */}
          <div className="text-center mb-6">
            <Button
              onClick={() => setShowTranslation(!showTranslation)}
              variant={showTranslation ? "default" : "secondary"}
              size="lg"
            >
              {showTranslation ? "Verberg Vertaling" : "Toon Vertaling"}
            </Button>
          </div>

          {/* English Translation */}
          {showTranslation && (
            <div className="text-center mb-6 p-6 bg-muted/30 rounded-lg">
              <div className="text-2xl font-semibold text-foreground mb-2">
                {word.english}
              </div>
              {word.example && (
                <div className="mt-4 p-4 bg-background/50 rounded-md">
                  <p className="text-muted-foreground text-sm mb-1">Voorbeeld:</p>
                  <p className="text-foreground italic">{word.example}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          {showNavigation && (
            <div className="flex justify-between items-center mt-8">
              <Button
                onClick={onPrevious}
                variant="outline"
                disabled={wordNumber === 1}
                size="lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Vorige
              </Button>
              
              <div className="text-center">
                <div className="w-full bg-muted rounded-full h-2 mb-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(wordNumber / totalWords) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  {wordNumber} / {totalWords}
                </span>
              </div>
              
              <Button
                onClick={onNext}
                variant="default"
                size="lg"
              >
                {wordNumber === totalWords ? "Voltooien" : "Volgende"} 
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};