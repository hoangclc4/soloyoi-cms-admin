<template>
  <q-dialog v-model="isNoSupportedBrowser" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="ion-logo-windows" color="primary" text-color="white" />
        <span class="q-ml-sm">
          {{ $t('noSupportedBrowser') }}
        </span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$t('ok')" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'no-supported-browser-dialog',
  props: {
    value: { type: Boolean, default: false },
  },
  computed: {
    isNoSupportedBrowser: {
      get() {
        // returns the value of your prop
        return this.value;
      },
    },
  },
};
</script>

<style lang="stylus"></style>
