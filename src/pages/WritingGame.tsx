import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, PenTool, Clock, Trophy, Star, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';

interface WritingTask {
  id: number;
  title: string;
  instruction: string;
  maxScore: number;
  timeLimit: number; // in minutes
  type: 'email' | 'form' | 'text';
  hints?: string[];
}

const writingTasks: WritingTask[] = [
  {
    id: 1,
    title: "E-mail: Rijexamen uitstellen",
    instruction: "U moet volgende week rijexamen doen, maar u hebt uw arm gebroken. U schrijft een brief aan het bureau voor de rijexamens. In de brief schrijft u waarom u niet kunt deelnemen aan het examen. Ook vraagt u het bureau voor rijexamens wat u in deze situatie moet doen.\n\nAan: info@rijexamen.nl\nOnderwerp: mijn examen volgende week",
    maxScore: 10,
    timeLimit: 30,
    type: 'email',
    hints: [
      "Begin met een beleefte aanhef",
      "Leg uit wat er gebeurd is",
      "Vraag wat u moet doen",
      "Eindig beleefd"
    ]
  },
  {
    id: 2,
    title: "Formulier: Cursus Engels",
    instruction: "U wilt meedoen aan een cursus Engels. U bent geen absolute beginner. U spreekt goed Engels, maar u weet dat u slecht Engels schrijft. Daarom wilt u uw schrijfvaardigheid verbeteren. Vul het formulier in.\n\nVoornaam: ___________\nAchternaam: ___________\nAdres: ___________\nPostcode: ___________\nWoonplaats: ___________\nGeboortedatum: ___________\nTelefoonnummer: ___________\nE-mailadres: ___________\n\nOp welke dag en dagdeel wilt u naar de cursus? (Kies drie dagdelen)\n\nUw vooropleiding: □ Hoogopgeleid □ Middenopgeleid □ Laagopgeleid\n\nWelke vaardigheid wilt u verbeteren?\n□ Schrijfvaardigheid □ Leesvaardigheid □ Luistervaardigheid\n\nWaarom wilt u deze vaardigheid verbeteren?",
    maxScore: 8,
    timeLimit: 25,
    type: 'form',
    hints: [
      "Vul alle velden in",
      "Kies schrijfvaardigheid",
      "Leg uit waarom u wilt verbeteren"
    ]
  },
  {
    id: 3,
    title: "Wijkkrant: Nieuwe bewoner",
    instruction: "U krijgt elke week een wijkkrant. Iedereen uit de buurt mag iets voor deze krant schrijven. U bent verhuisd en u woont nu in een nieuwe wijk. U schrijft in de wijkkrant iets over uzelf. Zo weten uw buurtbewoners beter wie u bent. Schrijf minimaal drie zinnen op.\n\nDenk aan:\n- Wat is uw naam, waar komt u vandaan?\n- Wie zijn uw buren?\n- Met wie woont u in uw nieuwe huis?\n\nSchrijf in hele zinnen.",
    maxScore: 10,
    timeLimit: 20,
    type: 'text',
    hints: [
      "Stel uzelf voor",
      "Vertel waar u vandaan komt",
      "Beschrijf uw woonsituatie",
      "Gebruik hele zinnen"
    ]
  },
  {
    id: 4,
    title: "E-mail: Computercursus missen",
    instruction: "U hebt zich ingeschreven voor een computercursus. De cursus begint volgende week maandagavond. U gaat wel meedoen aan de cursus, maar de eerste avond kunt u niet komen, want u hebt iets anders te doen. U schrijft een brief aan de school die de cursus organiseert. In de brief schrijft u waarom u niet kunt komen op deze maandagavond. U vraagt verder of u deze eerste les kunt inhalen. Tenslotte schrijft u dat u op de andere maandagen wel kunt komen.",
    maxScore: 10,
    timeLimit: 30,
    type: 'email',
    hints: [
      "Leg uit dat u ingeschreven bent",
      "Vertel waarom u niet kunt komen",
      "Vraag of u de les kunt inhalen",
      "Bevestig dat u andere lessen wel kunt bijwonen"
    ]
  }
];

