
import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { JsonViewer } from '@/components/JsonViewer';
import { HelpSection } from '@/components/HelpSection';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Brain, FileText, Zap } from 'lucide-react';

interface ExtractedData {
  company_name?: string;
  fiscal_year?: string;
  revenue?: string;
  net_income?: string;
  total_assets?: string;
  total_liabilities?: string;
  shareholders_equity?: string;
  operating_expenses?: string;
  gross_profit?: string;
  eps?: string;
}

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setExtractedData(null);
    console.log('File selected:', file.name);
  };

  const simulateAIProcessing = async (): Promise<ExtractedData> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock extracted financial data
    return {
      company_name: "TechCorp Industries",
      fiscal_year: "2023",
      revenue: "$1,245,890,000",
      net_income: "$156,789,000",
      total_assets: "$2,890,456,000",
      total_liabilities: "$1,234,567,000",
      shareholders_equity: "$1,655,889,000",
      operating_expenses: "$890,123,000",
      gross_profit: "$355,767,000",
      eps: "$4.56"
    };
  };

  const handleExtractData = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file before extracting data.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    console.log('Starting AI extraction for:', selectedFile.name);
    
    try {
      const data = await simulateAIProcessing();
      setExtractedData(data);
      toast({
        title: "Extraction Complete!",
        description: "Financial data has been successfully extracted from your PDF.",
      });
    } catch (error) {
      console.error('Extraction failed:', error);
      toast({
        title: "Extraction Failed",
        description: "There was an error processing your PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-inter">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-navy-600 p-3 rounded-xl mr-4">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy-800">
              AI Financial Report Extractor
            </h1>
          </div>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto">
            Extract structured financial data from PDF reports using advanced multimodal AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload and Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-navy-700">
                  <FileText className="h-5 w-5 mr-2" />
                  Upload Document
                </CardTitle>
                <CardDescription>
                  Select a financial PDF report to analyze
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload onFileSelect={handleFileSelect} />
                
                {selectedFile && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-green-800">File Ready:</p>
                    <p className="text-sm text-green-600 truncate">{selectedFile.name}</p>
                    <p className="text-xs text-green-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}

                <Button 
                  onClick={handleExtractData}
                  disabled={!selectedFile || isProcessing}
                  className="w-full mt-6 bg-navy-600 hover:bg-navy-700 text-white font-medium py-6 text-lg"
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <LoadingSpinner size="sm" className="mr-2" />
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Zap className="h-5 w-5 mr-2" />
                      Extract Financial Data
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>

            <HelpSection />
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg h-full">
              <CardHeader>
                <CardTitle className="text-navy-700">Extracted Financial Information</CardTitle>
                <CardDescription>
                  AI-powered analysis results from your PDF document
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <LoadingSpinner size="lg" className="mb-4" />
                    <h3 className="text-lg font-semibold text-navy-700 mb-2">
                      AI Processing in Progress
                    </h3>
                    <p className="text-navy-500 text-center max-w-md">
                      Our Donut transformer model is analyzing your PDF and extracting financial data...
                    </p>
                    <div className="mt-6 text-sm text-navy-400 animate-pulse-slow">
                      This usually takes 30-60 seconds
                    </div>
                  </div>
                ) : extractedData ? (
                  <JsonViewer data={extractedData} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="bg-navy-100 p-4 rounded-full mb-4">
                      <FileText className="h-12 w-12 text-navy-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-navy-700 mb-2">
                      Ready to Extract Data
                    </h3>
                    <p className="text-navy-500 max-w-md">
                      Upload a financial PDF report and click "Extract Financial Data" to see AI-powered analysis results here.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
