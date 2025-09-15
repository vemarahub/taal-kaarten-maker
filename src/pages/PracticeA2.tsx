import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, PenTool, Headphones, Mic, GraduationCap, Clock, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import heroImage from '@/assets/dutch-hero.jpg';

export default function PracticeA2() {
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
            A2 Inburgering Information
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Learn about the Dutch A2 Inburgering exam structure, timing, and requirements.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-white/80">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>A2 Level</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Official Format</span>
            </div>
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5" />
              <span>Exam Information</span>
            </div>
          </div>
        </div>
      </section>

      {/* A2 Exam Pattern Description */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            A2 Inburgering Exam Pattern
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            The A2 Inburgering exam consists of 5 sections testing your Dutch language skills and knowledge of Dutch society.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <CardTitle className="text-lg">Reading (Lezen)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold">65 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span className="font-semibold">30 questions</span>
                </div>
                <div className="flex justify-between">
                  <span>Pass threshold:</span>
                  <span className="font-semibold">18+ correct</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <PenTool className="w-6 h-6 text-green-600" />
                <CardTitle className="text-lg">Writing (Schrijven)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold">90 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Tasks:</span>
                  <span className="font-semibold">3 writing tasks</span>
                </div>
                <div className="flex justify-between">
                  <span>Pass threshold:</span>
                  <span className="font-semibold">18+ points</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Headphones className="w-6 h-6 text-purple-600" />
                <CardTitle className="text-lg">Listening (Luisteren)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold">30 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span className="font-semibold">30 questions</span>
                </div>
                <div className="flex justify-between">
                  <span>Pass threshold:</span>
                  <span className="font-semibold">18+ correct</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Mic className="w-6 h-6 text-orange-600" />
                <CardTitle className="text-lg">Speaking (Spreken)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold">15 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Tasks:</span>
                  <span className="font-semibold">3 speaking tasks</span>
                </div>
                <div className="flex justify-between">
                  <span>Pass threshold:</span>
                  <span className="font-semibold">18+ points</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 md:col-span-2 lg:col-span-1">
            <CardHeader>
              <div className="flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-red-600" />
                <CardTitle className="text-lg">KNM</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold">45 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span className="font-semibold">30 questions</span>
                </div>
                <div className="flex justify-between">
                  <span>Pass threshold:</span>
                  <span className="font-semibold">18+ correct</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl text-center">Success Probability Based on Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">95%</div>
                <div className="text-sm text-green-600 dark:text-green-400">23-25 correct</div>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">65%</div>
                <div className="text-sm text-blue-600 dark:text-blue-400">18-22 correct</div>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">35%</div>
                <div className="text-sm text-orange-600 dark:text-orange-400">13-17 correct</div>
              </div>
              <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-700 dark:text-red-300">15%</div>
                <div className="text-sm text-red-600 dark:text-red-400">0-12 correct</div>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              You need to pass all 5 sections to receive your A2 Inburgering certificate
            </p>
          </CardContent>
        </Card>

        {/* Practice Reading Button */}
        <div className="text-center mt-12">
          <Link to="/reading-game">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              <BookOpen className="w-6 h-6 mr-2" />
              Practice Reading
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}