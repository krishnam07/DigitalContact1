
import React, { useState } from 'react';
import { Page, User } from '../types';
import { generateUUID } from '../utils';
import { User as UserIcon, Phone, Lock, BellRing, Check, ShieldCheck } from 'lucide-react';

interface RegisterProps {
  onRegister: (user: User) => void;
  onNavigate: (page: Page) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    emergencyNumber: '',
    password: '',
    confirmPassword: '',
    allowEmergencyCall: true
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const newUser: User = {
      id: generateUUID(),
      fullName: formData.fullName,
      contactNumber: formData.contactNumber,
      emergencyNumber: formData.emergencyNumber,
      password: formData.password,
      allowEmergencyCall: formData.allowEmergencyCall
    };

    const users = JSON.parse(localStorage.getItem('dc_users') || '[]');
    if (users.some((u: User) => u.contactNumber === newUser.contactNumber)) {
      setError('User already exists with this phone number');
      return;
    }

    users.push(newUser);
    localStorage.setItem('dc_users', JSON.stringify(users));
    onRegister(newUser);
  };

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 pb-24">
      <div className="mb-4">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Account</h2>
        <p className="text-gray-500 mt-1">Start protecting your contact details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
          <div className="relative">
            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            <input
              type="text"
              required
              placeholder="Full Name"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Contact Number</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            <input
              type="tel"
              required
              placeholder="Primary Number"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Emergency Contact</label>
          <div className="relative">
            <BellRing className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            <input
              type="tel"
              required
              placeholder="Emergency Number"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm"
              value={formData.emergencyNumber}
              onChange={(e) => setFormData({ ...formData, emergencyNumber: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input
                type="password"
                required
                placeholder="••••••"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-9 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Confirm</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input
                type="password"
                required
                placeholder="••••••"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-9 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, allowEmergencyCall: !formData.allowEmergencyCall })}
              className={`w-12 h-6 rounded-full transition-colors relative ${formData.allowEmergencyCall ? 'bg-indigo-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.allowEmergencyCall ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800">Emergency Call Access</p>
            <p className="text-[10px] text-gray-500">Allow scanning users to call your emergency contact.</p>
          </div>
        </div>

        {error && <p className="text-rose-500 text-xs font-medium text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white rounded-2xl py-4 font-bold text-lg shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 mt-4"
        >
          <ShieldCheck className="w-6 h-6" />
          <span>Register Account</span>
        </button>
      </form>

      <div className="text-center">
        <p className="text-gray-500 text-sm">
          Already have an account?{' '}
          <button 
            onClick={() => onNavigate(Page.LOGIN)}
            className="text-indigo-600 font-bold hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
