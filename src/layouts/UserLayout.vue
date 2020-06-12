<template>
  <q-layout view="hHh LpR lFf">
    <q-header class="bg-auth">
      <q-toolbar>
        <q-toolbar-title />
        <change-locale-button />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import ChangeLocalButton from '../components/ChangeLocaleButton';

export default {
  name: 'user-layout',
  components: {
    'change-locale-button': ChangeLocalButton,
  },
  data() {
    return {};
  },
};
</script>
