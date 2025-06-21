
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import EnhancedFeaturesSection from '@/components/EnhancedFeaturesSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <EnhancedFeaturesSection />
    </div>
  );
};

export default Index;
