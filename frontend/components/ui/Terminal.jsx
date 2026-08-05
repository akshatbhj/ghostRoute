export default function Terminal({ data, isLoading }) {
  return (
    <div className="w-full bg-[#0d1117] border border-slate-800 rounded-lg overflow-hidden shadow-inner">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
        </div>
        <span className="text-xs font-mono text-slate-500">JSON Preview</span>
      </div>

      {/* Terminal Canvas */}
      <div className="p-4 overflow-auto `h-[400px]`">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-slate-500 font-mono text-sm animate-pulse">
            Fetching mock data from vault...
          </div>
        ) : data ? (
          <pre className="font-mono text-sm text-emerald-400">
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ) : (
          <div className="text-slate-600 font-mono text-sm pt-2">
            // Awaiting endpoint generation...
          </div>
        )}
      </div>
    </div>
  );
}
