// App.js
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-slate-950 to-slate-900 overflow-hidden">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 px-6 py-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="text-3xl">⚡</div>
          <div>
            <h1 className="text-2xl font-bold text-white">VectorShift Pipeline</h1>
            <p className="text-xs text-slate-400">Visual DAG Builder</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <PipelineToolbar />

        {/* Canvas */}
        <div className="flex-1 overflow-hidden">
          <PipelineUI />
        </div>

        {/* Submit Button */}
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
