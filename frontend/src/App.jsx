import "./App.css"
import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import Terminal from "../components/ui/Terminal.jsx";
import SchemaBuilder from "../components/features/SchemaBuilder.jsx";

export default function App() {
  const API_BASE = import.meta.env.VITE_API_URL || "";
  // Configuration States
  const [endpointPath, setEndpointPath] = useState("");
  const [fields, setFields] = useState([{ fieldName: "", fieldType: "" }]);
  
  // UI Feedback States
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  // Terminal States
  const [mockData, setMockData] = useState(null);
  const [isFetchingData, setIsFetchingData] = useState(false);

  const handleSave = async () => {
    if (!endpointPath) {
      setStatusMsg({ type: "error", text: "Endpoint path is required." });
      return;
    }
    
    setIsSaving(true);
    setStatusMsg(null);
    setIsSaved(false);
    setMockData(null);

    try {
      const response = await fetch(`${API_BASE}/api/create-endpoint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpointPath: endpointPath,
          responseSchema: fields 
        })
      });

      if (response.ok) {
        setStatusMsg({ type: "success", text: "Blueprint saved to database successfully!" });
        setIsSaved(true);
      } else {
        setStatusMsg({ type: "error", text: "Failed to save blueprint. Check terminal." });
      }
    } catch (error) {
      setStatusMsg({ type: "error", text: "Network error. Is your backend server running?" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestEndpoint = async () => {
    setIsFetchingData(true);
    try {
      const response = await fetch(`${API_BASE}/mock/${endpointPath}`);
      if (response.ok) {
        const data = await response.json();
        setMockData(data);
      } else {
        setMockData({ error: "Endpoint not found or failed to generate." });
      }
    } catch (error) {
      setMockData({ error: "Network error fetching mock data." });
    } finally {
      setIsFetchingData(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-10rem)]">
        
        {/* LEFT COLUMN: Configuration Card */}
        <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden h-full min-h-0">
          
          <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center `flex-shrink-0`">
            <div>
              <h3 className="text-lg font-semibold text-slate-200">Create API Endpoint</h3>
              <p className="text-slate-500 text-sm mt-1">Define the path and structure for your mock data generation.</p>
            </div>
          </div>

          <div className="p-6 space-y-8 overflow-y-auto flex-1 custom-scrollbar">
            <div className="max-w-full">
              <Input 
                label="Endpoint Path" 
                placeholder="e.g. portfolio-app/users" 
                value={endpointPath}
                onChange={(e) => setEndpointPath(e.target.value)}
              />
            </div>
            
            <div className="border-t border-slate-800/80 pt-6">
              <h4 className="text-sm font-medium text-slate-300 mb-4 tracking-wide">RESPONSE SCHEMA</h4>
              <SchemaBuilder fields={fields} setFields={setFields} />
            </div>
            
            <div className="pt-6 border-t border-slate-800/80 flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="whitespace-nowrap">
                  <Button variant="primary" onClick={handleSave}>
                    {isSaving ? "Saving..." : "Save Blueprint"}
                  </Button>
                </div>
                <Button variant="secondary">Cancel</Button>
              </div>
              
              {statusMsg && (
                <span className={`text-sm ${statusMsg.type === 'error' ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {statusMsg.text}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Terminal */}
        <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden h-full min-h-0">
          
          <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center `flex-shrink-0`">
            <div>
              <h3 className="text-lg font-semibold text-slate-200">Live Response</h3>
              <p className="text-slate-500 text-sm mt-1">Test your mock data generation instantly.</p>
            </div>
            {isSaved && (
              <Button variant="secondary" onClick={handleTestEndpoint}>
                <svg className="w-4 h-4 inline-block mr-2 mb-1 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Test Endpoint
              </Button>
            )}
          </div>
          
          <div className="flex-1 min-h-0 p-6">
            <Terminal data={mockData} isLoading={isFetchingData} />
          </div>
          
        </div>
      </div>
    </DashboardLayout>
  );
}