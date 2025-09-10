import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Target, Users, Volume2, CheckCircle, XCircle, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
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

const klinkerQuizQuestions: QuizQuestion[] = [
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

interface VerbQuizQuestion {
  sentence: string;
  verb: string;
  subject: string;
  options: string[];
  correct: number;
  explanation: string;
}

const verbQuizQuestions: VerbQuizQuestion[] = [
  {
    sentence: "Ik ___ naar school.",
    verb: "fietsen",
    subject: "ik",
    options: ["fiets", "fietst", "fietsen"],
    correct: 0,
    explanation: "With 'ik' we use the stem form: fiets"
  },
  {
    sentence: "Jij ___ hard.",
    verb: "werken",
    subject: "jij",
    options: ["werk", "werkt", "werken"],
    correct: 1,
    explanation: "With 'jij' we add 't' to the stem: werkt"
  },
  {
    sentence: "Hij ___ een boek.",
    verb: "hebben",
    subject: "hij",
    options: ["heb", "hebt", "heeft"],
    correct: 2,
    explanation: "'Hebben' is irregular: hij heeft"
  },
  {
    sentence: "Wij ___ thuis.",
    verb: "zijn",
    subject: "wij",
    options: ["ben", "bent", "zijn"],
    correct: 2,
    explanation: "'Zijn' is irregular: wij zijn"
  },
  {
    sentence: "___ jij een auto?",
    verb: "hebben",
    subject: "jij",
    options: ["Heb", "Hebt", "Heeft"],
    correct: 0,
    explanation: "In questions with 'jij/je' after the verb, drop the 't': Heb jij?"
  }
];

interface StemQuizQuestion {
  infinitive: string;
  options: string[];
  correct: number;
  explanation: string;
}

const stemQuizQuestions: StemQuizQuestion[] = [
  {
    infinitive: "lopen",
    options: ["lop", "loop", "lopen"],
    correct: 1,
    explanation: "Long vowel: 'lopen' → stem 'lop' → ik-vorm 'loop' (add extra 'o')"
  },
  {
    infinitive: "rennen",
    options: ["renn", "ren", "renne"],
    correct: 1,
    explanation: "Short vowel: 'rennen' → stem 'renn' → ik-vorm 'ren' (remove double consonant)"
  },
  {
    infinitive: "verhuizen",
    options: ["verhuiz", "verhuis", "verhuizen"],
    correct: 1,
    explanation: "V/Z rule: 'verhuizen' → stem 'verhuiz' → ik-vorm 'verhuis' (z becomes s)"
  },
  {
    infinitive: "verven",
    options: ["verv", "verf", "verven"],
    correct: 1,
    explanation: "V/Z rule: 'verven' → stem 'verv' → ik-vorm 'verf' (v becomes f)"
  },
  {
    infinitive: "blazen",
    options: ["blaz", "blaas", "blazen"],
    correct: 1,
    explanation: "V/Z rule + long vowel: 'blazen' → stem 'blaz' → ik-vorm 'blaas' (z→s + double 'a')"
  }
];

interface SentenceQuizQuestion {
  sentence: string;
  isCorrect: boolean;
  correction?: string;
  explanation: string;
}

const sentenceQuizQuestions: SentenceQuizQuestion[] = [
  {
    sentence: "Ik lopen naar de winkel.",
    isCorrect: false,
    correction: "Ik loop naar de winkel.",
    explanation: "'Ik' needs the ik-vorm: loop"
  },
  {
    sentence: "Wij gaat morgen naar het feest.",
    isCorrect: false,
    correction: "Wij gaan morgen naar het feest.",
    explanation: "'Wij' needs the infinitive: gaan"
  },
  {
    sentence: "De vrouw speelt graag piano.",
    isCorrect: true,
    explanation: "Correct! 'De vrouw' (zij) needs ik-vorm + t: speelt"
  },
  {
    sentence: "De jongen wil een mooie film ziet.",
    isCorrect: false,
    correction: "De jongen wil een mooie film zien.",
    explanation: "After modal verbs like 'wil', use infinitive: zien"
  },
  {
    sentence: "Hij kijken naar de sterren.",
    isCorrect: false,
    correction: "Hij kijkt naar de sterren.",
    explanation: "'Hij' needs ik-vorm + t: kijkt"
  }
];

interface TwoVerbQuizQuestion {
  sentence: string;
  options: string[];
  correct: number;
  explanation: string;
}

const twoVerbQuizQuestions: TwoVerbQuizQuestion[] = [
  {
    sentence: "Ik ___ zaterdag ___.",
    options: ["ga, sporten", "gaan, sport", "ga, sport"],
    correct: 0,
    explanation: "Two verbs: first verb conjugated (ga), second verb infinitive (sporten) at the end"
  },
  {
    sentence: "Pieter ___ koffie ___.",
    options: ["wil, drinken", "willen, drink", "wilt, drinkt"],
    correct: 0,
    explanation: "Modal verb 'wil' + infinitive 'drinken' at the end"
  },
  {
    sentence: "De kinderen ___ heel goed ___.",
    options: ["kunnen, voetballen", "kan, voetbal", "kunnen, voetbal"],
    correct: 0,
    explanation: "'De kinderen' (zij) + modal verb 'kunnen' + infinitive 'voetballen'"
  }
];

interface PositionVerbQuizQuestion {
  sentence: string;
  options: string[];
  correct: number;
  explanation: string;
}

const positionVerbQuizQuestions: PositionVerbQuizQuestion[] = [
  {
    sentence: "De lamp ___ op de kast.",
    options: ["staat", "ligt", "zit"],
    correct: 0,
    explanation: "Vertical position: lamp stands (staat) on the cabinet"
  },
  {
    sentence: "Het boek ___ op de tafel.",
    options: ["staat", "ligt", "hangt"],
    correct: 1,
    explanation: "Horizontal position: book lies (ligt) on the table"
  },
  {
    sentence: "De sleutels ___ in mijn tas.",
    options: ["staan", "liggen", "zitten"],
    correct: 2,
    explanation: "'Inside' position: keys sit (zitten) in the bag"
  }
];

interface SeparableVerbQuizQuestion {
  sentence: string;
  options: string[];
  correct: number;
  explanation: string;
}

const separableVerbQuizQuestions: SeparableVerbQuizQuestion[] = [
  {
    sentence: "De trein ___ om 10.00 uur ___.",
    options: ["komt, aan", "aankomt", "komt, aankomen"],
    correct: 0,
    explanation: "Separable verb 'aankomen': 'komt' (conjugated) + 'aan' (prefix at end)"
  },
  {
    sentence: "Peter ___ straks ___.",
    options: ["wil, weggaan", "gaat, weg", "wil, weg gaan"],
    correct: 0,
    explanation: "Two verbs with separable: modal 'wil' + infinitive 'weggaan' (not separated)"
  },
  {
    sentence: "___ je de deur ___?",
    options: ["Doe, dicht", "Dichtdoe, je", "Doet, dicht"],
    correct: 0,
    explanation: "Question with separable verb: 'Doe' (conjugated) + 'dicht' (prefix at end)"
  }
];

export default function Grammar() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizType, setQuizType] = useState<'basic' | 'stem' | 'sentence' | 'twoverb' | 'position' | 'separable'>('basic');
  const [showDutchText, setShowDutchText] = useState<{[key: string]: boolean}>({});

  const toggleDutchText = (key: string) => {
    setShowDutchText(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setSelectedSubtopic(null);
    resetQuiz();
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const getCurrentQuestions = () => {
    if (selectedTopic === 'klinkers') return klinkerQuizQuestions;
    if (selectedTopic === 'werkwoorden') {
      if (quizType === 'stem') return stemQuizQuestions;
      if (quizType === 'sentence') return sentenceQuizQuestions;
      if (quizType === 'twoverb') return twoVerbQuizQuestions;
      if (quizType === 'position') return positionVerbQuizQuestions;
      if (quizType === 'separable') return separableVerbQuizQuestions;
      return verbQuizQuestions;
    }
    return verbQuizQuestions;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const currentQuestions = getCurrentQuestions();
    if (answerIndex === currentQuestions[currentQuiz].correct) {
      setScore(score + 1);
      toast.success("Correct!");
    } else {
      toast.error("Try again!");
    }
  };

  const handleNextQuestion = () => {
    const currentQuestions = getCurrentQuestions();
    if (currentQuiz < currentQuestions.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
      toast.success(`Quiz completed! Score: ${score + (selectedAnswer === currentQuestions[currentQuiz].correct ? 1 : 0)}/${currentQuestions.length}`);
    }
  };

  const resetQuizWithType = (type: 'basic' | 'stem' | 'sentence' | 'twoverb' | 'position' | 'separable') => {
    setQuizType(type);
    resetQuiz();
  };

  const handleSubtopicSelect = (subtopic: string) => {
    setSelectedSubtopic(subtopic);
  };

  const handleBackToSubtopics = () => {
    setSelectedSubtopic(null);
    resetQuiz();
  };

  if (selectedTopic === 'werkwoorden') {
    if (!selectedSubtopic) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
          <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Button onClick={handleBackToTopics} variant="ghost" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Topics
                </Button>
                <h1 className="text-2xl font-bold">Werkwoorden (Verbs)</h1>
                <div className="w-32" />
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Choose a Verb Topic
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Learn Dutch verbs step by step, from basic conjugation to advanced structures.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubtopicSelect('basic')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    1. Basic Conjugation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Learn verb forms, stem formation, and basic conjugation rules.
                  </p>
                  <Button className="w-full">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubtopicSelect('twoverbs')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    2. Two Verb Sentences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Learn to make sentences with modal verbs and infinitives.
                  </p>
                  <Button className="w-full">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubtopicSelect('position')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    3. Position Verbs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Learn staan, liggen, zitten, hangen instead of 'zijn'.
                  </p>
                  <Button className="w-full">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubtopicSelect('separable')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5" />
                    4. Separable Verbs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Learn verbs that split: aankomen, meebrengen, dichtdoen.
                  </p>
                  <Button className="w-full">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button onClick={handleBackToSubtopics} variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Verb Topics
              </Button>
              <h1 className="text-2xl font-bold">
                {selectedSubtopic === 'basic' && 'Basic Conjugation'}
                {selectedSubtopic === 'twoverbs' && 'Two Verb Sentences'}
                {selectedSubtopic === 'position' && 'Position Verbs'}
                {selectedSubtopic === 'separable' && 'Separable Verbs'}
              </h1>
              <div className="w-32" />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-8">
          {selectedSubtopic === 'basic' && (
            <>
              {/* Basic conjugation content from original file */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    What is a Verb?
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleDutchText('verb-intro')}
                      className="ml-auto"
                    >
                      {showDutchText['verb-intro'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      Dutch
                    </Button>
                  </CardTitle>
                  {showDutchText['verb-intro'] && (
                    <p className="text-sm text-muted-foreground">Wat is een werkwoord?</p>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg">A verb is a word for an action. Verbs are often things you can do.</p>
                  {showDutchText['verb-intro'] && (
                    <p className="text-sm text-muted-foreground">Een werkwoord is een woord voor een actie. Werkwoorden zijn vaak dingen die je kunt doen.</p>
                  )}
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">What is a verb?</h3>
                    <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• Action (cycling, working, walking)</li>
                      <li>• Change: number (singular/plural)</li>
                      <li>• Change: time (present tense)</li>
                    </ul>
                    {showDutchText['verb-intro'] && (
                      <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1 mt-2 border-t pt-2">
                        <li>• Actie (fietsen, werken, lopen)</li>
                        <li>• Verandering: aantal (enkelvoud/meervoud)</li>
                        <li>• Verandering: tijd (tegenwoordige tijd)</li>
                      </ul>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {selectedSubtopic === 'twoverbs' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    Making Sentences with Two Verbs
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleDutchText('two-verbs')}
                      className="ml-auto"
                    >
                      {showDutchText['two-verbs'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      Dutch
                    </Button>
                  </CardTitle>
                  {showDutchText['two-verbs'] && (
                    <p className="text-sm text-muted-foreground">Hoofdzinnen maken met twee werkwoorden</p>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg">You can also make sentences with two verbs. The second verb goes at the end of the main clause.</p>
                  {showDutchText['two-verbs'] && (
                    <p className="text-sm text-muted-foreground">Je kunt ook zinnen maken met twee werkwoorden. Het tweede werkwoord staat aan het einde van de hoofdzin.</p>
                  )}
                  
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">Sentence Structure:</h3>
                    {showDutchText['two-verbs'] && (
                      <p className="text-xs text-green-600 dark:text-green-400 mb-2">Zinsstructuur:</p>
                    )}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">1. Subject</th>
                            <th className="text-left p-2">2. 1e werkwoord</th>
                            <th className="text-left p-2">3A. Tijd</th>
                            <th className="text-left p-2">3B. Object/Manier</th>
                            <th className="text-left p-2">3C. Plaats</th>
                            <th className="text-left p-2">4. 2e werkwoord</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2 font-semibold">Ik</td>
                            <td className="p-2 text-primary font-bold">ga</td>
                            <td className="p-2">zaterdag</td>
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                            <td className="p-2 text-red-600 font-bold">sporten</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-semibold">Pieter</td>
                            <td className="p-2 text-primary font-bold">wil</td>
                            <td className="p-2"></td>
                            <td className="p-2">koffie</td>
                            <td className="p-2"></td>
                            <td className="p-2 text-red-600 font-bold">drinken</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-semibold">De kinderen</td>
                            <td className="p-2 text-primary font-bold">kunnen</td>
                            <td className="p-2"></td>
                            <td className="p-2">heel goed</td>
                            <td className="p-2"></td>
                            <td className="p-2 text-red-600 font-bold">voetballen</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Modal Verbs (no 'te' needed):</h3>
                    {showDutchText['two-verbs'] && (
                      <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">Modale werkwoorden (geen 'te'):</p>
                    )}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold mb-1">Modal verbs:</p>
                        <ul className="text-sm space-y-1">
                          <li>• want (willen), will (zullen), may (mogen)</li>
                          <li>• can (kunnen), must (moeten)</li>
                        </ul>
                        {showDutchText['two-verbs'] && (
                          <ul className="text-xs text-muted-foreground space-y-1 mt-1">
                            <li>• willen, zullen, mogen</li>
                            <li>• kunnen, moeten</li>
                          </ul>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Other verbs:</p>
                        <ul className="text-sm space-y-1">
                          <li>• stay (blijven), go (gaan), see (zien)</li>
                          <li>• hear (horen), feel (voelen), find (vinden)</li>
                        </ul>
                        {showDutchText['two-verbs'] && (
                          <ul className="text-xs text-muted-foreground space-y-1 mt-1">
                            <li>• blijven, gaan, zien</li>
                            <li>• horen, voelen, vinden</li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    Two Verb Practice Quiz
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleDutchText('quiz-two-verbs')}
                      className="ml-auto"
                    >
                      {showDutchText['quiz-two-verbs'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      Dutch
                    </Button>
                  </CardTitle>
                  {showDutchText['quiz-two-verbs'] && (
                    <p className="text-sm text-muted-foreground">Oefenquiz Twee Werkwoorden</p>
                  )}
                </CardHeader>
                <CardContent>
                  {!quizCompleted ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {twoVerbQuizQuestions.length}</h3>
                        <div className="text-sm text-muted-foreground">Score: {score}/{twoVerbQuizQuestions.length}</div>
                      </div>
                      
                      <div className="text-center space-y-4">
                        <p className="text-lg">Complete the sentence:</p>
                        <p className="text-3xl font-bold text-primary">{twoVerbQuizQuestions[currentQuiz].sentence}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        {twoVerbQuizQuestions[currentQuiz].options.map((option, index) => (
                          <Button
                            key={index}
                            variant={selectedAnswer === index ? 
                              (index === twoVerbQuizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                              "outline"
                            }
                            className={`p-4 text-lg ${
                              showResult && index === twoVerbQuizQuestions[currentQuiz].correct ? 
                              "bg-green-500 hover:bg-green-600" : ""
                            }`}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showResult}
                          >
                            {showResult && index === twoVerbQuizQuestions[currentQuiz].correct && (
                              <CheckCircle className="w-5 h-5 mr-2" />
                            )}
                            {showResult && selectedAnswer === index && index !== twoVerbQuizQuestions[currentQuiz].correct && (
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
                            <p>{twoVerbQuizQuestions[currentQuiz].explanation}</p>
                          </div>
                          <Button onClick={handleNextQuestion} className="w-full">
                            {currentQuiz < twoVerbQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                      <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                      <p className="text-lg">Final Score: {score}/{twoVerbQuizQuestions.length}</p>
                      <Button onClick={() => resetQuizWithType('twoverb')} className="flex items-center gap-2">
                        <RotateCcw className="w-4 h-4" />
                        Try Again
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </main>
      </div>
    );
  }

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
          {/* Klinkers content from original file */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Volume2 className="w-6 h-6" />
                Long and Short Vowels
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleDutchText('vowels')}
                  className="ml-auto"
                >
                  {showDutchText['vowels'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Dutch
                </Button>
              </CardTitle>
              {showDutchText['vowels'] && (
                <p className="text-sm text-muted-foreground">Lange en Korte Klinkers</p>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Vowels:</h3>
                  {showDutchText['vowels'] && (
                    <p className="text-xs text-muted-foreground mb-1">Klinkers:</p>
                  )}
                  <p className="text-lg font-mono bg-muted p-2 rounded">A, E, I, O, U</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Consonants:</h3>
                  {showDutchText['vowels'] && (
                    <p className="text-xs text-muted-foreground mb-1">Medeklinkers:</p>
                  )}
                  <p className="text-sm font-mono bg-muted p-2 rounded">B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Z</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Syllable Examples:</h3>
                {showDutchText['vowels'] && (
                  <p className="text-xs text-muted-foreground mb-1">Lettergreep voorbeelden:</p>
                )}
                <p className="font-mono bg-muted p-2 rounded">Li-sa, Ca-ro-li-na, Sil-ves-ter, Ba-naan, To-ma-ten</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Important Rule:</h3>
                <p className="text-blue-700 dark:text-blue-300">A vowel at the end of a syllable is long.</p>
                {showDutchText['vowels'] && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Een klinker aan het einde van een lettergreep is lang.</p>
                )}
              </div>
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

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTopicSelect('werkwoorden')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Werkwoorden (Verbs)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn Dutch verb conjugations, regular and irregular verbs, with sentence structure and practice quizzes.
              </p>
              <Button className="w-full">
                Start Learning
              </Button>
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

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-muted-foreground">Sentence Structure</CardTitle>
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