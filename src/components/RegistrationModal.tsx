import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole, City, UserProfile } from '../types';
import { 
  X, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  Building, 
  GraduationCap, 
  Users, 
  Briefcase, 
  Landmark, 
  FileText,
  AlertCircle
} from 'lucide-react';

export const RegistrationModal: React.FC = () => {
  const { isRegisterOpen, setIsRegisterOpen, registerUser, showToast } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [role, setRole] = useState<UserRole>('student');

  // Common Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('+243 ');
  const [city, setCity] = useState<City>('Kinshasa');

  // Step 3: Student fields
  const [university, setUniversity] = useState('Université de Kinshasa (UNIKIN)');
  const [faculty, setFaculty] = useState('');
  const [academicYear, setAcademicYear] = useState('Licence 3');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvFileName, setCvFileName] = useState<string>('Mon_CV_Etudiant_RDC.pdf');
  const [skillsText, setSkillsText] = useState('Informatique, Communication, Anglais');

  // Step 3: Class Delegate fields
  const [delegationUniversity, setDelegationUniversity] = useState('Université Pédagogique Nationale (UPN)');
  const [delegationFaculty, setDelegationFaculty] = useState('Droit');
  const [delegationPromotion, setDelegationPromotion] = useState('L2 Droit Privé');

  // Step 3: Association fields
  const [associationName, setAssociationName] = useState('');
  const [missionDescription, setMissionDescription] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  // Step 3: Recruiter fields
  const [companyName, setCompanyName] = useState('');
  const [industrySector, setIndustrySector] = useState('Télécoms & Numérique');
  const [companyWebsite, setCompanyWebsite] = useState('');

  // Step 3: Public Institution fields
  const [institutionName, setInstitutionName] = useState('Ministère de l’Enseignement Supérieur et Universitaire (ESU)');
  const [departmentService, setDepartmentService] = useState('Direction de la Coopération Universitaire');
  const [institutionType, setInstitutionType] = useState('Ministère National');

  const [errorMessage, setErrorMessage] = useState('');

  if (!isRegisterOpen) return null;

  const universitiesRDC = [
    'Université de Kinshasa (UNIKIN)',
    'Université Pédagogique Nationale (UPN)',
    'Université de Lubumbashi (UNILU)',
    'Université Catholique du Congo (UCC)',
    'Institut Supérieur d’Informatique, Programmation et Analyse (ISIPA)',
    'Institut Supérieur de Commerce (ISC)',
    'Institut Supérieur des Techniques Appliquées (ISTA)',
    'Université Protestante au Congo (UPC)',
    'Université de Goma (UNIGO)',
    'Université de Kisangani (UNIKIS)',
    'Autre Institut Universitaire'
  ];

  const citiesList: City[] = [
    'Kinshasa',
    'Lubumbashi',
    'Goma',
    'Kisangani',
    'Bukavu',
    'Matadi',
    'Autre / National'
  ];

  const handleNextStep = () => {
    setErrorMessage('');
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!name.trim()) {
        setErrorMessage('Veuillez renseigner votre nom complet ou le nom de votre entité.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMessage('Veuillez renseigner une adresse email valide.');
        return;
      }
      if (!password || password.length < 6) {
        setErrorMessage('Le mot de passe doit comporter au moins 6 caractères.');
        return;
      }
      setStep(3);
    }
  };

  const handleQuickOAuth = (provider: 'Google' | 'Facebook') => {
    setName(provider === 'Google' ? 'Jean-Luc Mukendi (Google)' : 'Patrick Ilunga (Facebook)');
    setEmail(provider === 'Google' ? 'jlmukendi@gmail.com' : 'patrick.ilunga@facebook.com');
    setPassword('OAuthSecurePassword2026!');
    setPhone('+243 81 234 5678');
    setStep(3);
    showToast(`Connexion rapide via ${provider} pré-remplie !`, 'info');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCvFile(file);
      setCvFileName(file.name);
      showToast(`Fichier CV "${file.name}" attaché`, 'success');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const newProfile: UserProfile = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city,
      role: role,
      isVerified: role === 'public_institution' ? true : false,
      isOfficialInstitution: role === 'public_institution',
      skills: skillsText.split(',').map(s => s.trim()).filter(Boolean),
    };

    if (role === 'student') {
      newProfile.university = university;
      newProfile.faculty = faculty || 'Faculté Principale';
      newProfile.academicYear = academicYear;
      newProfile.cvFileName = cvFileName;
      newProfile.cvFileSize = cvFile ? `${Math.round(cvFile.size / 1024)} Ko` : '380 Ko';
      newProfile.cvSummary = `Étudiant à ${university} en ${faculty || academicYear}.`;
    } else if (role === 'class_delegate') {
      newProfile.university = delegationUniversity;
      newProfile.delegationUniversity = delegationUniversity;
      newProfile.delegationFaculty = delegationFaculty;
      newProfile.delegationPromotion = delegationPromotion;
      newProfile.isDelegateValidated = false; // Soumis à validation administrateur
    } else if (role === 'student_association') {
      newProfile.associationName = associationName || name;
      newProfile.missionDescription = missionDescription || 'Association étudiante engagée.';
      newProfile.websiteUrl = websiteUrl;
    } else if (role === 'recruiter') {
      newProfile.companyName = companyName || name;
      newProfile.industrySector = industrySector;
      newProfile.companyWebsite = companyWebsite;
    } else if (role === 'public_institution') {
      newProfile.institutionName = institutionName || name;
      newProfile.departmentService = departmentService;
      newProfile.institutionType = institutionType;
    }

    registerUser(newProfile);
    showToast(`Compte créé avec succès ! Bienvenue ${newProfile.name}`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white text-[#131b2e] border border-[#eaedff] rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#eaedff] flex items-center justify-between bg-[#f2f3ff]">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#131b2e] tracking-tight flex items-center gap-2">
              <span>Inscription à ENTR&apos;AIDE RDC</span>
            </h2>
            <p className="text-xs text-[#44474c] mt-0.5">
              Étape {step} sur 3 · {step === 1 ? 'Choix du rôle' : step === 2 ? 'Informations de base' : 'Profil spécifique'}
            </p>
          </div>
          <button
            onClick={() => setIsRegisterOpen(false)}
            className="p-1.5 rounded-xl text-[#44474c] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#eaedff] h-1.5">
          <div 
            className="bg-[#00629d] h-1.5 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Form Body */}
        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-2xl bg-[#ffdad6] border border-[#ba1a1a]/30 text-[#93000a] text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Choix du Rôle Principal */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs font-semibold text-[#44474c]">
                Sélectionnez votre statut pour personnaliser votre espace :
              </p>

              <div className="grid grid-cols-1 gap-2.5">
                {[
                  {
                    id: 'student' as UserRole,
                    title: 'Simple Étudiant',
                    desc: 'Accédez aux stages, bourses, événements, sorties loisirs et déposez votre CV.',
                    icon: GraduationCap,
                    accent: 'bg-[#eaedff] text-[#00629d]',
                  },
                  {
                    id: 'class_delegate' as UserRole,
                    title: 'Délégué de promotion',
                    desc: 'Représentez votre faculté, partagez des opportunités validées et informez vos camarades.',
                    icon: Users,
                    accent: 'bg-emerald-50 text-emerald-700',
                  },
                  {
                    id: 'student_association' as UserRole,
                    title: 'Association étudiante',
                    desc: 'Publiez vos activités associatives, conférences, ateliers et sorties détentes.',
                    icon: Building,
                    accent: 'bg-purple-50 text-purple-700',
                  },
                  {
                    id: 'recruiter' as UserRole,
                    title: 'Recruteur / Entreprise',
                    desc: 'Diffusez vos offres de stages/emplois, boostez votre visibilité et recrutez des talents.',
                    icon: Briefcase,
                    accent: 'bg-[#ffddb8] text-[#b87500]',
                  },
                  {
                    id: 'public_institution' as UserRole,
                    title: 'Institution Publique / Ministère',
                    desc: 'Bénéficiez du badge officiel RDC pour communiquer bourses et concours d’État.',
                    icon: Landmark,
                    accent: 'bg-[#d6e3fe] text-[#0e1c2f]',
                  },
                ].map(item => {
                  const Icon = item.icon;
                  const isSelected = role === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setRole(item.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                        isSelected 
                          ? 'bg-[#d6e3fe] border-[#00629d] shadow-sm ring-2 ring-[#00629d]' 
                          : 'bg-[#faf8ff] border-[#eaedff] hover:bg-[#f2f3ff]'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl shrink-0 ${item.accent}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-[#131b2e]">{item.title}</span>
                          {isSelected && <CheckCircle className="w-4 h-4 text-[#00629d]" />}
                        </div>
                        <p className="text-xs text-[#44474c] mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#00629d] hover:bg-[#004a77] text-white font-semibold text-xs rounded-full transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <span>Continuer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Informations de Base (Communes) */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Option rapide Google / Facebook */}
              <div className="p-4 bg-[#f2f3ff] border border-[#eaedff] rounded-2xl space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#44474c] block">
                  Option rapide en 1 clic
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickOAuth('Google')}
                    className="flex items-center justify-center gap-2 p-2.5 bg-white hover:bg-[#eaedff] border border-[#eaedff] rounded-xl text-xs font-semibold text-[#131b2e] transition-colors cursor-pointer"
                  >
                    <span>Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickOAuth('Facebook')}
                    className="flex items-center justify-center gap-2 p-2.5 bg-white hover:bg-[#eaedff] border border-[#eaedff] rounded-xl text-xs font-semibold text-[#131b2e] transition-colors cursor-pointer"
                  >
                    <span>Facebook</span>
                  </button>
                </div>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-[#eaedff]"></div>
                <span className="flex-shrink mx-3 text-[11px] text-[#75777d] uppercase font-bold">Ou formulaire classique</span>
                <div className="flex-grow border-t border-[#eaedff]"></div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                  {role === 'recruiter' ? 'Nom de l’Entreprise' : role === 'public_institution' ? 'Nom du Ministère / Institution' : 'Nom et Prénom'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={role === 'student' ? 'ex: Christian Kalombo' : 'ex: Rawbank RDC'}
                  className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] placeholder-[#75777d] focus:outline-none focus:border-[#00629d]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                  Adresse e-mail (avec vérification)
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="etudiant@domaine.cd"
                  className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] placeholder-[#75777d] focus:outline-none focus:border-[#00629d]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                    Mot de passe sécurisé
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] placeholder-[#75777d] focus:outline-none focus:border-[#00629d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                    Numéro de téléphone (+243)
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+243 81 234 5678"
                    className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] placeholder-[#75777d] focus:outline-none focus:border-[#00629d]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                  Ville principale en RDC
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value as City)}
                  className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#00629d]"
                >
                  {citiesList.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-[#eaedff]">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#eaedff] text-[#131b2e] font-semibold text-xs rounded-full hover:bg-[#dae2fd] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#00629d] hover:bg-[#004a77] text-white font-semibold text-xs rounded-full transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <span>Continuer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Champs Spécifiques selon le Profil */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Profil: Étudiant */}
              {role === 'student' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                      Université / Institut Supérieur
                    </label>
                    <select
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-none"
                    >
                      {universitiesRDC.map(u => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                        Faculté / Département
                      </label>
                      <input
                        type="text"
                        required
                        value={faculty}
                        onChange={(e) => setFaculty(e.target.value)}
                        placeholder="ex: Sciences Informatiques"
                        className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] placeholder-[#75777d] focus:outline-none focus:border-[#00629d]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                        Promotion / Niveau d’étude
                      </label>
                      <input
                        type="text"
                        required
                        value={academicYear}
                        onChange={(e) => setAcademicYear(e.target.value)}
                        placeholder="ex: Licence 3 (L3)"
                        className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] placeholder-[#75777d] focus:outline-none focus:border-[#00629d]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                      Compétences clés (séparées par virgules)
                    </label>
                    <input
                      type="text"
                      value={skillsText}
                      onChange={(e) => setSkillsText(e.target.value)}
                      placeholder="React, Comptabilité, Gestion de projet, Droit OHADA"
                      className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] placeholder-[#75777d] focus:outline-none focus:border-[#00629d]"
                    />
                  </div>

                  {/* CV Upload PDF */}
                  <div>
                    <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                      Téléversement du CV (Format PDF obligatoire)
                    </label>
                    <div className="p-4 rounded-2xl border-2 border-dashed border-[#dae2fd] bg-[#faf8ff] text-center">
                      <FileText className="w-8 h-8 text-[#00629d] mx-auto mb-1.5" />
                      <p className="text-xs font-bold text-[#131b2e]">{cvFileName}</p>
                      <p className="text-[11px] text-[#75777d] mb-2">PDF jusqu&apos;à 5 Mo</p>
                      <label className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#00629d] hover:bg-[#004a77] text-white font-semibold text-xs rounded-full cursor-pointer shadow-xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Sélectionner mon CV</span>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* Profil: Délégué de promotion */}
              {role === 'class_delegate' && (
                <>
                  <div className="p-3 bg-[#eaedff] border border-[#dae2fd] rounded-2xl text-xs text-[#003558]">
                    <strong>Note CDCF :</strong> Le compte délégué est soumis à validation administrative pour éviter toute usurpation.
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#131b2e] mb-1">Université représentée</label>
                    <input
                      type="text"
                      required
                      value={delegationUniversity}
                      onChange={(e) => setDelegationUniversity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#131b2e] mb-1">Faculté représentée</label>
                    <input
                      type="text"
                      required
                      value={delegationFaculty}
                      onChange={(e) => setDelegationFaculty(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#131b2e] mb-1">Promotion exacte</label>
                    <input
                      type="text"
                      required
                      value={delegationPromotion}
                      onChange={(e) => setDelegationPromotion(e.target.value)}
                      placeholder="ex: L2 Droit Économique 2025-2026"
                      className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* Profil: Association étudiante */}
              {role === 'student_association' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#131b2e] mb-1">Nom de l’Association</label>
                    <input
                      type="text"
                      required
                      value={associationName}
                      onChange={(e) => setAssociationName(e.target.value)}
                      placeholder="ex: Cercle des Ingénieurs UNIKIN"
                      className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#131b2e] mb-1">Description de la mission</label>
                    <textarea
                      rows={2}
                      value={missionDescription}
                      onChange={(e) => setMissionDescription(e.target.value)}
                      placeholder="Objectifs, activités organisées..."
                      className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#131b2e] mb-1">Lien / Page web / Réseaux sociaux</label>
                    <input
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://facebook.com/mon-asso"
                      className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* Profil: Recruteur / Entreprise */}
              {role === 'recruiter' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#131b2e] mb-1">Nom de l’Entreprise</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="ex: Vodacom Congo, Rawbank, BCDC"
                      className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#131b2e] mb-1">Secteur d’activité</label>
                    <input
                      type="text"
                      required
                      value={industrySector}
                      onChange={(e) => setIndustrySector(e.target.value)}
                      placeholder="Télécoms, Banque, Audit, Mines, IT..."
                      className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#131b2e] mb-1">Site Web / Page Carrière</label>
                    <input
                      type="url"
                      value={companyWebsite}
                      onChange={(e) => setCompanyWebsite(e.target.value)}
                      placeholder="https://entreprise.cd/carrieres"
                      className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* Profil: Institution Publique / Ministère */}
              {role === 'public_institution' && (
                <>
                  <div className="p-3 bg-[#d6e3fe] border border-[#bac7e1] rounded-2xl text-xs text-[#0e1c2f]">
                    <strong>Badge Officiel RDC garanti :</strong> Les publications émanant de ce profil bénéficieront du cachet officiel.
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#131b2e] mb-1">Nom de l’Entité Publique</label>
                    <input
                      type="text"
                      required
                      value={institutionName}
                      onChange={(e) => setInstitutionName(e.target.value)}
                      placeholder="Ministère de l’ESU, Fonction Publique, ONEM..."
                      className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#131b2e] mb-1">Direction / Service concerné</label>
                    <input
                      type="text"
                      required
                      value={departmentService}
                      onChange={(e) => setDepartmentService(e.target.value)}
                      placeholder="Direction des Bourses, Recrutement des Énarques..."
                      className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-none"
                    />
                  </div>
                </>
              )}

              <div className="pt-4 flex items-center justify-between border-t border-[#eaedff]">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#eaedff] text-[#131b2e] font-semibold text-xs rounded-full hover:bg-[#dae2fd] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour</span>
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#00629d] hover:bg-[#004a77] text-white font-semibold text-xs rounded-full transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <span>Créer mon profil</span>
                  <CheckCircle className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
