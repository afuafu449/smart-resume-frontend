// === src/App.jsx ===
import { useState } from 'react';
import './index.css';

const API_BASE = "https://resume-backend-6dsy.onrender.com";

export default function App() {
  const [resume, setResume] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);

  const getSuggestions = async () => {
    setLoading(true);
    setSuggestions("");
    try {
      const response = await fetch(`${API_BASE}/api/suggest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeText: resume }),
      });

      const data = await response.json();
      setSuggestions(data.suggestions || "No suggestions received.");
    } catch (error) {
      setSuggestions("Error fetching suggestions.");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Smart Resume Builder</h1>
      <textarea
        className="w-full p-3 border rounded-md mb-4 h-60"
        placeholder="Paste your resume here..."
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      ></textarea>
      <button
        onClick={getSuggestions}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Loading...' : 'Get AI Suggestions'}
      </button>
      {suggestions && (
        <div className="mt-6 p-4 bg-white shadow rounded">
          <h2 className="text-xl font-semibold mb-2">Suggestions:</h2>
          <pre className="whitespace-pre-wrap text-sm">{suggestions}</pre>
        </div>
      )}
    </div>
  );
} // end
