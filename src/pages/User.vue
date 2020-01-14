<template>
  <q-page padding>
    <!-- content -->
    <q-linear-progress v-if="loading" indeterminate />
    <coming-soon-dialog v-model="comingSoon" />
    <q-table
      :title="$t('user.pageTitle')"
      :data="getUserGetter"
      :columns="columns"
      row-key="id"
      :filter="filter"
      separator="cell"
      wrap-cells
      :dense="$q.screen.lt.md"
      binary-state-sort
      class="full-width item-table"
    >
      <template v-slot:top-right>
        <q-input
          outlined
          dense
          color="primary"
          v-model="filter"
          :placeholder="$t('search')"
          class="q-mx-lg"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props" auto-width>
          <q-item class="q-pa-none">
            <q-item-section>
              <q-btn
                dense
                flat
                color="secondary"
                icon="ion-create"
                @click="onEditUser(props.row.userId)"
              />
            </q-item-section>
          </q-item>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ComingSoonDialog from '../components/comingSoonDialog';

export default {
  name: 'user',
  components: {
    'coming-soon-dialog': ComingSoonDialog,
  },
  data() {
    return {
      comingSoon: false,
      loading: false,
      errors: {},
      filter: '',
      columns: [
        {
          name: 'action',
          align: 'left',
          label: this.$t('user.actionHeader'),
          classes: 'bg-grey-2',
        },
        {
          name: 'nickName',
          required: true,
          align: 'left',
          label: this.$t('user.nickNameHeader'),
          field: 'nickName',
          sortable: true,
        },
        {
          name: 'id',
          required: true,
          align: 'left',
          label: this.$t('user.facebookFullNameHeader'),
          field: 'facebookFullName',
          sortable: true,
        },
        {
          name: 'createdAt',
          align: 'left',
          label: this.$t('user.createdAtHeader'),
          field: (row) => new Date(row.createdAt),
          format: (val) =>
            `${val.toLocaleDateString('ja')} ${val.toLocaleTimeString('ja')}`,
          sortable: true,
          sort: (a, b) => b - a,
        },
      ],
    };
  },
  computed: {
    ...mapGetters('user', ['getUserGetter']),
  },
  methods: {
    ...mapActions('user', ['apiFetchUserAction']),

    onEditUser(id) {
      this.comingSoon = true;
      return id;

      // TODO: apply flow edit user
      // this.$router.push({
      //   name: 'edit-user',
      //   params: { id },
      // });
    },

    async fetchUserList() {
      // Call API fetch user list
      const apolloClient = this.$apollo.provider.defaultClient;
      const result = await this.apiFetchUserAction({
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
              message: this.$t('api.fetchUserListFailed'),
              color: 'deep-orange-4',
            });
      }
    },
  },
  created() {},
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
