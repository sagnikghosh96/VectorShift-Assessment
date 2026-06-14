// submit.js
// submit.js
// Submit button with backend integration for DAG validation

import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const handleSubmit = async () => {
    if (nodes.length === 0) {
      alert('⚠️ Please add at least one node to the pipeline');
      return;
    }

    setLoading(true);

    try {
      // Send nodes and edges to backend
      const payload = {
        nodes: nodes.map((node) => ({
          id: node.id,
          type: node.type,
          data: node.data,
        })),
        edges: edges.map((edge) => ({
          source: edge.source,
          target: edge.target,
          id: edge.id,
        })),
      };

      console.log('Sending to backend:', payload);

      const response = await fetch('/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Response from backend:', data);
      setResponse(data);

      // Display alert with results
      const dagStatus = data.is_dag
        ? '✅ Valid DAG'
        : '❌ Contains cycles (not a DAG)';

      alert(
        `\n📊 Pipeline Analysis Results\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `Nodes: ${data.num_nodes}\n` +
        `Edges: ${data.num_edges}\n` +
        `DAG Status: ${dagStatus}\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━`
      );
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert(
        `❌ Error: ${error.message}\n\nMake sure the backend is running on http://127.0.0.1:8000`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 py-6 bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700">
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={loading}
        className={`
          px-8 py-3 rounded-lg font-semibold text-white
          transition-all duration-200
          ${
            loading
              ? 'bg-slate-600 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95'
          }
        `}
      >
        {loading ? '⏳ Submitting...' : '🚀 Submit Pipeline'}
      </button>

      {response && (
        <div className="text-sm font-medium">
          <span className={response.is_dag ? 'text-green-400' : 'text-red-400'}>
            {response.is_dag ? '✅ Valid DAG' : '❌ Invalid DAG'}
          </span>
          <span className="text-slate-400 ml-2">
            ({response.num_nodes} nodes, {response.num_edges} edges)
          </span>
        </div>
      )}
    </div>
  );
};