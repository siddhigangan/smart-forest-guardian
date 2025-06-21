
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, Camera, AlertTriangle, MapPin, Activity, Users } from 'lucide-react';
import { toast } from 'sonner';

interface FireAlert {
  id: string;
  latitude: number;
  longitude: number;
  confidence: number;
  brightness: number;
  timestamp: string;
}

interface AnimalTracking {
  id: string;
  species: string;
  name: string;
  latitude: number;
  longitude: number;
  lastSeen: string;
  status: 'active' | 'inactive';
}

const Dashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [fireAlerts, setFireAlerts] = useState<FireAlert[]>([]);
  const [animalTracking, setAnimalTracking] = useState<AnimalTracking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Simulate loading data
    setTimeout(() => {
      // Mock fire alert data
      setFireAlerts([
        {
          id: '1',
          latitude: 20.5937,
          longitude: 78.9629,
          confidence: 85,
          brightness: 315.2,
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          latitude: 21.1458,
          longitude: 79.0882,
          confidence: 92,
          brightness: 342.8,
          timestamp: new Date(Date.now() - 3600000).toISOString()
        }
      ]);

      // Mock animal tracking data
      setAnimalTracking([
        {
          id: '1',
          species: 'Bengal Tiger',
          name: 'Rani',
          latitude: 20.6125,
          longitude: 78.9734,
          lastSeen: new Date(Date.now() - 1800000).toISOString(),
          status: 'active'
        },
        {
          id: '2',
          species: 'Indian Elephant',
          name: 'Ganesha',
          latitude: 21.1623,
          longitude: 79.1045,
          lastSeen: new Date(Date.now() - 7200000).toISOString(),
          status: 'active'
        }
      ]);

      setIsLoading(false);
      toast.success('Dashboard data loaded successfully');
    }, 1500);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-forest-900 via-forest-800 to-earth-900">
        <Navigation />
        <div className="pt-24 flex items-center justify-center">
          <div className="text-white text-xl">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-900 via-forest-800 to-earth-900">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {t('dashboard.title')}
              </h1>
              <p className="text-forest-300">
                Real-time forest monitoring and wildlife tracking
              </p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="border-forest-600 text-white hover:bg-forest-800">
              Logout
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/10 backdrop-blur-sm border-forest-700">
              <CardContent className="p-6 text-center">
                <Flame className="h-10 w-10 text-fire-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{fireAlerts.length}</div>
                <div className="text-forest-300 text-sm">Active Alerts</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-forest-700">
              <CardContent className="p-6 text-center">
                <Camera className="h-10 w-10 text-forest-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{animalTracking.length}</div>
                <div className="text-forest-300 text-sm">Tracked Animals</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-forest-700">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-10 w-10 text-earth-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-forest-300 text-sm">Reports Today</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-forest-700">
              <CardContent className="p-6 text-center">
                <MapPin className="h-10 w-10 text-fire-300 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">5</div>
                <div className="text-forest-300 text-sm">Protected Zones</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Fire Alerts */}
            <Card className="bg-white/10 backdrop-blur-sm border-forest-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Flame className="h-5 w-5 text-fire-400" />
                  <span>{t('dashboard.activeAlerts')}</span>
                </CardTitle>
                <CardDescription className="text-forest-300">
                  Real-time fire detection via NASA FIRMS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fireAlerts.map((alert) => (
                    <div key={alert.id} className="bg-fire-900/20 p-4 rounded-lg border border-fire-700">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="destructive" className="animate-pulse-slow">
                          High Priority
                        </Badge>
                        <span className="text-sm text-forest-300">
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="text-white font-medium mb-1">
                        Location: {alert.latitude.toFixed(4)}, {alert.longitude.toFixed(4)}
                      </div>
                      <div className="text-sm text-forest-300">
                        Confidence: {alert.confidence}% • Brightness: {alert.brightness}K
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Wildlife Tracking */}
            <Card className="bg-white/10 backdrop-blur-sm border-forest-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Camera className="h-5 w-5 text-forest-400" />
                  <span>{t('dashboard.wildlifeTracking')}</span>
                </CardTitle>
                <CardDescription className="text-forest-300">
                  Live animal movement monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {animalTracking.map((animal) => (
                    <div key={animal.id} className="bg-forest-900/20 p-4 rounded-lg border border-forest-700">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-white font-medium">{animal.name}</div>
                          <div className="text-sm text-forest-300">{animal.species}</div>
                        </div>
                        <Badge variant={animal.status === 'active' ? 'default' : 'secondary'}>
                          <Activity className="h-3 w-3 mr-1" />
                          {animal.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-forest-300">
                        Location: {animal.latitude.toFixed(4)}, {animal.longitude.toFixed(4)}
                      </div>
                      <div className="text-sm text-forest-400">
                        Last seen: {new Date(animal.lastSeen).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Placeholder */}
          <Card className="mt-8 bg-white/10 backdrop-blur-sm border-forest-700">
            <CardHeader>
              <CardTitle className="text-white">Live Forest Monitoring Map</CardTitle>
              <CardDescription className="text-forest-300">
                Interactive map showing fire alerts and animal locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-forest-800/50 rounded-lg flex items-center justify-center border-2 border-dashed border-forest-600">
                <div className="text-center text-forest-300">
                  <MapPin className="h-16 w-16 mx-auto mb-4 text-forest-500" />
                  <p className="text-lg font-medium">Interactive Map</p>
                  <p className="text-sm">Integration with Leaflet.js/Mapbox for live visualization</p>
                  <p className="text-xs mt-2">Fire alerts, animal tracking, and threat reports displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
