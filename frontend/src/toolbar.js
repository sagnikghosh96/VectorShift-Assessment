// toolbar.js
// toolbar.js
// Updated toolbar with all node types

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-sm font-semibold text-slate-100 mb-3">
          Pipeline Builder
        </h2>

        {/* Node Groups */}
        <div className="flex flex-wrap gap-6">
          {/* Input/Output */}
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase mb-2">
              I/O
            </p>
            <div className="flex gap-2">
              <DraggableNode type="customInput" label="Input" icon="📥" />
              <DraggableNode type="customOutput" label="Output" icon="📤" />
            </div>
          </div>

          {/* Processing */}
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase mb-2">
              Processing
            </p>
            <div className="flex gap-2">
              <DraggableNode type="text" label="Text" icon="📄" />
              <DraggableNode type="math" label="Math" icon="🔢" />
              <DraggableNode type="filter" label="Filter" icon="🔍" />
            </div>
          </div>

          {/* Advanced */}
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase mb-2">
              Advanced
            </p>
            <div className="flex gap-2">
              <DraggableNode type="llm" label="LLM" icon="🤖" />
              <DraggableNode type="api" label="API" icon="🌐" />
              <DraggableNode type="database" label="Database" icon="🗄️" />
              <DraggableNode type="summarizer" label="Summarizer" icon="📝" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};