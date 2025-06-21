
import React from 'react';
import Navigation from '@/components/Navigation';
import InteractiveMap from '@/components/InteractiveMap';
import { useLanguage } from '@/contexts/LanguageContext';

const Map = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/10 theme-transition">
      <Navigation />
      
      <div className="pt-16">
        <div className="h-screen relative">
          <InteractiveMap />
        </div>
      </div>
    </div>
  );
};

export default Map;
