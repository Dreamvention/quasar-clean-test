<template>
  <q-header class="common-header">
    <q-toolbar class="common-header__toolbar">
      <CommonLogo />
      <AnnouncementsMenu />
      <AccountMenu color="white" />
    </q-toolbar>
  </q-header>
</template>
<script lang="ts" setup>
// import CommonUserNotifications from 'components/common/UserNotifications.vue';
import AnnouncementsMenu from 'components/announcements/Menu.vue';
import CommonLogo from 'components/common/Logo.vue';
import AccountMenu from 'components/account/Menu.vue';
</script>
<style lang="scss">
.common-header {
  &__tollbar {
    height: 60px;
  }
}
</style>
