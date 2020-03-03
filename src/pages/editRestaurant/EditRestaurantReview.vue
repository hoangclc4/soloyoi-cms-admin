<template>
  <q-page padding>
    <!-- content -->
    <q-linear-progress v-if="loading" indeterminate />
    <q-dialog v-model="confirmDeleteReview">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="ion-trash" color="negative" text-color="white" />
          <span class="q-ml-sm">
            {{
              $t('editRestaurant.review.confirmDeleteRestaurant') +
                ' ' +
                deletionReview.nickName
            }}
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
          <q-btn
            flat
            :label="$t('delete')"
            @click="deleteReview(deletionReview)"
            color="negative"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-card>
      <q-table
        :title="$t('editRestaurant.review.pageTitle')"
        :data="getReviewGetter"
        :columns="columns"
        row-key="nickname"
        :filter="filter"
        separator="cell"
        wrap-cells
        :dense="$q.screen.lt.md"
        binary-state-sort
        class="review-table"
      >
        <template v-slot:top-right>
          <q-input
            outlined
            dense
            debounce="300"
            color="primary"
            v-model="filter"
            :placeholder="$t('search')"
            class="q-mr-lg"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body-cell-action="props">
          <q-td :props="props" style="width: 5em">
            <q-item class="q-pa-none">
              <q-item-section>
                <q-btn
                  dense
                  flat
                  color="negative"
                  icon="ion-trash"
                  @click="
                    onDeleteReview(props.row.user.nickName, props.row.reviewId)
                  "
                />
              </q-item-section>
            </q-item>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'edit-restaurant-review',
  data() {
    return {
      loading: false,
      filter: '',
      columns: [
        {
          name: 'action',
          align: 'left',
          label: this.$t('editRestaurant.review.actionHeader'),
          classes: 'bg-grey-2',
          field: 'rate',
        },
        {
          name: 'nickname',
          required: true,
          label: this.$t('editRestaurant.review.nicknameHeader'),
          align: 'left',
          field: (row) => row.user.nickName,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'rate',
          align: 'left',
          label: this.$t('editRestaurant.review.rateHeader'),
          field: 'rate',
          sortable: true,
        },
        {
          name: 'comment',
          align: 'left',
          label: this.$t('editRestaurant.review.commentHeader'),
          field: 'comment',
          sortable: true,
        },
        {
          name: 'updatedAt',
          align: 'left',
          label: this.$t('editRestaurant.review.updatedAtHeader'),
          field: (row) => new Date(row.updatedAt),
          format: (val) =>
            `${val.toLocaleDateString('ja')} ${val.toLocaleTimeString('ja')}`,
          sortable: true,
          sort: (a, b) => b - a,
        },
      ],
      confirmDeleteReview: false,
      deletionReview: { nickName: '', reviewId: '' },
    };
  },
  computed: {
    ...mapGetters('restaurant', ['getRestaurantInfoGetter', 'getReviewGetter']),
  },
  methods: {
    ...mapActions('restaurant', [
      'apiFetchRestaurantReviewAction',
      'apiDeleteRestaurantReviewAction',
    ]),

    onDeleteReview(nickName, reviewId) {
      this.deletionReview = { nickName, reviewId };
      this.confirmDeleteReview = true;
    },
    async deleteReview(deletionReview) {
      this.confirmDeleteReview = false;
      this.loading = true;

      // Call API Delete Restaurant Review
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { reviewId: deletionReview.reviewId };
      const result = await this.apiDeleteRestaurantReviewAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Delete success
        this.fetchRestaurantReview().then(() => {
          this.$q.notify({
            message: this.$t(
              'api.editRestaurant.deleteRestaurantReviewSuccess'
            ),
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
              message: this.$t(
                'api.editRestaurant.deleteRestaurantReviewFailed'
              ),
              color: 'deep-orange-4',
            });

        this.loading = false;
      }
    },
    async fetchRestaurantReview() {
      this.loading = true;

      // Call API fetch Restaurant Review
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { restaurantId: this.$route.params.id };
      // TODO: need to apply pagination for performance when fetch data
      const pager = { limit: 1000000, pageNum: 1 };
      const result = await this.apiFetchRestaurantReviewAction({
        apolloClient,
        input,
        pager,
      });

      if (result.requestResolved) {
        // Fetch success
        this.loading = false;
      } else {
        result.systemError
          ? // Fetch failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Fetch failed, got something wrong with user
            this.$q.notify({
              message: this.$t(
                'api.editRestaurant.fetchRestaurantReviewFailed'
              ),
              color: 'deep-orange-4',
            });

        this.loading = false;
      }
    },
  },
  created() {},
};
</script>

<style lang="stylus">
.review-table
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: $orange-1
</style>
