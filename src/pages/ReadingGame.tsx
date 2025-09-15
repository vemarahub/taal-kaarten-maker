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
      },
      {
        id: 3,
        title: "E-mail over Autoverzekering",
        content: `Fatima heeft schade aan haar nieuwe auto. Zij wil de kosten van de schade vergoed krijgen van de verzekeringsmaatschappij. Zij krijgt deze e-mail.

Geachte heer, mevrouw,
Wij hebben uw vraag over schadevergoeding ontvangen. U heeft schade aan uw nieuwe auto. U wilt dat wij deze schade vergoeden. U hebt ons alle informatie gestuurd over de schade.
Op basis van de informatie die u ons heeft gegeven, kunnen we u het volgende meedelen: u hebt recht op een schadevergoeding, maar u hebt ook een eigen risico van € 250. U moet, zoals ook in de polis staat, uw auto laten repareren bij uw eigen Toyota-garage.
Wij wensen u na deze reparatie weer veel schadevrije kilometers!
Met vriendelijke groet,`
      },
      {
        id: 4,
        title: "Reclame voor Storyplus Magazine",
        content: `Maxima ziet een folder met reclame voor een abonnement op een tijdschrift.

Storyplus –magazine – speciaal voor u!
40% korting
Storyplus –magazine is al tientallen jaren het belangrijkste tijdschrift voor iedereen die alles wil weten van de Nederlandse televisiesterren en de leden van het koninklijk huis. En zegt u nu zelf: wie wil dat niet?
Storyplus –magazine verschijnt wekelijks. Wij hebben voor u een speciaal aanbod: U betaalt niet € 82,95, maar slechts € 49,75 voor een jaarabonnement. Dat is een korting van 40%. U betaalt minder dan 1 euro per week!
Wilt u straks ook alles weten over onze koning, over onze koningin en over hun kinderen? Wilt u het laatste nieuws weten over alle bekende Nederlanders die u elke dag op de televisie ziet? Dat kan!
Laat deze unieke kans niet lopen: bel uiterlijk vóór 31 december naar 0900 – 244.62 44 of vul (vóór 31 december) het formulier in op www.storyplus.nl
Storyplus –magazine … Lees ons elke week en u weet echt alles!!!`
      },
      {
        id: 5,
        title: "Clara's Ontslagmail",
        content: `Clara schrijft deze e-mail aan haar baas, Karel de Schone.

Aan: karel@deschone.nl
CC:
Onderwerp: stoppen met werken bij De Schone B.V.

Beste Karel de Schone,
Ik schrijf u deze mail om u te vertellen dat ik stop met het werk bij het bedrijf De Schone B.V.
Ik heb twee jaar lang bij u gewerkt, maar u wilt mij geen vast contract geven. Ook vind ik het salaris onvoldoende. Daarom ga ik weg.
Ik heb met plezier het werk gedaan en ik heb fijne collega's gehad, maar ik kan bij een andere werkgever een beter contract krijgen.
Ik wil per direct stoppen. Ik kom dus morgen ook niet werken.
Mijn collega's Maria en Carolien kunnen deze week mijn werk overnemen. Zij weten, dat ik stop bij uw bedrijf en zij weten dat ik deze mail aan u schrijf.
Met vriendelijke groet,
Clara Marks.`
      },
      {
        id: 6,
        title: "Zwangerschapscursus Folder",
        content: `Manou is 18 weken zwanger. Zij krijgt een folder van haar huisarts.

'Fit voor de bevalling'
Je krijgt binnenkort een kindje. Spannend!
Geef je nu op voor de zwangerschapscursus 'Fit voor de bevalling'. Tijdens de cursus die begint op 1 maart, krijg je veel informatie over de zwangerschap en je doet ook wekelijks yoga-oefeningen in Het Buurtcentrum in Kollum.
Deze oefeningen zijn belangrijk als na 9 maanden de baby komt! Met speciale ademhaling kun je in deze periode tot en met de geboorte van je kindje fit blijven. Je komt naar de cursus samen met andere aanstaande moeders.
Lesinformatie
De cursus bestaat uit 7 lessen à 90 minuten en vindt plaats in kleine groepen (maximaal 10 deelnemers).
Kosten Zwangerschapsyoga: € 85
Tijdstip: Maandagavond 19.15 uur. Start: 1 maart.
Plaats: Buurtcentrum, Hoofdstraat 1, Kollum`
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
      },
      {
        id: 6,
        textId: 3,
        question: "Hoeveel schadevergoeding krijgt Fatima?",
        options: [
          "De schade aan de nieuwe auto wordt 100% vergoed.",
          "Zij zal € 250 euro schadevergoeding krijgen van de verzekering.",
          "Zij krijgt een vergoeding, maar zij moet € 250 zelf betalen.",
          "De garage weet hoeveel schadevergoeding Fatima zal krijgen."
        ],
        correct: 2,
        points: 100
      },
      {
        id: 7,
        textId: 3,
        question: "Wie gaat de auto repareren?",
        options: [
          "Fatima heeft de auto zelf gerepareerd.",
          "De ARAG repareert de auto van Fatima.",
          "De Toyota-garage gaat de auto van Fatima repareren."
        ],
        correct: 2,
        points: 100
      },
      {
        id: 8,
        textId: 4,
        question: "Wat voor soort tijdschrift is Storyplus –magazine?",
        options: [
          "Een dagblad.",
          "Een maandblad.",
          "Een weekblad."
        ],
        correct: 2,
        points: 100
      },
      {
        id: 9,
        textId: 4,
        question: "Wat voor nieuws kan Maxima lezen in Storyplus –magazine?",
        options: [
          "Nieuws over het koninklijk huis.",
          "Nieuws over belangrijke politieke zaken.",
          "Nieuws over kleding die je met 40% korting kunt kopen."
        ],
        correct: 0,
        points: 100
      },
      {
        id: 10,
        textId: 4,
        question: "Maxima wil een jaarabonnement nemen op Storyplus –magazine. Hoe kan zij gebruik maken van deze aanbieding van 40% korting?",
        options: [
          "Zij moet deze week € 49,75 betalen aan Storyplus –magazine.",
          "Zij moet deze maand € 49,75 betalen aan Storyplus –magazine.",
          "Zij moet vóór 31 december bellen of een formulier invullen."
        ],
        correct: 2,
        points: 100
      },
      {
        id: 11,
        textId: 5,
        question: "Waarom stopt Clara met werken bij De Schone B.V.?",
        options: [
          "Zij is ontevreden over haar salaris en over haar contract.",
          "Zij vindt dat werk niet leuk.",
          "Zij heeft ruzie met haar collega's Maria en Carolien."
        ],
        correct: 0,
        points: 100
      },
      {
        id: 12,
        textId: 5,
        question: "Wanneer stopt Clara precies met het werk bij De Schone B.V.?",
        options: [
          "Over twee jaar.",
          "Overmorgen.",
          "Over een week.",
          "Vandaag."
        ],
        correct: 3,
        points: 100
      },
      {
        id: 13,
        textId: 6,
        question: "Manou wil graag fit blijven in de periode van de zwangerschap. Wat gaat zij doen?",
        options: [
          "Zij gaat 7 weken lang meedoen aan een cursus zwangerschapsyoga.",
          "Zij gaat 9 maanden lang meedoen aan de cursus zwangerschapsyoga.",
          "Zij gaat 18 weken lang meedoen aan de cursus zwangerschapsyoga."
        ],
        correct: 0,
        points: 100
      },
      {
        id: 14,
        textId: 6,
        question: "Manou wil meedoen aan deze cursus. Wat krijgt zij tijdens de cursus?",
        options: [
          "Een kindje.",
          "Betere ademhaling.",
          "Zij krijgt veel informatie en zij gaat veel yoga-oefeningen doen."
        ],
        correct: 2,
        points: 100
      },
      {
        id: 15,
        textId: 6,
        question: "Hoe lang duurt één les?",
        options: [
          "1 uur.",
          "1,5 uur.",
          "Dat staat niet in deze tekst."
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