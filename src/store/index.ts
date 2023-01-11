import { useUserStore } from './user';
import { useAuthStore } from './auth';
import { useAccountStore } from './account';
import { useAdminAccountStore } from './adminAccount';
import { useBindAccountStore } from './bind';
import { usePageConfigStore } from './pageConfig';
import { useSettingStore } from './setting';
import { useArticleStore } from './article';
import { useDetailStore } from './detail';
import { useMessageStore } from './message';

const userStore = useUserStore();
const authStore = useAuthStore();
const accountStore = useAccountStore();
const adminAccountStore = useAdminAccountStore();
const bindAccountStore = useBindAccountStore();
const pageConfigStore = usePageConfigStore();
const settingStore = useSettingStore();
const articleStore = useArticleStore();
const detailStore = useDetailStore();
const messageStore = useMessageStore();

export {
  userStore,
  authStore,
  accountStore,
  adminAccountStore,
  bindAccountStore,
  pageConfigStore,
  settingStore,
  articleStore,
  detailStore,
  messageStore,
};
