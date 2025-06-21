
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.map': 'Live Map',
    'nav.report': 'Report Threat',
    'nav.login': 'Officer Login',
    
    // Hero Section
    'hero.title': 'Smart Forest Guardian',
    'hero.subtitle': 'Protecting Wildlife & Preventing Forest Fires',
    'hero.description': 'An intelligent monitoring system safeguarding India\'s precious forests through real-time fire detection and wildlife tracking.',
    'hero.viewMap': 'View Live Map',
    'hero.reportThreat': 'Report a Threat',
    
    // Features
    'features.fireDetection': 'Fire Detection',
    'features.fireDesc': 'Real-time fire alerts using NASA satellite data',
    'features.wildlifeTracking': 'Wildlife Tracking',
    'features.wildlifeDesc': 'Monitor animal movements and migration patterns',
    'features.communityReports': 'Community Reports',
    'features.communityDesc': 'Enable locals to report threats and violations',
    
    // Threat Reporting
    'report.title': 'Report a Threat',
    'report.description': 'Help protect our forests by reporting suspicious activities',
    'report.photo': 'Upload Photo',
    'report.threatType': 'Threat Type',
    'report.location': 'Location',
    'report.details': 'Additional Details',
    'report.submit': 'Submit Report',
    'report.fire': 'Forest Fire',
    'report.poaching': 'Poaching',
    'report.logging': 'Illegal Logging',
    
    // Login
    'login.title': 'Forest Officer Login',
    'login.username': 'Username',
    'login.password': 'Password',
    'login.submit': 'Login',
    
    // Dashboard
    'dashboard.title': 'Forest Officer Dashboard',
    'dashboard.activeAlerts': 'Active Fire Alerts',
    'dashboard.wildlifeTracking': 'Wildlife Tracking',
    'dashboard.recentReports': 'Recent Threat Reports',
    'dashboard.statistics': 'Forest Statistics',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error occurred',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.back': 'Back'
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.map': 'लाइव मैप',
    'nav.report': 'खतरे की रिपोर्ट',
    'nav.login': 'अधिकारी लॉगिन',
    
    // Hero Section
    'hero.title': 'स्मार्ट वन संरक्षक',
    'hero.subtitle': 'वन्यजीवों की सुरक्षा और वन आग की रोकथाम',
    'hero.description': 'एक बुद्धिमान निगरानी प्रणाली जो वास्तविक समय में आग का पता लगाने और वन्यजीव ट्रैकिंग के माध्यम से भारत के कीमती जंगलों की सुरक्षा करती है।',
    'hero.viewMap': 'लाइव मैप देखें',
    'hero.reportThreat': 'खतरे की रिपोर्ट करें',
    
    // Features
    'features.fireDetection': 'आग का पता लगाना',
    'features.fireDesc': 'नासा उपग्रह डेटा का उपयोग करके वास्तविक समय आग अलर्ट',
    'features.wildlifeTracking': 'वन्यजीव ट्रैकिंग',
    'features.wildlifeDesc': 'जानवरों की गतिविधियों और प्रवास पैटर्न की निगरानी',
    'features.communityReports': 'सामुदायिक रिपोर्ट',
    'features.communityDesc': 'स्थानीय लोगों को खतरों और उल्लंघनों की रिपोर्ट करने में सक्षम बनाएं',
    
    // Threat Reporting
    'report.title': 'खतरे की रिपोर्ट करें',
    'report.description': 'संदिग्ध गतिविधियों की रिपोर्ट करके हमारे जंगलों की सुरक्षा में मदद करें',
    'report.photo': 'फोटो अपलोड करें',
    'report.threatType': 'खतरे का प्रकार',
    'report.location': 'स्थान',
    'report.details': 'अतिरिक्त विवरण',
    'report.submit': 'रिपोर्ट जमा करें',
    'report.fire': 'वन आग',
    'report.poaching': 'शिकार',
    'report.logging': 'अवैध लकड़ी काटना',
    
    // Login
    'login.title': 'वन अधिकारी लॉगिन',
    'login.username': 'उपयोगकर्ता नाम',
    'login.password': 'पासवर्ड',
    'login.submit': 'लॉगिन',
    
    // Dashboard
    'dashboard.title': 'वन अधिकारी डैशबोर्ड',
    'dashboard.activeAlerts': 'सक्रिय आग अलर्ट',
    'dashboard.wildlifeTracking': 'वन्यजीव ट्रैकिंग',
    'dashboard.recentReports': 'हाल की खतरे की रिपोर्ट',
    'dashboard.statistics': 'वन आंकड़े',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि हुई',
    'common.success': 'सफल',
    'common.cancel': 'रद्द करें',
    'common.save': 'सेव करें',
    'common.back': 'वापस'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
