import React from 'react';
import { useApp } from '../context/AppContext';

export const MobileBottomNav: React.FC = () => {
  const { 
    activeBottomNav, 
    setActiveBottomNav, 
    setSelectedCategory,
    setIsCvModalOpen,
    showToast
  } = useApp();

  const handleNavClick = (tab: 'opportunites' | 'forum-entraide' | 'cercles-clubs' | 'insertion-pro-cv') => {
    setActiveBottomNav(tab);

    if (tab === 'opportunites') {
      setSelectedCategory('all');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'forum-entraide') {
      showToast('Espace Entraide & Conseils Étudiants ouvert', 'info');
      setSelectedCategory('conferences');
    } else if (tab === 'cercles-clubs') {
      showToast('Cercles, Clubs & Associations Étudiantes', 'info');
      setSelectedCategory('sorties');
    } else if (tab === 'insertion-pro-cv') {
      setIsCvModalOpen(true);
    }
  };

  return (
    <>
      {/* Fixed Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 w-full z-40 pb-safe bg-[#faf8ff]/90 backdrop-blur-xl border-t border-[#eaedff] shadow-[0_-2px_12px_rgba(0,0,0,0.05)]">
        <div className="max-w-md mx-auto flex justify-around items-center h-16 sm:h-20 px-2">
          
          {/* Opportunités */}
          <button
            onClick={() => handleNavClick('opportunites')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[44px] py-1 transition-all cursor-pointer ${
              activeBottomNav === 'opportunites' ? 'text-[#00629d] font-bold' : 'text-[#44474c] hover:text-[#131b2e]'
            }`}
          >
            <span 
              className="material-symbols-outlined text-[24px]" 
              style={{ fontVariationSettings: activeBottomNav === 'opportunites' ? "'FILL' 1" : "'FILL' 0" }}
            >
              explore
            </span>
            <span className="text-[11px] leading-tight">Opportunités</span>
          </button>

          {/* Entraide */}
          <button
            onClick={() => handleNavClick('forum-entraide')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[44px] py-1 transition-all cursor-pointer ${
              activeBottomNav === 'forum-entraide' ? 'text-[#00629d] font-bold' : 'text-[#44474c] hover:text-[#131b2e]'
            }`}
          >
            <span 
              className="material-symbols-outlined text-[24px]"
              style={{ fontVariationSettings: activeBottomNav === 'forum-entraide' ? "'FILL' 1" : "'FILL' 0" }}
            >
              forum
            </span>
            <span className="text-[11px] leading-tight">Entraide</span>
          </button>

          {/* Cercles */}
          <button
            onClick={() => handleNavClick('cercles-clubs')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[44px] py-1 transition-all cursor-pointer ${
              activeBottomNav === 'cercles-clubs' ? 'text-[#00629d] font-bold' : 'text-[#44474c] hover:text-[#131b2e]'
            }`}
          >
            <span 
              className="material-symbols-outlined text-[24px]"
              style={{ fontVariationSettings: activeBottomNav === 'cercles-clubs' ? "'FILL' 1" : "'FILL' 0" }}
            >
              diversity_3
            </span>
            <span className="text-[11px] leading-tight">Cercles</span>
          </button>

          {/* Insertion Pro */}
          <button
            onClick={() => handleNavClick('insertion-pro-cv')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[44px] py-1 transition-all cursor-pointer ${
              activeBottomNav === 'insertion-pro-cv' ? 'text-[#00629d] font-bold' : 'text-[#44474c] hover:text-[#131b2e]'
            }`}
          >
            <span 
              className="material-symbols-outlined text-[24px]"
              style={{ fontVariationSettings: activeBottomNav === 'insertion-pro-cv' ? "'FILL' 1" : "'FILL' 0" }}
            >
              auto_awesome_motion
            </span>
            <span className="text-[11px] leading-tight">Insertion Pro</span>
          </button>

        </div>
      </nav>
    </>
  );
};
