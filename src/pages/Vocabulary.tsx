import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { VocabularyCard } from '@/components/VocabularyCard';
import { VocabularyPractice } from '@/components/VocabularyPractice';
import Navigation from '@/components/Navigation';
import { ArrowLeft, BookOpen, Target, Volume2, Loader2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/dutch-hero.jpg';
import { loadVocabularyData, type VocabularyThema, type VocabularyWord } from '@/utils/csvLoader';

export default function Vocabulary() {
  const [selectedThemaName, setSelectedThemaName] = useState<string | null>(null);
  const [selectedSubsection, setSelectedSubsection] = useState<number | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [vocabularyData, setVocabularyData] = useState<VocabularyThema[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<VocabularyWord[]>([]);
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
          title: "Loading Error",
          description: "There was a problem loading the vocabulary lists.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const allWords = vocabularyData.flatMap(topic => topic.words);
      const results = allWords.filter(word => 
        word.dutch.toLowerCase().includes(searchQuery.toLowerCase()) ||
        word.english.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, vocabularyData]);

  const handleSelectTopic = (topicName: string) => {
    setSelectedThemaName(topicName);
    setSelectedSubsection(null);
  };

  const handleStartPractice = (subsectionId: number) => {
    setSelectedSubsection(subsectionId);
    setCurrentWordIndex(0);
    toast({
      title: "Vocabulary Started! 📚",
      description: "Good luck with your Dutch words!",
    });
  };

  const handleBackToSubsections = () => {
    setSelectedSubsection(null);
    setCurrentWordIndex(0);
  };

  const handleBackToTopics = () => {
    setSelectedThemaName(null);
    setSelectedSubsection(null);
    setCurrentWordIndex(0);
  };

  const handleNextWord = () => {
    const currentSubsection = vocabularyData.find(t => t.id === selectedSubsection);
    if (currentSubsection && currentWordIndex < currentSubsection.words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      toast({
        title: "Congratulations! 🎉",
        description: "You have viewed all words!",
      });
      handleBackToSubsections();
    }
  };

  const handlePreviousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(prev => prev - 1);
    }
  };

  // Group subsections by topic
  const topicGroups = vocabularyData.reduce((acc, subsection) => {
    // Find which topic this subsection belongs to by checking the words
    const sampleWord = subsection.words[0];
    if (sampleWord) {
      // We need to determine topic from the CSV data structure
      // For now, let's use a simple mapping based on subsection names
      let topicName = 'Topic 1: Who Are You?';
      
      const shoppingSections = ['Who does the shopping?', 'How can I help you?', 'Where do you shop?', 'Is the Jumbo still open?'];
      const socialSections = ['Nice weather right?', 'Nice to see you', 'Come watch football with me?', 'Congratulations!'];
      
      if (shoppingSections.includes(subsection.title)) {
        topicName = 'Topic 2: Shopping';
      } else if (socialSections.includes(subsection.title)) {
        topicName = 'Topic 3: Social Conversations';
      }
      
      if (!acc[topicName]) acc[topicName] = [];
      acc[topicName].push(subsection);
    }
    return acc;
  }, {} as Record<string, VocabularyThema[]>);

  const currentSubsection = vocabularyData.find(t => t.id === selectedSubsection);
  const currentWord = currentSubsection?.words[currentWordIndex];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Vocabulary loading...</p>
        </div>
      </div>
    );
  }

  if (selectedSubsection && currentWord) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handleBackToSubsections}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Subsections
              </Button>
              <div className="text-center">
                <h1 className="text-xl font-bold text-foreground">{currentSubsection?.title}</h1>
                <p className="text-sm text-muted-foreground">Practise Vocabulary</p>
              </div>
              <div className="w-48" />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <VocabularyPractice
            word={currentWord}
            wordNumber={currentWordIndex + 1}
            totalWords={currentSubsection.words.length}
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

      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
           Choose a Topic
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            First select a topic, then choose a specific subsection to practice vocabulary.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search Dutch or English words..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {searchResults.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-center">Search Results ({searchResults.length})</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {searchResults.slice(0, 12).map((word, index) => (
                <Card key={index} className="p-4">
                  <div className="text-center">
                    <p className="font-semibold text-lg">{word.dutch}</p>
                    <p className="text-muted-foreground">{word.english}</p>
                    {word.example && (
                      <p className="text-sm text-muted-foreground mt-2 italic">{word.example}</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
            {searchResults.length > 12 && (
              <p className="text-center text-muted-foreground mt-4">Showing first 12 results</p>
            )}
          </div>
        )}

        {!searchQuery && (
          !selectedThemaName ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {Object.keys(topicGroups).map((topicName) => (
                <Card key={topicName} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSelectTopic(topicName)}>
                  <CardHeader>
                    <CardTitle className="text-xl">{topicName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {topicGroups[topicName].length} subsections available
                    </p>
                    <Button className="w-full">
                      Select Topic
                    </Button>
                  </CardContent>
                </Card>
              ))}
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
                <h3 className="text-2xl font-bold text-center">{selectedThemaName} - Choose Subsection</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {topicGroups[selectedThemaName]?.map((subsection) => (
                  <VocabularyCard
                    key={subsection.id}
                    thema={subsection}
                    onStartPractice={handleStartPractice}
                  />
                ))}
              </div>
            </div>
          )
        )}

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