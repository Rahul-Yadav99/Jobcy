import { useRootNavigationState, useRouter, useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../utils/authService";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const segments = useSegments();
    const rootNavigationState = useRootNavigationState();

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        if (isLoading) return;
        if (!rootNavigationState?.key) return;

        const inAuthGroup = segments[0] === "(auth)";

        if (!user && !inAuthGroup) {
            router.replace("/(auth)/login");
        } else if (user && inAuthGroup) {
            router.replace("/(tabs)");
        }
    }, [user, segments, isLoading, rootNavigationState?.key]);

    const checkAuth = async () => {
        try {
            const token = await authService.getToken();
            if (token) {
                setUser({ token });
            }
        } catch (error) {
            console.error("Auth check error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (token: string) => {
        await authService.saveToken(token);
        setUser({ token });
    };

    const logout = async () => {
        await authService.removeToken();
        setUser(null);
        router.replace("/(auth)/login");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isLoading,
            }
            }
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
