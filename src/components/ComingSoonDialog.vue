<template>
  <q-dialog v-model="displayDialog">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="ion-rocket" color="primary" text-color="white" />
        <span class="q-ml-sm">
          {{ 'This feature is coming soon...' }}
        </span>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          flat
          :label="$t('goBack')"
          color="primary"
          @click="hideDialog()"
          class="full-width"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'coming-soon-dialog',
  props: {
    value: { type: Boolean, default: false },
  },
  data() {
    return {};
  },
  computed: {
    displayDialog: {
      get() {
        // returns the value of your prop
        return this.value;
      },
      set(newValue) {
        // v-model listens to the input event, so emitting `input` with a value
        // will update the model with that value
        this.$emit('input', newValue);
      },
    },
  },
  methods: {
    hideDialog() {
      this.displayDialog = false;
    },
  },
};
</script>

<style lang="stylus"></style>
