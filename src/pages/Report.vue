<template>
  <q-page padding>
    <!-- content -->
    <q-linear-progress v-if="loading" indeterminate />
    <q-dialog v-model="confirmDeleteUserReport">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="ion-trash" color="negative" text-color="white" />
          <span class="q-ml-sm"></span>
        </q-card-section>
        <q-card-section class="text-center text-weight-bold q-pa-none">
          {{ $t('report.confirmDelete') }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
          <q-btn
            flat
            :label="$t('delete')"
            @click="deleteUserReport()"
            color="negative"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmDeleteRestaurantReport">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="ion-trash" color="negative" text-color="white" />
          <span class="q-ml-sm"></span>
        </q-card-section>
        <q-card-section class="text-center text-weight-bold q-pa-none">
          {{ $t('report.confirmDelete') }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
          <q-btn
            flat
            :label="$t('delete')"
            @click="deleteRestaurantReport()"
            color="negative"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmDeleteNewsfeedReport">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="ion-trash" color="negative" text-color="white" />
          <span class="q-ml-sm"></span>
        </q-card-section>
        <q-card-section class="text-center text-weight-bold q-pa-none">
          {{ $t('report.confirmDelete') }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
          <q-btn
            flat
            :label="$t('delete')"
            @click="deleteNewsfeedReport()"
            color="negative"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmUpdateUserReport">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="ion-trash" color="negative" text-color="white" />
          <span class="q-ml-sm"></span>
        </q-card-section>
        <q-card-section class="text-center text-weight-bold q-pa-none">
          {{ $t('report.confirmApproval') }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
          <q-btn
            flat
            :label="$t('delete')"
            @click="updateUserReport()"
            color="negative"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmUpdateRestaurantReport">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="ion-trash" color="negative" text-color="white" />
          <span class="q-ml-sm"></span>
        </q-card-section>
        <q-card-section class="text-center text-weight-bold q-pa-none">
          {{ $t('report.confirmApproval') }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
          <q-btn
            flat
            :label="$t('delete')"
            @click="updateRestaurantReport()"
            color="negative"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmUpdateNewsfeedReport">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="ion-trash" color="negative" text-color="white" />
          <span class="q-ml-sm"></span>
        </q-card-section>
        <q-card-section class="text-center text-weight-bold q-pa-none">
          {{ $t('report.confirmApproval') }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
          <q-btn
            flat
            :label="$t('delete')"
            @click="updateNewsfeedReport()"
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
        <q-tab name="user-reported" :label="$t('navigation.userReported')" />
        <q-tab
          name="restaurant-reported"
          :label="$t('navigation.restaurantReported')"
        />
        <q-tab
          name="newsfeed-reported"
          :label="$t('navigation.newsfeedReported')"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="user-reported">
          <q-table
            :title="$t('report.pageTitle')"
            :data="getUserReportedListGetter"
            :columns="columnsUser"
            row-key="id"
            separator="cell"
            wrap-cells
            :dense="$q.screen.lt.md"
            binary-state-sort
            class="full-width item-table"
          >
            <template v-slot:body-cell-action="props">
              <q-td :props="props" style="width: 8em">
                <q-item class="q-pa-none">
                  <q-item-section>
                    <q-btn
                      dense
                      flat
                      color="secondary"
                      icon="ion-create"
                      @click="
                        onUpdateUserReport(
                          props.row.reporter.userId,
                          props.row.user.userId
                        )
                      "
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-btn
                      dense
                      flat
                      color="negative"
                      icon="ion-trash"
                      @click="
                        onDeleteUserReport(
                          props.row.user.facebookFullName,
                          props.row.reporter.userId,
                          props.row.user.userId
                        )
                      "
                    />
                  </q-item-section>
                </q-item>
              </q-td>
            </template>
          </q-table>
        </q-tab-panel>
        <q-tab-panel name="restaurant-reported">
          <q-table
            :title="$t('report.pageTitle')"
            :data="getRestaurantReportedListGetter"
            :columns="columnsRes"
            row-key="id"
            separator="cell"
            wrap-cells
            :dense="$q.screen.lt.md"
            binary-state-sort
            class="full-width item-table"
          >
            <template v-slot:body-cell-action="props">
              <q-td :props="props" style="width: 8em">
                <q-item class="q-pa-none">
                  <q-item-section>
                    <q-btn
                      dense
                      flat
                      color="secondary"
                      icon="ion-create"
                      @click="
                        onUpdateRestaurantReport(
                          props.row.reporter.userId,
                          props.row.restaurant.restaurantId
                        )
                      "
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-btn
                      dense
                      flat
                      color="negative"
                      icon="ion-trash"
                      @click="
                        onDeleteRestaurantReport(
                          props.row.reporter.userId,
                          props.row.restaurant.restaurantId
                        )
                      "
                    />
                  </q-item-section>
                </q-item>
              </q-td>
            </template>
          </q-table>
        </q-tab-panel>
        <q-tab-panel name="newsfeed-reported">
          <q-table
            :title="$t('report.pageTitle')"
            :data="getNewsfeedReportedListGetter"
            :columns="columnsNewsFeed"
            row-key="id"
            separator="cell"
            wrap-cells
            :dense="$q.screen.lt.md"
            binary-state-sort
            class="full-width item-table"
          >
            <template v-slot:body-cell-action="props">
              <q-td :props="props" style="width: 8em">
                <q-item class="q-pa-none">
                  <q-item-section>
                    <q-btn
                      dense
                      flat
                      color="secondary"
                      icon="ion-create"
                      @click="
                        onUpdateNewsfeedReport(
                          props.row.reporter.userId,
                          props.row.newsFeed.newsFeedId
                        )
                      "
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-btn
                      dense
                      flat
                      color="negative"
                      icon="ion-trash"
                      @click="
                        onDeleteNewsfeedReport(
                          props.row.reporter.userId,
                          props.row.newsFeed.newsFeedId
                        )
                      "
                    />
                  </q-item-section>
                </q-item>
              </q-td>
            </template>
          </q-table>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'report',
  data() {
    return {
      loading: false,
      tab: 'user-reported',
      columnsUser: [
        {
          name: 'action',
          align: 'left',
          label: this.$t('report.actionHeader'),
          classes: 'bg-grey-2',
          field: 'isVip',
        },
        {
          name: 'reporterId',
          align: 'left',
          label: this.$t('report.reporterId'),
          field: (row) =>
            row.reporter
              ? row.reporter.nickName
                ? row.reporter.nickName
                : row.reporter.facebookFullName
              : null,
          sortable: true,
        },
        {
          name: 'userId',
          align: 'left',
          label: this.$t('report.userId'),
          field: (row) =>
            row.user
              ? row.user.nickName
                ? row.user.nickName
                : row.user.facebookFullName
              : null,
          sortable: true,
        },
        {
          name: 'reason',
          align: 'left',
          label: this.$t('report.reason'),
          field: 'reason',
          sortable: true,
        },
        {
          name: 'createdAt',
          align: 'left',
          label: this.$t('report.createdAt'),
          field: 'createdAt',
          sortable: true,
        },
      ],
      columnsRes: [
        {
          name: 'action',
          align: 'left',
          label: this.$t('report.actionHeader'),
          classes: 'bg-grey-2',
          field: 'isVip',
        },
        {
          name: 'reporterId',
          align: 'left',
          label: this.$t('report.reporterId'),
          field: (row) =>
            row.reporter
              ? row.reporter.nickName
                ? row.reporter.nickName
                : row.reporter.facebookFullName
              : null,
          sortable: true,
        },
        {
          name: 'restaurantId',
          align: 'left',
          label: this.$t('report.restaurantId'),
          field: (row) => (row.restaurant ? row.restaurant.name : null),
          sortable: true,
        },
        {
          name: 'reason',
          align: 'left',
          label: this.$t('report.reason'),
          field: 'reason',
          sortable: true,
        },
        {
          name: 'createdAt',
          align: 'left',
          label: this.$t('report.createdAt'),
          field: 'createdAt',
          sortable: true,
        },
      ],
      columnsNewsFeed: [
        {
          name: 'action',
          align: 'left',
          label: this.$t('report.actionHeader'),
          classes: 'bg-grey-2',
          field: 'isVip',
        },
        {
          name: 'reporterId',
          align: 'left',
          label: this.$t('report.reporterId'),
          field: (row) =>
            row.reporter
              ? row.reporter.nickName
                ? row.reporter.nickName
                : row.reporter.facebookFullName
              : null,
          sortable: true,
        },
        {
          name: 'newsFeedId',
          align: 'left',
          label: this.$t('report.conntentNewsFeed'),
          field: (row) => (row.newsFeed ? row.newsFeed.description : null),
          sortable: true,
        },
        {
          name: 'userId',
          align: 'left',
          label: this.$t('report.newsFeedByUser'),
          field: (row) =>
            row.user
              ? row.user.nickName
                ? row.user.nickName
                : row.user.facebookFullName
              : null,
          sortable: true,
        },
        {
          name: 'restaurantId',
          align: 'left',
          label: this.$t('report.newsFeedByRestaurant'),
          field: (row) => (row.restaurant ? row.restaurant.name : null),
          sortable: true,
        },
        {
          name: 'reason',
          align: 'left',
          label: this.$t('report.reason'),
          field: 'reason',
          sortable: true,
        },
      ],
      confirmDeleteUserReport: false,
      confirmDeleteRestaurantReport: false,
      confirmDeleteNewsfeedReport: false,
      confirmUpdateUserReport: false,
      confirmUpdateRestaurantReport: false,
      confirmUpdateNewsfeedReport: false,
      deletionUserReport: { name: '', reporterId: '', userId: '' },
      deletionRestaurantReport: { reporterId: '', restaurantId: '' },
      deletionNewsfeedReport: { reporterId: '', newsFeedId: '' },
      updationUserReport: { reporterId: '', userId: '' },
      updationRestaurantReport: { reporterId: '', restaurantId: '' },
      updationNewsfeedReport: { reporterId: '', newsFeedId: '' },
    };
  },
  computed: {
    ...mapGetters('report', [
      'getUserReportedListGetter',
      'getRestaurantReportedListGetter',
      'getNewsfeedReportedListGetter',
    ]),
  },
  methods: {
    ...mapActions('report', [
      'apiFetchUserReportedAction',
      'apiFetchRestaurantReportedAction',
      'apiFetchNewsFeedReportedAction',
      'apiDeleteUserReportedAction',
      'apiDeleteRestaurantReportedAction',
      'apiDeleteNewsFeedReportedAction',
      'apiUpdateUserReportedAction',
      'apiUpdateRestaurantReportedAction',
      'apiUpdateNewsfeedReportedAction',
    ]),
    onDeleteUserReport(name, reporterId, userId) {
      this.deletionUserReport = { name, reporterId, userId };
      this.confirmDeleteUserReport = true;
    },
    onDeleteRestaurantReport(reporterId, restaurantId) {
      this.deletionRestaurantReport = { reporterId, restaurantId };
      this.confirmDeleteRestaurantReport = true;
    },
    onDeleteNewsfeedReport(reporterId, newsFeedId) {
      this.deletionNewsfeedReport = { reporterId, newsFeedId };
      this.confirmDeleteNewsfeedReport = true;
    },
    onUpdateUserReport(reporterId, userId) {
      this.updationUserReport = { reporterId, userId };
      this.confirmUpdateUserReport = true;
    },
    onUpdateRestaurantReport(reporterId, restaurantId) {
      this.updationRestaurantReport = { reporterId, restaurantId };
      this.confirmUpdateRestaurantReport = true;
    },
    onUpdateNewsfeedReport(reporterId, newsFeedId) {
      this.updationNewsfeedReport = { reporterId, newsFeedId };
      this.confirmUpdateNewsfeedReport = true;
    },
    async deleteUserReport() {
      this.confirmDeleteUserReport = false;
      this.loading = true;

      // Call API Delete Restaurant
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = {
        reporterId: this.deletionUserReport.reporterId,
        userId: this.deletionUserReport.userId,
      };
      const result = await this.apiDeleteUserReportedAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Delete success
        this.$q.notify({
          message: this.$t('api.deleteUserReportedSuccess'),
          color: 'green-5',
        });
        this.loading = false;
      } else {
        result.systemError
          ? // Delete failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Delete failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.deleteUserReportedFailed'),
              color: 'deep-orange-4',
            });

        this.loading = false;
      }
    },
    async deleteRestaurantReport() {
      this.confirmDeleteRestaurantReport = false;
      this.loading = true;

      // Call API Delete Restaurant reported
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = {
        reporterId: this.deletionRestaurantReport.reporterId,
        restaurantId: this.deletionRestaurantReport.restaurantId,
      };
      const result = await this.apiDeleteRestaurantReportedAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Delete success
        this.$q.notify({
          message: this.$t('api.deleteRestaurantReportedSuccess'),
          color: 'green-5',
        });
        this.loading = false;
      } else {
        result.systemError
          ? // Delete failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Delete failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.deleteRestaurantReportedFailed'),
              color: 'deep-orange-4',
            });

        this.loading = false;
      }
    },
    async deleteNewsfeedReport() {
      this.confirmDeleteNewsfeedReport = false;
      this.loading = true;

      // Call API Delete Restaurant reported
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = {
        reporterId: this.deletionNewsfeedReport.reporterId,
        newsFeedId: this.deletionNewsfeedReport.newsFeedId,
      };
      const result = await this.apiDeleteNewsFeedReportedAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Delete success
        this.$q.notify({
          message: this.$t('api.deleteNewsfeedReportedSuccess'),
          color: 'green-5',
        });
        this.loading = false;
      } else {
        result.systemError
          ? // Delete failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Delete failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.deleteNewsfeedReportedFailed'),
              color: 'deep-orange-4',
            });

        this.loading = false;
      }
    },
    async updateUserReport() {
      this.confirmUpdateUserReport = false;
      this.loading = true;

      // Call API Delete Restaurant
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = {
        reporterId: this.updationUserReport.reporterId,
        userId: this.updationUserReport.userId,
      };
      const result = await this.apiUpdateUserReportedAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Update success
        this.$q.notify({
          message: this.$t('api.updateUserReportedSuccess'),
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
              message: this.$t('api.updateUserReportedFailed'),
              color: 'deep-orange-4',
            });

        this.loading = false;
      }
    },
    async updateRestaurantReport() {
      this.confirmUpdateRestaurantReport = false;
      this.loading = true;

      // Call API Delete Restaurant
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = {
        reporterId: this.updationRestaurantReport.reporterId,
        restaurantId: this.updationRestaurantReport.restaurantId,
      };
      const result = await this.apiUpdateRestaurantReportedAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Update success
        this.$q.notify({
          message: this.$t('api.updateRestaurantReportedSuccess'),
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
              message: this.$t('api.updateRestaurantReportedFailed'),
              color: 'deep-orange-4',
            });

        this.loading = false;
      }
    },
    async updateNewsfeedReport() {
      this.confirmUpdateNewsfeedReport = false;
      this.loading = true;

      // Call API Delete Restaurant
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = {
        reporterId: this.updationNewsfeedReport.reporterId,
        newsFeedId: this.updationNewsfeedReport.newsFeedId,
      };
      const result = await this.apiUpdateNewsfeedReportedAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Update success
        this.$q.notify({
          message: this.$t('api.updateNewsfeedReportedSuccess'),
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
              message: this.$t('api.updateNewsfeedReportedFailed'),
              color: 'deep-orange-4',
            });

        this.loading = false;
      }
    },
    // add more
    async fetchUserReportedList() {
      // Call API fetch user reported list
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { userReportType: 'USER' };
      // TODO: need to apply pagination for performance when fetch data
      const pager = { limit: 1000000, pageNum: 1 };
      const result = await this.apiFetchUserReportedAction({
        apolloClient,
        input,
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
              message: this.$t('api.fetchUserReportedListFailed'),
              color: 'deep-orange-4',
            });
      }
    },
    async fetchRestaurantReportedList() {
      // Call API fetch restaurant reported list
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { userReportType: 'RESTAURANT' };
      // TODO: need to apply pagination for performance when fetch data
      const pager = { limit: 1000000, pageNum: 1 };
      const result = await this.apiFetchRestaurantReportedAction({
        apolloClient,
        input,
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
              message: this.$t('api.fetchRestaurantReportedListFailed'),
              color: 'deep-orange-4',
            });
      }
    },
    async fetchNewsFeedReportedList() {
      // Call API fetch newsfeed reported list
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { userReportType: 'NEWSFEED' };
      // TODO: need to apply pagination for performance when fetch data
      const pager = { limit: 1000000, pageNum: 1 };
      const result = await this.apiFetchNewsFeedReportedAction({
        apolloClient,
        input,
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
              message: this.$t('api.fetchNewsFeedReportedListFailed'),
              color: 'deep-orange-4',
            });
      }
    },
  },
  created() {
    this.$q.loading.show({ message: this.$t('pleaseWaitABit') });
    this.loading = true;
    Promise.all([
      this.fetchUserReportedList(),
      this.fetchRestaurantReportedList(),
      this.fetchNewsFeedReportedList(),
    ]).then(() => {
      this.$q.loading.hide();
      this.loading = false;
    });
  },
};
</script>

<style></style>
