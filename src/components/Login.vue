<template>
  <div class="container">
    <!--vertical align on parent using my-auto, horizontal align on self mx-auto-->
    <div class="row h-100">
      <div class="col-sm-12 my-auto">
        <div class="card card-block w-50 mx-auto">
          <div class="card-body">
            <!--Header-->
            <div class="form-header winter-neva-gradient rounded">
              <h3 class="my-3">
                Sign in
              </h3>
            </div>

            <div v-if="loading" class="container-loading">
              <img src="@/assets/images/loading.gif" alt="Loading Icon">
            </div>
            <p v-if="loginError">{{ loginError }}</p>
            <p v-if="loginSuccessful">Login Successful</p>

            <form @submit.prevent="loginSubmit">

              <!--Default input username-->
              <label class="grey-text font-weight-light text-left">Username</label>
              <input type="text" class="form-control" placeholder="username" v-model="username" required/>
              <br />
              <!--Default input password-->
              <label class="grey-text font-weight-light text-left">Password</label>
              <input type="password" class="form-control" placeholder="password" v-model="password" required/>

              <div class="text-center mt-4">
                <button class="btn winter-neva-gradient btn-rounded waves-effect waves-light font-weight-bold btn-padding" type="submit">Login</button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ADMIN_LOGIN } from './../graphql/mutations/adminLogin'
import { ADMIN_AUTH_TOKEN } from '@/assets/resources/scripts/serviceConst';
import router from '@/router'

export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      loginError: null,
      loginSuccessful: false,
      username: '',
      password: ''
    }
  },
  created () {
    const routes = router.options.routes;
    this.homePage = routes.filter(route => route.name === 'Home')[0]
    Object.assign(this.homePage, {props: true});
  },
  methods: {
    async loginSubmit () {
      this.loading = true
      const adminLoginResponse = await this.$apollo.mutate({
        mutation: ADMIN_LOGIN,
        variables: {
          input: {
            username: this.username,
            password: this.password
          }
        },
      });
      const error = adminLoginResponse.data.result.error
      const response = adminLoginResponse.data.result.response
      this.loginSuccessful = error.requestResolved

      if (error.requestResolved) {
        this.loginError = null
        localStorage.setItem(ADMIN_AUTH_TOKEN, response.token);
        this.$router.push(this.homePage);
      } else {
        this.loginError = error.message
      }

      this.loading = false
    }
  }
}
</script>
