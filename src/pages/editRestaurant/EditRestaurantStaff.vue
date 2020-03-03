<template>
  <q-page padding>
    <!-- content -->
    <q-linear-progress v-if="loading" indeterminate />
    <input
      @change="(e) => onFileChange(e)"
      type="file"
      ref="changeStaffPhoto"
      name="image"
      accept="image/*"
      style="display: none;"
    />

    <q-dialog v-model="openDialogToUploadStaffPhoto" persistent>
      <q-card class="full-width">
        <q-card-section>
          <div class="text-h6">{{ $t('editRestaurant.staff.photo') }}</div>
        </q-card-section>

        <q-card-section>
          <v-cropper
            ref="cropper"
            :aspect-ratio="1242 / 875"
            :src="selectedImage.src"
            preview=".preview"
            class="full-width"
            style="max-height: 25em"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            :label="$t('cancel')"
            @click="clearSelectedImage()"
            v-close-popup
          />
          <q-btn
            color="primary"
            icon-right="ion-checkmark"
            :label="$t('confirm')"
            @click="confirmStaffPhoto($refs, selectedImage.isAddNew)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmToDeleteStaff">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="ion-trash" color="negative" text-color="white" />
          <span class="q-ml-sm">
            {{ $t('editRestaurant.staff.confirmDeleteStaff') }}
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
          <q-btn
            flat
            :label="$t('delete')"
            @click="deleteStaff()"
            color="negative"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-for="staff in dialogStaff"
      :key="staff.title"
      v-model="staff.openDialog"
    >
      <q-card class="full-width">
        <q-card-section class="row justify-between">
          <div class="justify-center text-h6">
            {{ staff.title }}
          </div>
        </q-card-section>

        <q-card-section class="row justify-center">
          <q-img
            spinner-color="orange-2"
            :src="staff.isAddNew ? newStaff.photoSrc : updatedStaff.photoSrc"
            :ratio="1242 / 875"
            class="rounded-borders shadow-1"
            style="max-width: 19em"
          />
          <q-btn
            dense
            :color="
              staff.isAddNew
                ? errors.newStaff.photoFile
                  ? 'negative'
                  : 'primary'
                : 'primary'
            "
            icon="ion-create"
            @click="onSelectStaffPhoto(staff.isAddNew)"
          />
        </q-card-section>

        <q-card-section class="q-py-none">
          <q-input
            v-if="staff.isAddNew"
            v-model="newStaff.name"
            :error="errors.newStaff.name"
            @blur="() => (errors.newStaff.name = newStaff.name === '')"
            outlined
            dense
            autofocus
            :label="$t('editRestaurant.staff.name')"
            class="q-py-sm"
          />
          <q-input
            v-else
            v-model="updatedStaff.name"
            :error="errors.updatedStaff.name"
            @blur="() => (errors.updatedStaff.name = updatedStaff.name === '')"
            outlined
            dense
            autofocus
            :label="$t('editRestaurant.staff.name')"
            class="q-py-sm"
          />
        </q-card-section>
        <q-card-section class="q-py-none">
          <q-input
            v-if="staff.isAddNew"
            outlined
            dense
            readonly
            @click="displayNewStaffBirthday = true"
            :value="
              newStaff.birthday
                ? new Date(newStaff.birthday).toLocaleDateString('ja', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                : null
            "
            debounce="650"
            :label="$t('editRestaurant.staff.birthday')"
            :mask="$t('editRestaurant.staff.maskDate')"
            class="q-py-sm"
          >
            <template v-slot:prepend>
              <q-icon name="event" @click="displayNewStaffBirthday = true">
                <q-dialog v-model="displayNewStaffBirthday">
                  <v-datepicker
                    :disabledDates="{
                      from: new Date(
                        new Date().getFullYear() - 15,
                        new Date().getMonth(),
                        new Date().getDate()
                      ),
                    }"
                    :language="languages[language]"
                    :inline="true"
                    v-model="newStaff.birthday"
                    @selected="displayNewStaffBirthday = false"
                  />
                </q-dialog>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon
                name="ion-close-circle"
                @click="newStaff.birthday = null"
              />
            </template>
          </q-input>
          <q-input
            v-else
            outlined
            dense
            readonly
            @click="displayUpdatedStaffBirthday = true"
            :value="
              updatedStaff.birthday
                ? new Date(updatedStaff.birthday).toLocaleDateString('ja', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                : null
            "
            debounce="650"
            :label="$t('editRestaurant.staff.birthday')"
            :mask="$t('editRestaurant.staff.maskDate')"
            class="q-py-sm"
          >
            <template v-slot:prepend>
              <q-icon name="event" @click="displayUpdatedStaffBirthday = true">
                <q-dialog v-model="displayUpdatedStaffBirthday">
                  <v-datepicker
                    :disabledDates="{
                      from: new Date(
                        new Date().getFullYear() - 15,
                        new Date().getMonth(),
                        new Date().getDate()
                      ),
                    }"
                    :language="languages[language]"
                    :inline="true"
                    v-model="updatedStaff.birthday"
                    @selected="displayUpdatedStaffBirthday = false"
                  />
                </q-dialog>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon
                name="ion-close-circle"
                @click="updatedStaff.birthday = null"
              />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section class="q-py-none">
          <q-select
            v-if="staff.isAddNew"
            outlined
            v-model="newStaff.birthplace"
            :options="getRestaurantMasterdataGetter.StaffBirthplace"
            option-label="value"
            options-dense
            dense
            :label="$t('editRestaurant.staff.birthplace')"
            class="q-py-sm"
          >
            <template v-slot:selected-item="scope">
              <q-chip
                removable
                dense
                @remove="scope.removeAtIndex(scope.index)"
                :tabindex="scope.tabindex"
              >
                {{ scope.opt.value }}
              </q-chip>
            </template>
          </q-select>
          <q-select
            v-else
            outlined
            v-model="updatedStaff.birthplace"
            :options="getRestaurantMasterdataGetter.StaffBirthplace"
            option-label="value"
            options-dense
            dense
            :label="$t('editRestaurant.staff.birthplace')"
            class="q-py-sm"
          >
            <template v-slot:selected-item="scope">
              <q-chip
                removable
                dense
                @remove="scope.removeAtIndex(scope.index)"
                :tabindex="scope.tabindex"
              >
                {{ scope.opt.value }}
              </q-chip>
            </template>
          </q-select>
        </q-card-section>
        <q-card-section class="q-py-none">
          <q-input
            v-if="staff.isAddNew"
            v-model="newStaff.title"
            :error="errors.newStaff.title"
            outlined
            dense
            :label="$t('editRestaurant.staff.title')"
            class="q-py-sm"
          />
          <q-input
            v-else
            v-model="updatedStaff.title"
            :error="errors.updatedStaff.title"
            outlined
            dense
            :label="$t('editRestaurant.staff.title')"
            class="q-py-sm"
          />
        </q-card-section>
        <q-card-section class="q-py-none">
          <q-select
            v-if="staff.isAddNew"
            outlined
            multiple
            v-model="newStaff.style"
            :options="getRestaurantMasterdataGetter.StaffStyle"
            option-label="value"
            options-dense
            dense
            :label="$t('editRestaurant.staff.style')"
            class="q-py-sm"
          >
            <template v-slot:selected-item="scope">
              <q-chip
                removable
                dense
                @remove="scope.removeAtIndex(scope.index)"
                :tabindex="scope.tabindex"
              >
                {{ scope.opt.value }}
              </q-chip>
            </template>
          </q-select>
          <q-select
            v-else
            outlined
            multiple
            v-model="updatedStaff.style"
            :options="getRestaurantMasterdataGetter.StaffStyle"
            option-label="value"
            options-dense
            dense
            :label="$t('editRestaurant.staff.style')"
            class="q-py-sm"
          >
            <template v-slot:selected-item="scope">
              <q-chip
                removable
                dense
                @remove="scope.removeAtIndex(scope.index)"
                :tabindex="scope.tabindex"
              >
                {{ scope.opt.value }}
              </q-chip>
            </template>
          </q-select>
        </q-card-section>
        <q-card-section class="q-py-none">
          <q-input
            v-if="staff.isAddNew"
            v-model="newStaff.profile"
            :error="errors.newStaff.profile"
            outlined
            dense
            autogrow
            :label="$t('editRestaurant.staff.profile')"
            class="q-py-sm"
          />
          <q-input
            v-else
            v-model="updatedStaff.profile"
            :error="errors.updatedStaff.profile"
            outlined
            dense
            autogrow
            :label="$t('editRestaurant.staff.profile')"
            class="q-py-sm"
          />
        </q-card-section>
        <q-card-section class="q-py-none">
          <q-select
            v-if="staff.isAddNew"
            outlined
            multiple
            v-model="newStaff.canTalk"
            :options="getRestaurantMasterdataGetter.StaffCanTalk"
            option-label="value"
            options-dense
            dense
            :label="$t('editRestaurant.staff.canTalk')"
            class="q-py-sm"
          >
            <template v-slot:selected-item="scope">
              <q-chip
                removable
                dense
                @remove="scope.removeAtIndex(scope.index)"
                :tabindex="scope.tabindex"
              >
                {{ scope.opt.value }}
              </q-chip>
            </template>
          </q-select>
          <q-select
            v-else
            outlined
            multiple
            v-model="updatedStaff.canTalk"
            :options="getRestaurantMasterdataGetter.StaffCanTalk"
            option-label="value"
            options-dense
            dense
            :label="$t('editRestaurant.staff.canTalk')"
            class="q-py-sm"
          >
            <template v-slot:selected-item="scope">
              <q-chip
                removable
                dense
                @remove="scope.removeAtIndex(scope.index)"
                :tabindex="scope.tabindex"
              >
                {{ scope.opt.value }}
              </q-chip>
            </template>
          </q-select>
        </q-card-section>
        <q-card-section align="right" class="text-primary">
          <q-btn
            flat
            :label="$t('cancel')"
            @click="clearInputStaff(staff.isAddNew)"
            v-close-popup
          />
          <q-btn
            color="primary"
            icon-right="ion-send"
            :label="staff.submitLabel"
            @click="staff.submitAction"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-card v-if="getRestaurantInfoGetter.isVip">
      <q-card-section>
        <div class="row justify-between">
          <q-item
            v-for="staff in staffList"
            :key="staff.index"
            style="max-width: 20%"
            class="width-100 q-pa-xs"
          >
            <q-item-section
              v-if="
                staff.index !== 0 &&
                  getStaffGetter[staff.index - 1] === undefined
              "
            />
            <q-item-section
              v-else-if="getStaffGetter[staff.index] === undefined"
            >
              <q-btn
                icon="ion-add"
                color="primary"
                :label="$t('editRestaurant.staff.createNewStaff')"
                @click="onCreateNewStaff()"
              />
            </q-item-section>
            <q-item-section v-else class="self-start">
              <q-item-label class="row justify-center">
                <q-btn
                  round
                  dense
                  color="negative"
                  icon="ion-trash"
                  class="q-mx-sm"
                  @click="onDeleteStaff(getStaffGetter[staff.index])"
                />
                <q-btn
                  round
                  dense
                  color="secondary"
                  icon="ion-create"
                  class="q-mx-sm"
                  @click="onEditStaff(getStaffGetter[staff.index])"
                />
              </q-item-label>
              <q-img
                spinner-color="orange-2"
                :src="getStaffGetter[staff.index].photoSrc"
                :ratio="1242 / 875"
                class="rounded-borders shadow-1 q-mt-md"
              >
                <div class="absolute-bottom-right text-subtitle2">
                  {{ staff.index + 1 }}
                </div>
              </q-img>
              <q-input
                dense
                outlined
                readonly
                v-model="getStaffGetter[staff.index].name"
                :label="$t('editRestaurant.staff.name')"
                class="full-width q-mt-md"
              />
              <q-input
                dense
                outlined
                readonly
                v-if="getStaffGetter[staff.index].birthday"
                v-model="getStaffGetter[staff.index].formattedBirthday"
                :label="$t('editRestaurant.staff.birthday')"
                :mask="$t('editRestaurant.staff.maskDate')"
                class="full-width q-mt-md"
              />
              <q-select
                dense
                outlined
                readonly
                hide-dropdown-icon
                v-model="getStaffGetter[staff.index].birthplace"
                :label="$t('editRestaurant.staff.birthplace')"
                class="full-width q-mt-md"
              >
                <template v-slot:selected-item="scope">
                  {{ scope.opt.value }}
                </template>
              </q-select>
              <q-input
                dense
                outlined
                readonly
                v-model="getStaffGetter[staff.index].title"
                :label="$t('editRestaurant.staff.title')"
                class="full-width q-mt-md"
              />
              <q-select
                dense
                outlined
                readonly
                multiple
                hide-dropdown-icon
                v-model="getStaffGetter[staff.index].style"
                :label="$t('editRestaurant.staff.style')"
                class="full-width q-mt-md"
              >
                <template v-slot:selected-item="scope">
                  <q-chip dense :tabindex="scope.tabindex">
                    {{ scope.opt.value }}
                  </q-chip>
                </template>
              </q-select>
              <q-input
                dense
                outlined
                readonly
                v-model="getStaffGetter[staff.index].profile"
                type="textarea"
                rows="2"
                :label="$t('editRestaurant.staff.profile')"
                class="full-width q-mt-md"
              />
              <q-select
                dense
                outlined
                readonly
                multiple
                hide-dropdown-icon
                v-model="getStaffGetter[staff.index].canTalk"
                :label="$t('editRestaurant.staff.canTalk')"
                class="full-width q-mt-md"
              >
                <template v-slot:selected-item="scope">
                  <q-chip dense :tabindex="scope.tabindex">
                    {{ scope.opt.value }}
                  </q-chip>
                </template>
              </q-select>
            </q-item-section>
          </q-item>
        </div>
      </q-card-section>
    </q-card>
    <q-card v-else>
      <q-card-section>
        {{ $t('onlyForPremiumRestaurant') }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import Datepicker from 'vuejs-datepicker/dist/vuejs-datepicker.esm.js';
import * as lang from 'vuejs-datepicker/dist/locale';

export default {
  components: {
    'v-cropper': VueCropper,
    'v-datepicker': Datepicker,
  },
  name: 'edit-restaurant-staff',
  data() {
    return {
      loading: false,
      errors: {
        newStaff: {
          photoFile: false,
          name: false,
          birthday: false,
          birthplace: false,
          title: false,
          style: false,
          profile: false,
          canTalk: false,
        },
        updatedStaff: {
          name: false,
          birthday: false,
          birthplace: false,
          title: false,
          style: false,
          profile: false,
          canTalk: false,
        },
      },
      staffList: [
        { index: 0 },
        { index: 1 },
        { index: 2 },
        { index: 3 },
        { index: 4 },
      ],
      dialogStaff: [
        {
          isAddNew: true,
          title: this.$t('editRestaurant.staff.createNewStaff'),
          openDialog: false,
          submitLabel: this.$t('create'),
          submitAction: () => this.createNewStaff(),
        },
        {
          isAddNew: false,
          title: this.$t('editRestaurant.staff.editStaff'),
          openDialog: false,
          submitLabel: this.$t('update'),
          submitAction: () => this.updateStaff(),
        },
      ],
      openDialogToUploadStaffPhoto: false,
      selectedImage: { src: '', isAddNew: true },
      confirmToDeleteStaff: false,
      deletePhotoIndex: -1,
      newStaff: {
        photoSrc: '',
        photoFile: '',
        name: '',
        birthday: null,
        birthplace: null,
        title: '',
        style: null,
        profile: '',
        canTalk: null,
      },
      updatedStaff: {
        photoSrc: '',
        photoFile: '',
        name: '',
        birthday: null,
        birthplace: null,
        title: '',
        style: null,
        profile: '',
        canTalk: null,
      },
      deletionStaff: {
        id: '',
      },
      displayNewStaffBirthday: false,
      displayUpdatedStaffBirthday: false,
      language: this.$i18n.locale === 'en-US' ? 'en' : 'ja',
      languages: lang,
    };
  },
  computed: {
    ...mapGetters('restaurant', ['getRestaurantInfoGetter', 'getStaffGetter']),
    ...mapGetters('masterdata', ['getRestaurantMasterdataGetter']),
  },
  methods: {
    ...mapActions('restaurant', [
      'apiFetchRestaurantStaffAction',
      'apiCreateRestaurantStaffAction',
      'apiUpdateRestaurantStaffAction',
      'apiDeleteRestaurantStaffAction',
    ]),

    /* Staff Photo */
    onSelectStaffPhoto(isAddNew) {
      this.selectedImage.isAddNew = isAddNew;
      this.$refs.changeStaffPhoto.click();
    },
    onFileChange(e) {
      const file = e.target.files[0] || e.dataTransfer.files[0];
      const isNotAnImageFile = file.type.indexOf('image/') === -1;
      const isSupportFileReaderAPI = typeof FileReader === 'function';

      if (isNotAnImageFile) {
        this.$q.notify({
          message: this.$t('pleaseSelectAnImageFile'),
          color: 'teal-8',
        });
        return;
      }

      if (isSupportFileReaderAPI) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.selectedImage.src = event.target.result;
          this.openDialogToUploadStaffPhoto = true;
        };
        reader.readAsDataURL(file);
      } else {
        this.$q.notify({
          message: this.$t('notSupportedFileReaderAPI'),
          color: 'deep-orange-4',
        });
      }
    },
    clearSelectedImage() {
      this.$refs.changeStaffPhoto.value = '';
    },
    confirmStaffPhoto($refs, isAddNew) {
      $refs.cropper
        .getCroppedCanvas({ maxWidth: 1024, maxHeight: 1024 })
        .toBlob((blob) => {
          const formData = new FormData();
          formData.append('restaurant-staff-photo', blob, 'staff-photo.png');

          if (isAddNew) {
            this.newStaff.photoFile = formData.entries().next().value[1];
          } else {
            this.updatedStaff.photoFile = formData.entries().next().value[1];
          }
        });

      if (isAddNew) {
        this.newStaff.photoSrc = $refs.cropper
          .getCroppedCanvas({ maxWidth: 1024, maxHeight: 1024 })
          .toDataURL();
      } else {
        this.updatedStaff.photoSrc = $refs.cropper
          .getCroppedCanvas({ maxWidth: 1024, maxHeight: 1024 })
          .toDataURL();
      }

      this.errors.newStaff.photoFile = false;
      this.clearSelectedImage();
      this.openDialogToUploadStaffPhoto = false;
    },

    /* CRUD Staff */
    clearInputStaff(isAddNew) {
      if (isAddNew) {
        this.newStaff = {
          photoSrc: '',
          photoFile: '',
          name: '',
          birthday: null,
          birthplace: null,
          title: '',
          style: null,
          profile: '',
          canTalk: null,
        };
      }
    },
    onCreateNewStaff() {
      this.errors.newStaff = {
        photoFile: false,
        name: false,
        birthday: false,
        birthplace: false,
        title: false,
        style: false,
        profile: false,
        canTalk: false,
      };
      this.dialogStaff[0].openDialog = true;
    },
    onEditStaff(staff) {
      this.errors.updatedStaff = {
        photoFile: false,
        name: false,
        birthday: false,
        birthplace: false,
        title: false,
        style: false,
        profile: false,
        canTalk: false,
      };
      this.updatedStaff = { ...staff };
      this.dialogStaff[1].openDialog = true;
    },
    onDeleteStaff(staff) {
      this.deletionStaff = staff;
      this.confirmToDeleteStaff = true;
    },
    async createNewStaff() {
      this.dialogStaff[0].openDialog = false;
      this.loading = true;
      this.$q.loading.show();

      this.errors.newStaff.photoFile = this.newStaff.photoFile === '';
      this.errors.newStaff.name = this.newStaff.name === '';

      const gotError =
        (await Object.values(this.errors.newStaff).filter(
          (isInvalid) => isInvalid
        ).length) !== 0;

      if (gotError) {
        this.dialogStaff[0].openDialog = true;
        this.$q.notify({
          message: this.$t('reviewFieldAgain'),
          color: 'teal-8',
        });
        this.loading = false;
        this.$q.loading.hide();
      } else {
        // Call API create new Restaurant Staff
        const apolloClient = this.$apollo.provider.defaultClient;
        const input = { restaurantId: this.$route.params.id, ...this.newStaff };
        const result = await this.apiCreateRestaurantStaffAction({
          apolloClient,
          input,
        });

        if (result.requestResolved) {
          // Create success
          this.fetchRestaurantStaff().then(() => {
            this.clearInputStaff(true);
            this.$q.notify({
              message: this.$t(
                'api.editRestaurant.createRestaurantStaffSuccess'
              ),
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
                message: this.$t(
                  'api.editRestaurant.createRestaurantStaffFailed'
                ),
                color: 'deep-orange-4',
              });

          this.loading = false;
          this.$q.loading.hide();
        }
      }
    },
    async updateStaff() {
      this.dialogStaff[1].openDialog = false;
      this.loading = true;
      this.$q.loading.show();

      this.errors.updatedStaff.photoFile = this.updatedStaff.photoFile === '';
      this.errors.updatedStaff.name = this.updatedStaff.name === '';

      const gotError =
        (await Object.values(this.errors.updatedStaff).filter(
          (isInvalid) => isInvalid
        ).length) !== 0;

      if (gotError) {
        this.dialogStaff[1].openDialog = true;
        this.$q.notify({
          message: this.$t('reviewFieldAgain'),
          color: 'teal-8',
        });
        this.loading = false;
        this.$q.loading.hide();
      } else {
        // Call API update Restaurant Staff
        const apolloClient = this.$apollo.provider.defaultClient;
        const input = {
          restaurantId: this.$route.params.id,
          ...this.updatedStaff,
        };
        const result = await this.apiUpdateRestaurantStaffAction({
          apolloClient,
          input,
        });

        if (result.requestResolved) {
          // Update success
          this.$q.notify({
            message: this.$t('api.editRestaurant.updateRestaurantStaffSuccess'),
            color: 'green-5',
          });
          this.loading = false;
          this.$q.loading.hide();
        } else {
          result.systemError
            ? // Update failed, got something wrong with system
              this.$q.notify({
                message: `${result.systemError}`,
                color: 'deep-orange-4',
              })
            : // Update failed, got something wrong with user
              this.$q.notify({
                message: this.$t(
                  'api.editRestaurant.updateRestaurantStaffFailed'
                ),
                color: 'deep-orange-4',
              });

          this.loading = false;
          this.$q.loading.hide();
        }
      }
    },
    async deleteStaff() {
      this.confirmToDeleteStaff = false;
      this.loading = true;
      this.$q.loading.show();

      // Call API Delete Restaurant Staff
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = {
        restaurantId: this.$route.params.id,
        staffId: this.deletionStaff.id,
      };
      const result = await this.apiDeleteRestaurantStaffAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Delete success
        this.$q.notify({
          message: this.$t('api.editRestaurant.deleteRestaurantStaffSuccess'),
          color: 'green-5',
        });
        this.loading = false;
        this.$q.loading.hide();
      } else {
        result.systemError
          ? // Delete failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Delete failed, got something wrong with user
            this.$q.notify({
              message: this.$t(
                'api.editRestaurant.deleteRestaurantStaffFailed'
              ),
              color: 'deep-orange-4',
            });

        this.loading = false;
        this.$q.loading.hide();
      }
    },

    async fetchRestaurantStaff() {
      // Call API fetch Restaurant Staff
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { restaurantId: this.$route.params.id };
      const result = await this.apiFetchRestaurantStaffAction({
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
              message: this.$t('api.editRestaurant.fetchRestaurantStaffFailed'),
              color: 'deep-orange-4',
            });
      }
    },
  },
  created() {},
};
</script>

<style lang="stylus"></style>
