<template>
  <q-list class="announcements-list" v-if="store.announcements.getAnnouncements.length > 0">
    <q-item
      v-for="item in store.announcements.getAnnouncements"
      :key="item.id"
      class="announcements-list__item announcements-item"
      clickable
    >
      <q-item-section avatar class="announcements-item__image">
        <q-img :src="item.image" />
      </q-item-section>
      <q-item-section class="announcements-item__info">
        <q-item-label class="announcements-item__title">{{ item.title }}</q-item-label>
        <q-item-label class="announcements-item__desciption" caption>{{ item.description }}</q-item-label>
        <div class="announcements-item__actions">
          <AnnouncementsActions
            v-if="item.primaryAction.buttonAction"
            :action="item.primaryAction"
            @click="handleClick"
          />
          <AnnouncementsActions
            v-if="item.secondaryAction.buttonAction"
            :action="item.secondaryAction"
            @click="handleClick"
          />
        </div>
      </q-item-section>
    </q-item>
  </q-list>
  <q-list v-if="store.announcements.getLoading && store.announcements.getAnnouncements.length == 0">
    <q-item v-for="item in [1, 2, 3, 4]" :key="item">
      <q-item-section avatar>
        <q-skeleton size="104px" />
      </q-item-section>
      <q-item-section>
        <q-item-label>
          <q-skeleton width="150px" />
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text" />
          <q-skeleton type="text" />
          <q-skeleton type="text" width="60%" />
          <div class="row q-mt-sm">
            <q-skeleton width="88px" height="25px" class="q-mr-sm" /> <q-skeleton width="88px" height="25px" />
          </div>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
  <q-list v-if="!store.announcements.getLoading && store.announcements.getAnnouncements.length == 0">
    <q-item>
      <q-item-section avatar>
        <q-icon name="info" size="lg" />
      </q-item-section>
      <q-item-section>
        <q-item-label>No Announcements yet. Feel free to check in a bit later.</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>
import { useStore } from 'src/stores';
import AnnouncementsActions from 'src/components/announcements/Actions.vue';

const store = useStore();
const emit = defineEmits<{
  (e: 'click'): void;
}>();

const handleClick = () => {
  emit('click');
};
</script>
<style lang="scss">
.announcements-item {
  color: $text-color;
  margin-bottom: 15px;
  font-size: 14px;

  &__image {
    width: 120px;
  }
  &__title {
    font-size: 18px;
    font-weight: bold;
    a,
    span {
      color: $link-color;
      text-decoration: none;
    }
  }
  &__description {
    a,
    span {
      color: $link-color;
      text-decoration: none;
    }
  }
  &__time {
    font-size: 12px;
  }
  &__actions {
    margin-top: 10px;
    > * {
      margin-right: 10px;
    }
  }
}
</style>
