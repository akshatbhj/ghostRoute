import "./App.css";
import DashboardLayout from "../components/layout/DashboardLayout";

function App() {
  return (
    <>
      <DashboardLayout>
        <div className="p-6 border border-slate-800 rounded-xl bg-slate-900/50 border-dashed">
          <h3 className="text-xl font-semibold text-slate-200 mb-2">
            API Schema Configuration
          </h3>
          <p className="text-slate-500 text-sm">
             Input components will be injected here.
          </p>
        </div>
      </DashboardLayout>
    </>
  );
}

export default App;
