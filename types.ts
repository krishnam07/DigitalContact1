
export interface User {
  id: string;
  fullName: string;
  contactNumber: string;
  emergencyNumber: string;
  password?: string;
  allowEmergencyCall: boolean;
}

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};

export enum Page {
  HOME = 'home',
  LOGIN = 'login',
  REGISTER = 'register',
  PROFILE = 'profile',
  SCANNER = 'scanner',
  SCAN_RESULT = 'scan-result'
}
