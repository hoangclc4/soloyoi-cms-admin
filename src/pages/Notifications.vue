<template>
  <q-page padding>
    <!-- content -->
    <div class="q-pa-md">
      <q-dialog v-model="openConfirmDelete">
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="ion-trash" color="negative" text-color="white" />
            <span class="q-ml-sm">
              {{ $t('notifications.confirmDeleteNotification') }}
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
        :title="$t('notifications.pageTitle')"
        :data="getNotificationsGetter"
        :columns="columns"
        row-key="adminNotifyId"
        :filter="filter"
        :loading="loadingTable"
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
            :label="$t('notifications.sendBtn')"
            type="submit"
            color="primary"
            icon-right="send"
            @click="openSendDialog = true"
          />

          <q-dialog v-model="openSendDialog">
            <q-card style="min-width: 50%">
              <q-card-section>
                <div class="text-h6">
                  {{ $t('notifications.sendTitle') }}
                </div>
              </q-card-section>

              <q-card-section>
                <q-input
                  :label="$t('notifications.sendText')"
                  autofocus
                  filled
                  autogrow
                  v-model="newMessage.message"
                  class="q-my-md"
                />
                <q-input
                  :label="$t('notifications.sendLink')"
                  filled
                  v-model="newMessage.link"
                  class="q-my-md"
                />
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn
                  flat
                  :label="$t('cancel')"
                  @click="newMessage = { message: '', link: '' }"
                  v-close-popup
                />
                <q-btn
                  :label="$t('send')"
                  type="submit"
                  color="primary"
                  icon-right="send"
                  @click="sendNewNotification()"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { NOTIFICATION_ADMIN_LIST } from './../graphql/queries/notificationAdminList';
import { CREATE_NOTIFICATION_ADMIN } from './../graphql/mutations/createNotificationAdmin';
import { DELETE_NOTIFICATION_ADMIN } from './../graphql/mutations/deleteNotificationAdmin';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'notifications',
  data() {
    return {
      selected: [],
      openConfirmDelete: false,
      openSendDialog: false,
      newMessage: { message: '', link: '' },
      loadingTable: false,
      filter: '',
      columns: [
        {
          name: 'adminNotifyId',
          required: true,
          label: this.$t('notifications.idTableHeader'),
          align: 'center',
          field: 'adminNotifyId',
          sortable: true,
        },
        {
          name: 'notifyMessage',
          align: 'center',
          label: this.$t('notifications.messageTableHeader'),
          field: 'notifyMessage',
          sortable: true,
        },
        {
          name: 'notifyLink',
          align: 'center',
          label: this.$t('notifications.linkTableHeader'),
          field: 'notifyLink',
          sortable: true,
        },
        {
          name: 'createdAt',
          required: true,
          align: 'center',
          label: this.$t('notifications.createdAtTableHeader'),
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
    ...mapGetters('notifications', ['getNotificationsGetter']),
  },
  methods: {
    ...mapActions('notifications', ['saveNotificationsAction']),

    async sendNewNotification() {
      this.loadingTable = true;

      // Call API send new notification
      const apolloCl = this.$apollo.provider.defaultClient;
      await apolloCl
        .mutate({
          mutation: CREATE_NOTIFICATION_ADMIN,
          variables: {
            input: {
              notifyMessage: this.newMessage.message,
              notifyLink: this.newMessage.link,
            },
          },
        })
        .then((response) => {
          // Send New Notifications Success
          if (response.data.result.requestResolved === true) {
            this.fetchNotifications();

            this.newMessage = { message: '', link: '' };
            this.loadingTable = false;
          }
          // Send New Notifications Failed
          else {
            this.loadingTable = false;
            this.$q.notify(this.$t('notifications.fetchNotificationsFailed'));
          }
        })
        .catch((error) => {
          this.loadingTable = false;
          this.$q.notify(error);
        });
    },
    async deleteSelectedNotification() {
      this.loadingTable = true;
      const apolloCl = this.$apollo.provider.defaultClient;

      for (let i = this.selected.length - 1; i >= 0; i--) {
        // Call API delete selected notification
        await apolloCl
          .mutate({
            mutation: DELETE_NOTIFICATION_ADMIN,
            variables: {
              input: {
                adminNotifyId: this.selected[i].adminNotifyId,
              },
            },
          })
          .then((response) => {
            // Delete Notifications Failed
            if (response.data.result.requestResolved !== true) {
              throw new Error(response.data.result.message);
            }
          })
          .catch((error) => {
            this.loadingTable = false;
            this.$q.notify(this.$t('notifications.fetchNotificationsFailed'));
            this.$q.notify(error);
          });
      }

      this.selected = [];

      this.fetchNotifications();

      this.loadingTable = false;
    },
    async fetchNotifications() {
      this.loadingTable = true;

      // Call API fetch Notification
      const apolloCl = this.$apollo.provider.defaultClient;
      await apolloCl
        .query({
          query: NOTIFICATION_ADMIN_LIST,
          variables: {
            pager: {
              limit: 1000000,
              pageNum: 1,
            },
          },
        })
        .then((response) => {
          // Sync Notifications Success
          if (response.data.result.error === null) {
            // Save notification state
            this.saveNotificationsAction(response);

            this.loadingTable = false;
          }
          // Sync Notifications Failed
          else {
            this.loadingTable = false;
            this.$q.notify(this.$t('notifications.getNotificationsFailed'));
          }
        })
        .catch((error) => {
          this.loadingTable = false;
          this.$q.notify(error);
        });
    },
  },
  created() {
    this.fetchNotifications();
  },
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
