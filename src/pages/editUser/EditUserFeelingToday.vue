<template>
  <q-page padding>
    <!-- content -->
    <q-linear-progress v-if="loading" indeterminate />
    <q-card>
      <q-item>
        <q-item-section class="text-h6">
          {{ $t('editUser.feelingToday.pageTitle') }}
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input
            readonly
            outlined
            :value="getUserInfoGetter.myFeeling.drinkingArea"
            :label="$t('editUser.feelingToday.drinkingArea')"
            dense
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input
            readonly
            outlined
            :value="getUserInfoGetter.myFeeling.todayComment"
            :label="$t('editUser.feelingToday.todayComment')"
            dense
          />
        </q-item-section>
      </q-item>
      <q-item
        v-if="
          getUserInfoGetter.myFeeling.ageOfPartner === undefined ||
            getUserInfoGetter.myFeeling.ageOfPartner === null ||
            getUserInfoGetter.myFeeling.ageOfPartner.id === 1
        "
      >
        <q-item-section>
          <q-select
            hide-dropdown-icon
            readonly
            outlined
            :value="getUserInfoGetter.myFeeling.ageOfPartner"
            :label="$t('editUser.feelingToday.ageOfPartner')"
            dense
          >
            <template v-slot:selected-item="scope">
              <q-chip dense :tabindex="scope.tabindex">
                {{ scope.opt.value }}
              </q-chip>
            </template>
          </q-select>
        </q-item-section>
      </q-item>
      <q-item v-else>
        <q-item-section class="col-2">
          <q-input
            readonly
            outlined
            :value="getUserInfoGetter.myFeeling.ageOfPartner.minAge"
            :label="$t('editUser.feelingToday.ageOfPartnerMin')"
            :suffix="$t('editUser.feelingToday.age')"
            dense
          />
        </q-item-section>
        <q-item-label class="q-mx-sm q-mt-sm text-h5">
          ~
        </q-item-label>
        <q-item-section class="col-2">
          <q-input
            readonly
            outlined
            :value="getUserInfoGetter.myFeeling.ageOfPartner.maxAge"
            :label="$t('editUser.feelingToday.ageOfPartnerMax')"
            :suffix="$t('editUser.feelingToday.age')"
            dense
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-select
            hide-dropdown-icon
            readonly
            outlined
            :value="getUserInfoGetter.myFeeling.genderOfPartner"
            :label="$t('editUser.feelingToday.genderOfPartner')"
            dense
          >
            <template v-slot:selected-item="scope">
              <q-chip dense :tabindex="scope.tabindex">
                {{ scope.opt.value }}
              </q-chip>
            </template>
          </q-select>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-select
            hide-dropdown-icon
            readonly
            outlined
            multiple
            :value="getUserInfoGetter.myFeeling.yourFeeling"
            :label="$t('editUser.feelingToday.yourFeeling')"
            dense
          >
            <template v-slot:selected-item="scope">
              <q-chip dense :tabindex="scope.tabindex">
                {{ scope.opt.value }}
              </q-chip>
            </template>
          </q-select>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-select
            hide-dropdown-icon
            readonly
            outlined
            multiple
            :value="getUserInfoGetter.myFeeling.paymentFeeling"
            :label="$t('editUser.feelingToday.paymentFeeling')"
            dense
          >
            <template v-slot:selected-item="scope">
              <q-chip dense :tabindex="scope.tabindex">
                {{ scope.opt.value }}
              </q-chip>
            </template>
          </q-select>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-select
            hide-dropdown-icon
            readonly
            outlined
            :value="getUserInfoGetter.myFeeling.timeFeeling"
            :label="$t('editUser.feelingToday.timeFeeling')"
            dense
          >
            <template v-slot:selected-item="scope">
              <q-chip dense :tabindex="scope.tabindex">
                {{ scope.opt.value }}
              </q-chip>
            </template>
          </q-select>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input
            readonly
            outlined
            :value="
              new Date(
                getUserInfoGetter.myFeeling.updatedAt
              ).toLocaleDateString('ja', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }) +
                ' ' +
                new Date(
                  getUserInfoGetter.myFeeling.updatedAt
                ).toLocaleTimeString('ja')
            "
            :mask="$t('editUser.feelingToday.maskDatetime')"
            :label="$t('editUser.feelingToday.updatedAt')"
            dense
          />
        </q-item-section>
      </q-item>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'edit-user-feeling-today',
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters('user', ['getUserInfoGetter']),
  },
  methods: {},
  created() {},
};
</script>

<style lang="stylus"></style>
