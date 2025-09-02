import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { BookOpen, MessageCircle, Target, Award, ArrowRight, Play, Languages, Youtube, Puzzle, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/dutch-hero.jpg';

const Index = () => {
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
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-secondary/95" />
        
        <div className="relative container mx-auto px-4 py-32 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            HelloWereld
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Learn Dutch interactively with vocabulary and quizes and more.
            Perfect for A2-level students who want to improve their conversation skills.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
           
            <Link to="/vocabulary">
              <Button size="lg" variant="outline" className="w-full text-white border-white/30 hover:bg-white/10 flex items-center gap-2">
                <Languages className="w-4 h-4" />
                Vocabulary
              </Button>
            </Link>
             <Link to="/vragenlijst">
              <Button size="lg" variant="outline" className="w-full text-white border-white/30 hover:bg-white/10 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Interactions
              </Button>
            </Link>
            <Link to="/grammar">
              <Button size="lg" variant="outline" className="w-full text-white border-white/30 hover:bg-white/10 flex items-center gap-2">
                <Puzzle className="w-4 h-4" />
                Grammer
              </Button>
            </Link>
            <Link to="/youtube">
              <Button size="lg" variant="outline" className="w-full text-white border-white/30 hover:bg-white/10 flex items-center gap-2">
                <Youtube className="w-4 h-4" />
                Video's
              </Button>
            </Link>
            <Link to="/misc">
              <Button size="lg" variant="outline" className="w-full text-white border-white/30 hover:bg-white/10 flex items-center gap-2">
                <MoreHorizontal className="w-4 h-4" />
                Misc
              </Button>
            </Link>
          </div>
          
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
