import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  MessageCircle, 
  Facebook 
} from 'lucide-react';

export const ShareModal: React.FC = () => {
  const { 
    isShareModalOpen, 
    setIsShareModalOpen, 
    selectedPostForShare,
    showToast
  } = useApp();

  const [copied, setCopied] = useState(false);

  if (!isShareModalOpen || !selectedPostForShare) return null;

  const postUrl = window.location.href;
  const shareText = `Opportunité étudiante sur ENTR'AIDE RDC :\n"${selectedPostForShare.title}" à ${selectedPostForShare.city}.\nConsultez l'offre sur : ${postUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${postUrl}#${selectedPostForShare.id}`);
    setCopied(true);
    selectedPostForShare.sharesCount += 1;
    showToast('Lien de l’opportunité copié dans le presse-papier !', 'info');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    selectedPostForShare.sharesCount += 1;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleFacebookShare = () => {
    selectedPostForShare.sharesCount += 1;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-white text-[#131b2e] border border-[#eaedff] rounded-3xl p-6 shadow-2xl space-y-4">
        
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-[#eaedff] text-[#00629d]">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#131b2e] text-base">Partager cette opportunité</h3>
              <p className="text-[11px] text-[#44474c]">Groupes WhatsApp de promotion &amp; réseaux</p>
            </div>
          </div>
          <button
            onClick={() => setIsShareModalOpen(false)}
            className="p-1 rounded-xl text-[#44474c] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#44474c] leading-relaxed">
          Diffusez cette offre auprès de vos camarades de faculté et dans vos groupes universitaires :
        </p>

        <div className="p-3 bg-[#f2f3ff] rounded-2xl border border-[#eaedff] text-xs text-[#131b2e] font-medium line-clamp-2">
          &quot;{selectedPostForShare.title}&quot;
        </div>

        {/* Share Channels */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          
          {/* WhatsApp */}
          <button
            onClick={handleWhatsAppShare}
            className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 flex items-center justify-center gap-2 font-semibold text-xs transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
            <span>WhatsApp RDC</span>
          </button>

          {/* Facebook */}
          <button
            onClick={handleFacebookShare}
            className="p-3 rounded-2xl bg-[#eaedff] hover:bg-[#d6e3fe] border border-[#dae2fd] text-[#003558] flex items-center justify-center gap-2 font-semibold text-xs transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <Facebook className="w-4 h-4 fill-[#00629d] text-[#00629d]" />
            <span>Facebook</span>
          </button>

        </div>

        {/* Copy Link Input Bar */}
        <div className="pt-2">
          <label className="block text-[11px] font-semibold text-[#44474c] mb-1">Ou copier le lien direct :</label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={`${postUrl}#${selectedPostForShare.id}`}
              className="flex-1 px-3 py-2 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] truncate focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 bg-[#00629d] hover:bg-[#004a77] text-white font-semibold rounded-full text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copié !' : 'Copier'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
