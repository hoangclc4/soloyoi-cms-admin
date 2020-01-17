<template>
  <q-layout view="hHh LpR lFf">
    <q-header class="bg-header">
      <q-toolbar>
        <q-toolbar-title />
        <q-btn
          flat
          @click="$i18n.locale = $i18n.locale === 'ja-jp' ? 'en-us' : 'ja-jp'"
        >
          <img :src="`statics/set-locale-${$i18n.locale}.png`" width="42em" />
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
