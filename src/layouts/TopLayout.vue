<template>
  <q-layout view="hHh lpR lFf">
    <q-header elevated class="bg-header">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-item v-ripple to="/">
          <q-item-section
            class="text-uppercase text-weight-bold text-grey-1 text-h5"
          >
            {{ $t('headerTitle') }}
          </q-item-section>
        </q-item>
        <q-toolbar-title />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" bordered :width="200">
      <!-- drawer content -->
      <q-list>
        <q-item clickable active-class="text-orange" v-ripple to="/home">
          <q-item-section avatar class="icon__menu">
            <q-icon name="ion-home" />
          </q-item-section>
          <q-item-section class="text-body1">{{
            $t('navigation.home')
          }}</q-item-section>
        </q-item>
        <q-item clickable active-class="text-orange" v-ripple to="/restaurants">
          <q-item-section avatar class="icon__menu">
            <q-icon name="ion-wine" />
          </q-item-section>
          <q-item-section class="text-body1">{{
            $t('navigation.restaurants')
          }}</q-item-section>
        </q-item>
        <q-item clickable active-class="text-orange" v-ripple to="/users">
          <q-item-section avatar class="icon__menu">
            <q-icon name="ion-contact" />
          </q-item-section>
          <q-item-section class="text-body1">{{
            $t('navigation.users')
          }}</q-item-section>
        </q-item>
        <q-item
          clickable
          active-class="text-orange"
          v-ripple
          to="/notifications"
        >
          <q-item-section avatar class="icon__menu">
            <q-icon name="ion-notifications" />
          </q-item-section>
          <q-item-section class="text-body1">{{
            $t('navigation.notifications')
          }}</q-item-section>
        </q-item>
        <q-item clickable active-class="text-orange" v-ripple to="/master-data">
          <q-item-section avatar class="icon__menu">
            <q-icon name="ion-document" />
          </q-item-section>
          <q-item-section class="text-body1">{{
            $t('navigation.masterData')
          }}</q-item-section>
        </q-item>

        <q-item :to="{ name: 'setting' }" active-class="text-orange" v-ripple>
          <q-item-section avatar class="icon__menu">
            <q-icon name="ion-settings" />
          </q-item-section>
          <q-item-section>
            {{ $t('navigation.setting') }}
          </q-item-section>
        </q-item>
        <q-item @click="confirm = true" clickable v-ripple>
          <q-item-section avatar class="icon__menu">
            <q-icon name="ion-log-out" />
          </q-item-section>
          <q-item-section>
            {{ $t('auth.logout') }}
          </q-item-section>
          <q-dialog v-model="confirm">
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar
                  icon="ion-log-out"
                  color="primary"
                  text-color="white"
                />
                <span class="q-ml-sm">
                  {{ $t('auth.confirmLogout') }}
                </span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  flat
                  :label="$t('cancel')"
                  color="primary"
                  v-close-popup
                />
                <q-btn
                  flat
                  :label="$t('auth.logout')"
                  @click="callAPILogout()"
                  color="negative"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-footer">
      <q-toolbar>
        <q-toolbar-title class="text-body2 text-weight-bold">
          {{ $t('footerTitle') }}
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { ADMIN_LOGOUT } from './../graphql/mutations/adminLogout';
import { mapActions } from 'vuex';
export default {
  name: 'top-layout',
  data() {
    return {
      left: this.$q.platform.is.desktop,
      right: this.$q.platform.is.desktop,
      confirm: false,
    };
  },
  computed: {},
  methods: {
    ...mapActions('auth', ['logoutAction']),

    async callAPILogout() {
      const apolloCl = this.$apollo.provider.defaultClient;
      await apolloCl
        .mutate({
          mutation: ADMIN_LOGOUT,
        })
        .then((response) => {
          // Logout Success
          if (response.data.result.requestResolved === true) {
            this.$q.loading.hide();
            this.logoutAction();
            this.$router.push({ name: 'login' });
          }
          // Logout Failed
          else {
            this.$q.notify(this.$t('auth.somethingWrong'));
            this.$q.loading.hide();
          }
        })
        .catch((error) => {
          this.$q.notify(error);
          this.$q.loading.hide();
          this.$router.push({ name: 'login' });
        });
    },
  },
};
</script>

<style lang="stylus">
.icon__menu
  min-width: 0
  padding-right: 0.6em
.menu__right
  background-color: $grey-2
  @media screen and (max-width: 1086px)
    background-color: transparent
</style>
