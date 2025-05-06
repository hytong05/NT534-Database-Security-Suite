// src/App.jsx
import { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // Updated to use the new backend URL
      const response = await fetch('http://10.0.2.148:9000/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to execute query');
      }
      
      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">SQL Query Application</h1>
        
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="mb-4">
            <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-2">
              SQL Query
            </label>
            <textarea
              id="query"
              rows="5"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your SQL query here..."
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isLoading || !query.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none disabled:opacity-50"
            >
              {isLoading ? 'Executing...' : 'Execute Query'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Error: {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {results && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Results</h2>
            <div className="text-sm text-gray-600 mb-2">
              {results.rowCount} row(s) returned
            </div>
            
            {results.rows && results.rows.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {results.fields && results.fields.map((field, i) => (
                        <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {field.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {results.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {Object.keys(row).map((key, cellIndex) => (
                          <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {row[key] !== null ? String(row[key]) : 'NULL'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                Query executed successfully, but no data was returned.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;