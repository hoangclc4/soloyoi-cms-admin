<template>
  <q-page padding>
    <!-- content -->
    <q-linear-progress v-if="loading" indeterminate />
    <q-dialog v-model="openDialogToUpload" persistent>
      <q-card class="full-width">
        <q-card-section>
          <div class="text-h6">
            {{ $t('editRestaurant.information.uploadPhoto') }}
          </div>
        </q-card-section>

        <q-card-section>
          <VueCropper
            ref="cropper"
            :aspect-ratio="1242 / 880"
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
            @click="clearSelectedImage($refs, selectedImage)"
            v-close-popup
          />
          <q-btn
            color="primary"
            icon-right="ion-cloud-upload"
            :label="$t('upload')"
            @click="uploadRestarantPhoto($refs, selectedImage)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmToDeletePhoto">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="ion-trash" color="negative" text-color="white" />
          <span class="q-ml-sm">
            {{ $t('editRestaurant.information.confirmDeletePhoto') }}
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
          <q-btn
            flat
            :label="$t('delete')"
            @click="deleteRestaurantPhoto(deletePhotoIndex)"
            color="negative"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-card>
      <q-item class="justify-center">
        <q-item-section round style="max-width: 30%">
          <q-img
            spinner-color="orange-2"
            :src="
              getRestaurantInfoGetter.avatar
                ? getRestaurantInfoGetter.avatar
                : null
            "
            :ratio="1242 / 880"
            class="rounded-borders shadow-8"
          >
            <div class="absolute-bottom-right text-subtitle2">
              {{ avatar.photoIndex + 1 }}
            </div>
          </q-img>
        </q-item-section>
      </q-item>
      <q-item class="justify-center">
        <!-- No support delete restaurant avatar -->
        <q-btn
          round
          color="primary"
          icon="ion-cloud-upload"
          class="q-mx-sm"
          @click="$refs.changeRetaurantAvatar.click()"
        />
        <input
          @change="(e) => onFileChange(e, 'AVATAR', avatar.photoIndex)"
          type="file"
          ref="changeRetaurantAvatar"
          style="display: none;"
          name="image"
          accept="image/*"
        />
      </q-item>

      <q-separator />

      <q-expansion-item
        expand-separator
        switch-toggle-side
        icon="ion-information-circle-outline"
        :label="$t('editRestaurant.information.freeRestaurantInformation')"
        @before-show="
          () => {
            showAddressThree =
              getRestaurantInfoGetter.addressLevelThree === null ||
              getRestaurantInfoGetter.addressLevelThree.value !== '';
          }
        "
      >
        <q-item>
          <q-item-section>
            <q-input
              outlined
              v-model="getRestaurantInfoGetter.name"
              :label="$t('editRestaurant.information.restaurantName')"
              dense
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              outlined
              v-model="getRestaurantInfoGetter.email"
              :label="$t('editRestaurant.information.email')"
              dense
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              outlined
              v-model="getRestaurantInfoGetter.phone"
              :label="$t('editRestaurant.information.phoneNumber')"
              dense
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              outlined
              v-model="getRestaurantInfoGetter.addressLevelOne"
              :error="errors.addressLevelOne"
              @input="onChangeAddress('One')"
              :label="$t('editRestaurant.information.addressLevelOne')"
              :options="getAddressLevelOneGetter"
              option-label="value"
              options-dense
              dense
              class="q-pa-none"
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
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              outlined
              v-model="getRestaurantInfoGetter.addressLevelTwo"
              :error="errors.addressLevelTwo"
              :disable="getRestaurantInfoGetter.addressLevelOne === null"
              @input="onChangeAddress('Two')"
              :label="$t('editRestaurant.information.addressLevelTwo')"
              :options="getAddressLevelTwoGetter"
              option-label="value"
              options-dense
              dense
              class="q-pa-none"
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
          </q-item-section>
        </q-item>
        <q-item v-if="showAddressThree">
          <q-item-section>
            <q-select
              outlined
              v-model="getRestaurantInfoGetter.addressLevelThree"
              :error="errors.addressLevelThree"
              :disable="getRestaurantInfoGetter.addressLevelTwo === null"
              :label="$t('editRestaurant.information.addressLevelThree')"
              :options="getAddressLevelThreeGetter"
              option-label="value"
              options-dense
              dense
              class="q-pa-none"
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
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              outlined
              v-model="getRestaurantInfoGetter.specificAddress"
              :error="errors.specificAddress"
              :label="$t('editRestaurant.information.specificAddress')"
              dense
              class="q-pa-none"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              outlined
              v-model="getRestaurantInfoGetter.access"
              :label="$t('editRestaurant.information.accessibility')"
              autogrow
              dense
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              outlined
              type="textarea"
              rows="3"
              :error="errors.description"
              :rules="[
                (val) =>
                  validateForm(
                    'description',
                    getRestaurantInfoGetter.description
                  ),
              ]"
              v-model="getRestaurantInfoGetter.description"
              :label="$t('editRestaurant.information.shortDescription')"
              dense
              counter
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              outlined
              v-model="getRestaurantInfoGetter.openTimes"
              :label="$t('editRestaurant.information.openingHours')"
              autogrow
              dense
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              outlined
              v-model="getRestaurantInfoGetter.openTimeSearch"
              multiple
              :label="$t('editRestaurant.information.openingHoursForSearch')"
              :options="getRestaurantMasterdataGetter.OpenTimeSearch"
              option-label="value"
              options-dense
              dense
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
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              outlined
              v-model="getRestaurantInfoGetter.regularHolidays"
              :label="$t('editRestaurant.information.regularHolidays')"
              dense
            >
              <template v-slot:selected-item="scope">
                <q-chip
                  removable
                  dense
                  @remove="scope.removeAtIndex(scope.index)"
                  :tabindex="scope.tabindex"
                >
                  {{ scope.opt[scope.index].value }}
                </q-chip>
              </template>
            </q-input>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              outlined
              v-model="getRestaurantInfoGetter.url"
              :label="$t('editRestaurant.information.url')"
              dense
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section class="col-2">
            <q-input
              outlined
              v-model="getRestaurantInfoGetter.genderRatioMan"
              :label="$t('editRestaurant.information.genderRatioMan')"
              type="number"
              :prefix="$t('editRestaurant.information.ratioMan')"
              dense
            />
          </q-item-section>
          <q-item-label class="q-mx-sm q-mt-sm text-h5">
            :
          </q-item-label>
          <q-item-section class="col-2">
            <q-input
              outlined
              v-model="getRestaurantInfoGetter.genderRatioLady"
              :label="$t('editRestaurant.information.genderRatioLady')"
              type="number"
              :prefix="$t('editRestaurant.information.ratioLady')"
              dense
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section class="col-2">
            <q-input
              outlined
              v-model="getRestaurantInfoGetter.customerAgeMin"
              :label="$t('editRestaurant.information.customerAgeMin')"
              type="number"
              :suffix="$t('editRestaurant.information.yearsOld')"
              dense
            />
          </q-item-section>
          <q-item-label class="q-mx-sm q-mt-sm text-h5">
            ~
          </q-item-label>
          <q-item-section class="col-2">
            <q-input
              outlined
              v-model="getRestaurantInfoGetter.customerAgeMax"
              :label="$t('editRestaurant.information.customerAgeMax')"
              type="number"
              :suffix="$t('editRestaurant.information.yearsOld')"
              dense
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              outlined
              v-model="getRestaurantInfoGetter.aloneMenu"
              :label="$t('editRestaurant.information.aloneMenu')"
              :options="getRestaurantMasterdataGetter.AloneMenu"
              option-label="value"
              options-dense
              dense
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
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section class="col-3">
            <q-input
              outlined
              v-model="getRestaurantInfoGetter.typeOfSake"
              :label="$t('editRestaurant.information.typeOfSake')"
              :suffix="$t('editRestaurant.information.moreThansKind')"
              type="number"
              dense
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section class="col-2">
            <q-input
              outlined
              v-model="getRestaurantInfoGetter.priceRangeLow"
              :label="$t('editRestaurant.information.budgetPerPersonLow')"
              :suffix="$t('editRestaurant.information.japaneseYen')"
              dense
            />
          </q-item-section>
          <q-item-label class="q-mx-sm q-mt-sm text-h5">
            ~
          </q-item-label>
          <q-item-section class="col-2">
            <q-input
              outlined
              v-model="getRestaurantInfoGetter.priceRangeHigh"
              :label="$t('editRestaurant.information.budgetPerPersonHigh')"
              :suffix="$t('editRestaurant.information.japaneseYen')"
              dense
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              outlined
              v-model="getRestaurantInfoGetter.sakes"
              multiple
              :options="getRestaurantMasterdataGetter.Sake"
              option-label="value"
              :label="$t('editRestaurant.information.sake')"
              options-dense
              dense
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
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              outlined
              v-model="getRestaurantInfoGetter.lonelyScenes"
              multiple
              :options="getRestaurantMasterdataGetter.LonelyScene"
              option-label="value"
              :label="$t('editRestaurant.information.lonelyScene')"
              options-dense
              dense
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
          </q-item-section>
        </q-item>
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        expand-separator
        switch-toggle-side
        icon="ion-pricetags"
        :label="$t('editRestaurant.information.premiumRestaurantInformation')"
      >
        <q-card v-if="getRestaurantInfoGetter.isVip">
          <q-item>
            <q-item-section
              v-for="photo in photos"
              :key="photo.photoIndex"
              round
            >
              <q-img
                spinner-color="orange-2"
                :src="
                  getRestaurantInfoGetter.photos[photo.photoIndex]
                    ? getRestaurantInfoGetter.photos[photo.photoIndex]
                        .photoFullWidthUrl
                    : null
                "
                :ratio="1242 / 880"
                class="rounded-borders shadow-8"
              >
                <div class="absolute-bottom-right text-subtitle2">
                  {{ photo.photoIndex + 1 }}
                </div>
              </q-img>
              <q-card-section class="row justify-center">
                <q-btn
                  :disable="
                    getRestaurantInfoGetter.photos[photo.photoIndex] ===
                      undefined
                  "
                  round
                  dense
                  color="negative"
                  icon="ion-trash"
                  class="q-mx-sm"
                  @click="onDeletePhoto(photo.photoIndex)"
                />
                <q-btn
                  :disable="
                    photo.photoIndex !== 1 &&
                      getRestaurantInfoGetter.photos[photo.photoIndex - 1] ===
                        undefined
                  "
                  round
                  dense
                  color="primary"
                  icon="ion-cloud-upload"
                  class="q-mx-sm"
                  @click="
                    $refs.changeRetaurantPhoto[photo.photoIndex - 1].click()
                  "
                />
                <input
                  @change="(e) => onFileChange(e, 'PHOTOS', photo.photoIndex)"
                  type="file"
                  ref="changeRetaurantPhoto"
                  style="display: none;"
                  name="image"
                  accept="image/*"
                />
              </q-card-section>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-input
                outlined
                :error="errors.catchphrase"
                :rules="[
                  (val) =>
                    validateForm(
                      'catchphrase',
                      getRestaurantInfoGetter.vipRestaurant.catchPhrase
                    ),
                ]"
                v-model="getRestaurantInfoGetter.vipRestaurant.catchPhrase"
                :label="$t('editRestaurant.information.catchphrase')"
                dense
                counter
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-input
                outlined
                v-model="getRestaurantInfoGetter.vipRestaurant.yomigana"
                :label="$t('editRestaurant.information.yomigana')"
                dense
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-select
                outlined
                v-model="getRestaurantInfoGetter.vipRestaurant.payments"
                multiple
                dense
                :options="getRestaurantMasterdataGetter.RestaurantPayment"
                option-label="value"
                :label="$t('editRestaurant.information.payment')"
                options-dense
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
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-input
                outlined
                v-model="getRestaurantInfoGetter.vipRestaurant.snsFacebook"
                :label="$t('editRestaurant.information.snsFacebook')"
                dense
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-input
                outlined
                v-model="getRestaurantInfoGetter.vipRestaurant.snsTwitter"
                :label="$t('editRestaurant.information.snsTwitter')"
                dense
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-input
                outlined
                v-model="getRestaurantInfoGetter.vipRestaurant.snsInstagram"
                :label="$t('editRestaurant.information.snsInstagram')"
                dense
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section class="col-2">
              <q-input
                outlined
                v-model="
                  getRestaurantInfoGetter.vipRestaurant.numberOfSeatCounter
                "
                :label="$t('editRestaurant.information.numberOfSeatCounter')"
                :suffix="$t('editRestaurant.information.seat')"
                type="number"
                dense
              />
            </q-item-section>
            <q-item-section class="col-2">
              <q-input
                outlined
                v-model="
                  getRestaurantInfoGetter.vipRestaurant.numberOfSeatTable
                "
                :label="$t('editRestaurant.information.numberOfSeatTable')"
                :suffix="$t('editRestaurant.information.seat')"
                type="number"
                dense
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-select
                outlined
                v-model="getRestaurantInfoGetter.vipRestaurant.smoking"
                :label="$t('editRestaurant.information.smoking')"
                :options="getRestaurantMasterdataGetter.Smoking"
                option-label="value"
                options-dense
                dense
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
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-select
                outlined
                v-model="getRestaurantInfoGetter.vipRestaurant.languages"
                multiple
                :options="getRestaurantMasterdataGetter.Languages"
                option-label="value"
                :label="$t('editRestaurant.information.languages')"
                options-dense
                dense
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
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-select
                outlined
                v-model="getRestaurantInfoGetter.vipRestaurant.features"
                multiple
                :options="getRestaurantMasterdataGetter.Features"
                option-label="value"
                :label="$t('editRestaurant.information.feature')"
                options-dense
                dense
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
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-select
                outlined
                v-model="
                  getRestaurantInfoGetter.vipRestaurant.salesInformations
                "
                multiple
                :options="getRestaurantMasterdataGetter.SalesInformations"
                option-label="value"
                :label="$t('editRestaurant.information.salesInformation')"
                options-dense
                dense
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
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-select
                outlined
                v-model="getRestaurantInfoGetter.vipRestaurant.typeOfMenus"
                multiple
                :options="getRestaurantMasterdataGetter.TypeOfMenu"
                option-label="value"
                :label="$t('editRestaurant.information.typeOfMenu')"
                options-dense
                dense
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
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-select
                outlined
                v-model="
                  getRestaurantInfoGetter.vipRestaurant
                    .theAtmosphereOfTheCounters
                "
                multiple
                :options="
                  getRestaurantMasterdataGetter.TheAtmosphereOfTheCounter
                "
                option-label="value"
                options-dense
                :label="
                  $t('editRestaurant.information.theAtmosphereOfTheCounters')
                "
                dense
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
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-input
                outlined
                v-model="getRestaurantInfoGetter.vipRestaurant.remarks"
                multiple
                :label="$t('editRestaurant.information.remarks')"
                dense
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-select
                outlined
                v-model="getRestaurantInfoGetter.vipRestaurant.locations"
                multiple
                :options="getRestaurantMasterdataGetter.Location"
                option-label="value"
                :label="$t('editRestaurant.information.location')"
                options-dense
                dense
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
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-input
                outlined
                dense
                readonly
                @click="displayDialogOpenDate = true"
                :value="
                  getRestaurantInfoGetter.vipRestaurant.openDate
                    ? new Date(
                        getRestaurantInfoGetter.vipRestaurant.openDate
                      ).toLocaleDateString('ja', {
                        year: 'numeric',
                        month: '2-digit',
                      })
                    : null
                "
                debounce="650"
                :label="$t('editRestaurant.information.openDate')"
                :mask="$t('editRestaurant.information.maskDatetime')"
              >
                <template v-slot:prepend>
                  <q-icon name="event" @click="displayDialogOpenDate = true">
                    <q-dialog v-model="displayDialogOpenDate">
                      <v-datepicker
                        :language="languages[language]"
                        :minimumView="'month'"
                        :maximumView="'year'"
                        :initialView="'year'"
                        :inline="true"
                        v-model="getRestaurantInfoGetter.vipRestaurant.openDate"
                        @selected="displayDialogOpenDate = false"
                      />
                    </q-dialog>
                  </q-icon>
                </template>
                <template v-slot:append>
                  <q-icon
                    name="ion-close-circle"
                    @click="
                      getRestaurantInfoGetter.vipRestaurant.openDate = null
                    "
                  />
                </template>
              </q-input>
            </q-item-section>
          </q-item>
        </q-card>
        <q-card v-else>
          <q-card-section>
            {{ $t('onlyForPremiumRestaurant') }}
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator />

      <q-item class="full-width">
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
import { mapActions, mapGetters } from 'vuex';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import Datepicker from 'vuejs-datepicker/dist/vuejs-datepicker.esm.js';
import * as lang from 'vuejs-datepicker/src/locale';
import '../../utils/canvas-toBlob.js';

