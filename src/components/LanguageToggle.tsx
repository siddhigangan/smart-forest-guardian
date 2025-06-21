
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2 bg-muted/50 backdrop-blur-sm rounded-full p-1 theme-transition">
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={`rounded-full px-3 py-1 text-xs theme-transition ${
          language === 'en' 
            ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
        }`}
      >
        EN
      </Button>
      <Button
        variant={language === 'hi' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('hi')}
        className={`rounded-full px-3 py-1 text-xs theme-transition ${
          language === 'hi' 
            ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
        }`}
      >
        हिं
      </Button>
    </div>
  );
};

export default LanguageToggle;
