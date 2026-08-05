export default function Button({ children, onClick, variant = "primary" }) {
  const baseStyles = "px-6 py-2 text-lg font-medium rounded-md transition-all shadow-sm active:scale-95";
  
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500 cursor-pointer",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700",
    danger: "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}