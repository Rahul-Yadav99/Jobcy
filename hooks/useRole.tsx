import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { roleService } from '../services/roleService';

export const useRole = () => {
    const { isAuthenticated, user } = useAuth();
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRole = async () => {
            setLoading(true);

            // Clear role if not authenticated
            if (!isAuthenticated || !user) {
                setRole(null);
                setLoading(false);
                return;
            }

            try {
                const storedRole = await roleService.getRole();
                setRole(storedRole);
            } catch (error) {
                console.error('Failed to fetch role:', error);
                setRole(null);
            } finally {
                setLoading(false);
            }
        };

        fetchRole();
    }, [isAuthenticated, user]); // Re-run when auth state or user changes

    return { role, loading };
};