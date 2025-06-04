
import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { JsonViewer } from '@/components/JsonViewer';
import { HelpSection } from '@/components/HelpSection';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Search, FileText, Zap } from 'lucide-react';

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
        description: "Please select a PDF file before analyzing.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    console.log('Starting FinSightAI analysis for:', selectedFile.name);
    
    try {
      const data = await simulateAIProcessing();
      setExtractedData(data);
      toast({
        title: "Analysis Complete!",
        description: "FinSightAI has successfully extracted financial insights from your PDF.",
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: "Analysis Failed",
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
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-900 to-cyan-600 p-4 rounded-xl mr-4 shadow-lg">
              <Search className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 to-cyan-600 bg-clip-text text-transparent">
              🔍 FinSightAI
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-4">
            AI-Powered Extraction of Financial Insights from PDFs
          </h2>
          <p className="text-lg text-blue-700 max-w-4xl mx-auto leading-relaxed">
            Upload any financial report and extract structured data like revenue, net income, and year—powered by cutting-edge multimodal vision-language models.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload and Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-blue-900">
                  <FileText className="h-5 w-5 mr-2" />
                  Upload Your Financial PDF Report
                </CardTitle>
                <CardDescription className="text-blue-600">
                  Supported formats: PDF | Ensure the report includes clear financial statements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload onFileSelect={handleFileSelect} />
                
                {selectedFile && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
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
                  className="w-full mt-6 bg-gradient-to-r from-blue-900 to-cyan-600 hover:from-blue-800 hover:to-cyan-500 text-white font-semibold py-6 text-lg rounded-xl shadow-lg transition-all duration-200"
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <LoadingSpinner size="sm" className="mr-2" />
                      Analyzing...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Zap className="h-5 w-5 mr-2" />
                      Analyze Report with FinSightAI
                    </div>
                  )}
                </Button>
                
                <p className="text-xs text-blue-600 mt-3 text-center">
                  FinSightAI uses Donut Transformer to analyze and extract key financial insights from PDF documents.
                </p>
              </CardContent>
            </Card>

            <HelpSection />
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl h-full bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg">
                <CardTitle className="text-blue-900 flex items-center">
                  📈 Extracted Financial Insights
                </CardTitle>
                <CardDescription className="text-blue-700">
                  Here's what FinSightAI found in your document:
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <LoadingSpinner size="lg" className="mb-4" />
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      FinSightAI Processing in Progress
                    </h3>
                    <p className="text-blue-600 text-center max-w-md">
                      Our Donut transformer model is analyzing your PDF and extracting financial insights...
                    </p>
                    <div className="mt-6 text-sm text-blue-500 animate-pulse-slow">
                      This usually takes 30-60 seconds
                    </div>
                  </div>
                ) : extractedData ? (
                  <JsonViewer data={extractedData} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-6 rounded-full mb-4">
                      <FileText className="h-16 w-16 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      Ready to Extract Insights
                    </h3>
                    <p className="text-blue-600 max-w-md">
                      Upload a financial PDF report and click "Analyze Report with FinSightAI" to see AI-powered analysis results here.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 py-6 border-t border-blue-100">
          <p className="text-sm text-blue-600">
            Built by DT | Powered by Hugging Face + Donut Transformer
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
