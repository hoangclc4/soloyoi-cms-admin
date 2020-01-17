<template>
  <q-page padding>
    <!-- content -->
    <q-card>
      <q-item>
        <q-item-section
          class="text-h5 text-weight-bold"
          :style="{ color: getUserInfoGetter.isVip ? 'goldenrod' : '' }"
        >
          {{
            getUserInfoGetter.isVip
              ? $t('editUser.payment.greeting') +
                ' ' +
                $t('premiumMember').toUpperCase()
              : $t('editUser.payment.greeting') +
                ' ' +
                $t('freeMember').toUpperCase()
          }}
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section v-html="$t('editUser.payment.changeRole')" />
      </q-item>
    </q-card>
    <q-table
      :title="$t('editUser.payment.paymentLogTitle')"
      :data="getUserPaymentLogGetter"
      :columns="columns"
      row-key="nickname"
      :filter="filter"
      separator="cell"
      wrap-cells
      :dense="$q.screen.lt.md"
      binary-state-sort
      class="item-table q-mt-md"
    >
      <template v-slot:top-right>
        <q-input
          outlined
          dense
          debounce="300"
          color="primary"
          v-model="filter"
          :placeholder="$t('search')"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'edit-user-payment',
  data() {
    return {
      filter: '',
      columns: [
        {
          name: 'descriptions',
          align: 'left',
          label: this.$t('editUser.payment.descriptionHeader'),
          field: 'descriptions',
          sortable: true,
        },
        {
          name: 'createdAt',
          align: 'left',
          label: this.$t('editUser.payment.createdAtHeader'),
          field: (row) => new Date(row.createdAt),
          format: (val) =>
            `${val.toLocaleDateString('ja')} ${val.toLocaleTimeString('ja')}`,
          sortable: true,
        },
        {
          name: 'updatedAt',
          align: 'left',
          label: this.$t('editUser.payment.updatedAtHeader'),
          field: (row) => new Date(row.updatedAt),
          format: (val) =>
            `${val.toLocaleDateString('ja')} ${val.toLocaleTimeString('ja')}`,
          sortable: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters('user', ['getUserInfoGetter', 'getUserPaymentLogGetter']),
  },
  methods: {},
};
</script>

<style lang="stylus">
.item-table
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: $orange-1
</style>
