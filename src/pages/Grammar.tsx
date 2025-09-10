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

interface NegationQuizQuestion {
  sentence: string;
  options: string[];
  correct: number;
  explanation: string;
  type: 'niet' | 'geen';
}

interface SentenceStructureQuizQuestion {
  sentence: string;
  options: string[];
  correct: number;
  explanation: string;
  parts: {
    subject: string;
    verb: string;
    time?: string;
    object?: string;
    place?: string;
  };
}

interface SentenceOrderQuizQuestion {
  scrambled: string[];
  correct: string;
  explanation: string;
}

interface ConjunctionQuizQuestion {
  sentence1: string;
  sentence2: string;
  options: string[];
  correct: number;
  explanation: string;
  conjunctionType: 'en' | 'maar' | 'want' | 'dus' | 'of';
}

const negationQuizQuestions: NegationQuizQuestion[] = [
  {
    sentence: "Peter is groot. → Peter ___ groot.",
    options: ["is niet", "is geen", "niet is"],
    correct: 0,
    explanation: "'Niet' comes before adjectives: Peter is niet groot",
    type: 'niet'
  },
  {
    sentence: "Johan kan sporten. → Johan ___ sporten.",
    options: ["kan niet", "niet kan", "kan geen"],
    correct: 0,
    explanation: "'Niet' comes before the second verb (infinitive): Johan kan niet sporten",
    type: 'niet'
  },
  {
    sentence: "Julia koopt een fiets. → Julia koopt ___ fiets.",
    options: ["niet een", "geen", "niet"],
    correct: 1,
    explanation: "'Geen' replaces 'een' (indefinite article): Julia koopt geen fiets",
    type: 'geen'
  },
  {
    sentence: "Ik hou van pasta. → Ik hou ___ van pasta.",
    options: ["niet", "geen", "niet een"],
    correct: 0,
    explanation: "'Niet' comes before prepositions: Ik hou niet van pasta",
    type: 'niet'
  },
  {
    sentence: "Wij hebben katten. → Wij hebben ___ katten.",
    options: ["niet", "geen", "niet een"],
    correct: 1,
    explanation: "'Geen' is used with indefinite nouns (plural): Wij hebben geen katten",
    type: 'geen'
  }
];

const sentenceStructureQuizQuestions: SentenceStructureQuizQuestion[] = [
  {
    sentence: "Mark fietst naar zijn werk",
    options: ["Subject: Mark, Verb: fietst, Place: naar zijn werk", "Subject: fietst, Verb: Mark, Place: werk", "Subject: Mark, Verb: naar, Place: fietst"],
    correct: 0,
    explanation: "Mark (who) fietst (verb) naar zijn werk (where)",
    parts: { subject: "Mark", verb: "fietst", place: "naar zijn werk" }
  }
];

const sentenceOrderQuizQuestions: SentenceOrderQuizQuestion[] = [
  {
    scrambled: ["naar", "Ik", "ga", "school"],
    correct: "Ik ga naar school",
    explanation: "Subject (Ik) + Verb (ga) + Rest (naar school)"
  }
];

