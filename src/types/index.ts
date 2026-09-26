export type UserRole = 
  | 'student'
  | 'class_delegate'
  | 'student_association'
  | 'recruiter'
  | 'public_institution'
  | 'admin';

export type ExtendedCategory = 
  | 'all'
  | 'stages'
  | 'emplois'
  | 'bourses'
  | 'formations'
  | 'conferences'
  | 'concours'
  | 'sorties';

export type JobSector = 'all' | 'private' | 'public_ministry';

export type ProvinceId = 
  | 'all'
  | 'kinshasa'
  | 'haut-katanga'
  | 'nord-kivu'
  | 'sud-kivu'
  | 'tshopo'
  | 'lualaba'
  | 'kongo-central'
  | 'national-online';

export type City = 
  | 'Kinshasa'
  | 'Lubumbashi'
  | 'Goma'
  | 'Kisangani'
  | 'Bukavu'
  | 'Matadi'
  | 'Autre / National';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  city: City;
  avatarUrl?: string;
  isVerified?: boolean;
  isOfficialInstitution?: boolean;
  
  // Specific: Student
  university?: string;
  faculty?: string;
  academicYear?: string;
  cvFileName?: string;
  cvFileSize?: string;
  cvSummary?: string;
  skills?: string[];

  // Specific: Class Delegate
  delegationPromotion?: string;
  delegationFaculty?: string;
  delegationUniversity?: string;
  isDelegateValidated?: boolean;

  // Specific: Association
  associationName?: string;
  missionDescription?: string;
  websiteUrl?: string;

  // Specific: Recruiter / Company
  companyName?: string;
  industrySector?: string;
  companyWebsite?: string;

  // Specific: Public Institution / Ministry
  institutionName?: string;
  departmentService?: string;
  institutionType?: string;
}

export interface PostComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar?: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  category: ExtendedCategory;
  city: City;
  province?: ProvinceId;
  sector?: 'private' | 'public_ministry';
  imageUrl?: string;
  videoUrl?: string;
  videoType?: 'file' | 'youtube' | 'vimeo' | 'stream';
  externalLink?: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorOrg?: string;
  authorAvatar?: string;
  companyInitials?: string;
  isVerifiedCompany?: boolean;
  isOfficialInstitution?: boolean;
  isUrgent?: boolean;
  isBoosted?: boolean;
  isPaid?: boolean;
  hasApplied?: boolean;
  targetAudience?: string;
  advantage?: string;
  applicationMode?: string;
  interestedCount?: number;
  deadline?: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  createdAt: string;
  likesCount: number;
  likedByCurrentUser?: boolean;
  sharesCount: number;
  commentsCount: number;
  comments: PostComment[];
  tags: string[];
}

export interface StoryItem {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorInitials?: string;
  isVerified?: boolean;
  imageUrl: string;
  title: string;
  caption: string;
  linkText?: string;
  linkPostId?: string;
  createdAt: string;
  viewed?: boolean;
}

export interface DirectMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
  attachmentName?: string;
  isApplication?: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: UserRole;
  participantOrg?: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  postReferenceTitle?: string;
}
