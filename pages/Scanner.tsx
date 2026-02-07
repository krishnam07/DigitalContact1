
import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, RefreshCw, QrCode } from 'lucide-react';
import { User } from '../types';

interface ScannerProps {
  onScan: (userId: string) => void;
  onBack: () => void;
}

const Scanner: React.FC<ScannerProps> = ({ onScan, onBack }) => {
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(true);

  // Mocking QR discovery for simulation
  // In a real app, we'd use a library like html5-qrcode or jsQR
  useEffect(() => {
    let timeout: any;
    if (isScanning) {
      // Simulate scanning after 3 seconds for demo purposes
      timeout = setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('dc_users') || '[]');
        if (users.length > 0) {
          // If we have users, pick the first one's ID for simulation
          onScan(users[0].id);
        } else {
          setError('No users registered in local database. Please register first to simulate scanning.');
          setIsScanning(false);
        }
      }, 4000);
    }
    return () => clearTimeout(timeout);
  }, [isScanning, onScan]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError('Unable to access camera. Please ensure permissions are granted.');
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col max-w-md mx-auto">
      <div className="p-4 flex justify-between items-center bg-black/50 text-white z-10 backdrop-blur-sm">
        <button onClick={onBack} className="p-2 bg-white/10 rounded-full">
          <X className="w-6 h-6" />
        </button>
        <span className="font-bold tracking-widest text-sm uppercase">QR Scanner</span>
        <button className="p-2 bg-white/10 rounded-full">
          <RefreshCw className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 relative overflow-hidden flex items-center justify-center">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="h-full w-full object-cover opacity-60"
        />
        
        {/* Scanning Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
          <div className="w-64 h-64 border-4 border-white rounded-3xl relative">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-indigo-500 -mt-1 -ml-1 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-indigo-500 -mt-1 -mr-1 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-indigo-500 -mb-1 -ml-1 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-indigo-500 -mb-1 -mr-1 rounded-br-xl" />
            
            {/* Animated Scanning Line */}
            <div className="absolute inset-0 flex items-start overflow-hidden pointer-events-none">
              <div className="w-full h-1 bg-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.8)] animate-scan-line" />
            </div>
          </div>
          
          <div className="mt-12 text-center text-white space-y-2 max-w-[200px]">
            <QrCode className="w-8 h-8 mx-auto mb-2 text-indigo-400 animate-pulse" />
            <p className="font-bold">Align QR Code</p>
            <p className="text-xs text-white/60">Position the QR code inside the frame to scan automatically.</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="absolute bottom-24 left-6 right-6 p-4 bg-rose-600 text-white rounded-2xl text-center text-sm font-medium z-20 shadow-xl">
          {error}
        </div>
      )}

      {isScanning && !error && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full z-20">
          <span className="text-white text-xs font-bold animate-pulse">Scanning for codes...</span>
        </div>
      )}

      <style>{`
        @keyframes scan-line {
          0% { transform: translateY(0); }
          50% { transform: translateY(256px); }
          100% { transform: translateY(0); }
        }
        .animate-scan-line {
          animation: scan-line 3s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default Scanner;
