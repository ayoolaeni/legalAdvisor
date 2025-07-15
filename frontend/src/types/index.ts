export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  lastMessage: string;
  timestamp: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  totalChats: number;
  subscription: 'free' | 'premium' | 'enterprise';
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  isAuthenticated: boolean;
}

export interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  isLoading: boolean;
}