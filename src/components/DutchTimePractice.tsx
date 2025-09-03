import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, RotateCcw, Check, X, Volume2 } from 'lucide-react';

interface TimeData {
  hours: number;
  minutes: number;
  dutch: string;
  formal: string;
}

const DutchTimePractice: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<TimeData>({ hours: 12, minutes: 0, dutch: '', formal: '' });
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [mode, setMode] = useState<'practice' | 'quiz'>('practice');

  // Generate Dutch time expressions
  const generateDutchTime = (hours: number, minutes: number): { dutch: string; formal: string } => {
    const hourNames = [
      'twaalf', 'een', 'twee', 'drie', 'vier', 'vijf', 'zes', 
      'zeven', 'acht', 'negen', 'tien', 'elf', 'twaalf'
    ];
    
    const minuteNames: { [key: number]: string } = {
      0: '',
      5: 'vijf over',
      10: 'tien over',
      15: 'kwart over',
      20: 'tien voor half',
      25: 'vijf voor half',
      30: 'half',
      35: 'vijf over half',
      40: 'tien over half',
      45: 'kwart voor',
      50: 'tien voor',
      55: 'vijf voor'
    };

    let dutch = '';
    let formal = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    if (minutes === 0) {
      dutch = `${hourNames[hours]} uur`;
    } else if (minutes === 30) {
      dutch = `half ${hourNames[hours + 1] || hourNames[1]}`;
    } else if (minutes > 30) {
      const nextHour = hours === 12 ? 1 : hours + 1;
      if (minutes === 45) {
        dutch = `kwart voor ${hourNames[nextHour]}`;
      } else if (minutes === 50) {
        dutch = `tien voor ${hourNames[nextHour]}`;
      } else if (minutes === 55) {
        dutch = `vijf voor ${hourNames[nextHour]}`;
      } else {
        dutch = `${minuteNames[minutes]} ${hourNames[nextHour]}`;
      }
    } else {
      dutch = `${minuteNames[minutes]} ${hourNames[hours]}`;
    }

    return { dutch, formal };
  };

  // Generate random time
  const generateRandomTime = (): TimeData => {
    const hours = Math.floor(Math.random() * 12) + 1;
    const minuteOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    const minutes = minuteOptions[Math.floor(Math.random() * minuteOptions.length)];
    const { dutch, formal } = generateDutchTime(hours, minutes);
    
    return { hours, minutes, dutch, formal };
  };

  // Generate multiple choice options
  const generateOptions = (correctTime: TimeData): string[] => {
    const options = [correctTime.dutch];
    
    while (options.length < 4) {
      const randomTime = generateRandomTime();
      if (!options.includes(randomTime.dutch)) {
        options.push(randomTime.dutch);
      }
    }
    
    return options.sort(() => Math.random() - 0.5);
  };

  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const newTime = generateRandomTime();
    setCurrentTime(newTime);
    setOptions(generateOptions(newTime));
    setSelectedAnswer('');
    setShowAnswer(false);
  }, []);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowAnswer(true);
    setAttempts(prev => prev + 1);
    
    if (answer === currentTime.dutch) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    const newTime = generateRandomTime();
    setCurrentTime(newTime);
    setOptions(generateOptions(newTime));
    setSelectedAnswer('');
    setShowAnswer(false);
  };

  const resetGame = () => {
    setScore(0);
    setAttempts(0);
    nextQuestion();
  };

  // Clock component
  const AnalogClock: React.FC<{ hours: number; minutes: number }> = ({ hours, minutes }) => {
    const hourAngle = (hours % 12) * 30 + (minutes * 0.5);
    const minuteAngle = minutes * 6;

    return (
      <div className="relative w-48 h-48 mx-auto">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Clock face */}
          <circle cx="100" cy="100" r="95" fill="white" stroke="#333" strokeWidth="2" />
          
          {/* Hour markers */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) * (Math.PI / 180);
            const x1 = 100 + 85 * Math.sin(angle);
            const y1 = 100 - 85 * Math.cos(angle);
            const x2 = 100 + 75 * Math.sin(angle);
            const y2 = 100 - 75 * Math.cos(angle);
            
            return (
              <g key={i}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#333" strokeWidth="2" />
                <text 
                  x={100 + 70 * Math.sin(angle)} 
                  y={100 - 70 * Math.cos(angle) + 5} 
                  textAnchor="middle" 
                  fontSize="14" 
                  fill="#333"
                >
                  {i === 0 ? 12 : i}
                </text>
              </g>
            );
          })}
          
          {/* Hour hand */}
          <line
            x1="100"
            y1="100"
            x2={100 + 50 * Math.sin(hourAngle * Math.PI / 180)}
            y2={100 - 50 * Math.cos(hourAngle * Math.PI / 180)}
            stroke="#333"
            strokeWidth="4"
            strokeLinecap="round"
          />
          
          {/* Minute hand */}
          <line
            x1="100"
            y1="100"
            x2={100 + 70 * Math.sin(minuteAngle * Math.PI / 180)}
            y2={100 - 70 * Math.cos(minuteAngle * Math.PI / 180)}
            stroke="#666"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Center dot */}
          <circle cx="100" cy="100" r="4" fill="#333" />
        </svg>
      </div>
    );
  };

  const speakTime = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentTime.dutch);
      utterance.lang = 'nl-NL';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Clock className="w-6 h-6" />
            Dutch Time Practice
          </CardTitle>
          <div className="flex justify-center gap-4 mt-4">
            <Button
              variant={mode === 'practice' ? 'default' : 'outline'}
              onClick={() => setMode('practice')}
            >
              Practice
            </Button>
            <Button
              variant={mode === 'quiz' ? 'default' : 'outline'}
              onClick={() => setMode('quiz')}
            >
              Quiz
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {mode === 'quiz' && (
            <div className="text-center mb-6">
              <div className="text-lg font-semibold">
                Score: {score}/{attempts}
                {attempts > 0 && (
                  <span className="text-muted-foreground ml-2">
                    ({Math.round((score / attempts) * 100)}%)
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Clock Display */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">What time is it?</h3>
              <AnalogClock hours={currentTime.hours} minutes={currentTime.minutes} />
              
              <div className="mt-4 space-y-2">
                <div className="text-sm text-muted-foreground">
                  Digital: {currentTime.formal}
                </div>
                
                {mode === 'practice' && (
                  <div className="space-y-2">
                    <div className="text-lg font-semibold text-primary">
                      {currentTime.dutch}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={speakTime}
                      className="flex items-center gap-2"
                    >
                      <Volume2 className="w-4 h-4" />
                      Pronunciation
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Quiz Section */}
            {mode === 'quiz' && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-center">
                  Choose the correct answer:
                </h3>
                
                <div className="space-y-3">
                  {options.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        showAnswer
                          ? option === currentTime.dutch
                            ? 'success'
                            : selectedAnswer === option
                            ? 'destructive'
                            : 'outline'
                          : selectedAnswer === option
                          ? 'secondary'
                          : 'outline'
                      }
                      className="w-full justify-start text-left h-auto py-3"
                      onClick={() => !showAnswer && handleAnswerSelect(option)}
                      disabled={showAnswer}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{option}</span>
                        {showAnswer && option === currentTime.dutch && (
                          <Check className="w-4 h-4 text-green-600" />
                        )}
                        {showAnswer && selectedAnswer === option && option !== currentTime.dutch && (
                          <X className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                    </Button>
                  ))}
                </div>

                {showAnswer && (
                  <div className="mt-6 text-center space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">Correct answer:</div>
                      <div className="text-lg font-semibold">{currentTime.dutch}</div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={speakTime}
                        className="mt-2 flex items-center gap-2 mx-auto"
                      >
                        <Volume2 className="w-4 h-4" />
                        Pronunciation
                      </Button>
                    </div>
                    
                    <div className="flex gap-3 justify-center">
                      <Button onClick={nextQuestion}>
                        Next Question
                      </Button>
                      <Button variant="outline" onClick={resetGame}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Start Over
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Practice Mode Info */}
            {mode === 'practice' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Dutch time expressions:</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="font-semibold mb-2">Full hours:</div>
                    <div>• 1:00 = een uur</div>
                    <div>• 12:00 = twaalf uur</div>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="font-semibold mb-2">Quarter hours:</div>
                    <div>• :15 = kwart over</div>
                    <div>• :30 = half (next hour!)</div>
                    <div>• :45 = kwart voor</div>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="font-semibold mb-2">Other times:</div>
                    <div>• :05 = vijf over</div>
                    <div>• :10 = tien over</div>
                    <div>• :25 = vijf voor half</div>
                    <div>• :35 = vijf over half</div>
                  </div>
                </div>
                
                <Button onClick={nextQuestion} className="w-full">
                  Generate New Time
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DutchTimePractice;