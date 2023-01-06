import { useUserStore } from './user';
import { useAuthStore } from './auth';
import { useAccountStore } from './account';
import { useAdminAccountStore } from './adminAccount';
import { useBindAccountStore } from './bind';

const userStore = useUserStore();
const authStore = useAuthStore();
const accountStore = useAccountStore();
const adminAccountStore = useAdminAccountStore();
const bindAccountStore = useBindAccountStore();

export { userStore, authStore, accountStore, adminAccountStore, bindAccountStore };
