import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Download, 
  FileText, 
  GraduationCap, 
  MapPin, 
  Mail, 
  Phone, 
  CheckCircle, 
  Plus, 
  Trash2, 
  Briefcase, 
  Sparkles,
  Search,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const CvThequeModal: React.FC = () => {
  const { isCvModalOpen, setIsCvModalOpen, currentUser, setIsCoachingModalOpen, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'my_cv' | 'browse_candidates'>('my_cv');
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState<string[]>(
    currentUser.skills || ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Gestion de projet Agile']
  );
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUni, setFilterUni] = useState('all');

  if (!isCvModalOpen) return null;

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim() || skills.includes(newSkill.trim())) return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill('');
    showToast('Compétence ajoutée au profil !', 'success');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleDownloadCv = () => {
    setDownloadSuccess(true);
    const element = document.createElement('a');
    const file = new Blob([
      `CV ENTR'AIDE RDC - INSERTION PROFESSIONNELLE\n\nNom Complet: ${currentUser.name}\nEmail: ${currentUser.email}\nTéléphone: ${currentUser.phone}\nVille: ${currentUser.city}\nUniversité: ${currentUser.university || 'Université de Kinshasa (UNIKIN)'}\nFaculté: ${currentUser.faculty || 'Sciences Informatiques'}\nPromotion: ${currentUser.academicYear || 'Licence 3'}\n\nCompétences Clés:\n${skills.map(s => `- ${s}`).join('\n')}\n\nDocument généré via la plateforme ENTR'AIDE RDC.`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = currentUser.cvFileName || `CV_${currentUser.name.replace(/\s+/g, '_')}_2026.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('Téléchargement de votre CV certifié initié', 'success');

    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const sampleTalents = [
    {
      id: 't_1',
      name: 'Christian Kalombo',
      university: 'UNIKIN',
      faculty: 'Sciences Informatiques',
      level: 'Licence 3',
      city: 'Kinshasa',
      skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
      status: 'À la recherche d’un stage de fin d’études',
      cvSize: '420 Ko',
    },
    {
      id: 't_2',
      name: 'Esther Kasongo',
      university: 'UPN',
      faculty: 'Sciences Économiques & Gestion',
      level: 'Master 1',
      city: 'Kinshasa',
      skills: ['Comptabilité OHADA', 'Analyse Financière', 'Excel Avancé', 'Audit'],
      status: 'Disponible immédiatement pour stage pro',
      cvSize: '350 Ko',
    },
    {
      id: 't_3',
      name: 'Jonathan Mutombo',
      university: 'UNILU',
      faculty: 'Polytechnique / Mines & Énergie',
      level: 'Master 2',
      city: 'Lubumbashi',
      skills: ['Géologie minière', 'AutoCAD', 'Sécurité industrielle HSE'],
      status: 'Prêt pour insertion premier emploi',
      cvSize: '510 Ko',
    },
    {
      id: 't_4',
      name: 'Divine Bilonda',
      university: 'UCC',
      faculty: 'Droit Économique & des Affaires',
      level: 'Licence 3',
      city: 'Kinshasa',
      skills: ['Droit des contrats', 'Conformité juridique', 'Rédaction d’actes'],
      status: 'Recherche stage en cabinet ou banque',
      cvSize: '290 Ko',
    },
  ];

  const filteredTalents = sampleTalents.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesUni = filterUni === 'all' || t.university === filterUni;
    return matchesSearch && matchesUni;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white text-[#131b2e] border border-[#eaedff] rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#eaedff] bg-[#f2f3ff] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#eaedff] text-[#00629d]">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#131b2e] tracking-tight flex items-center gap-2">
                <span>CV-Thèque &amp; Insertion Professionnelle</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#d6e3fe] text-[#0e1c2f]">
                  Profil Étudiant RDC
                </span>
              </h2>
              <p className="text-xs text-[#44474c] mt-0.5">
                Centralisation des compétences et mise en relation directe avec les entreprises
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCvModalOpen(false)}
            className="p-1.5 rounded-xl text-[#44474c] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 pt-3 flex gap-2 border-b border-[#eaedff] text-xs font-semibold bg-white">
          <button
            onClick={() => setActiveTab('my_cv')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'my_cv'
                ? 'border-[#00629d] text-[#00629d]'
                : 'border-transparent text-[#44474c] hover:text-[#131b2e]'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Mon Espace CV Étudiant</span>
          </button>

          <button
            onClick={() => setActiveTab('browse_candidates')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'browse_candidates'
                ? 'border-[#00629d] text-[#00629d]'
                : 'border-transparent text-[#44474c] hover:text-[#131b2e]'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>CVthèque Recruteurs (Base Étudiants)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6 bg-white">
          
          {activeTab === 'my_cv' ? (
            <>
              {/* Profile Card */}
              <div className="p-5 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-[#00629d] text-white flex items-center justify-center text-xl font-bold shadow-sm">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#131b2e]">{currentUser.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#44474c] mt-0.5">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-[#00629d]" />
                        {currentUser.university || 'Université de Kinshasa (UNIKIN)'}
                      </span>
                      <span>•</span>
                      <span>{currentUser.academicYear || 'Licence 3 Informatique'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#44474c] mt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {currentUser.city}</span>
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {currentUser.email}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsCvModalOpen(false);
                    setIsCoachingModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[#ffddb8] hover:bg-[#ffb95f] text-[#b87500] font-bold text-xs rounded-full shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Audit IA de mon CV</span>
                </button>
              </div>

              {/* PDF Document Section */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#44474c]">
                  Document CV Téléchargeable (Format PDF)
                </h4>

                <div className="p-4 rounded-2xl border border-[#dae2fd] bg-[#faf8ff] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center font-bold text-xs shrink-0">
                      PDF
                    </div>
                    <div className="truncate">
                      <p className="font-bold text-xs text-[#131b2e] truncate">
                        {currentUser.cvFileName || `CV_${currentUser.name.replace(/\s+/g, '_')}_2026.pdf`}
                      </p>
                      <p className="text-[11px] text-[#44474c]">
                        Taille : {currentUser.cvFileSize || '420 Ko'} · Mis à jour récemment
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleDownloadCv}
                    className="px-4 py-2 bg-[#00629d] hover:bg-[#004a77] text-white rounded-full font-semibold text-xs flex items-center gap-1.5 shrink-0 shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{downloadSuccess ? 'Téléchargé !' : 'Télécharger le PDF'}</span>
                  </button>
                </div>
              </div>

              {/* Skills Tags Management */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#44474c]">
                    Compétences &amp; Connaissances Clés
                  </h4>
                  <span className="text-[11px] text-[#75777d]">{skills.length} compétences</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-xl bg-[#eaedff] text-[#003558] border border-[#dae2fd] text-xs font-semibold flex items-center gap-1.5"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-[#44474c] hover:text-[#ba1a1a]"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                {/* Add new skill form */}
                <form onSubmit={handleAddSkill} className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Ajouter une compétence (ex: Python, Gestion RH, Excel...)"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="flex-1 px-3.5 py-2 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] placeholder-[#75777d] focus:outline-none focus:border-[#00629d]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#00629d] text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-xs hover:bg-[#004a77] cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Ajouter</span>
                  </button>
                </form>
              </div>
            </>
          ) : (
            /* Browse Candidates for Recruiters */
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-[#75777d]" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher par nom, faculté ou compétence..."
                    className="w-full pl-9 pr-4 py-2 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] placeholder-[#75777d] focus:outline-none focus:border-[#00629d]"
                  />
                </div>

                <select
                  value={filterUni}
                  onChange={(e) => setFilterUni(e.target.value)}
                  className="px-3 py-2 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-none"
                >
                  <option value="all">Toutes les Universités</option>
                  <option value="UNIKIN">UNIKIN</option>
                  <option value="UPN">UPN</option>
                  <option value="UNILU">UNILU</option>
                  <option value="UCC">UCC</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {filteredTalents.map(talent => (
                  <div
                    key={talent.id}
                    className="p-4 rounded-2xl bg-white border border-[#eaedff] hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#00629d] flex items-center justify-center font-bold text-xs">
                            {talent.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-[#131b2e]">{talent.name}</h4>
                            <p className="text-[11px] text-[#00629d] font-semibold">{talent.university} · {talent.level}</p>
                          </div>
                        </div>
                        <span className="text-[10px] text-[#75777d]">{talent.city}</span>
                      </div>

                      <p className="text-[11px] text-[#44474c] mb-2">{talent.faculty}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {talent.skills.map((s, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-[#f2f3ff] text-[10px] text-[#44474c]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#eaedff] flex items-center justify-between">
                      <span className="text-[10px] text-emerald-700 font-medium">CV certifié ({talent.cvSize})</span>
                      <button
                        onClick={handleDownloadCv}
                        className="px-3 py-1 bg-[#00629d] hover:bg-[#004a77] text-white rounded-full text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3 h-3" />
                        <span>Télécharger</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
