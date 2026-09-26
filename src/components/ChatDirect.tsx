import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Send, 
  FileText, 
  Building, 
  GraduationCap, 
  Paperclip, 
  CheckCheck, 
  MessageSquare, 
  Sparkles,
  User,
  ArrowRight
} from 'lucide-react';

export const ChatDirect: React.FC = () => {
  const { 
    isChatOpen, 
    setIsChatOpen, 
    conversations, 
    activeConversationId, 
    setActiveConversationId,
    messages, 
    sendMessage, 
    currentUser,
    setIsCvModalOpen
  } = useApp();

  const [inputText, setInputText] = useState('');

  if (!isChatOpen) return null;

  const currentConvId = activeConversationId || (conversations[0]?.id ?? null);
  const activeConversation = conversations.find(c => c.id === currentConvId);
  const conversationMessages = currentConvId ? (messages[currentConvId] || []) : [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !currentConvId) return;

    sendMessage(currentConvId, inputText);
    setInputText('');
  };

  const handleQuickApplication = () => {
    if (!currentConvId) return;
    const msg = `Bonjour, je vous transmets ma candidature avec mon CV certifié pour l'offre "${activeConversation?.postReferenceTitle || 'de stage'}". Je me tiens à votre entière disposition pour tout entretien.`;
    sendMessage(currentConvId, msg, true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-hidden animate-in fade-in">
      <div className="relative w-full max-w-4xl h-[85vh] bg-white text-[#131b2e] border border-[#eaedff] rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Column: Conversations List */}
        <div className="w-full md:w-80 border-r border-[#eaedff] flex flex-col bg-[#f2f3ff] shrink-0">
          
          {/* Header */}
          <div className="p-4 border-b border-[#eaedff] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#eaedff] text-[#00629d] flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-sm text-[#131b2e]">Messagerie Directe</h2>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="md:hidden p-1.5 rounded-xl text-[#44474c] hover:bg-[#eaedff]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Notice */}
          <div className="px-4 py-2 bg-[#eaedff]/70 border-b border-[#dae2fd] text-[11px] text-[#003558] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium">Échanges sécurisés Étudiants &amp; Recruteurs RDC</span>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#eaedff]">
            {conversations.length > 0 ? (
              conversations.map(conv => {
                const isActive = conv.id === currentConvId;
                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    className={`w-full text-left p-3.5 flex items-start gap-3 transition-colors cursor-pointer ${
                      isActive ? 'bg-white shadow-xs border-l-4 border-[#00629d]' : 'hover:bg-white/60'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-2xl bg-[#eaedff] border border-[#dae2fd] flex items-center justify-center text-lg shrink-0">
                      <span>{conv.participantAvatar || '👤'}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-xs text-[#131b2e] truncate">{conv.participantName}</span>
                        <span className="text-[10px] text-[#75777d]">{conv.lastMessageTime}</span>
                      </div>
                      <p className="text-[11px] text-[#44474c] truncate">{conv.lastMessage}</p>
                      
                      {conv.postReferenceTitle && (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#d6e3fe] text-[#0e1c2f] text-[9px] font-semibold truncate max-w-full">
                          Offre : {conv.postReferenceTitle}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-[#75777d] italic">
                Aucune conversation active pour le moment.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Chat View */}
        {activeConversation ? (
          <div className="flex-1 flex flex-col bg-white">
            
            {/* Chat Header */}
            <div className="p-4 border-b border-[#eaedff] flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#eaedff] border border-[#dae2fd] flex items-center justify-center text-xl shadow-xs">
                  <span>{activeConversation.participantAvatar || '👤'}</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#131b2e]">{activeConversation.participantName}</h3>
                  <div className="flex items-center gap-2 text-[11px] text-[#44474c]">
                    <span>{activeConversation.participantOrg || 'RDC'}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      En ligne
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCvModalOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] text-[#00629d] text-xs font-semibold border border-[#eaedff] transition-colors cursor-pointer"
                  title="Voir le CV de l'étudiant"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Consulter CV</span>
                </button>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1.5 rounded-xl text-[#44474c] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Application shortcut banner */}
            {activeConversation.postReferenceTitle && (
              <div className="px-4 py-2.5 bg-[#eaedff] border-b border-[#dae2fd] flex items-center justify-between gap-3 text-xs">
                <div className="truncate">
                  <span className="text-[#003558] font-bold">Candidature en cours : </span>
                  <span className="text-[#131b2e] font-semibold">{activeConversation.postReferenceTitle}</span>
                </div>
                <button
                  onClick={handleQuickApplication}
                  className="px-3 py-1 bg-[#00629d] hover:bg-[#004a77] text-white rounded-full text-xs font-semibold shrink-0 transition-all active:scale-95 shadow-xs cursor-pointer"
                >
                  Transmettre mon CV
                </button>
              </div>
            )}

            {/* Messages Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#faf8ff]">
              {conversationMessages.map(msg => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1 text-[10px] text-[#75777d] mb-1">
                      <span>{msg.senderName}</span>
                      <span>·</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isMe
                          ? 'bg-[#00629d] text-white rounded-tr-xs shadow-sm'
                          : 'bg-white text-[#131b2e] border border-[#eaedff] rounded-tl-xs shadow-xs'
                      }`}
                    >
                      <p>{msg.text}</p>

                      {/* Attached CV Badge */}
                      {msg.isApplication && (
                        <div className={`mt-2.5 p-2 rounded-xl flex items-center justify-between gap-2 text-[11px] ${
                          isMe ? 'bg-white/15 text-white' : 'bg-[#f2f3ff] text-[#00629d] border border-[#dae2fd]'
                        }`}>
                          <div className="flex items-center gap-1.5 truncate">
                            <FileText className="w-4 h-4 shrink-0" />
                            <span className="truncate font-medium">{currentUser.cvFileName || 'CV_Etudiant_Certifie.pdf'}</span>
                          </div>
                          <span className="font-bold text-[10px] uppercase">PDF</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-[#eaedff] flex items-center gap-2">
              <button
                type="button"
                onClick={handleQuickApplication}
                className="p-2 rounded-xl text-[#00629d] hover:bg-[#eaedff] transition-colors cursor-pointer"
                title="Joindre mon CV"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Rédigez votre message ou posez une question..."
                className="flex-1 px-4 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-full text-xs text-[#131b2e] placeholder-[#75777d] focus:outline-none focus:border-[#00629d]"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-full bg-[#00629d] text-white hover:bg-[#004a77] disabled:opacity-40 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-[#75777d]">
            <MessageSquare className="w-12 h-12 text-[#dae2fd] mb-2" />
            <p className="text-sm font-semibold text-[#131b2e]">Sélectionnez une conversation</p>
            <p className="text-xs text-[#44474c] max-w-sm mt-1">
              Échangez directement avec les entreprises, les recruteurs et les institutions de la RDC.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
