import { useUserStore } from './user';
import { useAuthStore } from './auth';
import { useAccountStore } from './account';

const userStore = useUserStore();
const authStore = useAuthStore();
const accountStore = useAccountStore();

export { userStore, authStore, accountStore };
