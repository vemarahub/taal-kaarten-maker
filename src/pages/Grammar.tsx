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

export default function Grammar() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizType, setQuizType] = useState<'basic' | 'stem' | 'sentence'>('basic');

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

  const getCurrentQuestions = () => {
    if (selectedTopic === 'klinkers') return klinkerQuizQuestions;
    if (selectedTopic === 'werkwoorden') {
      if (quizType === 'stem') return stemQuizQuestions;
      if (quizType === 'sentence') return sentenceQuizQuestions;
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

  const resetQuizWithType = (type: 'basic' | 'stem' | 'sentence') => {
    setQuizType(type);
    resetQuiz();
  };

  if (selectedTopic === 'werkwoorden') {
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

        <main className="container mx-auto px-4 py-8 space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="w-6 h-6" />
                Wat is een werkwoord?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">Een werkwoord is een woord voor een actie. Werkwoorden zijn vaak dingen die je kunt doen.</p>
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Wat is een werkwoord?</h3>
                <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Actie (fietsen, werken, lopen)</li>
                  <li>• Verandering: aantal (enkelvoud/meervoud)</li>
                  <li>• Verandering: tijd (tegenwoordige tijd)</li>
                </ul>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Enkelvoud (Singular):</h3>
                  <p className="text-sm bg-muted p-2 rounded">Ik, jij, u, hij, zij = 1 persoon</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Meervoud (Plural):</h3>
                  <p className="text-sm bg-muted p-2 rounded">Wij, jullie, zij = 2(+) personen</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verb Formation Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Hoe maken we de persoonsvorm?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">We hebben nodig:</h3>
                <ul className="text-green-700 dark:text-green-300 space-y-1">
                  <li>• <strong>Infinitief</strong> = het hele werkwoord (fietsen)</li>
                  <li>• <strong>Stam</strong> = infinitief zonder 'en' (fiets)</li>
                  <li>• <strong>Ik-vorm</strong> = de stam, maar misschien veranderd</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Drie opties:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• <strong>Ik-vorm</strong> (ik fiets)</li>
                    <li>• <strong>Ik-vorm + t</strong> (jij fietst)</li>
                    <li>• <strong>Infinitief</strong> (wij fietsen)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Enkelvoud:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>Ik → ik-vorm</li>
                    <li>Jij → ik-vorm + t</li>
                    <li>Hij/zij/u → ik-vorm + t</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Meervoud:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>Wij → infinitief</li>
                    <li>Jullie → infinitief</li>
                    <li>Zij → infinitief</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stem Formation Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Stam → Ik-vorm Regels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-yellow-50 dark:bg-yellow-950">
                  <CardHeader>
                    <CardTitle className="text-lg text-yellow-800 dark:text-yellow-200">Situatie 1: Lange klinkers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Voeg extra klinker toe voor lange klank</p>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-3 gap-1 font-mono">
                        <span>lopen</span><span>→</span><span>loop</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1 font-mono">
                        <span>maken</span><span>→</span><span>maak</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1 font-mono">
                        <span>eten</span><span>→</span><span>eet</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-red-50 dark:bg-red-950">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-800 dark:text-red-200">Situatie 2: Korte klinkers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Verwijder dubbele medeklinker</p>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-3 gap-1 font-mono">
                        <span>rennen</span><span>→</span><span>ren</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1 font-mono">
                        <span>leggen</span><span>→</span><span>leg</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1 font-mono">
                        <span>zitten</span><span>→</span><span>zit</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 dark:bg-purple-950">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-800 dark:text-purple-200">Situatie 3: V/Z regel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">V → F, Z → S aan het einde</p>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-3 gap-1 font-mono">
                        <span>verven</span><span>→</span><span>verf</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1 font-mono">
                        <span>verhuizen</span><span>→</span><span>verhuis</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1 font-mono">
                        <span>blazen</span><span>→</span><span>blaas</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Regular Verbs */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-center">Regelmatig Werkwoord: Fietsen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-sm font-semibold border-b pb-2">
                    <span>English</span>
                    <span>Dutch</span>
                    <span>Verb</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span>I</span>
                    <span>Ik</span>
                    <span className="font-bold text-primary">fiets</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span>You</span>
                    <span>Jij</span>
                    <span className="font-bold text-primary">fietst</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span>You (formal)</span>
                    <span>U</span>
                    <span className="font-bold text-primary">fietst</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span>He/She</span>
                    <span>Hij/Zij</span>
                    <span className="font-bold text-primary">fietst</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span>We</span>
                    <span>Wij</span>
                    <span className="font-bold text-primary">fietsen</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span>You (plural)</span>
                    <span>Jullie</span>
                    <span className="font-bold text-primary">fietsen</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span>They</span>
                    <span>Zij</span>
                    <span className="font-bold text-primary">fietsen</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-center">Regelmatig Werkwoord: Werken</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-sm font-semibold border-b pb-2">
                    <span>English</span>
                    <span>Dutch</span>
                    <span>Verb</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span>I</span>
                    <span>Ik</span>
                    <span className="font-bold text-primary">werk</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span>You</span>
                    <span>Jij</span>
                    <span className="font-bold text-primary">werkt</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span>You (formal)</span>
                    <span>U</span>
                    <span className="font-bold text-primary">werkt</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span>He/She</span>
                    <span>Hij/Zij</span>
                    <span className="font-bold text-primary">werkt</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span>We</span>
                    <span>Wij</span>
                    <span className="font-bold text-primary">werken</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span>You (plural)</span>
                    <span>Jullie</span>
                    <span className="font-bold text-primary">werken</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span>They</span>
                    <span>Zij</span>
                    <span className="font-bold text-primary">werken</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Irregular Verbs - Comprehensive Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Onregelmatige Werkwoorden (Irregular Verbs)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Pronoun</th>
                      <th className="text-left p-2">Zijn</th>
                      <th className="text-left p-2">Hebben</th>
                      <th className="text-left p-2">Gaan</th>
                      <th className="text-left p-2">Komen</th>
                      <th className="text-left p-2">Kunnen</th>
                      <th className="text-left p-2">Willen</th>
                      <th className="text-left p-2">Mogen</th>
                      <th className="text-left p-2">Zien</th>
                      <th className="text-left p-2">Doen</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-1">
                    <tr className="border-b">
                      <td className="p-2 font-semibold">Ik</td>
                      <td className="p-2 font-bold text-red-600">ben</td>
                      <td className="p-2 font-bold text-red-600">heb</td>
                      <td className="p-2 font-bold text-red-600">ga</td>
                      <td className="p-2 font-bold text-red-600">kom</td>
                      <td className="p-2 font-bold text-red-600">kan</td>
                      <td className="p-2 font-bold text-red-600">wil</td>
                      <td className="p-2 font-bold text-red-600">mag</td>
                      <td className="p-2 font-bold text-red-600">zie</td>
                      <td className="p-2 font-bold text-red-600">doe</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-semibold">Jij</td>
                      <td className="p-2 font-bold text-red-600">bent</td>
                      <td className="p-2 font-bold text-red-600">hebt</td>
                      <td className="p-2 font-bold text-red-600">gaat</td>
                      <td className="p-2 font-bold text-red-600">komt</td>
                      <td className="p-2 font-bold text-red-600">kan/kunt</td>
                      <td className="p-2 font-bold text-red-600">wil/wilt</td>
                      <td className="p-2 font-bold text-red-600">mag</td>
                      <td className="p-2 font-bold text-red-600">ziet</td>
                      <td className="p-2 font-bold text-red-600">doet</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-semibold">Hij/Zij</td>
                      <td className="p-2 font-bold text-red-600">is</td>
                      <td className="p-2 font-bold text-red-600">heeft</td>
                      <td className="p-2 font-bold text-red-600">gaat</td>
                      <td className="p-2 font-bold text-red-600">komt</td>
                      <td className="p-2 font-bold text-red-600">kan</td>
                      <td className="p-2 font-bold text-red-600">wil</td>
                      <td className="p-2 font-bold text-red-600">mag</td>
                      <td className="p-2 font-bold text-red-600">ziet</td>
                      <td className="p-2 font-bold text-red-600">doet</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-semibold">Wij/Jullie/Zij</td>
                      <td className="p-2 font-bold text-red-600">zijn</td>
                      <td className="p-2 font-bold text-red-600">hebben</td>
                      <td className="p-2 font-bold text-red-600">gaan</td>
                      <td className="p-2 font-bold text-red-600">komen</td>
                      <td className="p-2 font-bold text-red-600">kunnen</td>
                      <td className="p-2 font-bold text-red-600">willen</td>
                      <td className="p-2 font-bold text-red-600">mogen</td>
                      <td className="p-2 font-bold text-red-600">zien</td>
                      <td className="p-2 font-bold text-red-600">doen</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-orange-800 dark:text-orange-200">Belangrijk voor vragen met 'jij':</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold mb-1">In een zin:</p>
                    <ul className="space-y-1">
                      <li>Jij zit</li>
                      <li>Jij rent</li>
                      <li>Jij kijkt</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">In een vraag:</p>
                    <ul className="space-y-1">
                      <li>Zit jij? (geen 't'!)</li>
                      <li>Ren jij? (geen 't'!)</li>
                      <li>Kijk jij? (geen 't'!)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sentence Structure */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Werkwoorden in Zinnen en Vragen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Belangrijke Regels:</h3>
                <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                  <li>• In een zin komt het werkwoord op de tweede plaats</li>
                  <li>• In een vraag komt het werkwoord op de eerste plaats</li>
                  <li>• Als 'jij' of 'je' achter het werkwoord staat, krijgt het werkwoord geen 't'</li>
                </ul>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Zinnen (Statements)</h3>
                  <div className="space-y-2 text-sm">
                    <p>Ik <span className="font-bold text-primary">heb</span> een boek</p>
                    <p>Jij <span className="font-bold text-primary">hebt</span> een boek</p>
                    <p>U <span className="font-bold text-primary">hebt/heeft</span> een boek</p>
                    <p>Hij <span className="font-bold text-primary">heeft</span> een boek</p>
                    <p>Wij <span className="font-bold text-primary">hebben</span> een boek</p>
                    <p>Jullie <span className="font-bold text-primary">hebben</span> een boek</p>
                    <p>Zij <span className="font-bold text-primary">hebben</span> een boek</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Vragen (Questions)</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-bold text-primary">Heb</span> ik een boek?</p>
                    <p><span className="font-bold text-red-600">Heb</span> jij een boek? (geen 't'!)</p>
                    <p><span className="font-bold text-primary">Hebt/Heeft</span> u een boek?</p>
                    <p><span className="font-bold text-primary">Heeft</span> hij een boek?</p>
                    <p><span className="font-bold text-primary">Hebben</span> wij een boek?</p>
                    <p><span className="font-bold text-primary">Hebben</span> jullie een boek?</p>
                    <p><span className="font-bold text-primary">Hebben</span> zij een boek?</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Pronouns */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Persoonlijke Voornaamwoorden</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Enkelvoud (Singular)</h3>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <span>Ik</span>
                      <span className="text-muted-foreground">(I)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span>Jij / Je</span>
                      <span className="text-muted-foreground">(You informal)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span>U</span>
                      <span className="text-muted-foreground">(You formal)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span>Hij</span>
                      <span className="text-muted-foreground">(He)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span>Zij / Ze</span>
                      <span className="text-muted-foreground">(She)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Meervoud (Plural)</h3>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <span>Wij / We</span>
                      <span className="text-muted-foreground">(We)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span>Jullie</span>
                      <span className="text-muted-foreground">(You plural)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span>Zij / Ze</span>
                      <span className="text-muted-foreground">(They)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                Practice Quizzes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Button 
                  onClick={() => resetQuizWithType('basic')}
                  variant={quizType === 'basic' ? 'default' : 'outline'}
                  className="p-4 h-auto flex flex-col"
                >
                  <span className="font-semibold">Basic Conjugation</span>
                  <span className="text-sm opacity-80">Verb forms with pronouns</span>
                </Button>
                <Button 
                  onClick={() => resetQuizWithType('stem')}
                  variant={quizType === 'stem' ? 'default' : 'outline'}
                  className="p-4 h-auto flex flex-col"
                >
                  <span className="font-semibold">Stem Formation</span>
                  <span className="text-sm opacity-80">Infinitive → ik-vorm</span>
                </Button>
                <Button 
                  onClick={() => resetQuizWithType('sentence')}
                  variant={quizType === 'sentence' ? 'default' : 'outline'}
                  className="p-4 h-auto flex flex-col"
                >
                  <span className="font-semibold">Sentence Correction</span>
                  <span className="text-sm opacity-80">Find and fix errors</span>
                </Button>
              </div>

              {!quizCompleted ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {getCurrentQuestions().length}</h3>
                    <div className="text-sm text-muted-foreground">Score: {score}/{getCurrentQuestions().length}</div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    {quizType === 'basic' && (
                      <>
                        <p className="text-lg">Complete the sentence:</p>
                        <p className="text-3xl font-bold text-primary">{verbQuizQuestions[currentQuiz].sentence}</p>
                      </>
                    )}
                    {quizType === 'stem' && (
                      <>
                        <p className="text-lg">What is the ik-vorm of:</p>
                        <p className="text-3xl font-bold text-primary">{stemQuizQuestions[currentQuiz].infinitive}</p>
                      </>
                    )}
                    {quizType === 'sentence' && (
                      <>
                        <p className="text-lg">Is this sentence correct?</p>
                        <p className="text-2xl font-bold text-primary">{sentenceQuizQuestions[currentQuiz].sentence}</p>
                      </>
                    )}
                  </div>

                  <div className={`grid gap-4 ${
                    quizType === 'sentence' ? 'grid-cols-2' : 'grid-cols-3'
                  }`}>
                    {quizType === 'sentence' ? (
                      <>
                        <Button
                          variant={selectedAnswer === 0 ? 
                            (0 === (sentenceQuizQuestions[currentQuiz].isCorrect ? 0 : 1) ? "default" : "destructive") : 
                            "outline"
                          }
                          className={`p-4 text-lg ${
                            showResult && 0 === (sentenceQuizQuestions[currentQuiz].isCorrect ? 0 : 1) ? 
                            "bg-green-500 hover:bg-green-600" : ""
                          }`}
                          onClick={() => handleAnswerSelect(0)}
                          disabled={showResult}
                        >
                          {showResult && 0 === (sentenceQuizQuestions[currentQuiz].isCorrect ? 0 : 1) && (
                            <CheckCircle className="w-5 h-5 mr-2" />
                          )}
                          {showResult && selectedAnswer === 0 && 0 !== (sentenceQuizQuestions[currentQuiz].isCorrect ? 0 : 1) && (
                            <XCircle className="w-5 h-5 mr-2" />
                          )}
                          Correct
                        </Button>
                        <Button
                          variant={selectedAnswer === 1 ? 
                            (1 === (sentenceQuizQuestions[currentQuiz].isCorrect ? 0 : 1) ? "default" : "destructive") : 
                            "outline"
                          }
                          className={`p-4 text-lg ${
                            showResult && 1 === (sentenceQuizQuestions[currentQuiz].isCorrect ? 0 : 1) ? 
                            "bg-green-500 hover:bg-green-600" : ""
                          }`}
                          onClick={() => handleAnswerSelect(1)}
                          disabled={showResult}
                        >
                          {showResult && 1 === (sentenceQuizQuestions[currentQuiz].isCorrect ? 0 : 1) && (
                            <CheckCircle className="w-5 h-5 mr-2" />
                          )}
                          {showResult && selectedAnswer === 1 && 1 !== (sentenceQuizQuestions[currentQuiz].isCorrect ? 0 : 1) && (
                            <XCircle className="w-5 h-5 mr-2" />
                          )}
                          Incorrect
                        </Button>
                      </>
                    ) : (
                      getCurrentQuestions().map((question: any, index: number) => (
                        question.options.map((option: string, optionIndex: number) => (
                          <Button
                            key={optionIndex}
                            variant={selectedAnswer === optionIndex ? 
                              (optionIndex === question.correct ? "default" : "destructive") : 
                              "outline"
                            }
                            className={`p-4 text-lg ${
                              showResult && optionIndex === question.correct ? 
                              "bg-green-500 hover:bg-green-600" : ""
                            }`}
                            onClick={() => handleAnswerSelect(optionIndex)}
                            disabled={showResult}
                          >
                            {showResult && optionIndex === question.correct && (
                              <CheckCircle className="w-5 h-5 mr-2" />
                            )}
                            {showResult && selectedAnswer === optionIndex && optionIndex !== question.correct && (
                              <XCircle className="w-5 h-5 mr-2" />
                            )}
                            {option}
                          </Button>
                        ))
                      ))[currentQuiz]
                    )}
                  </div>

                  {showResult && (
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-semibold mb-2">Explanation:</p>
                        <p>{getCurrentQuestions()[currentQuiz].explanation}</p>
                        {quizType === 'sentence' && !sentenceQuizQuestions[currentQuiz].isCorrect && (
                          <div className="mt-2 p-2 bg-green-100 dark:bg-green-900 rounded">
                            <p className="font-semibold text-green-800 dark:text-green-200">Correction:</p>
                            <p className="text-green-700 dark:text-green-300">{sentenceQuizQuestions[currentQuiz].correction}</p>
                          </div>
                        )}
                      </div>
                      <Button onClick={handleNextQuestion} className="w-full">
                        {currentQuiz < getCurrentQuestions().length - 1 ? "Next Question" : "Finish Quiz"}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                  <p className="text-lg">Final Score: {score}/{getCurrentQuestions().length}</p>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={() => resetQuizWithType(quizType)} className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Try Again
                    </Button>
                    <Button onClick={() => resetQuizWithType(quizType === 'basic' ? 'stem' : quizType === 'stem' ? 'sentence' : 'basic')} variant="outline">
                      Next Quiz Type
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
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
                    <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {klinkerQuizQuestions.length}</h3>
                    <div className="text-sm text-muted-foreground">Score: {score}/{klinkerQuizQuestions.length}</div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <p className="text-lg">What is the plural of:</p>
                    <p className="text-3xl font-bold text-primary">{klinkerQuizQuestions[currentQuiz].word}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {klinkerQuizQuestions[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? 
                          (index === klinkerQuizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                          "outline"
                        }
                        className={`p-4 text-lg ${
                          showResult && index === klinkerQuizQuestions[currentQuiz].correct ? 
                          "bg-green-500 hover:bg-green-600" : ""
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                      >
                        {showResult && index === klinkerQuizQuestions[currentQuiz].correct && (
                          <CheckCircle className="w-5 h-5 mr-2" />
                        )}
                        {showResult && selectedAnswer === index && index !== klinkerQuizQuestions[currentQuiz].correct && (
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
                        <p>{klinkerQuizQuestions[currentQuiz].explanation}</p>
                      </div>
                      <Button onClick={handleNextQuestion} className="w-full">
                        {currentQuiz < klinkerQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                  <p className="text-lg">Final Score: {score}/{klinkerQuizQuestions.length}</p>
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