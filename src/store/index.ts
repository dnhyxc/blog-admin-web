import { useUserStore } from './user';
import { useAuthStore } from './auth';
import { useAccountStore } from './account';
import { useAdminAccountStore } from './adminAccount';
import { useBindAccountStore } from './bind';
import { usePageConfigStore } from './pageConfig';
import { useSettingStore } from './setting';
import { useArticleStore } from './article';

const userStore = useUserStore();
const authStore = useAuthStore();
const accountStore = useAccountStore();
const adminAccountStore = useAdminAccountStore();
const bindAccountStore = useBindAccountStore();
const pageConfigStore = usePageConfigStore();
const settingStore = useSettingStore();
const articleStore = useArticleStore();

export {
  userStore,
  authStore,
  accountStore,
  adminAccountStore,
  bindAccountStore,
  pageConfigStore,
  settingStore,
  articleStore,
};
