
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Shield, User, Lock } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login validation
    setTimeout(() => {
      if (username === 'officer' && password === 'forest123') {
        localStorage.setItem('isLoggedIn', 'true');
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error('Invalid credentials. Try: officer / forest123');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-900 via-forest-800 to-earth-900">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Shield className="mx-auto h-16 w-16 text-forest-400 mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">
              {t('login.title')}
            </h1>
            <p className="text-forest-300">
              Secure access to forest monitoring system
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-forest-700">
            <CardHeader>
              <CardTitle className="text-white text-center">
                Access Control
              </CardTitle>
              <CardDescription className="text-forest-300 text-center">
                Enter your credentials to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{t('login.username')}</span>
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-white/10 border-forest-600 text-white placeholder-forest-400"
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white flex items-center space-x-2">
                    <Lock className="h-4 w-4" />
                    <span>{t('login.password')}</span>
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-forest-600 text-white placeholder-forest-400"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-forest-600 hover:bg-forest-700 text-white py-3 font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? t('common.loading') : t('login.submit')}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-forest-800/50 rounded-lg">
                <p className="text-sm text-forest-300 text-center">
                  Demo credentials:<br />
                  Username: <span className="text-white font-mono">officer</span><br />
                  Password: <span className="text-white font-mono">forest123</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
