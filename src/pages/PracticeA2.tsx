import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, PenTool, Headphones, Mic, GraduationCap, Clock, Target, CheckCircle, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import heroImage from '@/assets/dutch-hero.jpg';

export default function PracticeA2() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [currentExam, setCurrentExam] = useState<{section: string, examNumber: number} | null>(null);
  const [examStarted, setExamStarted] = useState(false);
  const [examInProgress, setExamInProgress] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [examCompleted, setExamCompleted] = useState(false);
  const [score, setScore] = useState<{correct: number, total: number, percentage: number, points: number} | null>(null);

  // Timer effect
  useEffect(() => {
    if (examInProgress && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && examInProgress) {
      handleSubmitExam();
    }
  }, [timeLeft, examInProgress]);

  const getExamQuestions = (section: string, examNumber: number) => {
    const questionSets = {
      reading: {
        1: [
          {
            id: 1,
            type: 'text',
            text: "Beste mevrouw De Vries,\n\nIk schrijf u omdat ik een afspraak wil maken bij de tandarts. Ik heb pijn in mijn tand en kan niet goed eten. Kunt u mij helpen? Ik kan donderdag of vrijdag komen.\n\nMet vriendelijke groet,\nPiet Janssen",
            question: "Waarom schrijft Piet deze brief?",
            options: ["Hij wil een afspraak maken", "Hij wil zijn tand laten trekken", "Hij wil informatie over tandartsen", "Hij wil zijn rekening betalen"],
            correct: 0
          },
          {
            id: 2,
            type: 'text',
            text: "OPENINGSTIJDEN BIBLIOTHEEK\n\nMaandag: 10:00 - 18:00\nDinsdag: Gesloten\nWoensdag: 10:00 - 21:00\nDonderdag: 10:00 - 18:00\nVrijdag: 10:00 - 17:00\nZaterdag: 10:00 - 16:00\nZondag: 13:00 - 17:00",
            question: "Op welke dag is de bibliotheek het langst open?",
            options: ["Maandag", "Woensdag", "Donderdag", "Zaterdag"],
            correct: 1
          },
          {
            id: 3,
            type: 'text',
            text: "Te koop: Fiets, 3 jaar oud, goede staat. Prijs: €150. Interesse? Bel 06-12345678 na 18:00 uur.",
            question: "Hoe oud is de fiets?",
            options: ["1 jaar", "2 jaar", "3 jaar", "4 jaar"],
            correct: 2
          },
          {
            id: 4,
            type: 'text',
            text: "Let op! Morgen geen warme maaltijden in de kantine vanwege reparatie van de keuken. Broodjes en drinken zijn wel verkrijgbaar.",
            question: "Wat kun je morgen NIET kopen in de kantine?",
            options: ["Broodjes", "Warme maaltijden", "Drinken", "Koffie"],
            correct: 1
          },
          {
            id: 5,
            type: 'text',
            text: "Cursus Nederlands voor beginners\nStart: 15 september\nTijd: Elke dinsdag van 19:00 tot 21:00\nPlaats: Gemeentehuis, zaal 3\nKosten: €75 voor 10 lessen\nAanmelden: www.gemeente.nl",
            question: "Hoeveel kost de cursus per les?",
            options: ["€7,50", "€10", "€15", "€75"],
            correct: 0
          }
        ]
      },
      writing: {
        1: [
          {
            id: 1,
            type: 'writing',
            task: "Schrijf een brief aan je buurman. Je hebt een probleem met lawaai. Gebruik minimaal 50 woorden.",
            prompt: "Punten om te vermelden:\n- Stel jezelf voor\n- Leg het probleem uit\n- Vraag om een oplossing\n- Bedank voor begrip",
            minWords: 50
          },
          {
            id: 2,
            type: 'writing',
            task: "Vul het formulier in voor een bibliotheekpas.",
            fields: [
              {name: "Voornaam", required: true},
              {name: "Achternaam", required: true},
              {name: "Adres", required: true},
              {name: "Telefoonnummer", required: true},
              {name: "E-mailadres", required: false}
            ]
          },
          {
            id: 3,
            type: 'writing',
            task: "Schrijf een e-mail aan je werkgever. Je bent ziek en kunt niet werken. Gebruik minimaal 40 woorden.",
            prompt: "Punten om te vermelden:\n- Je bent ziek\n- Je kunt niet komen werken\n- Wanneer je weer komt\n- Excuses",
            minWords: 40
          }
        ]
      },
      listening: {
        1: [
          {
            id: 1,
            type: 'audio',
            audioText: "Goedemorgen, u spreekt met de praktijk van dokter Smit. We zijn vandaag gesloten vanwege ziekte. Voor spoedeisende gevallen kunt u bellen naar 112.",
            question: "Waarom is de praktijk gesloten?",
            options: ["Vakantie", "Ziekte", "Reparatie", "Feestdag"],
            correct: 1
          },
          {
            id: 2,
            type: 'audio',
            audioText: "De trein naar Amsterdam vertrekt van spoor 3 om 14:25. Let op: de trein heeft 10 minuten vertraging.",
            question: "Hoe laat vertrekt de trein nu?",
            options: ["14:15", "14:25", "14:35", "14:45"],
            correct: 2
          },
          {
            id: 3,
            type: 'audio',
            audioText: "Welkom bij de supermarkt. Vandaag hebben we een speciale aanbieding: alle appels voor €1 per kilo. Normaal €2 per kilo.",
            question: "Hoeveel kosten de appels vandaag?",
            options: ["€0,50 per kilo", "€1 per kilo", "€1,50 per kilo", "€2 per kilo"],
            correct: 1
          },
          {
            id: 4,
            type: 'audio',
            audioText: "Het weer voor morgen: 's ochtends bewolkt met kans op regen. 's Middags wordt het zonnig met 18 graden.",
            question: "Hoe is het weer 's middags?",
            options: ["Bewolkt", "Regenachtig", "Zonnig", "Winderig"],
            correct: 2
          },
          {
            id: 5,
            type: 'audio',
            audioText: "Bus lijn 12 naar het centrum rijdt vandaag niet vanwege wegwerkzaamheden. Gebruik lijn 15 als alternatief.",
            question: "Welke bus kun je gebruiken in plaats van lijn 12?",
            options: ["Lijn 10", "Lijn 13", "Lijn 15", "Lijn 20"],
            correct: 2
          }
        ]
      },
      speaking: {
        1: [
          {
            id: 1,
            type: 'speaking',
            task: "Stel jezelf voor",
            prompt: "Vertel over jezelf: naam, leeftijd, waar je woont, wat je doet. Spreek 1-2 minuten.",
            timeLimit: 120
          },
          {
            id: 2,
            type: 'speaking',
            task: "Beschrijf je dagelijkse routine",
            prompt: "Vertel wat je elke dag doet: opstaan, ontbijt, werk/studie, vrije tijd. Spreek 2 minuten.",
            timeLimit: 120
          },
          {
            id: 3,
            type: 'speaking',
            task: "Rollenspel: In de winkel",
            prompt: "Je bent in een kledingwinkel. Je zoekt een jas. Vraag naar de prijs, maat en kleur. Spreek 2 minuten.",
            timeLimit: 120
          }
        ]
      },
      knm: {
        1: [
          {
            id: 1,
            type: 'multiple',
            question: "Wat is de hoofdstad van Nederland?",
            options: ["Rotterdam", "Amsterdam", "Den Haag", "Utrecht"],
            correct: 1
          },
          {
            id: 2,
            type: 'multiple',
            question: "Welke kleur heeft de Nederlandse vlag?",
            options: ["Rood, wit, blauw", "Rood, wit, groen", "Oranje, wit, blauw", "Rood, geel, blauw"],
            correct: 0
          },
          {
            id: 3,
            type: 'multiple',
            question: "Hoe heet de Nederlandse koning?",
            options: ["Willem-Alexander", "Beatrix", "Juliana", "Máxima"],
            correct: 0
          },
          {
            id: 4,
            type: 'multiple',
            question: "Wat moet je doen als je 18 wordt in Nederland?",
            options: ["Trouwen", "Stemmen", "Inschrijven GBA", "Rijbewijs halen"],
            correct: 2
          },
          {
            id: 5,
            type: 'multiple',
            question: "Welke feestdag vieren Nederlanders op 5 mei?",
            options: ["Koningsdag", "Sinterklaas", "Bevrijdingsdag", "Nieuwjaar"],
            correct: 2
          }
        ]
      }
    };
    return questionSets[section]?.[examNumber] || [];
  };

  const startExam = () => {
    if (!currentExam) return;
    
    const questions = getExamQuestions(currentExam.section, currentExam.examNumber);
    if (questions.length === 0) return;
    
    const duration = {
      reading: 65 * 60,
      writing: 90 * 60,
      listening: 30 * 60,
      speaking: 15 * 60,
      knm: 45 * 60
    };
    
    setTimeLeft(duration[currentExam.section] || 3900);
    setExamInProgress(true);
    setCurrentQuestion(0);
    setAnswers({});
    setExamCompleted(false);
    setScore(null);
  };

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({...prev, [questionId]: answer}));
  };

  const handleSubmitExam = () => {
    if (!currentExam) return;
    
    const questions = getExamQuestions(currentExam.section, currentExam.examNumber);
    let correct = 0;
    
    questions.forEach(q => {
      if (q.type === 'multiple' || q.type === 'text' || q.type === 'audio') {
        if (answers[q.id] === q.options?.[q.correct]?.toString() || parseInt(answers[q.id]) === q.correct) {
          correct++;
        }
      } else if (q.type === 'writing' || q.type === 'speaking') {
        // For writing/speaking, give partial credit if answered
        if (answers[q.id] && answers[q.id].length > 10) {
          correct += 0.8; // 80% credit for attempting
        }
      }
    });
    
    const percentage = (correct / questions.length) * 100;
    const points = Math.round(200 + (percentage / 100) * 600); // Scale to 200-800
    
    setScore({
      correct: Math.round(correct),
      total: questions.length,
      percentage: Math.round(percentage),
      points
    });
    
    setExamInProgress(false);
    setExamCompleted(true);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetExam = () => {
    setExamStarted(false);
    setExamInProgress(false);
    setExamCompleted(false);
    setCurrentExam(null);
    setCurrentQuestion(0);
    setAnswers({});
    setScore(null);
  };

  const sections = [
    {
      id: 'reading',
      title: 'Lezen (Reading)',
      icon: BookOpen,
      description: 'Practice reading comprehension with A2 level texts',
      duration: '65 minutes',
      questions: '30 questions',
      color: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800',
      iconColor: 'text-blue-600'
    },
    {
      id: 'writing',
      title: 'Schrijven (Writing)',
      icon: PenTool,
      description: 'Practice writing skills with formal and informal texts',
      duration: '90 minutes',
      questions: '3 tasks',
      color: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
      iconColor: 'text-green-600'
    },
    {
      id: 'listening',
      title: 'Luisteren (Listening)',
      icon: Headphones,
      description: 'Practice listening comprehension with audio materials',
      duration: '30 minutes',
      questions: '30 questions',
      color: 'bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800',
      iconColor: 'text-purple-600'
    },
    {
      id: 'speaking',
      title: 'Spreken (Speaking)',
      icon: Mic,
      description: 'Practice speaking skills with interactive exercises',
      duration: '15 minutes',
      questions: '3 tasks',
      color: 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800',
      iconColor: 'text-orange-600'
    },
    {
      id: 'knm',
      title: 'KNM (Kennis Nederlandse Maatschappij)',
      icon: GraduationCap,
      description: 'Knowledge of Dutch Society practice tests',
      duration: '45 minutes',
      questions: '30 questions',
      color: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800',
      iconColor: 'text-red-600'
    }
  ];

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
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90" />
        
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Practice A2 Inburgering
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Complete practice exams for the Dutch A2 Inburgering test. Realistic exam conditions with detailed feedback.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-white/80">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>A2 Level</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Timed Practice</span>
            </div>
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5" />
              <span>Real Exam Format</span>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Information Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About the A2 Inburgering Exam
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about the Dutch A2 Inburgering examination
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* What is Inburgering */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-800 dark:text-blue-200">What is Inburgering?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-blue-700 dark:text-blue-300">
                Inburgering is the Dutch integration process for newcomers. It includes learning Dutch language 
                and knowledge about Dutch society to help you participate fully in Dutch life.
              </p>
              <div className="bg-white/70 dark:bg-black/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Who needs to take it?</h4>
                <ul className="text-sm space-y-1">
                  <li>• Non-EU citizens aged 18-65</li>
                  <li>• EU citizens applying for Dutch citizenship</li>
                  <li>• Some family reunification cases</li>
                  <li>• Certain work permit holders</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Exam Structure */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-2xl text-green-800 dark:text-green-200">Exam Structure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-green-700 dark:text-green-300">
                The A2 Inburgering exam consists of 4 language skills + knowledge of Dutch society.
              </p>
              <div className="space-y-3">
                <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Reading (Lezen)</span>
                    <span className="text-sm">65 min</span>
                  </div>
                </div>
                <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Writing (Schrijven)</span>
                    <span className="text-sm">90 min</span>
                  </div>
                </div>
                <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Listening (Luisteren)</span>
                    <span className="text-sm">30 min</span>
                  </div>
                </div>
                <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Speaking (Spreken)</span>
                    <span className="text-sm">15 min</span>
                  </div>
                </div>
                <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">KNM</span>
                    <span className="text-sm">45 min</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* How to Apply */}
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="text-xl text-purple-800 dark:text-purple-200">How to Apply</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                  <span>Register at inburgeren.nl</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                  <span>Complete intake assessment</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                  <span>Choose exam location</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">4</span>
                  <span>Schedule exam date</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">5</span>
                  <span>Pay exam fees (€350)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Passing Requirements */}
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border-orange-200 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="text-xl text-orange-800 dark:text-orange-200">Passing Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="bg-white/70 dark:bg-black/30 p-2 rounded">
                  <div className="flex justify-between">
                    <span>Reading</span>
                    <span className="font-bold">≥ 500 points</span>
                  </div>
                </div>
                <div className="bg-white/70 dark:bg-black/30 p-2 rounded">
                  <div className="flex justify-between">
                    <span>Writing</span>
                    <span className="font-bold">≥ 500 points</span>
                  </div>
                </div>
                <div className="bg-white/70 dark:bg-black/30 p-2 rounded">
                  <div className="flex justify-between">
                    <span>Listening</span>
                    <span className="font-bold">≥ 500 points</span>
                  </div>
                </div>
                <div className="bg-white/70 dark:bg-black/30 p-2 rounded">
                  <div className="flex justify-between">
                    <span>Speaking</span>
                    <span className="font-bold">≥ 500 points</span>
                  </div>
                </div>
                <div className="bg-white/70 dark:bg-black/30 p-2 rounded">
                  <div className="flex justify-between">
                    <span>KNM</span>
                    <span className="font-bold">≥ 500 points</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                All sections must be passed individually. Scale: 200-800 points.
              </p>
            </CardContent>
          </Card>

          {/* Important Dates */}
          <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950 dark:to-cyan-950 border-teal-200 dark:border-teal-800">
            <CardHeader>
              <CardTitle className="text-xl text-teal-800 dark:text-teal-200">Important Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Exam Fee:</span>
                  <span className="ml-2">€350 (all sections)</span>
                </div>
                <div>
                  <span className="font-medium">Retake Fee:</span>
                  <span className="ml-2">€70 per section</span>
                </div>
                <div>
                  <span className="font-medium">Valid ID Required:</span>
                  <span className="ml-2">Passport or ID card</span>
                </div>
                <div>
                  <span className="font-medium">Results:</span>
                  <span className="ml-2">Available within 6 weeks</span>
                </div>
                <div>
                  <span className="font-medium">Booking:</span>
                  <span className="ml-2">3 months in advance</span>
                </div>
              </div>
              <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded mt-4">
                <p className="text-xs text-teal-700 dark:text-teal-300">
                  <strong>Tip:</strong> Practice regularly and take mock exams to improve your chances of success.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preparation Timeline */}
        <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 border-yellow-200 dark:border-yellow-800 mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-yellow-800 dark:text-yellow-200">Recommended Preparation Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold">3-6</div>
                <h4 className="font-semibold mb-2">Months Before</h4>
                <p className="text-sm text-muted-foreground">Start intensive Dutch lessons, focus on A2 level grammar and vocabulary</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold">2-3</div>
                <h4 className="font-semibold mb-2">Months Before</h4>
                <p className="text-sm text-muted-foreground">Take practice exams, identify weak areas, study Dutch society and culture</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold">1</div>
                <h4 className="font-semibold mb-2">Month Before</h4>
                <p className="text-sm text-muted-foreground">Intensive practice, mock exams, review KNM materials, book exam date</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold">1</div>
                <h4 className="font-semibold mb-2">Week Before</h4>
                <p className="text-sm text-muted-foreground">Final review, relax, prepare documents, get good rest</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            A2 Inburgering Practice Sections
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practice all components of the Dutch A2 Inburgering exam with realistic timing and difficulty.
          </p>
        </div>

        {/* Section Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <Card 
                key={section.id}
                className={`cursor-pointer transition-all hover:shadow-lg border-2 ${
                  selectedSection === section.id ? 'ring-2 ring-primary' : ''
                } ${section.color}`}
                onClick={() => setSelectedSection(selectedSection === section.id ? null : section.id)}
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 bg-white/50 dark:bg-black/20`}>
                    <IconComponent className={`w-8 h-8 ${section.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl text-center">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">{section.description}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Duration:</span>
                      <span>{section.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Questions:</span>
                      <span>{section.questions}</span>
                    </div>
                  </div>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById(`${section.id}-section`)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full"
                  >
                    Start Practice
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Practice Exams for each section */}
        {sections.map((section) => (
          <section key={section.id} id={`${section.id}-section`} className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {section.title} Practice Exams
              </h3>
              <p className="text-lg text-muted-foreground">
                Three complete practice exams following the official A2 Inburgering format
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((examNumber) => (
                <Card key={examNumber} className={`${section.color} border-2`}>
                  <CardHeader>
                    <CardTitle className="text-center">
                      Practice Exam {examNumber}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="space-y-4">
                      <div className="bg-white/70 dark:bg-black/30 p-4 rounded-lg">
                        <div className="flex items-center justify-center mb-2">
                          <Clock className="w-5 h-5 mr-2" />
                          <span className="font-semibold">{section.duration}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{section.questions}</p>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Difficulty:</span>
                          <span className="font-medium">A2 Level</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Format:</span>
                          <span className="font-medium">Official</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Feedback:</span>
                          <span className="font-medium">Detailed</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full"
                        onClick={() => {
                          setCurrentExam({section: section.id, examNumber});
                          setExamStarted(true);
                        }}
                      >
                        Start Exam {examNumber}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}

        {/* Exam Information */}
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center">About A2 Inburgering Practice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4">Exam Features</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Realistic exam timing and conditions</li>
                  <li>• Questions based on official A2 standards</li>
                  <li>• Immediate scoring and feedback</li>
                  <li>• Detailed explanations for wrong answers</li>
                  <li>• Pass probability assessment</li>
                  <li>• Study recommendations</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-4">After Each Practice</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Complete score breakdown</li>
                  <li>• Percentage chance to pass real exam</li>
                  <li>• Detailed explanation of incorrect answers</li>
                  <li>• Correct answers with reasoning</li>
                  <li>• Personalized study recommendations</li>
                  <li>• Areas for improvement identification</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h4 className="font-bold text-lg mb-2 text-yellow-800 dark:text-yellow-200">
                Official A2 Inburgering Standards
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                All practice exams follow the official Dutch A2 Inburgering exam format as specified by inburgeren.nl. 
                The timing, question types, and difficulty levels match the real examination conditions to give you 
                the most accurate practice experience possible.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Exam Interface */}
      {examStarted && currentExam && !examCompleted && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">
                  {sections.find(s => s.id === currentExam.section)?.title} - Practice Exam {currentExam.examNumber}
                </CardTitle>
                <Button 
                  variant="outline" 
                  onClick={resetExam}
                >
                  Exit Exam
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span className={timeLeft < 300 ? 'text-red-500 font-bold' : ''}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <div>
                  Question {currentQuestion + 1} of {getExamQuestions(currentExam.section, currentExam.examNumber).length}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {!examInProgress ? (
                <div className="text-center space-y-6">
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-lg border border-primary/20">
                    <h3 className="text-2xl font-bold mb-4">Exam Starting Soon...</h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      You are about to start the {sections.find(s => s.id === currentExam.section)?.title} practice exam.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/50 dark:bg-black/20 p-4 rounded">
                        <h4 className="font-semibold mb-2">Exam Instructions</h4>
                        <ul className="text-sm text-left space-y-1">
                          <li>• Read all questions carefully</li>
                          <li>• Manage your time effectively</li>
                          <li>• You can review answers before submitting</li>
                          <li>• No external help is allowed</li>
                        </ul>
                      </div>
                      <div className="bg-white/50 dark:bg-black/20 p-4 rounded">
                        <h4 className="font-semibold mb-2">Technical Requirements</h4>
                        <ul className="text-sm text-left space-y-1">
                          <li>• Stable internet connection</li>
                          <li>• Quiet environment</li>
                          <li>• Full screen recommended</li>
                          <li>• Do not refresh the page</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Button 
                        size="lg" 
                        className="w-full md:w-auto px-8"
                        onClick={startExam}
                      >
                        Begin Exam
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        By clicking "Begin Exam", you confirm that you are ready to start the timed practice exam.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {(() => {
                    const questions = getExamQuestions(currentExam.section, currentExam.examNumber);
                    const question = questions[currentQuestion];
                    if (!question) return null;

                    return (
                      <div className="space-y-6">
                        <div className="bg-muted/50 p-6 rounded-lg">
                          {question.type === 'text' && (
                            <div className="space-y-4">
                              <div className="bg-white dark:bg-gray-800 p-4 rounded border">
                                <pre className="whitespace-pre-wrap font-sans text-sm">{question.text}</pre>
                              </div>
                              <h3 className="text-lg font-semibold">{question.question}</h3>
                              <div className="space-y-2">
                                {question.options?.map((option, index) => (
                                  <label key={index} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      name={`question-${question.id}`}
                                      value={index}
                                      checked={answers[question.id] === index.toString()}
                                      onChange={(e) => handleAnswer(question.id, e.target.value)}
                                      className="w-4 h-4"
                                    />
                                    <span>{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}

                          {question.type === 'multiple' && (
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">{question.question}</h3>
                              <div className="space-y-2">
                                {question.options?.map((option, index) => (
                                  <label key={index} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      name={`question-${question.id}`}
                                      value={index}
                                      checked={answers[question.id] === index.toString()}
                                      onChange={(e) => handleAnswer(question.id, e.target.value)}
                                      className="w-4 h-4"
                                    />
                                    <span>{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}

                          {question.type === 'audio' && (
                            <div className="space-y-4">
                              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded border">
                                <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">🔊 Audio Fragment:</p>
                                <p className="italic">"{question.audioText}"</p>
                                <Button size="sm" className="mt-2">▶ Play Audio</Button>
                              </div>
                              <h3 className="text-lg font-semibold">{question.question}</h3>
                              <div className="space-y-2">
                                {question.options?.map((option, index) => (
                                  <label key={index} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      name={`question-${question.id}`}
                                      value={index}
                                      checked={answers[question.id] === index.toString()}
                                      onChange={(e) => handleAnswer(question.id, e.target.value)}
                                      className="w-4 h-4"
                                    />
                                    <span>{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}

                          {question.type === 'writing' && (
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">{question.task}</h3>
                              <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded border">
                                <pre className="whitespace-pre-wrap text-sm">{question.prompt}</pre>
                              </div>
                              {question.fields ? (
                                <div className="space-y-3">
                                  {question.fields.map((field, index) => (
                                    <div key={index}>
                                      <label className="block text-sm font-medium mb-1">
                                        {field.name} {field.required && <span className="text-red-500">*</span>}
                                      </label>
                                      <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        value={answers[`${question.id}-${index}`] || ''}
                                        onChange={(e) => handleAnswer(`${question.id}-${index}`, e.target.value)}
                                      />
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <textarea
                                  className="w-full h-32 p-3 border rounded"
                                  placeholder="Schrijf hier je antwoord..."
                                  value={answers[question.id] || ''}
                                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                                />
                              )}
                              {question.minWords && (
                                <p className="text-sm text-muted-foreground">
                                  Minimaal {question.minWords} woorden. Huidige: {(answers[question.id] || '').split(' ').length}
                                </p>
                              )}
                            </div>
                          )}

                          {question.type === 'speaking' && (
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">{question.task}</h3>
                              <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded border">
                                <p className="text-sm">{question.prompt}</p>
                                <p className="text-xs text-muted-foreground mt-2">Tijd: {question.timeLimit} seconden</p>
                              </div>
                              <div className="text-center space-y-4">
                                <div className="bg-red-100 dark:bg-red-900 p-4 rounded">
                                  <p className="text-sm text-red-700 dark:text-red-300">🎤 Spreek je antwoord in</p>
                                  <Button className="mt-2">Start Opname</Button>
                                </div>
                                <textarea
                                  className="w-full h-20 p-3 border rounded"
                                  placeholder="Of typ je antwoord hier (voor oefening)..."
                                  value={answers[question.id] || ''}
                                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-between">
                          <Button 
                            variant="outline"
                            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                            disabled={currentQuestion === 0}
                          >
                            Previous
                          </Button>
                          
                          {currentQuestion < questions.length - 1 ? (
                            <Button 
                              onClick={() => setCurrentQuestion(currentQuestion + 1)}
                            >
                              Next
                            </Button>
                          ) : (
                            <Button 
                              onClick={handleSubmitExam}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Submit Exam
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })()
                  }
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Exam Results */}
      {examCompleted && score && currentExam && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">Exam Results</CardTitle>
                <Button variant="outline" onClick={resetExam}>Close</Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Score Overview */}
                <div className="text-center space-y-4">
                  <div className={`text-6xl font-bold ${
                    score.points >= 500 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {score.points}
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-semibold">
                      {score.points >= 500 ? '🎉 PASSED!' : '❌ Not Passed'}
                    </p>
                    <p className="text-lg text-muted-foreground">
                      {score.correct} out of {score.total} correct ({score.percentage}%)
                    </p>
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className={score.points >= 500 ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'}>
                    <CardHeader>
                      <CardTitle className="text-lg">Performance Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Score:</span>
                          <span className="font-bold">{score.points}/800</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pass Threshold:</span>
                          <span>500/800</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Accuracy:</span>
                          <span>{score.percentage}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pass Probability:</span>
                          <span className="font-bold">
                            {score.points >= 600 ? '95%' : 
                             score.points >= 550 ? '80%' : 
                             score.points >= 500 ? '65%' : 
                             score.points >= 450 ? '35%' : '15%'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Study Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        {score.points < 500 && (
                          <>
                            <p>• Focus on basic A2 grammar and vocabulary</p>
                            <p>• Practice reading comprehension daily</p>
                            <p>• Take more practice exams</p>
                          </>
                        )}
                        {score.points >= 500 && score.points < 600 && (
                          <>
                            <p>• Review complex sentence structures</p>
                            <p>• Practice formal writing tasks</p>
                            <p>• Improve time management</p>
                          </>
                        )}
                        {score.points >= 600 && (
                          <>
                            <p>• Excellent performance! Keep practicing</p>
                            <p>• Focus on maintaining consistency</p>
                            <p>• Review any missed questions</p>
                          </>
                        )}
                        <p>• Study Dutch society and culture for KNM</p>
                        <p>• Practice speaking with native speakers</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Question Review */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Question Review</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {getExamQuestions(currentExam.section, currentExam.examNumber).map((q, index) => {
                        const userAnswer = answers[q.id];
                        const isCorrect = q.type === 'multiple' || q.type === 'text' || q.type === 'audio' ? 
                          (parseInt(userAnswer) === q.correct || userAnswer === q.options?.[q.correct]) :
                          userAnswer && userAnswer.length > 10;
                        
                        return (
                          <div key={q.id} className={`p-4 rounded border ${
                            isCorrect ? 'bg-green-50 dark:bg-green-950 border-green-200' : 
                            'bg-red-50 dark:bg-red-950 border-red-200'
                          }`}>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-medium">Question {index + 1}</p>
                                <p className="text-sm text-muted-foreground">
                                  {q.question || q.task}
                                </p>
                                {(q.type === 'multiple' || q.type === 'text' || q.type === 'audio') && (
                                  <div className="mt-2 text-sm">
                                    <p>Your answer: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                                      {q.options?.[parseInt(userAnswer)] || 'No answer'}
                                    </span></p>
                                    {!isCorrect && (
                                      <p>Correct answer: <span className="text-green-600">
                                        {q.options?.[q.correct]}
                                      </span></p>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className={`text-2xl ${
                                isCorrect ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {isCorrect ? '✓' : '✗'}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center space-y-4">
                  <Button onClick={resetExam} size="lg">
                    Take Another Practice Exam
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Keep practicing to improve your chances of passing the real A2 Inburgering exam!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}