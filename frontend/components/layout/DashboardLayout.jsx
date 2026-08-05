export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <h1 className="text-lg font-bold text-slate-100 tracking-wide">
            GhostRoute
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2 text-lg">
          <div className="px-3 py-2 bg-indigo-500/10 text-indigo-400 rounded-md border border-indigo-500/20 cursor-pointer">
            Schema Builder
          </div>
          <div className="px-3 py-2 hover:bg-slate-800 text-slate-400 rounded-md transition-colors cursor-pointer">
            Vault Library
          </div>
        </nav>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* TOP HEADER */}
        <header className="h-16 flex items-center px-8 border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
          <h2 className="text-lg font-medium text-slate-400">
            Workspace / <span className="text-slate-100">New Endpoint</span>
          </h2>
        </header>

        {/* DYNAMIC CONTENT CANVAS */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </div>
      </main>

    </div>
  );
}