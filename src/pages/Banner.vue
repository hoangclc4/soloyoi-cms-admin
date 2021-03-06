<template>
  <q-page padding>
    <!-- content -->
    <q-linear-progress v-if="loading" indeterminate />
    <q-dialog v-model="openDialogToUploadBanner" persistent>
      <q-card class="full-width">
        <q-card-section>
          <div class="text-h6">
            {{ $t('editRestaurant.information.uploadPhoto') }}
          </div>
        </q-card-section>
        <q-card-section>
          <q-img
            spinner-color="orange-2"
            :src="selectedImage.src"
            class="rounded-borders shadow-8"
          />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat :label="$t('cancel')" v-close-popup />
          <q-btn
            color="primary"
            icon-right="ion-cloud-upload"
            :label="$t('upload')"
            @click="uploadBannerPhoto(selectedImage)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-card>
      <q-item tag="label">
        <q-item-section avatar>
          <q-toggle
            v-model="getStatusBannerGetter.status"
            @input="updateStatusBanner(getStatusBannerGetter)"
          />
        </q-item-section>
      </q-item>
      <q-item v-if="getStatusBannerGetter.status">
        <q-item-section round>
          <q-img
            spinner-color="orange-2"
            :src="
              getBannerInfoGetter.photoFullWidthUrl
                ? getBannerInfoGetter.photoFullWidthUrl
                : null
            "
            :ratio="1 / 1"
            class="rounded-borders shadow-8"
            style="margin-left: auto; margin-right: auto; max-height: 150px; max-width: 30%;"
          >
          </q-img>
        </q-item-section>
      </q-item>
      <q-item v-if="getStatusBannerGetter.status" class="justify-center">
        <q-btn
          round
          color="primary"
          icon="ion-cloud-upload"
          class="q-mx-sm"
          @click="onSelectBannerPhoto()"
        />
        <input
          @change="(e) => onFileChange(e)"
          type="file"
          ref="newBannerPhoto"
          name="image"
          accept="image/*"
          style="display: none;"
        />
      </q-item>
      <q-item v-if="getStatusBannerGetter.status">
        <q-item-section>
          <q-input
            outlined
            v-model="getBannerInfoGetter.url"
            :label="$t('editRestaurant.information.restaurantName')"
            dense
          />
        </q-item-section>
      </q-item>
      <q-item v-if="getStatusBannerGetter.status" class="full-width">
        <q-item-section class="full-width">
          <q-btn
            :disable="disableSaveButton"
            icon="ion-save"
            :label="$t('editRestaurant.information.saveBtn')"
            color="primary"
            class="full-width"
            @click="submit"
          />
        </q-item-section>
      </q-item>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import 'cropperjs/dist/cropper.css';

