<template>
  <q-page padding>
    <!-- content -->
    <q-linear-progress v-if="loading" indeterminate />
    <q-card>
      <q-item>
        <q-item-section class="text-h6">{{
          $t('editUser.userSetting.pageTitle')
        }}</q-item-section>
      </q-item>
      <q-separator />
      <q-item class="q-pa-md q-gutter-sm">
        <q-item-section class="q-gutter-sm" v-if="activeUser">
          <q-radio dense v-model="setting" val="lifetime">
            {{ (label = $t('editUser.userSetting.makeForever')) }}
          </q-radio>
          <q-radio dense v-model="setting" val="fee">
            {{ (label = $t('editUser.userSetting.payPeriod')) }}
          </q-radio>
        </q-item-section>
      </q-item>
      <q-list v-if="setting === 'fee'">
        <q-item>
          <q-item-section>
            <q-input
              v-if="!getUserPaymentInfoGetter.userId"
              outlined
              dense
              readonly
              :error="errors.createUser.startDate"
              @click="displayCreateUserPayment = true"
              :value="
                createUser.startDate
                  ? new Date(createUser.startDate).toLocaleDateString('ja', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })
                  : null
              "
              debounce="650"
              :label="$t('editUser.userSetting.startDate')"
              class="q-py-sm"
            >
              <template v-slot:prepend>
                <q-icon name="event" @click="displayCreateUserPayment = true">
                  <q-dialog v-model="displayCreateUserPayment">
                    <v-datepicker
                      placeholder="Select Date"
                      :inline="true"
                      v-model="createUser.startDate"
                      @selected="displayCreateUserPayment = false"
                    />
                  </q-dialog>
                </q-icon>
              </template>
            </q-input>
            <q-input
              v-else
              outlined
              dense
              readonly
              @click="displayCreateUserPayment = true"
              :value="
                getUserPaymentInfoGetter.startDate
                  ? new Date(
                      getUserPaymentInfoGetter.startDate
                    ).toLocaleDateString('ja', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })
                  : null
              "
              debounce="650"
              :label="$t('editUser.userSetting.startDate')"
              class="q-py-sm"
            >
              <template v-slot:prepend>
                <q-icon name="event" @click="displayCreateUserPayment = true">
                  <q-dialog v-model="displayCreateUserPayment">
                    <v-datepicker
                      placeholder="Select Date"
                      :inline="true"
                      v-model="getUserPaymentInfoGetter.startDate"
                      @selected="displayCreateUserPayment = false"
                    />
                  </q-dialog>
                </q-icon>
              </template>
            </q-input>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              v-if="!getUserPaymentInfoGetter.userId"
              outlined
              dense
              readonly
              :error="errors.createUser.endDate"
              @click="displayUpdateUserPayment = true"
              :value="
                createUser.endDate
                  ? new Date(createUser.endDate).toLocaleDateString('ja', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })
                  : null
              "
              debounce="650"
              :label="$t('editUser.userSetting.endDate')"
              class="q-py-sm"
            >
              <template v-slot:prepend>
                <q-icon name="event" @click="displayUpdateUserPayment = true">
                  <q-dialog v-model="displayUpdateUserPayment">
                    <v-datepicker
                      placeholder="Select Date"
                      :inline="true"
                      v-model="createUser.endDate"
                      @selected="displayUpdateUserPayment = false"
                    />
                  </q-dialog>
                </q-icon>
              </template>
            </q-input>
            <q-input
              v-else
              outlined
              dense
              readonly
              @click="displayUpdateUserPayment = true"
              :value="
                getUserPaymentInfoGetter.endDate
                  ? new Date(
                      getUserPaymentInfoGetter.endDate
                    ).toLocaleDateString('ja', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })
                  : null
              "
              debounce="650"
              :label="$t('editUser.userSetting.endDate')"
              class="q-py-sm"
            >
              <template v-slot:prepend>
                <q-icon name="event" @click="displayUpdateUserPayment = true">
                  <q-dialog v-model="displayUpdateUserPayment">
                    <v-datepicker
                      placeholder="Select Date"
                      :inline="true"
                      v-model="getUserPaymentInfoGetter.endDate"
                      @selected="displayUpdateUserPayment = false"
                    />
                  </q-dialog>
                </q-icon>
              </template>
            </q-input>
          </q-item-section>
        </q-item>
      </q-list>
      <q-item class="full-width" v-if="setting === 'lifetime'">
        <q-item-section class="full-width">
          <q-btn
            icon="ion-save"
            :label="$t('editUser.userSetting.saveBtn')"
            color="primary"
            class="full-width"
            @click="createUserLifetime.submitAction"
          />
        </q-item-section>
      </q-item>
      <q-item class="full-width" v-else>
        <q-item-section class="full-width">
          <q-btn
            v-if="!getUserPaymentInfoGetter.userId"
            icon="ion-save"
            :label="$t('editUser.userSetting.saveBtn')"
            color="primary"
            class="full-width"
            @click="createUser.submitAction"
          />
          <q-btn
            v-else
            icon="ion-save"
            :label="$t('editUser.userSetting.saveBtn')"
            color="primary"
            class="full-width"
            @click="updateUser.submitAction"
          />
        </q-item-section>
      </q-item>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Datepicker from 'vuejs-datepicker/dist/vuejs-datepicker.esm.js';
