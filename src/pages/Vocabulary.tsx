import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { VocabularyCard } from '@/components/VocabularyCard';
import { VocabularyPractice } from '@/components/VocabularyPractice';
import { ArrowLeft, BookOpen, Target, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/dutch-hero.jpg';

interface VocabularyWord {
  dutch: string;
  english: string;
  article?: string;
  pronunciation?: string;
  example?: string;
}

interface VocabularyThema {
  id: number;
  title: string;
  description: string;
  words: VocabularyWord[];
  color: string;
}

const vocabularyData: VocabularyThema[] = [
  {
    id: 1,
    title: "Thema 1: Basis Woorden",
    description: "Essentiële Nederlandse woorden voor dagelijks gebruik",
    color: "bg-gradient-to-br from-primary to-primary-glow",
    words: [
      { dutch: "dat", english: "that", example: "Dat is mijn huis." },
      { dutch: "dit", english: "this", example: "Dit is mijn boek." },
      { dutch: "dorp", english: "village", article: "het", example: "Ik woon in een klein dorp." },
      { dutch: "een", english: "a/an", example: "Ik heb een auto." },
      { dutch: "één", english: "one", example: "Ik heb één zus." },
      { dutch: "gaan", english: "to go", example: "Ik ga naar school." },
      { dutch: "hij", english: "he", example: "Hij werkt hard." },
      { dutch: "ik", english: "I", example: "Ik ben student." },
      { dutch: "in", english: "in", example: "Ik woon in Amsterdam." },
      { dutch: "jaar", english: "year", article: "het", example: "Dit jaar leer ik Nederlands." },
      { dutch: "komen", english: "to come", example: "Ik kom uit India." },
      { dutch: "leren", english: "to learn", example: "Ik leer Nederlands op school." },
      { dutch: "maand", english: "month", article: "de", example: "Deze maand heb ik veel les." },
      { dutch: "naar", english: "to", example: "Ik ga naar de winkel." },
      { dutch: "Nederland", english: "Netherlands", example: "Ik woon in Nederland." },
      { dutch: "Nederlands", english: "Dutch", example: "Ik spreek Nederlands." },
      { dutch: "niet", english: "not", example: "Ik ben niet ziek." },
      { dutch: "nu", english: "now", example: "Nu ga ik naar huis." },
      { dutch: "school", english: "school", article: "de", example: "Ik ga naar school." },
      { dutch: "stad", english: "city", article: "de", example: "Amsterdam is een grote stad." },
      { dutch: "uit", english: "from/out", example: "Ik kom uit Pakistan." },
      { dutch: "werken", english: "to work", example: "Ik werk bij een bedrijf." },
      { dutch: "winkel", english: "store", article: "de", example: "De winkel is open." },
      { dutch: "wonen", english: "to live", example: "Ik woon in Almere." },
      { dutch: "ze", english: "they", example: "Ze zijn aardig." },
      { dutch: "zijn", english: "to be", example: "Ik ben gelukkig." }
    ]
  },
  {
    id: 2,
    title: "Thema 1: Persoonlijke Informatie",
    description: "Woorden voor het delen van persoonlijke informatie",
    color: "bg-gradient-to-br from-secondary to-accent",
    words: [
      { dutch: "achternaam", english: "surname/last name", article: "de", example: "Mijn achternaam is Jansen." },
      { dutch: "al", english: "already", example: "Ik woon al twee jaar hier." },
      { dutch: "en", english: "and", example: "Ik heet Piet en ik kom uit India." },
      { dutch: "hallo", english: "hello", example: "Hallo, hoe gaat het?" },
      { dutch: "hebben", english: "to have", example: "Ik heb een telefoon." },
      { dutch: "heten", english: "to be called", example: "Ik heet Piet." },
      { dutch: "hoe", english: "how", example: "Hoe heet je?" },
      { dutch: "hoelang", english: "how long", example: "Hoelang woon je hier?" },
      { dutch: "ja", english: "yes", example: "Ja, ik werk." },
      { dutch: "je", english: "you/your", example: "Wat is je naam?" },
      { dutch: "jij", english: "you", example: "Waar woon jij?" },
      { dutch: "kloppen", english: "to be correct", example: "Dat klopt!" },
      { dutch: "les", english: "lesson", article: "de", example: "Ik heb Nederlandse les." },
      { dutch: "leuk", english: "nice/fun", example: "De les is leuk." },
      { dutch: "mijn", english: "my", example: "Mijn naam is Piet." },
      { dutch: "Nederlands", english: "Dutch", example: "Ik leer Nederlands." },
      { dutch: "oké", english: "okay", example: "Oké, tot ziens!" },
      { dutch: "ook", english: "also", example: "Ik werk ook." },
      { dutch: "spellen", english: "to spell", example: "Kun je je naam spellen?" },
      { dutch: "telefoonnummer", english: "phone number", article: "het", example: "Wat is je telefoonnummer?" },
      { dutch: "vandaan", english: "from", example: "Waar kom je vandaan?" },
      { dutch: "voornaam", english: "first name", article: "de", example: "Mijn voornaam is Piet." },
      { dutch: "waar", english: "where", example: "Waar woon je?" },
      { dutch: "wat", english: "what", example: "Wat is je naam?" }
    ]
  }
];

export default function Vocabulary() {
  const [selectedThema, setSelectedThema] = useState<number | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const { toast } = useToast();

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
                Terug naar Woordenlijsten
              </Button>
              <div className="text-center">
                <h1 className="text-xl font-bold text-foreground">{currentThema?.title}</h1>
                <p className="text-sm text-muted-foreground">Nederlandse Woordenlijst</p>
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
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-accent/90 to-primary/90" />
        
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Nederlandse Woordenlijst
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Leer Nederlandse woorden met betekenis, uitspraak en voorbeeldzinnen. Perfect voor woordenschat uitbreiding.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-white/80">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Woordenschat</span>
            </div>
            <div className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5" />
              <span>Nederlandse Uitspraak</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Voorbeeldzinnen</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vocabulary Themas Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Kies een Woordenlijst
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selecteer een thema om Nederlandse woorden te leren met vertalingen, uitspraak en voorbeeldzinnen.
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
              <CardTitle className="text-muted-foreground">Binnenkort beschikbaar</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Meer woordenlijsten komen binnenkort!</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}