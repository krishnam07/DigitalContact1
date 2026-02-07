
import React, { useEffect, useState } from 'react';
import { User } from '../types';
import { maskNumber } from '../utils';
import { Phone, AlertCircle, ShieldAlert, ArrowLeft, LogIn, BellRing, Info } from 'lucide-react';

interface ScanResultProps {
  userId: string;
  currentUser: User | null;
  onBack: () => void;
  onLogin: () => void;
}

const ScanResult: React.FC<ScanResultProps> = ({ userId, currentUser, onBack, onLogin }) => {
  const [owner, setOwner] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('dc_users') || '[]');
      const found = users.find((u: User) => u.id === userId);
      setOwner(found || null);
      setIsLoading(false);
    }, 800);
  }, [userId]);

  if (isLoading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center space-y-4 animate-pulse">
        <div className="w-20 h-20 bg-gray-100 rounded-full" />
        <div className="w-32 h-4 bg-gray-100 rounded" />
        <div className="w-48 h-3 bg-gray-100 rounded" />
      </div>
    );
  }

  if (!owner) {
    return (
      <div className="p-8 text-center space-y-6 animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center mx-auto">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-900">Tag Not Found</h2>
          <p className="text-gray-500">This QR code doesn't seem to be registered or has been deactivated.</p>
        </div>
        <button 
          onClick={onBack}
          className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Go Back</span>
        </button>
      </div>
    );
  }

  const isGuest = !currentUser;

  return (
    <div className="p-6 space-y-8 animate-in zoom-in-95 duration-500">
      <div className="text-center space-y-4 pt-4">
        <div className="w-24 h-24 bg-indigo-50 rounded-[40px] flex items-center justify-center mx-auto shadow-inner">
          <Phone className="w-10 h-10 text-indigo-600" />
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-gray-900">{owner.fullName}</h2>
          <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest">Digital Contact Owner</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Phone className="w-6 h-6 text-gray-400" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Primary Contact</p>
            <p className="font-extrabold text-lg text-gray-800">{maskNumber(owner.contactNumber)}</p>
          </div>
        </div>

        {owner.allowEmergencyCall && (
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center flex-shrink-0">
              <BellRing className="w-6 h-6 text-rose-600" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Emergency Contact</p>
              <p className="font-extrabold text-lg text-gray-800">{maskNumber(owner.emergencyNumber)}</p>
            </div>
          </div>
        )}
      </div>

      {isGuest ? (
        <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-700">
          <div className="bg-indigo-50 p-5 rounded-3xl border border-indigo-100 flex items-start space-x-3">
             <Info className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
             <p className="text-sm text-indigo-900 leading-relaxed font-medium">
               To protect privacy, numbers are masked. You must <strong>Login</strong> or <strong>Register</strong> to call the owner.
             </p>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <button 
              onClick={onLogin}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-indigo-100 active:scale-[0.98] transition-all"
            >
              <LogIn className="w-5 h-5" />
              <span>Login to Contact</span>
            </button>
            <button 
              onClick={onBack}
              className="w-full bg-white border border-gray-200 text-gray-600 py-4 rounded-2xl font-bold active:scale-[0.98] transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in slide-in-from-bottom-6 duration-700">
          <p className="text-center text-xs font-medium text-gray-400">Action required for owner belongings</p>
          <div className="grid grid-cols-1 gap-4">
            <a 
              href={`tel:${owner.contactNumber}`}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 shadow-lg shadow-indigo-100 active:scale-[0.98] transition-all"
            >
              <div className="bg-white/20 p-1.5 rounded-lg">
                <Phone className="w-5 h-5" />
              </div>
              <span>Call Owner</span>
            </a>

            {owner.allowEmergencyCall && (
              <a 
                href={`tel:${owner.emergencyNumber}`}
                className="w-full bg-rose-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 shadow-lg shadow-rose-100 active:scale-[0.98] transition-all"
              >
                <div className="bg-white/20 p-1.5 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <span>Emergency Call</span>
              </a>
            )}

            <button 
              onClick={onBack}
              className="w-full text-gray-400 py-2 text-sm font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanResult;
