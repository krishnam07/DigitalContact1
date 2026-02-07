
import React from 'react';
import { Page } from '../types';
import { ShieldCheck, QrCode, UserPlus, LogIn, ChevronRight } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: Page) => void;
  isAuthenticated: boolean;
}

const Home: React.FC<HomeProps> = ({ onNavigate, isAuthenticated }) => {
  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-4 bg-indigo-50 rounded-3xl mb-2">
          <ShieldCheck className="w-16 h-16 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Protect Your Privacy</h2>
        <p className="text-gray-500 max-w-[280px] mx-auto text-sm leading-relaxed">
          Share your contact safely. Generate a QR code for your vehicle, luggage, or belongings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <button 
          onClick={() => onNavigate(Page.SCANNER)}
          className="group flex items-center justify-between p-5 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-[0.98]"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-2.5 rounded-xl">
              <QrCode className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="font-bold text-lg">Scan QR Code</p>
              <p className="text-indigo-100 text-xs">Contact a property owner</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 opacity-50 group-hover:translate-x-1 transition-transform" />
        </button>

        {!isAuthenticated ? (
          <>
            <button 
              onClick={() => onNavigate(Page.REGISTER)}
              className="group flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl text-gray-900 shadow-sm transition-all hover:bg-gray-50 active:scale-[0.98]"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-50 p-2.5 rounded-xl">
                  <UserPlus className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">Register Now</p>
                  <p className="text-gray-400 text-xs">Create your digital contact tag</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={() => onNavigate(Page.LOGIN)}
              className="group flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl text-gray-900 shadow-sm transition-all hover:bg-gray-50 active:scale-[0.98]"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-emerald-50 p-2.5 rounded-xl">
                  <LogIn className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">Login</p>
                  <p className="text-gray-400 text-xs">Access your profile and tags</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:translate-x-1 transition-transform" />
            </button>
          </>
        ) : (
          <button 
            onClick={() => onNavigate(Page.PROFILE)}
            className="group flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl text-gray-900 shadow-sm transition-all hover:bg-gray-50 active:scale-[0.98]"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-50 p-2.5 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-left">
                <p className="font-bold text-lg">My Profile</p>
                <p className="text-gray-400 text-xs">Manage your contact settings</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      <div className="pt-4">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">How it works</h3>
        <div className="space-y-4">
          {[
            { title: "Register", desc: "Set up your contact and emergency details." },
            { title: "Print QR", desc: "Get a unique QR code for your belongings." },
            { title: "Stay Safe", desc: "Others can reach you without knowing your number." }
          ].map((item, i) => (
            <div key={i} className="flex items-start space-x-3">
              <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">
                {i + 1}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
