import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { VocabularyCard } from '@/components/VocabularyCard';
import { VocabularyPractice } from '@/components/VocabularyPractice';
import Navigation from '@/components/Navigation';
import { ArrowLeft, BookOpen, Target, Volume2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/dutch-hero.jpg';
import { loadVocabularyData, type VocabularyThema } from '@/utils/csvLoader';



export default function Vocabulary() {
  const [selectedThema, setSelectedThema] = useState<number | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [vocabularyData, setVocabularyData] = useState<VocabularyThema[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await loadVocabularyData();
        setVocabularyData(data);
      } catch (error) {
        console.error('Failed to load vocabulary data:', error);
        toast({
          title: "Fout bij laden",
          description: "Er is een probleem opgetreden bij het laden van de woordenlijsten.",
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
    setCurrentWordIndex(0);
    toast({
      title: "Woordenlijst gestart! 📚",
      description: "Veel succes met je Nederlandse woorden!",
    });
  };

  const handleBackToThemas = () => {
    setSelectedThema(null);
    setCurrentWordIndex(0);
  };

  const handleNextWord = () => {
    const currentThema = vocabularyData.find(t => t.id === selectedThema);
    if (currentThema && currentWordIndex < currentThema.words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      toast({
        title: "Gefeliciteerd! 🎉",
        description: "Je hebt alle woorden bekeken!",
      });
      handleBackToThemas();
    }
  };

  const handlePreviousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(prev => prev - 1);
    }
  };

  const currentThema = vocabularyData.find(t => t.id === selectedThema);
  const currentWord = currentThema?.words[currentWordIndex];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Woordenlijsten loading...</p>
        </div>
      </div>
    );
  }

  if (selectedThema && currentWord) {
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
                Back to Vocabulary
              </Button>
              <div className="text-center">
                <h1 className="text-xl font-bold text-foreground">{currentThema?.title}</h1>
                <p className="text-sm text-muted-foreground">Practise Vocabulary</p>
              </div>
              <div className="w-48" />
            </div>
          </div>
        </header>

        {/* Word Practice */}
        <main className="container mx-auto px-4 py-8">
          <VocabularyPractice
            word={currentWord}
            wordNumber={currentWordIndex + 1}
            totalWords={currentThema.words.length}
            onNext={handleNextWord}
            onPrevious={handlePreviousWord}
            showNavigation={true}
          />
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
            Practise Vocabulary
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Learn Dutch words with their meanings, pronunciations, and example sentences. Perfect for expanding your vocabulary.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-white/80">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Vocabulary</span>
            </div>
            <div className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5" />
              <span>Dutch Pronunciation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Example sentences</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vocabulary Themas Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
           Choose a Wordlist
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select a topic to learn Dutch words with translations, pronunciations, and example sentences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {vocabularyData.map((thema) => (
            <VocabularyCard
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
              <CardTitle className="text-muted-foreground">coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">More Vocabulary Coming Soon!</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}