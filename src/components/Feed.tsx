import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PostCard } from './PostCard';
import { ExtendedCategory, ProvinceId } from '../types';
import { 
  Sparkles, 
  Search, 
  X, 
  CheckCircle2, 
  HelpCircle,
  Plus
} from 'lucide-react';

export const Feed: React.FC = () => {
  const { 
    posts, 
    selectedCategory, 
    setSelectedCategory, 
    selectedProvince, 
    setSelectedProvince, 
    filterRemunere, 
    setFilterRemunere, 
    filterUrgents, 
    setFilterUrgents,
    jobSectorFilter,
    setJobSectorFilter,
    activeBottomNav,
    setActiveBottomNav,
    resetAllFilters,
    searchQuery,
    setSearchQuery,
    currentUser,
    setIsCreatePostOpen,
    setIsCoachingModalOpen,
    setIsCvModalOpen,
    setIsGuideOpen,
    stories,
    viewStory
  } = useApp();

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Filter posts
  const filteredPosts = posts.filter(post => {
    // Visibility
    const isVisibleStatus = post.status === 'approved' || post.authorId === currentUser.id;
    if (!isVisibleStatus) return false;

    // Category filter
    if (selectedCategory !== 'all') {
      if (post.category !== selectedCategory) return false;
    }

    // Sector filter (Privé vs Public/Ministères - CDCF Section 3.B)
    if (jobSectorFilter !== 'all') {
      if (post.sector !== jobSectorFilter) return false;
    }

    // Province filter
    if (selectedProvince !== 'all') {
      if (post.province !== selectedProvince && post.province !== 'national-online') {
        // Also map city if province is not explicitly set
        if (selectedProvince === 'kinshasa' && post.city !== 'Kinshasa') return false;
        if (selectedProvince === 'haut-katanga' && post.city !== 'Lubumbashi') return false;
        if (selectedProvince === 'nord-kivu' && post.city !== 'Goma') return false;
        if (selectedProvince === 'sud-kivu' && post.city !== 'Bukavu') return false;
        if (selectedProvince === 'tshopo' && post.city !== 'Kisangani') return false;
        if (selectedProvince === 'kongo-central' && post.city !== 'Matadi') return false;
      }
    }

    // Rémunéré toggle
    if (filterRemunere) {
      const isRemunere = post.isPaid || post.category === 'bourses' || post.content.toLowerCase().includes('rémunéré') || post.content.toLowerCase().includes('indemnité');
      if (!isRemunere) return false;
    }

    // Urgents toggle
    if (filterUrgents) {
      if (!post.isUrgent) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchContent = post.content.toLowerCase().includes(q);
      const matchAuthor = post.authorName.toLowerCase().includes(q);
      const matchOrg = (post.authorOrg || '').toLowerCase().includes(q);
      const matchTags = post.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchContent && !matchAuthor && !matchOrg && !matchTags) {
        return false;
      }
    }

    return true;
  });

  const categoriesList: { id: ExtendedCategory; label: string; icon: string }[] = [
    { id: 'all', label: 'Toutes', icon: 'apps' },
    { id: 'stages', label: 'Stages Académiques & Pro', icon: 'school' },
    { id: 'emplois', label: 'Emplois Juniors', icon: 'work' },
    { id: 'bourses', label: 'Bourses d’Études', icon: 'award_star' },
    { id: 'formations', label: 'Formations & Ateliers', icon: 'menu_book' },
    { id: 'conferences', label: 'Conférences & Débats', icon: 'record_voice_over' },
    { id: 'concours', label: 'Concours & Hackathons', icon: 'terminal' },
    { id: 'sorties', label: 'Sorties & Découvertes', icon: 'hiking' },
  ];

  const campusList = [
    'UNIKIN', 'UPN', 'UCC', 'UNILU', 'UCG', 'UCB', 'UNIKIS', 'ISC', 'IFASIC', 'ISTA'
  ];

  return (
    <div className="flex flex-col w-full pb-8 space-y-4">
      
      {/* Interactive Welcome Hero Section */}
      <section className="pt-2">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e1c2f] via-[#283044] to-[#00629d] p-6 sm:p-8 text-white shadow-lg">
          
          {/* Subtle Authentic Hero Image Overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
            <img 
              src="/src/assets/images/hero_rdc_youth_1790292214877.jpg" 
              alt="Jeunesse étudiante RDC" 
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Ambient Graphic Glow Elements */}
          <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-[#00a2fd]/30 blur-3xl pointer-events-none" />
          <div className="absolute -left-6 -bottom-6 w-36 h-36 rounded-full bg-[#ffddb8]/20 blur-2xl pointer-events-none" />

          <div className="relative z-10">
            {/* Live Count Pulse Badge */}
            <button
              onClick={() => {
                resetAllFilters();
                window.scrollTo({ top: 420, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 hover:bg-white backdrop-blur-md shadow-sm mb-3 text-[#131b2e] cursor-pointer transition-all active:scale-95 text-left"
              title="Afficher toutes les opportunités approuvées"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00629d] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00629d]" />
              </span>
              <span className="font-semibold text-xs tracking-wide">
                {posts.filter(p => p.status === 'approved').length} opportunités disponibles aujourd&apos;hui
              </span>
            </button>

            {/* Main Catchphrase */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black mb-2 tracking-tight text-white leading-tight">
              Propulsez votre avenir académique et professionnel en RDC
            </h1>

            <p className="text-xs sm:text-sm text-slate-200/90 mb-5 leading-relaxed max-w-2xl">
              Retrouvez tous les stages académiques, emplois juniors, bourses d&apos;études, conférences, hackathons et randonnées à Kinshasa, Lubumbashi, Goma et toutes les provinces.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setIsCreatePostOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#00629d] hover:bg-[#004a77] text-white font-semibold text-xs shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Publier une opportunité</span>
              </button>

              <button
                onClick={() => setIsCoachingModalOpen(true)}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white text-[#131b2e] hover:bg-[#eaedff] font-semibold text-xs shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <span className="text-[#b87500]">✨</span>
                <span>Coaching Carrière IA</span>
              </button>

              <button
                onClick={() => setIsGuideOpen(true)}
                className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-[#ffddb8]" />
                <span>Guide rapide</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Social Stories / En Vedette Highlights Bar (Instagram / Facebook / LinkedIn style) */}
      <section className="py-1">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 px-1">
          {/* Add story / my announcement button */}
          <button
            onClick={() => setIsCreatePostOpen(true)}
            className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
          >
            <div className="relative w-14 h-14 rounded-full p-0.5 border-2 border-dashed border-[#00629d] flex items-center justify-center bg-[#eaedff] group-hover:bg-[#d6e3fe] transition-all">
              <span className="material-symbols-outlined text-[22px] text-[#00629d]">add</span>
            </div>
            <span className="text-[10.5px] font-semibold text-[#131b2e] truncate max-w-[68px]">
              Votre annonce
            </span>
          </button>

          {/* Stories from institutions, companies, and student clubs */}
          {stories.map(story => (
            <button
              key={story.id}
              onClick={() => viewStory(story.id)}
              className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer text-center"
            >
              <div className={`w-14 h-14 rounded-full transition-all ${
                story.viewed 
                  ? 'border-2 border-[#c5c6cd] p-0.5' 
                  : 'bg-gradient-to-tr from-[#00629d] via-[#00a2fd] to-[#ffddb8] p-[2.5px] shadow-sm'
              }`}>
                <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                  <img 
                    src={story.imageUrl} 
                    alt={story.title}
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform"
                  />
                </div>
              </div>
              <span className="text-[10.5px] font-medium text-[#131b2e] truncate max-w-[68px]">
                {story.authorName}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Horizontal Scrollable Category Filter Pills */}
      <section className="py-2">
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="font-bold text-sm text-[#131b2e]">Explorer par catégorie</span>
          <button 
            onClick={resetAllFilters}
            className="text-xs font-semibold text-[#00629d] hover:underline cursor-pointer"
          >
            Réinitialiser
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categoriesList.map(cat => {
            const isSelected = selectedCategory === cat.id;
            const count = cat.id === 'all' 
              ? posts.filter(p => p.status === 'approved').length 
              : posts.filter(p => p.status === 'approved' && p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#00629d] text-white shadow-sm ring-1 ring-[#00629d]'
                    : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff] border border-[#eaedff]'
                }`}
              >
                {cat.id !== 'all' && (
                  <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                )}
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-[#dae2fd] text-[#003558]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Location Selection & Fast Toggle Filters */}
      <section className="py-1 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          
          {/* Province Dropdown Selector */}
          <div className="relative flex-1">
            <label className="sr-only" htmlFor="province-select">Filtrer par Province</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[20px] text-[#44474c] pointer-events-none">
                location_on
              </span>
              <select
                id="province-select"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value as ProvinceId)}
                className="w-full pl-9 pr-8 py-2.5 appearance-none rounded-2xl bg-white text-[#131b2e] font-semibold text-xs shadow-xs border border-[#eaedff] focus:outline-none focus:border-[#00629d] cursor-pointer"
              >
                <option value="all">Toutes les provinces de RDC</option>
                <option value="kinshasa">Kinshasa</option>
                <option value="haut-katanga">Haut-Katanga (Lubumbashi)</option>
                <option value="nord-kivu">Nord-Kivu (Goma, Butembo)</option>
                <option value="sud-kivu">Sud-Kivu (Bukavu)</option>
                <option value="tshopo">Tshopo (Kisangani)</option>
                <option value="lualaba">Lualaba (Kolwezi)</option>
                <option value="kongo-central">Kongo Central (Matadi, Boma)</option>
                <option value="national-online">National / En Ligne</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 text-[18px] text-[#44474c] pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          {/* Search Trigger */}
          <button 
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-2xl border shadow-xs transition-colors cursor-pointer ${
              isSearchExpanded || searchQuery 
                ? 'bg-[#00629d] text-white border-[#00629d]' 
                : 'bg-white text-[#131b2e] border-[#eaedff] hover:bg-[#f2f3ff]'
            }`}
            title="Recherche textuelle"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

        </div>

        {/* Expandable Search Input */}
        {isSearchExpanded && (
          <div className="relative animate-in fade-in">
            <input
              type="text"
              placeholder="Rechercher (ex: Stage Informatique, Bourse France, Rawbank)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-[#00629d] rounded-2xl text-xs text-[#131b2e] placeholder-[#75777d] shadow-sm focus:outline-none"
              autoFocus
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#44474c] hover:text-[#131b2e] p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Quick Toggles */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {/* Sector filter: Privé vs Public/Ministères (CDCF Section 3.B) */}
          <div className="flex items-center bg-[#eaedff] p-0.5 rounded-full border border-[#dae2fd]">
            <button
              onClick={() => setJobSectorFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                jobSectorFilter === 'all'
                  ? 'bg-white text-[#00629d] shadow-xs'
                  : 'text-[#44474c] hover:text-[#131b2e]'
              }`}
            >
              Tous secteurs
            </button>
            <button
              onClick={() => setJobSectorFilter('private')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                jobSectorFilter === 'private'
                  ? 'bg-white text-[#00629d] shadow-xs'
                  : 'text-[#44474c] hover:text-[#131b2e]'
              }`}
            >
              Secteur Privé
            </button>
            <button
              onClick={() => setJobSectorFilter('public_ministry')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                jobSectorFilter === 'public_ministry'
                  ? 'bg-[#0e1c2f] text-white shadow-xs'
                  : 'text-[#44474c] hover:text-[#131b2e]'
              }`}
            >
              Public &amp; Ministères
            </button>
          </div>

          <button
            onClick={() => setFilterRemunere(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-xs shadow-xs transition-all cursor-pointer shrink-0 ${
              filterRemunere 
                ? 'bg-[#00a2fd] text-white font-bold' 
                : 'bg-white text-[#44474c] border border-[#eaedff] hover:bg-[#f2f3ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">payments</span>
            <span>Stage Rémunéré</span>
          </button>

          <button
            onClick={() => setFilterUrgents(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-xs shadow-xs transition-all cursor-pointer shrink-0 ${
              filterUrgents 
                ? 'bg-[#ba1a1a] text-white font-bold' 
                : 'bg-white text-[#44474c] border border-[#eaedff] hover:bg-[#f2f3ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">timer</span>
            <span>Clôture proche</span>
          </button>
        </div>

      </section>

      {/* Dynamic Tab Context Card based on activeBottomNav */}
      {activeBottomNav === 'forum-entraide' && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-[#eaedff] to-[#f2f3ff] border border-[#dae2fd] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00629d] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">forum</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#131b2e]">Espace Entraide &amp; Conseils Étudiants</h3>
              <p className="text-xs text-[#44474c]">Partage de cours, conseils mémoires/TFE et orientation académique</p>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('conferences');
              setIsCreatePostOpen(true);
            }}
            className="px-4 py-2 bg-[#00629d] hover:bg-[#004a77] text-white rounded-full text-xs font-semibold shadow-xs cursor-pointer active:scale-95 transition-all whitespace-nowrap"
          >
            Poser une question
          </button>
        </div>
      )}

      {activeBottomNav === 'cercles-clubs' && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-[#d6e3fe] to-[#eaedff] border border-[#bac7e1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0e1c2f] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">diversity_3</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#131b2e]">Cercles, Clubs &amp; Activités Associatives</h3>
              <p className="text-xs text-[#44474c]">Hackathons, randonnées, débats et initiatives étudiantes en RDC</p>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('sorties');
              setIsCreatePostOpen(true);
            }}
            className="px-4 py-2 bg-[#0e1c2f] hover:bg-black text-white rounded-full text-xs font-semibold shadow-xs cursor-pointer active:scale-95 transition-all whitespace-nowrap"
          >
            Proposer une activité
          </button>
        </div>
      )}

      {activeBottomNav === 'insertion-pro-cv' && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-[#ffddb8]/60 to-[#eaedff] border border-[#ffddb8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#b87500] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">auto_awesome_motion</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#131b2e]">Insertion Pro &amp; CV-Thèque</h3>
              <p className="text-xs text-[#44474c]">Votre CV certifié et coaching carrière pour décrocher un stage</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCvModalOpen(true)}
              className="px-4 py-2 bg-[#00629d] hover:bg-[#004a77] text-white rounded-full text-xs font-semibold shadow-xs cursor-pointer"
            >
              Ouvrir mon CV
            </button>
            <button
              onClick={() => setIsCoachingModalOpen(true)}
              className="px-3.5 py-2 bg-white text-[#b87500] border border-[#ffddb8] rounded-full text-xs font-bold hover:bg-[#faf8ff] cursor-pointer"
            >
              Coaching IA
            </button>
          </div>
        </div>
      )}

      {/* Section Title: Feed Counter */}
      <div className="pt-2 pb-1 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-[#131b2e]">Sélection Récente</span>
          <span className="px-2 py-0.5 rounded-full bg-[#e2e7ff] text-[11px] font-bold text-[#00629d]">
            {filteredPosts.length} affichée(s)
          </span>
        </div>
        <span className="text-[11px] text-[#44474c]">Ordre chronologique</span>
      </div>

      {/* Feed Cards List */}
      <section className="flex flex-col gap-4 pt-1">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="p-10 text-center bg-white border border-[#eaedff] rounded-3xl space-y-3">
            <span className="material-symbols-outlined text-4xl text-[#75777d]">manage_search</span>
            <h3 className="font-bold text-sm text-[#131b2e]">Aucune opportunité pour ces critères</h3>
            <p className="text-xs text-[#44474c] max-w-sm mx-auto">
              Élargissez vos filtres de province ou réinitialisez pour explorer l&apos;ensemble des offres.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-4 py-2 bg-[#00629d] text-white rounded-full text-xs font-semibold cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </section>

      {/* Interactive University & Campus Partners Strip */}
      <section className="mt-6">
        <div className="rounded-3xl bg-[#eaedff]/60 border border-[#dae2fd] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#00629d]">domain</span>
              <span className="font-bold text-sm text-[#131b2e]">Réseau Universitaire &amp; Partenaires</span>
            </div>
            <span className="text-[11px] font-semibold text-[#44474c]">10 Campus Connectés</span>
          </div>

          {/* Campus Pills Strip */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {campusList.map(campus => (
              <div 
                key={campus}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white shadow-xs text-[#131b2e] font-bold text-xs shrink-0 border border-[#eaedff]"
              >
                <span className="w-2 h-2 rounded-full bg-[#00629d]" />
                <span>{campus}</span>
              </div>
            ))}
          </div>

          {/* Patriotic Footer Message */}
          <div className="mt-3.5 pt-3 border-t border-[#dae2fd] flex items-center justify-center gap-1.5 text-center text-[#44474c] text-xs font-medium">
            <span>🇨🇩 Pour l&apos;épanouissement et la réussite de la jeunesse universitaire congolaise</span>
          </div>
        </div>
      </section>

    </div>
  );
};
