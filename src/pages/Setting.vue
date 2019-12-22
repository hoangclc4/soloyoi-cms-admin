<template>
  <q-page padding>
    <!-- content -->
    {{ $t('comingSoon') }}
  </q-page>
</template>

<script>
export default {
  name: 'notifications',
  data() {
    return {
      openDialog: false,
      notification: {
        message: '',
        link: '',
      },
      loading: false,
      filter: '',
      rowCount: 10,
      columns: [
        {
          name: 'id',
          required: true,
          label: this.$t('notifications.idTableHeader'),
          align: 'center',
          field: (row) => row.id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'message',
          align: 'center',
          label: this.$t('notifications.messageTableHeader'),
          field: 'message',
          sortable: true,
        },
        {
          name: 'link',
          align: 'center',
          label: this.$t('notifications.linkTableHeader'),
          field: 'link',
          sortable: true,
        },
        {
          name: 'date',
          required: true,
          align: 'center',
          label: this.$t('notifications.dateTableHeader'),
          field: 'date',
          format: (val) => `${val.toLocaleDateString('ja')}`,
          sortable: true,
          sort: (a, b) => b - a,
        },
      ],
      data: this.getNotification(),
    };
  },
  methods: {
    getNotification() {
      let listNotification = [];
      for (let i = 0; i < 100; i++) {
        const message =
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
        listNotification.push({
          id: Math.round(Math.random(10) * 10000000),
          message,
          link: message,
          date: new Date(
            new Date(2012, 0, 1).getTime() +
              Math.random() *
                (new Date().getTime() - new Date(2012, 0, 1).getTime())
          ),
        });
      }

      return listNotification;
    },
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
