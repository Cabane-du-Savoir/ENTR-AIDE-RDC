import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Briefcase, 
  GraduationCap, 
  MessageSquare, 
  FileText, 
  ArrowRight,
  HelpCircle,
  Users
} from 'lucide-react';

export const QuickGuideModal: React.FC = () => {
  const { 
    isGuideOpen, 
    setIsGuideOpen, 
    setSelectedCategory, 
    setIsCvModalOpen,
    setIsAdminOpen,
    switchRole
  } = useApp();

  if (!isGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white text-[#131b2e] border border-[#eaedff] rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#eaedff] bg-[#f2f3ff] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#eaedff] text-[#00629d]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#131b2e] tracking-tight flex items-center gap-2">
                <span>Bienvenue sur ENTR&apos;AIDE RDC</span>
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-[#ffddb8] text-[#b87500]">
                  Guide Rapide
                </span>
              </h2>
              <p className="text-xs text-[#44474c] mt-0.5">
                La plateforme officielle pour la réussite et l&apos;épanouissement des étudiants congolais
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsGuideOpen(false)}
            className="p-1.5 rounded-xl text-[#44474c] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Interactive Feature Steps */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            {/* Step 1: Opportunités & Bourses */}
            <div className="p-4 rounded-2xl bg-[#faf8ff] border border-[#eaedff] space-y-2">
              <div className="flex items-center gap-2 text-[#00629d] font-bold text-sm">
                <div className="w-7 h-7 rounded-lg bg-[#eaedff] flex items-center justify-center text-xs">
                  1
                </div>
                <span>Trouvez vos opportunités</span>
              </div>
              <p className="text-xs text-[#44474c] leading-relaxed">
                Parcourez les offres de stages (privé &amp; ministères), bourses d&apos;excellence, hackathons et activités de loisirs à <strong>Kinshasa, Lubumbashi, Goma</strong> et dans toutes les provinces.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('stages');
                  setIsGuideOpen(false);
                }}
                className="text-xs text-[#00629d] font-semibold hover:underline flex items-center gap-1 pt-1"
              >
                <span>Voir les offres de stages</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 2: Postuler en 1 Clic */}
            <div className="p-4 rounded-2xl bg-[#faf8ff] border border-[#eaedff] space-y-2">
              <div className="flex items-center gap-2 text-[#00629d] font-bold text-sm">
                <div className="w-7 h-7 rounded-lg bg-[#eaedff] flex items-center justify-center text-xs">
                  2
                </div>
                <span>Postulez avec votre CV</span>
              </div>
              <p className="text-xs text-[#44474c] leading-relaxed">
                Votre profil étudiant contient votre CV prêt à être téléchargé ou transmis directement en 1 clic aux recruteurs lors de vos candidatures.
              </p>
              <button
                onClick={() => {
                  setIsCvModalOpen(true);
                  setIsGuideOpen(false);
                }}
                className="text-xs text-[#00629d] font-semibold hover:underline flex items-center gap-1 pt-1"
              >
                <span>Consulter ma CVthèque</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 3: Chat Direct Recruteurs */}
            <div className="p-4 rounded-2xl bg-[#faf8ff] border border-[#eaedff] space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-xs">
                  3
                </div>
                <span>Messagerie Directe Sécurisée</span>
              </div>
              <p className="text-xs text-[#44474c] leading-relaxed">
                Discutez directement avec les entreprises (Vodacom, Rawbank), le Ministère de l&apos;ESU et les délégués pour poser vos questions sans intermédiaire.
              </p>
            </div>

            {/* Step 4: Modération & Anti-Arnaque */}
            <div className="p-4 rounded-2xl bg-[#faf8ff] border border-[#eaedff] space-y-2">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-xs">
                  4
                </div>
                <span>Zéro Arnaque · 100% Vérifié</span>
              </div>
              <p className="text-xs text-[#44474c] leading-relaxed">
                Toutes les offres soumises passent obligatoirement par une modération manuelle administrative avant diffusion pour protéger les étudiants.
              </p>
              <button
                onClick={() => {
                  setIsAdminOpen(true);
                  setIsGuideOpen(false);
                }}
                className="text-xs text-rose-700 font-semibold hover:underline flex items-center gap-1 pt-1"
              >
                <span>Inspecter le panneau admin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Quick Role Simulation Hint */}
          <div className="p-4 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] text-xs text-[#44474c] space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#131b2e]">
              <Users className="w-4 h-4 text-[#00629d]" />
              <span>Tester facilement les 5 profils du cahier des charges :</span>
            </div>
            <p className="leading-relaxed">
              Utilisez le menu déroulant en haut à droite pour basculer instantanément entre :
              <strong> Simple Étudiant</strong>, <strong>Délégué de promotion</strong>, <strong>Association</strong>, <strong>Recruteur</strong> ou <strong>Ministère de l&apos;ESU</strong>.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => { switchRole('student'); setIsGuideOpen(false); }}
                className="px-2.5 py-1 rounded-full bg-white border border-[#eaedff] text-[#00629d] font-semibold hover:bg-[#eaedff]"
              >
                👨‍🎓 Étudiant
              </button>
              <button
                onClick={() => { switchRole('recruiter'); setIsGuideOpen(false); }}
                className="px-2.5 py-1 rounded-full bg-white border border-[#eaedff] text-[#b87500] font-semibold hover:bg-[#ffddb8]/30"
              >
                🏢 Recruteur
              </button>
              <button
                onClick={() => { switchRole('public_institution'); setIsGuideOpen(false); }}
                className="px-2.5 py-1 rounded-full bg-white border border-[#eaedff] text-[#0e1c2f] font-semibold hover:bg-[#d6e3fe]"
              >
                🏛️ Ministère ESU
              </button>
              <button
                onClick={() => { switchRole('admin'); setIsGuideOpen(false); }}
                className="px-2.5 py-1 rounded-full bg-white border border-[#eaedff] text-rose-700 font-semibold hover:bg-rose-50"
              >
                🛡️ Modérateur Admin
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-[#eaedff] bg-[#faf8ff] flex items-center justify-between">
          <span className="text-xs text-[#75777d]">
            ENTR&apos;AIDE RDC · Plateforme Étudiante Officielle
          </span>
          <button
            onClick={() => setIsGuideOpen(false)}
            className="px-5 py-2 bg-[#00629d] hover:bg-[#004a77] text-white font-bold text-xs rounded-full transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            J&apos;ai compris, explorer !
          </button>
        </div>

      </div>
    </div>
  );
};
