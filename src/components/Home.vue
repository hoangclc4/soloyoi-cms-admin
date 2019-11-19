<template>
  <mdb-container class="mt-5">
    <mdb-navbar dark color="stylish" scrolling>
      <mdb-navbar-brand tag="a" href="#/home">
        CMS ADMIN
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav left>
          <mdb-nav-item waves-fixed>Home</mdb-nav-item>
          <mdb-nav-item waves-fixed>Restaurant</mdb-nav-item>
          <mdb-nav-item waves-fixed>User</mdb-nav-item>
          <mdb-nav-item waves-fixed v-on:click="notificationTab()">Notification</mdb-nav-item>
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
      <section>
        Home
      </section>
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
      showModal: false
    }
  },
  created () {
    const routes = router.options.routes;
    this.notificationTab = routes.filter(route => route.name === 'Notification Tab')[0]
    Object.assign(this.notificationTab, {props: true});
  },
  methods: {
    async logout () {
      // TODO: API logout, clear token localStorage, ...
      this.$router.push(this.loginPage);
    },
    async notificationTab () {
      this.$router.push(this.notificationTab);
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
