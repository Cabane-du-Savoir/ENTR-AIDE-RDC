import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Sparkles, 
  CheckCircle, 
  Smartphone, 
  ShieldCheck, 
  Flame, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const BoostModal: React.FC = () => {
  const { 
    isBoostModalOpen, 
    setIsBoostModalOpen, 
    selectedPostForBoost, 
    boostPost,
    currentUser 
  } = useApp();

  const [selectedPlan, setSelectedPlan] = useState<'7d' | '14d' | '30d'>('14d');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'orange' | 'airtel'>('mpesa');
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phone || '+243 81 234 5678');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isBoostModalOpen || !selectedPostForBoost) return null;

  const plans = [
    {
      id: '7d',
      name: 'Pack Visibilité Hebdo',
      days: 7,
      priceCDF: '15.000 CDF',
      priceUSD: '5 USD',
      features: ['Badge "En Vedette" doré', 'Position prioritaire en tête de fil', 'Partage auprès des délégués'],
    },
    {
      id: '14d',
      name: 'Pack Impact Bourses & Emploi',
      days: 14,
      priceCDF: '28.000 CDF',
      priceUSD: '10 USD',
      popular: true,
      features: ['Badge "En Vedette" doré', 'Affichage garanti sur Kinshasa & Provinces', 'Notification push hebdomadaire', 'Statistiques de consultation'],
    },
    {
      id: '30d',
      name: 'Pack Recruteur Pro Campus',
      days: 30,
      priceCDF: '50.000 CDF',
      priceUSD: '18 USD',
      features: ['Mise en avant maximale 1 mois', 'Accès prioritaire à la CVthèque', 'Support modérateur dédié'],
    },
  ];

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      const chosenPlan = plans.find(p => p.id === selectedPlan);
      boostPost(selectedPostForBoost.id, chosenPlan?.days || 7, chosenPlan?.name || 'Boost');

      setTimeout(() => {
        setIsSuccess(false);
        setIsBoostModalOpen(false);
      }, 2500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white text-[#131b2e] border border-[#eaedff] rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#eaedff] bg-[#f2f3ff] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#ffddb8] text-[#b87500]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#131b2e] tracking-tight flex items-center gap-2">
                <span>Booster la visibilité de votre annonce</span>
              </h2>
              <p className="text-xs text-[#44474c] mt-0.5">
                Multipliez par 5 les candidatures qualifiées d&apos;étudiants congolais
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsBoostModalOpen(false)}
            className="p-1.5 rounded-xl text-[#44474c] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Post Summary */}
        <div className="px-6 py-3 bg-[#eaedff] border-b border-[#dae2fd] text-xs flex items-center justify-between">
          <div className="truncate mr-2">
            <span className="text-[#44474c]">Annonce ciblée : </span>
            <strong className="text-[#131b2e] font-semibold">{selectedPostForBoost.title}</strong>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#d6e3fe] text-[#0e1c2f] text-[10px] font-bold shrink-0">
            {selectedPostForBoost.city}
          </span>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl border border-emerald-300 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-[#131b2e]">Annonce boostée avec succès !</h3>
            <p className="text-xs text-[#44474c]">
              Votre offre est désormais affichée en tête de fil avec le badge &quot;En Vedette&quot; doré.
            </p>
          </div>
        ) : (
          <form onSubmit={handlePay} className="p-6 space-y-5">
            {/* Choose Duration / Plan */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#44474c]">
                1. Choisissez la durée de mise en avant (Monétisation CDCF)
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {plans.map(p => {
                  const isSelected = selectedPlan === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPlan(p.id as any)}
                      className={`relative p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-[#00629d] bg-[#f2f3ff] shadow-md ring-2 ring-[#00629d]' 
                          : 'border-[#eaedff] bg-white hover:bg-[#faf8ff]'
                      }`}
                    >
                      {p.popular && (
                        <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-[#00629d] text-white text-[9px] font-black uppercase tracking-wider shadow-sm">
                          Recommandé
                        </span>
                      )}

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-[#131b2e]">{p.days} Jours</span>
                          {isSelected && <CheckCircle className="w-4 h-4 text-[#00629d]" />}
                        </div>
                        <span className="block font-black text-sm text-[#00629d]">{p.priceCDF}</span>
                        <span className="text-[10px] text-[#44474c]">env. {p.priceUSD}</span>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#eaedff] space-y-1 text-[10px] text-[#44474c]">
                        {p.features.slice(0, 2).map((f, i) => (
                          <div key={i} className="flex items-center gap-1 truncate">
                            <span className="text-[#00629d]">•</span>
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Money in RDC */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#44474c]">
                2. Paiement Sécurisé Mobile Money (RDC)
              </label>

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'mpesa', name: 'Vodacom M-Pesa', color: 'border-red-200 bg-red-50 text-red-700' },
                  { id: 'orange', name: 'Orange Money', color: 'border-orange-200 bg-orange-50 text-orange-700' },
                  { id: 'airtel', name: 'Airtel Money', color: 'border-rose-200 bg-rose-50 text-rose-700' },
                ].map(op => (
                  <button
                    key={op.id}
                    type="button"
                    onClick={() => setPaymentMethod(op.id as any)}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      paymentMethod === op.id
                        ? `${op.color} ring-2 ring-[#00629d] font-bold shadow-sm`
                        : 'border-[#eaedff] bg-[#f2f3ff] text-[#44474c] hover:bg-[#eaedff]'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span className="text-[11px] leading-tight">{op.name}</span>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                  Numéro de téléphone pour le prélèvement :
                </label>
                <input
                  type="text"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+243 81 000 0000"
                  className="w-full px-3.5 py-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] placeholder-[#75777d] focus:outline-none focus:border-[#00629d]"
                />
                <span className="text-[10px] text-[#75777d] mt-1 block">
                  Un push USSD apparaîtra sur votre téléphone pour confirmer votre code PIN secret.
                </span>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex items-center justify-between border-t border-[#eaedff]">
              <div>
                <span className="text-[10px] text-[#75777d] block">Montant total</span>
                <span className="font-black text-sm text-[#00629d]">
                  {plans.find(p => p.id === selectedPlan)?.priceCDF}
                </span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="px-6 py-2.5 rounded-full bg-[#00629d] hover:bg-[#004a77] text-white font-semibold text-xs shadow-sm active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Communication opérateur...</span>
                  </>
                ) : (
                  <>
                    <span>Valider et Booster</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