export default {
  name: 'setting',
  data() {
    return {
      loading: false,
      disableSaveButton: false,
      errors: {
        url: false,
      },
      openCreateRestaurant: false,
      welcomeNewRestaurant: false,
      isNewRestaurantPassword: true,
      confirmDeleteRestaurant: false,
      deletionRestaurant: { name: '', id: '' },
      filter: '',
      columns: [
        {
          name: 'action',
          align: 'left',
          label: this.$t('banner.actionHeader'),
          classes: 'bg-grey-2',
          field: 'isVip',
        },
        {
          name: 'name',
          align: 'left',
          label: this.$t('banner.photoName'),
          field: 'name',
          sortable: true,
        },
        {
          name: 'photoTypes',
          align: 'left',
          label: this.$t('banner.photoTypes'),
          field: 'photoTypes',
          format: (val) => (val === 'none' ? '' : val),
          sortable: true,
        },
        {
          name: 'category',
          align: 'left',
          label: this.$t('banner.category'),
          field: 'category',
          sortable: true,
        },
        {
          name: 'createdAt',
          align: 'left',
          label: this.$t('banner.createdAt'),
          field: 'createdAt',
          sortable: true,
        },
      ],
      selectedImage: {
        index: -1,
        src: '',
        type: '',
        upload: '',
      },
      newBanner: {
        photoSrc: '',
        photoFile: '',
        name: '',
      },
      openDialogToUploadBanner: false,
    };
  },
  computed: {
    ...mapGetters('setting', ['getBannerInfoGetter', 'getStatusBannerGetter']),
  },
  methods: {
    ...mapActions('setting', [
      'apiUpdateBannerPhotoAction',
      'apiFetchBannerInformationAction',
      'apiUpdateBannerAction',
      'apiFetchStatusBannerAction',
      'apiUpdateStatusBannerAction',
    ]),

    onSelectBannerPhoto() {
      this.$refs.newBannerPhoto.click();
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
          this.selectedImage = {
            src: event.target.result,
            // type: photoTypes,
            upload: file,
          };
          this.openDialogToUploadBanner = true;
        };
        reader.readAsDataURL(file);
      } else {
        this.$q.notify({
          message: this.$t('notSupportedFileReaderAPI'),
          color: 'deep-orange-4',
        });
      }
    },
    async uploadBannerPhoto() {
      this.openDialogToUploadBanner = false;
      this.loading = true;
      // Call API upload Banner Photo
      // $refs.cropper
      // .getCroppedCanvas({ maxWidth: 1024, maxHeight: 1024 })
      // .toBlob(async (blob) => {
      const apolloClient = this.$apollo.provider.defaultClient;
      const bannerPhoto = this.getBannerInfoGetter.photoId;
      const isAddNew = bannerPhoto === null || bannerPhoto === '';
      //const photoTypes = selectedImage.type;

      const formData = new FormData();
      formData.append(
        'banner-photos',
        this.selectedImage.upload,
        'banner-photo.png'
      );

      const photo = formData.entries().next().value[1];
      const input = isAddNew
        ? null
        : {
            oldPhotoId: bannerPhoto,
          };
      const result = await this.apiUpdateBannerPhotoAction({
        apolloClient,
        input,
        photo,
      });
      if (result.requestResolved) {
        // Upload success
        this.$q.notify({
          message: this.$t('api.banner.uploadBannerPhotoSuccess'),
          color: 'green-5',
        });
        this.loading = false;
      } else {
        result.systemError
          ? // Upload failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Upload failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.banner.uploadBannerPhotoFailed'),
              color: 'deep-orange-4',
            });

        this.loading = false;
      }
      // });
    },
    async fetchBannerInformation() {
      // Call API fetch Restaurant Information
      const apolloClient = this.$apollo.provider.defaultClient;
      //const input = { restaurantId: this.$route.params.id };
      const result = await this.apiFetchBannerInformationAction({
        apolloClient,
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
              message: this.$t(
                'api.editRestaurant.fetchBannerInformationFailed'
              ),
              color: 'deep-orange-4',
            });
      }
    },
    async fetchStatusBanner() {
      // Call API fetch Restaurant Information
      const apolloClient = this.$apollo.provider.defaultClient;
      //const input = { restaurantId: this.$route.params.id };
      const result = await this.apiFetchStatusBannerAction({
        apolloClient,
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
              message: this.$t('api.banner.fetchStatusBannerFailed'),
              color: 'deep-orange-4',
            });
      }
    },
    async submit() {
      this.loading = true;
      this.$q.loading.show();
      this.errors.url =
        this.getBannerInfoGetter.url === '' ||
        this.getBannerInfoGetter.url === null;
      const gotError = await Object.values(this.errors).filter(
        (isInvalid) => isInvalid
      );
      if (gotError.length === 0) {
        this.updateBannerInfo(this.getBannerInfoGetter);
      } else {
        this.loading = false;
        this.$q.loading.hide();
        this.$q.notify({
          message: this.$t('reviewFieldAgain'),
          color: 'teal-8',
        });
      }
    },
    async updateBannerInfo(input) {
      const apolloClient = this.$apollo.provider.defaultClient;
      const result = await this.apiUpdateBannerAction({
        apolloClient,
        input,
      });
      if (result.requestResolved) {
        // Update success
        this.$q.notify({
          message: this.$t('api.banner.updateBannerInformationSuccess'),
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
              message: this.$t('api.banner.updateBannerInformationFailed'),
              color: 'deep-orange-4',
            });

        this.loading = false;
        this.$q.loading.hide();
      }
    },
    async updateStatusBanner(input) {
      this.loading = true;
      // Call API update Seat Available Restaurant
      const apolloClient = this.$apollo.provider.defaultClient;
      const result = await this.apiUpdateStatusBannerAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Update success
        this.$q.notify({
          message: this.$t('api.banner.updateStatusBannerSuccess'),
          color: 'green-5',
        });
        this.loading = false;
      } else {
        result.systemError
          ? // Update failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Update failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.banner.updateStatusBannerFailed'),
              color: 'deep-orange-4',
            });

        this.loading = false;
      }
    },
  },
  created() {
    Promise.all([this.fetchBannerInformation(), this.fetchStatusBanner()]).then(
      () => {
        this.loading = false;
        this.$q.loading.hide();
      }
    );
  },
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
