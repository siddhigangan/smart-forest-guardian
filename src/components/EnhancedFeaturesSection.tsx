
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Flame, 
  Camera, 
  AlertTriangle, 
  MapPin, 
  Satellite, 
  Shield, 
  BarChart3, 
  Bell,
  Globe,
  Zap,
  Users,
  TreePine
} from 'lucide-react';

const EnhancedFeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Satellite,
      title: 'Real-time Satellite Monitoring',
      description: 'NASA FIRMS integration for instant fire detection with 90%+ accuracy',
      badge: 'Live',
      color: 'bg-fire-500',
      link: '/map'
    },
    {
      icon: Camera,
      title: 'Wildlife Tracking System',
      description: 'AI-powered animal monitoring with GPS collar integration',
      badge: 'Active',
      color: 'bg-forest-500',
      link: '/map'
    },
    {
      icon: AlertTriangle,
      title: 'Threat Reporting Hub',
      description: 'Community-driven incident reporting with photo verification',
      badge: 'Community',
      color: 'bg-earth-500',
      link: '/report'
    },
    {
      icon: Globe,
      title: 'Interactive Forest Map',
      description: 'Google Maps-style interface with multi-layer visualization',
      badge: 'New',
      color: 'bg-forest-600',
      link: '/map'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive forest health metrics and trend analysis',
      badge: 'Pro',
      color: 'bg-blue-500',
      link: '/dashboard'
    },
    {
      icon: Bell,
      title: 'Smart Alerts System',
      description: 'Multi-channel notifications for critical forest events',
      badge: 'Instant',
      color: 'bg-orange-500',
      link: '/dashboard'
    }
  ];

  const stats = [
    { label: 'Forest Area Monitored', value: '10,000+', unit: 'sq km', icon: TreePine },
    { label: 'Fire Alerts This Month', value: '47', unit: 'alerts', icon: Flame },
    { label: 'Animals Tracked', value: '156', unit: 'species', icon: Camera },
    { label: 'Community Reports', value: '320+', unit: 'reports', icon: Users }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-earth-900/20 to-forest-900/40">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-forest-600 text-white">Advanced Technology</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Protecting Forests with Smart Technology
          </h2>
          <p className="text-xl text-forest-200 max-w-3xl mx-auto leading-relaxed">
            Comprehensive forest monitoring platform combining satellite imagery, AI analytics, 
            and community engagement for effective conservation.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-forest-700 text-center">
                <CardContent className="p-6">
                  <Icon className="h-8 w-8 text-forest-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-forest-300">{stat.label}</div>
                  <Badge variant="outline" className="mt-2 text-xs border-forest-600 text-forest-300">
                    {stat.unit}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-forest-700 hover:bg-white/15 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full ${feature.color}/20`}>
                      <Icon className={`h-6 w-6 text-white`} />
                    </div>
                    <Badge className={`${feature.color} text-white`}>
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-xl group-hover:text-forest-300 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-forest-300">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={feature.link}>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-forest-600 text-forest-300 hover:bg-forest-800 hover:text-white"
                    >
                      Explore Feature
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-forest-800/50 to-earth-800/50 backdrop-blur-sm border-forest-600 p-8">
            <CardContent className="space-y-6">
              <Shield className="h-16 w-16 text-forest-400 mx-auto" />
              <h3 className="text-3xl font-bold text-white">
                Join the Forest Protection Mission
              </h3>
              <p className="text-forest-200 max-w-2xl mx-auto">
                Be part of a global network protecting our forests. Access real-time monitoring tools, 
                contribute to conservation efforts, and help preserve nature for future generations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/map">
                  <Button size="lg" className="bg-forest-600 hover:bg-forest-700 text-white">
                    <MapPin className="mr-2 h-5 w-5" />
                    Explore Live Map
                  </Button>
                </Link>
                <Link to="/report">
                  <Button size="lg" variant="outline" className="border-forest-600 text-forest-300 hover:bg-forest-800">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Report an Issue
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EnhancedFeaturesSection;
