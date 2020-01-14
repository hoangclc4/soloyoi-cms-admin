<template>
  <q-page padding class="row justify-center content-center bg-auth">
    <q-card style="width: 25em;" class="no-shadow text-grey-1 transparent">
      <q-card-section class="row justify-center q-mb-lg">
        <q-img
          src="statics/logo.png"
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
          :label="$t('auth.password')"
          @blur="$v.form.password.$touch"
          @keyup.enter="submit"
          :error="$v.form.password.$error"
          type="password"
          :float-label="$t('auth.password')"
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
    </q-card>
  </q-page>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      name: 'login',
      form: {
        username: '',
        password: '',
      },
    };
  },
  computed: {},
  validations: {
    form: {
      username: { required },
      password: { required },
    },
  },
  methods: {
    ...mapActions('auth', ['apiLoginAction']),
    ...mapActions('common', ['clearDataAction']),

    submit() {
      this.$q.loading.show();
      this.$v.form.$touch();

      if (this.$v.form.$error) {
        this.$q.loading.hide();
        this.$q.notify({
          message: this.$t('reviewFieldAgain'),
          color: 'teal-8',
        });
      } else {
        this.login(this.form.username, this.form.password);
      }
    },
    async login(username, password) {
      // Call API Login
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { username, password };
      const result = await this.apiLoginAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Login success
        this.$q.loading.hide();
        this.$router.push({ path: '/' });
      } else {
        result.systemError
          ? // Login failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Login failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.loginFailed'),
              color: 'deep-orange-4',
            });

        this.$q.loading.hide();
      }
    },
  },
  created() {
    // Clear all state action
    this.clearDataAction();
  },
};
</script>

<style lang="stylus"></style>
