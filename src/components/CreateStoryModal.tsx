import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Image as ImageIcon,
  Briefcase,
  Info
} from 'lucide-react';

export const CreateStoryModal: React.FC = () => {
  const { 
    isStoryCreateOpen, 
    setIsStoryCreateOpen, 
    submitNewStory, 
    currentUser, 
    posts,
    showToast 
  } = useApp();

  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [ctaType, setCtaType] = useState<'apply' | 'learn_more'>('apply');
  const [selectedImage, setSelectedImage] = useState<string>(
    '/src/assets/images/post_stage_tech_1790292226178.jpg'
  );
  const [uploadedImageName, setUploadedImageName] = useState<string>('');
  const [selectedPostId, setSelectedPostId] = useState<string>('');
  const [error, setError] = useState('');

  if (!isStoryCreateOpen) return null;

  const storyPresets = [
    { label: 'Campus & Recrutement', url: '/src/assets/images/hero_rdc_youth_1790292214877.jpg' },
    { label: 'Tech & Bureaux Kinshasa', url: '/src/assets/images/post_stage_tech_1790292226178.jpg' },
    { label: 'Bourse & Excellence', url: '/src/assets/images/post_bourse_excellence_1790292237440.jpg' },
    { label: 'Activités & Événements', url: '/src/assets/images/post_detente_nature_1790292246681.jpg' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setError('Le fichier image ne doit pas dépasser 8 Mo.');
        return;
      }
      setUploadedImageName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        showToast('Photo du statut chargée !', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Veuillez saisir un titre pour votre story / statut.');
      return;
    }
    if (!caption.trim()) {
      setError('Veuillez ajouter une courte description pour votre statut.');
      return;
    }
    if (!selectedImage) {
      setError('Veuillez sélectionner ou importer une image d’arrière-plan.');
      return;
    }

    submitNewStory({
      imageUrl: selectedImage,
      title: title.trim(),
      caption: caption.trim(),
      ctaType: ctaType,
      linkPostId: selectedPostId || posts[0]?.id,
    });

    // Reset fields
    setTitle('');
    setCaption('');
    setUploadedImageName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white text-[#131b2e] border border-[#eaedff] rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#eaedff] flex items-center justify-between bg-[#f2f3ff]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00629d] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#131b2e] tracking-tight">
                Publier votre annonce (Story &amp; Statut)
              </h2>
              <p className="text-[11px] text-[#44474c]">
                Votre annonce visible pendant 24h avec bouton d&apos;action direct
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsStoryCreateOpen(false)}
            className="p-1 rounded-xl text-[#44474c] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-[#ffdad6] border border-[#ba1a1a]/30 rounded-2xl text-[#93000a] text-xs">
              {error}
            </div>
          )}

          {/* Title of Story */}
          <div>
            <label className="block text-xs font-semibold text-[#131b2e] mb-1">
              Titre du statut *
            </label>
            <input
              type="text"
              required
              placeholder="ex: Recrutement Pré-Emploi 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] placeholder-[#75777d] focus:outline-none focus:border-[#00629d]"
            />
          </div>

          {/* Caption */}
          <div>
            <label className="block text-xs font-semibold text-[#131b2e] mb-1">
              Courte légende / Message explicatif *
            </label>
            <textarea
              rows={2}
              required
              placeholder="ex: Les candidatures pour le pôle Digital & Réseaux sont ouvertes aux finalistes !"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] placeholder-[#75777d] focus:outline-none focus:border-[#00629d] resize-none"
            />
          </div>

          {/* CTA Option (User Request: Postuler OU En savoir plus) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#131b2e]">
              Option du bouton d&apos;action (CTA) *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCtaType('apply')}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  ctaType === 'apply'
                    ? 'border-[#00629d] bg-[#f2f3ff] ring-2 ring-[#00629d] text-[#00629d]'
                    : 'border-[#eaedff] bg-white text-[#44474c] hover:bg-[#faf8ff]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs">Postuler</span>
                  {ctaType === 'apply' && <CheckCircle2 className="w-4 h-4 text-[#00629d]" />}
                </div>
                <span className="text-[10px] text-[#44474c]">
                  Bouton : &quot;Postuler au stage &rarr;&quot;
                </span>
              </button>

              <button
                type="button"
                onClick={() => setCtaType('learn_more')}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  ctaType === 'learn_more'
                    ? 'border-[#00629d] bg-[#f2f3ff] ring-2 ring-[#00629d] text-[#00629d]'
                    : 'border-[#eaedff] bg-white text-[#44474c] hover:bg-[#faf8ff]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs">En savoir plus</span>
                  {ctaType === 'learn_more' && <CheckCircle2 className="w-4 h-4 text-[#00629d]" />}
                </div>
                <span className="text-[10px] text-[#44474c]">
                  Bouton : &quot;En savoir plus &rarr;&quot;
                </span>
              </button>
            </div>
          </div>

          {/* Opportunity Link Selection */}
          <div>
            <label className="block text-xs font-semibold text-[#131b2e] mb-1">
              Associer à une offre ou opportunité existante
            </label>
            <select
              value={selectedPostId}
              onChange={(e) => setSelectedPostId(e.target.value)}
              className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-none"
            >
              {posts.filter(p => p.status === 'approved').map(p => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.authorName})
                </option>
              ))}
            </select>
          </div>

          {/* Visual / Photo Selection */}
          <div className="space-y-2 pt-1 border-t border-[#eaedff]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#131b2e]">
                Visuel d&apos;arrière-plan de la Story
              </label>
              {uploadedImageName && (
                <span className="text-[10px] text-emerald-600 font-semibold truncate max-w-[150px]">
                  {uploadedImageName}
                </span>
              )}
            </div>

            {/* Upload local image */}
            <label className="p-3 rounded-2xl border border-dashed border-[#dae2fd] bg-[#f2f3ff] hover:bg-[#eaedff] text-center flex items-center justify-center gap-2 cursor-pointer transition-colors">
              <Upload className="w-4 h-4 text-[#00629d]" />
              <span className="text-xs font-semibold text-[#00629d]">
                Importer une image depuis mon appareil
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {/* Presets */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              {storyPresets.map(preset => {
                const isSelected = selectedImage === preset.url;
                return (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => {
                      setSelectedImage(preset.url);
                      setUploadedImageName('');
                    }}
                    className={`relative rounded-xl overflow-hidden border p-0.5 transition-all cursor-pointer ${
                      isSelected ? 'border-[#00629d] ring-2 ring-[#00629d]' : 'border-[#dae2fd]'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-full h-14 object-cover rounded-lg"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Mini Preview Box */}
          <div className="p-3 bg-[#0e1c2f] rounded-2xl text-white flex items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/20">
                <img
                  src={selectedImage}
                  alt="Aperçu"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="truncate">
                <span className="text-xs font-bold block truncate text-white">
                  {title || 'Titre de votre story'}
                </span>
                <span className="text-[10px] text-white/70 block truncate">
                  Bouton : {ctaType === 'apply' ? 'Postuler au stage' : 'En savoir plus'}
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#00629d] text-white text-[10px] font-bold shrink-0">
              Aperçu
            </span>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-[#eaedff] flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsStoryCreateOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-[#44474c] hover:text-[#131b2e] cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-[#00629d] hover:bg-[#004a77] text-white font-bold text-xs rounded-full shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <span>Publier mon annonce</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
