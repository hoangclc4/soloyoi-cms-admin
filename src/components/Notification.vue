<template>
  <mdb-container class="mt-5">
    <mdb-navbar dark color="stylish" scrolling>
      <mdb-navbar-brand tag="a" href="#/home">
        CMS ADMIN
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav left>
          <mdb-nav-item waves-fixed v-on:click="seenHome = true; homeTab()">Home</mdb-nav-item>
          <mdb-nav-item waves-fixed>Restaurant</mdb-nav-item>
          <mdb-nav-item waves-fixed>User</mdb-nav-item>
          <mdb-nav-item waves-fixed>Notification</mdb-nav-item>
          <mdb-nav-item waves-fixed>Master</mdb-nav-item>
        </mdb-navbar-nav>
        <mdb-btn color="success" @click.native="showModal = true">LOGOUT</mdb-btn>
        <mdb-modal :show="showModal" @close="showModal = false">
          <mdb-modal-header>
            <mdb-modal-title>Logout</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body>Are you sure you want to log out?</mdb-modal-body>
          <mdb-modal-footer>
            <mdb-btn color="success" v-on:click="logout">Logout</mdb-btn>
            <mdb-btn color="secondary" @click.native="showModal = false">Cancle</mdb-btn>
          </mdb-modal-footer>
        </mdb-modal>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <section>
      <mdb-btn color="default" @click.native="create=true">NEW <mdb-icon icon="plus" class="ml-1"/></mdb-btn>
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
      <section>
        <mdb-datatable :data="dataNotify" striped bordered responsive focus @selectRow="notiDetail(dataNotify.rows[$event])"/>
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
          <mdb-btn @click.native="detail = false" color="default" v-on:click="updateNotification">Update</mdb-btn>
          <mdb-btn @click.native="detail = false" color="red" v-on:click="deleteNotification">Delete</mdb-btn>
          <mdb-btn @click.native="detail = false" color="gray">Cancle</mdb-btn>
        </mdb-modal-footer>
      </mdb-modal>
    </section>
  </mdb-container>
</template>

<script>
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
      dataNotify: null,
      create: false,
      detail: false,
      notifyMessage: '',
      notifyLink: '',
      notifyMessageEdit: '',
      notifyLinkEdit: '',
      adminNotifyId: null
    }
  },
  created () {
    const routes = router.options.routes;
    this.homePage = routes.filter(route => route.name === 'Home')[0]
    Object.assign(this.homePage, {props: true});
    this.loginPage = routes.filter(route => route.name === 'Login')[0]
    Object.assign(this.loginPage, {props: true});
    // TODO: API get All Notification
    const dataNotify = {
      columns: [
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
      ],
      rows: [{
        adminNotifyId: 1,
        notifyMessage: "Notification message 1 Notification message 1 Notification message 1 Notification message 1",
        notifyLink: "Notification link 1 Notification link 1 Notification link 1 Notification link 1 Notification link 1",
        createdAt: new Date()
      },
      {
        adminNotifyId: 2,
        notifyMessage: "Notification message 2",
        notifyLink: "Notification link 2",
        createdAt: new Date()
      },
      {
        adminNotifyId: 3,
        notifyMessage: "Notification message 3",
        notifyLink: "Notification link 3",
        createdAt: new Date()
      },
      {
        adminNotifyId: 4,
        notifyMessage: "Notification message 4",
        notifyLink: "Notification link 4",
        createdAt: new Date()
      },
      {
        adminNotifyId: 5,
        notifyMessage: "Notification message 5",
        notifyLink: "Notification link 5",
        createdAt: new Date()
      }]
    };
    this.dataNotify = dataNotify;
  },

  methods: {
    async logout () {
      // TODO: API logout, clear token localStorage, ...
      this.$router.push(this.loginPage);
    },
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
      // TODO: Add API create Notification
      this.dataNotify.rows.push({...input, createdAt: new Date()});
    },
    async updateNotification() {
      const input = {
        notifyMessage: this.notifyMessageEdit,
        notifyLink: this.notifyLinkEdit,
        adminNotifyId: this.adminNotifyId
      };
      // TODO: Add API Update Notification
    },
    async deleteNotification() {
      const input = {
        adminNotifyId: this.adminNotifyId
      }
      // TODO: Add API delete Notification
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
</style>
