<template>
  <q-page padding>
    <!-- content -->
    <q-linear-progress v-if="loading" indeterminate />
    <q-dialog v-model="openSendDialog">
      <q-card class="full-width">
        <q-card-section>
          <div class="text-h6">
            {{ $t('notification.sendTitle') }}
          </div>
        </q-card-section>

        <q-card-section>
          <q-input
            outlined
            :label="$t('notification.sendText')"
            autofocus
            autogrow
            v-model="newMessage.message"
            @blur="validateInput(newMessage.message, 'message')"
            :error="errors.newMessage.message"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            :label="$t('cancel')"
            @click="onClearInput()"
            v-close-popup
          />
          <q-btn
            :label="$t('send')"
            type="submit"
            color="primary"
            icon-right="send"
            @click="sendNewNotification()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="openConfirmDelete">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="ion-trash" color="negative" text-color="white" />
          <span class="q-ml-sm">
            {{ $t('notification.confirmDeleteNotification') }}
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
          <q-btn
            flat
            :label="$t('delete')"
            color="negative"
            @click="deleteSelectedNotification()"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-table
      :title="$t('notification.pageTitle')"
      :data="getNotificationGetter"
      :columns="columns"
      row-key="adminNotifyId"
      :filter="filter"
      separator="cell"
      wrap-cells
      :dense="$q.screen.lt.md"
      binary-state-sort
      selection="multiple"
      :selected.sync="selected"
      class="notification-table"
    >
      <template v-if="selected.length !== 0" v-slot:top-left>
        <q-btn
          flat
          round
          dense
          icon="ion-trash"
          color="negative"
          @click="openConfirmDelete = true"
        />
      </template>
      <template v-slot:top-right class="row justify-around">
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

        <q-btn
          :label="$t('notification.sendBtn')"
          type="submit"
          color="primary"
          icon-right="send"
          @click="onCreateNotification()"
        />
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'notification',
  data() {
    return {
      loading: false,
      errors: {
        newMessage: { message: false },
      },
      newMessage: { message: '' },
      openConfirmDelete: false,
      openSendDialog: false,
      filter: '',
      selected: [],
      columns: [
        {
          name: 'adminNotifyId',
          required: true,
          label: this.$t('notification.idTableHeader'),
          align: 'center',
          field: 'adminNotifyId',
          sortable: true,
        },
        {
          name: 'notifyMessage',
          align: 'center',
          label: this.$t('notification.messageTableHeader'),
          field: 'notifyMessage',
          sortable: true,
        },
        {
          name: 'createdAt',
          required: true,
          align: 'center',
          label: this.$t('notification.createdAtTableHeader'),
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
    ...mapGetters('notification', ['getNotificationGetter']),
  },
  methods: {
    ...mapActions('notification', [
      'apiFetchAdminNotificationAction',
      'apiCreateAdminNotificationAction',
      'apiDeleteAdminNotificationAction',
    ]),

    validateInput(value, type) {
      switch (type) {
        case 'message':
          this.errors.newMessage.message = value === '';
          break;
        default:
          break;
      }
    },
    onClearInput() {
      this.errors.newMessage = { message: false };
      this.newMessage = { message: '' };
    },
    onCreateNotification() {
      this.errors.newMessage = { message: false };
      this.openSendDialog = true;
    },
    async sendNewNotification() {
      this.openSendDialog = false;
      this.loading = true;

      if (this.errors.newMessage.message) {
        this.loading = false;
        this.openSendDialog = true;
      } else {
        // Call API Create Admin Notification
        const apolloClient = this.$apollo.provider.defaultClient;
        const input = {
          notifyMessage: this.newMessage.message,
          notifySystemType: 'ADMIN',
        };
        const result = await this.apiCreateAdminNotificationAction({
          apolloClient,
          input,
        });

        if (result.requestResolved) {
          // Create success
          this.fetchAdminNotification().then(() => {
            this.$q.notify({
              message: this.$t('api.createAdminNotificationSuccess'),
              color: 'green-5',
            });

            this.newMessage = { message: '' };
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
                message: this.$t('api.createAdminNotificationFailed'),
                color: 'deep-orange-4',
              });

          this.loading = false;
        }
      }
    },
    async deleteSelectedNotification() {
      this.loading = true;

      // Call API Delete Admin Notification
      // Loop to delete all selected notifications
      const apolloClient = this.$apollo.provider.defaultClient;
      let result = null;
      for (let i = this.selected.length - 1; i >= 0; i--) {
        const input = { adminNotifyId: this.selected[i].adminNotifyId };
        result = await this.apiDeleteAdminNotificationAction({
          apolloClient,
          input,
        });

        if (result.requestResolved === false) {
          // Break the loop if we got something wrong
          break;
        }
      }

      if (result.requestResolved) {
        // Delete success
        this.fetchAdminNotification().then(() => {
          this.$q.notify({
            message: this.$t('api.deleteAdminNotificationSuccess'),
            color: 'green-5',
          });
          this.selected = [];
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
              message: this.$t('api.createAdminNotificationFailed'),
              color: 'deep-orange-4',
            });

        this.fetchAdminNotification().then(() => {
          this.selected = [];
          this.loading = false;
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
  created() {},
};
</script>

<style lang="stylus">
.notification-table
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: $orange-1
</style>
