import { useEffect, useState } from 'react';
import { roleService } from '../services/roleService';

export const useRole = () => {
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRole = async () => {
            const storedRole = await roleService.getRole();
            if (storedRole) {
                setRole(storedRole);
            }
            setLoading(false);
        };
        fetchRole();
    }, []);

    return { role, loading };
};