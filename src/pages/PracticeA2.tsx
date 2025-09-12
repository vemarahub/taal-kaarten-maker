import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, PenTool, Headphones, Mic, GraduationCap, Clock, Target } from 'lucide-react';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import heroImage from '@/assets/dutch-hero.jpg';

export default function PracticeA2() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

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
                          // This will be implemented with actual exam logic
                          alert(`Starting ${section.title} Practice Exam ${examNumber}. This will be implemented with full exam functionality.`);
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
    </div>
  );
}