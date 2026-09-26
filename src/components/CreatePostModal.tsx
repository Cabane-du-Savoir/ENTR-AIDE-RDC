import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ExtendedCategory, City } from '../types';
import { 
  X, 
  Send, 
  Image as ImageIcon, 
  Video,
  Film,
  Flame, 
  AlertTriangle, 
  ShieldAlert, 
  Calendar,
  Link as LinkIcon,
  Upload,
  Trash2,
  CheckCircle2,
  Play,
  Sparkles
} from 'lucide-react';
import { parseVideoUrl } from '../utils/mediaHelper';

export const CreatePostModal: React.FC = () => {
  const { isCreatePostOpen, setIsCreatePostOpen, submitNewPost, currentUser, selectedCategory, showToast } = useApp();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<ExtendedCategory>(
    (selectedCategory !== 'all' ? selectedCategory : 'stages') as ExtendedCategory
  );
  const [city, setCity] = useState<City>(currentUser.city || 'Kinshasa');
  const [sector, setSector] = useState<'private' | 'public_ministry'>(
    currentUser.role === 'public_institution' ? 'public_ministry' : 'private'
  );

  useEffect(() => {
    if (isCreatePostOpen && selectedCategory !== 'all') {
      setCategory(selectedCategory as ExtendedCategory);
    }
  }, [isCreatePostOpen, selectedCategory]);

  const [isPaid, setIsPaid] = useState(true);
  const [isUrgent, setIsUrgent] = useState(false);
  const [targetAudience, setTargetAudience] = useState('');
  const [advantage, setAdvantage] = useState('');
  const [deadline, setDeadline] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [tagsInput, setTagsInput] = useState('Kinshasa, Stage');

  // Media Tab & States (Photo & Video)
  const [activeMediaTab, setActiveMediaTab] = useState<'photo' | 'video'>('photo');

  // Photo state
  const [photoMode, setPhotoMode] = useState<'preset' | 'upload' | 'url'>('preset');
  const [selectedPhoto, setSelectedPhoto] = useState<string>(
    '/src/assets/images/post_stage_tech_1790292226178.jpg'
  );
  const [uploadedPhotoName, setUploadedPhotoName] = useState<string>('');
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string>('');

  // Video state
  const [hasVideo, setHasVideo] = useState(false);
  const [videoMode, setVideoMode] = useState<'upload' | 'url' | 'preset'>('upload');
  const [selectedVideo, setSelectedVideo] = useState<string>('');
  const [uploadedVideoName, setUploadedVideoName] = useState<string>('');
  const [customVideoUrl, setCustomVideoUrl] = useState<string>('');

  const [error, setError] = useState('');

  if (!isCreatePostOpen) return null;

  const citiesList: City[] = [
    'Kinshasa',
    'Lubumbashi',
    'Goma',
    'Kisangani',
    'Bukavu',
    'Matadi',
    'Autre / National'
  ];

  const photoPresets = [
    { label: 'Stage & Tech Kinshasa', url: '/src/assets/images/post_stage_tech_1790292226178.jpg' },
    { label: 'Bourse & Excellence RDC', url: '/src/assets/images/post_bourse_excellence_1790292237440.jpg' },
    { label: 'Campus & Étudiants UNIKIN', url: '/src/assets/images/hero_rdc_youth_1790292214877.jpg' },
    { label: 'Détente & Loisirs', url: '/src/assets/images/post_detente_nature_1790292246681.jpg' },
  ];

  const videoPresets = [
    { 
      label: 'Spot Démo Télécoms RDC', 
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      type: 'direct' as const
    },
    { 
      label: 'Présentation Études & Campus', 
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      type: 'direct' as const
    },
  ];

  // Handle local photo file upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("L'image ne doit pas dépasser 10 Mo.");
        return;
      }
      setUploadedPhotoName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setSelectedPhoto(result);
        setPhotoMode('upload');
        showToast(`Photo "${file.name}" importée avec succès !`, 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle local video file upload
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        setError('La vidéo ne doit pas dépasser 50 Mo.');
        return;
      }
      setUploadedVideoName(file.name);
      const videoBlobUrl = URL.createObjectURL(file);
      setSelectedVideo(videoBlobUrl);
      setHasVideo(true);
      setVideoMode('upload');
      showToast(`Vidéo "${file.name}" prête pour la publication !`, 'success');
    }
  };

  const handleApplyCustomPhotoUrl = () => {
    if (customPhotoUrl.trim()) {
      setSelectedPhoto(customPhotoUrl.trim());
      setPhotoMode('url');
      showToast('Image web appliquée !', 'success');
    }
  };

  const handleApplyCustomVideoUrl = () => {
    if (customVideoUrl.trim()) {
      setSelectedVideo(customVideoUrl.trim());
      setHasVideo(true);
      setVideoMode('url');
      showToast('Lien vidéo configuré !', 'success');
    }
  };

  const handleRemovePhoto = () => {
    setSelectedPhoto('');
    setUploadedPhotoName('');
    setCustomPhotoUrl('');
    showToast('Photo supprimée de la publication', 'info');
  };

  const handleRemoveVideo = () => {
    setSelectedVideo('');
    setUploadedVideoName('');
    setCustomVideoUrl('');
    setHasVideo(false);
    showToast('Vidéo supprimée de la publication', 'info');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Veuillez spécifier un titre pour votre publication.');
      return;
    }
    if (!content.trim()) {
      setError('Veuillez rédiger la description détaillée de votre offre ou opportunité.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    submitNewPost({
      title: title.trim(),
      content: content.trim(),
      category,
      city,
      sector: (category === 'stages' || category === 'emplois') ? sector : undefined,
      imageUrl: selectedPhoto || undefined,
      videoUrl: hasVideo && selectedVideo ? selectedVideo : undefined,
      externalLink: externalLink.trim() || undefined,
      isPaid,
      isUrgent,
      targetAudience: targetAudience.trim() || undefined,
      advantage: advantage.trim() || undefined,
      deadline: deadline.trim() || undefined,
      tags: tags.length ? tags : ['Opportunité RDC'],
    });

    // Reset form
    setTitle('');
    setContent('');
    setDeadline('');
    setExternalLink('');
    setSelectedPhoto('/src/assets/images/post_stage_tech_1790292226178.jpg');
    setSelectedVideo('');
    setHasVideo(false);
  };

  const parsedVideo = selectedVideo ? parseVideoUrl(selectedVideo) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white text-[#131b2e] border border-[#eaedff] rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#eaedff] flex items-center justify-between bg-[#f2f3ff]">
          <div>
            <h2 className="text-base font-bold text-[#131b2e] tracking-tight flex items-center gap-2">
              <span>Publier une opportunité</span>
            </h2>
            <p className="text-xs text-[#44474c] mt-0.5">
              En tant que : <strong className="text-[#131b2e]">{currentUser.name}</strong> ({currentUser.role})
            </p>
          </div>
          <button
            onClick={() => setIsCreatePostOpen(false)}
            className="p-1 rounded-xl text-[#44474c] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CDCF Moderation Warning notice */}
        <div className="px-6 py-2.5 bg-[#eaedff] border-b border-[#dae2fd] flex items-start gap-2.5 text-xs text-[#003558]">
          <ShieldAlert className="w-4 h-4 text-[#00629d] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#131b2e]">Modération de Sécurité Obligatoire :</span>
            <p className="text-[#44474c] mt-0.5">
              Toute offre avec photos/vidéos est vérifiée par les modérateurs pour garantir son authenticité.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-[#ffdad6] border border-[#ba1a1a]/30 rounded-2xl text-[#93000a] text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-[#131b2e] mb-1">
              Titre de l&apos;opportunité *
            </label>
            <input
              type="text"
              required
              placeholder="ex: Stage Académique en Développement Web & Réseau"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs sm:text-sm text-[#131b2e] placeholder-[#75777d] focus:outline-none focus:border-[#00629d]"
            />
          </div>

          {/* Category & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                Catégorie *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ExtendedCategory)}
                className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#00629d]"
              >
                <option value="stages">🎓 Stages Académiques &amp; Pro</option>
                <option value="emplois">💼 Emplois Juniors</option>
                <option value="bourses">🌟 Bourses d&apos;Études</option>
                <option value="formations">📖 Formations &amp; Ateliers</option>
                <option value="conferences">🎤 Conférences &amp; Débats</option>
                <option value="concours">🏆 Concours &amp; Hackathons</option>
                <option value="sorties">🏖️ Sorties &amp; Découvertes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                Ville cible (RDC) *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value as City)}
                className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#00629d]"
              >
                {citiesList.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sector (Privé vs Public) */}
          {(category === 'stages' || category === 'emplois') && (
            <div>
              <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                Secteur d&apos;activité (CDCF RDC) *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSector('private')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    sector === 'private'
                      ? 'bg-[#d6e3fe] border-[#00629d] text-[#0e1c2f] ring-1 ring-[#00629d]'
                      : 'bg-[#f2f3ff] border-[#dae2fd] text-[#44474c] hover:bg-[#eaedff]'
                  }`}
                >
                  Secteur Privé (Entreprises / ONG)
                </button>
                <button
                  type="button"
                  onClick={() => setSector('public_ministry')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    sector === 'public_ministry'
                      ? 'bg-[#0e1c2f] border-black text-white shadow-xs'
                      : 'bg-[#f2f3ff] border-[#dae2fd] text-[#44474c] hover:bg-[#eaedff]'
                  }`}
                >
                  Secteur Public &amp; Ministères
                </button>
              </div>
            </div>
          )}

          {/* Detailed Content */}
          <div>
            <label className="block text-xs font-semibold text-[#131b2e] mb-1">
              Description complète de l&apos;offre *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Précisez le contexte, la mission proposée, le profil recherché..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs sm:text-sm text-[#131b2e] placeholder-[#75777d] focus:outline-none focus:border-[#00629d] resize-none"
            />
          </div>

          {/* MEDIA SECTION: PHOTO & VIDÉO (REQUESTED FEATURE) */}
          <div className="p-4 rounded-2xl bg-[#faf8ff] border border-[#eaedff] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#00629d]">perm_media</span>
                <span className="font-bold text-xs uppercase tracking-wider text-[#131b2e]">
                  Médias : Ajouter Photo &amp; Vidéo
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px]">
                {selectedPhoto && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                    Photo incluse
                  </span>
                )}
                {hasVideo && selectedVideo && (
                  <span className="px-2 py-0.5 rounded-full bg-[#ffddb8] text-[#b87500] font-semibold border border-[#ffddb8]">
                    Vidéo incluse
                  </span>
                )}
              </div>
            </div>

            {/* Sub-tabs for media */}
            <div className="flex items-center gap-2 p-1 bg-[#eaedff] rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveMediaTab('photo')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all cursor-pointer ${
                  activeMediaTab === 'photo'
                    ? 'bg-white text-[#00629d] shadow-xs'
                    : 'text-[#44474c] hover:text-[#131b2e]'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>1. Photo / Image d&apos;illustration</span>
                {selectedPhoto && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
              </button>

              <button
                type="button"
                onClick={() => setActiveMediaTab('video')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all cursor-pointer ${
                  activeMediaTab === 'video'
                    ? 'bg-white text-[#00629d] shadow-xs'
                    : 'text-[#44474c] hover:text-[#131b2e]'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>2. Vidéo de présentation</span>
                {hasVideo && selectedVideo && <span className="w-2 h-2 rounded-full bg-[#00629d]" />}
              </button>
            </div>

            {/* TAB 1: PHOTO */}
            {activeMediaTab === 'photo' && (
              <div className="space-y-3 pt-1">
                {/* Photo source options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  {/* Option A: Upload local photo */}
                  <label className="p-3 rounded-xl border border-dashed border-[#dae2fd] bg-white hover:bg-[#f2f3ff] text-center flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors">
                    <Upload className="w-5 h-5 text-[#00629d]" />
                    <span className="text-xs font-bold text-[#131b2e]">Importer depuis mon appareil</span>
                    <span className="text-[10px] text-[#75777d]">JPG, PNG, WebP (jusqu&apos;à 10 Mo)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Option B: Enter image link */}
                  <div className="p-3 rounded-xl border border-[#dae2fd] bg-white space-y-1.5 flex flex-col justify-center">
                    <label className="text-[11px] font-semibold text-[#131b2e]">Ou coller l&apos;URL d&apos;une image web :</label>
                    <div className="flex gap-1.5">
                      <input
                        type="url"
                        placeholder="https://domaine.com/photo.jpg"
                        value={customPhotoUrl}
                        onChange={(e) => setCustomPhotoUrl(e.target.value)}
                        className="flex-1 px-2.5 py-1.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-lg text-xs text-[#131b2e] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCustomPhotoUrl}
                        className="px-3 py-1.5 bg-[#00629d] hover:bg-[#004a77] text-white text-xs font-semibold rounded-lg cursor-pointer"
                      >
                        Appliquer
                      </button>
                    </div>
                  </div>

                </div>

                {/* Option C: Curated Congolese photo presets */}
                <div>
                  <span className="text-[11px] font-semibold text-[#44474c] block mb-1.5">
                    Ou choisir une photo thématique sélectionnée :
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {photoPresets.map((preset) => {
                      const isSelected = selectedPhoto === preset.url;
                      return (
                        <button
                          key={preset.url}
                          type="button"
                          onClick={() => {
                            setSelectedPhoto(preset.url);
                            setPhotoMode('preset');
                          }}
                          className={`relative rounded-xl overflow-hidden border text-left p-1 transition-all cursor-pointer ${
                            isSelected 
                              ? 'border-[#00629d] ring-2 ring-[#00629d] shadow-sm' 
                              : 'border-[#dae2fd] hover:border-[#00629d]'
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.label}
                            className="w-full h-14 object-cover rounded-lg mb-1"
                          />
                          <span className="block text-[10px] font-semibold text-[#131b2e] truncate px-0.5">
                            {preset.label}
                          </span>
                          {isSelected && (
                            <span className="absolute top-2 right-2 p-0.5 bg-[#00629d] text-white rounded-full">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Photo Live Preview Box */}
                {selectedPhoto && (
                  <div className="p-3 bg-white rounded-xl border border-[#eaedff] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={selectedPhoto}
                        alt="Aperçu photo"
                        className="w-14 h-14 object-cover rounded-lg border border-[#eaedff] shrink-0"
                      />
                      <div className="truncate">
                        <span className="text-xs font-bold text-[#131b2e] block truncate">
                          Photo d&apos;illustration sélectionnée
                        </span>
                        <span className="text-[11px] text-[#75777d] truncate block">
                          {uploadedPhotoName || 'Image d’illustration attachée'}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer shrink-0"
                      title="Supprimer la photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: VIDÉO */}
            {activeMediaTab === 'video' && (
              <div className="space-y-3 pt-1">
                {/* Video source options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  {/* Option A: Upload local video file */}
                  <label className="p-3 rounded-xl border border-dashed border-[#dae2fd] bg-white hover:bg-[#f2f3ff] text-center flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors">
                    <Film className="w-5 h-5 text-[#00629d]" />
                    <span className="text-xs font-bold text-[#131b2e]">Importer un fichier vidéo</span>
                    <span className="text-[10px] text-[#75777d]">MP4, WebM, MOV (jusqu&apos;à 50 Mo)</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Option B: Enter video URL (YouTube, Vimeo, MP4 direct) */}
                  <div className="p-3 rounded-xl border border-[#dae2fd] bg-white space-y-1.5 flex flex-col justify-center">
                    <label className="text-[11px] font-semibold text-[#131b2e]">
                      Ou coller un lien (YouTube, Vimeo, MP4) :
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="url"
                        placeholder="https://youtube.com/watch?v=... ou direct .mp4"
                        value={customVideoUrl}
                        onChange={(e) => setCustomVideoUrl(e.target.value)}
                        className="flex-1 px-2.5 py-1.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-lg text-xs text-[#131b2e] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCustomVideoUrl}
                        className="px-3 py-1.5 bg-[#00629d] hover:bg-[#004a77] text-white text-xs font-semibold rounded-lg cursor-pointer"
                      >
                        Appliquer
                      </button>
                    </div>
                  </div>

                </div>

                {/* Option C: Quick presets */}
                <div>
                  <span className="text-[11px] font-semibold text-[#44474c] block mb-1.5">
                    Ou sélectionner un modèle vidéo de démonstration :
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {videoPresets.map((vp) => (
                      <button
                        key={vp.url}
                        type="button"
                        onClick={() => {
                          setSelectedVideo(vp.url);
                          setHasVideo(true);
                          setVideoMode('preset');
                          showToast(`Vidéo "${vp.label}" sélectionnée`, 'info');
                        }}
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                          selectedVideo === vp.url
                            ? 'bg-[#d6e3fe] border-[#00629d] text-[#0e1c2f]'
                            : 'bg-white border-[#dae2fd] hover:bg-[#f2f3ff]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Play className="w-3.5 h-3.5 text-[#00629d]" />
                          <span className="text-xs font-semibold text-[#131b2e]">{vp.label}</span>
                        </div>
                        {selectedVideo === vp.url && <CheckCircle2 className="w-4 h-4 text-[#00629d]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Video Live Preview Box */}
                {hasVideo && selectedVideo && (
                  <div className="p-3 bg-white rounded-xl border border-[#eaedff] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#131b2e] flex items-center gap-1.5">
                        <Video className="w-4 h-4 text-[#00629d]" />
                        <span>Aperçu du lecteur vidéo :</span>
                      </span>
                      <button
                        type="button"
                        onClick={handleRemoveVideo}
                        className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Retirer la vidéo</span>
                      </button>
                    </div>

                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
                      {parsedVideo && (parsedVideo.type === 'youtube' || parsedVideo.type === 'vimeo') ? (
                        <iframe
                          src={parsedVideo.embedUrl}
                          title="Aperçu vidéo"
                          className="w-full h-full border-0"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          src={selectedVideo}
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-contain"
                        >
                          Votre navigateur ne prend pas en charge la lecture de cette vidéo.
                        </video>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Key Metadata (Cible & Avantage) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                Public cible (étudiants)
              </label>
              <input
                type="text"
                placeholder="ex: Étudiants L2, L3, Master Informatique"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                Avantage / Rémunération
              </label>
              <input
                type="text"
                placeholder="ex: Indemnité de transport & collation"
                value={advantage}
                onChange={(e) => setAdvantage(e.target.value)}
                className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e]"
              />
            </div>
          </div>

          {/* Date limite & Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            <div>
              <label className="block text-xs font-semibold text-[#131b2e] mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#00629d]" />
                <span>Date limite de candidature</span>
              </label>
              <input
                type="text"
                placeholder="ex: 15 oct. 2026"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e]"
              />
            </div>

            <div className="flex gap-4 pt-2 sm:pt-4">
              <label className="flex items-center gap-1.5 cursor-pointer text-xs font-medium text-[#131b2e]">
                <input
                  type="checkbox"
                  checked={isPaid}
                  onChange={(e) => setIsPaid(e.target.checked)}
                  className="rounded text-[#00629d]"
                />
                <span>Rémunéré</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-xs font-medium text-[#93000a]">
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="rounded text-rose-600"
                />
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-rose-600" />
                  <span>Urgent</span>
                </span>
              </label>
            </div>
          </div>

          {/* External link & tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#131b2e] mb-1 flex items-center gap-1">
                <LinkIcon className="w-3.5 h-3.5 text-[#00629d]" />
                <span>Lien externe (optionnel)</span>
              </label>
              <input
                type="url"
                placeholder="https://entreprise.cd/carrieres"
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
                className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                Tags (séparés par virgules)
              </label>
              <input
                type="text"
                placeholder="Stage, Télécoms, Kinshasa"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e]"
              />
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-3 border-t border-[#eaedff] flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsCreatePostOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-[#44474c] hover:text-[#131b2e]"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-[#00629d] hover:bg-[#004a77] text-white font-bold text-xs rounded-full shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Soumettre pour modération</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