export default {
  components: {
    VueCropper,
    'v-datepicker': Datepicker,
  },
  name: 'edit-restaurant-information',
  data() {
    return {
      loading: false,
      disableSaveButton: false,
      openDialogToUpload: false,
      confirmToDeletePhoto: false,
      deletePhotoIndex: -1,
      errors: {
        description: false,
        catchphrase: false,
        addressLevelOne: false,
        addressLevelTwo: false,
        addressLevelThree: false,
        specificAddress: false,
      },
      avatar: { photoIndex: 0 },
      selectedImage: {
        index: -1,
        src: '',
        type: '',
      },
      photos: [
        { photoIndex: 1 },
        { photoIndex: 2 },
        { photoIndex: 3 },
        { photoIndex: 4 },
      ],
      language: this.$i18n.locale === 'en-US' ? 'en' : 'ja',
      languages: lang,
      displayDialogOpenDate: false,
      showAddressThree: true,
    };
  },
  computed: {
    ...mapGetters('restaurant', ['getRestaurantInfoGetter']),
    ...mapGetters('masterdata', [
      'getRestaurantMasterdataGetter',
      'getAddressLevelOneGetter',
      'getAddressLevelTwoGetter',
      'getAddressLevelThreeGetter',
    ]),
  },
  methods: {
    ...mapActions('masterdata', ['apiFetchChildProvinceAction']),
    ...mapActions('restaurant', [
      'apiUpdateRestaurantAction',
      'apiUpdateRestaurantPhotoAction',
      'apiDeleteRestaurantPhotoAction',
    ]),

    validateForm(type, value) {
      switch (type) {
        case 'description':
          this.errors.description = value.length > 300;

          return this.errors.description
            ? this.$t('editRestaurant.information.descriptionMaxLength')
            : true;
        case 'catchphrase':
          this.errors.catchphrase = value.length > 35;

          return this.errors.catchphrase
            ? this.$t('editRestaurant.information.catchphraseMaxLength')
            : true;
      }
    },

    onChangeAddress(level) {
      switch (level) {
        case 'One':
          if (this.getRestaurantInfoGetter.addressLevelOne !== null) {
            this.fetchChildProvinceLevel(
              'Two',
              this.getRestaurantInfoGetter.addressLevelOne.id
            );
          }
          this.getRestaurantInfoGetter.addressLevelTwo = null;
          this.getRestaurantInfoGetter.addressLevelThree = null;
          this.showAddressThree = true;

          break;
        case 'Two':
          if (this.getRestaurantInfoGetter.addressLevelTwo !== null) {
            this.fetchChildProvinceLevel(
              'Three',
              this.getRestaurantInfoGetter.addressLevelTwo.id
            );
          }
          this.getRestaurantInfoGetter.addressLevelThree = null;
          this.showAddressThree = true;

          break;
      }
    },
    async fetchChildProvinceLevel(addressLevel, parentId) {
      this.loading = true;
      this.$q.loading.show();

      // Call API fetch Child Province
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { parentId };
      const result = await this.apiFetchChildProvinceAction({
        apolloClient,
        input,
        addressLevel,
      });

      if (result.requestResolved) {
        // Fetch success
        if (addressLevel === 'Three') {
          if (this.getAddressLevelThreeGetter[0].value === '') {
            this.showAddressThree = false;
            this.getRestaurantInfoGetter.addressLevelThree = this.getAddressLevelThreeGetter[0];
          } else {
            this.showAddressThree = true;
          }
        }

        this.loading = false;
        this.$q.loading.hide();
      } else {
        result.systemError
          ? // Fetch failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Fetch failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.fetchChildProvinceFailed'),
              color: 'deep-orange-4',
            });

        this.loading = false;
        this.$q.loading.hide();
      }
    },

    async submit() {
      this.loading = true;
      this.$q.loading.show();

      this.errors.addressLevelOne =
        this.getRestaurantInfoGetter.addressLevelOne === null;
      this.errors.addressLevelTwo =
        this.getRestaurantInfoGetter.addressLevelTwo === null;
      this.errors.addressLevelThree =
        this.getRestaurantInfoGetter.addressLevelThree === null;
      this.errors.specificAddress =
        this.getRestaurantInfoGetter.specificAddress === '' ||
        this.getRestaurantInfoGetter.specificAddress === null;

      const gotError = await Object.values(this.errors).filter(
        (isInvalid) => isInvalid
      );

      if (gotError.length === 0) {
        this.updateRestaurantInformation(this.getRestaurantInfoGetter);
      } else {
        this.loading = false;
        this.$q.loading.hide();
        this.$q.notify({
          message: this.$t('reviewFieldAgain'),
          color: 'teal-8',
        });
      }
    },
    async updateRestaurantInformation(input) {
      // Call API fetch Restaurant Information
      const apolloClient = this.$apollo.provider.defaultClient;
      const result = await this.apiUpdateRestaurantAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Update success
        this.$q.notify({
          message: this.$t(
            'api.editRestaurant.updateRestaurantInformationSuccess'
          ),
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
                'api.editRestaurant.updateRestaurantInformationFailed'
              ),
              color: 'deep-orange-4',
            });

        this.loading = false;
        this.$q.loading.hide();
      }
    },

    onFileChange(e, photoTypes, photoIndex) {
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
            index: photoIndex,
            type: photoTypes,
          };
          this.openDialogToUpload = true;
        };
        reader.readAsDataURL(file);
      } else {
        this.$q.notify({
          message: this.$t('notSupportedFileReaderAPI'),
          color: 'deep-orange-4',
        });
      }
    },
    clearSelectedImage(refs, selectedImage) {
      switch (selectedImage.type) {
        case 'AVATAR':
          refs.changeRetaurantAvatar.value = '';
          break;
        case 'PHOTOS':
          refs.changeRetaurantPhoto[selectedImage.index - 1].value = '';
          break;
      }
    },
    async uploadRestarantPhoto($refs, selectedImage) {
      this.openDialogToUpload = false;
      this.loading = true;

      // Call API upload Restaurant Photo
      $refs.cropper
        .getCroppedCanvas({ maxWidth: 1024, maxHeight: 1024 })
        .toBlob(async (blob) => {
          const apolloClient = this.$apollo.provider.defaultClient;
          const restaurantPhoto = this.getRestaurantInfoGetter.photos;
          const photoIndex = selectedImage.index;
          const photoTypes = selectedImage.type;

          const isAddNew =
            restaurantPhoto[photoIndex] === undefined ||
            restaurantPhoto[photoIndex] === 'FirstIndexForAvatar';

          const formData = new FormData();
          formData.append('restaurant-menu-photo', blob, 'menu-photo.png');

          const photo = formData.entries().next().value[1];
          const input = isAddNew
            ? { restaurantId: this.$route.params.id, photoTypes }
            : {
                restaurantId: this.$route.params.id,
                oldPhotoId: restaurantPhoto[photoIndex].photoId,
                photoTypes,
              };

          const result = await this.apiUpdateRestaurantPhotoAction({
            apolloClient,
            input,
            photo,
            photoIndex,
          });

          if (result.requestResolved) {
            // Upload success
            this.$q.notify({
              message: this.$t(
                'api.editRestaurant.uploadRestaurantPhotoSuccess'
              ),
              color: 'green-5',
            });
            this.clearSelectedImage($refs, selectedImage);
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
                  message: this.$t(
                    'api.editRestaurant.uploadRestaurantPhotoFailed'
                  ),
                  color: 'deep-orange-4',
                });

            this.clearSelectedImage($refs, selectedImage);
            this.loading = false;
          }
        });
    },

    onDeletePhoto(photoIndex) {
      this.confirmToDeletePhoto = true;
      this.deletePhotoIndex = photoIndex;
    },
    async deleteRestaurantPhoto(photoIndex) {
      this.confirmToDeletePhoto = false;
      this.loading = true;

      // Call API Delete Restaurant Photo
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = {
        restaurantId: this.$route.params.id,
        photoId: this.getRestaurantInfoGetter.photos[photoIndex].photoId,
      };
      const result = await this.apiDeleteRestaurantPhotoAction({
        apolloClient,
        input,
        photoIndex,
      });

      if (result.requestResolved) {
        // Delete success
        this.$q.notify({
          message: this.$t('api.editRestaurant.deleteRestaurantPhotoSuccess'),
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
              message: this.$t(
                'api.editRestaurant.deleteRestaurantPhotoFailed'
              ),
              color: 'deep-orange-4',
            });

        this.loading = false;
      }
    },
  },
  created() {},
};
</script>

<style lang="stylus"></style>
