<template>
  <q-page padding>
    <!-- content -->
    <q-card>
      <q-item>
        <q-item-section
          class="text-h5 text-weight-bold"
          :style="{ color: getRestaurantInfoGetter.isVip ? 'goldenrod' : '' }"
        >
          {{
            getRestaurantInfoGetter.isVip
              ? $t('editRestaurant.payment.greeting') +
                ' ' +
                $t('premiumMember').toUpperCase()
              : $t('editRestaurant.payment.greeting') +
                ' ' +
                $t('freeMember').toUpperCase()
          }}
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section v-html="$t('editRestaurant.payment.changeRole')" />
      </q-item>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'edit-restaurant-payment',
  data() {
    return {};
  },
  computed: {
    ...mapGetters('restaurant', ['getRestaurantInfoGetter']),
  },
  methods: {},
};
</script>

<style lang="stylus"></style>
