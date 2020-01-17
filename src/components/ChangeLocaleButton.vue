<template>
  <q-btn
    flat
    @click="$i18n.locale = $i18n.locale === 'ja-jp' ? 'en-us' : 'ja-jp'"
  >
    <img :src="`statics/set-locale-${$i18n.locale}.png`" width="42em" />
  </q-btn>
</template>

<script>
export default {
  name: 'change-locale-button',
};
</script>

<style lang="stylus"></style>
