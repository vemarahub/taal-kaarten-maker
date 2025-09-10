import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, Hand, MapPin, Sun, Moon, Sunrise, Sunset } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import DutchTimePractice from '@/components/DutchTimePractice';
import heroImage from '@/assets/dutch-hero.jpg';

export default function Misc() {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const days = [
    { dutch: 'Maandag', english: 'Monday', color: 'bg-red-100 dark:bg-red-900' },
    { dutch: 'Dinsdag', english: 'Tuesday', color: 'bg-orange-100 dark:bg-orange-900' },
    { dutch: 'Woensdag', english: 'Wednesday', color: 'bg-yellow-100 dark:bg-yellow-900' },
    { dutch: 'Donderdag', english: 'Thursday', color: 'bg-green-100 dark:bg-green-900' },
    { dutch: 'Vrijdag', english: 'Friday', color: 'bg-blue-100 dark:bg-blue-900' },
    { dutch: 'Zaterdag', english: 'Saturday', color: 'bg-purple-100 dark:bg-purple-900' },
    { dutch: 'Zondag', english: 'Sunday', color: 'bg-pink-100 dark:bg-pink-900' }
  ];

  const timePeriods = [
    { 
      dutch: 'De ochtend / De morgen', 
      english: 'Morning', 
      time: '05:30-11:59', 
      adverb: "'s Ochtends / 's Morgens",
      icon: Sunrise,
      color: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800'
    },
    { 
      dutch: 'De middag', 
      english: 'Afternoon', 
      time: '12:00-17:00', 
      adverb: "'s Middags",
      icon: Sun,
      color: 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800'
    },
    { 
      dutch: 'De avond', 
      english: 'Evening', 
      time: '17:00-23:59', 
      adverb: "'s Avonds",
      icon: Sunset,
      color: 'bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800'
    },
    { 
      dutch: 'De nacht', 
      english: 'Night', 
      time: '00:00-05:30', 
      adverb: "'s Nachts",
      icon: Moon,
      color: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800'
    }
  ];

  const generateCombination = () => {
    if (selectedDay && selectedPeriod) {
      const day = days.find(d => d.dutch === selectedDay);
      const period = timePeriods.find(p => p.dutch === selectedPeriod);
      if (day && period) {
        const periodName = period.dutch.split(' / ')[0].toLowerCase().replace('de ', '');
        return `Op ${day.dutch.toLowerCase()}${periodName}`;
      }
    }
    return null;
  };

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
              <span>Days & Time</span>
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
              <CardTitle className="text-lg">Days & Week</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Weekdays, time periods, combinations
              </p>
              <Button 
                onClick={() => document.getElementById('days-week-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full"
              >
                Learn Days & Time
              </Button>
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
              <Button 
                onClick={() => document.getElementById('directions-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full"
              >
                Learn Directions
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Days & Week Section */}
      <section id="days-week-section" className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Days & Time Periods
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn Dutch days of the week and time periods, plus how to combine them.
            </p>
          </div>

          {/* Days of the Week */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                De dagen van de week (Days of the Week)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {days.map((day, index) => (
                  <Card 
                    key={day.dutch} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedDay === day.dutch ? 'ring-2 ring-primary' : ''
                    } ${day.color}`}
                    onClick={() => setSelectedDay(selectedDay === day.dutch ? null : day.dutch)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold mb-1">{index + 1}</div>
                      <div className="font-semibold text-lg">{day.dutch}</div>
                      <div className="text-sm text-muted-foreground">{day.english}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Time Periods */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Clock className="w-6 h-6" />
                De momenten van de dag (Time Periods)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {timePeriods.map((period) => {
                  const IconComponent = period.icon;
                  return (
                    <Card 
                      key={period.dutch}
                      className={`cursor-pointer transition-all hover:shadow-md border-2 ${
                        selectedPeriod === period.dutch ? 'ring-2 ring-primary' : ''
                      } ${period.color}`}
                      onClick={() => setSelectedPeriod(selectedPeriod === period.dutch ? null : period.dutch)}
                    >
                      <CardContent className="p-6 text-center">
                        <IconComponent className="w-12 h-12 mx-auto mb-4 text-primary" />
                        <h3 className="font-bold text-lg mb-2">{period.dutch}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{period.english}</p>
                        <div className="bg-white/50 dark:bg-black/20 rounded p-2 mb-2">
                          <p className="font-mono text-sm font-semibold">{period.time}</p>
                        </div>
                        <p className="text-sm font-medium">{period.adverb}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Day + Time Combinations */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Dag en moment combineren (Combining Day & Time)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-lg mb-4">Select a day and time period above to see the combination:</p>
                  {generateCombination() ? (
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                      <p className="text-2xl font-bold text-primary mb-2">{generateCombination()}</p>
                      <p className="text-muted-foreground">
                        On {days.find(d => d.dutch === selectedDay)?.english.toLowerCase()}{' '}
                        {timePeriods.find(p => p.dutch === selectedPeriod)?.english.toLowerCase()}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-muted/50 rounded-lg p-6">
                      <p className="text-muted-foreground">Click on a day and time period to see the combination</p>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="bg-green-50 dark:bg-green-950">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Examples:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Op maandagochtend</li>
                        <li>• Op zaterdagmiddag</li>
                        <li>• Op woensdagavond</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-blue-50 dark:bg-blue-950">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">In sentences:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• De Nederlandse cursus is op dinsdagavond</li>
                        <li>• Ik ga morgenmiddag naar een restaurant</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-purple-50 dark:bg-purple-950">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Pattern:</h4>
                      <p className="text-sm mb-2">Op + [day] + [time period]</p>
                      <p className="text-xs text-muted-foreground">Remove 'de' from time period</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Directions Section */}
      <section id="directions-section" className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              De weg wijzen (Giving Directions)
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn essential Dutch vocabulary for giving and understanding directions.
            </p>
          </div>

          {/* Basic Directions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                Basic Directions (Basisrichtingen)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">←</div>
                    <h3 className="font-bold text-xl mb-2 text-red-800 dark:text-red-200">Links</h3>
                    <p className="text-red-600 dark:text-red-400 mb-4">Left</p>
                    <div className="space-y-2 text-sm">
                      <p><strong>Ga naar links</strong><br/>Go to the left</p>
                      <p><strong>Ga linksaf</strong><br/>Turn left</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">↑</div>
                    <h3 className="font-bold text-xl mb-2 text-green-800 dark:text-green-200">Rechtdoor</h3>
                    <p className="text-green-600 dark:text-green-400 mb-4">Straight</p>
                    <div className="space-y-2 text-sm">
                      <p><strong>Ga rechtdoor</strong><br/>Go straight</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">→</div>
                    <h3 className="font-bold text-xl mb-2 text-blue-800 dark:text-blue-200">Rechts</h3>
                    <p className="text-blue-600 dark:text-blue-400 mb-4">Right</p>
                    <div className="space-y-2 text-sm">
                      <p><strong>Ga naar rechts</strong><br/>Go to the right</p>
                      <p><strong>Ga rechtsaf</strong><br/>Turn right</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Position Expressions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Position Expressions (Positie-uitdrukkingen)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-purple-50 dark:bg-purple-950">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4 text-purple-800 dark:text-purple-200">Aan de rechterkant</h3>
                    <p className="text-purple-600 dark:text-purple-400 mb-2">On the right side</p>
                    <p className="text-sm">Used to describe where something is located</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-orange-50 dark:bg-orange-950">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4 text-orange-800 dark:text-orange-200">Aan de linkerkant</h3>
                    <p className="text-orange-600 dark:text-orange-400 mb-2">On the left side</p>
                    <p className="text-sm">Used to describe where something is located</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Giving Instructions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Giving Instructions (Instructies geven)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 text-yellow-800 dark:text-yellow-200">Three Ways to Give Directions:</h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-yellow-700 dark:text-yellow-300">1. Statement Form</h4>
                      <div className="bg-white/50 dark:bg-black/20 p-3 rounded">
                        <p className="font-mono text-sm mb-1">Je gaat eerst naar rechts.</p>
                        <p className="text-xs text-muted-foreground">You go first to the right.</p>
                      </div>
                      <div className="bg-white/50 dark:bg-black/20 p-3 rounded">
                        <p className="font-mono text-sm mb-1">Je gaat daarna naar links.</p>
                        <p className="text-xs text-muted-foreground">You go then to the left.</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-yellow-700 dark:text-yellow-300">2. Inversion Form</h4>
                      <div className="bg-white/50 dark:bg-black/20 p-3 rounded">
                        <p className="font-mono text-sm mb-1">Eerst ga je naar rechts.</p>
                        <p className="text-xs text-muted-foreground">First you go to the right.</p>
                      </div>
                      <div className="bg-white/50 dark:bg-black/20 p-3 rounded">
                        <p className="font-mono text-sm mb-1">Daarna ga je naar links.</p>
                        <p className="text-xs text-muted-foreground">Then you go to the left.</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-yellow-700 dark:text-yellow-300">3. Imperative Form</h4>
                      <div className="bg-white/50 dark:bg-black/20 p-3 rounded">
                        <p className="font-mono text-sm mb-1">Ga naar rechts.</p>
                        <p className="text-xs text-muted-foreground">Go to the right.</p>
                      </div>
                      <div className="bg-white/50 dark:bg-black/20 p-3 rounded">
                        <p className="font-mono text-sm mb-1">Ga daarna naar links.</p>
                        <p className="text-xs text-muted-foreground">Go then to the left.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Challenge */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Direction Challenge (Richting Uitdaging)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-lg mb-6">Follow the directions to reach the destination!</p>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 p-8 rounded-lg border-2 border-dashed border-primary/30">
                    <div className="grid grid-cols-5 gap-4 max-w-md mx-auto">
                      {/* Simple 5x5 grid for direction challenge */}
                      {Array.from({ length: 25 }, (_, i) => {
                        const row = Math.floor(i / 5);
                        const col = i % 5;
                        const isStart = row === 4 && col === 0; // Bottom left
                        const isEnd = row === 0 && col === 4;   // Top right
                        const isPath = (row === 4 && col <= 2) || (col === 2 && row >= 2) || (row === 2 && col >= 2);
                        
                        return (
                          <div
                            key={i}
                            className={`w-8 h-8 rounded border-2 flex items-center justify-center text-xs font-bold ${
                              isStart ? 'bg-green-500 text-white border-green-600' :
                              isEnd ? 'bg-red-500 text-white border-red-600' :
                              isPath ? 'bg-blue-200 dark:bg-blue-800 border-blue-300 dark:border-blue-700' :
                              'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                            }`}
                          >
                            {isStart ? 'S' : isEnd ? 'E' : ''}
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-6 space-y-3">
                      <h3 className="font-bold text-lg">Instructions:</h3>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                          <p className="font-semibold mb-1">1. Ga eerst naar rechts</p>
                          <p className="text-muted-foreground">Go first to the right</p>
                        </div>
                        <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                          <p className="font-semibold mb-1">2. Ga daarna rechtdoor</p>
                          <p className="text-muted-foreground">Then go straight</p>
                        </div>
                        <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                          <p className="font-semibold mb-1">3. Ga rechtsaf</p>
                          <p className="text-muted-foreground">Turn right</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-500 rounded"></div>
                          <span className="text-sm">Start (S)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-200 dark:bg-blue-800 rounded border border-blue-300"></div>
                          <span className="text-sm">Path</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-red-500 rounded"></div>
                          <span className="text-sm">End (E)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 text-green-800 dark:text-green-200">Practice Sentences:</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold mb-2">Formal Instructions:</p>
                      <ul className="space-y-1">
                        <li>• U gaat eerst naar rechts</li>
                        <li>• Daarna gaat u rechtdoor</li>
                        <li>• Ten slotte gaat u naar links</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Informal Instructions:</p>
                      <ul className="space-y-1">
                        <li>• Ga eerst naar rechts</li>
                        <li>• Dan ga je rechtdoor</li>
                        <li>• Daarna ga je linksaf</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Time Practice Section */}
      <section id="time-practice" className="py-16">
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