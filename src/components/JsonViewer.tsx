
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, Building, Calendar } from 'lucide-react';

interface JsonViewerProps {
  data: Record<string, any>;
}

const getIconForKey = (key: string) => {
  if (key.includes('revenue') || key.includes('income') || key.includes('profit') || key.includes('eps')) {
    return <DollarSign className="h-4 w-4 text-green-600" />;
  }
  if (key.includes('expenses') || key.includes('liabilities')) {
    return <TrendingUp className="h-4 w-4 text-red-600" />;
  }
  if (key.includes('company')) {
    return <Building className="h-4 w-4 text-blue-600" />;
  }
  if (key.includes('year') || key.includes('date')) {
    return <Calendar className="h-4 w-4 text-purple-600" />;
  }
  return <div className="h-4 w-4 bg-blue-400 rounded-full" />;
};

const formatKey = (key: string): string => {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getValueColor = (key: string, value: string): string => {
  if (key.includes('revenue') || key.includes('income') || key.includes('profit') || key.includes('assets') || key.includes('equity')) {
    return 'text-green-700 bg-green-50 border-green-200';
  }
  if (key.includes('expenses') || key.includes('liabilities')) {
    return 'text-red-700 bg-red-50 border-red-200';
  }
  return 'text-blue-700 bg-blue-50 border-blue-200';
};

export const JsonViewer: React.FC<JsonViewerProps> = ({ data }) => {
  const entries = Object.entries(data);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {entries.map(([key, value], index) => (
          <Card key={key} className="p-4 border-blue-100 hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-white to-blue-50/30">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3 flex-1">
                {getIconForKey(key)}
                <div className="flex-1">
                  <p className="font-medium text-blue-800 text-sm">
                    {formatKey(key)}
                  </p>
                  <Badge 
                    variant="secondary" 
                    className={`mt-2 font-mono text-sm ${getValueColor(key, String(value))}`}
                  >
                    {String(value)}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">Raw JSON Output</h4>
        <pre className="text-xs text-blue-600 overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};
