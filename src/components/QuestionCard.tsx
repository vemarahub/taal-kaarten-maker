import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, Eye, EyeOff, RotateCcw, CheckCircle, Languages } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  question: string;
  answer: string;
  questionEn?: string;
  answerEn?: string;
}

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onNext: () => void;
  onPrevious: () => void;
  showNavigation: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onNext,
  onPrevious,
  showNavigation
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const { toast } = useToast();

  const handlePlayAudio = (text: string) => {
    // Use Web Speech API for Dutch pronunciation
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'nl-NL';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Audio not available",
        description: "Your browser does not support speech output.",
        variant: "destructive"
      });
    }
  };

  const resetCard = () => {
    setShowAnswer(false);
    setIsAnswerCorrect(null);
    setShowTranslation(false);
  };

  const markCorrect = () => {
    setIsAnswerCorrect(true);
    toast({
      title: "Well done! ✅",
      description: "Your answer was correct!",
      variant: "default"
    });
  };

  const markIncorrect = () => {
    setIsAnswerCorrect(false);
    toast({
      title: "Try again 🤔",
      description: "Look at the correct answer and try to remember it.",
      variant: "destructive"
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round((questionNumber / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <Card className="relative overflow-hidden">
        {/* Status indicator */}
        {isAnswerCorrect !== null && (
          <div className={`absolute top-0 left-0 right-0 h-1 ${
            isAnswerCorrect ? 'bg-success' : 'bg-destructive'
          }`} />
        )}

        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground mb-4">
            Dutch Question
          </CardTitle>
          
          {/* Question */}
          <div className="bg-muted/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Question:</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePlayAudio(question.question)}
                className="text-primary hover:bg-primary/10"
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Listen
              </Button>
            </div>
            <p className="text-xl font-medium text-foreground leading-relaxed">
              {question.question}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Answer section */}
          <div className={`transition-all duration-300 ${showAnswer ? 'opacity-100' : 'opacity-50'}`}>
            <div className="bg-accent/20 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-secondary">Answer:</h3>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePlayAudio(question.answer)}
                    className="text-secondary hover:bg-secondary/10"
                    disabled={!showAnswer}
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Listen
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAnswer(!showAnswer)}
                    className="text-muted-foreground hover:bg-muted"
                  >
                    {showAnswer ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                    {showAnswer ? 'Hide' : 'Show'}
                  </Button>
                </div>
              </div>
              
              {showAnswer ? (
                <p className="text-xl font-medium text-foreground leading-relaxed">
                  {question.answer}
                </p>
              ) : (
                <p className="text-muted-foreground italic">
                  Click "Show" to see the answer
                </p>
              )}
            </div>
          </div>

          {/* Translation section */}
          {(question.questionEn || question.answerEn) && (
            <div className="space-y-3">
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowTranslation(!showTranslation)}
                >
                  <Languages className="w-4 h-4 mr-2" />
                  {showTranslation ? 'Hide Translation' : 'Show Translation'}
                </Button>
              </div>
              
              {showTranslation && (
                <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <div className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-3">
                    English Translation:
                  </div>
                  
                  {question.questionEn && (
                    <div className="mb-3">
                      <div className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">Question:</div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">{question.questionEn}</div>
                    </div>
                  )}
                  
                  {question.answerEn && showAnswer && (
                    <div>
                      <div className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">Answer:</div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">{question.answerEn}</div>
                    </div>
                  )}
                  
                  {question.answerEn && !showAnswer && (
                    <div className="text-xs text-blue-600 dark:text-blue-400 italic">
                      Show the Dutch answer first to see the English translation
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Self-assessment buttons */}
          {showAnswer && (
            <div className="flex flex-col space-y-3">
              <p className="text-center text-sm text-muted-foreground">
                How did you do with this question?
              </p>
              <div className="flex space-x-4 justify-center">
                <Button
                  variant="success"
                  onClick={markCorrect}
                  className="flex-1 max-w-40"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Correct!
                </Button>
                <Button
                  variant="destructive"
                  onClick={markIncorrect}
                  className="flex-1 max-w-40"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try again
                </Button>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!showNavigation || questionNumber === 1}
          >
            Previous
          </Button>
          
          <Button
            variant="ghost"
            onClick={resetCard}
            className="text-muted-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          
          <Button
            variant="default"
            onClick={onNext}
            disabled={!showNavigation}
          >
            {questionNumber === totalQuestions ? 'Complete' : 'Next'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};