import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function VoiceAssistantOmni() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'query' | 'report'>('query');
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleSend = async () => {
    setLoading(true);
    const endpoint = mode === 'query'
      ? 'http://localhost:8000/voice-query'
      : 'http://localhost:8000/voice-report';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: transcript }),
    });
    const data = await res.json();
    setResponse(mode === 'query' ? data.response : 'Report submitted!');
    setLoading(false);
    resetTranscript();
  };

  return (
    <div className="p-4 bg-gray-900 rounded-lg shadow-lg mb-4">
      <div className="mb-2">
        <button
          onClick={() => setMode('query')}
          className={`mr-2 px-3 py-1 rounded ${mode === 'query' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Ask Transit Question
        </button>
        <button
          onClick={() => setMode('report')}
          className={`px-3 py-1 rounded ${mode === 'report' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          Report Issue
        </button>
      </div>
      <button
        onClick={SpeechRecognition.startListening}
        disabled={listening}
        className="mr-2 px-3 py-1 bg-blue-600 text-white rounded"
      >
        {listening ? 'Listening...' : 'Start Voice Input'}
      </button>
      <button
        onClick={resetTranscript}
        className="mr-2 px-3 py-1 bg-gray-400 text-white rounded"
      >
        Reset
      </button>
      <button
        onClick={handleSend}
        disabled={loading || !transcript}
        className="px-3 py-1 bg-indigo-600 text-white rounded"
      >
        {loading ? 'Sending...' : (mode === 'query' ? 'Ask' : 'Report')}
      </button>
      <div className="mt-2">
        <strong>Your input:</strong> {transcript}
      </div>
      <div className="mt-2">
        <strong>{mode === 'query' ? 'Agent response:' : 'Status:'}</strong> {response}
      </div>
    </div>
  );
} 