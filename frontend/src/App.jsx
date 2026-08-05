import "./App.css";
import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import SchemaBuilder from "../components/features/SchemaBuilder";

function App() {
  const [endpointPath, setEndpointPath] = useState("");

  const handleSave = () => {
    console.log("Saving endpoint:", endpointPath);
    // Next step: We will connect this to our API service!
  };
  return (
    <>
      <DashboardLayout>
        <div className="p-6 border border-slate-800 rounded-xl bg-slate-900/50 border-dashed">
          {/* Card Header */}
          <div className="px-6 py-6 border-b border-slate-800 bg-slate-900/50">
            <h3 className="text-3xl font-semibold text-slate-200">
              Create API Endpoint
            </h3>
            <p className="text-slate-500 text-lg mt-1">
              Define the path and structure for your mock data generation.
            </p>
          </div>

          {/* Card Body */}
          <div className="p-6 space-y-6">
            {/* Section 1: The Path */}
            <div className="max-w-md">
              <Input
                label="Endpoint Path"
                placeholder="e.g. portfolio-app/users"
                value={endpointPath}
                onChange={(e) => setEndpointPath(e.target.value)}
              />
            </div>

            {/* Section 2: The Dynamic Builder */}
            <div className="border-t border-slate-800/80 pt-6">
              <h4 className="text-sm font-medium text-slate-300 mb-4 tracking-wide">
                RESPONSE SCHEMA
              </h4>
              <SchemaBuilder />
            </div>

            {/* Section 3: Actions */}
            <div className="flex items-center gap-3 pt-6 border-t border-slate-800/80">
              <Button variant="primary" onClick={handleSave}>
                Save Blueprint
              </Button>
              <Button variant="secondary">Cancel</Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default App;
