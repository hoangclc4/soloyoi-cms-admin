<template>
  <q-page padding>
    <!-- content -->
    <q-linear-progress v-if="loading" indeterminate />
    <q-card>
      <q-expansion-item
        expand-separator
        switch-toggle-side
        default-opened
        icon="ion-lock"
        :label="$t('setting.changePasswordTitle')"
      >
        <q-item>
          <q-item-section>
            <q-input
              v-model="form.oldPassword"
              @keyup.enter="submit"
              :error="$v.form.oldPassword.$error"
              @blur="$v.form.oldPassword.$touch"
              :type="isOldPassword ? 'password' : 'text'"
              dense
              outlined
              :label="$t('setting.oldPassword')"
            >
              <template v-slot:append>
                <q-icon
                  :name="isOldPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isOldPassword = !isOldPassword"
                />
              </template>
            </q-input>
            <q-input
              v-model="form.newPassword"
              @keyup.enter="submit"
              :error="$v.form.newPassword.$error"
              @blur="$v.form.newPassword.$touch"
              :type="isNewPassword ? 'password' : 'text'"
              dense
              outlined
              :label="$t('setting.newPassword')"
            >
              <template v-slot:append>
                <q-icon
                  :name="isNewPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isNewPassword = !isNewPassword"
                />
              </template>
            </q-input>
            <q-input
              v-model="form.confirmPassword"
              @keyup.enter="submit"
              :error="$v.form.confirmPassword.$error"
              @blur="$v.form.confirmPassword.$touch"
              :type="isConfirmPassword ? 'password' : 'text'"
              dense
              outlined
              :label="$t('setting.confirmPassword')"
            >
              <template v-slot:append>
                <q-icon
                  :name="isConfirmPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isConfirmPassword = !isConfirmPassword"
                />
              </template>
            </q-input>
            <q-btn
              icon="ion-save"
              :label="$t('setting.saveChangedPasswordBtn')"
              color="primary"
              class="full-width"
              @click="submit"
            />
          </q-item-section>
        </q-item>
      </q-expansion-item>
    </q-card>
  </q-page>
</template>

<script>
import { required, sameAs, minLength } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
export default {
  name: 'setting',
  data() {
    return {
      loading: false,
      isOldPassword: true,
      isNewPassword: true,
      isConfirmPassword: true,
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
    };
  },
  validations: {
    form: {
      oldPassword: { required },
      newPassword: { required, minLength: minLength(8) },
      confirmPassword: { required, sameAsNewPassword: sameAs('newPassword') },
    },
  },
  computed: {},
  methods: {
    ...mapActions('setting', ['apiUpdatePasswordAdminAction']),

    submit() {
      this.loading = true;
      this.$v.form.$touch();

      if (this.$v.form.$error) {
        this.loading = false;
        this.$q.notify({
          message: this.$t('reviewFieldAgain'),
          color: 'teal-8',
        });
      } else {
        this.saveChangedPassword(this.form.oldPassword, this.form.newPassword);
      }
    },
    async saveChangedPassword(oldPassword, newPassword) {
      // Call API update Password Restaurant
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { oldPassword, newPassword };
      const result = await this.apiUpdatePasswordAdminAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Update success
        this.$q.notify({
          message: this.$t('api.updateAdminPasswordSuccess'),
          color: 'green-5',
        });
        this.loading = false;

        // TODO: temporarily requires login again, to improve later
        this.$router.push({ name: 'login' });
      } else {
        result.systemError
          ? // Update failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Update failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.updateAdminPasswordFailed'),
              color: 'deep-orange-4',
            });

        this.loading = false;
      }
    },
  },
};
</script>

<style lang="stylus"></style>
