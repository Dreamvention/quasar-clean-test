<template>
  <div class="row">
    <div class="col">
      <AccountWidget />
    </div>
    <div class="col"></div>
    <div class="col"></div>
    <div class="col"></div>
  </div>
  <div class="q-mt-md">
    <q-img src="~assets/recommended-for-you.png" />
  </div>
</template>

<script lang="ts" setup>
import AccountWidget from 'components/account/Widget.vue';
// import { MapProvider } from 'modules/map';
</script>

<style lang="scss">
.map {
  height: 300px;
  width: 300px;
}
</style>
