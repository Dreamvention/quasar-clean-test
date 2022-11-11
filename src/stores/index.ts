import { store } from 'quasar/wrappers';
import { createPinia, defineStore } from 'pinia';
import useAccount from './account';
import useAnnouncements from './announcements';

export const useStore = defineStore('index', () => {
  const account = useAccount();
  const announcements = useAnnouncements();

  const init = async () => {
    await account.init();
    await announcements.init();
  };

  return {
    account,
    announcements,
    init,
  };
});

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store((/* { ssrContext } */) => {
  const pinia = createPinia();

  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)

  return pinia;
});
