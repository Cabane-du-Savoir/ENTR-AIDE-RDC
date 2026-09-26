import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  PlusCircle, 
  MessageSquare, 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  UserCheck, 
  ChevronDown,
  FileText,
  Sparkles,
  HelpCircle,
  Bell
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    switchRole, 
    posts,
    conversations,
    setIsCreatePostOpen, 
    setIsRegisterOpen,
    setIsAdminOpen,
    setIsCvModalOpen,
    setIsChatOpen,
    setIsGuideOpen,
    resetAllFilters,
    setJobSectorFilter,
    setSelectedCategory,
    viewMode,
    setViewMode,
    showToast
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'notif_1',
      title: 'Vodacom Congo',
      message: 'Nouveau programme de stage pré-emploi digital ouvert aux étudiants.',
      read: false,
      category: 'stages',
    },
    {
      id: 'notif_2',
      title: 'Ministère ESU',
      message: 'Lancement officiel des bourses d’excellence 2026-2027.',
      read: false,
      category: 'bourses',
    },
    {
      id: 'notif_3',
      title: 'Rawbank SA',
      message: 'Votre candidature pour le stage Banque Digitale a été vue par le recruteur.',
      read: false,
      category: 'stages',
    },
  ]);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  const pendingPostsCount = posts.filter(p => p.status === 'pending').length;
  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  const markAllNotifsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('Toutes les notifications marquées comme lues', 'success');
  };

  const handleNotifClick = (notif: typeof notifications[0]) => {
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
    setIsNotifOpen(false);
    setSelectedCategory(notif.category as any);
    window.scrollTo({ top: 380, behavior: 'smooth' });
    showToast(`Ouverture des opportunités : ${notif.title}`, 'info');
  };

  const roleLabels: Record<UserRole, { label: string; badge: string; color: string }> = {
    student: { label: 'Simple Étudiant', badge: 'Étudiant', color: 'text-[#00629d] bg-[#eaedff] border-[#dae2fd]' },
    class_delegate: { label: 'Délégué de promotion', badge: 'Délégué', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    student_association: { label: 'Association étudiante', badge: 'Association', color: 'text-purple-700 bg-purple-50 border-purple-200' },
    recruiter: { label: 'Recruteur / Entreprise', badge: 'Entreprise', color: 'text-[#b87500] bg-[#ffddb8]/40 border-[#ffddb8]' },
    public_institution: { label: 'Ministère / Institution', badge: 'Officiel RDC', color: 'text-[#0e1c2f] bg-[#d6e3fe] border-[#bac7e1]' },
    admin: { label: 'Administrateur', badge: 'Admin', color: 'text-rose-700 bg-rose-50 border-rose-200' },
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#faf8ff]/85 backdrop-blur-xl border-b border-[#eaedff] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      
      {/* Upper Utility Bar on desktop */}
      <div className="hidden sm:flex items-center justify-between px-4 sm:px-8 py-1 text-xs bg-[#f2f3ff] text-[#44474c] border-b border-[#eaedff]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">ENTR&apos;AIDE RDC · Plateforme Universitaire &amp; Opportunités Jeunesse Congolaise</span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* View mode toggle */}
          <div className="flex items-center bg-white border border-[#eaedff] rounded-lg p-0.5 shadow-xs">
            <button
              onClick={() => setViewMode('responsive_full')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                viewMode === 'responsive_full' ? 'bg-[#00629d] text-white shadow-xs' : 'text-[#44474c] hover:text-[#131b2e]'
              }`}
              title="Affichage bureau plein écran"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Vue Web</span>
            </button>
            <button
              onClick={() => setViewMode('mobile_shell')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                viewMode === 'mobile_shell' ? 'bg-[#00629d] text-white shadow-xs' : 'text-[#44474c] hover:text-[#131b2e]'
              }`}
              title="Simulateur Mobile Android (Google Play Store)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Aperçu Mobile</span>
            </button>
          </div>

          <span className="text-[#c5c6cd]">|</span>
          <span className="font-medium text-[#44474c]">🇨🇩 République Démocratique du Congo</span>
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Zone */}
        <button
          onClick={() => {
            resetAllFilters();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showToast('Accueil réinitialisé', 'info');
          }}
          className="flex items-center gap-2.5 min-w-0 flex-1 text-left cursor-pointer group"
          title="Retour à l'accueil ENTR'AIDE RDC"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00629d] to-[#00a2fd] group-hover:scale-105 text-white flex items-center justify-center font-black text-base shadow-sm shrink-0 transition-transform">
            E
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base text-[#131b2e] group-hover:text-[#00629d] truncate tracking-tight transition-colors">
                ENTR&apos;AIDE <span className="text-[#00629d]">RDC</span>
              </span>
            </div>
            <span className="text-[11px] text-[#44474c] truncate font-medium">
              Kinshasa · Lubumbashi · Goma
            </span>
          </div>
        </button>

        {/* Right Actions Zone */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          
          {/* Quick Publish button */}
          <button
            onClick={() => setIsCreatePostOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#00629d] hover:bg-[#004a77] text-white font-semibold text-xs shadow-sm active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span className="hidden sm:inline">Publier une opportunité</span>
            <span className="sm:hidden">Publier</span>
          </button>

          {/* Direct Chat Trigger */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="relative w-10 h-10 flex items-center justify-center text-[#44474c] hover:text-[#131b2e] rounded-full active:bg-[#eaedff] transition-colors cursor-pointer"
            title="Messagerie directe (Chat)"
          >
            <span className="material-symbols-outlined text-[22px]">chat</span>
            {unreadMessagesCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-[#00629d] text-white text-[10px] font-bold leading-none animate-pulse">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative w-10 h-10 flex items-center justify-center text-[#44474c] hover:text-[#131b2e] rounded-full active:bg-[#eaedff] transition-colors cursor-pointer"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-[#ba1a1a] text-white text-[10px] font-bold leading-none">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-[#eaedff] rounded-2xl shadow-xl p-3 text-xs z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#eaedff]">
                  <span className="font-bold text-[#131b2e]">Notifications</span>
                  <button
                    onClick={markAllNotifsRead}
                    className="text-[10px] text-[#00629d] hover:underline font-semibold cursor-pointer"
                  >
                    Tout marquer comme lu
                  </button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notifications.map(n => (
                    <button
                      key={n.id}
                      onClick={() => handleNotifClick(n)}
                      className={`w-full text-left p-2.5 rounded-xl transition-colors cursor-pointer border ${
                        n.read ? 'bg-[#faf8ff] border-[#eaedff] opacity-75' : 'bg-[#f2f3ff] border-[#dae2fd] shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-[#131b2e] block text-[11px] font-bold">{n.title}</strong>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-[#00629d]" />
                        )}
                      </div>
                      <p className="text-[11px] text-[#44474c] leading-relaxed">{n.message}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Guide Helper button */}
          <button
            onClick={() => setIsGuideOpen(true)}
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#eaedff] text-[#00629d] hover:bg-[#dae2fd] text-xs font-semibold transition-colors cursor-pointer"
            title="Guide d'utilisation de la plateforme"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#00629d]" />
            <span>Guide</span>
          </button>

          {/* Admin Moderation Button */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
            title="Panneau de modération"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Modération</span>
            {pendingPostsCount > 0 && (
              <span className="px-1.5 py-0.2 bg-rose-600 text-white rounded-full text-[10px] font-bold">
                {pendingPostsCount}
              </span>
            )}
          </button>

          {/* User Profile & Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-white hover:bg-[#f2f3ff] border border-[#eaedff] text-xs font-medium text-[#131b2e] shadow-xs transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#00629d] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {currentUser.name.charAt(0)}
              </div>
              <div className="hidden md:block text-left max-w-[110px] truncate">
                <span className="block font-bold text-[11px] text-[#131b2e] truncate leading-tight">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-[#44474c] block truncate leading-tight">
                  {roleLabels[currentUser.role]?.badge || currentUser.role}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#44474c]" />
            </button>

            {/* Dropdown Menu */}
            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-[#eaedff] rounded-2xl shadow-2xl p-2 text-xs z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-[#eaedff]">
                  <p className="font-bold text-[#131b2e]">{currentUser.name}</p>
                  <p className="text-[#44474c] text-[11px]">{currentUser.email}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-[10px] text-[#44474c]">Rôle actif :</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${roleLabels[currentUser.role].color}`}>
                      {roleLabels[currentUser.role].label}
                    </span>
                  </div>
                </div>

                <div className="py-1">
                  <div className="px-3 py-1 text-[10px] font-bold text-[#44474c] uppercase tracking-wider">
                    Simuler un autre rôle (CDCF RDC)
                  </div>
                  {(Object.keys(roleLabels) as UserRole[]).map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        switchRole(role);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl flex items-center justify-between transition-colors ${
                        currentUser.role === role ? 'bg-[#eaedff] text-[#00629d] font-bold' : 'text-[#44474c] hover:bg-[#f2f3ff]'
                      }`}
                    >
                      <span>{roleLabels[role].label}</span>
                      {currentUser.role === role && <span className="text-[#00629d] text-[10px] font-bold">Actif</span>}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#eaedff] flex flex-col gap-1">
                  <button
                    onClick={() => {
                      setIsCvModalOpen(true);
                      setIsRoleDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl bg-[#f2f3ff] text-[#00629d] hover:bg-[#eaedff] flex items-center gap-2 font-semibold"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Accéder à ma CVthèque</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsRegisterOpen(true);
                      setIsRoleDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-2 font-semibold"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Créer un profil (Formulaire 3 étapes)</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
