<template>
  <q-page padding>
    <!-- content -->
    <q-linear-progress v-if="loading" indeterminate />
    <coming-soon-dialog v-model="comingSoon" />
    <q-dialog v-model="openCreateRestaurant">
      <q-card class="full-width">
        <q-card-section>
          <div class="text-h6">
            {{ $t('restaurant.createNewRestaurant') }}
          </div>
        </q-card-section>

        <q-card-section>
          <q-input
            outlined
            :label="$t('restaurant.newRestaurantName')"
            autofocus
            v-model="newRestaurant.name"
            @blur="
              () => {
                errors.newRestaurant.name = newRestaurant.name.trim() === '';
              }
            "
            :error="errors.newRestaurant.name"
          />
          <q-input
            outlined
            :label="$t('restaurant.newEmail')"
            v-model="newRestaurant.email"
            @blur="
              () => {
                errors.newRestaurant.email = newRestaurant.email.trim() === '';
              }
            "
            :error="errors.newRestaurant.email"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            :label="$t('cancel')"
            @click="onClearInput()"
            v-close-popup
          />
          <q-btn
            :label="$t('create')"
            type="submit"
            color="primary"
            icon-right="ion-checkmark-circle"
            @click="createNewRestaurant()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="welcomeNewRestaurant">
      <q-card class="full-width">
        <q-card-section>
          <div class="text-h6">
            {{ $t('restaurant.successToCreateNewRestaurant') }}
          </div>
        </q-card-section>

        <q-card-section>
          <q-input
            outlined
            readonly
            :label="$t('restaurant.newUsername')"
            v-model="getCreatedRestaurantGetter.username"
          />
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            readonly
            :type="isNewRestaurantPassword ? 'password' : 'text'"
            :label="$t('restaurant.newPassword')"
            v-model="getCreatedRestaurantGetter.password"
          >
            <template v-slot:append>
              <q-icon
                :name="
                  isNewRestaurantPassword ? 'visibility_off' : 'visibility'
                "
                class="cursor-pointer"
                @click="isNewRestaurantPassword = !isNewRestaurantPassword"
              />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            readonly
            :label="$t('restaurant.newRestaurantName')"
            v-model="getCreatedRestaurantGetter.name"
          />
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            readonly
            :label="$t('restaurant.newEmail')"
            v-model="getCreatedRestaurantGetter.email"
          />
        </q-card-section>

        <q-card-actions align="center" class="text-primary">
          <q-btn
            :label="$t('restaurant.goToEditRestaurant')"
            type="submit"
            color="primary"
            icon-right="ion-arrow-forward"
            :to="{
              name: 'edit-restaurant-information',
              params: { id: getCreatedRestaurantGetter.restaurantId },
            }"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmDeleteRestaurant">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="ion-trash" color="negative" text-color="white" />
          <span class="q-ml-sm">
            {{ $t('restaurant.confirmDeleteRestaurant') }}
          </span>
        </q-card-section>
        <q-card-section class="text-center text-weight-bold q-pa-none">
          {{ deletionRestaurant.name }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
          <q-btn
            flat
            :label="$t('delete')"
            @click="deleteRestaurant()"
            color="negative"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-table
      :title="$t('restaurant.pageTitle')"
      :data="getRestaurantListGetter"
      :columns="columns"
      row-key="id"
      :filter="filter"
      separator="cell"
      wrap-cells
      :dense="$q.screen.lt.md"
      binary-state-sort
      class="full-width item-table"
    >
      <template v-slot:top-right>
        <q-btn
          v-if="getCreatedRestaurantGetter.username"
          color="secondary"
          :label="$t('restaurant.showLatestCreatedRestaurant')"
          @click="welcomeNewRestaurant = true"
        />
        <q-input
          outlined
          dense
          color="primary"
          v-model="filter"
          :placeholder="$t('search')"
          class="q-mx-lg"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          color="primary"
          :label="$t('restaurant.createNewRestaurant')"
          @click="onCreateRestaurant()"
        />
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props" auto-width>
          <q-item class="q-pa-none">
            <q-item-section>
              <q-btn
                dense
                flat
                color="secondary"
                icon="ion-create"
                @click="onEditRestaurant(props.row.restaurantId)"
              />
            </q-item-section>
            <q-item-section>
              <q-btn
                dense
                flat
                color="negative"
                icon="ion-trash"
                @click="
                  onDeleteRestaurant(props.row.name, props.row.restaurantId)
                "
              />
            </q-item-section>
          </q-item>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ComingSoonDialog from '../components/ComingSoonDialog';

export default {
  name: 'restaurant',
  components: {
    'coming-soon-dialog': ComingSoonDialog,
  },
  data() {
    return {
      comingSoon: false,
      loading: false,
      errors: {
        newRestaurant: { name: false, email: false },
      },
      openCreateRestaurant: false,
      newRestaurant: { name: '', email: '' },
      welcomeNewRestaurant: false,
      isNewRestaurantPassword: true,
      confirmDeleteRestaurant: false,
      deletionRestaurant: { name: '', id: '' },
      filter: '',
      columns: [
        {
          name: 'action',
          align: 'left',
          label: this.$t('restaurant.actionHeader'),
          classes: 'bg-grey-2',
          field: 'isVip',
        },
        {
          name: 'role',
          required: true,
          align: 'left',
          label: this.$t('restaurant.roleHeader'),
          field: 'isVip',
          format: (val) => {
            return val
              ? `${this.$t('premiumMember')}`
              : `${this.$t('freeMember')}`;
          },
          sortable: true,
        },
        {
          name: 'name',
          align: 'left',
          label: this.$t('restaurant.nameHeader'),
          field: 'name',
          sortable: true,
        },
        {
          name: 'address',
          align: 'left',
          label: this.$t('restaurant.addressHeader'),
          field: 'address',
          format: (val) => (val === 'none' ? '' : val),
          sortable: true,
        },
        {
          name: 'phone',
          align: 'left',
          label: this.$t('restaurant.phoneHeader'),
          field: 'phone',
          sortable: true,
        },
        {
          name: 'email',
          align: 'left',
          label: this.$t('restaurant.emailHeader'),
          field: 'email',
          sortable: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters('restaurant', [
      'getRestaurantListGetter',
      'getCreatedRestaurantGetter',
    ]),
  },
  methods: {
    ...mapActions('restaurant', [
      'apiFetchRestaurantAction',
      'apiCreateRestaurantAction',
      'apiDeleteRestaurantAction',
    ]),

    onClearInput() {
      this.newRestaurant = { name: '', email: '' };
    },
    onCreateRestaurant() {
      this.errors.newRestaurant = { name: false, email: false };
      this.onClearInput();
      this.openCreateRestaurant = true;
    },
    onSuccessToCreateRestaurant() {
      this.welcomeNewRestaurant = true;
    },
    onDeleteRestaurant(name, id) {
      this.deletionRestaurant = { name, id };
      this.confirmDeleteRestaurant = true;
    },
    onEditRestaurant(id) {
      this.$router.push({
        name: 'edit-restaurant',
        params: { id },
      });
    },
    async createNewRestaurant() {
      this.openCreateRestaurant = false;
      this.loading = true;

      this.newRestaurant.name = await this.newRestaurant.name.trim();
      this.newRestaurant.email = await this.newRestaurant.email.trim();

      this.errors.newRestaurant.name = this.newRestaurant.name === '';
      this.errors.newRestaurant.email = this.newRestaurant.email === '';

      const gotError =
        (await Object.values(this.errors.newRestaurant).filter(
          (isInvalid) => isInvalid
        ).length) !== 0;

      if (gotError) {
        this.loading = false;
        this.openCreateRestaurant = true;
      } else {
        // Call API Create Restaurant
        const apolloClient = this.$apollo.provider.defaultClient;
        const input = this.newRestaurant;
        const result = await this.apiCreateRestaurantAction({
          apolloClient,
          input,
        });

        if (result.requestResolved) {
          // Create success
          this.$q.notify({
            message: this.$t('api.createRestaurantSuccess'),
            color: 'green-5',
          });
          this.loading = false;
          this.onSuccessToCreateRestaurant();
        } else {
          result.systemError
            ? // Create failed, got something wrong with system
              this.$q.notify({
                message: `${result.systemError}`,
                color: 'deep-orange-4',
              })
            : // Create failed, got something wrong with user
              this.$q.notify({
                message: this.$t('api.createRestaurantFailed'),
                color: 'deep-orange-4',
              });

          this.loading = false;
        }
      }
    },
    async deleteRestaurant() {
      this.confirmDeleteRestaurant = false;
      this.loading = true;

      // Call API Delete Restaurant
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { restaurantId: this.deletionRestaurant.id };
      const result = await this.apiDeleteRestaurantAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Delete success
        this.$q.notify({
          message: this.$t('api.deleteRestaurantSuccess'),
          color: 'green-5',
        });
        this.loading = false;
      } else {
        result.systemError
          ? // Delete failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Delete failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.deleteRestaurantFailed'),
              color: 'deep-orange-4',
            });

        this.loading = false;
      }
    },
  },
  created() {},
};
</script>

<style lang="stylus">
.item-table
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: $orange-1
</style>
