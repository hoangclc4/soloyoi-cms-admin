<template>
  <q-page padding>
    <!-- content -->
    <q-linear-progress v-if="loading" indeterminate />
    Coming soon...
  </q-page>
</template>

<script>
export default {
  name: 'edit-restaurant-menu',
  data() {
    return {
      loading: false,
      errors: {},
    };
  },
  computed: {},
  methods: {},
  created() {},
};
</script>

<style lang="stylus"></style>
