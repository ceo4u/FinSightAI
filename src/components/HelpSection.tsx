
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, HelpCircle, Brain, Eye, FileText } from 'lucide-react';

export const HelpSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="border-0 shadow-lg">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-slate-50 transition-colors rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-navy-600" />
                <CardTitle className="text-navy-700">How It Works</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-slate-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                )}
              </Button>
            </div>
            <CardDescription>
              Learn about our AI-powered extraction technology
            </CardDescription>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Brain className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700 mb-1">Donut Transformer</h4>
                  <p className="text-slate-600">
                    Uses Naver Clova's Document Understanding Transformer, a multimodal AI model specifically trained to understand document layouts and extract structured data.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Eye className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700 mb-1">Visual Processing</h4>
                  <p className="text-slate-600">
                    Converts PDF pages to images and analyzes visual layout, text positioning, and formatting to understand financial document structure.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <FileText className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700 mb-1">Structured Output</h4>
                  <p className="text-slate-600">
                    Extracts key financial metrics like revenue, expenses, assets, and returns them as structured JSON data for easy integration.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-xs text-amber-700">
                <strong>Note:</strong> This demo uses simulated AI processing. Connect to Supabase to implement real PDF processing with the Donut model.
              </p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
