import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Headphones, Play, Pause, Volume2, Trophy, Star, Clock, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';

interface ListeningQuestion {
  id: number;
  audioText: string;
  question: string;
  options: string[];
  correct: number;
  category: string;
}

const listeningQuestions: ListeningQuestion[] = [
  {
    id: 1,
    audioText: "Goedemorgen, u spreekt met de praktijk van dokter Jansen. We hebben een afspraak voor u op dinsdag 15 maart om 10:30. Kunt u dat bevestigen?",
    question: "Wanneer is de afspraak bij de dokter?",
    options: ["Maandag 15 maart om 10:30", "Dinsdag 15 maart om 10:30", "Woensdag 15 maart om 10:30", "Donderdag 15 maart om 10:30"],
    correct: 1,
    category: "Gezondheidszorg"
  },
  {
    id: 2,
    audioText: "Welkom bij Albert Heijn. Vandaag hebben we een speciale aanbieding: alle appels zijn 50% korting. U vindt ze in gang 3.",
    question: "Waar zijn de appels in de aanbieding?",
    options: ["Gang 1", "Gang 2", "Gang 3", "Gang 4"],
    correct: 2,
    category: "Winkelen"
  },
  {
    id: 3,
    audioText: "Dit is een omroepbericht voor alle reizigers. De trein naar Amsterdam heeft 15 minuten vertraging door een technische storing.",
    question: "Hoeveel vertraging heeft de trein naar Amsterdam?",
    options: ["5 minuten", "10 minuten", "15 minuten", "20 minuten"],
    correct: 2,
    category: "Vervoer"
  },
  {
    id: 4,
    audioText: "Hallo, ik ben Lisa en ik kom uit Duitsland. Ik woon nu drie jaar in Nederland en ik werk als verpleegster in het ziekenhuis.",
    question: "Wat is Lisa's beroep?",
    options: ["Dokter", "Verpleegster", "Lerares", "Secretaresse"],
    correct: 1,
    category: "Persoonlijke informatie"
  },
  {
    id: 5,
    audioText: "Het weer voor morgen: 's ochtends bewolkt met kans op regen. 's Middags wordt het zonnig met temperaturen rond de 18 graden.",
    question: "Hoe wordt het weer 's middags?",
    options: ["Bewolkt", "Regenachtig", "Zonnig", "Winderig"],
    correct: 2,
    category: "Weer"
  },
  {
    id: 6,
    audioText: "Beste klanten, onze winkel is vandaag gesloten wegens ziekte. Morgen zijn we weer gewoon open van 9 tot 17 uur.",
    question: "Waarom is de winkel vandaag gesloten?",
    options: ["Vakantie", "Ziekte", "Verbouwing", "Feestdag"],
    correct: 1,
    category: "Winkelen"
  },
  {
    id: 7,
    audioText: "Mijn naam is Ahmed en ik heb twee kinderen. Mijn zoon is 8 jaar en mijn dochter is 5 jaar. Ze gaan allebei naar de basisschool.",
    question: "Hoe oud is Ahmed's dochter?",
    options: ["5 jaar", "6 jaar", "7 jaar", "8 jaar"],
    correct: 0,
    category: "Familie"
  },
  {
    id: 8,
    audioText: "U belt met de bibliotheek. We zijn open van maandag tot vrijdag van 10 tot 18 uur en op zaterdag van 10 tot 16 uur.",
    question: "Tot hoe laat is de bibliotheek open op zaterdag?",
    options: ["16 uur", "17 uur", "18 uur", "19 uur"],
    correct: 0,
    category: "Openingstijden"
  },
  {
    id: 9,
    audioText: "Ik ga elke woensdag naar de sportschool om te fitnessen. Het kost 25 euro per maand en ik vind het heel leuk om te doen.",
    question: "Hoeveel kost de sportschool per maand?",
    options: ["20 euro", "25 euro", "30 euro", "35 euro"],
    correct: 1,
    category: "Sport"
  },
  {
    id: 10,
    audioText: "Voor het recept heb je nodig: 500 gram gehakt, 2 uien, 3 tomaten en 1 pakje spaghetti. Kook de spaghetti 10 minuten.",
    question: "Hoeveel gehakt heb je nodig?",
    options: ["300 gram", "400 gram", "500 gram", "600 gram"],
    correct: 2,
    category: "Koken"
  },
  {
    id: 11,
    audioText: "Excuseer, kunt u mij helpen? Ik zoek de Albert Cuyp markt. Is dat ver lopen vanaf hier?",
    question: "Wat zoekt de persoon?",
    options: ["Een winkel", "Een markt", "Een restaurant", "Een museum"],
    correct: 1,
    category: "Wegwijzer"
  },
  {
    id: 12,
    audioText: "Mijn auto is kapot en ik moet naar de garage. De reparatie kost 200 euro en duurt twee dagen.",
    question: "Hoeveel kost de reparatie?",
    options: ["150 euro", "200 euro", "250 euro", "300 euro"],
    correct: 1,
    category: "Auto"
  },
  {
    id: 13,
    audioText: "Welkom bij de cursus Nederlands. De lessen zijn elke dinsdag en donderdag van 19 tot 21 uur. Het boek kost 35 euro.",
    question: "Wanneer zijn de Nederlandse lessen?",
    options: ["Maandag en woensdag", "Dinsdag en donderdag", "Woensdag en vrijdag", "Donderdag en zaterdag"],
    correct: 1,
    category: "Onderwijs"
  },
  {
    id: 14,
    audioText: "Ik woon in een appartement op de derde verdieping. Het heeft twee slaapkamers, een keuken en een badkamer.",
    question: "Op welke verdieping woont de persoon?",
    options: ["Tweede verdieping", "Derde verdieping", "Vierde verdieping", "Vijfde verdieping"],
    correct: 1,
    category: "Wonen"
  },
  {
    id: 15,
    audioText: "Het concert begint om 20:00 uur. De deuren gaan open om 19:30. Kaarten kosten 15 euro aan de kassa.",
    question: "Hoe laat beginnt het concert?",
    options: ["19:30", "20:00", "20:30", "21:00"],
    correct: 1,
    category: "Evenementen"
  },
  {
    id: 16,
    audioText: "Ik werk van maandag tot vrijdag van 9 tot 17 uur. In de pauze ga ik altijd naar de kantine om te lunchen.",
    question: "Wanneer werkt de persoon?",
    options: ["Maandag tot donderdag", "Maandag tot vrijdag", "Dinsdag tot zaterdag", "Woensdag tot zondag"],
    correct: 1,
    category: "Werk"
  },
  {
    id: 17,
    audioText: "De bus naar het centrum vertrekt elk kwartier vanaf halte 3. De reis duurt ongeveer 20 minuten.",
    question: "Hoe vaak vertrekt de bus?",
    options: ["Elk kwartier", "Elk half uur", "Elk uur", "Elke twee uur"],
    correct: 0,
    category: "Vervoer"
  },
  {
    id: 18,
    audioText: "Vandaag is het bewolkt en de temperatuur is 12 graden. Morgen wordt het zonnig met 18 graden.",
    question: "Wat is de temperatuur vandaag?",
    options: ["10 graden", "12 graden", "15 graden", "18 graden"],
    correct: 1,
    category: "Weer"
  },
  {
    id: 19,
    audioText: "Mijn hobby is fotograferen. Ik ga vaak naar het park om foto's te maken van vogels en bloemen.",
    question: "Wat is de hobby van de persoon?",
    options: ["Tekenen", "Fotograferen", "Schilderen", "Lezen"],
    correct: 1,
    category: "Hobby's"
  },
  {
    id: 20,
    audioText: "Voor de pasta salade heb je nodig: pasta, tomaten, komkommer, olijven en dressing. Meng alles goed door elkaar.",
    question: "Wat heb je NIET nodig voor de pasta salade?",
    options: ["Tomaten", "Komkommer", "Kaas", "Olijven"],
    correct: 2,
    category: "Koken"
  },
  {
    id: 21,
    audioText: "De tandarts heeft tijd op vrijdag om 14:30 of maandag om 10:15. Welke tijd past u het beste?",
    question: "Welke tijden worden aangeboden?",
    options: ["Vrijdag 14:30 en maandag 10:15", "Vrijdag 15:30 en maandag 11:15", "Donderdag 14:30 en dinsdag 10:15", "Zaterdag 14:30 en woensdag 10:15"],
    correct: 0,
    category: "Afspraken"
  },
  {
    id: 22,
    audioText: "Ik ga elke zaterdag naar de markt om verse groenten en fruit te kopen. Het is goedkoper dan in de supermarkt.",
    question: "Wanneer gaat de persoon naar de markt?",
    options: ["Elke vrijdag", "Elke zaterdag", "Elke zondag", "Elke maandag"],
    correct: 1,
    category: "Winkelen"
  },
  {
    id: 23,
    audioText: "Het zwembad is open van 7:00 tot 22:00. Een dagkaart kost 5 euro voor volwassenen en 3 euro voor kinderen.",
    question: "Hoeveel kost een dagkaart voor kinderen?",
    options: ["2 euro", "3 euro", "4 euro", "5 euro"],
    correct: 1,
    category: "Sport"
  },
  {
    id: 24,
    audioText: "Mijn dochter is 6 jaar en gaat naar groep 3. Ze leert nu lezen en schrijven op school.",
    question: "Naar welke groep gaat de dochter?",
    options: ["Groep 2", "Groep 3", "Groep 4", "Groep 5"],
    correct: 1,
    category: "Onderwijs"
  },
  {
    id: 25,
    audioText: "Het restaurant is gesloten op maandag. Van dinsdag tot zondag zijn we open van 17:00 tot 23:00.",
    question: "Op welke dag is het restaurant gesloten?",
    options: ["Zondag", "Maandag", "Dinsdag", "Woensdag"],
    correct: 1,
    category: "Restaurant"
  },
  {
    id: 26,
    audioText: "Ik neem de trein van 8:15 naar mijn werk. De reis duurt 45 minuten, dus ik ben om 9:00 op kantoor.",
    question: "Hoe lang duurt de treinreis?",
    options: ["30 minuten", "45 minuten", "60 minuten", "75 minuten"],
    correct: 1,
    category: "Vervoer"
  },
  {
    id: 27,
    audioText: "Voor het feest heb ik 3 pizza's besteld, 2 flessen cola en 1 taart. Het wordt bezorgd om 18:00.",
    question: "Hoeveel pizza's zijn er besteld?",
    options: ["2", "3", "4", "5"],
    correct: 1,
    category: "Feest"
  },
  {
    id: 28,
    audioText: "Mijn huis heeft 4 kamers: 2 slaapkamers, 1 woonkamer en 1 keuken. Er is ook een kleine tuin achter het huis.",
    question: "Hoeveel slaapkamers heeft het huis?",
    options: ["1", "2", "3", "4"],
    correct: 1,
    category: "Wonen"
  },
  {
    id: 29,
    audioText: "De film begint om 20:30 en duurt 2 uur. Na de film gaan we nog wat drinken in het café.",
    question: "Hoe lang duurt de film?",
    options: ["1 uur", "1,5 uur", "2 uur", "2,5 uur"],
    correct: 2,
    category: "Uitgaan"
  },
  {
    id: 30,
    audioText: "Ik ben 25 jaar geleden naar Nederland gekomen. Nu spreek ik goed Nederlands en heb ik een Nederlandse vriend.",
    question: "Hoe lang woont de persoon al in Nederland?",
    options: ["20 jaar", "25 jaar", "30 jaar", "35 jaar"],
    correct: 1,
    category: "Persoonlijke informatie"
  }
];

