import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, CreditCard, CheckCircle2, Star, Timer, Flame, ShieldCheck, Gem, Plane, Wine, Camera, Smartphone, Lock, QrCode, Server, Link2, AlertTriangle } from 'lucide-react';
import { BookingAddon } from '../types';
import { processPayment } from '../services/api';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedUnit?: string | null;
}

const LUXURY_ADDONS: BookingAddon[] = [
  { id: 'heli', name: 'Private Heli-Transfer (直升机接送)', price: 2500, description: 'Direct flight from nearest hub.', selected: false },
  { id: 'chef', name: 'Michelin In-Suite Dining (套房餐饮)', price: 1200, description: '7-course Omakase by Chef Vance.', selected: false },
  { id: 'butler', name: 'Royal Butler (皇家管家)', price: 800, description: '24/7 Personal Concierge.', selected: false },
  { id: 'photo', name: 'Cinematic Follow-Cam (跟拍)', price: 1500, description: 'Personal drone photography team.', selected: false },
];

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, preSelectedUnit }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewers, setViewers] = useState(12);
  const [spotsLeft, setSpotsLeft] = useState(3);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown
  const [addons, setAddons] = useState<BookingAddon[]>(LUXURY_ADDONS);
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wechat' | 'alipay'>('card');
  const [gatewayStatus, setGatewayStatus] = useState('Idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Hunger Marketing: Randomize viewers and decrement timer
  useEffect(() => {
    if (!isOpen) return;

    // Reset state on open
    setStep(1);
    setTimeLeft(300);
    setGatewayStatus('Idle');
    setErrorMsg(null);
    setViewers(Math.floor(Math.random() * 15) + 8);
    setSpotsLeft(Math.floor(Math.random() * 3) + 1);

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const viewerInterval = setInterval(() => {
      setViewers((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 4000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(viewerInterval);
    };
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const toggleAddon = (id: string) => {
    setAddons(prev => prev.map(a => a.id === id ? { ...a, selected: !a.selected } : a));
  };

  const calculateTotal = () => {
    const basePrice = 4500; // Base luxury rate
    const addonTotal = addons.filter(a => a.selected).reduce((sum, a) => sum + a.price, 0);
    return basePrice + addonTotal;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2); // Move to Upsell
    } else if (step === 2) {
      setStep(3); // Move to Payment
    } else {
      // Step 3 -> 4: Processing
      setIsSubmitting(true);
      setGatewayStatus('Contacting Banking Provider...');
      setErrorMsg(null);

      const total = calculateTotal();
      
      // Call the unified API service (Mock or Real)
      const result = await processPayment(total, paymentMethod);

      if (result.success) {
        setGatewayStatus('Transaction Verified');
        setTimeout(() => {
           setIsSubmitting(false);
           setStep(4);
        }, 500);
      } else {
        setGatewayStatus('Failed');
        setIsSubmitting(false);
        setErrorMsg(result.error || 'Payment failed. Please try again.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#050505]/95 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-[#0B0F19] border border-brand-gold/20 w-full max-w-2xl rounded-3xl shadow-[0_0_80px_rgba(255,215,0,0.15)] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-300">
        
        {/* Urgent Header */}
        <div className="bg-gradient-to-r from-red-900/40 to-[#0B0F19] border-b border-red-500/20 p-2 flex items-center justify-center gap-2 text-[10px] font-bold tracking-[0.2em] text-red-400 animate-pulse">
           <Flame className="w-3 h-3" />
           HIGH DEMAND: {viewers} people viewing this suite
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.4)]">
               <Star className="w-5 h-5 text-black fill-black" />
            </div>
            <div>
              <span className="block font-serif font-bold text-white tracking-widest text-lg">
                 {step === 3 ? 'Secure Checkout (安全结账)' : 'Private Allocation (私人配额)'}
              </span>
              <div className="flex items-center gap-2 text-xs text-brand-gold/80">
                <Timer className="w-3 h-3" />
                <span>Rate lock expires in {formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-0 overflow-y-auto custom-scrollbar flex-1">
          {/* Step 1: Selection & Scarcity */}
          {step === 1 && (
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-brand-gold text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                  Only {spotsLeft} Left
                </div>
                <h3 className="text-2xl font-serif text-white mb-1">{preSelectedUnit || "Signature Celestial Suite"}</h3>
                <p className="text-slate-400 text-sm mb-4">Forest Realm • Phase 1 Release</p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  You are applying for a limited release allocation. Due to high demand for the upcoming season, we require immediate verification of your travel dates.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-gold uppercase tracking-widest flex justify-between">
                    Arrival (抵达) <span className="text-slate-500">Check-in 15:00</span>
                  </label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover:text-brand-gold transition-colors" />
                    <input 
                      type="date" 
                      onChange={(e) => setDates({...dates, checkIn: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold focus:outline-none transition-all" 
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-gold uppercase tracking-widest flex justify-between">
                    Departure (离开) <span className="text-slate-500">Check-out 12:00</span>
                  </label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover:text-brand-gold transition-colors" />
                    <input 
                      type="date" 
                      onChange={(e) => setDates({...dates, checkOut: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold focus:outline-none transition-all" 
                      required 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-gold uppercase tracking-widest">Guests (人数)</label>
                  <div className="relative group">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover:text-brand-gold transition-colors" />
                    <select className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold focus:outline-none appearance-none cursor-pointer transition-all">
                      <option>2 Adults (Verified Profile)</option>
                      <option>2 Adults, 1 Child</option>
                      <option>VIP Entourage (4+)</option>
                    </select>
                  </div>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-brand-gold transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                Check Availability (检查可用性) <ShieldCheck className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Step 2: Luxury Upsell */}
          {step === 2 && (
            <div className="p-8 space-y-8">
              <div className="text-center">
                 <h3 className="text-2xl font-serif text-white mb-2">Upgrade Your Sanctuary</h3>
                 <p className="text-slate-400 text-sm">Select exclusive add-ons to elevate your stay.</p>
              </div>

              <div className="space-y-4">
                {addons.map((addon) => (
                  <div 
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-300 ${addon.selected ? 'bg-brand-gold/10 border-brand-gold shadow-[0_0_15px_rgba(255,215,0,0.1)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${addon.selected ? 'bg-brand-gold text-black' : 'bg-black/40 text-slate-500'}`}>
                         {addon.id === 'heli' && <Plane className="w-5 h-5" />}
                         {addon.id === 'chef' && <Flame className="w-5 h-5" />}
                         {addon.id === 'butler' && <Gem className="w-5 h-5" />}
                         {addon.id === 'photo' && <Camera className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className={`font-bold text-sm uppercase tracking-wide ${addon.selected ? 'text-brand-gold' : 'text-white'}`}>{addon.name}</h4>
                        <p className="text-xs text-slate-400">{addon.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`block font-serif font-bold ${addon.selected ? 'text-white' : 'text-slate-500'}`}>+${addon.price}</span>
                      {addon.selected && <CheckCircle2 className="w-4 h-4 text-brand-gold ml-auto mt-1" />}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                 <button type="button" onClick={() => setStep(1)} className="text-slate-500 text-xs uppercase tracking-widest hover:text-white transition-colors">Back</button>
                 <button onClick={handleSubmit} className="px-8 py-3 bg-brand-gold text-black font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-colors shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                   Continue
                 </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment Checkout */}
          {step === 3 && (
             <div className="p-8 space-y-6">
                {/* Developer / Gateway Status Bar */}
                <div className="bg-black/50 border border-white/5 rounded-lg p-2 flex justify-between items-center px-4">
                   <div className="flex items-center gap-2">
                      <Server className={`w-3 h-3 ${isSubmitting ? 'text-yellow-500 animate-pulse' : 'text-emerald-500'}`} />
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Gateway: <span className={isSubmitting ? 'text-yellow-400' : 'text-emerald-400'}>{gatewayStatus}</span></span>
                   </div>
                   <div className="flex items-center gap-1">
                      <Link2 className="w-3 h-3 text-slate-500" />
                      <span className="text-[10px] font-mono text-slate-500">TLS 1.3 Secured</span>
                   </div>
                </div>

                {/* Order Summary Compact */}
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                  <div>
                    <h3 className="text-white font-serif text-xl">Total Amount</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">Inc. Taxes & Fees</p>
                  </div>
                  <div className="text-4xl text-brand-gold font-serif">${calculateTotal().toLocaleString()}</div>
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Select Payment Method (选择支付方式)</label>
                  <div className="grid grid-cols-3 gap-3">
                     <button 
                       onClick={() => setPaymentMethod('card')}
                       className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all duration-300 ${paymentMethod === 'card' ? 'bg-brand-gold text-black border-brand-gold shadow-lg' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                     >
                       <CreditCard className="w-6 h-6" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Card</span>
                     </button>
                     <button 
                       onClick={() => setPaymentMethod('wechat')}
                       className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all duration-300 ${paymentMethod === 'wechat' ? 'bg-[#07C160] text-white border-[#07C160] shadow-lg' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                     >
                       <Smartphone className="w-6 h-6" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">WeChat</span>
                     </button>
                     <button 
                       onClick={() => setPaymentMethod('alipay')}
                       className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all duration-300 ${paymentMethod === 'alipay' ? 'bg-[#1677FF] text-white border-[#1677FF] shadow-lg' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                     >
                       <QrCode className="w-6 h-6" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Alipay</span>
                     </button>
                  </div>
                </div>

                {/* Dynamic Payment Interface */}
                <div className="bg-black/40 p-6 rounded-2xl border border-white/10 min-h-[220px] flex flex-col justify-center relative overflow-hidden">
                   {/* Credit Card Form */}
                   {paymentMethod === 'card' && (
                      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                         <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Card Number</label>
                            <div className="relative group">
                               <input type="text" placeholder="4242 4242 4242 4242" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white font-mono tracking-widest focus:border-brand-gold outline-none transition-colors" />
                               <Lock className="w-4 h-4 text-brand-gold/50 absolute right-3 top-3" />
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                               <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Expiry</label>
                               <input type="text" placeholder="MM/YY" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white font-mono tracking-widest focus:border-brand-gold outline-none transition-colors" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">CVC</label>
                               <input type="text" placeholder="123" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white font-mono tracking-widest focus:border-brand-gold outline-none transition-colors" />
                            </div>
                         </div>
                      </div>
                   )}

                   {/* QR Code Display */}
                   {(paymentMethod === 'wechat' || paymentMethod === 'alipay') && (
                      <div className="flex flex-col items-center justify-center h-full space-y-4 animate-in zoom-in-95 duration-500">
                         <div className="w-32 h-32 bg-white p-2 rounded-lg relative overflow-hidden group cursor-pointer shadow-2xl">
                             {/* Mock QR Pattern */}
                             <div className="w-full h-full bg-black pattern-qr opacity-90" style={{backgroundImage: 'radial-gradient(#000 2px, transparent 0)', backgroundSize: '6px 6px'}}></div>
                             {/* Center Logo */}
                             <div className="absolute inset-0 flex items-center justify-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${paymentMethod === 'wechat' ? 'bg-[#07C160]' : 'bg-[#1677FF]'}`}>
                                   {paymentMethod === 'wechat' ? <Smartphone className="w-4 h-4 text-white" /> : <QrCode className="w-4 h-4 text-white" />}
                                </div>
                             </div>
                             {/* Scanning Animation */}
                             <div className="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_10px_red] animate-scan opacity-80"></div>
                         </div>
                         <div className="text-center">
                            <p className="text-sm text-white font-bold mb-1">Scan to Pay</p>
                            <p className="text-xs text-slate-400">Open {paymentMethod === 'wechat' ? 'WeChat' : 'Alipay'} App to complete payment</p>
                         </div>
                      </div>
                   )}
                </div>

                {/* Error Message */}
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-400 text-xs animate-in fade-in">
                     <AlertTriangle className="w-4 h-4" />
                     {errorMsg}
                  </div>
                )}

                {/* Action Button */}
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-4 font-bold uppercase tracking-widest rounded-xl transition-all shadow-[0_0_30px_rgba(255,215,0,0.2)] hover:shadow-[0_0_50px_rgba(255,215,0,0.4)] hover:scale-[1.01] flex items-center justify-center gap-3
                    ${paymentMethod === 'card' ? 'bg-gradient-to-r from-brand-gold to-amber-500 text-black' : paymentMethod === 'wechat' ? 'bg-[#07C160] text-white hover:bg-[#06ad56]' : 'bg-[#1677FF] text-white hover:bg-[#1363d6]'}`}
                >
                  {isSubmitting ? (
                    <>
                       <Timer className="w-5 h-5 animate-spin" />
                       Processing Payment...
                    </>
                  ) : (
                    <>
                      {paymentMethod === 'card' ? <CreditCard className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                      {paymentMethod === 'card' ? `Confirm Payment $${calculateTotal()}` : 'I Have Paid (我已支付)'}
                    </>
                  )}
                </button>
                
                <div className="flex flex-col items-center gap-1 text-[10px] text-slate-500">
                   <div className="flex items-center gap-2">
                     <ShieldCheck className="w-3 h-3" />
                     <span>256-Bit SSL Encrypted Payment Gateway</span>
                   </div>
                   <span className="opacity-40">See backend/README.md for Stripe Integration details</span>
                </div>
             </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center py-12 animate-in zoom-in-95 duration-500 px-8">
              <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">Payment Successful</h3>
              <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                Your transaction <span className="text-emerald-400 font-mono">#TX-9942</span> is confirmed. Welcome to KuhnPohl.
              </p>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 max-w-md mx-auto mb-8 text-left">
                 <div className="flex justify-between mb-2 text-sm">
                    <span className="text-slate-400">Amount Paid</span>
                    <span className="text-white font-bold">${calculateTotal().toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between mb-2 text-sm">
                    <span className="text-slate-400">Method</span>
                    <span className="text-white capitalize">{paymentMethod}</span>
                 </div>
                 <div className="flex justify-between mb-2 text-sm">
                    <span className="text-slate-400">Gateway Status</span>
                    <span className="text-emerald-400 font-mono text-xs">VERIFIED</span>
                 </div>
                 <div className="mt-4 pt-4 border-t border-white/10 text-xs text-slate-500 text-center">
                    An electronic receipt has been sent to your email.
                 </div>
              </div>
              <button onClick={onClose} className="px-10 py-4 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black transition-all uppercase text-xs font-bold tracking-widest rounded-full">
                Return to Resort (返回)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;