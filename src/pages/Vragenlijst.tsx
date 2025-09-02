import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ThemaCard } from '@/components/ThemaCard';
import { QuestionCard } from '@/components/QuestionCard';
import { ArrowLeft, BookOpen, Target, Users, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/dutch-hero.jpg';
import { loadThemaDataFromExcel, type Thema } from '@/utils/csvLoader';

export default function Vragenlijst() {
  const [selectedThema, setSelectedThema] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [themaDat, setThemaDat] = useState<Thema[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await loadThemaDataFromExcel();
        setThemaDat(data);
      } catch (error) {
        console.error('Failed to load thema data:', error);
        toast({
          title: "Fout bij laden",
          description: "Er is een probleem opgetreden bij het laden van de thema's.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  const handleStartPractice = (themaId: number) => {
    setSelectedThema(themaId);
    setCurrentQuestionIndex(0);
    toast({
      title: "Oefening gestart! 🎯",
      description: "Veel succes met je Nederlandse vragen!",
    });
  };

  const handleBackToThemas = () => {
    setSelectedThema(null);
    setCurrentQuestionIndex(0);
  };

  const handleNextQuestion = () => {
    const currentThema = themaDat.find(t => t.id === selectedThema);
    if (currentThema && currentQuestionIndex < currentThema.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Completed all questions
      toast({
        title: "Gefeliciteerd! 🎉",
        description: "Je hebt alle vragen voltooid!",
      });
      handleBackToThemas();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const currentThema = themaDat.find(t => t.id === selectedThema);
  const currentQuestion = currentThema?.questions[currentQuestionIndex];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Thema's laden...</p>
        </div>
      </div>
    );
  }

  if (selectedThema && currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        {/* Header */}
        <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handleBackToThemas}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Terug naar Thema's
              </Button>
              <div className="text-center">
                <h1 className="text-xl font-bold text-foreground">{currentThema?.title}</h1>
                <p className="text-sm text-muted-foreground">Nederlandse Vragenlijst</p>
              </div>
              <div className="w-32" /> {/* Spacer for centering */}
            </div>
          </div>
        </header>

        {/* Question Card */}
        <main className="container mx-auto px-4 py-8">
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={currentThema.questions.length}
            onNext={handleNextQuestion}
            onPrevious={handlePreviousQuestion}
            showNavigation={true}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90" />
        
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Nederlandse Vragenlijst
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Oefen Nederlandse conversatie met interactieve vragenthema's. Perfect voor A2-niveau studenten.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-white/80">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Interactieve Lessen</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>A2 Niveau</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Nederlandse Uitspraak</span>
            </div>
          </div>
        </div>
      </section>

      {/* Themas Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Kies een Thema
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selecteer een thema om te beginnen met oefenen. Elk thema bevat verschillende vragen 
            die je helpen je Nederlandse conversatievaardigheden te verbeteren.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {themaDat.map((thema) => (
            <ThemaCard
              key={thema.id}
              thema={thema}
              onStartPractice={handleStartPractice}
            />
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-12 text-center">
          <Card className="max-w-md mx-auto opacity-60">
            <CardHeader>
              <CardTitle className="text-muted-foreground">Binnenkort beschikbaar</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Meer thema's komen binnenkort!</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}