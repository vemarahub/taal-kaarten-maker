import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Music, Globe, Users, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import heroImage from '@/assets/dutch-hero.jpg';

interface Video {
  id: string;
  title: string;
  artist?: string;
  description?: string;
  topic?: string;
}

const loadVideosFromCSV = async (filename: string): Promise<Video[]> => {
  try {
    const response = await fetch(`/data/${filename}`);
    const csvText = await response.text();
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      const video: any = {};
      headers.forEach((header, index) => {
        video[header.trim()] = values[index]?.trim() || '';
      });
      return video as Video;
    });
  } catch (error) {
    console.error(`Failed to load ${filename}:`, error);
    return [];
  }
};

export default function Youtube() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [musicVideos, setMusicVideos] = useState<Video[]>([]);
  const [cultureVideos, setCultureVideos] = useState<Video[]>([]);
  const [educationalVideos, setEducationalVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllVideos = async () => {
      setLoading(true);
      const [music, culture, educational] = await Promise.all([
        loadVideosFromCSV('dutch-music-videos.csv'),
        loadVideosFromCSV('dutch-culture-videos.csv'),
        loadVideosFromCSV('dutch-educational-videos.csv')
      ]);
      
      setMusicVideos(music);
      setCultureVideos(culture);
      setEducationalVideos(educational);
      setLoading(false);
    };

    loadAllVideos();
  }, []);

  const renderVideoCategory = (videos: Video[], title: string, subtitle: string) => {
    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading videos...</p>
          </div>
        </div>
      );
    }

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
              {title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {videos.map((video) => (
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
                    {video.artist && (
                      <p className="text-sm text-muted-foreground mt-1">by {video.artist}</p>
                    )}
                    {video.description && (
                      <p className="text-sm text-muted-foreground mt-1">{video.description}</p>
                    )}
                    {video.topic && (
                      <p className="text-sm text-muted-foreground mt-1">Topic: {video.topic}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    );
  };

  if (selectedCategory === 'music') {
    return renderVideoCategory(musicVideos, 'Nederlandse Muziek', 'Geniet van populaire Nederlandse liedjes en artiesten');
  }

  if (selectedCategory === 'culture') {
    return renderVideoCategory(cultureVideos, 'Nederlandse Cultuur', 'Documentaires en video\'s over Nederlandse cultuur');
  }

  if (selectedCategory === 'educational') {
    return renderVideoCategory(educationalVideos, 'Educatieve Video\'s', 'Nederlandse taal leervideos');
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

          <Card className="text-center group hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedCategory('culture')}>
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
              <Button variant="outline" size="sm">
                <Play className="w-4 h-4 mr-2" />
                Bekijk Video's
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedCategory('educational')}>
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
              <Button variant="outline" size="sm">
                <Play className="w-4 h-4 mr-2" />
                Bekijk Video's
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}