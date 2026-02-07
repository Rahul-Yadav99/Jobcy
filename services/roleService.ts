import * as SecureStore from 'expo-secure-store';

const ROLE_KEY = 'role';

export const roleService = {
    async saveRole(role: string) {
        try {
            await SecureStore.setItemAsync(ROLE_KEY, role);
            return true;
        } catch (error) {
            console.error('Role save error:', error);
            return false;
        }
    },

    async getRole() {
        try {
            const role = await SecureStore.getItemAsync(ROLE_KEY);
            return role;
        } catch (error) {
            console.error('Role get error:', error);
            return null;
        }
    },

    async removeRole() {
        try {
            await SecureStore.deleteItemAsync(ROLE_KEY);
            return true;
        } catch (error) {
            console.error('Role remove error:', error);
            return false;
        }
    }
};