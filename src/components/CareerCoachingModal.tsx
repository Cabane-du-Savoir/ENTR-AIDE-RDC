import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  Send, 
  MessageSquare, 
  BrainCircuit, 
  Lightbulb,
  Award
} from 'lucide-react';

export const CareerCoachingModal: React.FC = () => {
  const { isCoachingModalOpen, setIsCoachingModalOpen, currentUser, setIsCvModalOpen } = useApp();

  const [activeTab, setActiveTab] = useState<'cv_review' | 'interview_prep' | 'market_tips'>('cv_review');
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(true);

  if (!isCoachingModalOpen) return null;

  const handleRunAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white text-[#131b2e] border border-[#eaedff] rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#eaedff] bg-[#f2f3ff] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00629d] text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#131b2e] tracking-tight flex items-center gap-2">
                <span>Coaching Carrière &amp; Insertion Pro IA</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#ffddb8] text-[#b87500]">
                  IA Congolaise
                </span>
              </h2>
              <p className="text-xs text-[#44474c] mt-0.5">
                Optimisez votre profil pour les recruteurs à Kinshasa, Lubumbashi et en provinces
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCoachingModalOpen(false)}
            className="p-1.5 rounded-xl text-[#44474c] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 pt-3 flex gap-2 border-b border-[#eaedff] text-xs font-semibold bg-[#faf8ff]">
          <button
            onClick={() => setActiveTab('cv_review')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'cv_review'
                ? 'border-[#00629d] text-[#00629d] font-bold'
                : 'border-transparent text-[#44474c] hover:text-[#131b2e]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Audit de mon CV</span>
          </button>

          <button
            onClick={() => setActiveTab('interview_prep')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'interview_prep'
                ? 'border-[#00629d] text-[#00629d] font-bold'
                : 'border-transparent text-[#44474c] hover:text-[#131b2e]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Questions d&apos;entretien RDC</span>
          </button>

          <button
            onClick={() => setActiveTab('market_tips')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'market_tips'
                ? 'border-[#00629d] text-[#00629d] font-bold'
                : 'border-transparent text-[#44474c] hover:text-[#131b2e]'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Tendances du Marché RDC</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-4">
          
          {/* TAB 1: CV Review */}
          {activeTab === 'cv_review' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#eaedff] border border-[#dae2fd] flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#131b2e]">
                      {currentUser.name}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#00629d] text-white font-medium">
                      Score CV : 88/100
                    </span>
                  </div>
                  <p className="text-xs text-[#44474c] mt-1">
                    Document analysé : <strong>{currentUser.cvFileName || 'Mon_CV_Etudiant_RDC.pdf'}</strong>
                  </p>
                </div>

                <button
                  onClick={handleRunAnalysis}
                  disabled={analyzing}
                  className="px-3.5 py-1.5 rounded-full bg-[#00629d] text-white text-xs font-semibold shadow-xs hover:bg-[#004a77] transition-all disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{analyzing ? 'Analyse...' : 'Réanalyser'}</span>
                </button>
              </div>

              {/* Recommendations List */}
              <div className="space-y-2.5">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#44474c]">
                  Points Forts &amp; Axes d&apos;Amélioration
                </h4>

                <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex items-start gap-2.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#131b2e]">Compétences techniques claires :</strong>
                    <p className="text-[#44474c] mt-0.5">
                      Vos technologies (TypeScript, React, PostgreSQL) sont très recherchées par les incubateurs et télécoms à Kinshasa (Vodacom, Orange, Silikin Village).
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#ffddb8]/30 border border-[#ffddb8] flex items-start gap-2.5 text-xs">
                  <span className="text-base leading-none">💡</span>
                  <div>
                    <strong className="text-[#b87500]">Conseil Recommandé :</strong>
                    <p className="text-[#44474c] mt-0.5">
                      Ajoutez des liens vers vos projets ou démonstrations en ligne. Les recruteurs congolais privilégient la preuve pratique des acquis académiques.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#eaedff] border border-[#dae2fd] flex items-start gap-2.5 text-xs">
                  <span className="text-base leading-none">🇨🇩</span>
                  <div>
                    <strong className="text-[#131b2e]">Mention locale essentielle :</strong>
                    <p className="text-[#44474c] mt-0.5">
                      Précisez votre commune de résidence (ex: Gombe, Lemba, Kintambo, Lubumbashi Centre) pour rassurer sur votre mobilité quotidienne.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    setIsCoachingModalOpen(false);
                    setIsCvModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#00629d] hover:bg-[#004a77] text-white font-semibold text-xs rounded-xl transition-all shadow-sm"
                >
                  <span>Mettre à jour mon CV</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Interview Prep */}
          {activeTab === 'interview_prep' && (
            <div className="space-y-3 text-xs">
              <p className="text-[#44474c]">
                Préparez-vous avec les questions réelles posées lors des entretiens de stage et premier emploi en RDC :
              </p>

              <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] space-y-1">
                <strong className="text-[#131b2e] block">
                  1. &quot;Comment appliquez-vous vos connaissances théoriques universitaires à un problème concret congolais ?&quot;
                </strong>
                <p className="text-[#44474c]">
                  <em>Astuce du coach :</em> Citez un projet d&apos;atelier de l&apos;UNIKIN, de l&apos;UPN ou de l&apos;UNILU résolvant une difficulté locale (coupures réseau, gestion d&apos;inventaire, transactions Mobile Money).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] space-y-1">
                <strong className="text-[#131b2e] block">
                  2. &quot;Quel est votre niveau de maîtrise des outils bureautiques et collaboratifs ?&quot;
                </strong>
                <p className="text-[#44474c]">
                  <em>Astuce du coach :</em> Mettez en avant votre aisance sur Excel, Google Workspace, Slack et la rédaction de rapports clairs.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] space-y-1">
                <strong className="text-[#131b2e] block">
                  3. &quot;Pourquoi souhaitez-vous effectuer votre stage chez nous plutôt qu&apos;ailleurs ?&quot;
                </strong>
                <p className="text-[#44474c]">
                  <em>Astuce du coach :</em> Montrez que vous connaissez les produits de l&apos;entreprise (ex: M-Pesa pour Vodacom, Illico pour Rawbank).
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Market Tips */}
          {activeTab === 'market_tips' && (
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#eaedff] to-[#f2f3ff] border border-[#dae2fd] space-y-2">
                <div className="flex items-center gap-2 text-[#00629d] font-bold">
                  <Award className="w-4 h-4" />
                  <span>Secteurs Porteurs pour Jeunes Diplômés en RDC</span>
                </div>
                <ul className="space-y-1.5 text-[#44474c]">
                  <li>• <strong>FinTech &amp; Mobile Money :</strong> Forte demande d&apos;ingénieurs et commerciaux.</li>
                  <li>• <strong>Génie Minier &amp; Maintenance (Katanga/Lualaba) :</strong> Postes techniques rémunérés avec prise en charge.</li>
                  <li>• <strong>Secteur Public &amp; Administration :</strong> Concours nationaux réguliers de l&apos;État pour jeunes attachés.</li>
                  <li>• <strong>Agro-business &amp; Logistique :</strong> Développement accéléré dans le Kongo Central et le Grand Kivu.</li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-[#eaedff] bg-[#faf8ff] flex items-center justify-between">
          <span className="text-xs text-[#44474c]">
            ENTR&apos;AIDE RDC · Accompagnement Gratuit pour les Étudiants
          </span>
          <button
            onClick={() => setIsCoachingModalOpen(false)}
            className="px-5 py-2 bg-[#00629d] hover:bg-[#004a77] text-white font-bold text-xs rounded-full transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
