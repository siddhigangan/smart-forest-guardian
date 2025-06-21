
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { TreePine, Map, AlertTriangle, User } from 'lucide-react';
import LanguageToggle from './LanguageToggle';

const Navigation = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { to: '/', label: t('nav.home'), icon: TreePine },
    { to: '/dashboard', label: t('nav.map'), icon: Map },
    { to: '/report', label: t('nav.report'), icon: AlertTriangle },
    { to: '/login', label: t('nav.login'), icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-forest-950/95 backdrop-blur-sm border-b border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <TreePine className="h-8 w-8 text-forest-400" />
            <span className="text-xl font-bold text-white">Smart Forest</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-forest-400 bg-forest-900'
                      : 'text-gray-300 hover:text-white hover:bg-forest-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
