<template>
  <q-page padding>
    <!-- content -->
    <q-linear-progress v-if="loading" indeterminate />
    <q-card>
      <q-expansion-item
        expand-separator
        switch-toggle-side
        default-opened
        icon="ion-time"
        :label="$t('editRestaurant.setting.seatAvailableTodayTitle')"
      >
        <q-item v-if="getRestaurantInfoGetter.isVip" v-ripple tag="label">
          <q-item-section>
            <q-item-label>{{
              $t('editRestaurant.setting.seatAvailableTodayLabel')
            }}</q-item-label>
            <q-item-label caption>
              {{
                getRestaurantInfoGetter.seatAvailable
                  ? $t('editRestaurant.setting.seatAvailable')
                  : $t('editRestaurant.setting.seatFull')
              }}
            </q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle
              v-model="getRestaurantInfoGetter.seatAvailable"
              @input="updateSeatAvailableToday()"
            />
          </q-item-section>
        </q-item>
        <q-item v-else>
          <q-item-section>
            {{ $t('onlyForPremiumRestaurant') }}
          </q-item-section>
        </q-item>
      </q-expansion-item>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'edit-restaurant-setting',
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters('restaurant', ['getRestaurantInfoGetter']),
  },
  methods: {
    ...mapActions('restaurant', ['apiUpdateSeatAvailableTodayAction']),

    async updateSeatAvailableToday() {
      this.loading = true;

      // Call API update Seat Available Restaurant
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = {
        restaurantId: this.getRestaurantInfoGetter.restaurantId,
        seatAvailable: this.getRestaurantInfoGetter.seatAvailable,
      };

      const result = await this.apiUpdateSeatAvailableTodayAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Update success
        this.$q.notify({
          message: this.$t('api.updateRestaurantSeatAvailableTodaySuccess'),
          color: 'green-5',
        });
        this.loading = false;
      } else {
        result.systemError
          ? // Update failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Update failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.updateRestaurantSeatAvailableTodayFailed'),
              color: 'deep-orange-4',
            });

        this.loading = false;
      }
    },
  },
};
</script>

<style lang="stylus"></style>
