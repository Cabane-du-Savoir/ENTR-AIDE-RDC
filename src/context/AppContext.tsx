import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  Post, 
  UserRole, 
  ExtendedCategory, 
  JobSector, 
  City, 
  ProvinceId,
  Conversation, 
  DirectMessage,
  StoryItem 
} from '../types';
import { 
  INITIAL_PROFILES, 
  INITIAL_POSTS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_MESSAGES,
  INITIAL_STORIES 
} from '../data/mockData';

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'heart';
}

interface AppContextType {
  currentUser: UserProfile;
  switchRole: (role: UserRole) => void;
  registerUser: (profile: UserProfile) => void;
  
  posts: Post[];
  selectedCategory: ExtendedCategory;
  setSelectedCategory: (cat: ExtendedCategory) => void;
  selectedProvince: ProvinceId;
  setSelectedProvince: (prov: ProvinceId) => void;
  filterRemunere: boolean;
  setFilterRemunere: React.Dispatch<React.SetStateAction<boolean>>;
  filterUrgents: boolean;
  setFilterUrgents: React.Dispatch<React.SetStateAction<boolean>>;

  activeBottomNav: 'opportunites' | 'forum-entraide' | 'cercles-clubs' | 'insertion-pro-cv';
  setActiveBottomNav: (tab: 'opportunites' | 'forum-entraide' | 'cercles-clubs' | 'insertion-pro-cv') => void;

  selectedCity: City | 'Toutes les villes';
  setSelectedCity: (city: City | 'Toutes les villes') => void;
  jobSectorFilter: JobSector;
  setJobSectorFilter: (sector: JobSector) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resetAllFilters: () => void;
  
  favorites: string[];
  toggleFavorite: (postId: string) => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  submitNewPost: (newPostData: Partial<Post>) => void;
  approvePost: (postId: string) => void;
  rejectPost: (postId: string, reason?: string) => void;
  boostPost: (postId: string, days: number, planName: string) => void;

  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  messages: Record<string, DirectMessage[]>;
  sendMessage: (convId: string, text: string, isApplication?: boolean) => void;
  startChatWithPostAuthor: (post: Post) => void;

  viewMode: 'mobile_shell' | 'responsive_full';
  setViewMode: (mode: 'mobile_shell' | 'responsive_full') => void;

  toast: ToastNotification | null;
  showToast: (message: string, type?: 'success' | 'info' | 'heart') => void;

  // Stories & Reels
  stories: StoryItem[];
  activeStory: StoryItem | null;
  setActiveStory: (story: StoryItem | null) => void;
  viewStory: (storyId: string) => void;

  // Modals
  isRegisterOpen: boolean;
  setIsRegisterOpen: (open: boolean) => void;
  isCreatePostOpen: boolean;
  setIsCreatePostOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isCvModalOpen: boolean;
  setIsCvModalOpen: (open: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  isBoostModalOpen: boolean;
  setIsBoostModalOpen: (open: boolean) => void;
  selectedPostForBoost: Post | null;
  setSelectedPostForBoost: (post: Post | null) => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (open: boolean) => void;
  selectedPostForShare: Post | null;
  setSelectedPostForShare: (post: Post | null) => void;
  isGuideOpen: boolean;
  setIsGuideOpen: (open: boolean) => void;
  isCoachingModalOpen: boolean;
  setIsCoachingModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('entraide_user');
    return saved ? JSON.parse(saved) : INITIAL_PROFILES.student;
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('entraide_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  // Material You Filter States
  const [selectedCategory, setSelectedCategory] = useState<ExtendedCategory>('all');
  const [selectedProvince, setSelectedProvince] = useState<ProvinceId>('all');
  const [filterRemunere, setFilterRemunere] = useState(false);
  const [filterUrgents, setFilterUrgents] = useState(false);
  const [activeBottomNav, setActiveBottomNav] = useState<'opportunites' | 'forum-entraide' | 'cercles-clubs' | 'insertion-pro-cv'>('opportunites');

  // Compatibility Filters
  const [selectedCity, setSelectedCity] = useState<City | 'Toutes les villes'>('Toutes les villes');
  const [jobSectorFilter, setJobSectorFilter] = useState<JobSector>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('entraide_favs');
    return saved ? JSON.parse(saved) : ['post_1', 'post_2'];
  });

  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, DirectMessage[]>>(INITIAL_MESSAGES);

