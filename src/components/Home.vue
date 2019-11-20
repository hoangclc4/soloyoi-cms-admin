<template>
  <mdb-container>
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
            <mdb-nav-item waves-fixed>Notification</mdb-nav-item>
            <mdb-nav-item waves-fixed>Master</mdb-nav-item>
          </mdb-navbar-nav>
          <mdb-btn color="success" @click.native="showModal = true">LOGOUT</mdb-btn>
          <mdb-modal :show="showModal" @close="showModal = false">
            <mdb-modal-header>
              <mdb-modal-title>Logout</mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body>Are you sure you want to log out?</mdb-modal-body>
            <div v-if="loading" class="container-loading">
              <img src="@/assets/images/loading.gif" alt="Loading Icon">
            </div>
            <mdb-modal-footer>
              <mdb-btn color="success" v-on:click="logout">Logout</mdb-btn>
              <mdb-btn color="gray" @click.native="showModal = false">Cancle</mdb-btn>
            </mdb-modal-footer>
          </mdb-modal>
        </mdb-navbar-toggler>
      </mdb-navbar>
    </mdb-container>
  </mdb-container>
</template>

<script>
import { ADMIN_LOGOUT } from './../graphql/mutations/adminLogout';
import { ADMIN_AUTH_TOKEN } from '@/assets/resources/scripts/serviceConst';

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
  mdbModalFooter
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
    mdbModalFooter
  },
  data () {
    return {
      loading: false,
      showModal: false,
    }
  },
  created () {
    const routes = router.options.routes;
    this.loginPage = routes.filter(route => route.name === 'Login')[0]
    Object.assign(this.loginPage, {props: true});
  },
  methods: {
    async logout () {
      this.loading = true
      const adminLogoutResponse = await this.$apollo.mutate({
        mutation: ADMIN_LOGOUT
      });
      const error = adminLogoutResponse.data.result;
      this.logoutSuccessful = error.requestResolved

      if (error.requestResolved) {
        localStorage.removeItem(ADMIN_AUTH_TOKEN);
        this.$router.replace(this.loginPage);
      } else {
        alert('error.message');
      }

      this.loading = false
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
