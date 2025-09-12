import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, GraduationCap, MapPin, Sun, Moon, Sunrise, Sunset, User, Users, Hash, Type } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import DutchTimePractice from '@/components/DutchTimePractice';
import heroImage from '@/assets/dutch-hero.jpg';

export default function Misc() {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [hoveredBodyPart, setHoveredBodyPart] = useState<string | null>(null);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState<string | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const playDutchPronunciation = (letter: string) => {
    const letterData = [
      { letter: 'A', dutch: 'aa' }, { letter: 'B', dutch: 'bee' }, { letter: 'C', dutch: 'see' },
      { letter: 'D', dutch: 'dee' }, { letter: 'E', dutch: 'ee' }, { letter: 'F', dutch: 'ef' },
      { letter: 'G', dutch: 'ghee' }, { letter: 'H', dutch: 'haa' }, { letter: 'I', dutch: 'ie' },
      { letter: 'J', dutch: 'jee' }, { letter: 'K', dutch: 'kaa' }, { letter: 'L', dutch: 'el' },
      { letter: 'M', dutch: 'em' }, { letter: 'N', dutch: 'en' }, { letter: 'O', dutch: 'oo' },
      { letter: 'P', dutch: 'pee' }, { letter: 'Q', dutch: 'kuu' }, { letter: 'R', dutch: 'er' },
      { letter: 'S', dutch: 'es' }, { letter: 'T', dutch: 'tee' }, { letter: 'U', dutch: 'uu' },
      { letter: 'V', dutch: 'vee' }, { letter: 'W', dutch: 'wee' }, { letter: 'X', dutch: 'iks' },
      { letter: 'Y', dutch: 'ie-grec' }, { letter: 'Z', dutch: 'zet' }
    ];
    
    const pronunciation = letterData.find(l => l.letter === letter)?.dutch;
    if (pronunciation && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(pronunciation);
      utterance.lang = 'nl-NL';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

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
              <GraduationCap className="w-5 h-5" />
              <span>Education System</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Time</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Days & Time</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Body Parts</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Family Relations</span>
            </div>
            <div className="flex items-center space-x-2">
              <Hash className="w-5 h-5" />
              <span>Numbers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Type className="w-5 h-5" />
              <span>Alphabets</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section id="useful-categories" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Useful Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn essential Dutch words and expressions for different situations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-6 max-w-full mx-auto">
          <Card className="text-center group hover:shadow-lg transition-shadow flex flex-col h-full">
            <CardHeader className="flex-shrink-0">
              <div className="w-12 h-12 bg-violet/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-violet/20 transition-colors">
                <Type className="w-6 h-6 text-violet-600" />
              </div>
              <CardTitle className="text-lg">Alphabets</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <p className="text-muted-foreground mb-4 flex-grow">
                A-Z with Dutch pronunciation
              </p>
              <Button 
                onClick={() => document.getElementById('alphabets-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full h-10 mt-auto"
              >
                Start
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-shadow flex flex-col h-full">
            <CardHeader className="flex-shrink-0">
              <div className="w-12 h-12 bg-indigo/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo/20 transition-colors">
                <Hash className="w-6 h-6 text-indigo-600" />
              </div>
              <CardTitle className="text-lg">Numbers</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <p className="text-muted-foreground mb-4 flex-grow">
                Count from 0 to millions
              </p>
              <Button 
                onClick={() => document.getElementById('numbers-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full h-10 mt-auto"
              >
                Start
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-shadow flex flex-col h-full">
            <CardHeader className="flex-shrink-0">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle className="text-lg">Time</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <p className="text-muted-foreground mb-4 flex-grow">
                Hours, minutes, time expressions
              </p>
              <Button 
                onClick={() => document.getElementById('time-practice')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full h-10 mt-auto"
              >
                Start
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-shadow flex flex-col h-full">
            <CardHeader className="flex-shrink-0">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-lg">Days & Week</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <p className="text-muted-foreground mb-4 flex-grow">
                Weekdays, time periods, combinations
              </p>
              <Button 
                onClick={() => document.getElementById('days-week-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full h-10 mt-auto"
              >
                Start
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-shadow flex flex-col h-full">
            <CardHeader className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Directions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <p className="text-muted-foreground mb-4 flex-grow">
                Left, right, straight ahead
              </p>
              <Button 
                onClick={() => document.getElementById('directions-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full h-10 mt-auto"
              >
                Start
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-shadow flex flex-col h-full">
            <CardHeader className="flex-shrink-0">
              <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-orange/20 transition-colors">
                <User className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Body Parts</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <p className="text-muted-foreground mb-4 flex-grow">
                Head, arms, legs, and more
              </p>
              <Button 
                onClick={() => document.getElementById('body-parts-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full h-10 mt-auto"
              >
                Start
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-shadow flex flex-col h-full">
            <CardHeader className="flex-shrink-0">
              <div className="w-12 h-12 bg-pink/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-pink/20 transition-colors">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
              <CardTitle className="text-lg">Family Relations</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <p className="text-muted-foreground mb-4 flex-grow">
                Parents, siblings, relatives
              </p>
              <Button 
                onClick={() => document.getElementById('family-relations-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full h-10 mt-auto"
              >
                Start
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-shadow flex flex-col h-full">
            <CardHeader className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Education System</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <p className="text-muted-foreground mb-4 flex-grow">
                Dutch schooling levels and paths
              </p>
              <Button 
                onClick={() => document.getElementById('education-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full h-10 mt-auto"
              >
                Start
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Days & Week Section */}
      <section id="days-week-section" className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('useful-categories')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2"
            >
              ← Back to Topics
            </Button>
          </div>
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

          {/* Seasons */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sun className="w-6 h-6" />
                De seizoenen (The Seasons)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Spring */}
                <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <svg viewBox="0 0 80 80" className="w-full h-full">
                        {/* Tree trunk */}
                        <rect x="35" y="50" width="10" height="25" fill="#8b4513"/>
                        {/* Tree crown with flowers */}
                        <circle cx="40" cy="45" r="20" fill="#22c55e"/>
                        {/* Flowers */}
                        <circle cx="30" cy="35" r="3" fill="#ec4899"/>
                        <circle cx="50" cy="40" r="3" fill="#f59e0b"/>
                        <circle cx="35" cy="55" r="3" fill="#ec4899"/>
                        <circle cx="45" cy="30" r="3" fill="#f59e0b"/>
                        {/* Sun */}
                        <circle cx="65" cy="20" r="8" fill="#fbbf24"/>
                        <path d="M65 5 L65 12 M80 20 L73 20 M75 8 L70 13 M75 32 L70 27" stroke="#fbbf24" strokeWidth="2"/>
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-green-800 dark:text-green-200">De lente</h3>
                    <p className="text-green-600 dark:text-green-400 mb-2">Spring</p>
                    <p className="text-sm text-muted-foreground">March - May</p>
                    <p className="text-xs text-muted-foreground mt-2">Blooming flowers, mild weather</p>
                  </CardContent>
                </Card>

                {/* Summer */}
                <Card className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <svg viewBox="0 0 80 80" className="w-full h-full">
                        {/* Bright sun */}
                        <circle cx="40" cy="25" r="12" fill="#fbbf24"/>
                        <path d="M40 5 L40 15 M65 25 L55 25 M58 10 L50 18 M58 40 L50 32 M40 45 L40 35 M15 25 L25 25 M22 10 L30 18 M22 40 L30 32" stroke="#fbbf24" strokeWidth="3"/>
                        {/* Beach/sand */}
                        <ellipse cx="40" cy="65" rx="35" ry="8" fill="#fbbf24" opacity="0.3"/>
                        {/* Palm tree */}
                        <rect x="60" y="45" width="4" height="25" fill="#8b4513"/>
                        <path d="M62 45 Q55 35 50 40 Q58 42 62 45 Q69 35 74 40 Q66 42 62 45 Q62 30 58 35 Q62 38 62 45" fill="#22c55e"/>
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-yellow-800 dark:text-yellow-200">De zomer</h3>
                    <p className="text-yellow-600 dark:text-yellow-400 mb-2">Summer</p>
                    <p className="text-sm text-muted-foreground">June - August</p>
                    <p className="text-xs text-muted-foreground mt-2">Hot weather, holidays</p>
                  </CardContent>
                </Card>

                {/* Autumn */}
                <Card className="bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <svg viewBox="0 0 80 80" className="w-full h-full">
                        {/* Tree trunk */}
                        <rect x="35" y="50" width="10" height="25" fill="#8b4513"/>
                        {/* Tree crown with autumn colors */}
                        <circle cx="40" cy="45" r="18" fill="#f97316"/>
                        <circle cx="35" cy="40" r="12" fill="#eab308"/>
                        <circle cx="45" cy="42" r="10" fill="#dc2626"/>
                        {/* Falling leaves */}
                        <path d="M20 30 Q22 32 20 34 Q18 32 20 30" fill="#f97316"/>
                        <path d="M60 35 Q62 37 60 39 Q58 37 60 35" fill="#eab308"/>
                        <path d="M25 50 Q27 52 25 54 Q23 52 25 50" fill="#dc2626"/>
                        {/* Cloudy sky */}
                        <ellipse cx="65" cy="15" rx="12" ry="6" fill="#9ca3af"/>
                        <ellipse cx="70" cy="20" rx="8" ry="4" fill="#9ca3af"/>
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-orange-800 dark:text-orange-200">De herfst</h3>
                    <p className="text-orange-600 dark:text-orange-400 mb-2">Autumn</p>
                    <p className="text-sm text-muted-foreground">September - November</p>
                    <p className="text-xs text-muted-foreground mt-2">Falling leaves, cooler weather</p>
                  </CardContent>
                </Card>

                {/* Winter */}
                <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <svg viewBox="0 0 80 80" className="w-full h-full">
                        {/* Snowman */}
                        <circle cx="40" cy="60" r="12" fill="white" stroke="#e5e7eb"/>
                        <circle cx="40" cy="45" r="9" fill="white" stroke="#e5e7eb"/>
                        <circle cx="40" cy="32" r="7" fill="white" stroke="#e5e7eb"/>
                        {/* Snowman features */}
                        <circle cx="37" cy="30" r="1" fill="black"/>
                        <circle cx="43" cy="30" r="1" fill="black"/>
                        <path d="M40 32 L42 34" stroke="#f97316" strokeWidth="2"/>
                        {/* Hat */}
                        <rect x="35" y="22" width="10" height="6" fill="black"/>
                        <rect x="33" y="28" width="14" height="2" fill="black"/>
                        {/* Snowflakes */}
                        <g stroke="#e5e7eb" strokeWidth="1" fill="none">
                          <path d="M15 15 L20 20 M20 15 L15 20 M17.5 12.5 L17.5 22.5 M12.5 17.5 L22.5 17.5"/>
                          <path d="M60 10 L65 15 M65 10 L60 15 M62.5 7.5 L62.5 17.5 M57.5 12.5 L67.5 12.5"/>
                          <path d="M70 50 L75 55 M75 50 L70 55 M72.5 47.5 L72.5 57.5 M67.5 52.5 L77.5 52.5"/>
                        </g>
                        {/* Ground snow */}
                        <ellipse cx="40" cy="72" rx="35" ry="5" fill="white" opacity="0.8"/>
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-blue-800 dark:text-blue-200">De winter</h3>
                    <p className="text-blue-600 dark:text-blue-400 mb-2">Winter</p>
                    <p className="text-sm text-muted-foreground">December - February</p>
                    <p className="text-xs text-muted-foreground mt-2">Snow, cold weather</p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Season vocabulary */}
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-green-50 to-yellow-50 dark:from-green-950 dark:to-yellow-950">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-lg mb-4">Season Vocabulary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">het seizoen</span>
                        <span className="text-muted-foreground">the season</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">de lente</span>
                        <span className="text-muted-foreground">spring</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">de zomer</span>
                        <span className="text-muted-foreground">summer</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">de herfst</span>
                        <span className="text-muted-foreground">autumn</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">de winter</span>
                        <span className="text-muted-foreground">winter</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-lg mb-4">Example Sentences</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-medium">In de lente bloeien de bloemen.</p>
                        <p className="text-muted-foreground text-xs">In spring, the flowers bloom.</p>
                      </div>
                      <div>
                        <p className="font-medium">De zomer is warm en zonnig.</p>
                        <p className="text-muted-foreground text-xs">Summer is warm and sunny.</p>
                      </div>
                      <div>
                        <p className="font-medium">In de herfst vallen de bladeren.</p>
                        <p className="text-muted-foreground text-xs">In autumn, the leaves fall.</p>
                      </div>
                      <div>
                        <p className="font-medium">De winter is koud en wit.</p>
                        <p className="text-muted-foreground text-xs">Winter is cold and white.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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

      {/* Dutch Education System Section */}
      <section id="education-section" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('useful-categories')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2"
            >
              ← Back to Topics
            </Button>
          </div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Het Nederlandse Onderwijssysteem (Dutch Education System)
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the Dutch education system with interactive pathways, age groups, and career opportunities.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Interactive Education Diagram */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-2xl text-center mb-6">Interactive Education Pathway</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative" style={{ height: '700px' }}>
                    <svg viewBox="0 0 800 700" className="w-full h-full">
                      {/* Primary Education */}
                      <rect x="300" y="50" width="200" height="60" rx="10"
                        fill={selectedEducationLevel === 'primary' ? '#3b82f6' : '#e5e7eb'}
                        stroke="#374151" strokeWidth="2"
                        className="cursor-pointer transition-colors"
                        onClick={() => setSelectedEducationLevel(selectedEducationLevel === 'primary' ? null : 'primary')}
                      />
                      <text x="400" y="75" textAnchor="middle" className="text-sm font-semibold fill-current">
                        Basisonderwijs
                      </text>
                      <text x="400" y="95" textAnchor="middle" className="text-xs fill-current">
                        Primary (4-12 years)
                      </text>
                      
                      {/* Arrow down */}
                      <path d="M400 110 L400 140 M390 130 L400 140 L410 130" stroke="#374151" strokeWidth="2" fill="none"/>
                      
                      {/* Secondary Education Split */}
                      <rect x="100" y="150" width="180" height="60" rx="10"
                        fill={selectedEducationLevel === 'vmbo' ? '#10b981' : '#e5e7eb'}
                        stroke="#374151" strokeWidth="2"
                        className="cursor-pointer transition-colors"
                        onClick={() => setSelectedEducationLevel(selectedEducationLevel === 'vmbo' ? null : 'vmbo')}
                      />
                      <text x="190" y="175" textAnchor="middle" className="text-sm font-semibold fill-current">
                        VMBO
                      </text>
                      <text x="190" y="195" textAnchor="middle" className="text-xs fill-current">
                        Vocational (12-16 years)
                      </text>
                      
                      <rect x="310" y="150" width="180" height="60" rx="10"
                        fill={selectedEducationLevel === 'havo' ? '#f59e0b' : '#e5e7eb'}
                        stroke="#374151" strokeWidth="2"
                        className="cursor-pointer transition-colors"
                        onClick={() => setSelectedEducationLevel(selectedEducationLevel === 'havo' ? null : 'havo')}
                      />
                      <text x="400" y="175" textAnchor="middle" className="text-sm font-semibold fill-current">
                        HAVO
                      </text>
                      <text x="400" y="195" textAnchor="middle" className="text-xs fill-current">
                        Higher General (12-17 years)
                      </text>
                      
                      <rect x="520" y="150" width="180" height="60" rx="10"
                        fill={selectedEducationLevel === 'vwo' ? '#8b5cf6' : '#e5e7eb'}
                        stroke="#374151" strokeWidth="2"
                        className="cursor-pointer transition-colors"
                        onClick={() => setSelectedEducationLevel(selectedEducationLevel === 'vwo' ? null : 'vwo')}
                      />
                      <text x="610" y="175" textAnchor="middle" className="text-sm font-semibold fill-current">
                        VWO
                      </text>
                      <text x="610" y="195" textAnchor="middle" className="text-xs fill-current">
                        Pre-University (12-18 years)
                      </text>
                      
                      {/* Arrows from primary to secondary */}
                      <path d="M350 110 L250 140 M240 135 L250 140 L245 150" stroke="#374151" strokeWidth="2" fill="none"/>
                      <path d="M400 110 L400 140 M390 130 L400 140 L410 130" stroke="#374151" strokeWidth="2" fill="none"/>
                      <path d="M450 110 L550 140 M540 135 L550 140 L555 150" stroke="#374151" strokeWidth="2" fill="none"/>
                      
                      {/* Tertiary Education */}
                      <rect x="50" y="250" width="160" height="60" rx="10"
                        fill={selectedEducationLevel === 'mbo' ? '#ef4444' : '#e5e7eb'}
                        stroke="#374151" strokeWidth="2"
                        className="cursor-pointer transition-colors"
                        onClick={() => setSelectedEducationLevel(selectedEducationLevel === 'mbo' ? null : 'mbo')}
                      />
                      <text x="130" y="275" textAnchor="middle" className="text-sm font-semibold fill-current">
                        MBO
                      </text>
                      <text x="130" y="295" textAnchor="middle" className="text-xs fill-current">
                        Vocational College
                      </text>
                      
                      <rect x="240" y="250" width="160" height="60" rx="10"
                        fill={selectedEducationLevel === 'hbo' ? '#06b6d4' : '#e5e7eb'}
                        stroke="#374151" strokeWidth="2"
                        className="cursor-pointer transition-colors"
                        onClick={() => setSelectedEducationLevel(selectedEducationLevel === 'hbo' ? null : 'hbo')}
                      />
                      <text x="320" y="275" textAnchor="middle" className="text-sm font-semibold fill-current">
                        HBO
                      </text>
                      <text x="320" y="295" textAnchor="middle" className="text-xs fill-current">
                        Applied Sciences
                      </text>
                      
                      <rect x="430" y="250" width="160" height="60" rx="10"
                        fill={selectedEducationLevel === 'wo' ? '#ec4899' : '#e5e7eb'}
                        stroke="#374151" strokeWidth="2"
                        className="cursor-pointer transition-colors"
                        onClick={() => setSelectedEducationLevel(selectedEducationLevel === 'wo' ? null : 'wo')}
                      />
                      <text x="510" y="275" textAnchor="middle" className="text-sm font-semibold fill-current">
                        WO
                      </text>
                      <text x="510" y="295" textAnchor="middle" className="text-xs fill-current">
                        University
                      </text>
                      
                      {/* Arrows to tertiary */}
                      <path d="M190 210 L130 240 M125 235 L130 240 L135 235" stroke="#374151" strokeWidth="2" fill="none"/>
                      <path d="M400 210 L320 240 M315 235 L320 240 L325 235" stroke="#374151" strokeWidth="2" fill="none"/>
                      <path d="M610 210 L510 240 M505 235 L510 240 L515 235" stroke="#374151" strokeWidth="2" fill="none"/>
                      
                      {/* Cross connections */}
                      <path d="M280 280 L240 280" stroke="#9ca3af" strokeWidth="1" strokeDasharray="5,5"/>
                      <path d="M400 280 L430 280" stroke="#9ca3af" strokeWidth="1" strokeDasharray="5,5"/>
                      
                      {/* Master's and PhD */}
                      <rect x="350" y="350" width="160" height="50" rx="10"
                        fill={selectedEducationLevel === 'master' ? '#7c3aed' : '#e5e7eb'}
                        stroke="#374151" strokeWidth="2"
                        className="cursor-pointer transition-colors"
                        onClick={() => setSelectedEducationLevel(selectedEducationLevel === 'master' ? null : 'master')}
                      />
                      <text x="430" y="375" textAnchor="middle" className="text-sm font-semibold fill-current">
                        Master's Degree
                      </text>
                      <text x="430" y="390" textAnchor="middle" className="text-xs fill-current">
                        (1-2 years)
                      </text>
                      
                      <rect x="350" y="430" width="160" height="50" rx="10"
                        fill={selectedEducationLevel === 'phd' ? '#dc2626' : '#e5e7eb'}
                        stroke="#374151" strokeWidth="2"
                        className="cursor-pointer transition-colors"
                        onClick={() => setSelectedEducationLevel(selectedEducationLevel === 'phd' ? null : 'phd')}
                      />
                      <text x="430" y="455" textAnchor="middle" className="text-sm font-semibold fill-current">
                        PhD
                      </text>
                      <text x="430" y="470" textAnchor="middle" className="text-xs fill-current">
                        (4 years)
                      </text>
                      
                      {/* Arrows to advanced degrees */}
                      <path d="M430 310 L430 340 M420 330 L430 340 L440 330" stroke="#374151" strokeWidth="2" fill="none"/>
                      <path d="M430 400 L430 420 M420 410 L430 420 L440 410" stroke="#374151" strokeWidth="2" fill="none"/>
                      
                      {/* Age indicators */}
                      <text x="50" y="30" className="text-xs fill-gray-600">Age: 4-12</text>
                      <text x="50" y="130" className="text-xs fill-gray-600">Age: 12-18</text>
                      <text x="50" y="230" className="text-xs fill-gray-600">Age: 16-22+</text>
                      <text x="50" y="330" className="text-xs fill-gray-600">Age: 22+</text>
                    </svg>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Click on education levels to see detailed information
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-gray-300 rounded"></div>
                        <span>Not selected</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                        <span>Selected</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 border border-gray-400 rounded bg-transparent"></div>
                        <span>Possible paths</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Information Panel */}
            <div className="space-y-6">
              {selectedEducationLevel === 'primary' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-700">Basisonderwijs (Primary Education)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Age Group: 4-12 years</h4>
                      <p className="text-sm text-muted-foreground">8 years of compulsory education</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Subjects Studied:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Dutch language</li>
                        <li>• Mathematics</li>
                        <li>• English (from age 10)</li>
                        <li>• History & Geography</li>
                        <li>• Science & Technology</li>
                        <li>• Arts & Crafts</li>
                        <li>• Physical Education</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Assessment:</h4>
                      <p className="text-sm">CITO test at the end determines secondary school recommendation</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Next Steps:</h4>
                      <p className="text-sm">Proceeds to VMBO, HAVO, or VWO based on ability and CITO results</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedEducationLevel === 'vmbo' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-green-700">VMBO (Preparatory Vocational Education)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Age Group: 12-16 years</h4>
                      <p className="text-sm text-muted-foreground">4 years, practical-oriented education</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Four Tracks:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Basis:</strong> Basic practical skills</li>
                        <li>• <strong>Kader:</strong> Mixed theoretical/practical</li>
                        <li>• <strong>Gemengd:</strong> Combined learning</li>
                        <li>• <strong>Theoretisch:</strong> More academic focus</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Subjects:</h4>
                      <p className="text-sm">Core subjects + sector-specific subjects (Technology, Care & Welfare, Economics, Agriculture)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Exams:</h4>
                      <p className="text-sm">School exams + national exams in Dutch, English, and sector subjects</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Career Paths:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Technician, Mechanic</li>
                        <li>• Healthcare Assistant</li>
                        <li>• Administrative Assistant</li>
                        <li>• Retail Specialist</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Next Steps:</h4>
                      <p className="text-sm">MBO (Vocational College) or work</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedEducationLevel === 'havo' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-orange-700">HAVO (Higher General Secondary Education)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Age Group: 12-17 years</h4>
                      <p className="text-sm text-muted-foreground">5 years, prepares for HBO</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Subjects:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Dutch, English, French/German</li>
                        <li>• Mathematics A or B</li>
                        <li>• History, Geography</li>
                        <li>• Physics, Chemistry, Biology</li>
                        <li>• Economics, Arts subjects</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Profiles:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Nature & Technology</strong></li>
                        <li>• <strong>Nature & Health</strong></li>
                        <li>• <strong>Economics & Society</strong></li>
                        <li>• <strong>Culture & Society</strong></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Exams:</h4>
                      <p className="text-sm">School exams (50%) + Central exams (50%)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Career Paths:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Teacher (Primary)</li>
                        <li>• Nurse, Physiotherapist</li>
                        <li>• Business Manager</li>
                        <li>• Social Worker</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Next Steps:</h4>
                      <p className="text-sm">HBO (University of Applied Sciences)</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedEducationLevel === 'vwo' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-700">VWO (Pre-University Education)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Age Group: 12-18 years</h4>
                      <p className="text-sm text-muted-foreground">6 years, highest secondary level</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Subjects:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Dutch, English, French/German</li>
                        <li>• Mathematics A, B, or C</li>
                        <li>• Latin/Greek (optional)</li>
                        <li>• Advanced Sciences</li>
                        <li>• Philosophy, Arts</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Profiles:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Nature & Technology</strong></li>
                        <li>• <strong>Nature & Health</strong></li>
                        <li>• <strong>Economics & Society</strong></li>
                        <li>• <strong>Culture & Society</strong></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Exams:</h4>
                      <p className="text-sm">School exams (50%) + Central exams (50%) + PWS (research project)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Career Paths:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Doctor, Lawyer</li>
                        <li>• Engineer, Scientist</li>
                        <li>• University Professor</li>
                        <li>• Government Official</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Next Steps:</h4>
                      <p className="text-sm">WO (Research University) or HBO</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedEducationLevel === 'mbo' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-red-700">MBO (Vocational Education)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Duration: 1-4 years</h4>
                      <p className="text-sm text-muted-foreground">Practical, job-oriented education</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Four Levels:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Level 1:</strong> Assistant level (1 year)</li>
                        <li>• <strong>Level 2:</strong> Basic vocational (2 years)</li>
                        <li>• <strong>Level 3:</strong> Independent professional (3 years)</li>
                        <li>• <strong>Level 4:</strong> Middle management (4 years)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Sectors:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Technology & Engineering</li>
                        <li>• Healthcare & Welfare</li>
                        <li>• Economics & Administration</li>
                        <li>• Agriculture & Environment</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Assessment:</h4>
                      <p className="text-sm">Competency-based assessment + workplace learning</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Career Examples:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Electrician, Plumber</li>
                        <li>• Dental Hygienist</li>
                        <li>• IT Specialist</li>
                        <li>• Chef, Baker</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedEducationLevel === 'hbo' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-cyan-700">HBO (University of Applied Sciences)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Duration: 4 years Bachelor's</h4>
                      <p className="text-sm text-muted-foreground">Practice-oriented higher education</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Fields of Study:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Engineering & Technology</li>
                        <li>• Business & Economics</li>
                        <li>• Healthcare</li>
                        <li>• Education</li>
                        <li>• Arts & Design</li>
                        <li>• Applied Sciences</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Assessment:</h4>
                      <p className="text-sm">Projects, internships, thesis, practical assignments</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Career Examples:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Software Developer</li>
                        <li>• Marketing Manager</li>
                        <li>• Primary School Teacher</li>
                        <li>• Physiotherapist</li>
                        <li>• Graphic Designer</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Next Steps:</h4>
                      <p className="text-sm">HBO Master's, WO Master's (with bridging), or work</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedEducationLevel === 'wo' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-pink-700">WO (Research University)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Duration: 3 years Bachelor's</h4>
                      <p className="text-sm text-muted-foreground">Academic, research-oriented education</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Fields of Study:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Medicine, Law</li>
                        <li>• Natural Sciences</li>
                        <li>• Social Sciences</li>
                        <li>• Humanities</li>
                        <li>• Economics</li>
                        <li>• Psychology</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Assessment:</h4>
                      <p className="text-sm">Exams, research papers, thesis, academic writing</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Career Examples:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Medical Doctor</li>
                        <li>• Lawyer, Judge</li>
                        <li>• Research Scientist</li>
                        <li>• Policy Advisor</li>
                        <li>• University Professor</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Next Steps:</h4>
                      <p className="text-sm">Master's degree (1-2 years), then PhD or work</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedEducationLevel === 'master' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-700">Master's Degree</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Duration: 1-2 years</h4>
                      <p className="text-sm text-muted-foreground">Specialized advanced education</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Types:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>WO Master:</strong> Research-oriented</li>
                        <li>• <strong>HBO Master:</strong> Professional-oriented</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Assessment:</h4>
                      <p className="text-sm">Advanced coursework, research thesis, internships</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Career Advancement:</h4>
                      <p className="text-sm">Senior positions, management roles, specialized expertise</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedEducationLevel === 'phd' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-red-700">PhD (Doctor of Philosophy)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Duration: 4 years</h4>
                      <p className="text-sm text-muted-foreground">Independent research leading to doctorate</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Original research</li>
                        <li>• Dissertation defense</li>
                        <li>• Teaching duties</li>
                        <li>• Publications</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Career Paths:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• University Professor</li>
                        <li>• Research Scientist</li>
                        <li>• Industry R&D Leader</li>
                        <li>• Policy Expert</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!selectedEducationLevel && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Select an Education Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Click on any education level in the diagram to see detailed information about:
                    </p>
                    <ul className="mt-4 space-y-2 text-sm">
                      <li>• Age groups and duration</li>
                      <li>• Subjects and curriculum</li>
                      <li>• Assessment methods</li>
                      <li>• Career opportunities</li>
                      <li>• Progression pathways</li>
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Body Parts Section */}
      <section id="body-parts-section" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('useful-categories')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2"
            >
              ← Back to Topics
            </Button>
          </div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Lichaamsdelen (Body Parts)
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn Dutch body parts with an interactive human body diagram.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Interactive Body Diagram */}
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl text-center mb-6">Interactive Body (Interactief Lichaam)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative mx-auto" style={{ width: '350px', height: '550px' }}>
                  {/* SVG Human Body */}
                  <svg viewBox="0 0 350 550" className="w-full h-full">
                    <defs>
                      <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fef3c7" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                      <linearGradient id="hoverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                    </defs>
                    
                    {/* Head */}
                    <ellipse 
                      cx="175" cy="70" rx="45" ry="55" 
                      fill={hoveredBodyPart === 'head' ? 'url(#hoverGradient)' : 'url(#skinGradient)'}
                      stroke="#92400e" strokeWidth="2"
                      className="cursor-pointer transition-all duration-300 hover:drop-shadow-lg"
                      onMouseEnter={() => setHoveredBodyPart('head')}
                      onMouseLeave={() => setHoveredBodyPart(null)}
                    />
                    
                    {/* Hair */}
                    <path d="M130 35 Q175 15 220 35 Q225 45 220 55 Q175 25 130 55 Q125 45 130 35" 
                      fill="#8b4513" stroke="#654321" strokeWidth="1"/>
                    
                    {/* Eyes */}
                    <g className={`cursor-pointer transition-all duration-300 ${hoveredBodyPart === 'eyes' ? 'drop-shadow-md' : ''}`}
                       onMouseEnter={() => setHoveredBodyPart('eyes')}
                       onMouseLeave={() => setHoveredBodyPart(null)}>
                      <ellipse cx="160" cy="60" rx="8" ry="5" fill="white" stroke="#374151" strokeWidth="1"/>
                      <ellipse cx="190" cy="60" rx="8" ry="5" fill="white" stroke="#374151" strokeWidth="1"/>
                      <circle cx="160" cy="60" r="4" fill={hoveredBodyPart === 'eyes' ? '#3b82f6' : '#1f2937'}/>
                      <circle cx="190" cy="60" r="4" fill={hoveredBodyPart === 'eyes' ? '#3b82f6' : '#1f2937'}/>
                      <circle cx="162" cy="58" r="1" fill="white"/>
                      <circle cx="192" cy="58" r="1" fill="white"/>
                    </g>
                    
                    {/* Nose */}
                    <path d="M175 70 L170 85 Q175 88 180 85 Z" 
                      fill={hoveredBodyPart === 'nose' ? '#fbbf24' : '#f59e0b'}
                      className="cursor-pointer transition-colors duration-300"
                      onMouseEnter={() => setHoveredBodyPart('nose')}
                      onMouseLeave={() => setHoveredBodyPart(null)}
                    />
                    
                    {/* Mouth */}
                    <ellipse cx="175" cy="95" rx="15" ry="8" 
                      fill={hoveredBodyPart === 'mouth' ? '#ef4444' : '#dc2626'}
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredBodyPart('mouth')}
                      onMouseLeave={() => setHoveredBodyPart(null)}
                    />
                    <ellipse cx="175" cy="93" rx="12" ry="4" fill="#7f1d1d"/>
                    
                    {/* Ears */}
                    <ellipse cx="125" cy="65" rx="12" ry="20" 
                      fill={hoveredBodyPart === 'ear' ? 'url(#hoverGradient)' : 'url(#skinGradient)'}
                      stroke="#92400e" strokeWidth="1"
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredBodyPart('ear')}
                      onMouseLeave={() => setHoveredBodyPart(null)}
                    />
                    <ellipse cx="225" cy="65" rx="12" ry="20" 
                      fill={hoveredBodyPart === 'ear' ? 'url(#hoverGradient)' : 'url(#skinGradient)'}
                      stroke="#92400e" strokeWidth="1"
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredBodyPart('ear')}
                      onMouseLeave={() => setHoveredBodyPart(null)}
                    />
                    
                    {/* Neck */}
                    <rect x="155" y="125" width="40" height="35" rx="20"
                      fill={hoveredBodyPart === 'neck' ? 'url(#hoverGradient)' : 'url(#skinGradient)'}
                      stroke="#92400e" strokeWidth="1"
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredBodyPart('neck')}
                      onMouseLeave={() => setHoveredBodyPart(null)}
                    />
                    
                    {/* Torso/Stomach */}
                    <ellipse cx="175" cy="220" rx="50" ry="80" 
                      fill={hoveredBodyPart === 'stomach' ? 'url(#hoverGradient)' : 'url(#skinGradient)'}
                      stroke="#92400e" strokeWidth="2"
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredBodyPart('stomach')}
                      onMouseLeave={() => setHoveredBodyPart(null)}
                    />
                    
                    {/* Back indicator */}
                    <ellipse cx="175" cy="220" rx="45" ry="75" 
                      fill="none" stroke={hoveredBodyPart === 'back' ? '#fbbf24' : '#9ca3af'} 
                      strokeWidth="2" strokeDasharray="8,4"
                      className="cursor-pointer transition-colors duration-300"
                      onMouseEnter={() => setHoveredBodyPart('back')}
                      onMouseLeave={() => setHoveredBodyPart(null)}
                    />
                    
                    {/* Left Arm - Upper */}
                    <ellipse cx="100" cy="180" rx="18" ry="45" 
                      fill={hoveredBodyPart === 'arm' ? 'url(#hoverGradient)' : 'url(#skinGradient)'}
                      stroke="#92400e" strokeWidth="1"
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredBodyPart('arm')}
                      onMouseLeave={() => setHoveredBodyPart(null)}
                    />
                    {/* Left Arm - Lower */}
                    <ellipse cx="85" cy="250" rx="15" ry="40" 
                      fill={hoveredBodyPart === 'arm' ? 'url(#hoverGradient)' : 'url(#skinGradient)'}
                      stroke="#92400e" strokeWidth="1"
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredBodyPart('arm')}
                      onMouseLeave={() => setHoveredBodyPart(null)}
                    />
                    
                    {/* Right Arm - Upper */}
                    <ellipse cx="250" cy="180" rx="18" ry="45" 
                      fill={hoveredBodyPart === 'arm' ? 'url(#hoverGradient)' : 'url(#skinGradient)'}
                      stroke="#92400e" strokeWidth="1"
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredBodyPart('arm')}
                      onMouseLeave={() => setHoveredBodyPart(null)}
                    />
                    {/* Right Arm - Lower */}
                    <ellipse cx="265" cy="250" rx="15" ry="40" 
                      fill={hoveredBodyPart === 'arm' ? 'url(#hoverGradient)' : 'url(#skinGradient)'}
                      stroke="#92400e" strokeWidth="1"
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredBodyPart('arm')}
                      onMouseLeave={() => setHoveredBodyPart(null)}
                    />
                    
                    {/* Left Hand */}
                    <circle cx="85" cy="295" r="18" 
                      fill={hoveredBodyPart === 'hand' ? 'url(#hoverGradient)' : 'url(#skinGradient)'}
                      stroke="#92400e" strokeWidth="1"
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredBodyPart('hand')}
                      onMouseLeave={() => setHoveredBodyPart(null)}
                    />
                    {/* Fingers */}
                    <rect x="75" y="285" width="3" height="12" rx="1" fill={hoveredBodyPart === 'hand' ? '#f59e0b' : '#d97706'}/>
                    <rect x="79" y="282" width="3" height="15" rx="1" fill={hoveredBodyPart === 'hand' ? '#f59e0b' : '#d97706'}/>
                    <rect x="83" y="283" width="3" height="14" rx="1" fill={hoveredBodyPart === 'hand' ? '#f59e0b' : '#d97706'}/>
                    <rect x="87" y="285" width="3" height="12" rx="1" fill={hoveredBodyPart === 'hand' ? '#f59e0b' : '#d97706'}/>
                    <rect x="91" y="287" width="3" height="10" rx="1" fill={hoveredBodyPart === 'hand' ? '#f59e0b' : '#d97706'}/>
                    
                    {/* Right Hand */}
                    <circle cx="265" cy="295" r="18" 
                      fill={hoveredBodyPart === 'hand' ? 'url(#hoverGradient)' : 'url(#skinGradient)'}
                      stroke="#92400e" strokeWidth="1"
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredBodyPart('hand')}
                      onMouseLeave={() => setHoveredBodyPart(null)}
                    />
                    {/* Fingers */}
                    <rect x="256" y="287" width="3" height="10" rx="1" fill={hoveredBodyPart === 'hand' ? '#f59e0b' : '#d97706'}/>
                    <rect x="260" y="285" width="3" height="12" rx="1" fill={hoveredBodyPart === 'hand' ? '#f59e0b' : '#d97706'}/>
                    <rect x="264" y="283" width="3" height="14" rx="1" fill={hoveredBodyPart === 'hand' ? '#f59e0b' : '#d97706'}/>
                    <rect x="268" y="282" width="3" height="15" rx="1" fill={hoveredBodyPart === 'hand' ? '#f59e0b' : '#d97706'}/>
                    <rect x="272" y="285" width="3" height="12" rx="1" fill={hoveredBodyPart === 'hand' ? '#f59e0b' : '#d97706'}/>
                    
                    {/* Left Leg - Thigh */}
                    <ellipse cx="155" cy="350" rx="22" ry="50" 
                      fill={hoveredBodyPart === 'leg' ? 'url(#hoverGradient)' : 'url(#skinGradient)'}
                      stroke="#92400e" strokeWidth="1"
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredBodyPart('leg')}
                      onMouseLeave={() => setHoveredBodyPart(null)}
                    />
                    {/* Left Leg - Calf */}
                    <ellipse cx="155" cy="440" rx="18" ry="45" 
                      fill={hoveredBodyPart === 'leg' ? 'url(#hoverGradient)' : 'url(#skinGradient)'}
                      stroke="#92400e" strokeWidth="1"
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredBodyPart('leg')}
                      onMouseLeave={() => setHoveredBodyPart(null)}
                    />
                    
                    {/* Right Leg - Thigh */}
                    <ellipse cx="195" cy="350" rx="22" ry="50" 
                      fill={hoveredBodyPart === 'leg' ? 'url(#hoverGradient)' : 'url(#skinGradient)'}
                      stroke="#92400e" strokeWidth="1"
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredBodyPart('leg')}
                      onMouseLeave={() => setHoveredBodyPart(null)}
                    />
                    {/* Right Leg - Calf */}
                    <ellipse cx="195" cy="440" rx="18" ry="45" 
                      fill={hoveredBodyPart === 'leg' ? 'url(#hoverGradient)' : 'url(#skinGradient)'}
                      stroke="#92400e" strokeWidth="1"
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredBodyPart('leg')}
                      onMouseLeave={() => setHoveredBodyPart(null)}
                    />
                    
                    {/* Left Knee */}
                    <circle cx="155" cy="400" r="12" 
                      fill={hoveredBodyPart === 'knee' ? '#fbbf24' : '#e5e7eb'}
                      stroke="#92400e" strokeWidth="1"
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredBodyPart('knee')}
                      onMouseLeave={() => setHoveredBodyPart(null)}
                    />
                    
                    {/* Right Knee */}
                    <circle cx="195" cy="400" r="12" 
                      fill={hoveredBodyPart === 'knee' ? '#fbbf24' : '#e5e7eb'}
                      stroke="#92400e" strokeWidth="1"
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredBodyPart('knee')}
                      onMouseLeave={() => setHoveredBodyPart(null)}
                    />
                    
                    {/* Left Foot */}
                    <ellipse cx="155" cy="500" rx="20" ry="30" 
                      fill={hoveredBodyPart === 'foot' ? 'url(#hoverGradient)' : 'url(#skinGradient)'}
                      stroke="#92400e" strokeWidth="1"
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredBodyPart('foot')}
                      onMouseLeave={() => setHoveredBodyPart(null)}
                    />
                    {/* Toes */}
                    <ellipse cx="155" cy="485" rx="15" ry="8" fill={hoveredBodyPart === 'foot' ? '#f59e0b' : '#d97706'}/>
                    
                    {/* Right Foot */}
                    <ellipse cx="195" cy="500" rx="20" ry="30" 
                      fill={hoveredBodyPart === 'foot' ? 'url(#hoverGradient)' : 'url(#skinGradient)'}
                      stroke="#92400e" strokeWidth="1"
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredBodyPart('foot')}
                      onMouseLeave={() => setHoveredBodyPart(null)}
                    />
                    {/* Toes */}
                    <ellipse cx="195" cy="485" rx="15" ry="8" fill={hoveredBodyPart === 'foot' ? '#f59e0b' : '#d97706'}/>
                  </svg>
                  
                  {/* Hover Information */}
                  {hoveredBodyPart && (
                    <div className="absolute top-4 right-4 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-4 rounded-xl shadow-xl z-10 border border-primary/20 backdrop-blur-sm">
                      <div className="font-bold text-xl mb-1">
                        {hoveredBodyPart === 'head' && 'het hoofd'}
                        {hoveredBodyPart === 'eyes' && 'de ogen'}
                        {hoveredBodyPart === 'nose' && 'de neus'}
                        {hoveredBodyPart === 'mouth' && 'de mond'}
                        {hoveredBodyPart === 'ear' && 'het oor'}
                        {hoveredBodyPart === 'neck' && 'de hals'}
                        {hoveredBodyPart === 'arm' && 'de arm'}
                        {hoveredBodyPart === 'hand' && 'de hand'}
                        {hoveredBodyPart === 'stomach' && 'de buik'}
                        {hoveredBodyPart === 'back' && 'de rug'}
                        {hoveredBodyPart === 'leg' && 'het been'}
                        {hoveredBodyPart === 'knee' && 'de knie'}
                        {hoveredBodyPart === 'foot' && 'de voet'}
                      </div>
                      <div className="text-sm opacity-90 mb-2">
                        {hoveredBodyPart === 'head' && 'the head'}
                        {hoveredBodyPart === 'eyes' && 'the eyes'}
                        {hoveredBodyPart === 'nose' && 'the nose'}
                        {hoveredBodyPart === 'mouth' && 'the mouth'}
                        {hoveredBodyPart === 'ear' && 'the ear'}
                        {hoveredBodyPart === 'neck' && 'the neck'}
                        {hoveredBodyPart === 'arm' && 'the arm'}
                        {hoveredBodyPart === 'hand' && 'the hand'}
                        {hoveredBodyPart === 'stomach' && 'the stomach'}
                        {hoveredBodyPart === 'back' && 'the back'}
                        {hoveredBodyPart === 'leg' && 'the leg'}
                        {hoveredBodyPart === 'knee' && 'the knee'}
                        {hoveredBodyPart === 'foot' && 'the foot'}
                      </div>
                      <div className="text-xs bg-white/20 px-2 py-1 rounded">
                        {(hoveredBodyPart === 'head' || hoveredBodyPart === 'ear' || hoveredBodyPart === 'leg') && 'het-word'}
                        {(hoveredBodyPart === 'eyes' || hoveredBodyPart === 'nose' || hoveredBodyPart === 'mouth' || 
                          hoveredBodyPart === 'neck' || hoveredBodyPart === 'arm' || hoveredBodyPart === 'hand' || 
                          hoveredBodyPart === 'stomach' || hoveredBodyPart === 'back' || hoveredBodyPart === 'knee' || 
                          hoveredBodyPart === 'foot') && 'de-word'}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="text-center mt-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    Hover over body parts to see Dutch translations
                  </p>
                  <div className="flex justify-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-200 to-yellow-500"></div>
                      <span>Normal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                      <span>Hovered</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Body Parts Vocabulary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Body Parts Vocabulary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {[
                      { dutch: 'het lichaamsdeel', english: 'the body part' },
                      { dutch: 'het lichaam', english: 'the body' },
                      { dutch: 'het hoofd', english: 'the head' },
                      { dutch: 'het gezicht', english: 'the face' },
                      { dutch: 'de ogen', english: 'the eyes' },
                      { dutch: 'de neus', english: 'the nose' },
                      { dutch: 'de mond', english: 'the mouth' },
                      { dutch: 'het oor', english: 'the ear' },
                      { dutch: 'de tand', english: 'the tooth' },
                      { dutch: 'de hals', english: 'the neck' },
                      { dutch: 'de arm', english: 'the arm' },
                      { dutch: 'de hand', english: 'the hand' },
                      { dutch: 'de buik', english: 'the stomach' },
                      { dutch: 'de rug', english: 'the back' },
                      { dutch: 'het been', english: 'the leg' },
                      { dutch: 'de knie', english: 'the knee' },
                      { dutch: 'de voet', english: 'the foot' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <span className="font-semibold text-primary">{item.dutch}</span>
                        <span className="text-muted-foreground">{item.english}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Example Sentences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
                      <p className="font-semibold text-red-800 dark:text-red-200 mb-2">Ik heb hoofdpijn.</p>
                      <p className="text-red-600 dark:text-red-400 text-sm">I have a headache.</p>
                    </div>
                    
                    <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                      <p className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Hij heeft zijn been gebroken.</p>
                      <p className="text-orange-600 dark:text-orange-400 text-sm">He broke his leg.</p>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <p className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Ik ben misselijk en heb maagpijn.</p>
                      <p className="text-yellow-600 dark:text-yellow-400 text-sm">I feel sick and my stomach hurts.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Grammar Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Articles (De/Het)</h4>
                      <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                        <p><strong>De words:</strong> de arm, de hand, de voet, de ogen, de mond, de neus, de hals, de rug, de buik, de knie, de tand</p>
                        <p><strong>Het words:</strong> het hoofd, het gezicht, het oor, het been, het lichaam, het lichaamsdeel</p>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Expressing Pain</h4>
                      <div className="text-sm text-green-700 dark:text-green-300 space-y-1">
                        <p><strong>Pattern:</strong> Ik heb + [body part] + pijn</p>
                        <p><strong>Examples:</strong> hoofdpijn (headache), buikpijn (stomach ache), rugpijn (back pain)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Family Relations Section */}
      <section id="family-relations-section" className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('useful-categories')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2"
            >
              ← Back to Topics
            </Button>
          </div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Familierelaties (Family Relations)
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn Dutch family vocabulary with an interactive family tree structure.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Interactive Family Tree */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-2xl text-center mb-6">Interactive Family Tree (Stamboom)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative" style={{ height: '600px' }}>
                  <svg viewBox="0 0 800 600" className="w-full h-full">
                    {/* Grandparents Generation */}
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredBodyPart('grootvader')} onMouseLeave={() => setHoveredBodyPart(null)}>
                      <rect x="150" y="50" width="120" height="60" rx="10" fill={hoveredBodyPart === 'grootvader' ? '#3b82f6' : '#e5e7eb'} stroke="#374151" strokeWidth="2"/>
                      <text x="210" y="75" textAnchor="middle" className="text-sm font-semibold fill-current">De grootvader</text>
                      <text x="210" y="95" textAnchor="middle" className="text-xs fill-current">Grandfather</text>
                    </g>
                    
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredBodyPart('grootmoeder')} onMouseLeave={() => setHoveredBodyPart(null)}>
                      <rect x="300" y="50" width="120" height="60" rx="10" fill={hoveredBodyPart === 'grootmoeder' ? '#ec4899' : '#e5e7eb'} stroke="#374151" strokeWidth="2"/>
                      <text x="360" y="75" textAnchor="middle" className="text-sm font-semibold fill-current">De grootmoeder</text>
                      <text x="360" y="95" textAnchor="middle" className="text-xs fill-current">Grandmother</text>
                    </g>
                    
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredBodyPart('opa')} onMouseLeave={() => setHoveredBodyPart(null)}>
                      <rect x="450" y="50" width="120" height="60" rx="10" fill={hoveredBodyPart === 'opa' ? '#3b82f6' : '#e5e7eb'} stroke="#374151" strokeWidth="2"/>
                      <text x="510" y="75" textAnchor="middle" className="text-sm font-semibold fill-current">De opa</text>
                      <text x="510" y="95" textAnchor="middle" className="text-xs fill-current">Grandpa</text>
                    </g>
                    
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredBodyPart('oma')} onMouseLeave={() => setHoveredBodyPart(null)}>
                      <rect x="600" y="50" width="120" height="60" rx="10" fill={hoveredBodyPart === 'oma' ? '#ec4899' : '#e5e7eb'} stroke="#374151" strokeWidth="2"/>
                      <text x="660" y="75" textAnchor="middle" className="text-sm font-semibold fill-current">De oma</text>
                      <text x="660" y="95" textAnchor="middle" className="text-xs fill-current">Grandma</text>
                    </g>
                    
                    {/* Connection lines from grandparents to parents */}
                    <path d="M285 110 L285 140 L375 140 L375 170" stroke="#374151" strokeWidth="2" fill="none"/>
                    <path d="M585 110 L585 140 L425 140 L425 170" stroke="#374151" strokeWidth="2" fill="none"/>
                    
                    {/* Parents Generation */}
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredBodyPart('vader')} onMouseLeave={() => setHoveredBodyPart(null)}>
                      <rect x="300" y="170" width="120" height="60" rx="10" fill={hoveredBodyPart === 'vader' ? '#3b82f6' : '#e5e7eb'} stroke="#374151" strokeWidth="2"/>
                      <text x="360" y="195" textAnchor="middle" className="text-sm font-semibold fill-current">De vader</text>
                      <text x="360" y="215" textAnchor="middle" className="text-xs fill-current">Father</text>
                    </g>
                    
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredBodyPart('moeder')} onMouseLeave={() => setHoveredBodyPart(null)}>
                      <rect x="450" y="170" width="120" height="60" rx="10" fill={hoveredBodyPart === 'moeder' ? '#ec4899' : '#e5e7eb'} stroke="#374151" strokeWidth="2"/>
                      <text x="510" y="195" textAnchor="middle" className="text-sm font-semibold fill-current">De moeder</text>
                      <text x="510" y="215" textAnchor="middle" className="text-xs fill-current">Mother</text>
                    </g>
                    
                    {/* Marriage line */}
                    <path d="M420 200 L450 200" stroke="#374151" strokeWidth="3" fill="none"/>
                    
                    {/* Connection line to children */}
                    <path d="M435 230 L435 260 L400 260 L400 290" stroke="#374151" strokeWidth="2" fill="none"/>
                    <path d="M435 260 L470 260 L470 290" stroke="#374151" strokeWidth="2" fill="none"/>
                    <path d="M435 260 L435 290" stroke="#374151" strokeWidth="2" fill="none"/>
                    
                    {/* Children Generation */}
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredBodyPart('zoon')} onMouseLeave={() => setHoveredBodyPart(null)}>
                      <rect x="340" y="290" width="120" height="60" rx="10" fill={hoveredBodyPart === 'zoon' ? '#3b82f6' : '#e5e7eb'} stroke="#374151" strokeWidth="2"/>
                      <text x="400" y="315" textAnchor="middle" className="text-sm font-semibold fill-current">De zoon</text>
                      <text x="400" y="335" textAnchor="middle" className="text-xs fill-current">Son</text>
                    </g>
                    
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredBodyPart('dochter')} onMouseLeave={() => setHoveredBodyPart(null)}>
                      <rect x="480" y="290" width="120" height="60" rx="10" fill={hoveredBodyPart === 'dochter' ? '#ec4899' : '#e5e7eb'} stroke="#374151" strokeWidth="2"/>
                      <text x="540" y="315" textAnchor="middle" className="text-sm font-semibold fill-current">De dochter</text>
                      <text x="540" y="335" textAnchor="middle" className="text-xs fill-current">Daughter</text>
                    </g>
                    
                    {/* Extended Family */}
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredBodyPart('oom')} onMouseLeave={() => setHoveredBodyPart(null)}>
                      <rect x="50" y="170" width="120" height="60" rx="10" fill={hoveredBodyPart === 'oom' ? '#10b981' : '#e5e7eb'} stroke="#374151" strokeWidth="2"/>
                      <text x="110" y="195" textAnchor="middle" className="text-sm font-semibold fill-current">De oom</text>
                      <text x="110" y="215" textAnchor="middle" className="text-xs fill-current">Uncle</text>
                    </g>
                    
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredBodyPart('tante')} onMouseLeave={() => setHoveredBodyPart(null)}>
                      <rect x="620" y="170" width="120" height="60" rx="10" fill={hoveredBodyPart === 'tante' ? '#f59e0b' : '#e5e7eb'} stroke="#374151" strokeWidth="2"/>
                      <text x="680" y="195" textAnchor="middle" className="text-sm font-semibold fill-current">De tante</text>
                      <text x="680" y="215" textAnchor="middle" className="text-xs fill-current">Aunt</text>
                    </g>
                    
                    {/* Cousins */}
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredBodyPart('neef')} onMouseLeave={() => setHoveredBodyPart(null)}>
                      <rect x="50" y="290" width="120" height="60" rx="10" fill={hoveredBodyPart === 'neef' ? '#10b981' : '#e5e7eb'} stroke="#374151" strokeWidth="2"/>
                      <text x="110" y="315" textAnchor="middle" className="text-sm font-semibold fill-current">De neef</text>
                      <text x="110" y="335" textAnchor="middle" className="text-xs fill-current">Nephew/Cousin</text>
                    </g>
                    
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredBodyPart('nicht')} onMouseLeave={() => setHoveredBodyPart(null)}>
                      <rect x="620" y="290" width="120" height="60" rx="10" fill={hoveredBodyPart === 'nicht' ? '#f59e0b' : '#e5e7eb'} stroke="#374151" strokeWidth="2"/>
                      <text x="680" y="315" textAnchor="middle" className="text-sm font-semibold fill-current">De nicht</text>
                      <text x="680" y="335" textAnchor="middle" className="text-xs fill-current">Niece/Cousin</text>
                    </g>
                    
                    {/* Connection lines for extended family */}
                    <path d="M110 230 L110 260 L110 290" stroke="#374151" strokeWidth="2" fill="none"/>
                    <path d="M680 230 L680 260 L680 290" stroke="#374151" strokeWidth="2" fill="none"/>
                    
                    {/* Siblings */}
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredBodyPart('broer')} onMouseLeave={() => setHoveredBodyPart(null)}>
                      <rect x="200" y="290" width="120" height="60" rx="10" fill={hoveredBodyPart === 'broer' ? '#8b5cf6' : '#e5e7eb'} stroke="#374151" strokeWidth="2"/>
                      <text x="260" y="315" textAnchor="middle" className="text-sm font-semibold fill-current">De broer</text>
                      <text x="260" y="335" textAnchor="middle" className="text-xs fill-current">Brother</text>
                    </g>
                    
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredBodyPart('zus')} onMouseLeave={() => setHoveredBodyPart(null)}>
                      <rect x="620" y="410" width="120" height="60" rx="10" fill={hoveredBodyPart === 'zus' ? '#ec4899' : '#e5e7eb'} stroke="#374151" strokeWidth="2"/>
                      <text x="680" y="435" textAnchor="middle" className="text-sm font-semibold fill-current">De zus</text>
                      <text x="680" y="455" textAnchor="middle" className="text-xs fill-current">Sister</text>
                    </g>
                    
                    {/* Connection for siblings */}
                    <path d="M320 320 L260 320 L260 290" stroke="#374151" strokeWidth="2" fill="none"/>
                    <path d="M540 350 L540 380 L680 380 L680 410" stroke="#374151" strokeWidth="2" fill="none"/>
                    
                    {/* In-laws */}
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredBodyPart('schoonvader')} onMouseLeave={() => setHoveredBodyPart(null)}>
                      <rect x="50" y="410" width="120" height="60" rx="10" fill={hoveredBodyPart === 'schoonvader' ? '#dc2626' : '#e5e7eb'} stroke="#374151" strokeWidth="2"/>
                      <text x="110" y="435" textAnchor="middle" className="text-sm font-semibold fill-current">Schoonvader</text>
                      <text x="110" y="455" textAnchor="middle" className="text-xs fill-current">Father-in-law</text>
                    </g>
                    
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredBodyPart('schoonmoeder')} onMouseLeave={() => setHoveredBodyPart(null)}>
                      <rect x="200" y="410" width="120" height="60" rx="10" fill={hoveredBodyPart === 'schoonmoeder' ? '#dc2626' : '#e5e7eb'} stroke="#374151" strokeWidth="2"/>
                      <text x="260" y="435" textAnchor="middle" className="text-sm font-semibold fill-current">Schoonmoeder</text>
                      <text x="260" y="455" textAnchor="middle" className="text-xs fill-current">Mother-in-law</text>
                    </g>
                    
                    {/* Generation labels */}
                    <text x="20" y="80" className="text-xs fill-gray-600 font-semibold">Grandparents</text>
                    <text x="20" y="200" className="text-xs fill-gray-600 font-semibold">Parents</text>
                    <text x="20" y="320" className="text-xs fill-gray-600 font-semibold">Children</text>
                    <text x="20" y="440" className="text-xs fill-gray-600 font-semibold">In-laws</text>
                  </svg>
                  
                  {/* Hover Information */}
                  {hoveredBodyPart && (
                    <div className="absolute top-4 right-4 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-4 rounded-xl shadow-xl z-10 border border-primary/20 backdrop-blur-sm">
                      <div className="font-bold text-xl mb-1">
                        {hoveredBodyPart === 'grootvader' && 'de grootvader'}
                        {hoveredBodyPart === 'grootmoeder' && 'de grootmoeder'}
                        {hoveredBodyPart === 'opa' && 'de opa'}
                        {hoveredBodyPart === 'oma' && 'de oma'}
                        {hoveredBodyPart === 'vader' && 'de vader'}
                        {hoveredBodyPart === 'moeder' && 'de moeder'}
                        {hoveredBodyPart === 'zoon' && 'de zoon'}
                        {hoveredBodyPart === 'dochter' && 'de dochter'}
                        {hoveredBodyPart === 'broer' && 'de broer'}
                        {hoveredBodyPart === 'zus' && 'de zus'}
                        {hoveredBodyPart === 'oom' && 'de oom'}
                        {hoveredBodyPart === 'tante' && 'de tante'}
                        {hoveredBodyPart === 'neef' && 'de neef'}
                        {hoveredBodyPart === 'nicht' && 'de nicht'}
                        {hoveredBodyPart === 'schoonvader' && 'de schoonvader'}
                        {hoveredBodyPart === 'schoonmoeder' && 'de schoonmoeder'}
                      </div>
                      <div className="text-sm opacity-90 mb-2">
                        {hoveredBodyPart === 'grootvader' && 'grandfather'}
                        {hoveredBodyPart === 'grootmoeder' && 'grandmother'}
                        {hoveredBodyPart === 'opa' && 'grandpa'}
                        {hoveredBodyPart === 'oma' && 'grandma'}
                        {hoveredBodyPart === 'vader' && 'father'}
                        {hoveredBodyPart === 'moeder' && 'mother'}
                        {hoveredBodyPart === 'zoon' && 'son'}
                        {hoveredBodyPart === 'dochter' && 'daughter'}
                        {hoveredBodyPart === 'broer' && 'brother'}
                        {hoveredBodyPart === 'zus' && 'sister'}
                        {hoveredBodyPart === 'oom' && 'uncle'}
                        {hoveredBodyPart === 'tante' && 'aunt'}
                        {hoveredBodyPart === 'neef' && 'nephew/cousin (m)'}
                        {hoveredBodyPart === 'nicht' && 'niece/cousin (f)'}
                        {hoveredBodyPart === 'schoonvader' && 'father-in-law'}
                        {hoveredBodyPart === 'schoonmoeder' && 'mother-in-law'}
                      </div>
                      <div className="text-xs bg-white/20 px-2 py-1 rounded">
                        de-word
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="text-center mt-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Hover over family members to see Dutch translations
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span>Male</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-pink-500 rounded"></div>
                      <span>Female</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span>Extended Family</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Family Vocabulary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Core Family (Kernfamilie)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {[
                      { dutch: 'de familie', english: 'the family' },
                      { dutch: 'de ouders', english: 'the parents' },
                      { dutch: 'de vader', english: 'the father' },
                      { dutch: 'de moeder', english: 'the mother' },
                      { dutch: 'de kinderen', english: 'the children' },
                      { dutch: 'de zoon', english: 'the son' },
                      { dutch: 'de dochter', english: 'the daughter' },
                      { dutch: 'de broer', english: 'the brother' },
                      { dutch: 'de zus', english: 'the sister' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <span className="font-semibold text-primary">{item.dutch}</span>
                        <span className="text-muted-foreground">{item.english}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Extended Family (Uitgebreide Familie)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {[
                      { dutch: 'de grootouders', english: 'the grandparents' },
                      { dutch: 'de grootvader', english: 'the grandfather' },
                      { dutch: 'de grootmoeder', english: 'the grandmother' },
                      { dutch: 'de opa', english: 'the grandpa' },
                      { dutch: 'de oma', english: 'the grandma' },
                      { dutch: 'de oom', english: 'the uncle' },
                      { dutch: 'de tante', english: 'the aunt' },
                      { dutch: 'de neef', english: 'the nephew/cousin (m)' },
                      { dutch: 'de nicht', english: 'the niece/cousin (f)' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <span className="font-semibold text-secondary">{item.dutch}</span>
                        <span className="text-muted-foreground">{item.english}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">In-Laws (Schoonfamilie)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {[
                      { dutch: 'de schoonfamilie', english: 'the in-laws' },
                      { dutch: 'de schoonvader', english: 'the father-in-law' },
                      { dutch: 'de schoonmoeder', english: 'the mother-in-law' },
                      { dutch: 'de schoonzoon', english: 'the son-in-law' },
                      { dutch: 'de schoondochter', english: 'the daughter-in-law' },
                      { dutch: 'de zwager', english: 'the brother-in-law' },
                      { dutch: 'de schoonzus', english: 'the sister-in-law' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <span className="font-semibold text-accent">{item.dutch}</span>
                        <span className="text-muted-foreground">{item.english}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Example Sentences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Mijn familie is groot.</p>
                      <p className="text-blue-600 dark:text-blue-400 text-sm">My family is big.</p>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <p className="font-semibold text-green-800 dark:text-green-200 mb-2">Ik heb twee broers en één zus.</p>
                      <p className="text-green-600 dark:text-green-400 text-sm">I have two brothers and one sister.</p>
                    </div>
                    
                    <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                      <p className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Mijn opa en oma wonen in Amsterdam.</p>
                      <p className="text-purple-600 dark:text-purple-400 text-sm">My grandpa and grandma live in Amsterdam.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section id="numbers-section" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('useful-categories')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2"
            >
              ← Back to Topics
            </Button>
          </div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nederlandse Getallen (Dutch Numbers)
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn Dutch numbers from 0 to millions with interactive examples and pronunciation.
            </p>
          </div>

          {/* Basic Numbers 0-20 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Hash className="w-6 h-6" />
                Basic Numbers (0-20)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
                {[
                  { num: 0, dutch: 'nul', english: 'zero' },
                  { num: 1, dutch: 'een', english: 'one' },
                  { num: 2, dutch: 'twee', english: 'two' },
                  { num: 3, dutch: 'drie', english: 'three' },
                  { num: 4, dutch: 'vier', english: 'four' },
                  { num: 5, dutch: 'vijf', english: 'five' },
                  { num: 6, dutch: 'zes', english: 'six' },
                  { num: 7, dutch: 'zeven', english: 'seven' },
                  { num: 8, dutch: 'acht', english: 'eight' },
                  { num: 9, dutch: 'negen', english: 'nine' },
                  { num: 10, dutch: 'tien', english: 'ten' },
                  { num: 11, dutch: 'elf', english: 'eleven' },
                  { num: 12, dutch: 'twaalf', english: 'twelve' },
                  { num: 13, dutch: 'dertien', english: 'thirteen' },
                  { num: 14, dutch: 'veertien', english: 'fourteen' },
                  { num: 15, dutch: 'vijftien', english: 'fifteen' },
                  { num: 16, dutch: 'zestien', english: 'sixteen' },
                  { num: 17, dutch: 'zeventien', english: 'seventeen' },
                  { num: 18, dutch: 'achttien', english: 'eighteen' },
                  { num: 19, dutch: 'negentien', english: 'nineteen' },
                  { num: 20, dutch: 'twintig', english: 'twenty' }
                ].map((item) => (
                  <Card 
                    key={item.num}
                    className={`cursor-pointer transition-all hover:shadow-md text-center ${
                      selectedNumber === item.num ? 'ring-2 ring-indigo-500 bg-indigo-50 dark:bg-indigo-950' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedNumber(selectedNumber === item.num ? null : item.num)}
                  >
                    <CardContent className="p-4">
                      <div className="text-3xl font-bold mb-2 text-indigo-600">{item.num}</div>
                      <div className="font-semibold text-lg">{item.dutch}</div>
                      <div className="text-sm text-muted-foreground">{item.english}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tens */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Tens (Tientallen)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {[
                  { num: 30, dutch: 'dertig', english: 'thirty' },
                  { num: 40, dutch: 'veertig', english: 'forty' },
                  { num: 50, dutch: 'vijftig', english: 'fifty' },
                  { num: 60, dutch: 'zestig', english: 'sixty' },
                  { num: 70, dutch: 'zeventig', english: 'seventy' },
                  { num: 80, dutch: 'tachtig', english: 'eighty' },
                  { num: 90, dutch: 'negentig', english: 'ninety' }
                ].map((item) => (
                  <Card 
                    key={item.num}
                    className={`cursor-pointer transition-all hover:shadow-md text-center ${
                      selectedNumber === item.num ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-950' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedNumber(selectedNumber === item.num ? null : item.num)}
                  >
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold mb-2 text-green-600">{item.num}</div>
                      <div className="font-semibold text-lg">{item.dutch}</div>
                      <div className="text-sm text-muted-foreground">{item.english}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Number Formation Rules */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Number Formation Rules (Getalvorming)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-4 text-blue-800 dark:text-blue-200">21-99: Ones + en + Tens</h3>
                    <div className="space-y-3">
                      <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                        <p className="font-semibold mb-1">21 = eenën­twintig</p>
                        <p className="text-sm text-muted-foreground">one + and + twenty</p>
                      </div>
                      <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                        <p className="font-semibold mb-1">35 = vijfën­dertig</p>
                        <p className="text-sm text-muted-foreground">five + and + thirty</p>
                      </div>
                      <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                        <p className="font-semibold mb-1">67 = zevenën­zestig</p>
                        <p className="text-sm text-muted-foreground">seven + and + sixty</p>
                      </div>
                      <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                        <p className="font-semibold mb-1">99 = negenën­negentig</p>
                        <p className="text-sm text-muted-foreground">nine + and + ninety</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-4 text-purple-800 dark:text-purple-200">Interactive Number Builder</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <select className="border rounded p-2 bg-background" onChange={(e) => {
                          const ones = parseInt(e.target.value);
                          const tens = Math.floor((selectedNumber || 20) / 10) * 10;
                          if (tens >= 20) setSelectedNumber(ones + tens);
                        }}>
                          <option value="1">een</option>
                          <option value="2">twee</option>
                          <option value="3">drie</option>
                          <option value="4">vier</option>
                          <option value="5">vijf</option>
                          <option value="6">zes</option>
                          <option value="7">zeven</option>
                          <option value="8">acht</option>
                          <option value="9">negen</option>
                        </select>
                        <span className="font-semibold">en</span>
                        <select className="border rounded p-2 bg-background" onChange={(e) => {
                          const tens = parseInt(e.target.value);
                          const ones = (selectedNumber || 21) % 10 || 1;
                          setSelectedNumber(ones + tens);
                        }}>
                          <option value="20">twintig</option>
                          <option value="30">dertig</option>
                          <option value="40">veertig</option>
                          <option value="50">vijftig</option>
                          <option value="60">zestig</option>
                          <option value="70">zeventig</option>
                          <option value="80">tachtig</option>
                          <option value="90">negentig</option>
                        </select>
                      </div>
                      
                      {selectedNumber && selectedNumber > 20 && selectedNumber < 100 && (
                        <div className="bg-white/70 dark:bg-black/30 p-4 rounded text-center">
                          <div className="text-2xl font-bold text-purple-600 mb-2">{selectedNumber}</div>
                          <div className="font-semibold text-lg">
                            {(() => {
                              const ones = selectedNumber % 10;
                              const tens = Math.floor(selectedNumber / 10) * 10;
                              const onesNames = ['', 'een', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen'];
                              const tensNames = {20: 'twintig', 30: 'dertig', 40: 'veertig', 50: 'vijftig', 60: 'zestig', 70: 'zeventig', 80: 'tachtig', 90: 'negentig'};
                              return ones === 0 ? tensNames[tens] : `${onesNames[ones]}en${tensNames[tens]}`;
                            })()} 
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Large Numbers */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Large Numbers (Grote Getallen)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold mb-2 text-red-600">100</div>
                    <h3 className="font-bold text-lg mb-2 text-red-800 dark:text-red-200">honderd</h3>
                    <p className="text-red-600 dark:text-red-400 mb-2">hundred</p>
                    <div className="space-y-1 text-sm">
                      <p><strong>101:</strong> honderdéén</p>
                      <p><strong>150:</strong> honderdvijftig</p>
                      <p><strong>200:</strong> tweehonderd</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold mb-2 text-orange-600">1.000</div>
                    <h3 className="font-bold text-lg mb-2 text-orange-800 dark:text-orange-200">duizend</h3>
                    <p className="text-orange-600 dark:text-orange-400 mb-2">thousand</p>
                    <div className="space-y-1 text-sm">
                      <p><strong>1.001:</strong> duizendéén</p>
                      <p><strong>2.500:</strong> tweeduizendvijfhonderd</p>
                      <p><strong>10.000:</strong> tienduizend</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold mb-2 text-yellow-600">1.000.000</div>
                    <h3 className="font-bold text-lg mb-2 text-yellow-800 dark:text-yellow-200">miljoen</h3>
                    <p className="text-yellow-600 dark:text-yellow-400 mb-2">million</p>
                    <div className="space-y-1 text-sm">
                      <p><strong>1.5M:</strong> anderhalf miljoen</p>
                      <p><strong>2M:</strong> twee miljoen</p>
                      <p><strong>10M:</strong> tien miljoen</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold mb-2 text-green-600">1.000.000.000</div>
                    <h3 className="font-bold text-lg mb-2 text-green-800 dark:text-green-200">miljard</h3>
                    <p className="text-green-600 dark:text-green-400 mb-2">billion</p>
                    <div className="space-y-1 text-sm">
                      <p><strong>1.5B:</strong> anderhalf miljard</p>
                      <p><strong>2B:</strong> twee miljard</p>
                      <p><strong>100B:</strong> honderd miljard</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Practical Examples */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Practical Examples (Praktische Voorbeelden)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-lg mb-4">Prices & Money (Prijzen & Geld)</h3>
                  <div className="space-y-3">
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                      <p className="font-semibold mb-1">€2,50 = twee euro vijftig</p>
                      <p className="text-sm text-muted-foreground">Two euros fifty</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                      <p className="font-semibold mb-1">€15,99 = vijftien euro negenennegentig</p>
                      <p className="text-sm text-muted-foreground">Fifteen euros ninety-nine</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                      <p className="font-semibold mb-1">€125 = honderdvijfentwintig euro</p>
                      <p className="text-sm text-muted-foreground">One hundred twenty-five euros</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-bold text-lg mb-4">Time & Dates (Tijd & Data)</h3>
                  <div className="space-y-3">
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                      <p className="font-semibold mb-1">14:30 = veertien dertig / half drie</p>
                      <p className="text-sm text-muted-foreground">Two thirty PM / Half past two</p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                      <p className="font-semibold mb-1">2024 = tweeduizendvierentwintig</p>
                      <p className="text-sm text-muted-foreground">Two thousand twenty-four</p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                      <p className="font-semibold mb-1">25/12 = vijfentwintig december</p>
                      <p className="text-sm text-muted-foreground">Twenty-fifth of December</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Number Quiz */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Number Challenge (Getal Uitdaging)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                <p className="text-lg mb-6">Click on numbers above to practice, or try these challenges:</p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                    <CardContent className="p-6 text-center">
                      <h4 className="font-bold text-lg mb-4">Random Number</h4>
                      <Button 
                        onClick={() => {
                          const randomNum = Math.floor(Math.random() * 100) + 1;
                          setSelectedNumber(randomNum);
                        }}
                        className="w-full mb-4"
                      >
                        Generate Random (1-100)
                      </Button>
                      {selectedNumber && (
                        <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                          <div className="text-2xl font-bold text-purple-600">{selectedNumber}</div>
                          <p className="text-sm text-muted-foreground mt-2">Try to say this in Dutch!</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
                    <CardContent className="p-6 text-center">
                      <h4 className="font-bold text-lg mb-4">Pattern Practice</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Count by 10s:</strong> tien, twintig, dertig...</p>
                        <p><strong>Count by 5s:</strong> vijf, tien, vijftien...</p>
                        <p><strong>Teens:</strong> dertien, veertien, vijftien...</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
                    <CardContent className="p-6 text-center">
                      <h4 className="font-bold text-lg mb-4">Memory Tips</h4>
                      <div className="space-y-2 text-sm text-left">
                        <p>• <strong>elf</strong> & <strong>twaalf</strong> are irregular</p>
                        <p>• <strong>-tien</strong> ending for 13-19</p>
                        <p>• <strong>-tig</strong> ending for 30, 40, 50...</p>
                        <p>• Always <strong>ones + en + tens</strong></p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Directions Section */}
      <section id="directions-section" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('useful-categories')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2"
            >
              ← Back to Topics
            </Button>
          </div>
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

      {/* Alphabets Section */}
      <section id="alphabets-section" className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('useful-categories')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2"
            >
              ← Back to Topics
            </Button>
          </div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Het Nederlandse Alfabet (Dutch Alphabet)
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn the Dutch alphabet with interactive pronunciation guide and examples.
            </p>
          </div>

          {/* Interactive Alphabet Grid */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Type className="w-6 h-6" />
                Interactive Alphabet (Interactief Alfabet)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
                {[
                  { letter: 'A', dutch: 'aa', english: 'ah', example: 'appel (apple)' },
                  { letter: 'B', dutch: 'bee', english: 'bay', example: 'boek (book)' },
                  { letter: 'C', dutch: 'see', english: 'say', example: 'café (café)' },
                  { letter: 'D', dutch: 'dee', english: 'day', example: 'deur (door)' },
                  { letter: 'E', dutch: 'ee', english: 'ay', example: 'een (one)' },
                  { letter: 'F', dutch: 'ef', english: 'eff', example: 'fiets (bike)' },
                  { letter: 'G', dutch: 'ghee', english: 'khay', example: 'goed (good)' },
                  { letter: 'H', dutch: 'haa', english: 'hah', example: 'huis (house)' },
                  { letter: 'I', dutch: 'ie', english: 'ee', example: 'is (is)' },
                  { letter: 'J', dutch: 'jee', english: 'yay', example: 'ja (yes)' },
                  { letter: 'K', dutch: 'kaa', english: 'kah', example: 'kat (cat)' },
                  { letter: 'L', dutch: 'el', english: 'ell', example: 'lamp (lamp)' },
                  { letter: 'M', dutch: 'em', english: 'emm', example: 'man (man)' },
                  { letter: 'N', dutch: 'en', english: 'enn', example: 'nee (no)' },
                  { letter: 'O', dutch: 'oo', english: 'oh', example: 'ook (also)' },
                  { letter: 'P', dutch: 'pee', english: 'pay', example: 'papa (dad)' },
                  { letter: 'Q', dutch: 'kuu', english: 'koo', example: 'quiz (quiz)' },
                  { letter: 'R', dutch: 'er', english: 'air', example: 'rood (red)' },
                  { letter: 'S', dutch: 'es', english: 'ess', example: 'snel (fast)' },
                  { letter: 'T', dutch: 'tee', english: 'tay', example: 'tafel (table)' },
                  { letter: 'U', dutch: 'uu', english: 'oo', example: 'uit (out)' },
                  { letter: 'V', dutch: 'vee', english: 'vay', example: 'vis (fish)' },
                  { letter: 'W', dutch: 'wee', english: 'vay', example: 'water (water)' },
                  { letter: 'X', dutch: 'iks', english: 'icks', example: 'extra (extra)' },
                  { letter: 'Y', dutch: 'ie-grec', english: 'ee-greek', example: 'yoga (yoga)' },
                  { letter: 'Z', dutch: 'zet', english: 'zett', example: 'zee (sea)' }
                ].map((item) => (
                  <Card 
                    key={item.letter}
                    className={`cursor-pointer transition-all hover:shadow-lg text-center border-2 ${
                      selectedLetter === item.letter 
                        ? 'ring-2 ring-violet-500 bg-violet-50 dark:bg-violet-950 border-violet-300' 
                        : 'hover:bg-muted/50 border-muted-foreground/20'
                    }`}
                    onClick={() => {
                      setSelectedLetter(selectedLetter === item.letter ? null : item.letter);
                      playDutchPronunciation(item.letter);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="text-3xl font-bold mb-2 text-violet-600">{item.letter}</div>
                      <div className="font-semibold text-lg">{item.dutch}</div>
                      <div className="text-sm text-muted-foreground">[{item.english}]</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {selectedLetter && (
                <div className="mt-8 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950 dark:to-purple-950 p-6 rounded-xl border border-violet-200 dark:border-violet-800">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-violet-600 mb-4">{selectedLetter}</div>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-2 text-violet-800 dark:text-violet-200">Dutch Pronunciation</h4>
                        <p className="text-2xl font-bold text-violet-600">
                          {[
                            { letter: 'A', dutch: 'aa' }, { letter: 'B', dutch: 'bee' }, { letter: 'C', dutch: 'see' },
                            { letter: 'D', dutch: 'dee' }, { letter: 'E', dutch: 'ee' }, { letter: 'F', dutch: 'ef' },
                            { letter: 'G', dutch: 'ghee' }, { letter: 'H', dutch: 'haa' }, { letter: 'I', dutch: 'ie' },
                            { letter: 'J', dutch: 'jee' }, { letter: 'K', dutch: 'kaa' }, { letter: 'L', dutch: 'el' },
                            { letter: 'M', dutch: 'em' }, { letter: 'N', dutch: 'en' }, { letter: 'O', dutch: 'oo' },
                            { letter: 'P', dutch: 'pee' }, { letter: 'Q', dutch: 'kuu' }, { letter: 'R', dutch: 'er' },
                            { letter: 'S', dutch: 'es' }, { letter: 'T', dutch: 'tee' }, { letter: 'U', dutch: 'uu' },
                            { letter: 'V', dutch: 'vee' }, { letter: 'W', dutch: 'wee' }, { letter: 'X', dutch: 'iks' },
                            { letter: 'Y', dutch: 'ie-grec' }, { letter: 'Z', dutch: 'zet' }
                          ].find(l => l.letter === selectedLetter)?.dutch}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2 text-violet-800 dark:text-violet-200">English Approximation</h4>
                        <p className="text-xl text-muted-foreground">
                          [{[
                            { letter: 'A', english: 'ah' }, { letter: 'B', english: 'bay' }, { letter: 'C', english: 'say' },
                            { letter: 'D', english: 'day' }, { letter: 'E', english: 'ay' }, { letter: 'F', english: 'eff' },
                            { letter: 'G', english: 'khay' }, { letter: 'H', english: 'hah' }, { letter: 'I', english: 'ee' },
                            { letter: 'J', english: 'yay' }, { letter: 'K', english: 'kah' }, { letter: 'L', english: 'ell' },
                            { letter: 'M', english: 'emm' }, { letter: 'N', english: 'enn' }, { letter: 'O', english: 'oh' },
                            { letter: 'P', english: 'pay' }, { letter: 'Q', english: 'koo' }, { letter: 'R', english: 'air' },
                            { letter: 'S', english: 'ess' }, { letter: 'T', english: 'tay' }, { letter: 'U', english: 'oo' },
                            { letter: 'V', english: 'vay' }, { letter: 'W', english: 'vay' }, { letter: 'X', english: 'icks' },
                            { letter: 'Y', english: 'ee-greek' }, { letter: 'Z', english: 'zett' }
                          ].find(l => l.letter === selectedLetter)?.english}]
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2 text-violet-800 dark:text-violet-200">Example Word</h4>
                        <p className="text-lg font-medium">
                          {[
                            { letter: 'A', example: 'appel (apple)' }, { letter: 'B', example: 'boek (book)' }, { letter: 'C', example: 'café (café)' },
                            { letter: 'D', example: 'deur (door)' }, { letter: 'E', example: 'een (one)' }, { letter: 'F', example: 'fiets (bike)' },
                            { letter: 'G', example: 'goed (good)' }, { letter: 'H', example: 'huis (house)' }, { letter: 'I', example: 'is (is)' },
                            { letter: 'J', example: 'ja (yes)' }, { letter: 'K', example: 'kat (cat)' }, { letter: 'L', example: 'lamp (lamp)' },
                            { letter: 'M', example: 'man (man)' }, { letter: 'N', example: 'nee (no)' }, { letter: 'O', example: 'ook (also)' },
                            { letter: 'P', example: 'papa (dad)' }, { letter: 'Q', example: 'quiz (quiz)' }, { letter: 'R', example: 'rood (red)' },
                            { letter: 'S', example: 'snel (fast)' }, { letter: 'T', example: 'tafel (table)' }, { letter: 'U', example: 'uit (out)' },
                            { letter: 'V', example: 'vis (fish)' }, { letter: 'W', example: 'water (water)' }, { letter: 'X', example: 'extra (extra)' },
                            { letter: 'Y', example: 'yoga (yoga)' }, { letter: 'Z', example: 'zee (sea)' }
                          ].find(l => l.letter === selectedLetter)?.example}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Click on letters to see pronunciation details and examples
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-300 rounded"></div>
                    <span>Not selected</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-violet-500 rounded"></div>
                    <span>Selected</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pronunciation Guide */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Pronunciation Guide (Uitspraakgids)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-4 text-blue-800 dark:text-blue-200">Special Dutch Sounds</h3>
                    <div className="space-y-3">
                      <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                        <p className="font-semibold mb-1">G - "ghee" [χ]</p>
                        <p className="text-sm text-muted-foreground">Guttural sound, like clearing throat</p>
                        <p className="text-xs">Example: <strong>goed</strong> (good)</p>
                      </div>
                      <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                        <p className="font-semibold mb-1">R - "er" [r]</p>
                        <p className="text-sm text-muted-foreground">Rolled R, stronger than English</p>
                        <p className="text-xs">Example: <strong>rood</strong> (red)</p>
                      </div>
                      <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                        <p className="font-semibold mb-1">W - "wee" [ʋ]</p>
                        <p className="text-sm text-muted-foreground">Between V and W sound</p>
                        <p className="text-xs">Example: <strong>water</strong> (water)</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-4 text-green-800 dark:text-green-200">Spelling Tips</h3>
                    <div className="space-y-3">
                      <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                        <p className="font-semibold mb-1">Double Letters</p>
                        <p className="text-sm text-muted-foreground">aa, ee, oo, uu for long vowels</p>
                        <p className="text-xs">Example: <strong>naam</strong> (name)</p>
                      </div>
                      <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                        <p className="font-semibold mb-1">IJ Combination</p>
                        <p className="text-sm text-muted-foreground">Treated as one letter, sounds like "eye"</p>
                        <p className="text-xs">Example: <strong>ijs</strong> (ice)</p>
                      </div>
                      <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                        <p className="font-semibold mb-1">CH Combination</p>
                        <p className="text-sm text-muted-foreground">Like German "ach" sound</p>
                        <p className="text-xs">Example: <strong>acht</strong> (eight)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alphabet Practice */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Alphabet Practice (Alfabet Oefening)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                  <CardContent className="p-6 text-center">
                    <h4 className="font-bold text-lg mb-4">Spelling Practice</h4>
                    <p className="text-sm mb-4">Practice spelling Dutch words letter by letter</p>
                    <div className="bg-white/70 dark:bg-black/30 p-3 rounded mb-4">
                      <p className="font-semibold">Nederland</p>
                      <p className="text-xs text-muted-foreground">en-ee-dee-ee-er-el-aa-en-dee</p>
                    </div>
                    <Button 
                      onClick={() => {
                        const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                        setSelectedLetter(randomLetter);
                        playDutchPronunciation(randomLetter);
                      }}
                      className="w-full"
                    >
                      Random Letter
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
                  <CardContent className="p-6 text-center">
                    <h4 className="font-bold text-lg mb-4">Common Words</h4>
                    <div className="space-y-2 text-sm">
                      <div className="bg-white/70 dark:bg-black/30 p-2 rounded">
                        <p><strong>Hallo</strong> - haa-aa-el-el-oo</p>
                      </div>
                      <div className="bg-white/70 dark:bg-black/30 p-2 rounded">
                        <p><strong>Dank je</strong> - dee-aa-en-kaa jee-ee</p>
                      </div>
                      <div className="bg-white/70 dark:bg-black/30 p-2 rounded">
                        <p><strong>Goed</strong> - ghee-oo-ee-dee</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
                  <CardContent className="p-6 text-center">
                    <h4 className="font-bold text-lg mb-4">Memory Tips</h4>
                    <div className="space-y-2 text-sm text-left">
                      <p>• <strong>G</strong> sounds like clearing throat</p>
                      <p>• <strong>J</strong> sounds like English Y</p>
                      <p>• <strong>W</strong> is between V and W</p>
                      <p>• <strong>R</strong> is rolled/trilled</p>
                      <p>• <strong>IJ</strong> = one letter (sounds like "eye")</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Phonetic Examples */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Phonetic Examples (Fonetische Voorbeelden)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 text-yellow-800 dark:text-yellow-200">Complete Alphabet Song</h3>
                  <div className="bg-white/70 dark:bg-black/30 p-4 rounded text-center">
                    <p className="font-mono text-sm leading-relaxed">
                      aa-bee-see-dee-ee-ef-ghee-haa-ie-jee-kaa-el-em-en-oo-pee-kuu-er-es-tee-uu-vee-wee-iks-ie-grec-zet
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      A-B-C-D-E-F-G-H-I-J-K-L-M-N-O-P-Q-R-S-T-U-V-W-X-Y-Z
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 dark:bg-red-950 p-6 rounded-lg">
                    <h4 className="font-semibold text-lg mb-4 text-red-800 dark:text-red-200">Vowels (Klinkers)</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>A</strong> - aa [ah] - <em>appel</em></p>
                      <p><strong>E</strong> - ee [ay] - <em>een</em></p>
                      <p><strong>I</strong> - ie [ee] - <em>is</em></p>
                      <p><strong>O</strong> - oo [oh] - <em>ook</em></p>
                      <p><strong>U</strong> - uu [oo] - <em>uit</em></p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                    <h4 className="font-semibold text-lg mb-4 text-blue-800 dark:text-blue-200">Consonants (Medeklinkers)</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>B</strong> - bee [bay] - <em>boek</em></p>
                      <p><strong>D</strong> - dee [day] - <em>deur</em></p>
                      <p><strong>F</strong> - ef [eff] - <em>fiets</em></p>
                      <p><strong>K</strong> - kaa [kah] - <em>kat</em></p>
                      <p><strong>L</strong> - el [ell] - <em>lamp</em></p>
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
          <div className="flex justify-between items-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('useful-categories')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2"
            >
              ← Back to Topics
            </Button>
          </div>
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