
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Camera, MapPin, FileText } from 'lucide-react';
import { toast } from 'sonner';

const ReportThreat = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    photo: null as File | null,
    threatType: '',
    location: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success('Threat report submitted successfully! Authorities have been notified.');
      setFormData({ photo: null, threatType: '', location: '', description: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-900 via-forest-800 to-earth-900">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <AlertTriangle className="mx-auto h-16 w-16 text-fire-400 mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">
              {t('report.title')}
            </h1>
            <p className="text-forest-300">
              {t('report.description')}
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-forest-700">
            <CardHeader>
              <CardTitle className="text-white">
                Threat Information
              </CardTitle>
              <CardDescription className="text-forest-300">
                Please provide as much detail as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="photo" className="text-white flex items-center space-x-2">
                    <Camera className="h-4 w-4" />
                    <span>{t('report.photo')}</span>
                  </Label>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="bg-white/10 border-forest-600 text-white file:bg-forest-600 file:text-white file:border-0 file:rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="threatType" className="text-white flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{t('report.threatType')}</span>
                  </Label>
                  <Select value={formData.threatType} onValueChange={(value) => setFormData({ ...formData, threatType: value })}>
                    <SelectTrigger className="bg-white/10 border-forest-600 text-white">
                      <SelectValue placeholder="Select threat type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fire">{t('report.fire')}</SelectItem>
                      <SelectItem value="poaching">{t('report.poaching')}</SelectItem>
                      <SelectItem value="logging">{t('report.logging')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-white flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{t('report.location')}</span>
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="bg-white/10 border-forest-600 text-white placeholder-forest-400"
                    placeholder="Enter location or coordinates"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>{t('report.details')}</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-white/10 border-forest-600 text-white placeholder-forest-400 min-h-[100px]"
                    placeholder="Describe what you observed..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-fire-600 hover:bg-fire-700 text-white py-3 font-medium"
                  disabled={isSubmitting || !formData.threatType || !formData.location}
                >
                  {isSubmitting ? t('common.loading') : t('report.submit')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportThreat;
