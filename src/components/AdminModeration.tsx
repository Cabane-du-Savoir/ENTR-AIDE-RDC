import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  Check, 
  Trash2, 
  AlertTriangle, 
  FileText, 
  Users, 
  MapPin, 
  Clock, 
  Sparkles,
  Building,
  CheckCircle2
} from 'lucide-react';

export const AdminModeration: React.FC = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    posts, 
    approvePost, 
    rejectPost 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'pending' | 'all' | 'delegates'>('pending');
  const [rejectionModalPostId, setRejectionModalPostId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('Offre suspecte / Non respect des critères académiques');

  if (!isAdminOpen) return null;

  const pendingPosts = posts.filter(p => p.status === 'pending');
  const approvedPosts = posts.filter(p => p.status === 'approved');
  const rejectedPosts = posts.filter(p => p.status === 'rejected');

  const handleConfirmReject = (postId: string) => {
    rejectPost(postId, rejectionReason);
    setRejectionModalPostId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-white text-[#131b2e] border border-[#eaedff] rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#eaedff] bg-[#f2f3ff] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#131b2e] tracking-tight flex items-center gap-2">
                <span>Centre de Modération &amp; Sécurité Nationale</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                  Admin Panel
                </span>
              </h2>
              <p className="text-xs text-[#44474c] mt-0.5">
                Filtrage anti-arnaque, validation des offres d’emploi/bourses et contrôle des délégués universitaires
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-1.5 rounded-xl text-[#44474c] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* KPI Scorecards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-6 border-b border-[#eaedff] bg-[#faf8ff] text-xs">
          <div className="p-3.5 rounded-2xl bg-white border border-[#eaedff] shadow-xs">
            <span className="text-[#44474c] block mb-1 font-medium">En attente de revue</span>
            <span className="text-2xl font-black text-[#b87500] tabular-nums">{pendingPosts.length}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-[#eaedff] shadow-xs">
            <span className="text-[#44474c] block mb-1 font-medium">Offres Approuvées</span>
            <span className="text-2xl font-black text-emerald-600 tabular-nums">{approvedPosts.length}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-[#eaedff] shadow-xs">
            <span className="text-[#44474c] block mb-1 font-medium">Rejetées (Anti-Spam)</span>
            <span className="text-2xl font-black text-[#ba1a1a] tabular-nums">{rejectedPosts.length}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-[#eaedff] shadow-xs">
            <span className="text-[#44474c] block mb-1 font-medium">Taux de Sécurisation</span>
            <span className="text-2xl font-black text-[#00629d] tabular-nums">99.4%</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="px-6 pt-3 flex gap-2 border-b border-[#eaedff] text-xs font-semibold bg-white">
          <button
            onClick={() => setActiveTab('pending')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'pending'
                ? 'border-[#00629d] text-[#00629d]'
                : 'border-transparent text-[#44474c] hover:text-[#131b2e]'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>À Modérer ({pendingPosts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('all')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'border-[#00629d] text-[#00629d]'
                : 'border-transparent text-[#44474c] hover:text-[#131b2e]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Toutes les Annonces ({posts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('delegates')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'delegates'
                ? 'border-[#00629d] text-[#00629d]'
                : 'border-transparent text-[#44474c] hover:text-[#131b2e]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Vérification Délégués de Promo</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4 bg-white">
          
          {activeTab === 'pending' && (
            pendingPosts.length > 0 ? (
              pendingPosts.map(post => (
                <div 
                  key={post.id}
                  className="p-4 rounded-2xl bg-[#faf8ff] border border-[#eaedff] hover:shadow-xs transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold uppercase tracking-wider">
                        En Attente de Validation
                      </span>
                      <span className="text-xs text-[#75777d]">{post.createdAt}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => approvePost(post.id)}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approuver &amp; Publier</span>
                      </button>

                      <button
                        onClick={() => setRejectionModalPostId(post.id)}
                        className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-full text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Rejeter</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#131b2e] mb-1">{post.title}</h3>
                    <p className="text-xs text-[#44474c] line-clamp-2 leading-relaxed">{post.content}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#44474c] pt-2 border-t border-[#eaedff]">
                    <span>Auteur : <strong className="text-[#131b2e]">{post.authorName}</strong> ({post.authorRole})</span>
                    <span>•</span>
                    <span>Ville : <strong className="text-[#131b2e]">{post.city}</strong></span>
                    <span>•</span>
                    <span>Catégorie : <strong className="text-[#00629d]">{post.category}</strong></span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-sm text-[#131b2e]">Toutes les publications sont à jour !</h4>
                <p className="text-xs text-[#44474c]">Aucune offre en attente de modération pour le moment.</p>
              </div>
            )
          )}

          {activeTab === 'all' && (
            <div className="space-y-3">
              {posts.map(p => (
                <div key={p.id} className="p-3.5 rounded-2xl bg-white border border-[#eaedff] flex items-center justify-between text-xs">
                  <div className="truncate mr-3">
                    <span className="font-bold text-[#131b2e] block truncate">{p.title}</span>
                    <span className="text-[#75777d]">{p.authorName} · {p.city} · {p.category}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                    p.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    p.status === 'rejected' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                    'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {p.status === 'approved' ? 'En ligne' : p.status === 'rejected' ? 'Rejeté' : 'En attente'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'delegates' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-[#131b2e]">Sarah Mwamba (Déléguée L2 Droit UPN)</h4>
                  <p className="text-[11px] text-[#44474c]">Université Pédagogique Nationale · Kinshasa</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Statut Vérifié
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Rejection Modal confirmation */}
        {rejectionModalPostId && (
          <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white border border-[#eaedff] rounded-3xl p-6 space-y-4 shadow-2xl">
              <h3 className="font-bold text-sm text-[#ba1a1a] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Rejeter cette opportunité</span>
              </h3>
              <p className="text-xs text-[#44474c]">
                Sélectionnez le motif pour informer l&apos;auteur de l&apos;offre :
              </p>
              <select
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full p-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-none"
              >
                <option value="Offre suspecte / Non respect des critères académiques">Offre suspecte / Arnaque potentielle</option>
                <option value="Informations incomplètes ou contact invalide">Informations incomplètes ou contact invalide</option>
                <option value="Non-conformité avec les règles de la communauté">Non-conformité avec les règles communautaires</option>
              </select>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setRejectionModalPostId(null)}
                  className="px-4 py-2 bg-[#eaedff] text-[#131b2e] rounded-full text-xs font-semibold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleConfirmReject(rejectionModalPostId)}
                  className="px-4 py-2 bg-[#ba1a1a] hover:bg-[#93000a] text-white rounded-full text-xs font-semibold cursor-pointer"
                >
                  Confirmer le rejet
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
