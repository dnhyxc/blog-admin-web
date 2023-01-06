import { useUserStore } from './user';
import { useAuthStore } from './auth';
import { useAccountStore } from './account';
import { useAdminAccountStore } from './adminAccount';
import { useBindAccountStore } from './bind';
import { usePageConfigStore } from './pageConfig';

const userStore = useUserStore();
const authStore = useAuthStore();
const accountStore = useAccountStore();
const adminAccountStore = useAdminAccountStore();
const bindAccountStore = useBindAccountStore();
const pageConfigStore = usePageConfigStore();

export { userStore, authStore, accountStore, adminAccountStore, bindAccountStore, pageConfigStore };
