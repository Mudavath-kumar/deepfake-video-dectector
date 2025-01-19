import React, { useState, useRef } from 'react';
import { Upload, AlertCircle, FileVideo, CheckCircle2, Ban } from 'lucide-react';

interface AnalysisResult {
  isFake: boolean;
  confidence: number;
  abnormalities: string[];
  techniquesUsed: string[];
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const analyzeVideo = async () => {
    setIsAnalyzing(true);
    
    // Simulated analysis - in a real app, this would call your ML backend
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setResult({
      isFake: Math.random() > 0.5,
      confidence: Math.random() * 100,
      abnormalities: [
        'Inconsistent facial expressions',
        'Unnatural eye movements',
        'Audio-visual synchronization issues'
      ],
      techniquesUsed: [
        'Generative Adversarial Networks (GANs)',
        'Face swapping algorithms',
        'Deep learning manipulation'
      ]
    });
    
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">DeepFake Detective</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Advanced deep fake detection powered by AI. Upload a video to analyze potential manipulations
            and receive a detailed forensic report.
          </p>
        </header>

        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-8 shadow-xl mb-8">
            <div 
              className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="video/*"
                className="hidden"
              />
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">Upload Video for Analysis</h3>
              <p className="text-gray-400 mb-4">
                Drag and drop a video file here, or click to select
              </p>
              {file && (
                <div className="flex items-center justify-center text-blue-400">
                  <FileVideo className="w-5 h-5 mr-2" />
                  <span>{file.name}</span>
                </div>
              )}
            </div>

            {file && !isAnalyzing && !result && (
              <button
                onClick={analyzeVideo}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Start Analysis
              </button>
            )}

            {isAnalyzing && (
              <div className="mt-6 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Analyzing video for potential manipulations...</p>
              </div>
            )}
          </div>

          {result && (
            <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Analysis Results</h2>
                {result.isFake ? (
                  <div className="flex items-center text-red-500">
                    <Ban className="w-6 h-6 mr-2" />
                    <span className="font-semibold">Deep Fake Detected</span>
                  </div>
                ) : (
                  <div className="flex items-center text-green-500">
                    <CheckCircle2 className="w-6 h-6 mr-2" />
                    <span className="font-semibold">Likely Authentic</span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Confidence Score</span>
                  <span className="font-semibold">{result.confidence.toFixed(2)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      result.isFake ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${result.confidence}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-yellow-500" />
                    Detected Abnormalities
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    {result.abnormalities.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Suspected Techniques</h3>
                  <ul className="space-y-2 text-gray-300">
                    {result.techniquesUsed.map((technique, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {technique}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;