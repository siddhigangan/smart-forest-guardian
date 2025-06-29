
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Map, AlertTriangle, Leaf } from 'lucide-react';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden theme-transition">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=2070')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/70 to-primary/20 dark:from-background/90 dark:via-background/80 dark:to-primary/30" />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Leaf className="absolute top-20 left-10 text-primary/30 animate-float" size={24} />
        <Leaf className="absolute top-40 right-20 text-primary/20 animate-float" size={32} style={{ animationDelay: '2s' }} />
        <Leaf className="absolute bottom-32 left-1/4 text-primary/25 animate-float" size={20} style={{ animationDelay: '4s' }} />
        <Leaf className="absolute bottom-20 right-1/3 text-primary/30 animate-float" size={28} style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium">
            {t('hero.subtitle')}
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/map">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Map className="mr-3 h-5 w-5" />
                {t('hero.viewMap')}
              </Button>
            </Link>
            <Link to="/report">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <AlertTriangle className="mr-3 h-5 w-5" />
                {t('hero.reportThreat')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
