export interface SessionState {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}