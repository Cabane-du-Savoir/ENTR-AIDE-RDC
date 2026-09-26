import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Post } from '../types';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Send, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  ArrowUpRight,
  Play,
  Video,
  Image as ImageIcon
} from 'lucide-react';
import { parseVideoUrl } from '../utils/mediaHelper';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { 
    currentUser, 
    toggleLike, 
    toggleFavorite, 
    favorites, 
    addComment, 
    startChatWithPostAuthor,
    setSelectedPostForBoost,
    setIsBoostModalOpen,
    setSelectedPostForShare,
    setIsShareModalOpen,
    setSearchQuery,
    showToast
  } = useApp();

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [mediaTab, setMediaTab] = useState<'video' | 'photo'>(post.videoUrl ? 'video' : 'photo');
  const videoInfo = post.videoUrl ? parseVideoUrl(post.videoUrl) : null;

  const isFavorited = favorites.includes(post.id);
  const isAuthor = currentUser.id === post.authorId || (currentUser.role === 'recruiter' && post.authorRole === 'recruiter');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(post.id, commentInput);
    setCommentInput('');
  };

  const handleShareClick = () => {
    setSelectedPostForShare(post);
    setIsShareModalOpen(true);
  };

  const handleBoostClick = () => {
    setSelectedPostForBoost(post);
    setIsBoostModalOpen(true);
  };

  const categoryLabels: Record<string, string> = {
    all: 'Toutes',
    stages: 'Stage Académique / Pro',
    emplois: 'Emploi Junior',
    bourses: 'Bourse d’Études',
    formations: 'Formation & Atelier',
    conferences: 'Conférence & Débat',
    concours: 'Concours & Hackathon',
    sorties: 'Sortie & Découverte',
  };

  const initials = post.companyInitials || (post.authorName.slice(0, 2).toUpperCase());

  return (
    <article className="flex flex-col rounded-2xl bg-white p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#eaedff] transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)]">
      
      {/* Header Row: Company/Entity Box + Info + Bookmark */}
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-3">
          
          {/* Logo Initials Avatar Box */}
          <button
            onClick={() => {
              setSearchQuery(post.authorName);
              showToast(`Filtré par auteur : ${post.authorName}`, 'info');
            }}
            className="w-11 h-11 rounded-xl bg-[#eaedff] hover:bg-[#d6e3fe] flex items-center justify-center font-bold text-sm text-[#00629d] shrink-0 shadow-xs border border-[#dae2fd] cursor-pointer transition-colors"
            title={`Filtrer par ${post.authorName}`}
          >
            <span>{initials}</span>
          </button>

          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => {
                  setSearchQuery(post.authorName);
                  showToast(`Filtré par auteur : ${post.authorName}`, 'info');
                }}
                className="font-bold text-sm text-[#131b2e] hover:text-[#00629d] transition-colors leading-snug cursor-pointer text-left"
              >
                {post.authorName}
              </button>
              
              {/* Verified Icon */}
              {(post.isVerifiedCompany || post.isOfficialInstitution) && (
                <span 
                  className="material-symbols-outlined text-[17px] text-[#00629d]" 
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  title="Entité Vérifiée par ENTR'AIDE RDC"
                >
                  verified
                </span>
              )}

              {/* Boosted badge */}
              {post.isBoosted && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffddb8] text-[#b87500] font-bold text-[10px]">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>En Vedette</span>
                </span>
              )}
            </div>

            {/* Subtitle location & category */}
            <div className="flex items-center gap-1 text-[#44474c] text-xs mt-0.5">
              <span className="material-symbols-outlined text-[14px]">location_on</span>
              <span>{post.authorOrg || post.city}</span>
              <span>•</span>
              <span className="text-[#00629d] font-semibold">{categoryLabels[post.category] || post.category}</span>
            </div>
          </div>
        </div>

        {/* Bookmark button */}
        <button
          onClick={() => toggleFavorite(post.id)}
          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
            isFavorited ? 'text-[#00629d] bg-[#eaedff]' : 'text-[#44474c] hover:bg-[#f2f3ff]'
          }`}
          title={isFavorited ? 'Sauvegardé' : 'Sauvegarder'}
        >
          <span 
            className="material-symbols-outlined text-[22px]" 
            style={{ fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0" }}
          >
            bookmark
          </span>
        </button>
      </div>

      {/* Badges Row */}
      <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
        {post.hasApplied && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#cfe5ff] text-[#001d33] font-semibold text-[11px]">
            <span className="material-symbols-outlined text-[13px]">check_circle</span>
            <span>Candidaté</span>
          </span>
        )}

        {post.isPaid && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#dae2fd] text-[#003558] font-semibold text-[11px]">
            <span className="material-symbols-outlined text-[13px]">paid</span>
            <span>Stage Rémunéré</span>
          </span>
        )}

        {post.deadline && (
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
            post.isUrgent ? 'bg-[#ffdad6] text-[#93000a] animate-pulse' : 'bg-[#f2f3ff] text-[#131b2e]'
          }`}>
            <span className="material-symbols-outlined text-[13px]">alarm</span>
            <span>Limite : {post.deadline}</span>
          </span>
        )}

        {post.isOfficialInstitution && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#d6e3fe] text-[#0e1c2f] text-[11px] font-bold">
            <ShieldCheck className="w-3 h-3 text-[#00629d]" />
            <span>Officiel RDC</span>
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="font-bold text-base text-[#131b2e] leading-snug mb-1.5">
        {post.title}
      </h2>

      {/* Content */}
      <p className="text-xs sm:text-sm text-[#44474c] line-clamp-3 mb-2.5 leading-relaxed">
        {post.content}
      </p>

      {/* Media Player (Photo & Video Support) */}
      {(post.imageUrl || post.videoUrl) && (
        <div className="mb-3 space-y-2">
          {/* Switcher tabs when BOTH photo and video are present */}
          {post.imageUrl && post.videoUrl && (
            <div className="flex items-center gap-1.5 p-1 bg-[#eaedff] rounded-full w-fit text-xs font-semibold">
              <button
                type="button"
                onClick={() => setMediaTab('video')}
                className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all cursor-pointer ${
                  mediaTab === 'video'
                    ? 'bg-white text-[#00629d] shadow-xs'
                    : 'text-[#44474c] hover:text-[#131b2e]'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Vidéo</span>
              </button>
              <button
                type="button"
                onClick={() => setMediaTab('photo')}
                className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all cursor-pointer ${
                  mediaTab === 'photo'
                    ? 'bg-white text-[#00629d] shadow-xs'
                    : 'text-[#44474c] hover:text-[#131b2e]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Photo</span>
              </button>
            </div>
          )}

          {/* Render Video */}
          {post.videoUrl && (mediaTab === 'video' || !post.imageUrl) && (
            <div className="relative overflow-hidden rounded-2xl bg-black border border-[#eaedff] shadow-xs">
              {videoInfo && (videoInfo.type === 'youtube' || videoInfo.type === 'vimeo') ? (
                <div className="relative aspect-video w-full">
                  <iframe
                    src={videoInfo.embedUrl}
                    title={post.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              ) : (
                <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center">
                  <video
                    src={post.videoUrl}
                    controls
                    playsInline
                    preload="metadata"
                    poster={post.imageUrl}
                    className="w-full h-full object-contain"
                  >
                    Votre navigateur ne supporte pas la lecture de cette vidéo.
                  </video>
                </div>
              )}

              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold pointer-events-none">
                <Video className="w-3 h-3 text-[#ffddb8]" />
                <span>Vidéo HD</span>
              </div>
            </div>
          )}

          {/* Render Photo */}
          {post.imageUrl && (mediaTab === 'photo' || !post.videoUrl) && (
            <div className="relative overflow-hidden rounded-2xl bg-[#eaedff] border border-[#eaedff] max-h-80 shadow-xs">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-48 sm:h-64 object-cover object-center transition-transform duration-300 hover:scale-[1.01]"
                loading="lazy"
              />
              <div className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] font-medium pointer-events-none flex items-center gap-1">
                <ImageIcon className="w-3 h-3" />
                <span>Illustration</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Key Metadata Box (as in template) */}
      {(post.targetAudience || post.advantage) && (
        <div className="rounded-xl bg-[#f2f3ff] p-3 flex flex-col gap-1.5 text-xs text-[#44474c] mb-3 border border-[#eaedff]">
          {post.targetAudience && (
            <div className="flex items-start gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#00629d] shrink-0 mt-0.5">groups</span>
              <span><strong className="font-semibold text-[#131b2e]">Cible :</strong> {post.targetAudience}</span>
            </div>
          )}
          {post.advantage && (
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#b87500] shrink-0">card_giftcard</span>
              <span><strong className="font-semibold text-[#131b2e]">Avantage :</strong> {post.advantage}</span>
            </div>
          )}
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded-md bg-[#eaedff] text-[11px] font-medium text-[#44474c]">
              #{tag.replace(/\s+/g, '')}
            </span>
          ))}
        </div>
      )}

      {/* Social Bar & CTA */}
      <div className="flex items-center justify-between pt-2 border-t border-[#eaedff] text-xs text-[#44474c]">
        
        {/* Left: Like & interested */}
        <div className="flex items-center gap-3">
          {post.applicationMode && (
            <span className="hidden sm:inline text-[11px] font-medium text-[#44474c]">
              {post.applicationMode}
            </span>
          )}

          {/* Likes */}
          <button
            onClick={() => toggleLike(post.id)}
            className={`flex items-center gap-1 font-medium transition-colors cursor-pointer ${
              post.likedByCurrentUser ? 'text-rose-600 font-bold' : 'hover:text-[#131b2e]'
            }`}
          >
            <span 
              className="material-symbols-outlined text-[17px]" 
              style={{ fontVariationSettings: post.likedByCurrentUser ? "'FILL' 1" : "'FILL' 0" }}
            >
              favorite
            </span>
            <span className="tabular-nums font-semibold">{post.likesCount || post.interestedCount || 0} intéressés</span>
          </button>

          {/* Comment Trigger */}
          <button
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            className="flex items-center gap-1 hover:text-[#131b2e] cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="tabular-nums">{post.commentsCount}</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShareClick}
            className="p-1 hover:text-[#131b2e] cursor-pointer"
            title="Partager sur WhatsApp / Facebook"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          {post.externalLink && (
            <a
              href={post.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] text-[#00629d] border border-[#eaedff] transition-colors cursor-pointer"
              title="Consulter le lien officiel de l'offre"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {isAuthor && !post.isBoosted && (
            <button
              onClick={handleBoostClick}
              className="px-2.5 py-1 rounded-full bg-[#ffddb8] text-[#b87500] font-bold text-xs hover:bg-[#ffb95f] transition-all cursor-pointer"
              title="Booster cette annonce"
            >
              ⚡ Booster
            </button>
          )}

          <button
            onClick={() => startChatWithPostAuthor(post)}
            className="px-4 py-1.5 rounded-full bg-[#00629d] hover:bg-[#004a77] text-white font-semibold text-xs shadow-xs active:scale-95 transition-all cursor-pointer flex items-center gap-1"
          >
            <span>Détails &amp; Postuler</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Expandable Comments Drawer */}
      {isCommentsOpen && (
        <div className="mt-3 pt-3 border-t border-[#eaedff] space-y-2.5">
          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder={`Commenter en tant que ${currentUser.name}...`}
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] placeholder-[#75777d] focus:outline-none focus:border-[#00629d]"
            />
            <button
              type="submit"
              disabled={!commentInput.trim()}
              className="px-3 py-1.5 bg-[#00629d] text-white rounded-xl text-xs font-semibold disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Comment list */}
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map(c => (
                <div key={c.id} className="p-2 rounded-xl bg-[#faf8ff] border border-[#eaedff] text-xs">
                  <div className="flex items-center justify-between text-[#44474c] mb-0.5">
                    <span className="font-bold text-[#131b2e]">{c.authorName}</span>
                    <span className="text-[10px] text-[#75777d]">{c.createdAt}</span>
                  </div>
                  <p className="text-[#44474c]">{c.content}</p>
                </div>
              ))
            ) : (
              <p className="text-[11px] text-[#75777d] italic py-1 text-center">
                Aucun commentaire pour l&apos;instant.
              </p>
            )}
          </div>
        </div>
      )}

    </article>
  );
};
