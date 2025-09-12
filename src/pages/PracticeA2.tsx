import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, PenTool, Headphones, Mic, GraduationCap, Clock, Target, CheckCircle, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import heroImage from '@/assets/dutch-hero.jpg';
import { loadQuestionsFromCSV } from '@/utils/csvQuestionLoader';

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
  const [loadedQuestions, setLoadedQuestions] = useState<any[]>([]);

  // Timer effect
  useEffect(() => {
    if (examInProgress && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && examInProgress) {
      handleSubmitExam();
    }
  }, [timeLeft, examInProgress]);

  const handleSubmitExam = () => {
    if (!currentExam) return;
    
    const questions = loadedQuestions.length > 0 ? loadedQuestions : getExamQuestions(currentExam.section, currentExam.examNumber);
    let correct = 0;
    
    questions.forEach((q: any) => {
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

  const loadQuestionsForExam = async (section: string, examNumber: number) => {
    if (section === 'reading' && (examNumber === 1 || examNumber === 2 || examNumber === 3)) {
      const filename = `reading-practice-${examNumber}.csv`;
      const questions = await loadQuestionsFromCSV(filename);
      setLoadedQuestions(questions);
      return questions;
    }
    return getExamQuestions(section, examNumber);
  };

  const getExamQuestions = (section: string, examNumber: number) => {
    const questionSets: any = {
      reading: {},
      writing: {
        1: [
          {
            id: 1,
            type: 'writing',
            task: "Schrijf een brief aan je buurman. Je hebt een probleem met lawaai. Gebruik minimaal 50 woorden.",
            prompt: "Punten om te vermelden:\n- Stel jezelf voor\n- Leg het probleem uit\n- Vraag om een oplossing\n- Bedank voor begrip",
            minWords: 50
          }
        ]
      },
      listening: {
        1: [
          {
            id: 1,
            type: 'audio',
            audioText: "Goedemorgen, u spreekt met de praktijk van dokter Smit. We zijn vandaag gesloten vanwege ziekte.",
            question: "Waarom is de praktijk gesloten?",
            options: ["Vakantie", "Ziekte", "Reparatie", "Feestdag"],
            correct: 1
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
          }
        ]
      }
    };
    return questionSets[section]?.[examNumber] || [];
  };

  const startExam = async () => {
    if (!currentExam) return;
    
    let questions;
    if (currentExam.section === 'reading' && (currentExam.examNumber === 1 || currentExam.examNumber === 2 || currentExam.examNumber === 3)) {
      questions = await loadQuestionsForExam(currentExam.section, currentExam.examNumber);
    } else {
      questions = getExamQuestions(currentExam.section, currentExam.examNumber);
    }
    
    if (questions.length === 0) return;
    
    const section = sections.find(s => s.id === currentExam.section);
    const timeInSeconds = (section?.actualMinutes || 65) * 60;
    
    setTimeLeft(timeInSeconds);
    setExamInProgress(true);
    setCurrentQuestion(0);
    setAnswers({});
    setExamCompleted(false);
    setScore(null);
  };

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({...prev, [questionId]: answer}));
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
    setLoadedQuestions([]);
  };

  const sections = [
    {
      id: 'reading',
      title: 'Lezen (Reading)',
      icon: BookOpen,
      description: 'Practice reading comprehension with A2 level texts',
      duration: '65 minutes',
      questions: '30 questions',
      actualMinutes: 65,
      actualQuestions: 30,
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
      actualMinutes: 90,
      actualQuestions: 3,
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
      actualMinutes: 30,
      actualQuestions: 30,
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
      actualMinutes: 15,
      actualQuestions: 3,
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
      actualMinutes: 45,
      actualQuestions: 30,
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
                Complete practice exams following the official A2 Inburgering format
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
                          <span>Source:</span>
                          <span className="font-medium">
                            {section.id === 'reading' && (examNumber === 1 || examNumber === 2 || examNumber === 3) ? 'CSV Data' : 'Built-in'}
                          </span>
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
                <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded">
                  <Clock className={`w-5 h-5 ${timeLeft < 300 ? 'text-red-500' : 'text-primary'}`} />
                  <span className={`font-mono text-lg font-bold ${
                    timeLeft < 300 ? 'text-red-500 animate-pulse' : 
                    timeLeft < 600 ? 'text-orange-500' : 'text-primary'
                  }`}>
                    {formatTime(timeLeft)}
                  </span>
                  <span className="text-sm text-muted-foreground">remaining</span>
                </div>
                <div>
                  Question {currentQuestion + 1} of {(loadedQuestions.length > 0 ? loadedQuestions : getExamQuestions(currentExam.section, currentExam.examNumber)).length}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {!examInProgress ? (
                <div className="text-center space-y-6">
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-lg border border-primary/20">
                    <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      You are about to start the {sections.find(s => s.id === currentExam.section)?.title} practice exam.
                    </p>
                    <Button 
                      size="lg" 
                      className="w-full md:w-auto px-8"
                      onClick={startExam}
                    >
                      Begin Exam
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {(() => {
                    const questions = loadedQuestions.length > 0 ? loadedQuestions : getExamQuestions(currentExam.section, currentExam.examNumber);
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
                                {question.options?.map((option: string, index: number) => (
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
                                {question.options?.map((option: string, index: number) => (
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
                              <textarea
                                className="w-full h-32 p-3 border rounded"
                                placeholder="Schrijf hier je antwoord..."
                                value={answers[question.id] || ''}
                                onChange={(e) => handleAnswer(question.id, e.target.value)}
                              />
                              {question.minWords && (
                                <p className="text-sm text-muted-foreground">
                                  Minimaal {question.minWords} woorden. Huidige: {(answers[question.id] || '').split(' ').length}
                                </p>
                              )}
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
                  })()}
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