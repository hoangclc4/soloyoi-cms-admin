<template>
  <q-layout view="hHh LpR lfr">
    <q-header elevated class="bg-header">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-item v-ripple :to="{ name: 'edit-user' }">
          <q-item-section
            class="text-uppercase text-weight-bold text-grey-1 text-h5"
          >
            {{
              $t('navigation.editUser.title') +
                '・' +
                getUserInfoGetter.nickName
            }}
          </q-item-section>
        </q-item>
        <q-toolbar-title />
        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered :width="200">
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
        <q-item clickable active-class="text-orange" v-ripple to="/restaurant">
          <q-item-section avatar class="icon__menu">
            <q-icon name="ion-wine" />
          </q-item-section>
          <q-item-section class="text-body1">{{
            $t('navigation.restaurant')
          }}</q-item-section>
        </q-item>
        <q-item clickable active-class="text-orange" v-ripple to="/user">
          <q-item-section avatar class="icon__menu">
            <q-icon name="ion-contact" />
          </q-item-section>
          <q-item-section class="text-body1">{{
            $t('navigation.user')
          }}</q-item-section>
        </q-item>
        <q-item
          clickable
          active-class="text-orange"
          v-ripple
          to="/notification"
        >
          <q-item-section avatar class="icon__menu">
            <q-icon name="ion-notifications" />
          </q-item-section>
          <q-item-section class="text-body1">{{
            $t('navigation.notification')
          }}</q-item-section>
        </q-item>
        <q-item clickable active-class="text-orange" v-ripple to="/masterdata">
          <q-item-section avatar class="icon__menu">
            <q-icon name="ion-list" />
          </q-item-section>
          <q-item-section class="text-body1">{{
            $t('navigation.masterdata')
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
                  @click="logout()"
                  color="negative"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-item>
      </q-list>
    </q-drawer>
    <q-drawer show-if-above v-model="right" side="right" bordered :width="200">
      <!-- drawer content -->
      <q-list>
        <q-item>
          <q-item-section class="text-h6">
            {{ $t('navigation.editUser.title') }}
          </q-item-section>
        </q-item>
        <q-item
          clickable
          active-class="text-orange"
          v-ripple
          :to="{ name: 'edit-user-payment' }"
        >
          <q-item-section avatar class="icon__menu">
            <q-icon name="ion-card" />
          </q-item-section>
          <q-item-section class="text-body1">
            {{ $t('navigation.editUser.payment') }}
          </q-item-section>
        </q-item>
        <q-item
          clickable
          active-class="text-orange"
          v-ripple
          :to="{ name: 'edit-user-profile' }"
        >
          <q-item-section avatar class="icon__menu">
            <q-icon name="ion-contact" />
          </q-item-section>
          <q-item-section class="text-body1">
            {{ $t('navigation.editUser.profile') }}
          </q-item-section>
        </q-item>
        <q-item
          clickable
          active-class="text-orange"
          v-ripple
          :to="{ name: 'edit-user-feeling-today' }"
        >
          <q-item-section avatar class="icon__menu">
            <q-icon name="ion-happy" />
          </q-item-section>
          <q-item-section class="text-body1">
            {{ $t('navigation.editUser.feelingToday') }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-linear-progress v-if="loading" indeterminate />
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
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'edit-user-layout',
  data() {
    return {
      loading: false,
      left: this.$q.platform.is.desktop,
      right: this.$q.platform.is.desktop,
      confirm: false,
    };
  },
  computed: {
    ...mapGetters('user', ['getUserInfoGetter']),
  },
  methods: {
    ...mapActions('auth', ['apiLogoutAction']),
    ...mapActions('masterdata', [
      'apiFetchUserMasterdataAction',
      'apiFetchAllProvinceAction',
    ]),
    ...mapActions('user', [
      'apiFetchUserInformationAction',
      'apiFetchUserPaymentLogAction',
    ]),

    async logout() {
      this.loading = true;

      // Call API Logout
      const apolloClient = this.$apollo.provider.defaultClient;
      const result = await this.apiLogoutAction({ apolloClient });

      if (result.requestResolved) {
        // Logout success
        this.loading = false;

        // Move to Login Page to clear all state
        this.$router.push({ name: 'login' });
      } else {
        result.systemError
          ? // Logout failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Logout failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.logoutFailed'),
              color: 'deep-orange-4',
            });

        this.loading = false;
      }
    },

    async fetchUserInformation() {
      // Call API fetch User Master Data
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { userId: this.$route.params.id };
      const result = await this.apiFetchUserInformationAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Fetch success
      } else {
        result.systemError
          ? // Fetch failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Fetch failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.editUser.fetchUserMasterdataFailed'),
              color: 'deep-orange-4',
            });
      }
    },
    async fetchUserPaymentLog() {
      // Call API fetch User Master Data
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = {
        userId: this.$route.params.id,
        startDate: '2019-06-04',
        endDate: new Date()
          .toLocaleDateString('ja', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replace(/\//gi, '-'),
      };
      const result = await this.apiFetchUserPaymentLogAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Fetch success
      } else {
        result.systemError
          ? // Fetch failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Fetch failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.editUser.fetchUserPaymentLogFailed'),
              color: 'deep-orange-4',
            });
      }
    },
    async fetchMasterdata() {
      await this.fetchUserMasterdata();
      await this.fetchAddressLevelOne();
    },
    async fetchUserMasterdata() {
      // Call API fetch User Master Data
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = {
        isAll: false,
        order: [
          'SinglePersonArea',
          'Occupation',
          'Sake',
          'Smoking',
          'StoryStance',
          'FavoriteConversationGenre',
          'Personal',
          'WhenDrinkingAlone',
          'GenderOfPartner',
          'YourFeeling',
          'PaymentFeeling',
          'TimeFeeling',
        ],
      };
      const result = await this.apiFetchUserMasterdataAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Fetch success
      } else {
        result.systemError
          ? // Fetch failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Fetch failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.fetchUserMasterdataFailed'),
              color: 'deep-orange-4',
            });
      }
    },
    async fetchAddressLevelOne() {
      // Call API fetch all Japan's Province - Level 1
      const apolloClient = this.$apollo.provider.defaultClient;
      const result = await this.apiFetchAllProvinceAction({
        apolloClient,
      });

      if (result.requestResolved) {
        // Fetch success
      } else {
        result.systemError
          ? // Fetch failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Fetch failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.fetchProvinceFailed'),
              color: 'deep-orange-4',
            });
      }
    },
  },
  created() {
    this.loading = true;
    Promise.all([
      this.fetchUserInformation(),
      this.fetchUserPaymentLog(),
      this.fetchMasterdata(),
    ]).then(() => {
      this.loading = false;
    });
  },
};
</script>

<style lang="stylus">
.icon__menu
  min-width: 0
  padding-right: 0.6em
</style>
