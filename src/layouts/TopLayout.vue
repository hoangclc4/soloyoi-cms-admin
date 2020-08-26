<template>
  <q-layout view="hHh LpR lFf">
    <q-header elevated class="bg-header">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-item v-ripple to="/" class="width-100">
          <q-item-section
            class="text-uppercase text-weight-bold text-grey-1 text-h5"
          >
            {{ $t('headerTitle') }}
          </q-item-section>
        </q-item>
        <q-toolbar-title />
        <change-locale-button />
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
        <q-item clickable active-class="text-orange" v-ripple to="/report">
          <q-item-section avatar class="icon__menu">
            <q-icon name="ion-contact" />
          </q-item-section>
          <q-item-section class="text-body1">{{
            $t('navigation.report')
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
        <!-- <q-item :to="{ name: 'banner' }" active-class="text-orange" v-ripple>
          <q-item-section avatar class="icon__menu">
            <q-icon name="ion-settings" />
          </q-item-section>
          <q-item-section>
            {{ $t('navigation.banner') }}
          </q-item-section>
        </q-item> -->
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
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
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
import { mapActions } from 'vuex';
import ChangeLocalButton from '../components/ChangeLocaleButton';

export default {
  name: 'top-layout',
  components: {
    'change-locale-button': ChangeLocalButton,
  },
  data() {
    return {
      loading: false,
      left: this.$q.platform.is.desktop,
      confirm: false,
    };
  },
  computed: {},
  methods: {
    ...mapActions('auth', ['apiLogoutAction']),
    ...mapActions('masterdata', [
      'apiFetchUserMasterdataAction',
      'apiFetchRestaurantMasterdataAction',
      'apiFetchAllProvinceAction',
    ]),
    ...mapActions('restaurant', ['apiFetchRestaurantAction']),
    ...mapActions('user', ['apiFetchUserAction']),
    ...mapActions('notification', ['apiFetchAdminNotificationAction']),

    ...mapActions('information', ['apiFetchRestaurantInformationAction']),
    ...mapActions('review', ['apiFetchRestaurantReviewAction']),
    ...mapActions('menu', [
      'apiFetchRestaurantMenuPhotoAction',
      'apiFetchRestaurantMenuItemAction',
    ]),
    ...mapActions('staff', ['apiFetchRestaurantStaffAction']),

    async logout() {
      this.confirm = false;
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

    async fetchRestaurantList() {
      // Call API fetch restaurant list
      const apolloClient = this.$apollo.provider.defaultClient;
      // TODO: need to apply pagination for performance when fetch data
      let needGetMoreData = true;
      let pageNum = 1;
      while (needGetMoreData) {
        const pager = { limit: 500, pageNum: pageNum++ };
        const result = await this.apiFetchRestaurantAction({
          apolloClient,
          pager,
        });

        if (result.requestResolved) {
          // Fetch success
          needGetMoreData = result.needGetMoreData;
        } else {
          result.systemError
            ? // Fetch failed, got something wrong with system
              this.$q.notify({
                message: `${result.systemError}`,
                color: 'deep-orange-4',
              })
            : // Fetch failed, got something wrong with user
              this.$q.notify({
                message: this.$t('api.fetchRestaurantListFailed'),
                color: 'deep-orange-4',
              });
          break;
        }
      }
    },
    async fetchUserList() {
      // Call API fetch user list
      const apolloClient = this.$apollo.provider.defaultClient;
      // TODO: need to apply pagination for performance when fetch data
      const pager = { limit: 1000000, pageNum: 1 };
      const result = await this.apiFetchUserAction({ apolloClient, pager });

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
              message: this.$t('api.fetchUserListFailed'),
              color: 'deep-orange-4',
            });
      }
    },

    async fetchMasterdata() {
      this.fetchRestaurantMasterdata();
      await this.fetchUserMasterdata();
      await this.fetchAddressLevelOne();
    },
    async fetchRestaurantMasterdata() {
      // Call API fetch Restaurant Master Data
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = {
        isAll: false,
        order: [
          'OpenTimeSearch',
          'AloneMenu',
          'Sake',
          'LonelyScene',
          'RestaurantPayment',
          'Smoking',
          'Languages',
          'Features',
          'SalesInformations',
          'TypeOfMenu',
          'TheAtmosphereOfTheCounter',
          'Location',
          'StaffStyle',
          'StaffCanTalk',
        ],
      };
      const result = await this.apiFetchRestaurantMasterdataAction({
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
              message: this.$t('api.fetchRestaurantMasterdataFailed'),
              color: 'deep-orange-4',
            });
      }
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

    async fetchAdminNotification() {
      // Call API fetch Admin Notification
      const apolloClient = this.$apollo.provider.defaultClient;
      // TODO: need to apply pagination for performance when fetch data
      const pager = { limit: 1000000, pageNum: 1 };
      const result = await this.apiFetchAdminNotificationAction({
        apolloClient,
        pager,
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
              message: this.$t('api.fetchAdminNotificationFailed'),
              color: 'deep-orange-4',
            });
      }
    },
  },
  created() {
    this.$q.loading.show({ message: this.$t('pleaseWaitABit') });
    this.loading = true;
    Promise.all([
      this.fetchRestaurantList(),
      this.fetchUserList(),
      this.fetchAdminNotification(),
      this.fetchMasterdata(),
    ]).then(() => {
      this.$q.loading.hide();
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
