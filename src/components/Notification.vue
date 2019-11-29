<template>
  <mdb-container class="mt-5">
    <mdb-navbar dark color="stylish" scrolling>
      <mdb-navbar-brand tag="a" href="#/home">
        CMS ADMIN
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav left>
          <mdb-nav-item waves-fixed v-on:click="homeTab()">Home</mdb-nav-item>
          <mdb-nav-item waves-fixed v-on:click="homeTab()">Restaurant</mdb-nav-item>
          <mdb-nav-item waves-fixed v-on:click="homeTab()">User</mdb-nav-item>
          <mdb-nav-item waves-fixed>Notification</mdb-nav-item>
          <mdb-nav-item waves-fixed v-on:click="homeTab()">Master</mdb-nav-item>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <section>
      <section>
        <mdb-btn class="new-notify" color="default" @click.native="create=true">NEW <mdb-icon icon="plus" class="ml-1"/></mdb-btn>
        <mdb-modal :show="create" @close="create = false">
          <mdb-modal-header class="text-center">
            <mdb-modal-title tag="h4" bold class="w-100">New notification</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body class="mx-3 grey-text">
            <mdb-input label="Notification message" type="text" class="mb-5" v-model="notifyMessage" required/>
            <mdb-input label="Notification link" type="text" v-model="notifyLink" required/>
          </mdb-modal-body>
          <mdb-modal-footer center>
            <mdb-btn @click.native="create = false" color="default" v-on:click="createNotification">Create</mdb-btn>
          </mdb-modal-footer>
        </mdb-modal>
      </section>
      <section>
        <section>
          <mdb-datatable :data="data" striped bordered :pagination="false" focus @selectRow="notiDetail(data.rows[$event])"/>
        </section>
      </section>
      <mdb-modal :show="detail" @close="detail = false">
        <mdb-modal-header class="text-center">
          <mdb-modal-title tag="h4" bold class="w-100">Notification Detail</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body class="mx-3 grey-text">
          <mdb-input label="Notification message" type="text" class="mb-5" v-model="notifyMessageEdit" required/>
          <mdb-input label="Notification link" type="text" v-model="notifyLinkEdit" required/>
        </mdb-modal-body>
        <mdb-modal-footer center>
          <mdb-btn @click.native="detail = false" color="default" v-on:click="updateNotification()">Update</mdb-btn>
          <mdb-btn @click.native="detail = false" color="red" v-on:click="deleteNotification">Delete</mdb-btn>
          <mdb-btn @click.native="detail = false" color="gray">Cancel</mdb-btn>
        </mdb-modal-footer>
      </mdb-modal>
    </section>
  </mdb-container>
</template>

<script>
import { NOTIFICATION_ADMIN_LIST } from './../graphql/queries/notificationAdminList';
import { CREATE_NOTIFICATION_ADMIN } from './../graphql/mutations/createNotificationAdmin';
import { UPDATE_NOTIFICATION_ADMIN } from './../graphql/mutations/updateNotificationAdmin';
import { DELETE_NOTIFICATION_ADMIN } from './../graphql/mutations/deleteNotificationAdmin';
import router from '@/router'

import {
  mdbNavbar,
  mdbBtn,
  mdbNavItem,
  mdbNavbarNav,
  mdbNavbarToggler,
  mdbContainer,
  mdbNavbarBrand,
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbDatatable,
  mdbIcon,
  mdbInput,
} from "mdbvue";

const getAllNoti = async (apollo) => {
  return await apollo.query({
    query: NOTIFICATION_ADMIN_LIST,
    variables: {
      pager: {
        limit: 1000,
        pageNum: 1
      }
    }
  })
};

const mutationAPI = async (apollo, api, variables ) => {
  const { data } = await apollo.mutate({
    mutation: api,
    variables
  })
  if (data.result.requestResolved) {
    window.location.reload();
  } else {
    alert(createResponse.data.result.message);
  }
};

export default {
  name: "Home",
  components: {
    mdbNavbar,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbContainer,
    mdbNavbarBrand,
    mdbBtn,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbDatatable,
    mdbIcon,
    mdbInput,
  },
  data () {
    return {
      showModal: false,
      columns: [],
      rows: [],
      create: false,
      detail: false,
      notifyMessage: '',
      notifyLink: '',
      notifyMessageEdit: '',
      notifyLinkEdit: '',
      adminNotifyId: null
    }
  },
  async created () {
    const routes = router.options.routes;
    this.homePage = routes.filter(route => route.name === 'Home')[0];
    Object.assign(this.homePage, {props: true});
  },
  computed: {
    data() {
      return {
        columns: this.columns,
        rows: this.rows
      };
    },
  },
  async mounted() {
    const columns = [
      {
        label: "ID",
        field: "adminNotifyId",
      },
      {
        label: "Message",
        field: "notifyMessage",
      },
      {
        label: "Link",
        field: "notifyLink",
      },
      {
        label: "Date",
        field: "createdAt",
      }
    ]
    this.columns = columns;
    const { data } = await getAllNoti(this.$apollo);
    const list = data.result.response.notificationAdmins;
    list.map( i => {
      this.rows.push(i);
    })
  },
  methods: {
    async homeTab () {
      this.$router.push(this.homePage);
    },
    async notiDetail(detail) {
      this.detail = true;
      this.notifyMessageEdit = detail.notifyMessage;
      this.notifyLinkEdit = detail.notifyLink;
      this.adminNotifyId = detail.adminNotifyId;
    },
    async createNotification () {
      const input = {
        notifyMessage: this.notifyMessage,
        notifyLink: this.notifyLink
      };
      await mutationAPI(this.$apollo, CREATE_NOTIFICATION_ADMIN, { input });
    },
    async updateNotification() {
      const input = {
        notifyMessage: this.notifyMessageEdit,
        notifyLink: this.notifyLinkEdit,
        adminNotifyId: this.adminNotifyId
      };
      await mutationAPI(this.$apollo, UPDATE_NOTIFICATION_ADMIN, { input });
    },
    async deleteNotification() {
      const input = {
        adminNotifyId: this.adminNotifyId
      }
      await mutationAPI(this.$apollo, DELETE_NOTIFICATION_ADMIN, { input });
    }
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h4 {
  font-weight: bold;
}

.custom-section {
  min-height: 90vh;
}
.new-notify {
  margin: 20px;
  float: left;
}
</style>
