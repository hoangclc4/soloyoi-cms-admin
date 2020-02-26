<template>
  <q-page padding>
    <!-- content -->
    <q-linear-progress v-if="loading" indeterminate />
    <q-dialog v-model="openToCreateMasterdata">
      <q-card class="full-width">
        <q-card-section>
          <div class="text-h6">{{ $t('masterdata.createMasterdata') }}</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="newMasterdata.category"
            outlined
            readonly
            :label="$t('masterdata.category')"
          />
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="newMasterdata.name"
            :error="errors.newMasterdata.name"
            outlined
            autofocus
            :label="$t('masterdata.name')"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            :label="$t('cancel')"
            @click="clearInput()"
            v-close-popup
          />
          <q-btn
            color="primary"
            icon-right="ion-checkmark-circle"
            :label="$t('create')"
            @click="
              tab === 'restaurant'
                ? createRestaurantMasterdata()
                : createUserMasterdata()
            "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmDeleteMasterdata">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="ion-trash" color="negative" text-color="white" />
          <span class="q-ml-sm">
            {{
              $t('masterdata.confirmDeleteMasterdata') +
                ' ' +
                deletionMasterdata.value
            }}
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
          <q-btn
            flat
            :label="$t('delete')"
            @click="
              tab === 'restaurant'
                ? deleteRestaurantMasterdata()
                : deleteUserMasterdata()
            "
            color="negative"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-card>
      <q-tabs
        v-model="tab"
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="restaurant" :label="$t('navigation.restaurant')" />
        <q-tab name="user" :label="$t('navigation.user')" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="restaurant">
          <q-item
            v-for="(category, index) in Object.keys(
              getRestaurantMasterdataGetter
            )"
            :key="index"
            class="q-px-none"
          >
            <q-item-section>
              <q-select
                outlined
                dense
                :label="restaurantCategoryLabel[category]"
                v-model="getRestaurantMasterdataGetter[category]"
                use-chips
                multiple
                sanitize
                hide-dropdown-icon
              >
                <template v-slot:prepend>
                  <q-btn
                    v-if="category !== 'StaffBirthplace'"
                    dense
                    flat
                    color="primary"
                    icon="ion-add"
                    @click="onAddRestaurantMasterdata(category)"
                  />
                </template>
                <template v-slot:selected-item="scope">
                  <q-chip
                    :removable="category !== 'StaffBirthplace'"
                    dense
                    @remove="onRemoveRestaurantMasterdata(scope)"
                    :tabindex="scope.tabindex"
                  >
                    {{ scope.opt.value }}
                  </q-chip>
                </template>
              </q-select>
            </q-item-section>
          </q-item>
        </q-tab-panel>

        <q-tab-panel name="user">
          <q-item
            v-for="(category, index) in Object.keys(getUserMasterdataGetter)"
            :key="index"
            class="q-px-none"
          >
            <q-item-section>
              <q-select
                outlined
                dense
                :label="userCategoryLabel[category]"
                v-model="getUserMasterdataGetter[category]"
                use-chips
                multiple
                sanitize
                hide-dropdown-icon
              >
                <template v-slot:prepend>
                  <q-btn
                    v-if="category !== 'UserBirthplace'"
                    dense
                    flat
                    color="primary"
                    icon="ion-add"
                    @click="onAddUserMasterdata(category)"
                  />
                </template>
                <template v-slot:selected-item="scope">
                  <q-chip
                    :removable="category !== 'UserBirthplace'"
                    dense
                    @remove="onRemoveUserMasterdata(scope)"
                    :tabindex="scope.tabindex"
                  >
                    {{ scope.opt.value }}
                  </q-chip>
                </template>
              </q-select>
            </q-item-section>
          </q-item>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'masterdata',
  data() {
    return {
      loading: false,
      errors: {
        newMasterdata: { name: false },
      },
      tab: 'restaurant',
      restaurantCategoryLabel: {
        OpenTimeSearch: this.$t('masterdata.restaurant.OpenTimeSearchLabel'),
        AloneMenu: this.$t('masterdata.restaurant.AloneMenuLabel'),
        Sake: this.$t('masterdata.restaurant.SakeLabel'),
        LonelyScene: this.$t('masterdata.restaurant.LonelySceneLabel'),
        RestaurantPayment: this.$t(
          'masterdata.restaurant.RestaurantPaymentLabel'
        ),
        Smoking: this.$t('masterdata.restaurant.SmokingLabel'),
        Languages: this.$t('masterdata.restaurant.LanguagesLabel'),
        Features: this.$t('masterdata.restaurant.FeaturesLabel'),
        SalesInformations: this.$t(
          'masterdata.restaurant.SalesInformationsLabel'
        ),
        TypeOfMenu: this.$t('masterdata.restaurant.TypeOfMenuLabel'),
        TheAtmosphereOfTheCounter: this.$t(
          'masterdata.restaurant.TheAtmosphereOfTheCounterLabel'
        ),
        Location: this.$t('masterdata.restaurant.LocationLabel'),
        StaffStyle: this.$t('masterdata.restaurant.StaffStyleLabel'),
        StaffCanTalk: this.$t('masterdata.restaurant.StaffCanTalkLabel'),
        StaffBirthplace: this.$t('masterdata.restaurant.StaffBirthplaceLabel'),
      },
      userCategoryLabel: {
        SinglePersonArea: this.$t('masterdata.user.SinglePersonAreaLabel'),
        Occupation: this.$t('masterdata.user.OccupationLabel'),
        Sake: this.$t('masterdata.user.SakeLabel'),
        Smoking: this.$t('masterdata.user.SmokingLabel'),
        StoryStance: this.$t('masterdata.user.StoryStanceLabel'),
        FavoriteConversationGenre: this.$t(
          'masterdata.user.FavoriteConversationGenreLabel'
        ),
        Personal: this.$t('masterdata.user.PersonalLabel'),
        WhenDrinkingAlone: this.$t('masterdata.user.WhenDrinkingAloneLabel'),
        GenderOfPartner: this.$t('masterdata.user.GenderOfPartnerLabel'),
        YourFeeling: this.$t('masterdata.user.YourFeelingLabel'),
        PaymentFeeling: this.$t('masterdata.user.PaymentFeelingLabel'),
        TimeFeeling: this.$t('masterdata.user.TimeFeelingLabel'),
        UserBirthplace: this.$t('masterdata.user.UserBirthplaceLabel'),
      },
      openToCreateMasterdata: false,
      newMasterdata: { name: '', category: '' },
      confirmDeleteMasterdata: false,
      deletionMasterdata: { id: '', value: '' },
    };
  },
  computed: {
    ...mapGetters('masterdata', [
      'getRestaurantMasterdataGetter',
      'getUserMasterdataGetter',
    ]),
  },
  methods: {
    ...mapActions('masterdata', [
      'apiFetchRestaurantMasterdataAction',
      'apiCreateRestaurantMasterdataAction',
      'apiDeleteRestaurantMasterdataAction',
      'apiFetchUserMasterdataAction',
      'apiCreateUserMasterdataAction',
      'apiDeleteUserMasterdataAction',
    ]),

    /* Restaurant Masterdata */
    clearInput() {
      this.newMasterdata = { name: '', category: '' };
    },
    onAddRestaurantMasterdata(category) {
      this.errors.newMasterdata = { name: false };
      this.openToCreateMasterdata = true;
      this.newMasterdata.category = category;
    },
    onRemoveRestaurantMasterdata(scope) {
      this.deletionMasterdata = {
        id: scope.opt.id,
        value: scope.opt.value,
      };
      this.confirmDeleteMasterdata = true;
    },
    async createRestaurantMasterdata() {
      this.openToCreateMasterdata = false;
      this.loading = true;

      this.errors.newMasterdata.name = this.newMasterdata.name === '';

      if (this.errors.newMasterdata.name) {
        this.loading = false;
        this.openToCreateMasterdata = true;
      } else {
        // Call API create Restaurant Master Data
        const apolloClient = this.$apollo.provider.defaultClient;
        const input = this.newMasterdata;
        const result = await this.apiCreateRestaurantMasterdataAction({
          apolloClient,
          input,
        });

        if (result.requestResolved) {
          // Create success
          this.fetchRestaurantMasterdata().then(() => {
            this.clearInput();
            this.$q.notify({
              message: this.$t('api.createRestaurantMasterdataSuccess'),
              color: 'green-5',
            });
            this.loading = false;
          });
        } else {
          result.systemError
            ? // Create failed, got something wrong with system
              this.$q.notify({
                message: `${result.systemError}`,
                color: 'deep-orange-4',
              })
            : // Create failed, got something wrong with user
              this.$q.notify({
                message: this.$t('api.createRestaurantMasterdataFailed'),
                color: 'deep-orange-4',
              });

          this.loading = false;
        }
      }
    },
    async deleteRestaurantMasterdata() {
      this.confirmDeleteMasterdata = false;
      this.loading = true;

      // Call API Delete Restaurant Master Data
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { masterId: this.deletionMasterdata.id };
      const result = await this.apiDeleteRestaurantMasterdataAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Delete success
        this.fetchRestaurantMasterdata().then(() => {
          this.$q.notify({
            message: this.$t('api.deleteRestaurantMasterdataSuccess'),
            color: 'green-5',
          });
          this.loading = false;
        });
      } else {
        result.systemError
          ? // Delete failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Delete failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.deleteRestaurantMasterdataFailed'),
              color: 'deep-orange-4',
            });

        this.loading = false;
      }
    },

    /* User Masterdata */
    onAddUserMasterdata(category) {
      this.errors.newMasterdata = { name: false };
      this.openToCreateMasterdata = true;
      this.newMasterdata.category = category;
    },
    onRemoveUserMasterdata(scope) {
      this.deletionMasterdata = {
        id: scope.opt.id,
        value: scope.opt.value,
      };
      this.confirmDeleteMasterdata = true;
    },
    async createUserMasterdata() {
      this.openToCreateMasterdata = false;
      this.loading = true;

      this.errors.newMasterdata.name = this.newMasterdata.name === '';

      if (this.errors.newMasterdata.name) {
        this.loading = false;
        this.openToCreateMasterdata = true;
      } else {
        // Call API create User Master Data
        const apolloClient = this.$apollo.provider.defaultClient;
        const input = this.newMasterdata;
        const result = await this.apiCreateUserMasterdataAction({
          apolloClient,
          input,
        });

        if (result.requestResolved) {
          // Create success
          this.fetchUserMasterdata().then(() => {
            this.clearInput();
            this.$q.notify({
              message: this.$t('api.createUserMasterdataSuccess'),
              color: 'green-5',
            });
            this.loading = false;
          });
        } else {
          result.systemError
            ? // Create failed, got something wrong with system
              this.$q.notify({
                message: `${result.systemError}`,
                color: 'deep-orange-4',
              })
            : // Create failed, got something wrong with user
              this.$q.notify({
                message: this.$t('api.createUserMasterdataFailed'),
                color: 'deep-orange-4',
              });

          this.loading = false;
        }
      }
    },
    async deleteUserMasterdata() {
      this.confirmDeleteMasterdata = false;
      this.loading = true;

      // Call API Delete User Master Data
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { masterId: this.deletionMasterdata.id };
      const result = await this.apiDeleteUserMasterdataAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Delete success
        this.fetchUserMasterdata().then(() => {
          this.$q.notify({
            message: this.$t('api.deleteUserMasterdataSuccess'),
            color: 'green-5',
          });
          this.loading = false;
        });
      } else {
        result.systemError
          ? // Delete failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Delete failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.deleteUserMasterdataFailed'),
              color: 'deep-orange-4',
            });

        this.loading = false;
      }
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
      // Call API fetch Restaurant Master Data
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
  },
};
</script>

<style></style>
