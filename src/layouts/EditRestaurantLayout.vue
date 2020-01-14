<template>
  <q-layout view="hHh LpR lfr">
    <q-header elevated class="bg-header">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-item v-ripple :to="{ name: 'edit-restaurant' }">
          <q-item-section
            class="text-uppercase text-weight-bold text-grey-1 text-h5"
          >
            {{
              getRestaurantInfoGetter
                ? `${$t('navigation.editRestaurant.title')}・${
                    getRestaurantInfoGetter.name
                  }`
                : $t('navigation.editRestaurant.title')
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
            {{ $t('navigation.editRestaurant.title') }}
          </q-item-section>
        </q-item>
        <q-item
          clickable
          active-class="text-orange"
          v-ripple
          :to="{ name: 'edit-restaurant-payment' }"
        >
          <q-item-section avatar class="icon__menu">
            <q-icon name="ion-card" />
          </q-item-section>
          <q-item-section class="text-body1">
            {{ $t('navigation.editRestaurant.payment') }}
          </q-item-section>
        </q-item>
        <q-item
          clickable
          active-class="text-orange"
          v-ripple
          :to="{ name: 'edit-restaurant-information' }"
        >
          <q-item-section avatar class="icon__menu">
            <q-icon name="ion-information-circle" />
          </q-item-section>
          <q-item-section class="text-body1">
            {{ $t('navigation.editRestaurant.information') }}
          </q-item-section>
        </q-item>
        <q-item
          clickable
          active-class="text-orange"
          v-ripple
          :to="{ name: 'edit-restaurant-menu' }"
        >
          <q-item-section avatar class="icon__menu">
            <q-icon name="ion-book" />
          </q-item-section>
          <q-item-section class="text-body1">
            {{ $t('navigation.editRestaurant.menu') }}
          </q-item-section>
        </q-item>
        <q-item
          clickable
          active-class="text-orange"
          v-ripple
          :to="{ name: 'edit-restaurant-staff' }"
        >
          <q-item-section avatar class="icon__menu">
            <q-icon name="ion-contact" />
          </q-item-section>
          <q-item-section class="text-body1">
            {{ $t('navigation.editRestaurant.staff') }}
          </q-item-section>
        </q-item>
        <q-item
          clickable
          active-class="text-orange"
          v-ripple
          :to="{ name: 'edit-restaurant-review' }"
        >
          <q-item-section avatar class="icon__menu">
            <q-icon name="ion-star-half" />
          </q-item-section>
          <q-item-section class="text-body1">
            {{ $t('navigation.editRestaurant.review') }}
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
  name: 'edit-restaurant-layout',
  data() {
    return {
      loading: false,
      left: this.$q.platform.is.desktop,
      right: this.$q.platform.is.desktop,
      confirm: false,
    };
  },
  computed: {
    ...mapGetters('restaurant', ['getRestaurantInfoGetter']),
  },
  methods: {
    ...mapActions('auth', ['apiLogoutAction']),
    ...mapActions('masterdata', [
      'apiFetchUserMasterdataAction',
      'apiFetchRestaurantMasterdataAction',
      'apiFetchAllProvinceAction',
    ]),
    ...mapActions('restaurant', [
      'apiFetchRestaurantAction',
      'apiFetchRestaurantInformationAction',

      // TODO: apply these action to call API
      'apiFetchRestaurantReviewAction',
      'apiFetchRestaurantMenuPhotoAction',
      'apiFetchRestaurantMenuItemAction',
      'apiFetchRestaurantStaffAction',
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

    async fetchMasterdata() {
      this.fetchRestaurantMasterdata();
      await this.fetchRestaurantMasterdata();
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
          : // Fetch failed, got something wrong with restaurant
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
          : // Fetch failed, got something wrong with restaurant
            this.$q.notify({
              message: this.$t('api.fetchProvinceFailed'),
              color: 'deep-orange-4',
            });
      }
    },
    async fetchRestaurantInformation() {
      // Call API fetch Restaurant Information
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { restaurantId: this.$route.params.id };
      const result = await this.apiFetchRestaurantInformationAction({
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
              message: this.$t('api.fetchRestaurantInformationFailed'),
              color: 'deep-orange-4',
            });
      }
    },

    // TODO: apply these action to call API
    async fetchRestaurantReview() {
      // Call API fetch Restaurant Review
      const apolloClient = this.$apollo.provider.defaultClient;
      const pager = { limit: 1000000, pageNum: 1 };
      const result = await this.apiFetchRestaurantReviewAction({
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
          : // Fetch failed, got something wrong with restaurant
            this.$q.notify({
              message: this.$t('api.fetchRestaurantReviewFailed'),
              color: 'deep-orange-4',
            });
      }
    },
    async fetchRestaurantMenuPhoto() {
      // Call API fetch Restaurant Menu Photo
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { menuTypes: 'FOOD' }; // FOOD or DRINK
      const result = await this.apiFetchRestaurantMenuPhotoAction({
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
          : // Fetch failed, got something wrong with restaurant
            this.$q.notify({
              message: this.$t('api.fetchRestaurantMenuPhotoFailed'),
              color: 'deep-orange-4',
            });
      }
    },
    async fetchRestaurantMenuFood() {
      // Call API fetch Restaurant Menu Food
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { menuTypes: 'FOOD' };
      const result = await this.apiFetchRestaurantMenuItemAction({
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
          : // Fetch failed, got something wrong with restaurant
            this.$q.notify({
              message: this.$t('api.fetchRestaurantMenuFoodFailed'),
              color: 'deep-orange-4',
            });
      }
    },
    async fetchRestaurantMenuDrink() {
      // Call API fetch Restaurant Menu Drink
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { menuTypes: 'DRINK' };
      const result = await this.apiFetchRestaurantMenuItemAction({
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
          : // Fetch failed, got something wrong with restaurant
            this.$q.notify({
              message: this.$t('api.fetchRestaurantMenuDrinkFailed'),
              color: 'deep-orange-4',
            });
      }
    },
    async fetchRestaurantStaff() {
      // Call API fetch Restaurant Staff
      const apolloClient = this.$apollo.provider.defaultClient;
      const result = await this.apiFetchRestaurantStaffAction({
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
          : // Fetch failed, got something wrong with restaurant
            this.$q.notify({
              message: this.$t('api.fetchRestaurantStaffFailed'),
              color: 'deep-orange-4',
            });
      }
    },
  },
  created() {
    this.loading = true;
    Promise.all([
      this.fetchMasterdata(),
      this.fetchRestaurantInformation(),
      // this.fetchRestaurantReview(),
      // this.fetchRestaurantMenuPhoto(),
      // this.fetchRestaurantMenuFood(),
      // this.fetchRestaurantMenuDrink(),
      // this.fetchRestaurantStaff(),
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
