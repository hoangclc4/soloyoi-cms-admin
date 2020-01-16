<template>
  <q-page padding>
    <!-- content -->
    <q-linear-progress v-if="loading" indeterminate />
    <q-card>
      <q-item>
        <q-item-section class="text-h6">
          {{ $t('editUser.profile.pageTitle') }}
        </q-item-section>
      </q-item>
      <q-item class="justify-center">
        <q-item-section round>
          <q-img
            spinner-color="orange-2"
            :src="getUserInfoGetter.facebookAvatar"
            :ratio="1 / 1"
            class="rounded-borders shadow-8"
          >
            <div class="absolute-bottom-right text-subtitle2">
              {{ 1 }}
            </div>
          </q-img>
        </q-item-section>
        <q-item-section v-for="photo in photos" :key="photo.photoIndex" round>
          <q-img
            spinner-color="orange-2"
            :src="
              getUserInfoGetter.photos[photo.photoIndex]
                ? getUserInfoGetter.photos[photo.photoIndex].photoFullWidthUrl
                : null
            "
            :ratio="1 / 1"
            class="rounded-borders shadow-8"
          >
            <div class="absolute-bottom-right text-subtitle2">
              {{ photo.photoIndex + 2 }}
            </div>
          </q-img>
        </q-item-section>
        <!-- No support edit or delete user avatar -->
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-input
            outlined
            readonly
            :value="getUserInfoGetter.facebookFullName"
            :label="$t('editUser.profile.facebookFullName')"
            dense
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input
            outlined
            readonly
            :value="getUserInfoGetter.nickName"
            :label="$t('editUser.profile.nickName')"
            dense
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input
            outlined
            readonly
            :value="
              new Date(getUserInfoGetter.facebookBirthday).toLocaleDateString(
                'ja',
                {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }
              )
            "
            :label="$t('editUser.profile.facebookBirthday')"
            :mask="$t('editUser.profile.maskDate')"
            dense
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input
            outlined
            readonly
            type="textarea"
            rows="2"
            :value="getUserInfoGetter.selfIntroduction"
            :label="$t('editUser.profile.selfIntroduction')"
            dense
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-select
            hide-dropdown-icon
            outlined
            readonly
            :value="getUserInfoGetter.placeOfBirth"
            :label="$t('editUser.profile.placeOfBirth')"
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
            outlined
            readonly
            :value="getUserInfoGetter.residence"
            :label="$t('editUser.profile.residence')"
            dense
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-select
            hide-dropdown-icon
            outlined
            readonly
            multiple
            :value="getUserInfoGetter.singlePersonArea"
            :label="$t('editUser.profile.singlePersonArea')"
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
            outlined
            readonly
            :value="getUserInfoGetter.occupation"
            :label="$t('editUser.profile.occupation')"
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
            outlined
            readonly
            multiple
            :value="getUserInfoGetter.sake"
            :label="$t('editUser.profile.sake')"
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
            outlined
            readonly
            :value="getUserInfoGetter.smoking"
            :label="$t('editUser.profile.smoking')"
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
            outlined
            readonly
            :value="getUserInfoGetter.storyStance"
            :label="$t('editUser.profile.storyStance')"
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
            outlined
            readonly
            multiple
            :value="getUserInfoGetter.favoriteConversationGenre"
            :label="$t('editUser.profile.favoriteConversationGenre')"
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
            outlined
            readonly
            multiple
            :value="getUserInfoGetter.personal"
            :label="$t('editUser.profile.personal')"
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
            outlined
            readonly
            multiple
            :value="getUserInfoGetter.whenDrinkingAlone"
            :label="$t('editUser.profile.whenDrinkingAlone')"
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
            outlined
            readonly
            :value="
              new Date(getUserInfoGetter.createdAt).toLocaleDateString('ja', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }) +
                ' ' +
                new Date(getUserInfoGetter.createdAt).toLocaleTimeString('ja')
            "
            :label="$t('editUser.profile.createdAt')"
            :mask="$t('editUser.profile.maskDatetime')"
            dense
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input
            outlined
            readonly
            :value="
              new Date(getUserInfoGetter.updatedAt).toLocaleDateString('ja', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }) +
                ' ' +
                new Date(getUserInfoGetter.updatedAt).toLocaleTimeString('ja')
            "
            :label="$t('editUser.profile.updatedAt')"
            :mask="$t('editUser.profile.maskDatetime')"
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
  name: 'edit-user-profile',
  data() {
    return {
      loading: false,
      photos: [
        { photoIndex: 0 },
        { photoIndex: 1 },
        { photoIndex: 2 },
        { photoIndex: 3 },
      ],
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
