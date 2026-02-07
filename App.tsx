
import React, { useState, useEffect } from 'react';
import { User, AuthState, Page } from './types';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Scanner from './pages/Scanner';
import ScanResult from './pages/ScanResult';
import { Shield, User as UserIcon, LogOut, Home as HomeIcon } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [auth, setAuth] = useState<AuthState>({ user: null, isAuthenticated: false });
  const [scannedUserId, setScannedUserId] = useState<string | null>(null);

  // Initialize Auth from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('dc_current_user');
    if (storedUser) {
      setAuth({ user: JSON.parse(storedUser), isAuthenticated: true });
    }
  }, []);

  const login = (user: User) => {
    setAuth({ user, isAuthenticated: true });
    localStorage.setItem('dc_current_user', JSON.stringify(user));
    setCurrentPage(Page.PROFILE);
  };

  const logout = () => {
    setAuth({ user: null, isAuthenticated: false });
    localStorage.removeItem('dc_current_user');
    setCurrentPage(Page.HOME);
  };

  const navigateToResult = (userId: string) => {
    setScannedUserId(userId);
    setCurrentPage(Page.SCAN_RESULT);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <Home onNavigate={setCurrentPage} isAuthenticated={auth.isAuthenticated} />;
      case Page.LOGIN:
        return <Login onLogin={login} onNavigate={setCurrentPage} />;
      case Page.REGISTER:
        return <Register onRegister={login} onNavigate={setCurrentPage} />;
      case Page.PROFILE:
        return auth.user ? <Profile user={auth.user} onLogout={logout} onNavigate={setCurrentPage} /> : <Home onNavigate={setCurrentPage} isAuthenticated={false} />;
      case Page.SCANNER:
        return <Scanner onScan={navigateToResult} onBack={() => setCurrentPage(Page.HOME)} />;
      case Page.SCAN_RESULT:
        return <ScanResult userId={scannedUserId!} currentUser={auth.user} onBack={() => setCurrentPage(Page.HOME)} onLogin={() => setCurrentPage(Page.LOGIN)} />;
      default:
        return <Home onNavigate={setCurrentPage} isAuthenticated={auth.isAuthenticated} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-2xl relative overflow-hidden">
      {/* App Header */}
      <header className="bg-indigo-600 p-4 text-white flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => setCurrentPage(Page.HOME)}
        >
          <div className="bg-white p-1.5 rounded-lg">
            <Shield className="w-6 h-6 text-indigo-600" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Digital Contact</h1>
        </div>
        <div className="flex items-center space-x-3">
          {auth.isAuthenticated ? (
            <button 
              onClick={() => setCurrentPage(Page.PROFILE)}
              className="hover:bg-indigo-500 p-2 rounded-full transition-colors"
            >
              <UserIcon className="w-6 h-6" />
            </button>
          ) : (
            <button 
              onClick={() => setCurrentPage(Page.LOGIN)}
              className="text-sm font-medium border border-white/30 px-3 py-1 rounded-full hover:bg-white/10"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {renderPage()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 flex justify-around items-center h-16 px-4 z-40">
        <button 
          onClick={() => setCurrentPage(Page.HOME)}
          className={`flex flex-col items-center space-y-1 ${currentPage === Page.HOME ? 'text-indigo-600' : 'text-gray-400'}`}
        >
          <HomeIcon className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Home</span>
        </button>
        <button 
          onClick={() => setCurrentPage(Page.SCANNER)}
          className={`flex flex-col items-center space-y-1 ${currentPage === Page.SCANNER ? 'text-indigo-600' : 'text-gray-400'}`}
        >
          <div className="bg-indigo-600 text-white p-3 -mt-10 rounded-full shadow-lg border-4 border-white transition-transform active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider mt-1">Scan QR</span>
        </button>
        <button 
          onClick={() => auth.isAuthenticated ? setCurrentPage(Page.PROFILE) : setCurrentPage(Page.LOGIN)}
          className={`flex flex-col items-center space-y-1 ${[Page.PROFILE, Page.LOGIN].includes(currentPage) ? 'text-indigo-600' : 'text-gray-400'}`}
        >
          <UserIcon className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
