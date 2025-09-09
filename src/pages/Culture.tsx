import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { ArrowLeft, Globe, BookOpen, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/dutch-hero.jpg';

interface CultureWord {
  dutch: string;
  english: string;
  topic: string;
  section: string;
  definition: string;
  english_definition?: string;
}

interface CultureSection {
  id: number;
  title: string;
  words: CultureWord[];
}

export default function Culture() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [cultureData, setCultureData] = useState<CultureSection[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadCultureData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/culture.csv');
        const csvText = await response.text();
        
        const lines = csvText.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',');
        
        const words: CultureWord[] = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',');
          if (values.length >= 5) {
            words.push({
              dutch: values[0],
              english: values[1],
              topic: values[2],
              section: values[3],
              definition: values[4],
              english_definition: values[5] || undefined
            });
          }
        }

        // Group by section
        const sectionsMap = new Map<string, CultureWord[]>();
        words.forEach(word => {
          if (!sectionsMap.has(word.section)) {
            sectionsMap.set(word.section, []);
          }
          sectionsMap.get(word.section)!.push(word);
        });

        const sections: CultureSection[] = Array.from(sectionsMap.entries()).map(([title, words], index) => ({
          id: index + 1,
          title,
          words
        }));

        setCultureData(sections);
      } catch (error) {
        console.error('Failed to load culture data:', error);
        toast({
          title: "Loading Error",
          description: "There was a problem loading the culture content.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadCultureData();
  }, [toast]);

  const handleSelectTopic = (topicName: string) => {
    setSelectedTopic(topicName);
    setSelectedSection(null);
  };

  const handleStartSection = (sectionId: number) => {
    setSelectedSection(sectionId);
    setCurrentWordIndex(0);
    toast({
      title: "Culture Study Started! 🇳🇱",
      description: "Learn about Dutch culture and KNM preparation!",
    });
  };

  const handleBackToSections = () => {
    setSelectedSection(null);
    setCurrentWordIndex(0);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setSelectedSection(null);
    setCurrentWordIndex(0);
  };

  const handleNextWord = () => {
    const currentSection = cultureData.find(s => s.id === selectedSection);
    if (currentSection && currentWordIndex < currentSection.words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      toast({
        title: "Section Complete! 🎉",
        description: "You have studied all terms in this section!",
      });
      handleBackToSections();
    }
  };

  const handlePreviousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(prev => prev - 1);
    }
  };

  const getSectionEnglishTitle = (dutchTitle: string): string => {
    const sectionTitles: Record<string, string> = {
      'Een nieuwe huurwoning': 'A New Rental Home',
      'Een huis kopen': 'Buying a House',
      'Gas water licht en internet': 'Gas, Water, Electricity and Internet',
      'Schoon en veilig': 'Clean and Safe',
      'Iedereen is anders': 'Everyone is Different',
      'Communiceren': 'Communicating',
      'Vrijheid en gelijkheid': 'Freedom and Equality',
      'Feesten en tradities': 'Festivals and Traditions',
      'Contact met anderen': 'Contact with Others',
      'Naar de dokter': 'Going to the Doctor',
      'Een verwijzing': 'A Referral',
      'De apotheek': 'The Pharmacy',
      'Spoed': 'Emergency',
      'De tandarts': 'The Dentist',
      'Kinderen en gezin': 'Children and Family',
      'Een zorgverzekering': 'Health Insurance',
      'Hulpverlening': 'Care Services',
      'Soorten onderwijs': 'Types of Education',
      'Zo gaat dat op school': 'How School Works',
      'De kosten van het onderwijs': 'Education Costs',
      'Kinderopvang': 'Childcare',
      'Hulp bij opvoeding': 'Parenting Support'
    };
    return sectionTitles[dutchTitle] || dutchTitle;
  };

  const currentSection = cultureData.find(s => s.id === selectedSection);
  const currentWord = currentSection?.words[currentWordIndex];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center">
        <div className="text-center">
          <Globe className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading culture content...</p>
        </div>
      </div>
    );
  }

  if (selectedSection && currentWord) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handleBackToSections}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sections
              </Button>
              <div className="text-center">
                <h1 className="text-xl font-bold text-foreground">
                  {getSectionEnglishTitle(currentSection?.title || '')}
                </h1>
                <p className="text-sm text-muted-foreground">{currentSection?.title}</p>
              </div>
              <div className="w-48" />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {currentWordIndex + 1} / {currentSection.words.length}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-primary mb-2">{currentWord.dutch}</h2>
                <p className="text-xl text-muted-foreground">{currentWord.english}</p>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Definition:</h3>
                {currentWord.english_definition && (
                  <p className="text-base mb-2">{currentWord.english_definition}</p>
                )}
                <p className="text-sm text-muted-foreground">{currentWord.definition}</p>
              </div>

              <div className="flex gap-2 justify-center">
                <Button
                  onClick={handlePreviousWord}
                  disabled={currentWordIndex === 0}
                  variant="outline"
                >
                  Previous
                </Button>
                <Button onClick={handleNextWord}>
                  {currentWordIndex === currentSection.words.length - 1 ? 'Complete' : 'Next'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Navigation />
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-blue-600/90" />
        
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Dutch Culture
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            This page is about Dutch culture and preparing for KNM (Kennis van de Nederlandse Maatschappij).
            Learn essential vocabulary and concepts for integration into Dutch society.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-white/80">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Dutch Culture</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>KNM Preparation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Integration Knowledge</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose a Topic
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select a topic below to start learning about Dutch culture and society.
          </p>
        </div>

        {!selectedTopic ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSelectTopic('Topic 1: Living')}>
              <CardHeader>
                <CardTitle className="text-xl">Topic 1: Living</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Learn about housing, utilities, and living arrangements in the Netherlands.
                </p>
                <Button className="w-full">
                  Select Topic
                </Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSelectTopic('Topic 2: Dealing with Others')}>
              <CardHeader>
                <CardTitle className="text-xl">Topic 2: Dealing with Others</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Learn about Dutch culture, communication, traditions, and social interactions.
                </p>
                <Button className="w-full">
                  Select Topic
                </Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSelectTopic('Topic 3: Health')}>
              <CardHeader>
                <CardTitle className="text-xl">Topic 3: Health</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Learn about healthcare system, medical services, and health insurance in the Netherlands.
                </p>
                <Button className="w-full">
                  Select Topic
                </Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSelectTopic('Topic 4: Education & Upbringing')}>
              <CardHeader>
                <CardTitle className="text-xl">Topic 4: Education & Upbringing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Learn about the Dutch education system, childcare, and parenting support.
                </p>
                <Button className="w-full">
                  Select Topic
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={handleBackToTopics}
                className="text-muted-foreground hover:text-foreground mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Topics
              </Button>
              <h3 className="text-2xl font-bold text-center">{selectedTopic} - Choose Section</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {cultureData.map((section) => (
                <Card key={section.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {getSectionEnglishTitle(section.title)}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{section.title}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {section.words.length} terms to study
                    </p>
                    <Button 
                      className="w-full"
                      onClick={() => handleStartSection(section.id)}
                    >
                      Start Section
                    </Button>
                  </CardContent>
                </Card>
              ))
            </div>
          </div>
        )}
      </section>
    </div>
  );
}