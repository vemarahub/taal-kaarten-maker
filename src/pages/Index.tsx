import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BookOpen, MessageCircle, Target, Award, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/dutch-hero.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-secondary/95" />
        
        <div className="relative container mx-auto px-4 py-32 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            TaalPal
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Leer Nederlands op een interactieve manier met onze geavanceerde vragenlijst systeem. 
            Perfect voor A2-niveau studenten die hun conversatievaardigheden willen verbeteren.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/vragenlijst">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                <Play className="w-5 h-5 mr-2" />
                Nederlandse Vragenlijst
              </Button>
            </Link>
            <Link to="/vocabulary">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
                <BookOpen className="w-5 h-5 mr-2" />
                Nederlandse Woordenlijst
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-white/80">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>A2 Niveau</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Interactieve Vragen</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>Nederlandse Uitspraak</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Waarom TaalPal Kiezen?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Onze platform biedt een unieke aanpak om Nederlands te leren door middel van 
            gestructureerde vragenlijsten en interactieve oefeningen.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center group hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Gestructureerde Thema's</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Leer Nederlands door middel van zorgvuldig ontworpen thema's zoals 
                persoonlijke informatie en dagelijkse activiteiten.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-secondary" />
              </div>
              <CardTitle className="text-xl">Interactieve Oefeningen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Oefen met echte Nederlandse vragen en antwoorden. Ideal voor conversatie 
                voorbereiding en woordenschat uitbreiding.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-accent-foreground" />
              </div>
              <CardTitle className="text-xl">Nederlandse Uitspraak</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Luister naar correcte Nederlandse uitspraak met onze ingebouwde 
                text-to-speech functionaliteit.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Klaar om te beginnen?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Start vandaag nog met onze vragenlijst en woordenlijst om je Nederlandse conversatievaardigheden te verbeteren!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/vragenlijst">
                  <Button variant="hero" size="lg" className="text-lg px-8">
                    Vragenlijst Starten
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/vocabulary">
                  <Button variant="outline" size="lg" className="text-lg px-8">
                    Woordenlijst Bekijken
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
