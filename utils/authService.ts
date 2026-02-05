// utils/authService.js
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'token';

export const authService = {
    async saveToken(token: any) {
        try {
            await SecureStore.setItemAsync(TOKEN_KEY, token);
            return true;
        } catch (error) {
            console.error('Token save error:', error);
            return false;
        }
    },

    async getToken() {
        try {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            return token;
        } catch (error) {
            console.error('Token get error:', error);
            return null;
        }
    },

    async removeToken() {
        try {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            return true;
        } catch (error) {
            console.error('Token remove error:', error);
            return false;
        }
    },

    async isAuthenticated() {
        const token = await this.getToken();
        return token !== null;
    }
};