import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Music, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import heroImage from '@/assets/dutch-hero.jpg';

const musicVideos = [
  {
    id: 's86VUMu73AU',
    title: 'Nederlandse Muziek Video 1'
  },
  {
    id: 'wW8jga2D_ok', 
    title: 'Nederlandse Muziek Video 2'
  },
  {
    id: 'pyg9fiTSRm8',
    title: 'Nederlandse Muziek Video 3'
  },
  {
    id: '1Z0kML7JrwU',
    title: 'Nederlandse Muziek Video 4'
  }
];

export default function Youtube() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (selectedCategory === 'music') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedCategory(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ← Back to Categories
              </Button>
              <Navigation />
            </div>
          </div>
        </header>

        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nederlandse Muziek
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Geniet van populaire Nederlandse liedjes en artiesten
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {musicVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="rounded-t-lg"
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground">{video.title}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    );
  }

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
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-accent/90" />
        
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Nederlandse Video's
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
          Discover Dutch music, culture, and educational content through handpicked YouTube videos.   </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-white/80">
            <div className="flex items-center space-x-2">
              <Music className="w-5 h-5" />
              <span>Nederlandse Muziek</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Cultuur</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Educatieve Content</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Video Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore different categories of Dutch videos to improve your language skills and cultural knowledge.   </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="text-center group hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedCategory('music')}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Music className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Dutch Music</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
             Popular Dutch songs and artists
              </p>
              <Button variant="outline" size="sm">
                <Play className="w-4 h-4 mr-2" />
                Bekijk Video's
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                <Globe className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle>Dutch Culture</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
             Documentaries and videos about Dutch culture
              </p>
              <p className="text-sm text-muted-foreground">Binnenkort beschikbaar</p>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Educational Video's</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Dutch language learning videos
              </p>
              <p className="text-sm text-muted-foreground">Coming Soon</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}