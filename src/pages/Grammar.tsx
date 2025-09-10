import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Target, Users, Volume2, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import heroImage from '@/assets/dutch-hero.jpg';

interface QuizQuestion {
  word: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    word: "man",
    options: ["manen", "mannen"],
    correct: 1,
    explanation: "'Man' has a short 'a', so we double the 'n' to keep it short: mannen"
  },
  {
    word: "maan",
    options: ["manen", "maanen"],
    correct: 0,
    explanation: "'Maan' has a long 'aa', so we drop one 'a' in plural: manen"
  },
  {
    word: "bot",
    options: ["boten", "botten"],
    correct: 1,
    explanation: "'Bot' has a short 'o', so we double the 't' to keep it short: botten"
  },
  {
    word: "boot",
    options: ["boten", "booten"],
    correct: 0,
    explanation: "'Boot' has a long 'oo', so we drop one 'o' in plural: boten"
  },
  {
    word: "vis",
    options: ["visen", "vissen"],
    correct: 1,
    explanation: "'Vis' has a short 'i', so we double the 's' to keep it short: vissen"
  }
];

export default function Grammar() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    resetQuiz();
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === quizQuestions[currentQuiz].correct) {
      setScore(score + 1);
      toast.success("Correct!");
    } else {
      toast.error("Try again!");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
      toast.success(`Quiz completed! Score: ${score + (selectedAnswer === quizQuestions[currentQuiz].correct ? 1 : 0)}/${quizQuestions.length}`);
    }
  };

  if (selectedTopic === 'klinkers') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button onClick={handleBackToTopics} variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Topics
              </Button>
              <h1 className="text-2xl font-bold">Klinkers (Vowels)</h1>
              <div className="w-32" />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Volume2 className="w-6 h-6" />
                Lange en Korte Klinkers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Klinkers (Vowels):</h3>
                  <p className="text-lg font-mono bg-muted p-2 rounded">A, E, I, O, U</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Medeklinkers (Consonants):</h3>
                  <p className="text-sm font-mono bg-muted p-2 rounded">B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Z</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Lettergreep (Syllables) Examples:</h3>
                <p className="font-mono bg-muted p-2 rounded">Li-sa, Ca-ro-li-na, Sil-ves-ter, Ba-naan, To-ma-ten</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Important Rule:</h3>
                <p className="text-blue-700 dark:text-blue-300">Een klinker aan het einde van een lettergreep is lang.</p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">(A vowel at the end of a syllable is long.)</p>
              </div>
            </CardContent>
          </Card>

          {/* Vowel Examples */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* A Examples */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-center">A</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <h4 className="font-semibold mb-2">Korte A</h4>
                    <div className="space-y-2">
                      <p className="font-mono text-lg">a</p>
                      <div className="bg-red-50 dark:bg-red-950 p-2 rounded">
                        <p className="font-bold">man</p>
                        <p className="text-sm">↓</p>
                        <p className="font-bold">mannen</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Lange A</h4>
                    <div className="space-y-2">
                      <p className="font-mono text-lg">aa / a</p>
                      <div className="bg-green-50 dark:bg-green-950 p-2 rounded">
                        <p className="font-bold">maan</p>
                        <p className="text-sm">↓</p>
                        <p className="font-bold">manen</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* O Examples */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-center">O</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <h4 className="font-semibold mb-2">Korte O</h4>
                    <div className="space-y-2">
                      <p className="font-mono text-lg">o</p>
                      <div className="bg-red-50 dark:bg-red-950 p-2 rounded">
                        <p className="font-bold">bot</p>
                        <p className="text-sm">↓</p>
                        <p className="font-bold">botten</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Lange O</h4>
                    <div className="space-y-2">
                      <p className="font-mono text-lg">oo / o</p>
                      <div className="bg-green-50 dark:bg-green-950 p-2 rounded">
                        <p className="font-bold">boot</p>
                        <p className="text-sm">↓</p>
                        <p className="font-bold">boten</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* U Examples */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-center">U</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <h4 className="font-semibold mb-2">Korte U</h4>
                    <div className="space-y-2">
                      <p className="font-mono text-lg">u</p>
                      <div className="bg-red-50 dark:bg-red-950 p-2 rounded">
                        <p className="font-bold">bus</p>
                        <p className="text-sm">↓</p>
                        <p className="font-bold">bussen</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Lange U</h4>
                    <div className="space-y-2">
                      <p className="font-mono text-lg">uu / u</p>
                      <div className="bg-green-50 dark:bg-green-950 p-2 rounded">
                        <p className="font-bold">muur</p>
                        <p className="text-sm">↓</p>
                        <p className="font-bold">muren</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* E Examples */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-center">E</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <h4 className="font-semibold mb-2">Korte E</h4>
                    <div className="space-y-2">
                      <p className="font-mono text-lg">e</p>
                      <div className="bg-red-50 dark:bg-red-950 p-2 rounded">
                        <p className="font-bold">pen</p>
                        <p className="text-sm">↓</p>
                        <p className="font-bold">pennen</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Lange E</h4>
                    <div className="space-y-2">
                      <p className="font-mono text-lg">ee / e</p>
                      <div className="bg-green-50 dark:bg-green-950 p-2 rounded">
                        <p className="font-bold">been</p>
                        <p className="text-sm">↓</p>
                        <p className="font-bold">benen</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* I Examples */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-center">I</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <h4 className="font-semibold mb-2">Korte I</h4>
                    <div className="space-y-2">
                      <p className="font-mono text-lg">i</p>
                      <div className="bg-red-50 dark:bg-red-950 p-2 rounded">
                        <p className="font-bold">vis</p>
                        <p className="text-sm">↓</p>
                        <p className="font-bold">vissen</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Lange I</h4>
                    <div className="space-y-2">
                      <p className="font-mono text-lg">ie / i</p>
                      <div className="bg-green-50 dark:bg-green-950 p-2 rounded">
                        <p className="font-bold">dier</p>
                        <p className="text-sm">↓</p>
                        <p className="font-bold">dieren</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Explanation */}
          <Card>
            <CardHeader>
              <CardTitle>How It Works: Step by Step</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Long Vowel Example: maan → manen</h3>
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-2">
                    <p><strong>Step 1:</strong> maan + en = maanen</p>
                    <p><strong>Step 2:</strong> Split syllables: maa-nen</p>
                    <p><strong>Step 3:</strong> Vowel at end of syllable is long</p>
                    <p><strong>Step 4:</strong> Drop one 'a': ma-nen = <strong>manen</strong></p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Short Vowel Example: man → mannen</h3>
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg space-y-2">
                    <p><strong>Step 1:</strong> man + en = manen</p>
                    <p><strong>Step 2:</strong> But 'manen' = long 'a' (wrong!)</p>
                    <p><strong>Step 3:</strong> Double consonant to keep vowel short</p>
                    <p><strong>Step 4:</strong> man + n + en = <strong>mannen</strong></p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                Practice Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!quizCompleted ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {quizQuestions.length}</h3>
                    <div className="text-sm text-muted-foreground">Score: {score}/{quizQuestions.length}</div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <p className="text-lg">What is the plural of:</p>
                    <p className="text-3xl font-bold text-primary">{quizQuestions[currentQuiz].word}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {quizQuestions[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? 
                          (index === quizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                          "outline"
                        }
                        className={`p-4 text-lg ${
                          showResult && index === quizQuestions[currentQuiz].correct ? 
                          "bg-green-500 hover:bg-green-600" : ""
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                      >
                        {showResult && index === quizQuestions[currentQuiz].correct && (
                          <CheckCircle className="w-5 h-5 mr-2" />
                        )}
                        {showResult && selectedAnswer === index && index !== quizQuestions[currentQuiz].correct && (
                          <XCircle className="w-5 h-5 mr-2" />
                        )}
                        {option}
                      </Button>
                    ))}
                  </div>

                  {showResult && (
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-semibold mb-2">Explanation:</p>
                        <p>{quizQuestions[currentQuiz].explanation}</p>
                      </div>
                      <Button onClick={handleNextQuestion} className="w-full">
                        {currentQuiz < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                  <p className="text-lg">Final Score: {score}/{quizQuestions.length}</p>
                  <Button onClick={resetQuiz} className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Navigation */}
      <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Navigation />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-accent/90 to-primary/90" />
        
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Dutch Grammar
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Learn the basic rules of Dutch grammar. Perfect for beginners and advanced learners.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-white/80">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Basic Rules</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Examples</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Exercises</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Grammar Topics
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover various grammar topics to improve your Dutch language skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTopicSelect('klinkers')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                Klinkers (Vowels)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn about long and short vowels in Dutch, with examples and interactive quizzes.
              </p>
              <Button className="w-full">
                Start Learning
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-muted-foreground">Verbs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Coming soon</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-muted-foreground">Nouns</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Coming soon</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-muted-foreground">Adjectives</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Coming soon</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}