export default function ListeningGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [gameStarted, setGameStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false);

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

  const playAudio = () => {
    const question = listeningQuestions[currentQuestion];
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(question.audioText);
      utterance.lang = 'nl-NL';
      utterance.rate = 0.8;
      utterance.onend = () => {
        setIsPlaying(false);
        setHasPlayedAudio(true);
      };
      speechSynthesis.speak(utterance);
    }
  };

  const stopAudio = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult || !hasPlayedAudio) return;
    
    setSelectedAnswer(answerIndex.toString());
    const question = listeningQuestions[currentQuestion];
    const isCorrect = answerIndex === question.correct;
    
    setShowResult(true);
    
    if (isCorrect) {
      setScore(score + 10 + (streak * 5));
      setStreak(streak + 1);
    } else {
      setStreak(0);
      setLives(lives - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < listeningQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setHasPlayedAudio(false);
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
    setTimeLeft(30 * 60);
    setGameStarted(false);
    setHasPlayedAudio(false);
  };

  const getScoreRating = () => {
    const correctAnswers = Math.floor(score / 10);
    if (correctAnswers >= 24) return { rating: "Uitstekend!", color: "text-green-600", stars: 3 };
    if (correctAnswers >= 18) return { rating: "Goed!", color: "text-blue-600", stars: 2 };
    if (correctAnswers >= 12) return { rating: "Redelijk!", color: "text-orange-600", stars: 1 };
    return { rating: "Blijf oefenen!", color: "text-red-600", stars: 0 };
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full text-center">
          <CardHeader>
            <div className="text-6xl mb-4">🎧</div>
            <CardTitle className="text-3xl text-indigo-800 dark:text-indigo-200">Listening Practice</CardTitle>
            <p className="text-lg text-muted-foreground">A2 Luistervaardigheid Oefening</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Exam Information</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span className="font-semibold">30</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Limit:</span>
                    <span className="font-semibold">30 minutes</span>
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
                <h4 className="font-semibold">Instructions:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Listen carefully to each audio fragment</li>
                  <li>• You can replay the audio once</li>
                  <li>• Answer the question based on what you heard</li>
                  <li>• You must listen to the audio before answering</li>
                </ul>
              </div>
              
              <Button onClick={() => setGameStarted(true)} size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700">
                <Headphones className="w-5 h-5 mr-2" />
                Start Listening Test
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

  if (gameCompleted) {
    const rating = getScoreRating();
    const correctAnswers = Math.floor(score / 10);
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="text-6xl mb-4">🎉</div>
            <CardTitle className="text-2xl">Luistertest Voltooid!</CardTitle>
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
                <div className={`flex justify-between ${correctAnswers >= 18 ? 'text-green-600' : 'text-red-600'}`}>
                  <span>Status:</span>
                  <span className="font-semibold">{correctAnswers >= 18 ? 'GESLAAGD ✅' : 'NIET GESLAAGD ❌'}</span>
                </div>
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

  const question = listeningQuestions[currentQuestion];
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
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/practice-a2">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Terug
              </Button>
            </Link>
            
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold">Luistertest</h1>
              <p className="text-indigo-100">Vraag {currentQuestion + 1} van {listeningQuestions.length}</p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-indigo-100">Tijd</div>
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
              <span className="text-sm">+{10 + (streak * 5)} pts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Game Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Audio Player */}
          <Card className="mb-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border-indigo-200 dark:border-indigo-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Headphones className="w-6 h-6 text-indigo-600" />
                <CardTitle className="text-xl">Luister naar het audiofragment</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                {!isPlaying ? (
                  <Button 
                    onClick={playAudio}
                    size="lg"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    <Play className="w-6 h-6 mr-2" />
                    Speel Audio Af
                  </Button>
                ) : (
                  <Button 
                    onClick={stopAudio}
                    size="lg"
                    variant="destructive"
                  >
                    <Pause className="w-6 h-6 mr-2" />
                    Stop Audio
                  </Button>
                )}
              </div>
              
              {isPlaying && (
                <div className="flex items-center justify-center mt-4 space-x-2 text-indigo-600">
                  <Volume2 className="w-5 h-5" />
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-2 h-6 bg-indigo-600 rounded animate-pulse" style={{animationDelay: `${i * 0.2}s`}}></div>
                    ))}
                  </div>
                  <span className="text-sm font-medium">Audio wordt afgespeeld...</span>
                </div>
              )}
              
              {hasPlayedAudio && !isPlaying && (
                <div className="text-center mt-4">
                  <p className="text-sm text-green-600 font-semibold">✅ Audio afgespeeld - Je kunt nu de vraag beantwoorden</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Question Panel */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
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
                    disabled={showResult || !hasPlayedAudio}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                      !hasPlayedAudio 
                        ? 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-50'
                        : selectedAnswer === index.toString()
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
              
              {!hasPlayedAudio && (
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    ⚠️ Speel eerst het audiofragment af voordat je een antwoord kunt geven.
                  </p>
                </div>
              )}
              
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
                    onClick={handleNextQuestion} 
                    className="mt-4 w-full"
                  >
                    {currentQuestion < listeningQuestions.length - 1 ? 'Volgende Vraag' : 'Test Voltooien'}
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