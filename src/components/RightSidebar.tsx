import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Sparkles, 
  Smartphone, 
  Building2, 
  ExternalLink, 
  FileText,
  HelpCircle,
  CheckCircle2,
  Award,
  ArrowRight
} from 'lucide-react';

export const RightSidebar: React.FC = () => {
  const { 
    posts, 
    setJobSectorFilter,
    setSearchQuery,
    setSelectedCategory,
    startChatWithPostAuthor,
    viewMode,
    setViewMode,
    showToast 
  } = useApp();

  const boostedPosts = posts.filter(p => p.isBoosted && p.status === 'approved');

  const filterByInstitution = (instName: string) => {
    setJobSectorFilter('public_ministry');
    setSearchQuery(instName);
    showToast(`Filtrage actif : opportunités de "${instName}"`, 'info');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  return (
    <aside className="space-y-4">
      
      {/* Test sur Téléphone & PWA / APK Info */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-[#00629d] to-[#00a2fd] text-white shadow-md space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Smartphone className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#ffddb8]">Test Mobile &amp; APK</span>
        </div>
        <h3 className="font-bold text-base leading-snug">
          Testez l&apos;application sur votre smartphone
        </h3>
        <p className="text-xs text-white/90 leading-relaxed">
          Ouvrez le lien de partage sur votre téléphone pour ajouter ENTR&apos;AIDE RDC à votre écran d&apos;accueil (Web APK).
        </p>
        <button
          onClick={() => {
            setViewMode(viewMode === 'mobile_shell' ? 'responsive_full' : 'mobile_shell');
            showToast(viewMode === 'mobile_shell' ? 'Vue Web activée' : 'Simulateur Android activé !', 'info');
          }}
          className="w-full py-2.5 rounded-full bg-white text-[#00629d] hover:bg-[#eaedff] font-bold text-xs shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>{viewMode === 'mobile_shell' ? 'Basculer en Plein Écran' : 'Simuler l’écran smartphone'}</span>
        </button>
      </div>

      {/* Google Play Store / Hybrid Mobile Banner */}
      <div className="p-5 rounded-3xl bg-white border border-[#eaedff] shadow-xs space-y-2.5">
        <div className="flex items-center justify-between text-[#00629d]">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Application Hybride</span>
          </div>
          <span className="text-[10px] bg-[#eaedff] text-[#00629d] px-2 py-0.5 rounded-full font-bold">
            v2.4 RDC
          </span>
        </div>
        <h3 className="font-bold text-sm text-[#131b2e]">
          Disponible sur Google Play Store (Android)
        </h3>
        <p className="text-xs text-[#44474c] leading-relaxed">
          Application 100% en ligne optimisée pour les réseaux mobiles congolais (Vodacom, Airtel, Orange, Africell).
        </p>
        <button
          onClick={() => {
            setViewMode(viewMode === 'mobile_shell' ? 'responsive_full' : 'mobile_shell');
            showToast(viewMode === 'mobile_shell' ? 'Mode Web Bureau activé' : 'Simulateur Android Google Play activé !', 'info');
          }}
          className="w-full py-2 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] text-[#00629d] font-bold text-xs border border-[#dae2fd] transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>{viewMode === 'mobile_shell' ? 'Basculer vers Vue Web' : 'Tester le simulateur Android'}</span>
        </button>
      </div>

      {/* Official Institutions Verification */}
      <div className="p-5 rounded-3xl bg-white border border-[#eaedff] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-xs uppercase tracking-wider text-[#131b2e] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#00629d]" />
            <span>Institutions Officielles RDC</span>
          </h4>
          <span className="text-[10px] text-[#75777d]">Cliquez pour filtrer</span>
        </div>
        
        <div className="space-y-2 text-xs">
          <button
            onClick={() => filterByInstitution('ESU')}
            className="w-full p-2.5 rounded-2xl bg-[#f2f3ff] hover:bg-[#eaedff] border border-[#eaedff] flex items-center justify-between text-left transition-colors cursor-pointer group"
          >
            <div>
              <span className="font-bold text-[#131b2e] group-hover:text-[#00629d] block">Ministère de l&apos;ESU</span>
              <span className="text-[11px] text-[#44474c]">Bourses d&apos;excellence &amp; équivalences</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#d6e3fe] text-[#0e1c2f] font-bold">
              Certifié
            </span>
          </button>

          <button
            onClick={() => filterByInstitution('Fonction Publique')}
            className="w-full p-2.5 rounded-2xl bg-[#f2f3ff] hover:bg-[#eaedff] border border-[#eaedff] flex items-center justify-between text-left transition-colors cursor-pointer group"
          >
            <div>
              <span className="font-bold text-[#131b2e] group-hover:text-[#00629d] block">Fonction Publique RDC</span>
              <span className="text-[11px] text-[#44474c]">Concours d&apos;État &amp; Attachés</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#d6e3fe] text-[#0e1c2f] font-bold">
              Certifié
            </span>
          </button>

          <button
            onClick={() => filterByInstitution('ONEM')}
            className="w-full p-2.5 rounded-2xl bg-[#f2f3ff] hover:bg-[#eaedff] border border-[#eaedff] flex items-center justify-between text-left transition-colors cursor-pointer group"
          >
            <div>
              <span className="font-bold text-[#131b2e] group-hover:text-[#00629d] block">ONEM RDC</span>
              <span className="text-[11px] text-[#44474c]">Office National de l&apos;Emploi</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#d6e3fe] text-[#0e1c2f] font-bold">
              Certifié
            </span>
          </button>
        </div>
      </div>

      {/* Boosted Opportunities */}
      {boostedPosts.length > 0 && (
        <div className="p-5 rounded-3xl bg-white border border-[#ffddb8] shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#b87500] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>En Vedette (Sponsorisées)</span>
            </h4>
            <span className="text-[10px] font-bold text-[#00629d]">{boostedPosts.length} actives</span>
          </div>

          <div className="space-y-2 text-xs">
            {boostedPosts.map(bp => (
              <button
                key={bp.id}
                onClick={() => {
                  startChatWithPostAuthor(bp);
                  showToast(`Ouverture de la candidature pour "${bp.title}"`, 'info');
                }}
                className="w-full text-left p-3 rounded-2xl bg-[#ffddb8]/20 hover:bg-[#ffddb8]/40 border border-[#ffddb8]/60 space-y-1 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#131b2e] group-hover:text-[#00629d] block line-clamp-1">
                    {bp.title}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#b87500] shrink-0" />
                </div>
                <span className="text-[11px] text-[#44474c] block">
                  {bp.authorOrg || bp.authorName} · {bp.city}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

    </aside>
  );
};
