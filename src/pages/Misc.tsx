import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, Hand, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import DutchTimePractice from '@/components/DutchTimePractice';
import heroImage from '@/assets/dutch-hero.jpg';

export default function Misc() {
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
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90" />
        
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Miscellaneous Dutch
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Practical Dutch vocabulary for daily use. From greetings to time and days.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-white/80">
            <div className="flex items-center space-x-2">
              <Hand className="w-5 h-5" />
              <span>Greetings</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Time</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Days & Months</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Useful Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn essential Dutch words and expressions for different situations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <Card className="text-center group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Hand className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Greetings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Hello, bye, see you later
              </p>
              <p className="text-sm text-muted-foreground">Coming soon</p>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle className="text-lg">Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Hours, minutes, time expressions
              </p>
              <Button 
                onClick={() => document.getElementById('time-practice')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full"
              >
                Practice Time
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-lg">Days & Months</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Weekdays, months, seasons
              </p>
              <p className="text-sm text-muted-foreground">Coming soon</p>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Directions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Left, right, straight ahead
              </p>
              <p className="text-sm text-muted-foreground">Coming soon</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Time Practice Section */}
      <section id="time-practice" className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Time Practice
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn the Dutch way of expressing time with interactive exercises.
            </p>
          </div>
          
          <DutchTimePractice />
        </div>
      </section>
    </div>
  );
}