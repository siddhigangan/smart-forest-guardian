
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full p-1">
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={`rounded-full px-3 py-1 text-xs ${
          language === 'en' 
            ? 'bg-white text-forest-900 hover:bg-white/90' 
            : 'text-white hover:bg-white/10'
        }`}
      >
        EN
      </Button>
      <Button
        variant={language === 'hi' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('hi')}
        className={`rounded-full px-3 py-1 text-xs ${
          language === 'hi' 
            ? 'bg-white text-forest-900 hover:bg-white/90' 
            : 'text-white hover:bg-white/10'
        }`}
      >
        हिं
      </Button>
    </div>
  );
};

export default LanguageToggle;
