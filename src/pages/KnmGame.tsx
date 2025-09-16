import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, GraduationCap, Zap, Target, Trophy, Star, Clock, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';

interface KnmQuestion {
  id: number;
  question: string;
  questionEn: string;
  options: string[];
  optionsEn: string[];
  correct: number;
  points: number;
  category: string;
}

const knmQuestions: KnmQuestion[] = [
  {
    id: 1,
    question: "Wanneer werd Nederland een zelfstandige staat?",
    questionEn: "When did the Netherlands become an independent state?",
    options: ["1568", "1588", "1648", "1795"],
    optionsEn: ["1568", "1588", "1648", "1795"],
    correct: 2,
    points: 10,
    category: "Geschiedenis"
  },
  {
    id: 2,
    question: "Wie was Willem van Oranje?",
    questionEn: "Who was William of Orange?",
    options: ["Een Spaanse koning", "Een politiek leider en protestant", "Een katholieke priester", "Een Franse keizer"],
    optionsEn: ["A Spanish king", "A political leader and protestant", "A Catholic priest", "A French emperor"],
    correct: 1,
    points: 10,
    category: "Geschiedenis"
  },
  {
    id: 3,
    question: "Welke eeuw wordt de Gouden Eeuw genoemd?",
    questionEn: "Which century is called the Golden Age?",
    options: ["16e eeuw", "17e eeuw", "18e eeuw", "19e eeuw"],
    optionsEn: ["16th century", "17th century", "18th century", "19th century"],
    correct: 1,
    points: 10,
    category: "Geschiedenis"
  },
  {
    id: 4,
    question: "Hoeveel provincies heeft Nederland?",
    questionEn: "How many provinces does the Netherlands have?",
    options: ["10", "11", "12", "13"],
    optionsEn: ["10", "11", "12", "13"],
    correct: 2,
    points: 10,
    category: "Geografie"
  },
  {
    id: 5,
    question: "Wat is de hoofdstad van Nederland?",
    questionEn: "What is the capital of the Netherlands?",
    options: ["Den Haag", "Rotterdam", "Utrecht", "Amsterdam"],
    optionsEn: ["The Hague", "Rotterdam", "Utrecht", "Amsterdam"],
    correct: 3,
    points: 10,
    category: "Geografie"
  },
  {
    id: 6,
    question: "Waar zetelt de Nederlandse regering?",
    questionEn: "Where is the Dutch government seated?",
    options: ["Amsterdam", "Den Haag", "Rotterdam", "Utrecht"],
    optionsEn: ["Amsterdam", "The Hague", "Rotterdam", "Utrecht"],
    correct: 1,
    points: 10,
    category: "Politiek"
  },
  {
    id: 7,
    question: "Hoe vaak zijn er verkiezingen voor de Tweede Kamer?",
    questionEn: "How often are there elections for the House of Representatives?",
    options: ["Elke 3 jaar", "Elke 4 jaar", "Elke 5 jaar", "Elke 6 jaar"],
    optionsEn: ["Every 3 years", "Every 4 years", "Every 5 years", "Every 6 years"],
    correct: 1,
    points: 10,
    category: "Politiek"
  },
  {
    id: 8,
    question: "Wie is het staatshoofd van Nederland?",
    questionEn: "Who is the head of state of the Netherlands?",
    options: ["De minister-president", "De koning", "De voorzitter van de Tweede Kamer", "De burgemeester van Amsterdam"],
    optionsEn: ["The prime minister", "The king", "The speaker of the House", "The mayor of Amsterdam"],
    correct: 1,
    points: 10,
    category: "Politiek"
  },
  {
    id: 9,
    question: "Vanaf welke leeftijd is er leerplicht in Nederland?",
    questionEn: "From what age is there compulsory education in the Netherlands?",
    options: ["4 jaar", "5 jaar", "6 jaar", "7 jaar"],
    optionsEn: ["4 years", "5 years", "6 years", "7 years"],
    correct: 1,
    points: 10,
    category: "Onderwijs"
  },
  {
    id: 10,
    question: "Tot welke leeftijd duurt de leerplicht?",
    questionEn: "Until what age does compulsory education last?",
    options: ["15 jaar", "16 jaar", "17 jaar", "18 jaar"],
    optionsEn: ["15 years", "16 years", "17 years", "18 years"],
    correct: 1,
    points: 10,
    category: "Onderwijs"
  },
  {
    id: 11,
    question: "Welke verzekering is verplicht in Nederland?",
    questionEn: "Which insurance is mandatory in the Netherlands?",
    options: ["Inboedelverzekering", "Zorgverzekering", "Reisverzekering", "Opstalverzekering"],
    optionsEn: ["Contents insurance", "Health insurance", "Travel insurance", "Building insurance"],
    correct: 1,
    points: 10,
    category: "Verzekeringen"
  },
  {
    id: 12,
    question: "Wat is het alarmnummer in Nederland?",
    questionEn: "What is the emergency number in the Netherlands?",
    options: ["110", "111", "112", "113"],
    optionsEn: ["110", "111", "112", "113"],
    correct: 2,
    points: 10,
    category: "Dienstverlening"
  },
  {
    id: 13,
    question: "Bij welke instantie moet je je inschrijven als je werkloos wordt?",
    questionEn: "Which agency must you register with when you become unemployed?",
    options: ["Gemeente", "UWV", "Belastingdienst", "SVB"],
    optionsEn: ["Municipality", "UWV (Employee Insurance Agency)", "Tax office", "SVB (Social Insurance Bank)"],
    correct: 1,
    points: 10,
    category: "Werk"
  },
  {
    id: 14,
    question: "Wanneer is Koningsdag?",
    questionEn: "When is King's Day?",
    options: ["26 april", "27 april", "28 april", "29 april"],
    optionsEn: ["April 26", "April 27", "April 28", "April 29"],
    correct: 1,
    points: 10,
    category: "Cultuur"
  },
  {
    id: 15,
    question: "Wanneer is de Nationale Dodenherdenking?",
    questionEn: "When is the National Remembrance Day?",
    options: ["4 mei", "5 mei", "6 mei", "8 mei"],
    optionsEn: ["May 4", "May 5", "May 6", "May 8"],
    correct: 0,
    points: 10,
    category: "Cultuur"
  },
  {
    id: 16,
    question: "Wat betekent VOC?",
    questionEn: "What does VOC stand for?",
    options: ["Vereniging Oost-Indische Compagnie", "Verenigde Oost-Indische Compagnie", "Vrije Oost-Indische Compagnie", "Vroege Oost-Indische Compagnie"],
    optionsEn: ["Association East India Company", "United East India Company", "Free East India Company", "Early East India Company"],
    correct: 1,
    points: 10,
    category: "Geschiedenis"
  },
  {
    id: 17,
    question: "Welke rivier stroomt door Nederland?",
    questionEn: "Which river flows through the Netherlands?",
    options: ["De Donau", "De Rijn", "De Seine", "De Theems"],
    optionsEn: ["The Danube", "The Rhine", "The Seine", "The Thames"],
    correct: 1,
    points: 10,
    category: "Geografie"
  },
  {
    id: 18,
    question: "Wat is de Randstad?",
    questionEn: "What is the Randstad?",
    options: ["Een provincie", "Een stad", "Een gebied met grote steden", "Een rivier"],
    optionsEn: ["A province", "A city", "An area with large cities", "A river"],
    correct: 2,
    points: 10,
    category: "Geografie"
  },
  {
    id: 19,
    question: "Hoeveel leden heeft de Tweede Kamer?",
    questionEn: "How many members does the House of Representatives have?",
    options: ["100", "125", "150", "175"],
    optionsEn: ["100", "125", "150", "175"],
    correct: 2,
    points: 10,
    category: "Politiek"
  },
  {
    id: 20,
    question: "Wat is een polder?",
    questionEn: "What is a polder?",
    options: ["Een berg", "Drooggelegd land", "Een meer", "Een bos"],
    optionsEn: ["A mountain", "Reclaimed land", "A lake", "A forest"],
    correct: 1,
    points: 10,
    category: "Geografie"
  },
  {
    id: 21,
    question: "Wanneer werd de Euro ingevoerd in Nederland?",
    questionEn: "When was the Euro introduced in the Netherlands?",
    options: ["2000", "2001", "2002", "2003"],
    optionsEn: ["2000", "2001", "2002", "2003"],
    correct: 2,
    points: 10,
    category: "Geschiedenis"
  },
  {
    id: 22,
    question: "Wat is de AOW?",
    questionEn: "What is the AOW?",
    options: ["Algemene Ouderdomswet", "Algemene Onderwijs Wet", "Algemene Organisatie Wet", "Algemene Overheid Wet"],
    optionsEn: ["General Old Age Act", "General Education Act", "General Organization Act", "General Government Act"],
    correct: 0,
    points: 10,
    category: "Sociale zekerheid"
  },
  {
    id: 23,
    question: "Vanaf welke leeftijd krijg je AOW?",
    questionEn: "From what age do you receive AOW?",
    options: ["65 jaar", "66 jaar", "67 jaar", "68 jaar"],
    optionsEn: ["65 years", "66 years", "67 years", "68 years"],
    correct: 2,
    points: 10,
    category: "Sociale zekerheid"
  },
  {
    id: 24,
    question: "Wat is een BSN?",
    questionEn: "What is a BSN?",
    options: ["Burger Service Nummer", "Basis Service Nummer", "Burger Sociaal Nummer", "Basis Sociaal Nummer"],
    optionsEn: ["Citizen Service Number", "Basic Service Number", "Citizen Social Number", "Basic Social Number"],
    correct: 0,
    points: 10,
    category: "Dienstverlening"
  },
  {
    id: 25,
    question: "Bij welke dokter ga je eerst als je ziek bent?",
    questionEn: "Which doctor do you go to first when you are sick?",
    options: ["Specialist", "Huisarts", "Tandarts", "Fysiotherapeut"],
    optionsEn: ["Specialist", "General practitioner", "Dentist", "Physiotherapist"],
    correct: 1,
    points: 10,
    category: "Gezondheidszorg"
  },
  {
    id: 26,
    question: "Wat is de Deltawerken?",
    questionEn: "What are the Delta Works?",
    options: ["Een museum", "Bescherming tegen water", "Een universiteit", "Een politieke partij"],
    optionsEn: ["A museum", "Protection against water", "A university", "A political party"],
    correct: 1,
    points: 10,
    category: "Geografie"
  },
  {
    id: 27,
    question: "Wanneer was de Tweede Wereldoorlog in Nederland?",
    questionEn: "When was World War II in the Netherlands?",
    options: ["1939-1945", "1940-1945", "1941-1945", "1942-1945"],
    optionsEn: ["1939-1945", "1940-1945", "1941-1945", "1942-1945"],
    correct: 1,
    points: 10,
    category: "Geschiedenis"
  },
  {
    id: 28,
    question: "Wat is de Nederlandse volkslied?",
    questionEn: "What is the Dutch national anthem?",
    options: ["Het Wilhelmus", "Oranje Boven", "Nederland O Nederland", "Waar de blanke top der duinen"],
    optionsEn: ["The Wilhelmus", "Orange Above", "Netherlands O Netherlands", "Where the white top of the dunes"],
    correct: 0,
    points: 10,
    category: "Cultuur"
  },
  {
    id: 29,
    question: "Hoeveel inwoners heeft Nederland ongeveer?",
    questionEn: "How many inhabitants does the Netherlands have approximately?",
    options: ["15 miljoen", "17 miljoen", "19 miljoen", "21 miljoen"],
    optionsEn: ["15 million", "17 million", "19 million", "21 million"],
    correct: 1,
    points: 10,
    category: "Geografie"
  },
  {
    id: 30,
    question: "Wat is de officiële taal van Nederland?",
    questionEn: "What is the official language of the Netherlands?",
    options: ["Nederlands", "Nederlands en Fries", "Nederlands en Engels", "Nederlands, Fries en Duits"],
    optionsEn: ["Dutch", "Dutch and Frisian", "Dutch and English", "Dutch, Frisian and German"],
    correct: 1,
    points: 10,
    category: "Cultuur"
  }
];

