import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ThemaCard } from '@/components/ThemaCard';
import { QuestionCard } from '@/components/QuestionCard';
import { ArrowLeft, BookOpen, Target, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/dutch-hero.jpg';

// Mock data structure based on the provided themas
const themaDat = [
  {
    id: 1,
    title: "Thema 1: Persoonlijke Informatie",
    description: "Leer jezelf voor te stellen en persoonlijke informatie te delen in het Nederlands",
    color: "bg-gradient-to-br from-primary to-primary-glow",
    questions: [
      { id: "1-1", question: "Wie ben je?", answer: "Ik ben Alper" },
      { id: "1-2", question: "Waar woon je?", answer: "Ik woon in Almere." },
      { id: "1-3", question: "Waar kom je vandaan?", answer: "Ik kom uit India/Pakistan/Turkije/Litouwen" },
      { id: "1-4", question: "Woon je in een dorp of in een stad?", answer: "Ik woon in een stad" },
      { id: "1-5", question: "Hoelang woon je in Nederland?", answer: "Ik woon twee jaar in Nederland" },
      { id: "1-6", question: "Werk je?", answer: "Ja, ik werk" },
      { id: "1-7", question: "Waar werk je?", answer: "Ik werk bij Wordline" },
      { id: "1-8", question: "Ga je naar school?", answer: "Ja, ik ga naar school" },
      { id: "1-9", question: "Wat leer je op school?", answer: "Ik leer Nederlands" },
      { id: "1-10", question: "Wat is je telefoonnummer?", answer: "Mijn telefoonnummer is nul zes drie vijf zes negen etc." },
      { id: "1-11", question: "Hoe spel je je voornaam?", answer: "P I E T" },
      { id: "1-12", question: "Wat is je voornaam?", answer: "Mijn voornaam is Piet" },
      { id: "1-13", question: "Wat is je achternaam?", answer: "Mijn achternaam is Jansen" },
      { id: "1-14", question: "Hoe spel je je achternaam?", answer: "J A N S E N" },
      { id: "1-15", question: "Wat is je adres?", answer: "Mijn adres is [straat + huisnummer]" },
      { id: "1-16", question: "Wat is je postcode?", answer: "Mijn postcode is [postcode]" },
      { id: "1-17", question: "Wat is je woonplaats?", answer: "Mijn woonplaats is Almere." },
      { id: "1-18", question: "Wat is je e-mailadres?", answer: "Mijn e-mailadres is..." },
      { id: "1-19", question: "Waar ben je geboren?", answer: "Ik ben geboren in India." },
      { id: "1-20", question: "Wat is je nationaliteit?", answer: "Ik ben Indiaas/Turks/Litouws/Pakistaans/Sri-Lankaans" },
      { id: "1-21", question: "Hoe oud ben je?", answer: "Ik ben zes en dertig" },
      { id: "1-22", question: "Ben je getrouwd?", answer: "Ja, ik ben getrouwd" },
      { id: "1-23", question: "Met wie woon je?", answer: "Ik woon met mijn gezin / met mijn man" },
      { id: "1-24", question: "Wat zijn je hobby's?", answer: "Mijn hobby's zijn fietsen, koken en winkelen" }
    ]
  },
  {
    id: 2,
    title: "Thema 2: Dagelijkse Activiteiten",
    description: "Leer over dagelijkse activiteiten, winkelen en tijdsindeling",
    color: "bg-gradient-to-br from-secondary to-accent",
    questions: [
      { id: "2-1", question: "Wat koop je op de markt?", answer: "Ik koop kip en vis op de markt." },
      { id: "2-2", question: "Wat koop je in de supermarkt?", answer: "Ik koop melk in de supermarkt" },
      { id: "2-3", question: "Wanneer doe jij boodschappen?", answer: "Ik doe elke dag boodschappen" },
      { id: "2-4", question: "Waar doe jij boodschappen?", answer: "Ik doe boodschappen bij de Vomar" },
      { id: "2-5", question: "Eet je groenten? Welke groenten eet jij graag?", answer: "Ja, ik eet graag aardappels en paprika" },
      { id: "2-6", question: "Eet je fruit? Welk fruit eet jij graag?", answer: "Ja, ik eet fruit en mijn favoriete fruit is mango" },
      { id: "2-7", question: "Naar welke supermarkt ga jij?", answer: "Ik ga naar de Lidl" },
      { id: "2-8", question: "Op welke dagen heb je les?", answer: "Ik heb les op dinsdag en donderdag" },
      { id: "2-9", question: "Op welke dagen ben je thuis?", answer: "Ik ben thuis op maandag en vrijdag" },
      { id: "2-10", question: "Op welke dagen werk je?", answer: "Ik werk van maandag tot en met vrijdag" },
      { id: "2-11", question: "Op welke dagen sport je?", answer: "Ik sport in het weekend" },
      { id: "2-12", question: "Welke winkels zijn duur?", answer: "Guess is duur" },
      { id: "2-13", question: "Welke winkels zijn goedkoop?", answer: "De H&M is goedkoop, vind ik" },
      { id: "2-14", question: "Welke supermarkten zijn dichtbij?", answer: "De Plus is dichtbij" },
      { id: "2-15", question: "Hoe laat heb je les?", answer: "Ik heb 's avonds om kwart over 6 les" },
      { id: "2-16", question: "Hoe laat ben je 's avonds thuis?", answer: "Ik ben om half zes thuis" },
      { id: "2-17", question: "Hoe laat doe je boodschappen?", answer: "Ik doe boodschappen om kwart voor 10" },
      { id: "2-18", question: "Hoe laat sport je?", answer: "Ik sport elke woensdag om 1 uur 's middags" },
      { id: "2-19", question: "Hoe laat werk jij?", answer: "Ik werk van 9 uur 's ochtends tot 5 uur 's avonds" }
    ]
  }
];

export default function Vragenlijst() {
  const [selectedThema, setSelectedThema] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { toast } = useToast();

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
              <p className="text-muted-foreground">Thema 3, 4, en meer komen binnenkort!</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}