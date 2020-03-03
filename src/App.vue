<template>
  <div id="q-app">
    <router-view />
    <no-supported-browser-dialog v-model="isNoSupportedBrowser" />
  </div>
</template>

<script>
import NoSupportedBrowserDialog from 'components/NoSupportedBrowserDialog';
import './utils/canvas-toBlob.js';
import './utils/formData.js';

export default {
  name: 'App',
  data() {
    return {
      isNoSupportedBrowser: this.$q.platform.is.ie,
    };
  },
  components: {
    'no-supported-browser-dialog': NoSupportedBrowserDialog,
  },
};
</script>

<style></style>
