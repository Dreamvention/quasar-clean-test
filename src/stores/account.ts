import { defineStore } from 'pinia';
import { container } from 'setup/di';
import { IUserData, UserRoles } from 'domain/entities';
import { AccountService } from 'domain/services';
import { UserMap } from 'data/mappers';
import { authanticate, errorHandler } from 'src/utils';

export default defineStore('account', {
  state: () => ({
    account: {} as IUserData,
  }),
  getters: {
    getAccount: (state) => container.get(UserMap).toDomain(state.account),
    isAuthanticated: () => container.get(AccountService).isAuthanticated(),
  },
  actions: {
    async init() {
      if (this.isAuthanticated) {
        await this.fetchAccount();
      }
    },
    async fetchAccount() {
      try {
        this.account = (await container.get(AccountService).getAccount()) || ({} as IUserData);
      } catch (error) {
        console.log(error);
        errorHandler(error);
      }
    },
    changeRole(role: UserRoles) {
      if (!this.account) return;
      this.account.role = role;
      container.get(AccountService).changeRole(role);
    },
    async login() {
      try {
        const auth = await container.get(AccountService).login();
        if (auth) await authanticate(auth);
      } catch (error) {
        errorHandler(error);
      }
    },
    async logout() {
      void (await container.get(AccountService).logout());
    },
  },
});
