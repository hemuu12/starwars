import { create } from 'zustand';

type AppState = {
    isAuthenticated: boolean;
    login: (username: string) => boolean;
    logout: () => void;
};

export const useAppStore = create<AppState>((set) => ({
    isAuthenticated: !!localStorage.getItem('authToken'),
    login: (username) => {
        if(username === 'AdminTesting') {
            localStorage.setItem('authToken', 'dummy-token');
            set({isAuthenticated: true});
            return true;
        }
        return false;
    },
    logout: () => {
        localStorage.removeItem('authToken');
        set({isAuthenticated: false});
    }
}));
