import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Target, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import heroImage from '@/assets/dutch-hero.jpg';

export default function Grammar() {
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
            Nederlandse Grammatica
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Leer de basisregels van de Nederlandse grammatica. Perfect voor beginners en gevorderden.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-white/80">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Basisregels</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Voorbeelden</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Oefeningen</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Grammatica Onderwerpen
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ontdek verschillende grammaticaonderwerpen om je Nederlandse taalvaardigheden te verbeteren.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-muted-foreground">Werkwoorden</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Binnenkort beschikbaar</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-muted-foreground">Zelfstandige Naamwoorden</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Binnenkort beschikbaar</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-muted-foreground">Bijvoeglijke Naamwoorden</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Binnenkort beschikbaar</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}