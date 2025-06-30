
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

const History = () => {
  const { analysisHistory } = useApp();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getTopCondition = (results: any[]) => {
    if (results.length === 0) return 'No conditions detected';
    const topResult = results.reduce((prev, current) => 
      (prev.confidence > current.confidence) ? prev : current
    );
    return `${topResult.name} (${topResult.confidence}%)`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/upload"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Upload
          </Link>
          
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Analysis History
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Review your past skin analyses and results
            </p>
          </div>
        </div>

        {analysisHistory.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Analysis History
            </h3>
            <p className="text-gray-600 mb-6">
              You haven't performed any skin analyses yet. Upload an image to get started.
            </p>
            <Link
              to="/upload"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Analysis
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysisHistory.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square">
                  <img
                    src={item.image}
                    alt="Analysis"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatDate(item.timestamp)}
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Top Result: {getTopCondition(item.results)}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {item.results.length} condition{item.results.length !== 1 ? 's' : ''} detected
                  </p>
                  
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