const conjunctionQuizQuestions: ConjunctionQuizQuestion[] = [
  {
    sentence1: "De docent drinkt koffie",
    sentence2: "de cursisten drinken thee",
    options: ["en", "maar", "want"],
    correct: 0,
    explanation: "'En' connects two similar actions - both drinking something",
    conjunctionType: 'en'
  },
  {
    sentence1: "Ik wil graag tv kijken",
    sentence2: "de tv is kapot",
    options: ["en", "maar", "dus"],
    correct: 1,
    explanation: "'Maar' shows contrast - wanting to watch TV but it's broken",
    conjunctionType: 'maar'
  },
  {
    sentence1: "Ik ga naar de dokter",
    sentence2: "ik heb pijn",
    options: ["maar", "want", "dus"],
    correct: 1,
    explanation: "'Want' gives a reason - going to doctor because of pain",
    conjunctionType: 'want'
  },
  {
    sentence1: "Het is mooi weer",
    sentence2: "we kunnen een wandeling maken",
    options: ["want", "dus", "maar"],
    correct: 1,
    explanation: "'Dus' shows result - nice weather so we can walk",
    conjunctionType: 'dus'
  },
  {
    sentence1: "Je kunt naar buiten gaan",
    sentence2: "je kunt binnen blijven",
    options: ["en", "of", "want"],
    correct: 1,
    explanation: "'Of' shows choice - either go outside or stay inside",
    conjunctionType: 'of'
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
  const [quizType, setQuizType] = useState<'basic' | 'stem' | 'sentence' | 'twoverb' | 'position' | 'separable' | 'negation' | 'structure' | 'order' | 'conjunction'>('basic');
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
    if (selectedTopic === 'negation') {
      return negationQuizQuestions;
    }
    if (selectedTopic === 'hoofdzinnen') {
      if (quizType === 'structure') return sentenceStructureQuizQuestions;
      if (quizType === 'order') return sentenceOrderQuizQuestions;
      if (quizType === 'conjunction') return conjunctionQuizQuestions;
      return sentenceStructureQuizQuestions;
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

  const resetQuizWithType = (type: 'basic' | 'stem' | 'sentence' | 'twoverb' | 'position' | 'separable' | 'structure' | 'order' | 'conjunction') => {
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
                <CardContent className="space-y-6">
                  <p className="text-lg leading-relaxed">
                    Verbs are the backbone of Dutch sentences. They express actions, states, or occurrences and must agree with their subject in number and person. Understanding verb conjugation is essential because Dutch verbs change their form depending on who is performing the action and when it happens.
                  </p>
                  {showDutchText['verb-intro'] && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Werkwoorden zijn de ruggengraat van Nederlandse zinnen. Ze drukken acties, toestanden of gebeurtenissen uit en moeten overeenkomen met hun onderwerp in getal en persoon.
                    </p>
                  )}
                  
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Key Characteristics of Verbs:</h3>
                    {showDutchText['verb-intro'] && (
                      <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">Belangrijke kenmerken van werkwoorden:</p>
                    )}
                    <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• Express actions (cycling, working, walking)</li>
                      <li>• Change form based on subject (I work vs. he works)</li>
                      <li>• Indicate time (present, past, future)</li>
                      <li>• Can be regular or irregular in conjugation</li>
                      <li>• Form the core of sentence structure</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    Verb Forms and Stem
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleDutchText('verb-forms')}
                      className="ml-auto"
                    >
                      {showDutchText['verb-forms'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      Dutch
                    </Button>
                  </CardTitle>
                  {showDutchText['verb-forms'] && (
                    <p className="text-sm text-muted-foreground">Werkwoordvormen en Stam</p>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">Finding the Stem:</h3>
                    {showDutchText['verb-forms'] && (
                      <p className="text-xs text-green-600 dark:text-green-400 mb-2">De stam vinden:</p>
                    )}
                    <p className="text-sm mb-2">Remove '-en' from the infinitive to get the stem:</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold mb-1">Examples:</p>
                        <ul className="text-sm space-y-1">
                          <li>• werk<strong>en</strong> → werk</li>
                          <li>• fietsen → fiets</li>
                          <li>• lopen → lop</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Special cases:</p>
                        <ul className="text-sm space-y-1">
                          <li>• Double consonant → single</li>
                          <li>• V/Z rule applies</li>
                          <li>• Long vowel rules</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Conjugation Pattern:</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Subject</th>
                            <th className="text-left p-2">Verb Form</th>
                            <th className="text-left p-2">Example (werken)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2 font-semibold">ik</td>
                            <td className="p-2">stem</td>
                            <td className="p-2 text-primary font-bold">ik werk</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-semibold">jij/je</td>
                            <td className="p-2">stem + t</td>
                            <td className="p-2 text-primary font-bold">jij werkt</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-semibold">hij/zij/het</td>
                            <td className="p-2">stem + t</td>
                            <td className="p-2 text-primary font-bold">hij werkt</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-semibold">wij/jullie/zij</td>
                            <td className="p-2">infinitive</td>
                            <td className="p-2 text-primary font-bold">wij werken</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    Basic Conjugation Quiz
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!quizCompleted ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {verbQuizQuestions.length}</h3>
                        <div className="text-sm text-muted-foreground">Score: {score}/{verbQuizQuestions.length}</div>
                      </div>
                      
                      <div className="text-center space-y-4">
                        <p className="text-lg">Complete the sentence:</p>
                        <p className="text-2xl font-bold text-primary">{verbQuizQuestions[currentQuiz].sentence}</p>
                        <p className="text-sm text-muted-foreground">Verb: {verbQuizQuestions[currentQuiz].verb}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        {verbQuizQuestions[currentQuiz].options.map((option, index) => (
                          <Button
                            key={index}
                            variant={selectedAnswer === index ? 
                              (index === verbQuizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                              "outline"
                            }
                            className={`p-4 text-lg ${
                              showResult && index === verbQuizQuestions[currentQuiz].correct ? 
                              "bg-green-500 hover:bg-green-600" : ""
                            }`}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showResult}
                          >
                            {showResult && index === verbQuizQuestions[currentQuiz].correct && (
                              <CheckCircle className="w-5 h-5 mr-2" />
                            )}
                            {showResult && selectedAnswer === index && index !== verbQuizQuestions[currentQuiz].correct && (
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
                            <p>{verbQuizQuestions[currentQuiz].explanation}</p>
                          </div>
                          <Button onClick={handleNextQuestion} className="w-full">
                            {currentQuiz < verbQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                      <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                      <p className="text-lg">Final Score: {score}/{verbQuizQuestions.length}</p>
                      <Button onClick={() => resetQuizWithType('basic')} className="flex items-center gap-2">
                        <RotateCcw className="w-4 h-4" />
                        Try Again
                      </Button>
                    </div>
                  )}
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
                  <p className="text-lg leading-relaxed">
                    Dutch sentence structure becomes more complex when using two verbs together. This construction is very common and essential for expressing intentions, abilities, and obligations. The key rule is that only the first verb is conjugated, while the second verb remains in its infinitive form and moves to the end of the sentence.
                  </p>
                  {showDutchText['two-verbs'] && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Nederlandse zinsstructuur wordt complexer bij het gebruik van twee werkwoorden samen. Deze constructie is zeer gebruikelijk en essentieel voor het uitdrukken van intenties, vaardigheden en verplichtingen.
                    </p>
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

          {selectedSubtopic === 'position' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    Position Verbs
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleDutchText('position-verbs')}
                      className="ml-auto"
                    >
                      {showDutchText['position-verbs'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      Dutch
                    </Button>
                  </CardTitle>
                  {showDutchText['position-verbs'] && (
                    <p className="text-sm text-muted-foreground">Positiewerkwoorden</p>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg leading-relaxed">
                    Position verbs are a unique feature of Dutch that often confuses English speakers. Instead of simply saying something 'is' somewhere, Dutch requires you to specify HOW the object is positioned in that location. This creates more precise and vivid descriptions of spatial relationships and is essential for natural-sounding Dutch.
                  </p>
                  {showDutchText['position-verbs'] && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Positiewerkwoorden zijn een uniek kenmerk van het Nederlands dat Engelstaligen vaak verwarrt. In plaats van simpelweg te zeggen dat iets ergens 'is', vereist het Nederlands dat je specificeert HOE het object op die locatie gepositioneerd is.
                    </p>
                  )}
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-blue-50 dark:bg-blue-950">
                      <CardHeader>
                        <CardTitle className="text-lg text-blue-800 dark:text-blue-200">STAAN (to stand)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-2">Vertical position:</p>
                        <ul className="text-sm space-y-1">
                          <li>• De lamp staat op de kast</li>
                          <li>• Het glas staat op tafel</li>
                          <li>• De boom staat in de tuin</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-green-50 dark:bg-green-950">
                      <CardHeader>
                        <CardTitle className="text-lg text-green-800 dark:text-green-200">LIGGEN (to lie)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-2">Horizontal position:</p>
                        <ul className="text-sm space-y-1">
                          <li>• Het boek ligt op de tafel</li>
                          <li>• De krant ligt op de bank</li>
                          <li>• De sleutels liggen hier</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-red-50 dark:bg-red-950">
                      <CardHeader>
                        <CardTitle className="text-lg text-red-800 dark:text-red-200">ZITTEN (to sit)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-2">Inside/attached:</p>
                        <ul className="text-sm space-y-1">
                          <li>• De sleutels zitten in mijn tas</li>
                          <li>• Het geld zit in mijn portemonnee</li>
                          <li>• De knoop zit aan mijn jas</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-yellow-50 dark:bg-yellow-950">
                    <CardHeader>
                      <CardTitle className="text-lg text-yellow-800 dark:text-yellow-200">HANGEN (to hang)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-2">Hanging position:</p>
                      <ul className="text-sm space-y-1">
                        <li>• Het schilderij hangt aan de muur</li>
                        <li>• Mijn jas hangt in de kast</li>
                        <li>• De lamp hangt boven de tafel</li>
                      </ul>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    Position Verbs Quiz
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!quizCompleted ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {positionVerbQuizQuestions.length}</h3>
                        <div className="text-sm text-muted-foreground">Score: {score}/{positionVerbQuizQuestions.length}</div>
                      </div>
                      
                      <div className="text-center space-y-4">
                        <p className="text-lg">Choose the correct position verb:</p>
                        <p className="text-2xl font-bold text-primary">{positionVerbQuizQuestions[currentQuiz].sentence}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        {positionVerbQuizQuestions[currentQuiz].options.map((option, index) => (
                          <Button
                            key={index}
                            variant={selectedAnswer === index ? 
                              (index === positionVerbQuizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                              "outline"
                            }
                            className={`p-4 text-lg ${
                              showResult && index === positionVerbQuizQuestions[currentQuiz].correct ? 
                              "bg-green-500 hover:bg-green-600" : ""
                            }`}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showResult}
                          >
                            {showResult && index === positionVerbQuizQuestions[currentQuiz].correct && (
                              <CheckCircle className="w-5 h-5 mr-2" />
                            )}
                            {showResult && selectedAnswer === index && index !== positionVerbQuizQuestions[currentQuiz].correct && (
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
                            <p>{positionVerbQuizQuestions[currentQuiz].explanation}</p>
                          </div>
                          <Button onClick={handleNextQuestion} className="w-full">
                            {currentQuiz < positionVerbQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                      <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                      <p className="text-lg">Final Score: {score}/{positionVerbQuizQuestions.length}</p>
                      <Button onClick={() => resetQuizWithType('position')} className="flex items-center gap-2">
                        <RotateCcw className="w-4 h-4" />
                        Try Again
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {selectedSubtopic === 'separable' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Volume2 className="w-6 h-6" />
                    Separable Verbs
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleDutchText('separable-verbs')}
                      className="ml-auto"
                    >
                      {showDutchText['separable-verbs'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      Dutch
                    </Button>
                  </CardTitle>
                  {showDutchText['separable-verbs'] && (
                    <p className="text-sm text-muted-foreground">Scheidbare werkwoorden</p>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg leading-relaxed">
                    Separable verbs are compound verbs that literally 'separate' in certain sentence constructions. They consist of a prefix (like 'aan', 'mee', 'op') attached to a base verb. In main clauses, these verbs split apart: the main verb is conjugated and stays in the second position, while the prefix jumps to the very end of the sentence. This creates a 'verbal bracket' that frames the sentence.
                  </p>
                  {showDutchText['separable-verbs'] && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Scheidbare werkwoorden zijn samengestelde werkwoorden die letterlijk 'scheiden' in bepaalde zinsconstructies. Ze bestaan uit een voorvoegsel dat aan een basiswerkwoord is gehecht.
                    </p>
                  )}
                  
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Common Separable Verbs:</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <ul className="text-sm space-y-1">
                          <li>• aankomen (to arrive)</li>
                          <li>• meebrengen (to bring along)</li>
                          <li>• dichtdoen (to close)</li>
                          <li>• opbellen (to call)</li>
                        </ul>
                      </div>
                      <div>
                        <ul className="text-sm space-y-1">
                          <li>• weggaan (to go away)</li>
                          <li>• uitnodigen (to invite)</li>
                          <li>• terugkomen (to come back)</li>
                          <li>• voorstellen (to introduce)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">Examples:</h3>
                    <div className="space-y-2">
                      <p className="text-sm"><strong>aankomen:</strong> De trein komt om 10.00 uur aan.</p>
                      <p className="text-sm"><strong>meebrengen:</strong> Ik breng mijn vriend mee.</p>
                      <p className="text-sm"><strong>dichtdoen:</strong> Doe je de deur dicht?</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">With Two Verbs:</h3>
                    <p className="text-sm mb-2">When using modal verbs, the separable verb stays together:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Peter wil straks weggaan. (not: Peter wil straks weg gaan)</li>
                      <li>• Ik kan je morgen opbellen. (not: Ik kan je morgen op bellen)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    Separable Verbs Quiz
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!quizCompleted ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {separableVerbQuizQuestions.length}</h3>
                        <div className="text-sm text-muted-foreground">Score: {score}/{separableVerbQuizQuestions.length}</div>
                      </div>
                      
                      <div className="text-center space-y-4">
                        <p className="text-lg">Complete the sentence:</p>
                        <p className="text-2xl font-bold text-primary">{separableVerbQuizQuestions[currentQuiz].sentence}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        {separableVerbQuizQuestions[currentQuiz].options.map((option, index) => (
                          <Button
                            key={index}
                            variant={selectedAnswer === index ? 
                              (index === separableVerbQuizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                              "outline"
                            }
                            className={`p-4 text-lg ${
                              showResult && index === separableVerbQuizQuestions[currentQuiz].correct ? 
                              "bg-green-500 hover:bg-green-600" : ""
                            }`}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showResult}
                          >
                            {showResult && index === separableVerbQuizQuestions[currentQuiz].correct && (
                              <CheckCircle className="w-5 h-5 mr-2" />
                            )}
                            {showResult && selectedAnswer === index && index !== separableVerbQuizQuestions[currentQuiz].correct && (
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
                            <p>{separableVerbQuizQuestions[currentQuiz].explanation}</p>
                          </div>
                          <Button onClick={handleNextQuestion} className="w-full">
                            {currentQuiz < separableVerbQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                      <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                      <p className="text-lg">Final Score: {score}/{separableVerbQuizQuestions.length}</p>
                      <Button onClick={() => resetQuizWithType('separable')} className="flex items-center gap-2">
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

  if (selectedTopic === 'hoofdzinnen') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button onClick={handleBackToTopics} variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Topics
              </Button>
              <h1 className="text-2xl font-bold">HoofdZinnen (Main Clauses)</h1>
              <div className="w-32" />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Basic Structure (1-2-3)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                A hoofdzin (main clause) is a complete sentence that can stand alone. The basic structure follows a simple 1-2-3 pattern that forms the foundation of Dutch sentence construction.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 bg-green-100 dark:bg-green-900">1. Wie of wat</th>
                        <th className="text-left p-2 bg-blue-100 dark:bg-blue-900">2. Werkwoord</th>
                        <th className="text-left p-2 bg-yellow-100 dark:bg-yellow-900">3. Rest</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 font-semibold text-green-700">Mark</td>
                        <td className="p-2 font-semibold text-blue-700">fietst</td>
                        <td className="p-2 font-semibold text-yellow-700">naar zijn werk</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-semibold text-green-700">Ik</td>
                        <td className="p-2 font-semibold text-blue-700">slaap</td>
                        <td className="p-2 font-semibold text-yellow-700">'s nachts</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-semibold text-green-700">Oma</td>
                        <td className="p-2 font-semibold text-blue-700">loopt</td>
                        <td className="p-2 font-semibold text-yellow-700">in het park</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="w-6 h-6" />
                Detailed Structure (1-2-3A-3B-3C-4)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg">
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
                        <td className="p-2 font-semibold">Aleksandra</td>
                        <td className="p-2 text-primary font-bold">wil</td>
                        <td className="p-2">nu</td>
                        <td className="p-2"></td>
                        <td className="p-2">naar bed</td>
                        <td className="p-2 text-red-600 font-bold">gaan</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-semibold">Tom</td>
                        <td className="p-2 text-primary font-bold">reist</td>
                        <td className="p-2">elke ochtend</td>
                        <td className="p-2">met de bus</td>
                        <td className="p-2">naar zijn werk</td>
                        <td className="p-2"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="w-6 h-6" />
                Connecting Main Clauses (EN, MAAR, WANT, DUS, OF)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-blue-50 dark:bg-blue-950">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-blue-800 dark:text-blue-200">EN (and)</h3>
                    <p className="text-sm mb-2 text-blue-600 dark:text-blue-400">Addition</p>
                    <p className="text-xs">De docent drinkt koffie <strong>en</strong> de cursisten drinken thee.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-red-50 dark:bg-red-950">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-red-800 dark:text-red-200">MAAR (but)</h3>
                    <p className="text-sm mb-2 text-red-600 dark:text-red-400">Contrast</p>
                    <p className="text-xs">Ik wil graag tv kijken, <strong>maar</strong> de tv is kapot.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50 dark:bg-green-950">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-green-800 dark:text-green-200">WANT (because)</h3>
                    <p className="text-sm mb-2 text-green-600 dark:text-green-400">Reason</p>
                    <p className="text-xs">Ik ga naar de dokter, <strong>want</strong> ik heb pijn.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-yellow-50 dark:bg-yellow-950">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-yellow-800 dark:text-yellow-200">DUS (so)</h3>
                    <p className="text-sm mb-2 text-yellow-600 dark:text-yellow-400">Result</p>
                    <p className="text-xs">Het is mooi weer, <strong>dus</strong> we kunnen een wandeling maken.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-purple-50 dark:bg-purple-950">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-purple-800 dark:text-purple-200">OF (or)</h3>
                    <p className="text-sm mb-2 text-purple-600 dark:text-purple-400">Choice</p>
                    <p className="text-xs">Je kunt naar buiten gaan <strong>of</strong> je kunt binnen blijven.</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                Conjunction Practice Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!quizCompleted ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {conjunctionQuizQuestions.length}</h3>
                    <div className="text-sm text-muted-foreground">Score: {score}/{conjunctionQuizQuestions.length}</div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <p className="text-lg">Choose the correct conjunction:</p>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-xl font-bold text-primary mb-2">{conjunctionQuizQuestions[currentQuiz].sentence1}</p>
                      <p className="text-lg">___</p>
                      <p className="text-xl font-bold text-primary mt-2">{conjunctionQuizQuestions[currentQuiz].sentence2}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {conjunctionQuizQuestions[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? 
                          (index === conjunctionQuizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                          "outline"
                        }
                        className={`p-4 text-lg ${
                          showResult && index === conjunctionQuizQuestions[currentQuiz].correct ? 
                          "bg-green-500 hover:bg-green-600" : ""
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                      >
                        {showResult && index === conjunctionQuizQuestions[currentQuiz].correct && (
                          <CheckCircle className="w-5 h-5 mr-2" />
                        )}
                        {showResult && selectedAnswer === index && index !== conjunctionQuizQuestions[currentQuiz].correct && (
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
                        <p>{conjunctionQuizQuestions[currentQuiz].explanation}</p>
                      </div>
                      <Button onClick={handleNextQuestion} className="w-full">
                        {currentQuiz < conjunctionQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                  <p className="text-lg">Final Score: {score}/{conjunctionQuizQuestions.length}</p>
                  <Button onClick={() => resetQuizWithType('conjunction')} className="flex items-center gap-2">
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

  if (selectedTopic === 'negation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button onClick={handleBackToTopics} variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Topics
              </Button>
              <h1 className="text-2xl font-bold">Negation (Niet & Geen)</h1>
              <div className="w-32" />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <XCircle className="w-6 h-6" />
                Negation: Niet and Geen
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleDutchText('negation-main')}
                  className="ml-auto"
                >
                  {showDutchText['negation-main'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Dutch
                </Button>
              </CardTitle>
              {showDutchText['negation-main'] && (
                <p className="text-sm text-muted-foreground">Niet en Geen</p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Negation in Dutch requires careful attention to word choice and positioning. Unlike English, which primarily uses 'not', Dutch has two main negation words: 'niet' and 'geen'. The choice between them depends on what type of word you're negating, and their position in the sentence follows specific rules that affect meaning and naturalness.
              </p>
              {showDutchText['negation-main'] && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ontkenning in het Nederlands vereist zorgvuldige aandacht voor woordkeuze en positionering. In tegenstelling tot het Engels gebruikt het Nederlands twee hoofdontkennende woorden: 'niet' en 'geen'.
                </p>
              )}
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-red-50 dark:bg-red-950">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-800 dark:text-red-200">NIET (Not)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">Used to negate verbs, adjectives, adverbs, and prepositional phrases:</p>
                    <ul className="text-sm space-y-1">
                      <li>• At end of sentence (simple negation)</li>
                      <li>• Before second verb (infinitives)</li>
                      <li>• Before prepositions</li>
                      <li>• Before adjectives/adverbs</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-50 dark:bg-blue-950">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-800 dark:text-blue-200">GEEN (No/Not a)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">Used to negate nouns, especially indefinite ones:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Always directly before nouns</li>
                      <li>• Replaces 'een' (a/an)</li>
                      <li>• With indefinite plural nouns</li>
                      <li>• Think: geen = niet + een</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-yellow-50 dark:bg-yellow-950">
                <CardHeader>
                  <CardTitle className="text-lg text-yellow-800 dark:text-yellow-200">Detailed Examples</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">NIET Examples:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium">Positive:</p>
                          <p>Ik werk vandaag.</p>
                          <p>Hij is groot.</p>
                          <p>Zij kan zwemmen.</p>
                          <p>Wij gaan naar huis.</p>
                        </div>
                        <div>
                          <p className="font-medium">Negative:</p>
                          <p>Ik werk vandaag <strong>niet</strong>.</p>
                          <p>Hij is <strong>niet</strong> groot.</p>
                          <p>Zij kan <strong>niet</strong> zwemmen.</p>
                          <p>Wij gaan <strong>niet</strong> naar huis.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">GEEN Examples:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium">Positive:</p>
                          <p>Ik heb een auto.</p>
                          <p>Er zijn studenten hier.</p>
                          <p>Hij drinkt koffie.</p>
                          <p>Wij hebben tijd.</p>
                        </div>
                        <div>
                          <p className="font-medium">Negative:</p>
                          <p>Ik heb <strong>geen</strong> auto.</p>
                          <p>Er zijn <strong>geen</strong> studenten hier.</p>
                          <p>Hij drinkt <strong>geen</strong> koffie.</p>
                          <p>Wij hebben <strong>geen</strong> tijd.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                Negation Practice Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!quizCompleted ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {negationQuizQuestions.length}</h3>
                    <div className="text-sm text-muted-foreground">Score: {score}/{negationQuizQuestions.length}</div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <p className="text-lg">Make this sentence negative:</p>
                    <p className="text-2xl font-bold text-primary">{negationQuizQuestions[currentQuiz].sentence}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {negationQuizQuestions[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? 
                          (index === negationQuizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                          "outline"
                        }
                        className={`p-4 text-lg ${
                          showResult && index === negationQuizQuestions[currentQuiz].correct ? 
                          "bg-green-500 hover:bg-green-600" : ""
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                      >
                        {showResult && index === negationQuizQuestions[currentQuiz].correct && (
                          <CheckCircle className="w-5 h-5 mr-2" />
                        )}
                        {showResult && selectedAnswer === index && index !== negationQuizQuestions[currentQuiz].correct && (
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
                        <p>{negationQuizQuestions[currentQuiz].explanation}</p>
                      </div>
                      <Button onClick={handleNextQuestion} className="w-full">
                        {currentQuiz < negationQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                  <p className="text-lg">Final Score: {score}/{negationQuizQuestions.length}</p>
                  <Button onClick={() => resetQuizWithType('negation')} className="flex items-center gap-2">
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
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Understanding vowels is crucial for Dutch pronunciation and spelling. Dutch vowels can be either long or short, and this affects how words are spelled and pronounced. The length of a vowel determines whether consonants are doubled in spelling and how plurals are formed.
              </p>
              {showDutchText['vowels'] && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Het begrijpen van klinkers is cruciaal voor Nederlandse uitspraak en spelling. Nederlandse klinkers kunnen lang of kort zijn, en dit beïnvloedt hoe woorden gespeld en uitgesproken worden.
                </p>
              )}
              
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
                <h3 className="font-semibold mb-2">How to Divide Words into Syllables:</h3>
                {showDutchText['vowels'] && (
                  <p className="text-xs text-muted-foreground mb-1">Hoe woorden in lettergrepen te verdelen:</p>
                )}
                <p className="text-sm mb-2">To understand vowel length, you need to divide words into syllables. Each syllable contains one vowel sound.</p>
                <p className="font-mono bg-muted p-2 rounded">Li-sa, Ca-ro-li-na, Sil-ves-ter, Ba-naan, To-ma-ten</p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Key Rules:</h3>
                {showDutchText['vowels'] && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">Belangrijke regels:</p>
                )}
                <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• A vowel at the end of a syllable is long</li>
                  <li>• A vowel followed by one consonant in a closed syllable is short</li>
                  <li>• Double vowels (aa, ee, oo, uu) are always long</li>
                  <li>• This affects spelling in plurals and verb forms</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="w-6 h-6" />
                Spelling Rules Overview
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleDutchText('spelling-rules')}
                  className="ml-auto"
                >
                  {showDutchText['spelling-rules'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Dutch
                </Button>
              </CardTitle>
              {showDutchText['spelling-rules'] && (
                <p className="text-sm text-muted-foreground">Spellingsregels Overzicht</p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-200">Rule 1: Vowel at End of Syllable is Long</h3>
                {showDutchText['spelling-rules'] && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">Regel 1: Klinker aan het einde van lettergreep is lang</p>
                )}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Word</th>
                        <th className="text-left p-2">Syllables</th>
                        <th className="text-left p-2">Long Vowel</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b"><td className="p-2">Banaan</td><td className="p-2 font-mono">Ba-naan</td><td className="p-2 text-primary font-bold">Ba (long a)</td></tr>
                      <tr className="border-b"><td className="p-2">Eten</td><td className="p-2 font-mono">E-ten</td><td className="p-2 text-primary font-bold">E (long e)</td></tr>
                      <tr className="border-b"><td className="p-2">Kopen</td><td className="p-2 font-mono">Ko-pen</td><td className="p-2 text-primary font-bold">Ko (long o)</td></tr>
                      <tr className="border-b"><td className="p-2">Praten</td><td className="p-2 font-mono">Pra-ten</td><td className="p-2 text-primary font-bold">Pra (long a)</td></tr>
                      <tr className="border-b"><td className="p-2">Tomaten</td><td className="p-2 font-mono">To-ma-ten</td><td className="p-2 text-primary font-bold">To, ma (long o, a)</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-green-800 dark:text-green-200">Long Vowels: Infinitive to Ik-vorm</h3>
                {showDutchText['spelling-rules'] && (
                  <p className="text-xs text-green-600 dark:text-green-400 mb-2">Lange klinkers: van infinitief naar ik-vorm</p>
                )}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Infinitive</th>
                        <th className="text-left p-2">Syllables</th>
                        <th className="text-left p-2">Stem</th>
                        <th className="text-left p-2">Ik-vorm</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b"><td className="p-2">Praten</td><td className="p-2 font-mono">Pra-ten</td><td className="p-2">Prat</td><td className="p-2 text-primary font-bold">Praat</td></tr>
                      <tr className="border-b"><td className="p-2">Eten</td><td className="p-2 font-mono">E-ten</td><td className="p-2">Et</td><td className="p-2 text-primary font-bold">Eet</td></tr>
                      <tr className="border-b"><td className="p-2">Lopen</td><td className="p-2 font-mono">Lo-pen</td><td className="p-2">Lop</td><td className="p-2 text-primary font-bold">Loop</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs mt-2 text-green-700 dark:text-green-300">Note: Double the vowel in ik-vorm to keep it long</p>
              </div>

              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-red-800 dark:text-red-200">Rule 2: No Double Consonants at Word End</h3>
                {showDutchText['spelling-rules'] && (
                  <p className="text-xs text-red-600 dark:text-red-400 mb-2">Regel 2: Geen dubbele medeklinkers aan het einde van een woord</p>
                )}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Infinitive</th>
                        <th className="text-left p-2">Stem</th>
                        <th className="text-left p-2">Ik-vorm</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b"><td className="p-2">Zeggen</td><td className="p-2">Zegg</td><td className="p-2 text-primary font-bold">Zeg</td></tr>
                      <tr className="border-b"><td className="p-2">Zitten</td><td className="p-2">Zitt</td><td className="p-2 text-primary font-bold">Zit</td></tr>
                      <tr className="border-b"><td className="p-2">Spellen</td><td className="p-2">Spell</td><td className="p-2 text-primary font-bold">Spel</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs mt-2 text-red-700 dark:text-red-300">Note: Remove one consonant from double consonants</p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-yellow-800 dark:text-yellow-200">Rule 3: No V or Z at Word End</h3>
                {showDutchText['spelling-rules'] && (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mb-2">Regel 3: Geen v en z aan het einde van een woord</p>
                )}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Infinitive</th>
                        <th className="text-left p-2">Stem</th>
                        <th className="text-left p-2">Ik-vorm</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b"><td className="p-2">Verven</td><td className="p-2">Verv</td><td className="p-2 text-primary font-bold">Verf (v→f)</td></tr>
                      <tr className="border-b"><td className="p-2">Verhuizen</td><td className="p-2">Verhuiz</td><td className="p-2 text-primary font-bold">Verhuis (z→s)</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs mt-2 text-yellow-700 dark:text-yellow-300">Note: V becomes F, Z becomes S at word end</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                Vowel Practice Quiz
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleDutchText('quiz-vowels')}
                  className="ml-auto"
                >
                  {showDutchText['quiz-vowels'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Dutch
                </Button>
              </CardTitle>
              {showDutchText['quiz-vowels'] && (
                <p className="text-sm text-muted-foreground">Oefenquiz Klinkers</p>
              )}
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
                  <Button onClick={() => resetQuizWithType('basic')} className="flex items-center gap-2">
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

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTopicSelect('negation')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Negation (Niet & Geen)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn how to make negative sentences using 'niet' and 'geen' with proper positioning rules.
              </p>
              <Button className="w-full">
                Start Learning
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTopicSelect('hoofdzinnen')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                HoofdZinnen (Main Clauses)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn Dutch sentence structure, word order, and connecting sentences with conjunctions.
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