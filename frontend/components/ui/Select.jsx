import { useState, useRef, useEffect } from "react";

export default function Select({ label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close the dropdown if the user clicks anywhere outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col space-y-1.5 w-full" ref={dropdownRef}>
      {label && (
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* The Clickable Box */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-slate-950/50 border rounded-md px-3 py-2 text-sm cursor-pointer flex justify-between items-center transition-all shadow-sm ${
            isOpen 
              ? "border-indigo-500 ring-1 ring-indigo-500 text-slate-200" 
              : "border-slate-800 text-slate-200 hover:border-slate-700"
          }`}
        >
          <span className={value ? "text-slate-200" : "text-slate-600"}>
            {value || "Select a type..."}
          </span>
          <svg 
            className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* The Custom Pop-up Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-700 rounded-md shadow-xl overflow-hidden">
            <ul className="max-h-60 overflow-auto py-1">
              {options.map((opt) => (
                <li
                  key={opt}
                  onClick={() => {
                    onChange({ target: { value: opt } });
                    setIsOpen(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                    value === opt 
                      ? "bg-indigo-500/20 text-indigo-300 font-medium" 
                      : "text-slate-300 hover:bg-slate-700 hover:text-slate-100"
                  }`}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}