import * as lang from 'vuejs-datepicker/dist/locale';

export default {
  name: 'edit-user-profile',
  components: {
    'v-datepicker': Datepicker,
  },
  data() {
    return {
      loading: false,
      displayCreateUserPayment: false,
      displayUpdateUserPayment: false,
      languages: lang,
      setting: 'lifetime',
      errors: {
        createUser: {
          startDate: false,
          endDate: false,
        },
        updateUser: {
          startDate: false,
          endDate: false,
        },
      },
      createUser: {
        startDate: null,
        endDate: null,
        submitAction: () => this.createUserPayment(),
      },
      updateUser: {
        startDate: null,
        endDate: null,
        submitAction: () => this.updateUserPayment(),
      },
      createUserLifetime: {
        submitAction: () => this.createUserPaymentLifeTime(),
      },
    };
  },
  computed: {
    ...mapGetters('user', ['getUserPaymentInfoGetter']),
    activeUser() {
      if (this.getUserPaymentInfoGetter.typePaymentRegister === 'CUSTOM') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return (this.setting = 'fee');
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.setting = 'lifetime');
    },
  },
  methods: {
    ...mapActions('user', [
      'apiCreateUserPaymentAction',
      'apiUpdateUserPaymentAction',
      'apiCreateUserPaymentLifeTimeAction',
      'apiFetchUserPaymentInfoAction',
    ]),
    async createUserPayment() {
      this.loading = true;
      this.$q.loading.show();
      // Call API create new Restaurant Staff
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { userId: this.$route.params.id, ...this.createUser };
      const result = await this.apiCreateUserPaymentAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Create success
        this.fetchUserPayment().then(() => {
          this.$q.notify({
            message: this.$t('api.editUser.createUserPaymentPeriodSuccess'),
            color: 'green-5',
          });
          this.loading = false;
          this.$q.loading.hide();
        });
      } else {
        result.systemError
          ? // Create failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Create failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.editUser.createUserPaymentPeriodFailed'),
              color: 'deep-orange-4',
            });

        this.loading = false;
        this.$q.loading.hide();
      }
      //}
    },
    async updateUserPayment() {
      this.loading = true;
      // Call API create new Restaurant Staff
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = {
        userId: this.$route.params.id,
        ...this.getUserPaymentInfoGetter,
      };
      const result = await this.apiCreateUserPaymentAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Create success
        this.fetchUserPayment().then(() => {
          this.$q.notify({
            message: this.$t('api.editUser.updateUserPaymentSuccess'),
            color: 'green-5',
          });
          this.loading = false;
          this.$q.loading.hide();
        });
      } else {
        result.systemError
          ? // Create failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Create failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.editUser.createUserPaymentFailed'),
              color: 'deep-orange-4',
            });

        this.loading = false;
        this.$q.loading.hide();
      }
    },
    async createUserPaymentLifeTime() {
      this.loading = true;
      // Call API create user payment lifetime
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { userId: this.$route.params.id };
      const result = await this.apiCreateUserPaymentLifeTimeAction({
        apolloClient,
        input,
      });

      // Create success
      if (result.requestResolved) {
        this.fetchUserPayment().then(() => {
          this.$q.notify({
            message: this.$t('api.editUser.createUserPaymentForeverSuccess'),
            color: 'green-5',
          });
          this.loading = false;
          this.$q.loading.hide();
        });
      } else {
        result.systemError
          ? // Create failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Create failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.editUser.createUserPaymentForeverFailed'),
              color: 'deep-orange-4',
            });

        this.loading = false;
        this.$q.loading.hide();
      }
    },
    async fetchUserPayment() {
      // Call API fetch User Master Data
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { userId: this.$route.params.id };
      const result = await this.apiFetchUserPaymentInfoAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Fetch success
      } else {
        result.systemError
          ? // Fetch failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Fetch failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.editUser.fetchUserPaymentInfoFailed'),
              color: 'deep-orange-4',
            });
      }
    },
  },
  created() {},
};
</script>

<style lang="stylus"></style>
