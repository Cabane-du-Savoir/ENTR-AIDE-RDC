import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';

export const StoryModal: React.FC = () => {
  const { activeStory, setActiveStory, posts, setSelectedCategory, startChatWithPostAuthor } = useApp();

  useEffect(() => {
    if (!activeStory) return;
    const timer = setTimeout(() => {
      // Auto close after 7 seconds if not manually closed
      setActiveStory(null);
    }, 7000);
    return () => clearTimeout(timer);
  }, [activeStory, setActiveStory]);

  if (!activeStory) return null;

  const linkedPost = activeStory.linkPostId 
    ? posts.find(p => p.id === activeStory.linkPostId)
    : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm sm:max-w-md h-[580px] bg-[#0e1c2f] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-white/10">
        
        {/* Animated Progress Bar */}
        <div className="absolute top-3 left-3 right-3 z-30 flex items-center gap-1.5">
          <div className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full animate-[progress_7s_linear_forwards]" style={{
              animation: 'storyProgress 7s linear forwards'
            }} />
          </div>
        </div>

        {/* Top Header Bar inside story */}
        <div className="absolute top-6 left-4 right-4 z-30 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center font-bold text-xs">
              {activeStory.authorInitials || 'CD'}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-xs tracking-wide">{activeStory.authorName}</span>
                {activeStory.isVerified && (
                  <span className="material-symbols-outlined text-[15px] text-[#00a2fd]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                )}
              </div>
              <span className="text-[10px] text-white/70">{activeStory.createdAt}</span>
            </div>
          </div>

          <button
            onClick={() => setActiveStory(null)}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Story Background Image */}
        <div className="relative flex-1 w-full bg-slate-900 overflow-hidden">
          <img 
            src={activeStory.imageUrl} 
            alt={activeStory.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1c2f] via-black/30 to-black/60" />
        </div>

        {/* Bottom Content Area */}
        <div className="relative z-30 p-5 bg-[#0e1c2f]/95 backdrop-blur-md border-t border-white/10 text-white flex flex-col gap-2">
          <h3 className="font-bold text-base text-white leading-snug">
            {activeStory.title}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {activeStory.caption}
          </p>

          {/* Action Link Button */}
          {linkedPost && activeStory.ctaType === 'learn_more' && linkedPost.externalLink ? (
            <a
              href={linkedPost.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setActiveStory(null)}
              className="mt-2 w-full py-2.5 px-4 rounded-full bg-[#00629d] hover:bg-[#004a77] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>{activeStory.linkText || 'En savoir plus'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              onClick={() => {
                setActiveStory(null);
                if (linkedPost) {
                  startChatWithPostAuthor(linkedPost);
                }
              }}
              className="mt-2 w-full py-2.5 px-4 rounded-full bg-[#00629d] hover:bg-[#004a77] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>{activeStory.linkText || (activeStory.ctaType === 'learn_more' ? 'En savoir plus' : 'Postuler')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
