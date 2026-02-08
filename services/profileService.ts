import * as SecureStore from 'expo-secure-store';

const USER_KEY = 'user';

export const profileService = {
    async saveUser(user: any) {
        await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
    },
    async getUser() {
        const user = await SecureStore.getItemAsync(USER_KEY);
        return user ? JSON.parse(user) : null;
    },
    async deleteUser() {
        await SecureStore.deleteItemAsync(USER_KEY);
    },
}