  const [viewMode, setViewMode] = useState<'mobile_shell' | 'responsive_full'>('responsive_full');

  // Stories State
  const [stories, setStories] = useState<StoryItem[]>(INITIAL_STORIES);
  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);

  const viewStory = (storyId: string) => {
    const found = stories.find(s => s.id === storyId);
    if (found) {
      setActiveStory(found);
      setStories(prev => prev.map(s => s.id === storyId ? { ...s, viewed: true } : s));
    }
  };

  // Modals & User Feedback
  const [toast, setToast] = useState<ToastNotification | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBoostModalOpen, setIsBoostModalOpen] = useState(false);
  const [selectedPostForBoost, setSelectedPostForBoost] = useState<Post | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedPostForShare, setSelectedPostForShare] = useState<Post | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isCoachingModalOpen, setIsCoachingModalOpen] = useState(false);

  const showToast = (message: string, type: 'success' | 'info' | 'heart' = 'success') => {
    setToast({ id: `toast_${Date.now()}`, message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedProvince('all');
    setFilterRemunere(false);
    setFilterUrgents(false);
    setSelectedCity('Toutes les villes');
    setJobSectorFilter('all');
    setSearchQuery('');
    showToast('Filtres réinitialisés', 'info');
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('entraide_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('entraide_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('entraide_favs', JSON.stringify(favorites));
  }, [favorites]);

  const switchRole = (role: UserRole) => {
    if (INITIAL_PROFILES[role]) {
      setCurrentUser(INITIAL_PROFILES[role]);
      showToast(`Rôle basculé : ${INITIAL_PROFILES[role].name} (${role})`, 'info');
    }
  };

  const registerUser = (profile: UserProfile) => {
    setCurrentUser(profile);
    setIsRegisterOpen(false);
    showToast(`Compte créé avec succès ! Bienvenue ${profile.name}`, 'success');
  };

  const toggleFavorite = (postId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(postId);
      if (exists) {
        showToast('Offre retirée de vos favoris', 'info');
        return prev.filter(id => id !== postId);
      } else {
        showToast('Offre enregistrée dans vos favoris !', 'success');
        return [...prev, postId];
      }
    });
  };

  const toggleLike = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isLiked = p.likedByCurrentUser;
        if (!isLiked) {
          showToast(`Vous aimez : "${p.title.slice(0, 32)}..."`, 'heart');
        }
        return {
          ...p,
          likedByCurrentUser: !isLiked,
          likesCount: isLiked ? Math.max(0, p.likesCount - 1) : p.likesCount + 1,
        };
      }
      return p;
    }));
  };

  const addComment = (postId: string, text: string) => {
    if (!text.trim()) return;
    const newComment = {
      id: `c_${Date.now()}`,
      postId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      content: text.trim(),
      createdAt: 'À l’instant',
    };

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [newComment, ...(p.comments || [])],
        };
      }
      return p;
    }));
    showToast('Commentaire publié avec succès !', 'success');
  };

  const submitNewPost = (newPostData: Partial<Post>) => {
    const newPost: Post = {
      id: `post_${Date.now()}`,
      title: newPostData.title || 'Publication sans titre',
      content: newPostData.content || '',
      category: newPostData.category || 'stages',
      city: newPostData.city || currentUser.city || 'Kinshasa',
      province: newPostData.province || 'kinshasa',
      sector: newPostData.sector || 'private',
      imageUrl: newPostData.imageUrl,
      videoUrl: newPostData.videoUrl,
      videoType: newPostData.videoType,
      externalLink: newPostData.externalLink,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      authorOrg: currentUser.companyName || currentUser.institutionName || currentUser.associationName || currentUser.university,
      companyInitials: currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'ER',
      isOfficialInstitution: currentUser.role === 'public_institution' || !!currentUser.isOfficialInstitution,
      isVerifiedCompany: currentUser.role === 'recruiter',
      isUrgent: newPostData.isUrgent || false,
      isBoosted: false,
      isPaid: newPostData.isPaid || false,
      targetAudience: newPostData.targetAudience,
      advantage: newPostData.advantage,
      applicationMode: 'Via Plateforme',
      interestedCount: 1,
      deadline: newPostData.deadline,
      status: 'pending',
      createdAt: 'À l’instant',
      likesCount: 0,
      sharesCount: 0,
      commentsCount: 0,
      comments: [],
      tags: newPostData.tags || ['Nouveau'],
    };

    setPosts(prev => [newPost, ...prev]);
    setIsCreatePostOpen(false);
    showToast('Publication soumise ! Placée en attente de modération admin.', 'info');
  };

  const approvePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, status: 'approved' };
      }
      return p;
    }));
    showToast('Publication validée et diffusée en ligne !', 'success');
  };

  const rejectPost = (postId: string, reason?: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, status: 'rejected', rejectionReason: reason || 'Non conforme aux règles de la communauté' };
      }
      return p;
    }));
    showToast('Publication rejetée avec motif.', 'info');
  };

  const boostPost = (postId: string, days: number, planName: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { 
          ...p, 
          isBoosted: true,
          tags: Array.from(new Set(['En Vedette', ...p.tags]))
        };
      }
      return p;
    }));
    setIsBoostModalOpen(false);
    showToast(`Offre boostée pour ${days} jours avec succès !`, 'success');
  };

  const sendMessage = (convId: string, text: string, isApplication?: boolean) => {
    if (!text.trim()) return;
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newMsg: DirectMessage = {
      id: `m_${Date.now()}`,
      conversationId: convId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      text: text.trim(),
      timestamp: timeString,
      isApplication: !!isApplication,
      attachmentName: isApplication && currentUser.cvFileName ? currentUser.cvFileName : undefined,
    };

    setMessages(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), newMsg],
    }));

    setConversations(prev => prev.map(c => {
      if (c.id === convId) {
        return {
          ...c,
          lastMessage: text.trim(),
          lastMessageTime: timeString,
        };
      }
      return c;
    }));

    if (isApplication) {
      showToast('Candidature avec CV transmise au recruteur !', 'success');
    }
  };

  const startChatWithPostAuthor = (post: Post) => {
    let existing = conversations.find(c => c.participantId === post.authorId);
    let convId = existing?.id;

    if (!existing) {
      convId = `conv_${Date.now()}`;
      const newConv: Conversation = {
        id: convId,
        participantId: post.authorId,
        participantName: post.authorName,
        participantRole: post.authorRole,
        participantOrg: post.authorOrg,
        participantAvatar: post.authorRole === 'public_institution' ? '🏛️' : post.authorRole === 'recruiter' ? '🏢' : '👤',
        lastMessage: `Candidature initiée pour : ${post.title}`,
        lastMessageTime: 'À l’instant',
        unreadCount: 0,
        postReferenceTitle: post.title,
      };
      setConversations(prev => [newConv, ...prev]);
    }

    setActiveConversationId(convId!);
    setIsChatOpen(true);
    showToast(`Conversation ouverte avec ${post.authorName}`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchRole,
        registerUser,
        posts,
        selectedCategory,
        setSelectedCategory,
        selectedProvince,
        setSelectedProvince,
        filterRemunere,
        setFilterRemunere,
        filterUrgents,
        setFilterUrgents,
        activeBottomNav,
        setActiveBottomNav,
        selectedCity,
        setSelectedCity,
        jobSectorFilter,
        setJobSectorFilter,
        searchQuery,
        setSearchQuery,
        resetAllFilters,
        favorites,
        toggleFavorite,
        toggleLike,
        addComment,
        submitNewPost,
        approvePost,
        rejectPost,
        boostPost,
        conversations,
        activeConversationId,
        setActiveConversationId,
        messages,
        sendMessage,
        startChatWithPostAuthor,
        viewMode,
        setViewMode,
        toast,
        showToast,
        stories,
        activeStory,
        setActiveStory,
        viewStory,
        isRegisterOpen,
        setIsRegisterOpen,
        isCreatePostOpen,
        setIsCreatePostOpen,
        isAdminOpen,
        setIsAdminOpen,
        isCvModalOpen,
        setIsCvModalOpen,
        isChatOpen,
        setIsChatOpen,
        isBoostModalOpen,
        setIsBoostModalOpen,
        selectedPostForBoost,
        setSelectedPostForBoost,
        isShareModalOpen,
        setIsShareModalOpen,
        selectedPostForShare,
        setSelectedPostForShare,
        isGuideOpen,
        setIsGuideOpen,
        isCoachingModalOpen,
        setIsCoachingModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
