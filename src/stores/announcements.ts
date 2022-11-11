import { defineStore } from 'pinia';
import { container } from 'setup/di';
import { IAnnouncementData } from 'domain/entities';
import { AnnouncementsService } from 'domain/services';
import { AnnouncementMap } from 'data/mappers';
import useAccount from './account';

export default defineStore('announcements', {
  state: () => ({
    announcements: [] as IAnnouncementData[],
    fetching: false,
    loading: false,
  }),
  getters: {
    getAnnouncements: (state) => state.announcements.map((item) => container.get(AnnouncementMap).toDomain(item)),
    getLoading: (state) => state.loading,
  },
  actions: {
    init() {
      const account = useAccount();
      if (account.isAuthanticated) {
        void this.fetchAnnouncements();
        setInterval(() => {
          void this.fetchAnnouncements();
        }, 1000 * 60);
      }
    },
    async fetchAnnouncements() {
      try {
        this.loading = true;
        this.announcements = (await container.get(AnnouncementsService).getAnnouncements()) || [];
        this.loading = false;
      } catch (e) {
        this.loading = false;
        throw e;
      }
    },
  },
});
