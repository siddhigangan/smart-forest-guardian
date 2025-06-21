
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Camera, Users } from 'lucide-react';

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Flame,
      title: t('features.fireDetection'),
      description: t('features.fireDesc'),
      color: 'fire-500'
    },
    {
      icon: Camera,
      title: t('features.wildlifeTracking'),
      description: t('features.wildlifeDesc'),
      color: 'forest-500'
    },
    {
      icon: Users,
      title: t('features.communityReports'),
      description: t('features.communityDesc'),
      color: 'earth-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-forest-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-${feature.color}/10 flex items-center justify-center mb-4`}>
                    <Icon className={`h-8 w-8 text-${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-forest-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-forest-700 text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
