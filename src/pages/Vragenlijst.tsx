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
  },
  {
    id: 3,
    title: "Thema 3: Begroetingen en Welzijn",
    description: "Leer begroetingen, over je welzijn spreken en afspraken maken",
    color: "bg-gradient-to-br from-accent to-muted",
    questions: [
      { id: "3-1", question: "Hoe gaat het? :)", answer: "Het gaat goed. (En met jou?)" },
      { id: "3-2", question: "Hoe gaat het? :(", answer: "Het gaat niet goed." },
      { id: "3-3", question: "Hoe gaat het? :|", answer: "Het gaat niet zo goed" },
      { id: "3-4", question: "Alles goed?", answer: "Ja, prima! En met jou?" },
      { id: "3-5", question: "Hoe gaat het met je moeder? :)", answer: "Het gaat goed met mijn moeder." },
      { id: "3-6", question: "Hoe gaat het met je moeder? :(", answer: "Het gaat niet zo goed met mijn moeder." },
      { id: "3-7", question: "Waar woont je moeder?", answer: "Mijn moeder woont in Pakistan." },
      { id: "3-8", question: "Ben je ziek?", answer: "Nee, ik ben niet ziek." },
      { id: "3-9", question: "Wat drink je 's ochtends?", answer: "Ik drink 's ochtends citroenwater" },
      { id: "3-10", question: "Wat drink je 's avonds?", answer: "Ik drink 's avonds cola" },
      { id: "3-11", question: "Wat drink je 's middags?", answer: "Ik drink 's middags koffie" },
      { id: "3-12", question: "Wat drink je in het weekend?", answer: "Ik drink in het weekend bier" },
      { id: "3-13", question: "Drink je thee of koffie?", answer: "Ik drink graag koffie" },
      { id: "3-14", question: "Wil je suiker in je thee?", answer: "Ja, ik wil graag suiker in mijn thee" },
      { id: "3-15", question: "Wil je suiker in je koffie?", answer: "Ja, ik wil graag suiker in mijn koffie" },
      { id: "3-16", question: "Wanneer wil je afspreken?", answer: "Ik wil graag in het weekend afspreken" }
    ]
  },
  {
    id: 4,
    title: "Thema 4: Eten en Drinken",
    description: "Leer over voedsel, maaltijden en restaurant bezoeken",
    color: "bg-gradient-to-br from-primary to-secondary",
    questions: [
      { id: "4-1", question: "Wat eet je vanavond?", answer: "Vanavond eet ik rijst" },
      { id: "4-2", question: "Wat eet jij als toetje?", answer: "Ik eet vanillevla als toetje" },
      { id: "4-3", question: "Wat eet jij als lunch?", answer: "Ik eet rijst met curry als lunch" },
      { id: "4-4", question: "Wat eet jij als ontbijt?", answer: "Ik eet een boterham met kaas als ontbijt" },
      { id: "4-5", question: "Welk eten vind je lekker?", answer: "Ik vind naan lekker, dat is een soort brood" },
      { id: "4-6", question: "Wat drink je bij het eten?", answer: "Ik drink niets bij het eten" },
      { id: "4-7", question: "Wat eet of drink je in het weekend?", answer: "Ik eet rijst met kip in het weekend" },
      { id: "4-8", question: "Eet jij vlees?", answer: "Ja, ik eet vlees" },
      { id: "4-9", question: "Eet jij vis?", answer: "Ja, ik eet vis" },
      { id: "4-10", question: "Wat vind je niet lekker?", answer: "Ik vind broccoli niet lekker" },
      { id: "4-11", question: "Welke gezonde dingen eet je vaak?", answer: "Ik eet vaak muesli, yoghurt en fruit" },
      { id: "4-12", question: "Welke ongezonde dingen eet je?", answer: "Meestal eet ik chocoladetaart" },
      { id: "4-13", question: "Eet je vaak ongezonde dingen?", answer: "Ja, ik eet vaak ongezonde dingen (zoals chips)" },
      { id: "4-14", question: "Eet en drink je veel vet en suiker?", answer: "Nee, ik eet en drink niet veel vet en geen suiker" },
      { id: "4-15", question: "Eet je veel groente en fruit?", answer: "Ja, ik eet veel groente en fruit" },
      { id: "4-16", question: "Welk eten is typisch voor je geboorteland?", answer: "Naan is typisch voor mijn geboorteland, India. Het is een soort brood." },
      { id: "4-17", question: "Ga je vaak uit eten?", answer: "Ja, ik ga vaak uit eten in mijn geboorteland, maar niet in Nederland" },
      { id: "4-18", question: "Naar welk restaurant ga je graag?", answer: "Ik ga graag naar Koreaanse restaurants." },
      { id: "4-19", question: "Wanneer ga je uit eten?", answer: "Ik ga meestal 's ochtends uit eten" },
      { id: "4-20", question: "Hoe laat ga je eten in een restaurant?", answer: "Ik ga meestal rond 6 uur 's avonds naar een restaurant" },
      { id: "4-21", question: "Met wie ga je meestal uit eten?", answer: "Ik ga meestal uit met mijn gezin" },
      { id: "4-22", question: "Bestel je vaak eten op internet?", answer: "Ja, ik bestel vaak eten op internet" },
      { id: "4-23", question: "Wat voor eten bestel je op internet?", answer: "Ik bestel vaak pizza op internet" }
    ]
  },
  {
    id: 5,
    title: "Thema 5: Wonen en Huisinrichting",
    description: "Leer over woonsituaties, huizen en meubels",
    color: "bg-gradient-to-br from-accent to-primary",
    questions: [
      { id: "5-1", question: "In wat voor huis woon je?", answer: "Ik woon in een rijtjeshuis" },
      { id: "5-2", question: "Hoeveel kamers heeft je huis?", answer: "Mijn huis heeft vier kamers" },
      { id: "5-3", question: "Heb je een balkon of een tuin?", answer: "Ik heb een tuin" },
      { id: "5-4", question: "In wat voor buurt woon je?", answer: "Ik woon in een rustige buurt" },
      { id: "5-5", question: "Met wie woon je?", answer: "Ik woon met mijn gezin" },
      { id: "5-6", question: "Ben je blij met je huis?", answer: "Ja, ik ben blij met mijn huis" },
      { id: "5-7", question: "In wat voor huis wil je graag wonen?", answer: "Ik wil graag in een groot appartement wonen" },
      { id: "5-8", question: "Hoeveel huur wil je betalen?", answer: "Ik wil maximaal 1000 euro huur betalen" },
      { id: "5-9", question: "Hoe groot is je huis?", answer: "Mijn huis is ongeveer 100 vierkante meter" },
      { id: "5-10", question: "Welke meubels heb je in je huis?", answer: "Ik heb een bank, een tafel, een tv-meubel, twee stoelen en een bureau" },
      { id: "5-11", question: "Zijn je meubels groot of klein?", answer: "Mijn meubels zijn klein" },
      { id: "5-12", question: "Vind je je meubels mooi?", answer: "Ja, ik vind mijn meubels mooi" },
      { id: "5-13", question: "Zijn jouw meubels nieuw of tweedehands?", answer: "Sommige meubels zijn nieuw en sommige meubels zijn tweedehands" },
      { id: "5-14", question: "Welke kleuren heb je in je huis?", answer: "Ik heb pastelkleuren in mijn huis" },
      { id: "5-15", question: "Heb je veel licht in je huis?", answer: "Ja, ik heb veel licht in mijn huis" },
      { id: "5-16", question: "Heb je een huurwoning of een koopwoning?", answer: "Ik heb een koopwoning" },
      { id: "5-17", question: "Woon je in een stad of in een dorp?", answer: "Ik woon in een kleine stad" }
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
              <p className="text-muted-foreground">Meer thema's komen binnenkort!</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}