export default function WritingGame() {
  const [currentTask, setCurrentTask] = useState(0);
  const [userText, setUserText] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !taskCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted && !taskCompleted) {
      handleSubmitTask();
    }
  }, [timeLeft, gameStarted, taskCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTask = () => {
    setGameStarted(true);
    setTimeLeft(writingTasks[currentTask].timeLimit * 60);
    setUserText('');
    setTaskCompleted(false);
    setShowHints(false);
  };

  const handleSubmitTask = () => {
    setTaskCompleted(true);
    // Simple scoring based on text length and basic criteria
    const task = writingTasks[currentTask];
    const wordCount = userText.trim().split(/\s+/).length;
    let score = 0;
    
    if (wordCount >= 30) score += 3;
    if (wordCount >= 50) score += 2;
    if (userText.includes('Geachte') || userText.includes('Beste')) score += 1;
    if (userText.includes('Met vriendelijke groet') || userText.includes('Groeten')) score += 1;
    if (task.type === 'email' && userText.toLowerCase().includes('vraag')) score += 2;
    if (task.type === 'text' && userText.split('.').length >= 3) score += 1;
    
    score = Math.min(score, task.maxScore);
    setScores([...scores, score]);
  };

  const handleNextTask = () => {
    if (currentTask < writingTasks.length - 1) {
      setCurrentTask(currentTask + 1);
      setGameStarted(false);
      setTaskCompleted(false);
      setUserText('');
    } else {
      setGameCompleted(true);
    }
  };

  const resetGame = () => {
    setCurrentTask(0);
    setUserText('');
    setGameStarted(false);
    setTaskCompleted(false);
    setGameCompleted(false);
    setScores([]);
    setTimeLeft(0);
  };

  const getTotalScore = () => scores.reduce((sum, score) => sum + score, 0);
  const getMaxPossibleScore = () => writingTasks.reduce((sum, task) => sum + task.maxScore, 0);

  const getScoreRating = () => {
    const percentage = (getTotalScore() / getMaxPossibleScore()) * 100;
    if (percentage >= 80) return { rating: "Uitstekend!", color: "text-green-600", stars: 3 };
    if (percentage >= 60) return { rating: "Goed!", color: "text-blue-600", stars: 2 };
    if (percentage >= 40) return { rating: "Redelijk!", color: "text-orange-600", stars: 1 };
    return { rating: "Blijf oefenen!", color: "text-red-600", stars: 0 };
  };

  if (!gameStarted && !taskCompleted && !gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full text-center">
          <CardHeader>
            <div className="text-6xl mb-4">✍️</div>
            <CardTitle className="text-3xl text-green-800 dark:text-green-200">Writing Practice</CardTitle>
            <p className="text-lg text-muted-foreground">A2 Schrijfvaardigheid Oefening</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Taak {currentTask + 1} van {writingTasks.length}</h3>
                <div className="text-left space-y-2">
                  <h4 className="font-semibold text-green-800 dark:text-green-200">{writingTasks[currentTask].title}</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span>Maximale score:</span>
                      <span className="font-semibold">{writingTasks[currentTask].maxScore} punten</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tijd:</span>
                      <span className="font-semibold">{writingTasks[currentTask].timeLimit} minuten</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-left bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Opdracht:</h4>
                <p className="text-sm whitespace-pre-line">{writingTasks[currentTask].instruction}</p>
              </div>
              
              <Button onClick={startTask} size="lg" className="w-full bg-green-600 hover:bg-green-700">
                <PenTool className="w-5 h-5 mr-2" />
                Start Schrijfopdracht
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
            <CardTitle className="text-2xl">Schrijfoefening Voltooid!</CardTitle>
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
                    <span>Taak {index + 1}:</span>
                    <span className="font-semibold">{score}/{writingTasks[index].maxScore}</span>
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

  const task = writingTasks[currentTask];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Navigation */}
      <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Navigation />
        </div>
      </header>

      {/* Game Header */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/practice-a2">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Terug
              </Button>
            </Link>
            
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold">Schrijfoefening</h1>
              <p className="text-green-100">Taak {currentTask + 1} van {writingTasks.length}</p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-green-100">Tijd</div>
              <div className="text-xl font-bold flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Writing Interface */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Task Instructions */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-green-800 dark:text-green-200">
                  {task.title}
                </CardTitle>
                <span className="text-sm bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">
                  Max: {task.maxScore} punten
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {task.instruction}
                </pre>
              </div>
              
              {task.hints && (
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowHints(!showHints)}
                  >
                    {showHints ? 'Verberg Tips' : 'Toon Tips'}
                  </Button>
                  
                  {showHints && (
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                        Tips:
                      </div>
                      <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                        {task.hints.map((hint, index) => (
                          <li key={index}>• {hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Writing Area */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PenTool className="w-5 h-5" />
                Uw Tekst
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                placeholder="Begin hier met schrijven..."
                className="min-h-[300px] text-base leading-relaxed"
                disabled={taskCompleted}
              />
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">
                  Woorden: {userText.trim() ? userText.trim().split(/\s+/).length : 0}
                </div>
                
                {!taskCompleted ? (
                  <Button onClick={handleSubmitTask} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Inleveren
                  </Button>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Score: {scores[scores.length - 1]}/{task.maxScore}</span>
                    </div>
                    <Button onClick={handleNextTask}>
                      {currentTask < writingTasks.length - 1 ? 'Volgende Taak' : 'Voltooien'}
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