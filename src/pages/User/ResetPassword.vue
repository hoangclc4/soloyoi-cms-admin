<template>
  <q-page padding class="row justify-center content-center bg-user">
    <q-card style="width: 25em;" class="no-shadow transparent">
      <q-card-section class="row justify-center q-mb-lg">
        <img
          src="statics/img/logo.png"
          alt="SOLOYOI LOGO"
          style="height: 8em"
        />
      </q-card-section>
      <q-card-section class="justify-center text-center text-uppercase text-h5">
        {{ $t('reset.resetPasswordTitle') }}
      </q-card-section>
      <q-card-section>
        {{ $t('reset.resetPasswordContent1') }}
      </q-card-section>
      <q-card-section>
        {{ $t('reset.resetPasswordContent2') }}
      </q-card-section>
      <q-card-section>
        <q-input
          :label="$t('reset.newPassword')"
          v-model="form.newPassword"
          @keyup.enter="submit"
          :error="$v.form.newPassword.$error"
          @blur="$v.form.newPassword.$touch"
          type="password"
          dense
          outlined
        />
        <q-input
          :label="$t('reset.confirmPassword')"
          v-model="form.confirmPassword"
          @keyup.enter="submit"
          :error="$v.form.confirmPassword.$error"
          @blur="$v.form.confirmPassword.$touch"
          type="password"
          dense
          outlined
        />
      </q-card-section>
      <q-card-section class="row justify-center">
        <q-btn
          :label="$t('reset.btnReset')"
          color="primary"
          class="form-submit"
          @click="submit"
          style="background: #2ba0c3 !important"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { required, sameAs, minLength } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      loading: false,
      isNewPassword: true,
      isConfirmPassword: true,
      form: {
        newPassword: '',
        confirmPassword: '',
      },
    };
  },
  validations: {
    form: {
      newPassword: { required, minLength: minLength(8) },
      confirmPassword: { required, sameAsNewPassword: sameAs('newPassword') },
    },
  },
  methods: {
    ...mapActions('auth', ['apiResetPasswordUserAction']),

    submit() {
      this.loading = true;
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        this.loading = false;
        this.$q.notify({
          message: this.$t('reviewFieldAgain'),
          color: 'deep-orange-4',
        });
      } else {
        this.saveResetPassword(this.form.newPassword);
      }
    },
    async saveResetPassword(newPassword) {
      // Call API reset Password User
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { newPassword, token: this.$route.query.token };
      const result = await this.apiResetPasswordUserAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Reset success
        this.$q.notify({
          message: this.$t('api.resetPasswordUserSuccess'),
          color: 'green-5',
        });
        this.loading = false;
        this.$router.push({ path: '/user/reset-password/success' });
      } else {
        result.systemError
          ? // Reset failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Reset failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.resetPasswordUserFailed'),
              color: 'deep-orange-4',
            });

        this.loading = false;
      }
    },
  },
};
</script>

<style lang="stylus"></style>
