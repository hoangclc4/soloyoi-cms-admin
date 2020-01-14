<template>
  <q-page padding>
    <!-- content -->
    <q-linear-progress v-if="loading" indeterminate />
    <q-card>
      <q-card-section>
        {{ $t('home.greeting') }}
      </q-card-section>
    </q-card>
    <q-card class="q-my-md">
      <q-card-section>
        <div class="text-h5 text-weight-bold" style="color: goldenrod">
          {{ $t('home.howToUseCMSAdmin') }}
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">{{ $t('navigation.restaurant') + ' page:' }}</div>
        {{ $t('home.howToUseRestaurantPage') }}
      </q-card-section>
      <q-card-section>
        <div class="text-h6">{{ $t('navigation.user') + ' page:' }}</div>
        {{ $t('home.howToUseUserPage') }}
      </q-card-section>
      <q-card-section>
        <div class="text-h6">
          {{ $t('navigation.notification') + ' page:' }}
        </div>
        {{ $t('home.howToUseNotificationPage') }}
      </q-card-section>
      <q-card-section>
        <div class="text-h6">{{ $t('navigation.masterdata') + ' page:' }}</div>
        {{ $t('home.howToUseMasterdataPage') }}
      </q-card-section>
      <q-card-section>
        <div class="text-h6">{{ $t('navigation.setting') + ' page:' }}</div>
        {{ $t('home.howToUseSettingPage') }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'home',
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

<style></style>
