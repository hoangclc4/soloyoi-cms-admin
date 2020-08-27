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
          <v-cropper
            ref="cropper"
            :aspect-ratio="1242 / 880"
            :src="selectedImage.src"
            preview=".preview"
            class="full-width"
            style="max-height: 25em"
          />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat :label="$t('cancel')" v-close-popup />
          <q-btn
            color="primary"
            icon-right="ion-cloud-upload"
            :label="$t('upload')"
            @click="uploadBannerPhoto($refs, selectedImage)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-card>
      <q-item>
        <q-item-section round>
          <q-img
            spinner-color="orange-2"
            :src="
              getBannerInfoGetter.photoFullWidthUrl
                ? getBannerInfoGetter.photoFullWidthUrl
                : null
            "
            :ratio="1242 / 880"
            class="rounded-borders shadow-8"
            style="margin-left: auto; margin-right: auto; max-width: 30%;"
          >
          </q-img>
        </q-item-section>
      </q-item>
      <q-item class="justify-center">
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
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
  name: 'setting',
  components: {
    'v-cropper': VueCropper,
  },
  data() {
    return {
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
    ...mapGetters('setting', ['getBannerInfoGetter']),
  },
  methods: {
    ...mapActions('setting', ['apiUpdateBannerPhotoAction']),

    onSelectBannerPhoto() {
      this.$refs.newBannerPhoto.click();
    },
    async onFileChange(e) {
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
            //type: photoTypes,
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
    async uploadBannerPhoto($refs) {
      this.openDialogToUploadBanner = false;
      this.loading = true;

      // Call API upload Banner Photo
      $refs.cropper
        .getCroppedCanvas({ maxWidth: 1024, maxHeight: 1024 })
        .toBlob(async (blob) => {
          const apolloClient = this.$apollo.provider.defaultClient;
          const bannerPhoto = this.getBannerInfoGetter.photoId;
          const isAddNew = bannerPhoto === null || bannerPhoto === '';
          //const photoTypes = selectedImage.type;

          const formData = new FormData();
          formData.append('banner-photos', blob, 'banner-photo.png');

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
        });
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
