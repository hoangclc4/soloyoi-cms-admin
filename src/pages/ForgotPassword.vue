<template>
  <q-page padding class="row justify-center content-center bg-auth">
    <q-card style="width: 25em;" class="no-shadow text-grey-1 transparent">
      <q-card-section class="row justify-center q-mb-lg">
        <q-img
          src="https://www.foodconnection.jp/wp-content/themes/foodconnection/shared/img/shared/logo.png"
          alt="FOODCONNECTION LOGO"
          transition="slide-down"
          spinner-color="transparent"
        />
      </q-card-section>
      <q-card-section class="justify-center text-center text-uppercase text-h5">
        {{ $t('headerTitle') }}
      </q-card-section>
      <q-card-section>
        <q-input
          outlined
          color="primary"
          bg-color="grey-1"
          v-model="form.username"
          :label="$t('auth.username')"
          @blur="$v.form.username.$touch"
          @keyup.enter="submit"
          :error="$v.form.username.$error"
          type="username"
          :float-label="$t('auth.username')"
          autofocus
        />
        <q-input
          outlined
          color="primary"
          bg-color="grey-1"
          v-model="form.password"
          label="Password"
          @blur="$v.form.password.$touch"
          @keyup.enter="submit"
          :error="$v.form.password.$error"
          type="password"
          float-label="Password"
        />
      </q-card-section>
      <q-card-section class="row justify-center">
        <q-btn
          style="background: goldenrod; color: white; width: 50%"
          :ripple="{ center: true }"
          :label="$t('auth.login')"
          @click="submit"
        />
      </q-card-section>
      <!-- <q-card-section class="row justify-around">
        <q-checkbox
          v-model="form.rememberMe"
          :label="$t('auth.rememberMe')"
          keep-color
          color="primary"
        />
        <q-item to="forgot-password" class="text-decoration-underline">
          <q-item-section class="text-body2">
            {{ $t('auth.forgotPassword') }}
          </q-item-section>
        </q-item>
      </q-card-section> -->
    </q-card>
  </q-page>
</template>

<script>
import { ADMIN_LOGIN } from './../graphql/mutations/adminLogin';
import { required } from 'vuelidate/lib/validators';
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      name: 'login',
      form: {
        username: '',
        password: '',
        // rememberMe: true,
      },
    };
  },
  computed: {
    ...mapGetters('auth', ['getCurrentUserGetter']),
  },
  validations: {
    form: {
      username: { required },
      password: { required },
    },
  },
  methods: {
    ...mapActions('auth', ['saveCurrentUserAction']),

    submit() {
      this.$q.loading.show();
      this.$v.form.$touch();

      if (this.$v.form.$error) {
        this.$q.loading.hide();
        this.$q.notify(this.$t('auth.reviewFieldAgain'));
      } else {
        this.doLogin(this.form.username, this.form.password);
      }
    },
    async doLogin(username, password) {
      const apolloCl = this.$apollo.provider.defaultClient;
      await apolloCl
        .mutate({
          mutation: ADMIN_LOGIN,
          variables: {
            input: { password: password, username: username },
          },
        })
        .then((response) => {
          // Login Success
          if (response.data.result.error.requestResolved === true) {
            this.$q.loading.hide();
            this.saveCurrentUserAction(response);
            this.$router.push({ path: '/' });
          }
          // Login Failed
          else {
            this.$q.notify(this.$t('auth.wrongLogin'));
            this.$q.loading.hide();
          }
        })
        .catch((error) => {
          this.$q.notify(error);
          this.$q.loading.hide();
        });
    },
  },
};
</script>

<style></style>