export default function KnmGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds
  const [gameStarted, setGameStarted] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameCompleted(true);
    }
  }, [timeLeft, gameStarted, gameCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex.toString());
    const question = knmQuestions[currentQuestion];
    const isCorrect = answerIndex === question.correct;
    
    setShowResult(true);
    
    if (isCorrect) {
      setScore(score + question.points + (streak * 5));
      setStreak(streak + 1);
    } else {
      setStreak(0);
      setLives(lives - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < knmQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameCompleted(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setStreak(0);
    setGameCompleted(false);
    setLives(3);
    setTimeLeft(45 * 60);
    setGameStarted(false);
  };

  const getScoreRating = () => {
    const maxScore = knmQuestions.length * 10;
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 90) return { rating: "Uitstekend!", color: "text-green-600", stars: 3 };
    if (percentage >= 70) return { rating: "Goed!", color: "text-blue-600", stars: 2 };
    if (percentage >= 50) return { rating: "Niet slecht!", color: "text-orange-600", stars: 1 };
    return { rating: "Blijf oefenen!", color: "text-red-600", stars: 0 };
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full text-center">
          <CardHeader>
            <div className="text-6xl mb-4">🇳🇱</div>
            <CardTitle className="text-3xl text-purple-800 dark:text-purple-200">KNM Practice Quiz</CardTitle>
            <p className="text-lg text-muted-foreground">Kennis van de Nederlandse Maatschappij</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Quiz Information</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span className="font-semibold">30</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Limit:</span>
                    <span className="font-semibold">45 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lives:</span>
                    <span className="font-semibold">3 ❤️</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pass Score:</span>
                    <span className="font-semibold">18+ correct</span>
                  </div>
                </div>
              </div>
              
              <div className="text-left space-y-2">
                <h4 className="font-semibold">Topics covered:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span>• Nederlandse geschiedenis</span>
                  <span>• Politiek systeem</span>
                  <span>• Geografie</span>
                  <span>• Onderwijs</span>
                  <span>• Gezondheidszorg</span>
                  <span>• Nederlandse cultuur</span>
                </div>
              </div>
              
              <Button onClick={() => setGameStarted(true)} size="lg" className="w-full bg-purple-600 hover:bg-purple-700">
                <GraduationCap className="w-5 h-5 mr-2" />
                Start KNM Quiz
              </Button>
              
              <Link to="/practice-a2">
                <Button variant="outline" className="w-full">
                  Back to A2 Practice
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (lives <= 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="text-6xl mb-4">💥</div>
            <CardTitle className="text-2xl text-red-600">Game Over!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">Je hebt geen levens meer! Geen zorgen, oefening baart kunst.</p>
            <div className="space-y-4">
              <Button onClick={resetGame} className="w-full">
                Probeer Opnieuw
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

  if (gameCompleted || timeLeft === 0) {
    const rating = getScoreRating();
    const correctAnswers = Math.floor(score / 10);
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="text-6xl mb-4">🎉</div>
            <CardTitle className="text-2xl">Quiz Voltooid!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 p-4 rounded-lg">
                <div className="text-3xl font-bold text-primary">{correctAnswers}/30</div>
                <div className="text-sm text-muted-foreground">Goede Antwoorden</div>
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
                <div className="flex justify-between">
                  <span>Score:</span>
                  <span className="font-semibold">{score} punten</span>
                </div>
                <div className="flex justify-between">
                  <span>Beste Streak:</span>
                  <span className="font-semibold">{streak}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tijd Over:</span>
                  <span className="font-semibold">{formatTime(timeLeft)}</span>
                </div>
                <div className={`flex justify-between ${correctAnswers >= 18 ? 'text-green-600' : 'text-red-600'}`}>
                  <span>Status:</span>
                  <span className="font-semibold">{correctAnswers >= 18 ? 'GESLAAGD ✅' : 'NIET GESLAAGD ❌'}</span>
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <Button onClick={resetGame} className="w-full">
                  <Trophy className="w-4 h-4 mr-2" />
                  Opnieuw Spelen
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

  const question = knmQuestions[currentQuestion];
  const isCorrect = showResult && selectedAnswer !== null && parseInt(selectedAnswer) === question.correct;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Navigation */}
      <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Navigation />
        </div>
      </header>

      {/* Game Header */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/practice-a2">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Terug
              </Button>
            </Link>
            
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold">KNM Quiz</h1>
              <p className="text-purple-100">Vraag {currentQuestion + 1} van {knmQuestions.length}</p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-purple-100">Tijd</div>
              <div className="text-xl font-bold flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
          
          {/* Game Stats */}
          <div className="flex justify-center items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">Streak: {streak}</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-6 h-6 rounded-full ${i < lives ? 'bg-red-500' : 'bg-gray-400'} flex items-center justify-center text-xs font-bold`}
                >
                  ❤️
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-400" />
              <span className="text-sm">+{question.points + (streak * 5)} pts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Game Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Question Panel */}
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-purple-800 dark:text-purple-200">
                  {question.question}
                </CardTitle>
                <span className="text-sm bg-purple-100 dark:bg-purple-900 px-3 py-1 rounded-full">
                  {question.category}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                      selectedAnswer === index.toString()
                        ? showResult
                          ? isCorrect
                            ? 'border-green-500 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'border-red-500 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                          : 'border-purple-500 bg-purple-100 dark:bg-purple-900'
                        : showResult && index === question.correct
                        ? 'border-green-500 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="w-8 h-8 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center text-sm font-semibold mr-3">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </div>
                  </button>
                ))}
              </div>
              
              {showResult && (
                <div className="mt-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className={`text-lg font-semibold mb-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                  </div>
                  {!isCorrect && (
                    <p className="text-sm text-muted-foreground">
                      Het juiste antwoord is: <strong>{question.options[question.correct]}</strong>
                    </p>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowTranslation(!showTranslation)}
                    className="mt-2"
                  >
                    <Languages className="w-4 h-4 mr-2" />
                    {showTranslation ? 'Hide Translation' : 'Show Translation'}
                  </Button>
                  
                  {showTranslation && (
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                        English Translation:
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                        <strong>Q:</strong> {question.questionEn}
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                        {question.optionsEn.map((optionEn, index) => (
                          <div key={index} className={index === question.correct ? 'font-semibold' : ''}>
                            <strong>{String.fromCharCode(65 + index)}:</strong> {optionEn}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <Button 
                    onClick={handleNextQuestion} 
                    className="mt-4 w-full"
                  >
                    {currentQuestion < knmQuestions.length - 1 ? 'Volgende Vraag' : 'Quiz Voltooien'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}