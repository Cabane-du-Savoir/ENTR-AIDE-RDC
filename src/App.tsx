import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Feed } from './components/Feed';
import { RightSidebar } from './components/RightSidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { RegistrationModal } from './components/RegistrationModal';
import { CreatePostModal } from './components/CreatePostModal';
import { AdminModeration } from './components/AdminModeration';
import { ChatDirect } from './components/ChatDirect';
import { CvThequeModal } from './components/CvThequeModal';
import { BoostModal } from './components/BoostModal';
import { ShareModal } from './components/ShareModal';
import { QuickGuideModal } from './components/QuickGuideModal';
import { CreateStoryModal } from './components/CreateStoryModal';
import { StoryModal } from './components/StoryModal';
import { Toast } from './components/Toast';
import { Wifi, BatteryMedium, Signal, Smartphone, Monitor } from 'lucide-react';

const AppContent: React.FC = () => {
  const { viewMode, setViewMode } = useApp();

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-sans selection:bg-[#00629d] selection:text-white">
      
      {/* If in Mobile Simulator Mode */}
      {viewMode === 'mobile_shell' ? (
        <div className="min-h-screen bg-slate-950 py-4 sm:py-8 px-2 sm:px-4 flex flex-col items-center justify-center">
          
          {/* Top Frame Control */}
          <div className="mb-4 flex items-center justify-between w-full max-w-[430px] px-2 text-xs text-slate-400">
            <span className="font-bold text-sky-400 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4" />
              <span>Simulateur Android (Google Play Store RDC)</span>
            </span>
            <button
              onClick={() => setViewMode('responsive_full')}
              className="text-slate-300 hover:text-white flex items-center gap-1 bg-slate-900 border border-slate-700 px-2.5 py-1 rounded-lg cursor-pointer"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Mode Plein Écran</span>
            </button>
          </div>

          {/* Android Smartphone Bezel & Shell */}
          <div className="w-full max-w-[420px] h-[890px] bg-[#faf8ff] rounded-[50px] border-[10px] border-slate-900 shadow-2xl relative overflow-hidden flex flex-col ring-1 ring-slate-800">
            
            {/* Status Bar */}
            <div className="h-10 bg-[#faf8ff]/95 backdrop-blur-md px-6 flex items-center justify-between text-xs text-[#131b2e] shrink-0 z-50 border-b border-[#eaedff]">
              <span className="font-bold text-[11px] tabular-nums">12:30</span>
              
              {/* Speaker notch */}
              <div className="w-20 h-4 bg-slate-900 rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              </div>

              <div className="flex items-center gap-1.5 text-[#44474c]">
                <Signal className="w-3.5 h-3.5" />
                <Wifi className="w-3.5 h-3.5" />
                <BatteryMedium className="w-4 h-4 text-emerald-600" />
              </div>
            </div>

            {/* Mobile Header Bar */}
            <div className="relative">
              <Navbar />
            </div>

            {/* Scrollable Mobile Viewport */}
            <div className="flex-1 overflow-y-auto px-4 pt-16 pb-28 no-scrollbar bg-[#faf8ff]">
              <Feed />
            </div>

            {/* Fixed Mobile Bottom Navigation */}
            <MobileBottomNav />

          </div>
        </div>
      ) : (
        /* Full-Width Web / Responsive Hybrid Mode */
        <div className="flex flex-col min-h-screen bg-[#faf8ff]">
          <Navbar />

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Main Content Area (Timeline, Posts, Feed) */}
              <div className="lg:col-span-8">
                <Feed />
              </div>

              {/* Right Sidebar (Official institutions, Google Play APK status, Boosts) */}
              <div className="hidden lg:block lg:col-span-4 sticky top-24">
                <RightSidebar />
              </div>

            </div>
          </main>

          {/* Bottom Nav on mobile viewports */}
          <MobileBottomNav />

          {/* Minimal Footnote */}
          <footer className="py-8 border-t border-[#eaedff] bg-white text-[#44474c] text-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p>© 2026 ENTR&apos;AIDE RDC · Plateforme pour l&apos;insertion professionnelle et l&apos;épanouissement de la jeunesse étudiante congolaise.</p>
              <div className="flex items-center gap-4 text-[#44474c]">
                <span>Kinshasa · Lubumbashi · Goma</span>
                <span>•</span>
                <span className="text-[#00629d] font-bold">100% en ligne</span>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* Global Modals & User Feedback */}
      <RegistrationModal />
      <CreatePostModal />
      <AdminModeration />
      <ChatDirect />
      <CvThequeModal />
      <BoostModal />
      <ShareModal />
      <QuickGuideModal />
      <CreateStoryModal />
      <StoryModal />
      <Toast />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
