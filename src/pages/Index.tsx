import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { BookOpen, MessageCircle, Target, Award, ArrowRight, Play, Languages, Youtube, Puzzle, MoreHorizontal, X, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/dutch-hero.jpg';

const dutchFacts = [
  "The color orange is named after the Dutch royal family, the House of Orange-Nassau!",
  "The world's first stock exchange was established in Amsterdam in 1602.",
  "The Netherlands has more museums per square kilometer than any other country.",
  "Dutch people are the tallest in the world, with an average height of 6 feet for men!",
  "The Netherlands produces 80% of the world's flower bulbs.",
  "There are more bikes than residents in the Netherlands - over 23 million bikes!",
  "The Dutch invented the telescope, microscope, and pendulum clock.",
  "Stroopwafels were invented in the Dutch city of Gouda in the 1780s.",
  "The Netherlands has the highest English proficiency in the world (non-native speakers).",
  "Dutch painter Vincent van Gogh created over 2,000 artworks in just 10 years.",
  "The Netherlands is home to the International Court of Justice in The Hague.",
  "Carrots were originally purple - the Dutch developed orange carrots in the 17th century!",
  "The Dutch national anthem is the oldest in the world, dating from 1574.",
  "The Netherlands has the world's largest man-made island: Flevoland.",
  "Dutch cheese wheels are still tested by tapping them with a special hammer.",
  "The Netherlands invented speed skating and is still the most successful nation in the sport.",
  "Bluetooth technology was partly developed by Dutch company Philips.",
  "The Dutch consume more coffee per capita than almost any other nation.",
  "Hagelslag (chocolate sprinkles on bread) is a typical Dutch breakfast.",
  "The Netherlands has over 1,000 museums, including the world-famous Rijksmuseum.",
  "Dutch people invented the doughnut (oliebollen) in the 16th century.",
  "The Netherlands is below sea level - 26% of the country is underwater!",
  "Dutch architect Rem Koolhaas designed many famous buildings worldwide.",
  "The Netherlands has the world's first floating dairy farm in Rotterdam.",
  "Edam cheese is named after the Dutch town of Edam, where it originated."
];

const Index = () => {
  const [showFactPopup, setShowFactPopup] = useState(false);
  const [currentFact, setCurrentFact] = useState('');

  useEffect(() => {
    // Show popup on page load
    const randomFact = dutchFacts[Math.floor(Math.random() * dutchFacts.length)];
    setCurrentFact(randomFact);
    setShowFactPopup(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Did You Know Popup */}
      {showFactPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 border-orange-200 dark:border-orange-800 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
            <CardHeader className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-8 w-8 p-0 hover:bg-orange-100 dark:hover:bg-orange-900"
                onClick={() => setShowFactPopup(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-xl text-orange-800 dark:text-orange-200">
                  Did You Know?
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-orange-700 dark:text-orange-300 leading-relaxed mb-6">
                {currentFact}
              </p>
              <div className="flex justify-center">
                <Button
                  onClick={() => setShowFactPopup(false)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6"
                >
                  Interesting!
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-secondary/95" />
        
        <div className="relative container mx-auto px-4 py-32 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            HelloWereld
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Learn Dutch interactively with vocabulary and quizes and more.
            Perfect for A2-level students who want to improve their conversation skills.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 text-white/80">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>A2 Level</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Practise Interactions</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>Practise Vocabulary</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose HelloWereld?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Our platform offers a unique approach to learning Dutch through
        structured questionnaires and interactive exercises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center group hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Structured Themes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
               Learn Dutch through carefully designed topics such as
                personal information and daily activities.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-secondary" />
              </div>
              <CardTitle className="text-xl">Practise Interactions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
            Practice with real Dutch questions and answers. Ideal for conversation preparation and vocabulary development.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-accent-foreground" />
              </div>
              <CardTitle className="text-xl">Practise Listening</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
        Listen to correct Dutch pronunciation with our built-in text-to-speech functionality.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Ready to get started?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
              Start improving your Dutch conversation skills with our questionnaire and vocabulary list today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/vragenlijst">
                  <Button variant="hero" size="lg" className="text-lg px-8">
                    Practise Interactions
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/vocabulary">
                  <Button variant="outline" size="lg" className="text-lg px-8">
                    Practise Vocabulary
                    <BookOpen className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
