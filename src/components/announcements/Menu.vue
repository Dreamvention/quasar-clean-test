<template>
  <q-btn class="common-user-announcements" color="white" flat round :ripple="false">
    <img src="../../assets/icon-announcements-menu.svg" width="20" height="20" />
    <q-menu self="top left" :offset="[0, 10]" persistent class="common-user-announcements__content">
      <div class="common-user-announcements__heading">Announcements</div>
      <div class="common-user-announcements__list">
        <AnnouncementsList />
      </div>
    </q-menu>
  </q-btn>
</template>

<script lang="ts" setup>
import AnnouncementsList from 'components/announcements/List.vue';
</script>
<style lang="scss">
.common-user-announcements {
  .q-btn-dropdown__arrow {
    display: none;
  }
  &__content {
    overflow: visible;
    max-height: none;
    min-width: 450px;
    &::after {
      content: ' ';
      position: absolute;
      z-index: -1;
      top: -8px;
      right: 13px;
      height: 15px;
      width: 15px;
      transform: rotate(45deg);
      background: #fff;
    }
  }
  &__list {
    overflow-y: auto;
    max-width: 450px;
    max-height: 65vh;
    margin-top: 8px !important;
  }

  &__heading {
    font-size: 18px;
    font-weight: bold;
    padding: 15px 15px 0px 15px;
  }
}
</style>
