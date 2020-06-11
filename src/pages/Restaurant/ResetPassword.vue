<template>
  <q-layout view="hHh LpR lFf">
    <q-header class="bg-auth">
      <q-toolbar>
        <q-toolbar-title />
        <change-locale-button />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <template>
        <q-page padding class="row justify-center content-center bg-auth">
          <q-card
            style="width: 25em;"
            class="no-shadow text-grey-1 transparent"
          >
            <q-card-section class="row justify-center q-mb-lg">
              <img
                src="statics/logo.png"
                alt="SOLOYOI LOGO"
                style="height: 8em"
              />
            </q-card-section>
            <q-card-section
              class="justify-center text-center text-uppercase text-h5"
            >
              {{ $t('cmsTitle') }}
            </q-card-section>
            <q-card-section align="center">
              {{ $t('auth.forgotPasswordInstructions') }} Restaurant
            </q-card-section>
          </q-card>
        </q-page>
      </template>
    </q-page-container>
  </q-layout>
</template>

<script>
//import ChangeLocalButton from '../components/ChangeLocaleButton';

export default {
  name: 'restaurant-reset-password',
  // components: {
  //   'change-locale-button': ChangeLocalButton,
  // },
  data() {
    return {};
  },
};
</script>
