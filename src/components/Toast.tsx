import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Heart, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="px-4 py-2.5 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-xs text-white max-w-sm">
        {toast.type === 'heart' ? (
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
        ) : toast.type === 'success' ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        ) : (
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
        )}
        <span className="font-medium">{toast.message}</span>
      </div>
    </div>
  );
};
