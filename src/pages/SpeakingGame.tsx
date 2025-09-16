import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mic, MicOff, Play, Volume2, Trophy, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';

interface SpeakingQuestion {
  id: number;
  question: string;
  sampleAnswer: string;
  timeLimit: number; // in seconds
}

const speakingQuestions: SpeakingQuestion[] = [
  {
    id: 1,
    question: "Ik ga drie keer per jaar op vakantie. Hoe vaak gaat u op vakantie en waar gaat u dan naar toe?",
    sampleAnswer: "Ik ga één keer per jaar op vakantie. Ik ga naar Turkije.",
    timeLimit: 30
  },
  {
    id: 2,
    question: "Ik spreek 4 talen en mijn moedertaal is Nederlands. Welke talen spreekt u en wat is uw moedertaal?",
    sampleAnswer: "Mijn moedertaal is Somalisch. Ik spreek Engels en een klein beetje Nederlands.",
    timeLimit: 30
  },
  {
    id: 3,
    question: "Ik heb twee zussen en veel neven en nichten. Wat kunt u vertellen over uw familie?",
    sampleAnswer: "Ik heb twee broers en twee zussen. Mijn familie is groot, ik heb veel ooms en tantes en neven en nichten.",
    timeLimit: 30
  },
  {
    id: 4,
    question: "Mijn dag begint altijd om 6 uur in de ochtend. Hoe laat begint uw dag en wat doet u dan het eerst?",
    sampleAnswer: "Ik sta op om 8 uur. Dan drink ik eerst koffie.",
    timeLimit: 30
  },
  {
    id: 5,
    question: "Ik woon in een rijtjeshuis in Heemstede. Waar woont u en hoe is uw contact met de buren?",
    sampleAnswer: "Ik woon in Amsterdam en ik heb goede contact met de buren.",
    timeLimit: 30
  },
  {
    id: 6,
    question: "Ik doe allerlei dingen om gezond te blijven. Wat doet u allemaal om gezond te blijven?",
    sampleAnswer: "Ik speel voetbal. Ik eet gezond eten en drink geen alcohol.",
    timeLimit: 30
  },
  {
    id: 7,
    question: "Ik doe mijn boodschappen bijna altijd op de fiets. Hoe doet u uw boodschappen?",
    sampleAnswer: "Ik doe mijn boodschappen met de auto.",
    timeLimit: 30
  },
  {
    id: 8,
    question: "Ik houd van autorijden. Houdt u ook van autorijden? Vertel ook waarom u wel of niet van autorijden houdt?",
    sampleAnswer: "Ik houd van autorijden, want ik vind het comfortabel en gezellig.",
    timeLimit: 30
  },
  {
    id: 9,
    question: "Ik luister elke dag naar het nieuws op de radio. Hoe vaak luistert u naar de radio? En naar wat voor soort programma's luistert u het liefst?",
    sampleAnswer: "Ik luister elke dag naar de radio. Muziek is mijn favoriete programma.",
    timeLimit: 30
  },
  {
    id: 10,
    question: "Ik ga graag naar een feestje in het weekend. Wat doet u het liefst in het weekend? En vertel ook waarom u dat leuk vindt?",
    sampleAnswer: "Ik ga het liefst naar een discotheek, want ik houd van dansen.",
    timeLimit: 30
  }
];

