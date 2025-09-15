import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Star, Trophy, Target, ArrowLeft, CheckCircle, XCircle, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import heroImage from '@/assets/dutch-hero.jpg';

export default function ReadingGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [lives, setLives] = useState(3);

  const gameData = {
    texts: [
      {
        id: 1,
        title: "Tekst over Vuurwerk",
        content: `Het is december. Paulo krijgt van de gemeente een folder met informatie

Wanneer mag u vuurwerk afsteken?
U mag vuurwerk afsteken tussen 31 december 18.00 uur en 1 januari 02.00 uur. U kunt een boete van € 100 krijgen als u vuurwerk afsteekt buiten deze tijden.

Vuurwerkverbod op bepaalde plekken
In onze gemeente is op sommige plekken het afsteken van vuurwerk verboden: in het winkelcentrum, in de buurt van het Maxima-ziekenhuis en bij alle kinderboerderijen.

Veilig vuurwerk afsteken
Gaat u tijdens de jaarwisseling vuurwerk afsteken of buiten naar het vuurwerk kijken? Dan kunt u het beste uw ogen beschermen met een vuurwerkbril.`
      },
      {
        id: 2,
        title: "E-mail van Adriaan en Olivier",
        content: `Nanda krijgt een e-mail van haar broer Adriaan en zijn vriend Olivier.
Zij schrijven haar over het plan voor het weekend.

Hoi Nanda
Hoe gaat het met je? Met ons is alles goed. Het is druk in onze kaaswinkel en ook bij ons thuis. Dit weekend hebben we een afspraak met je. We hadden afgesproken, dat we zaterdagochtend om 10 uur bij jou zijn. We gaan je trakteren op een dagje uit. We komen, maar we moeten in de ochtend nog werken in onze winkel. Dus 10 uur redden we niet. Het wordt iets later, we denken half 12. We sturen je een foto mee van het bootje, dat we gehuurd hebben. Daarmee gaan we zaterdagmiddag samen het water op. Leuk, toch?
Wij slapen van zaterdag op zondag in een Bed & Breakfast, dichtbij jouw huis.

Op zondagochtend gaan we zoals afgesproken samen met jou om 10 uur naar de kerk. We hebben er zin in!
Groetjes en tot zaterdag, Adriaan & Olivier`
      }
    ],
    
    questions: [
      {
        id: 1,
        textId: 1,
        question: "Paulo wil vuurwerk afsteken met oud & nieuw. Wanneer mag dat precies?",
        options: [
          "Alleen op 31 december de hele dag.",
          "Alleen op 1 januari de hele dag.", 
          "Van 31 december om 18 uur 's avonds tot 1 januari om 2 uur 's nachts.",
          "Op 31 december & op 1 januari de hele dag."
        ],
        correct: 2,
        points: 100
      },
      {
        id: 2,
        textId: 1,
        question: "Paulo wil vuurwerk afsteken. Waar mag hij dat doen?",
        options: [
          "Dichtbij het ziekenhuis.",
          "In het winkelcentrum.",
          "Niet bij het ziekenhuis en ook niet in het winkelcentrum."
        ],
        correct: 2,
        points: 100
      },
      {
        id: 3,
        textId: 1,
        question: "Paulo koopt een vuurwerkbril. Waarom koopt hij die speciale bril?",
        options: [
          "Die bril beschermt zijn ogen.",
          "Met die bril kan hij het vuurwerk beter zien.",
          "De vuurwerkbril is verplicht."
        ],
        correct: 0,
        points: 100
      },
      {
        id: 4,
        textId: 2,
        question: "Nanda krijgt bezoek. Wanneer komen Adriaan en Olivier aan?",
        options: [
          "Op zaterdagochtend om 10 uur.",
          "Op zaterdagochtend om half 12.",
          "Op zondagochtend om 10 uur.",
          "Zaterdagmiddag."
        ],
        correct: 1,
        points: 100
      },
      {
        id: 5,
        textId: 2,
        question: "Moeten Adriaan en Olivier op zaterdag werken?",
        options: [
          "Ja, zij moeten eerst werken op hun boot.",
          "Ja, zij moeten eerst werken in hun winkel.",
          "Ja, zij hebben een Bed & Breakfast-bedrijf.",
          "Nee, zij staan vroeg op en gaan extra vroeg naar Nanda."
        ],
        correct: 1,
        points: 100
      }
    ]
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex.toString());
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const question = gameData.questions[currentQuestion];
    const isCorrect = parseInt(selectedAnswer) === question.correct;
    
    setShowResult(true);
    
    if (isCorrect) {
      setScore(score + question.points + (streak * 10));
      setStreak(streak + 1);
    } else {
      setStreak(0);
      setLives(lives - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < gameData.questions.length - 1) {
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
  };

  const getScoreRating = () => {
    const maxScore = gameData.questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 90) return { rating: "Excellent!", color: "text-green-600", stars: 3 };
    if (percentage >= 70) return { rating: "Good!", color: "text-blue-600", stars: 2 };
    if (percentage >= 50) return { rating: "Not bad!", color: "text-orange-600", stars: 1 };
    return { rating: "Keep practicing!", color: "text-red-600", stars: 0 };
  };

  if (lives <= 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="text-6xl mb-4">💥</div>
            <CardTitle className="text-2xl text-red-600">Game Over!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">You ran out of lives! Don't worry, practice makes perfect.</p>
            <div className="space-y-4">
              <Button onClick={resetGame} className="w-full">
                Try Again
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

  if (gameCompleted) {
    const rating = getScoreRating();
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="text-6xl mb-4">🎉</div>
            <CardTitle className="text-2xl">Congratulations!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 p-4 rounded-lg">
                <div className="text-3xl font-bold text-primary">{score}</div>
                <div className="text-sm text-muted-foreground">Total Score</div>
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
                  <span>Questions Correct:</span>
                  <span className="font-semibold">{gameData.questions.filter((_, i) => i <= currentQuestion).length - (3 - lives)} / {gameData.questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Best Streak:</span>
                  <span className="font-semibold">{streak}</span>
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <Button onClick={resetGame} className="w-full">
                  <Trophy className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
                <Link to="/practice-a2">
                  <Button variant="outline" className="w-full">
                    Back to A2 Practice
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = gameData.questions[currentQuestion];
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
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/practice-a2">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold">Reading Challenge</h1>
              <p className="text-blue-100">Question {currentQuestion + 1} of {gameData.questions.length}</p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-blue-100">Score</div>
              <div className="text-2xl font-bold">{score}</div>
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
              <span className="text-sm">+{question.points + (streak * 10)} pts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Game Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Text Panel */}
          <Card className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <CardTitle className="text-xl">{gameData.texts.find(t => t.id === question.textId)?.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-sm">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {gameData.texts.find(t => t.id === question.textId)?.content}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Question Panel */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="text-xl text-purple-800 dark:text-purple-200">
                {question.question}
              </CardTitle>
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
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex-1">{String.fromCharCode(97 + index)}. {option}</span>
                      {showResult && (
                        <div className="ml-4">
                          {index === question.correct ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : selectedAnswer === index.toString() ? (
                            <XCircle className="w-6 h-6 text-red-600" />
                          ) : null}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center mt-8">
                {!showResult ? (
                  <Button 
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    size="lg"
                    className="px-8"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <div className="text-center space-y-4">
                    {isCorrect ? (
                      <div className="text-green-600 font-semibold text-lg">
                        🎉 Correct! +{question.points + (streak * 10)} points
                        {streak > 0 && <div className="text-sm">Streak bonus: +{streak * 10}</div>}
                      </div>
                    ) : (
                      <div className="text-red-600 font-semibold text-lg">
                        ❌ Incorrect! -1 life
                      </div>
                    )}
                    <Button onClick={handleNextQuestion} size="lg" className="px-8">
                      {currentQuestion < gameData.questions.length - 1 ? 'Next Question' : 'Finish Game'}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}