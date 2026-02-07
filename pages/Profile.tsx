
import React from 'react';
import { User, Page } from '../types';
import { maskNumber } from '../utils';
import { QRCodeSVG } from 'qrcode.react';
import { LogOut, Download, Share2, Settings, User as UserIcon, Bell, Phone, ShieldCheck } from 'lucide-react';

interface ProfileProps {
  user: User;
  onLogout: () => void;
  onNavigate: (page: Page) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout, onNavigate }) => {
  const downloadQR = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `QR_${user.fullName.replace(/\s+/g, '_')}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const shareQR = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Digital Contact QR',
        text: `Contact ${user.fullName} securely via Digital Contact.`,
        url: window.location.origin
      }).catch(console.error);
    } else {
      alert('Sharing not supported on this device');
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      {/* Profile Banner */}
      <div className="bg-indigo-600 h-32 relative">
        <div className="absolute -bottom-10 left-6">
          <div className="w-24 h-24 rounded-3xl bg-white p-1 shadow-xl">
            <div className="w-full h-full bg-indigo-50 rounded-2xl flex items-center justify-center">
              <UserIcon className="w-12 h-12 text-indigo-600" />
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
           <button onClick={onLogout} className="bg-white/20 hover:bg-white/30 p-2 rounded-full text-white backdrop-blur-md">
             <LogOut className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="px-6 mt-14">
        <h2 className="text-2xl font-extrabold text-gray-900">{user.fullName}</h2>
        <p className="text-gray-400 text-sm font-medium">Verified Member</p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 gap-4 mt-8">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-50 p-2 rounded-xl text-blue-600">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Contact Number</p>
                <p className="font-bold text-gray-800">{maskNumber(user.contactNumber)}</p>
              </div>
            </div>
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-rose-50 p-2 rounded-xl text-rose-600">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Emergency Contact</p>
                <p className="font-bold text-gray-800">{maskNumber(user.emergencyNumber)}</p>
              </div>
            </div>
            <div className={`w-3 h-3 rounded-full ${user.allowEmergencyCall ? 'bg-emerald-500 shadow-lg shadow-emerald-200' : 'bg-gray-300'}`} />
          </div>
        </div>

        {/* QR Section */}
        <div className="mt-8 bg-gray-50 rounded-3xl p-6 text-center border-2 border-dashed border-gray-200">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Your Personal Contact QR</p>
          <div className="bg-white p-4 rounded-2xl shadow-lg inline-block mb-6 relative group">
            <QRCodeSVG 
              id="qr-code-svg"
              value={user.id} 
              size={180}
              level="H"
              includeMargin={true}
              imageSettings={{
                src: "https://api.dicebear.com/7.x/shapes/svg?seed=dc",
                x: undefined,
                y: undefined,
                height: 24,
                width: 24,
                excavate: true,
              }}
            />
          </div>
          <p className="text-gray-500 text-xs mb-6 px-4">Place this QR code on your vehicle, bag, or helmet to let people contact you securely.</p>
          
          <div className="flex justify-center space-x-4">
            <button 
              onClick={downloadQR}
              className="flex items-center space-x-2 bg-white px-5 py-3 rounded-xl border border-gray-200 shadow-sm font-bold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
            >
              <Download className="w-4 h-4 text-indigo-600" />
              <span>Save</span>
            </button>
            <button 
              onClick={shareQR}
              className="flex items-center space-x-2 bg-white px-5 py-3 rounded-xl border border-gray-200 shadow-sm font-bold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
            >
              <Share2 className="w-4 h-4 text-emerald-600" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Settings Toggle Placeholder */}
        <div className="mt-8 space-y-4">
           <div className="flex items-center justify-between p-2">
             <div className="flex items-center space-x-3">
               <Settings className="w-5 h-5 text-gray-400" />
               <span className="font-bold text-gray-700">Account Settings</span>
             </div>
             <ChevronRight className="w-5 h-5 text-gray-300" />
           </div>
        </div>
      </div>
    </div>
  );
};

const ChevronRight = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default Profile;
