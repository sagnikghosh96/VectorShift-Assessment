// textNode.js
// Smart Text Node with:
// 1. Auto-resize based on text length
// 2. Variable detection ({{variableName}}) creates input Handles dynamically

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '');
  const [detectedVariables, setDetectedVariables] = useState([]);
  const [nodeHeight, setNodeHeight] = useState(100);
  const [nodeWidth, setNodeWidth] = useState(250);
  const textInputRef = useRef(null);
  const contentRef = useRef(null);

  // Extract and detect variables
  useEffect(() => {
    const variables = new Set();
    const variableRegex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    let match;

    while ((match = variableRegex.exec(currText)) !== null) {
      variables.add(match[1]);
    }

    setDetectedVariables(Array.from(variables));
  }, [currText]);

  // Calculate dynamic width and height
  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      const contentWidth = contentRef.current.scrollWidth;

      // Add padding
      setNodeHeight(Math.max(100, contentHeight + 60));
      setNodeWidth(Math.max(250, contentWidth + 30));
    }
  }, [currText, detectedVariables]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Dynamic height for textarea
  const calculateRows = () => {
    const lines = currText.split('\n').length;
    return Math.max(2, Math.min(lines + 1, 8));
  };

  return (
    <div
      className={`
        rounded-lg border-2 border-pink-500 p-4 bg-gradient-to-br from-slate-800 to-slate-900
        shadow-lg transition-all duration-200 hover:shadow-xl
        flex flex-col gap-3
      `}
      style={{
        width: `${nodeWidth}px`,
        height: `${nodeHeight}px`,
      }}
    >
      {/* Title */}
      <div className="flex items-center gap-2 border-b border-slate-700 pb-2">
        <span className="text-lg">📄</span>
        <h3 className="font-semibold text-sm text-red-500">Text</h3>
      </div>

      {/* Text Content */}
      <div ref={contentRef} className="flex-1 flex flex-col gap-2 overflow-hidden">
        <textarea
          ref={textInputRef}
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text (use {{variable}} syntax)"
          rows={calculateRows()}
          className="
            bg-slate-700 border border-slate-600 rounded px-2 py-1.5
            text-xs text-red-600 placeholder-red-300 resize-none flex-1
            focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500
            transition-colors font-mono
          "
        />

        {/* Variable Indicators */}
        {detectedVariables.length > 0 && (
          <div className="text-xs text-pink-300 bg-slate-700/50 rounded px-2 py-1">
            Variables: {detectedVariables.join(', ')}
          </div>
        )}
      </div>

      {/* Input Handle (permanent) */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input`}
        style={{
          top: '50%',
          backgroundColor: '#6366f1',
          border: '2px solid #0f172a',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
        }}
        title="Data Input"
      />

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          backgroundColor: '#ec4899',
          border: '2px solid #0f172a',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
        }}
        title="Text Output"
      />

      {/* Dynamic Input Handles for Variables */}
      {detectedVariables.map((variable, idx) => (
        <Handle
          key={`${id}-var-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{
            top: `${40 + (idx + 1) * 25}px`,
            backgroundColor: '#6366f1',
            border: '2px solid #0f172a',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
          }}
          title={`Variable: ${variable}`}
        />
      ))}
    </div>
  );
};