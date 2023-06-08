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
import { useCreateStore } from './create';
import { useCommentStore } from './comment';
import { useInteractStore } from './interact';
import { useClassifyStore } from './classify';
import { useUploadStore } from './upload';
import { useToolsStore } from './tools';
import { useHomeStore } from './home';

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
const createStore = useCreateStore();
const commentStore = useCommentStore();
const interactStore = useInteractStore();
const classifyStore = useClassifyStore();
const uploadStore = useUploadStore();
const toolsStore = useToolsStore();
const homeStore = useHomeStore();

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
  createStore,
  commentStore,
  interactStore,
  classifyStore,
  uploadStore,
  toolsStore,
  homeStore,
};