export default function SpeakingGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [questionCompleted, setQuestionCompleted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !questionCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted && !questionCompleted) {
      if (isRecording) {
        stopRecording();
      }
      setQuestionCompleted(true);
    }
  }, [timeLeft, gameStarted, questionCompleted, isRecording]);

  const formatTime = (seconds: number) => {
    return `${seconds}s`;
  };

  const startQuestion = () => {
    setGameStarted(true);
    setTimeLeft(speakingQuestions[currentQuestion].timeLimit);
    setRecordedAudio(null);
    setQuestionCompleted(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Microphone access is required for this exercise.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playRecording = () => {
    if (recordedAudio) {
      const audio = new Audio(recordedAudio);
      audio.play();
    }
  };

  const playSampleAnswer = () => {
    const question = speakingQuestions[currentQuestion];
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(question.sampleAnswer);
      utterance.lang = 'nl-NL';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleNextQuestion = () => {
    // Simple scoring based on whether they recorded something
    const score = recordedAudio ? 8 : 0; // Out of 10 points
    setScores([...scores, score]);

    if (currentQuestion < speakingQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setGameStarted(false);
      setQuestionCompleted(false);
      setRecordedAudio(null);
    } else {
      setGameCompleted(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setGameStarted(false);
    setQuestionCompleted(false);
    setGameCompleted(false);
    setRecordedAudio(null);
    setScores([]);
    setTimeLeft(0);
  };

  const getTotalScore = () => scores.reduce((sum, score) => sum + score, 0);
  const getMaxPossibleScore = () => speakingQuestions.length * 10;

  const getScoreRating = () => {
    const percentage = (getTotalScore() / getMaxPossibleScore()) * 100;
    if (percentage >= 80) return { rating: "Uitstekend!", color: "text-green-600", stars: 3 };
    if (percentage >= 60) return { rating: "Goed!", color: "text-blue-600", stars: 2 };
    if (percentage >= 40) return { rating: "Redelijk!", color: "text-orange-600", stars: 1 };
    return { rating: "Blijf oefenen!", color: "text-red-600", stars: 0 };
  };

  if (!gameStarted && !questionCompleted && !gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full text-center">
          <CardHeader>
            <div className="text-6xl mb-4">🎤</div>
            <CardTitle className="text-3xl text-orange-800 dark:text-orange-200">Speaking Practice</CardTitle>
            <p className="text-lg text-muted-foreground">A2 Spreekvaardigheid Oefening</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Vraag {currentQuestion + 1} van {speakingQuestions.length}</h3>
                <div className="text-left space-y-2">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span>Spreektijd:</span>
                      <span className="font-semibold">{speakingQuestions[currentQuestion].timeLimit} seconden</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Punten:</span>
                      <span className="font-semibold">10 punten</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-left bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Vraag:</h4>
                <p className="text-sm">{speakingQuestions[currentQuestion].question}</p>
              </div>
              
              <div className="text-xs text-muted-foreground">
                💡 Tip: Zorg dat uw microfoon werkt voordat u begint
              </div>
              
              <Button onClick={startQuestion} size="lg" className="w-full bg-orange-600 hover:bg-orange-700">
                <Mic className="w-5 h-5 mr-2" />
                Start Spreekoefening
              </Button>
              
              <Link to="/practice-a2">
                <Button variant="outline" className="w-full">
                  Terug naar A2 Practice
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameCompleted) {
    const rating = getScoreRating();
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="text-6xl mb-4">🎉</div>
            <CardTitle className="text-2xl">Spreekoefening Voltooid!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 p-4 rounded-lg">
                <div className="text-3xl font-bold text-primary">{getTotalScore()}/{getMaxPossibleScore()}</div>
                <div className="text-sm text-muted-foreground">Totale Score</div>
              </div>
              
              <div className={`text-xl font-semibold ${rating.color}`}>
                {rating.rating}
              </div>
              
              <div className="flex justify-center space-x-1">
                {[...Array(3)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-8 h-8 ${i < rating.stars ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              
              <div className="space-y-2 text-sm">
                {scores.map((score, index) => (
                  <div key={index} className="flex justify-between">
                    <span>Vraag {index + 1}:</span>
                    <span className="font-semibold">{score}/10</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 pt-4">
                <Button onClick={resetGame} className="w-full">
                  <Trophy className="w-4 h-4 mr-2" />
                  Opnieuw Oefenen
                </Button>
                <Link to="/practice-a2">
                  <Button variant="outline" className="w-full">
                    Terug naar A2 Practice
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = speakingQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Navigation */}
      <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Navigation />
        </div>
      </header>

      {/* Game Header */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/practice-a2">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Terug
              </Button>
            </Link>
            
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold">Spreekoefening</h1>
              <p className="text-orange-100">Vraag {currentQuestion + 1} van {speakingQuestions.length}</p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-orange-100">Tijd</div>
              <div className="text-xl font-bold flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speaking Interface */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Question Card */}
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border-orange-200 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="text-xl text-orange-800 dark:text-orange-200">
                Spreek uw antwoord in
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border mb-4">
                <p className="text-lg leading-relaxed">{question.question}</p>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  onClick={playSampleAnswer}
                  variant="outline"
                  size="sm"
                  className="text-orange-600 border-orange-300 hover:bg-orange-50"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  Hoor Voorbeeldantwoord
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recording Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="w-5 h-5" />
                Opname
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                {!questionCompleted ? (
                  <div className="flex gap-4">
                    {!isRecording ? (
                      <Button 
                        onClick={startRecording}
                        size="lg"
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        <Mic className="w-6 h-6 mr-2" />
                        Start Opname
                      </Button>
                    ) : (
                      <Button 
                        onClick={stopRecording}
                        size="lg"
                        variant="destructive"
                      >
                        <MicOff className="w-6 h-6 mr-2" />
                        Stop Opname
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <p className="text-green-600 font-semibold">✅ Opname voltooid!</p>
                    
                    {recordedAudio && (
                      <div className="flex gap-4 justify-center">
                        <Button onClick={playRecording} variant="outline">
                          <Play className="w-4 h-4 mr-2" />
                          Speel Mijn Antwoord Af
                        </Button>
                        <Button onClick={playSampleAnswer} variant="outline">
                          <Volume2 className="w-4 h-4 mr-2" />
                          Hoor Voorbeeldantwoord
                        </Button>
                      </div>
                    )}
                    
                    <Button onClick={handleNextQuestion} className="bg-orange-600 hover:bg-orange-700">
                      {currentQuestion < speakingQuestions.length - 1 ? 'Volgende Vraag' : 'Voltooien'}
                    </Button>
                  </div>
                )}
                
                {isRecording && (
                  <div className="flex items-center space-x-2 text-red-600">
                    <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Opname bezig...</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Sample Answer Display */}
          {questionCompleted && (
            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800 dark:text-blue-200">
                  Voorbeeldantwoord A2-niveau:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 dark:text-blue-300 italic">
                  "{question.sampleAnswer}"
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}