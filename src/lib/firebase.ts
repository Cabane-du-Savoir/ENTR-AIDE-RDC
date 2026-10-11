import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  initializeFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  onSnapshot, 
  query, 
  orderBy, 
  limit,
  serverTimestamp,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Post, StoryItem, DirectMessage, UserProfile } from '../types';
import { INITIAL_POSTS, INITIAL_STORIES } from '../data/mockData';

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Use the dedicated database ID with experimentalForceLongPolling for instant, reliable connection in sandboxes, iframes and mobile networks
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, firebaseConfig.firestoreDatabaseId || '(default)');

// Verify database connection at startup
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Connexion cloud hors-ligne, reprise en cache local.");
    }
  }
}
testConnection();

// Collections
export const POSTS_COLLECTION = 'posts';
export const STORIES_COLLECTION = 'stories';
export const MESSAGES_COLLECTION = 'messages';
export const USERS_COLLECTION = 'users';

/**
 * Seed initial sample posts if database collection is empty
 */
export async function seedInitialPostsIfEmpty() {
  try {
    const snap = await getDocs(query(collection(db, POSTS_COLLECTION), limit(1)));
    if (snap.empty) {
      console.log("Seeding initial posts to Firestore...");
      for (const post of INITIAL_POSTS) {
        await setDoc(doc(db, POSTS_COLLECTION, post.id), {
          ...post,
          syncedAt: new Date().toISOString()
        });
      }
    }
  } catch (err) {
    console.warn("Note sur l'initialisation des posts:", err);
  }
}

/**
 * Seed initial stories if empty
 */
export async function seedInitialStoriesIfEmpty() {
  try {
    const snap = await getDocs(query(collection(db, STORIES_COLLECTION), limit(1)));
    if (snap.empty) {
      console.log("Seeding initial stories to Firestore...");
      for (const story of INITIAL_STORIES) {
        await setDoc(doc(db, STORIES_COLLECTION, story.id), {
          ...story,
          syncedAt: new Date().toISOString()
        });
      }
    }
  } catch (err) {
    console.warn("Note sur l'initialisation des stories:", err);
  }
}

/**
 * Real-time listener for Posts
 */
export function subscribeToPosts(callback: (posts: Post[]) => void) {
  const q = collection(db, POSTS_COLLECTION);
  return onSnapshot(q, (snapshot) => {
    if (!snapshot.empty) {
      const livePosts: Post[] = [];
      snapshot.forEach((docSnap) => {
        livePosts.push(docSnap.data() as Post);
      });
      // Sort: boosted first, then latest
      livePosts.sort((a, b) => {
        if (a.isBoosted && !b.isBoosted) return -1;
        if (!a.isBoosted && b.isBoosted) return 1;
        return (b.id || '').localeCompare(a.id || '');
      });
      callback(livePosts);
    }
  }, (error) => {
    console.warn("Firestore posts listener notice:", error);
  });
}

/**
 * Save or update a Post in Firestore
 */
export async function savePostToFirestore(post: Post) {
  try {
    await setDoc(doc(db, POSTS_COLLECTION, post.id), {
      ...post,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn("Erreur sauvegarde post Firestore:", err);
  }
}

/**
 * Real-time listener for Stories
 */
export function subscribeToStories(callback: (stories: StoryItem[]) => void) {
  const q = collection(db, STORIES_COLLECTION);
  return onSnapshot(q, (snapshot) => {
    if (!snapshot.empty) {
      const liveStories: StoryItem[] = [];
      snapshot.forEach((docSnap) => {
        liveStories.push(docSnap.data() as StoryItem);
      });
      callback(liveStories);
    }
  }, (error) => {
    console.warn("Firestore stories listener notice:", error);
  });
}

/**
 * Save a new Story in Firestore
 */
export async function saveStoryToFirestore(story: StoryItem) {
  try {
    await setDoc(doc(db, STORIES_COLLECTION, story.id), {
      ...story,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn("Erreur sauvegarde story Firestore:", err);
  }
}

/**
 * Save a direct message in Firestore
 */
export async function saveMessageToFirestore(convId: string, message: DirectMessage) {
  try {
    await setDoc(doc(db, MESSAGES_COLLECTION, message.id), {
      convId,
      ...message,
      createdAtIso: new Date().toISOString()
    });
  } catch (err) {
    console.warn("Erreur sauvegarde message Firestore:", err);
  }
}

/**
 * Real-time listener for Messages
 */
export function subscribeToMessages(callback: (messagesByConv: Record<string, DirectMessage[]>) => void) {
  const q = collection(db, MESSAGES_COLLECTION);
  return onSnapshot(q, (snapshot) => {
    if (!snapshot.empty) {
      const grouped: Record<string, DirectMessage[]> = {};
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const convId = data.convId || 'c_default';
        if (!grouped[convId]) grouped[convId] = [];
        grouped[convId].push({
          id: data.id,
          conversationId: convId,
          senderId: data.senderId,
          senderName: data.senderName || 'Utilisateur',
          senderRole: data.senderRole || 'student',
          text: data.text,
          timestamp: data.timestamp || data.time || 'À l’instant',
          isApplication: data.isApplication,
          attachmentName: data.attachmentName || data.attachment?.name,
          attachmentSize: data.attachmentSize || data.attachment?.size,
          attachmentUrl: data.attachmentUrl || data.attachment?.url,
        });
      });
      callback(grouped);
    }
  }, (error) => {
    console.warn("Firestore messages listener notice:", error);
  });
}

/**
 * Save user profile to Firestore
 */
export async function saveUserProfileToFirestore(profile: UserProfile) {
  try {
    await setDoc(doc(db, USERS_COLLECTION, profile.id), {
      ...profile,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn("Erreur profil Firestore:", err);
  }
}
