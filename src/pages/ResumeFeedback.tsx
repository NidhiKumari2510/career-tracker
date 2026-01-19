import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function ResumeFeedback() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setShowResults(false);
      } else {
        alert('Please upload a PDF file');
      }
    }
  };

  const handleAnalyze = () => {
    if (!file) return;

    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Resume Feedback</h2>
        <p className="text-gray-600 mt-1">Upload your resume to receive professional feedback</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="flex text-sm text-gray-600 justify-center">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  accept=".pdf"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">PDF up to 10MB</p>
          </div>
        </div>

        {file && (
          <div className="mt-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {analyzing ? 'Analyzing...' : 'Analyze Resume'}
              </button>
            </div>
          </div>
        )}
      </div>

      {showResults && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Results</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-900 mb-1">Structure</h4>
                  <p className="text-sm text-green-800">
                    Your resume follows a clear and professional structure with well-organized
                    sections. Contact information is prominently displayed.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-900 mb-1">Readability</h4>
                  <p className="text-sm text-yellow-800">
                    Consider using more bullet points to improve scanability. Recruiters typically
                    spend 6-7 seconds on initial resume reviews.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Keyword Relevance</h4>
                  <p className="text-sm text-blue-800">
                    Your resume contains relevant technical keywords for software engineering
                    positions. Consider adding industry-specific terms related to your target roles.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">1.</span>
                <span className="text-gray-700">
                  Quantify your achievements with specific metrics and numbers where possible
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">2.</span>
                <span className="text-gray-700">
                  Use action verbs to start each bullet point (e.g., Developed, Implemented,
                  Optimized)
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">3.</span>
                <span className="text-gray-700">
                  Tailor your resume for each job application by highlighting relevant skills and
                  experiences
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">4.</span>
                <span className="text-gray-700">
                  Keep your resume to one page if you have less than 5 years of experience
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Overall Score</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="w-full bg-blue-200 rounded-full h-3">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '78%' }} />
                </div>
              </div>
              <span className="text-2xl font-bold text-blue-900">78/100</span>
            </div>
            <p className="text-sm text-blue-800 mt-3">
              Your resume is in good shape. Implementing the recommendations above will help you
              stand out even more to recruiters.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
