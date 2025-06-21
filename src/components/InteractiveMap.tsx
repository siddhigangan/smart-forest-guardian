
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, Camera, MapPin, Layers, ZoomIn, ZoomOut } from 'lucide-react';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

const InteractiveMap = () => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLayer, setMapLayer] = useState<'satellite' | 'terrain' | 'street'>('satellite');
  const [showFireAlerts, setShowFireAlerts] = useState(true);
  const [showAnimals, setShowAnimals] = useState(true);

  // Mock data
  const fireAlerts: FireAlert[] = [
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
    },
    {
      id: '3',
      latitude: 20.8,
      longitude: 79.2,
      confidence: 78,
      brightness: 298.5,
      timestamp: new Date(Date.now() - 7200000).toISOString()
    }
  ];

  const animalTracking: AnimalTracking[] = [
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
    },
    {
      id: '3',
      species: 'Sloth Bear',
      name: 'Baloo',
      latitude: 20.7,
      longitude: 79.5,
      lastSeen: new Date(Date.now() - 14400000).toISOString(),
      status: 'inactive'
    }
  ];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center: [20.8, 79.0],
      zoom: 8,
      zoomControl: false,
    });

    mapRef.current = map;

    // Add custom zoom controls
    L.control.zoom({
      position: 'topright'
    }).addTo(map);

    // Add different map layers
    const layers = {
      satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      }),
      terrain: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }),
      street: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
    };

    layers.satellite.addTo(map);

    // Custom icons
    const fireIcon = L.divIcon({
      html: '<div style="background: #ef4444; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">🔥</div>',
      className: 'custom-fire-icon',
      iconSize: [20, 20],
    });

    const animalIcon = L.divIcon({
      html: '<div style="background: #22c55e; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">🐅</div>',
      className: 'custom-animal-icon',
      iconSize: [20, 20],
    });

    // Add fire alert markers
    const fireMarkers: L.Marker[] = [];
    fireAlerts.forEach(alert => {
      const marker = L.marker([alert.latitude, alert.longitude], { icon: fireIcon })
        .bindPopup(`
          <div style="min-width: 200px;">
            <h3 style="color: #ef4444; font-weight: bold; margin-bottom: 8px;">🔥 Fire Alert</h3>
            <p><strong>Confidence:</strong> ${alert.confidence}%</p>
            <p><strong>Brightness:</strong> ${alert.brightness}K</p>
            <p><strong>Time:</strong> ${new Date(alert.timestamp).toLocaleString()}</p>
            <p><strong>Location:</strong> ${alert.latitude.toFixed(4)}, ${alert.longitude.toFixed(4)}</p>
          </div>
        `);
      fireMarkers.push(marker);
      if (showFireAlerts) marker.addTo(map);
    });

    // Add animal tracking markers
    const animalMarkers: L.Marker[] = [];
    animalTracking.forEach(animal => {
      const marker = L.marker([animal.latitude, animal.longitude], { icon: animalIcon })
        .bindPopup(`
          <div style="min-width: 200px;">
            <h3 style="color: #22c55e; font-weight: bold; margin-bottom: 8px;">🐅 ${animal.name}</h3>
            <p><strong>Species:</strong> ${animal.species}</p>
            <p><strong>Status:</strong> ${animal.status.toUpperCase()}</p>
            <p><strong>Last Seen:</strong> ${new Date(animal.lastSeen).toLocaleString()}</p>
            <p><strong>Location:</strong> ${animal.latitude.toFixed(4)}, ${animal.longitude.toFixed(4)}</p>
          </div>
        `);
      animalMarkers.push(marker);
      if (showAnimals) marker.addTo(map);
    });

    // Layer control
    const handleLayerChange = (newLayer: 'satellite' | 'terrain' | 'street') => {
      Object.values(layers).forEach(layer => map.removeLayer(layer));
      layers[newLayer].addTo(map);
      setMapLayer(newLayer);
    };

    // Store references for cleanup
    (map as any)._fireMarkers = fireMarkers;
    (map as any)._animalMarkers = animalMarkers;
    (map as any)._layers = layers;
    (map as any)._handleLayerChange = handleLayerChange;

    return () => {
      map.remove();
    };
  }, []);

  // Handle layer changes
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    const layers = (map as any)._layers;
    
    Object.values(layers).forEach((layer: any) => map.removeLayer(layer));
    layers[mapLayer].addTo(map);
  }, [mapLayer]);

  // Handle fire alerts visibility
  useEffect(() => {
    if (!mapRef.current) return;
    const fireMarkers = (mapRef.current as any)._fireMarkers || [];
    
    fireMarkers.forEach((marker: L.Marker) => {
      if (showFireAlerts) {
        marker.addTo(mapRef.current!);
      } else {
        mapRef.current!.removeLayer(marker);
      }
    });
  }, [showFireAlerts]);

  // Handle animals visibility
  useEffect(() => {
    if (!mapRef.current) return;
    const animalMarkers = (mapRef.current as any)._animalMarkers || [];
    
    animalMarkers.forEach((marker: L.Marker) => {
      if (showAnimals) {
        marker.addTo(mapRef.current!);
      } else {
        mapRef.current!.removeLayer(marker);
      }
    });
  }, [showAnimals]);

  return (
    <div className="w-full h-full relative">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-[1000] space-y-2">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardContent className="p-3">
            <div className="space-y-2">
              <div className="text-sm font-medium">Map Type</div>
              <div className="flex flex-col space-y-1">
                <Button
                  size="sm"
                  variant={mapLayer === 'satellite' ? 'default' : 'outline'}
                  onClick={() => setMapLayer('satellite')}
                  className="justify-start text-xs"
                >
                  <Layers className="h-3 w-3 mr-1" />
                  Satellite
                </Button>
                <Button
                  size="sm"
                  variant={mapLayer === 'terrain' ? 'default' : 'outline'}
                  onClick={() => setMapLayer('terrain')}
                  className="justify-start text-xs"
                >
                  <MapPin className="h-3 w-3 mr-1" />
                  Terrain
                </Button>
                <Button
                  size="sm"
                  variant={mapLayer === 'street' ? 'default' : 'outline'}
                  onClick={() => setMapLayer('street')}
                  className="justify-start text-xs"
                >
                  <MapPin className="h-3 w-3 mr-1" />
                  Street
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm">
          <CardContent className="p-3">
            <div className="space-y-2">
              <div className="text-sm font-medium">Overlays</div>
              <div className="flex flex-col space-y-1">
                <Button
                  size="sm"
                  variant={showFireAlerts ? 'default' : 'outline'}
                  onClick={() => setShowFireAlerts(!showFireAlerts)}
                  className="justify-start text-xs"
                >
                  <Flame className="h-3 w-3 mr-1" />
                  Fire Alerts ({fireAlerts.length})
                </Button>
                <Button
                  size="sm"
                  variant={showAnimals ? 'default' : 'outline'}
                  onClick={() => setShowAnimals(!showAnimals)}
                  className="justify-start text-xs"
                >
                  <Camera className="h-3 w-3 mr-1" />
                  Animals ({animalTracking.length})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full rounded-lg" />

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-[1000]">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardContent className="p-3">
            <div className="text-sm font-medium mb-2">Legend</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Fire Alerts</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Wildlife Tracking</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveMap;
