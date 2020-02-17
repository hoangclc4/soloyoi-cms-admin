<template>
  <q-page padding>
    <!-- content -->
    <q-linear-progress v-if="loading" indeterminate />
    <q-card>
      <q-expansion-item
        expand-separator
        switch-toggle-side
        default-opened
        icon="ion-images"
        :label="$t('editRestaurant.menu.photos')"
      >
        <q-dialog v-model="openDialogToUpload" persistent>
          <q-card class="full-width">
            <q-card-section>
              <div class="text-h6">
                {{ $t('editRestaurant.menu.uploadPhoto') }}
              </div>
            </q-card-section>

            <q-card-section>
              <VueCropper
                ref="cropper"
                :aspect-ratio="3 / 2"
                :src="selectedImage.src"
                preview=".preview"
                class="full-width"
                style="max-height: 25em"
              />
            </q-card-section>

            <q-card-section>
              <q-input
                v-model="selectedImage.description"
                :error="errors.photoDescription"
                outlined
                autogrow
                autofocus
                :label="$t('editRestaurant.menu.photoDescription')"
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
                @click="
                  uploadMenuPhoto($refs, getMenuPhotoGetter, selectedImage)
                "
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="confirmToDeletePhoto">
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="ion-trash" color="negative" text-color="white" />
              <span class="q-ml-sm">
                {{ $t('editRestaurant.menu.confirmDeletePhoto') }}
              </span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
              <q-btn
                flat
                :label="$t('delete')"
                @click="deleteMenuPhoto(deletePhotoIndex)"
                color="negative"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-card>
          <q-item>
            <q-item-section
              v-for="photo in photos"
              :key="photo.photoIndex"
              round
              class="self-start"
            >
              <q-img
                spinner-color="orange-2"
                :src="
                  getMenuPhotoGetter[photo.photoIndex]
                    ? getMenuPhotoGetter[photo.photoIndex].photoFullWidthUrl
                    : null
                "
                :ratio="3 / 2"
                class="rounded-borders shadow-8"
              >
                <div class="absolute-bottom-right text-subtitle2">
                  {{ photo.photoIndex + 1 }}
                </div>
              </q-img>
              <q-input
                dense
                readonly
                outlined
                type="textarea"
                rows="2"
                stack-label
                :label="$t('editRestaurant.menu.photoDescription')"
                :value="
                  getMenuPhotoGetter[photo.photoIndex]
                    ? getMenuPhotoGetter[photo.photoIndex].description
                    : ''
                "
              />
              <q-item-label class="row justify-center">
                <q-btn
                  :disable="getMenuPhotoGetter[photo.photoIndex] === undefined"
                  round
                  dense
                  color="negative"
                  icon="ion-trash"
                  class="q-ma-sm"
                  @click="onDeletePhoto(photo.photoIndex)"
                />
                <q-btn
                  :disable="
                    photo.photoIndex !== 0 &&
                      getMenuPhotoGetter[photo.photoIndex - 1] === undefined
                  "
                  round
                  dense
                  color="primary"
                  icon="ion-cloud-upload"
                  @click="$refs.changePhoto[photo.photoIndex].click()"
                  class="q-ma-sm"
                />
                <input
                  @change="(e) => onFileChange(e, photo.photoIndex)"
                  type="file"
                  ref="changePhoto"
                  name="image"
                  accept="image/*"
                  style="display: none;"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        expand-separator
        switch-toggle-side
        default-opened
        icon="ion-menu"
        :label="$t('editRestaurant.menu.listItem')"
      >
        <q-dialog
          v-for="category in dialogMenuCategory"
          :key="category.title"
          v-model="category.openDialog"
        >
          <q-card class="full-width">
            <q-card-section>
              <div class="text-h6">{{ category.title }}</div>
            </q-card-section>

            <q-card-section>
              <q-input
                v-if="category.isAddNew"
                v-model="newCategory.name"
                :error="errors.newCategory"
                outlined
                autogrow
                autofocus
                :label="$t('editRestaurant.menu.categoryName')"
              />
              <q-input
                v-else
                v-model="updatedCategory.name"
                :error="errors.updatedCategory"
                outlined
                autogrow
                autofocus
                :label="$t('editRestaurant.menu.categoryName')"
              />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn
                flat
                :label="$t('cancel')"
                @click="clearInputCategory(category.isAddNew)"
                v-close-popup
              />
              <q-btn
                color="primary"
                icon-right="ion-send"
                :label="category.submitLabel"
                @click="category.submitAction"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="openDialogToConfirmDeleteCategory">
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="ion-trash" color="negative" text-color="white" />
              <span class="q-ml-sm">
                {{ $t('editRestaurant.menu.confirmDeleteCategory') }}
              </span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
              <q-btn
                flat
                :label="$t('delete')"
                @click="deleteCategory(deletionCategory)"
                color="negative"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog
          v-for="item in dialogMenuItem"
          :key="item.title"
          v-model="item.openDialog"
        >
          <q-card class="full-width">
            <q-card-section>
              <div class="text-h6">
                {{ `${item.title} - ${menuItemForm.categoryName}` }}
              </div>
            </q-card-section>

            <q-card-section class="q-py-none">
              <q-input
                v-model="menuItemForm.name"
                :error="errors.menuItem.name"
                outlined
                autogrow
                autofocus
                :label="$t('editRestaurant.menu.menuItemName')"
                type="text"
              />
            </q-card-section>
            <q-card-section class="q-py-none">
              <q-input
                v-model="menuItemForm.price"
                :error="errors.menuItem.price"
                outlined
                :label="$t('editRestaurant.menu.menuItemPrice')"
                prefix="￥"
                type="number"
                @input="onNewMenuChangeValue(menuItemForm.price)"
              />
            </q-card-section>
            <q-card-section class="q-py-none">
              <q-input
                v-model="menuItemForm.afterTaxedPrice"
                :error="errors.menuItem.price"
                outlined
                :disable="menuItemForm.typeOfTaxed !== 4"
                :label="
                  menuItemForm.taxFlag
                    ? $t('editRestaurant.menu.taxed')
                    : $t('editRestaurant.menu.noTax')
                "
                prefix="￥"
                type="number"
              />
            </q-card-section>
            <q-card-section class="q-py-none">
              <span>
                {{
                  menuItemForm.taxFlag
                    ? `${$t('editRestaurant.menu.createNewMenuItemApplyTax')}`
                    : `${$t('editRestaurant.menu.createNewMenuItemNoApplyTax')}`
                }}
              </span>
            </q-card-section>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat :label="$t('cancel')" v-close-popup />
              <q-btn
                color="primary"
                icon-right="ion-send"
                :label="item.submitLabel"
                @click="item.submitAction"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="openDialogToConfirmDeleteMenuItem">
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="ion-trash" color="negative" text-color="white" />
              <span class="q-ml-sm">
                {{ $t('editRestaurant.menu.confirmDeleteMenuItem') }}
              </span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
              <q-btn
                flat
                :label="$t('delete')"
                @click="deleteMenuItem(deletionMenuItem)"
                color="negative"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-card>
          <q-tabs
            v-model="tab"
            dense
            active-color="primary"
            align="justify"
            class="text-grey shadow-2"
            inline-label
          >
            <q-tab
              name="food"
              icon="ion-pizza"
              :label="$t('editRestaurant.menu.food')"
            />
            <q-tab
              name="drink"
              icon="ion-beer"
              :label="$t('editRestaurant.menu.drink')"
            />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="food">
              <q-btn
                color="primary"
                :label="$t('editRestaurant.menu.createNewCategory')"
                class="q-mb-md"
                @click="onCreateNewCategory('FOOD')"
              />
              <q-table
                :no-data-label="$t('editRestaurant.menu.haveNotMenuLabel')"
                v-for="food in getMenuFoodGetter"
                :key="food.menuCategoryId"
                :data="food.menuList"
                :columns="columns"
                row-key="createdAt"
                :filter="filter[food.menuCategoryId]"
                separator="cell"
                wrap-cells
                :dense="$q.screen.lt.md"
                binary-state-sort
                class="full-width item-table q-mb-md"
              >
                <template v-slot:top>
                  <div class="row items-center no-wrap" style="width: 100%">
                    <div class="col-4 items-start">
                      <q-btn
                        dense
                        round
                        color="negative"
                        icon="ion-trash"
                        @click="onDeleteCategory(food.menuCategoryId, 'FOOD')"
                      />
                      <q-btn
                        dense
                        round
                        color="secondary"
                        icon="ion-create"
                        @click="
                          onEditCategory(food.menuCategoryId, food.name, 'FOOD')
                        "
                        class="q-mx-sm"
                      />
                      <span class="q-table__title">
                        {{ food.name }}
                      </span>
                    </div>

                    <div
                      class="column items-center"
                      style="text-align: center;"
                    >
                      <span class="q-table__title" style="padding: 0 15px;">
                        {{
                          food.taxFlag
                            ? `${$t('editRestaurant.menu.taxedTitle')} (10%)`
                            : `${$t('editRestaurant.menu.noTaxedTitle')} (0%)`
                        }}
                      </span>
                      <q-btn-toggle
                        v-model="food.typeOfTaxed"
                        color="white"
                        text-color="primary"
                        toggle-color="primary"
                        :options="[
                          {
                            label: `${$t('editRestaurant.menu.noTax')}`,
                            value: 0,
                            slot: 'noTax',
                          },
                          {
                            label: `${$t(
                              'editRestaurant.menu.typeOfTaxedRound'
                            )}`,
                            value: 1,
                            slot: 'round',
                          },
                          {
                            label: `${$t(
                              'editRestaurant.menu.typeOfTaxedFloor'
                            )}`,
                            value: 2,
                            slot: 'floor',
                          },
                          {
                            label: `${$t(
                              'editRestaurant.menu.typeOfTaxedCeil'
                            )}`,
                            value: 3,
                            slot: 'ceil',
                          },
                          {
                            label: `${$t(
                              'editRestaurant.menu.typeOfTaxedManual'
                            )}`,
                            value: 4,
                            slot: 'manual',
                          },
                        ]"
                        @input="updateCategoryTax(food)"
                      >
                        <template v-slot:round>
                          <q-tooltip
                            anchor="top middle"
                            self="center middle"
                            :content-style="{
                              background: 'white',
                              color: 'Black',
                              'font-size': '18px',
                            }"
                            >{{
                              `${$t(
                                'editRestaurant.menu.typeOfTaxedRoundDescription'
                              )}`
                            }}</q-tooltip
                          >
                        </template>
                        <template v-slot:floor>
                          <q-tooltip
                            anchor="top middle"
                            self="center middle"
                            :content-style="{
                              background: 'white',
                              color: 'Black',
                              'font-size': '18px',
                            }"
                            >{{
                              `${$t(
                                'editRestaurant.menu.typeOfTaxedFloorDescription'
                              )}`
                            }}</q-tooltip
                          >
                        </template>
                        <template v-slot:ceil>
                          <q-tooltip
                            anchor="top middle"
                            self="center middle"
                            :content-style="{
                              background: 'white',
                              color: 'Black',
                              'font-size': '18px',
                            }"
                            >{{
                              `${$t(
                                'editRestaurant.menu.typeOfTaxedCeilDescription'
                              )}`
                            }}</q-tooltip
                          >
                        </template>
                        <template v-slot:manual>
                          <q-tooltip
                            anchor="top middle"
                            self="center middle"
                            :content-style="{
                              background: 'white',
                              color: 'Black',
                              'font-size': '18px',
                            }"
                            >{{
                              `${$t(
                                'editRestaurant.menu.typeOfTaxedManualDescription'
                              )}`
                            }}</q-tooltip
                          >
                        </template>
                      </q-btn-toggle>
                    </div>

                    <div class="col-4 items-end">
                      <div class="row inline no-wrap">
                        <q-input
                          outlined
                          dense
                          debounce="300"
                          color="primary"
                          v-model="filter[food.menuCategoryId]"
                          :placeholder="$t('search')"
                          class="q-mx-lg"
                        >
                          <template v-slot:append>
                            <q-icon name="search" />
                          </template>
                        </q-input>
                        <q-btn
                          color="primary"
                          :label="$t('editRestaurant.menu.addItem')"
                          @click="
                            onCreateNewMenuItem(
                              food.name,
                              food.menuCategoryId,
                              'FOOD',
                              food.taxFlag,
                              food.typeOfTaxed
                            )
                          "
                        />
                      </div>
                    </div>
                  </div>
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
                          @click="
                            onEditMenuItem(
                              food.name,
                              props.row.menuId,
                              food.menuCategoryId,
                              props.row.name,
                              props.row.price,
                              'FOOD',
                              props.row.afterTaxedPrice,
                              food.taxFlag,
                              food.typeOfTaxed
                            )
                          "
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-btn
                          dense
                          flat
                          color="negative"
                          icon="ion-trash"
                          @click="onDeleteMenuItem(props.row.menuId, 'FOOD')"
                        />
                      </q-item-section>
                    </q-item>
                  </q-td>
                </template>

                <template v-slot:body-cell-price="props">
                  <q-td
                    :props="props"
                    :class="{
                      'text-green-9': food.taxFlag,
                    }"
                  >
                    <span
                      style="font-size: 13px !important"
                      :class="{ 'text-blue-12': props.row.isManual }"
                    >
                      {{
                        food.taxFlag
                          ? `￥ ${props.row.afterTaxedPrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} (${
                              props.row.isManual
                                ? $t('editRestaurant.menu.typeOfTaxedManual')
                                : $t('editRestaurant.menu.taxed')
                            })`
                          : `￥ ${props.row.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} (${$t(
                              'editRestaurant.menu.noTax'
                            )})`
                      }}
                    </span>
                  </q-td>
                </template>
              </q-table>
            </q-tab-panel>

            <q-tab-panel name="drink">
              <q-btn
                color="primary"
                :label="$t('editRestaurant.menu.createNewCategory')"
                class="q-mb-md"
                @click="onCreateNewCategory('DRINK')"
              />
              <q-table
                :no-data-label="$t('editRestaurant.menu.haveNotMenuLabel')"
                v-for="drink in getMenuDrinkGetter"
                :key="drink.menuCategoryId"
                :data="drink.menuList"
                :columns="columns"
                row-key="createdAt"
                :filter="filter[drink.menuCategoryId]"
                separator="cell"
                wrap-cells
                :dense="$q.screen.lt.md"
                binary-state-sort
                class="full-width item-table q-mb-md"
              >
                <template v-slot:top>
                  <div class="row items-center no-wrap" style="width: 100%">
                    <div class="col-4 items-start">
                      <q-btn
                        dense
                        round
                        color="negative"
                        icon="ion-trash"
                        @click="onDeleteCategory(drink.menuCategoryId, 'DRINK')"
                      />
                      <q-btn
                        dense
                        round
                        color="secondary"
                        icon="ion-create"
                        @click="
                          onEditCategory(
                            drink.menuCategoryId,
                            drink.name,
                            'DRINK'
                          )
                        "
                        class="q-mx-sm"
                      />
                      <span class="q-table__title">
                        {{ drink.name }}
                      </span>
                    </div>

                    <div
                      class="column items-center"
                      style="text-align: center;"
                    >
                      <span class="q-table__title" style="padding: 0 15px;">
                        {{
                          drink.taxFlag
                            ? `${$t('editRestaurant.menu.taxedTitle')} (10%)`
                            : `${$t('editRestaurant.menu.noTaxedTitle')} (0%)`
                        }}
                      </span>
                      <q-btn-toggle
                        v-model="drink.typeOfTaxed"
                        color="white"
                        text-color="primary"
                        toggle-color="primary"
                        :options="[
                          {
                            label: `${$t('editRestaurant.menu.noTax')}`,
                            value: 0,
                            slot: 'noTax',
                          },
                          {
                            label: `${$t(
                              'editRestaurant.menu.typeOfTaxedRound'
                            )}`,
                            value: 1,
                            slot: 'round',
                          },
                          {
                            label: `${$t(
                              'editRestaurant.menu.typeOfTaxedFloor'
                            )}`,
                            value: 2,
                            slot: 'floor',
                          },
                          {
                            label: `${$t(
                              'editRestaurant.menu.typeOfTaxedCeil'
                            )}`,
                            value: 3,
                            slot: 'ceil',
                          },
                          {
                            label: `${$t(
                              'editRestaurant.menu.typeOfTaxedManual'
                            )}`,
                            value: 4,
                            slot: 'manual',
                          },
                        ]"
                        @input="updateCategoryTax(drink)"
                      >
                        <template v-slot:round>
                          <q-tooltip
                            anchor="top middle"
                            self="center middle"
                            :content-style="{
                              background: 'white',
                              color: 'Black',
                              'font-size': '18px',
                            }"
                            >{{
                              `${$t(
                                'editRestaurant.menu.typeOfTaxedRoundDescription'
                              )}`
                            }}</q-tooltip
                          >
                        </template>
                        <template v-slot:floor>
                          <q-tooltip
                            anchor="top middle"
                            self="center middle"
                            :content-style="{
                              background: 'white',
                              color: 'Black',
                              'font-size': '18px',
                            }"
                            >{{
                              `${$t(
                                'editRestaurant.menu.typeOfTaxedFloorDescription'
                              )}`
                            }}</q-tooltip
                          >
                        </template>
                        <template v-slot:ceil>
                          <q-tooltip
                            anchor="top middle"
                            self="center middle"
                            :content-style="{
                              background: 'white',
                              color: 'Black',
                              'font-size': '18px',
                            }"
                            >{{
                              `${$t(
                                'editRestaurant.menu.typeOfTaxedCeilDescription'
                              )}`
                            }}</q-tooltip
                          >
                        </template>
                        <template v-slot:manual>
                          <q-tooltip
                            anchor="top middle"
                            self="center middle"
                            :content-style="{
                              background: 'white',
                              color: 'Black',
                              'font-size': '18px',
                            }"
                            >{{
                              `${$t(
                                'editRestaurant.menu.typeOfTaxedManualDescription'
                              )}`
                            }}</q-tooltip
                          >
                        </template>
                      </q-btn-toggle>
                    </div>

                    <div class="col-4 items-end">
                      <div class="row inline no-wrap">
                        <q-input
                          outlined
                          dense
                          debounce="300"
                          color="primary"
                          v-model="filter[drink.menuCategoryId]"
                          :placeholder="$t('search')"
                          class="q-mx-lg"
                        >
                          <template v-slot:append>
                            <q-icon name="search" />
                          </template>
                        </q-input>
                        <q-btn
                          color="primary"
                          :label="$t('editRestaurant.menu.addItem')"
                          @click="
                            onCreateNewMenuItem(
                              drink.name,
                              drink.menuCategoryId,
                              'DRINK',
                              drink.taxFlag,
                              drink.typeOfTaxed
                            )
                          "
                        />
                      </div>
                    </div>
                  </div>
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
                          @click="
                            onEditMenuItem(
                              drink.name,
                              props.row.menuId,
                              drink.menuCategoryId,
                              props.row.name,
                              props.row.price,
                              'DRINK',
                              props.row.afterTaxedPrice,
                              drink.taxFlag,
                              drink.typeOfTaxed
                            )
                          "
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-btn
                          dense
                          flat
                          color="negative"
                          icon="ion-trash"
                          @click="onDeleteMenuItem(props.row.menuId, 'DRINK')"
                        />
                      </q-item-section>
                    </q-item>
                  </q-td>
                </template>

                <template v-slot:body-cell-price="props">
                  <q-td
                    :props="props"
                    :class="{
                      'text-green-9': drink.taxFlag,
                    }"
                  >
                    <span
                      style="font-size: 13px !important"
                      :class="{ 'text-blue-12': props.row.isManual }"
                    >
                      {{
                        drink.taxFlag
                          ? `￥ ${props.row.afterTaxedPrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} (${
                              props.row.isManual
                                ? $t('editRestaurant.menu.typeOfTaxedManual')
                                : $t('editRestaurant.menu.taxed')
                            })`
                          : `￥ ${props.row.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} (${$t(
                              'editRestaurant.menu.noTax'
                            )})`
                      }}
                    </span>
                  </q-td>
                </template>
              </q-table>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </q-expansion-item>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
  components: {
    VueCropper,
  },
  name: 'edit-restaurant-menu',
  data() {
    return {
      loading: false,
      errors: {
        photoDescription: false,
        newCategory: false,
        updatedCategory: false,
        menuItem: { name: false, price: false },
      },
      openDialogToUpload: false,
      selectedImage: {
        index: -1,
        src: '',
        description: '',
      },
      confirmToDeletePhoto: false,
      deletePhotoIndex: -1,
      photos: [
        { photoIndex: 0 },
        { photoIndex: 1 },
        { photoIndex: 2 },
        { photoIndex: 3 },
        { photoIndex: 4 },
      ],
      tab: 'food',
      filter: {},
      dialogMenuCategory: [
        {
          isAddNew: true,
          title: this.$t('editRestaurant.menu.createNewCategory'),
          openDialog: false,
          submitLabel: this.$t('create'),
          submitAction: () => this.createNewCategory(),
        },
        {
          isAddNew: false,
          title: this.$t('editRestaurant.menu.editCategory'),
          openDialog: false,
          submitLabel: this.$t('update'),
          submitAction: () => this.updateCategory(),
        },
      ],
      openDialogToConfirmDeleteCategory: false,
      newCategory: { name: '', menuTypes: '' },
      updatedCategory: { id: '', name: '', menuTypes: '' },
      deletionCategory: { id: '', menuTypes: '' },
      dialogMenuItem: [
        {
          title: this.$t('editRestaurant.menu.createNewMenuItem'),
          openDialog: false,
          submitLabel: this.$t('create'),
          submitAction: () => this.createNewMenuItem(),
        },
        {
          title: this.$t('editRestaurant.menu.editMenuItem'),
          openDialog: false,
          submitLabel: this.$t('update'),
          submitAction: () => this.updateMenuItem(),
        },
      ],
      openDialogToConfirmDeleteMenuItem: false,
      menuItemForm: {
        categoryName: '',
        menuId: '',
        menuCategoryId: '',
        name: '',
        price: 0,
        afterTaxedPrice: 0,
        menuTypes: '',
        taxFlag: false,
        typeOfTaxed: 0,
      },
      deletionMenuItem: { id: '', menuTypes: '' },
      columns: [
        {
          name: 'action',
          align: 'right',
          label: this.$t('editRestaurant.menu.actionHeader'),
          classes: 'bg-grey-2',
        },
        {
          name: 'name',
          required: true,
          align: 'right',
          label: this.$t('editRestaurant.menu.nameHeader'),
          field: 'name',
          sortable: true,
        },
        {
          name: 'price',
          required: true,
          align: 'right',
          label: this.$t('editRestaurant.menu.priceHeader'),
          sortable: true,
        },
        {
          name: 'createdAt',
          align: 'right',
          label: this.$t('editRestaurant.menu.createdAtHeader'),
          field: (row) => new Date(row.createdAt),
          format: (val) =>
            `${val.toLocaleDateString('ja')} ${val.toLocaleTimeString('ja')}`,
          sortable: true,
          sort: (a, b) => b - a,
        },
      ],
    };
  },
  computed: {
    ...mapGetters('restaurant', [
      'getRestaurantInfoGetter',
      'getMenuPhotoGetter',
      'getMenuFoodGetter',
      'getMenuDrinkGetter',
    ]),
  },
  methods: {
    ...mapActions('restaurant', [
      'apiUploadRestaurantMenuPhotoAction',
      'apiDeleteRestaurantMenuPhotoAction',
      'apiFetchRestaurantMenuItemAction',
      'apiCreateRestaurantMenuCategoryAction',
      'apiCreateRestaurantMenuItemAction',
      'apiUpdateRestaurantMenuCategoryAction',
      'apiDeleteRestaurantMenuCategoryAction',
      'apiUpdateRestaurantMenuItemAction',
      'apiDeleteRestaurantMenuItemAction',
      'apiUpdateCategoryTaxAction',
    ]),

    onNewMenuChangeValue(value) {
      switch (this.menuItemForm.typeOfTaxed) {
        case 1: // 4 give 5 taken
          this.menuItemForm.afterTaxedPrice = +Math.round(
            (value * (100 + 10)) / 100
          );
          break;
        case 2: // Remove the decimal point
          this.menuItemForm.afterTaxedPrice = +Math.floor(
            (value * (100 + 10)) / 100
          );
          break;
        case 3:  // Remove decimal point and round up to the next higher integer
          this.menuItemForm.afterTaxedPrice = +Math.ceil(
            (value * (100 + 10)) / 100
          );
          break;
        default: // No tax
          this.menuItemForm.afterTaxedPrice = this.menuItemForm.price;
          break;
      }
    },

    async updateCategoryTax(category) {
      let taxRate = 10;

      switch (category.typeOfTaxed) {
        case 1: // 4 give 5 taken
          category.taxFlag = true;
          category.menuList.map((menu) => {
            menu.afterTaxedPrice = +Math.round(
              (menu.price * (100 + taxRate)) / 100
            );
            menu.isManual = false;
          });
          break;
        case 2: // Remove the decimal point
          category.taxFlag = true;
          category.menuList.map((menu) => {
            menu.afterTaxedPrice = +Math.floor(
              (menu.price * (100 + taxRate)) / 100
            );
            menu.isManual = false;
          });
          break;
        case 3: // Remove decimal point and round up to the next higher integer
          category.taxFlag = true;
          category.menuList.map((menu) => {
            menu.afterTaxedPrice = +Math.ceil(
              (menu.price * (100 + taxRate)) / 100
            );
            menu.isManual = false;
          });
          break;
        case 4: // Manual input
          category.taxFlag = true;
          taxRate = 0;
          break;
        default:
          // No tax
          taxRate = 0;
          category.taxFlag = false;
          category.menuList.map((menu) => {
            menu.afterTaxedPrice = menu.price;
            menu.isManual = false;
          });
          break;
      }

      this.loading = true;
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = {
        menuCategoryId: category.menuCategoryId,
        taxRate,
        taxFlag: category.taxFlag,
        typeOfTaxed: +category.typeOfTaxed,
        menuList: category.menuList.map((menu) => {
          return {
            menuId: menu.menuId,
            name: menu.name,
            price: menu.price,
            afterTaxedPrice: menu.afterTaxedPrice,
            isManual: menu.isManual,
            createdAt: menu.createdAt,
          };
        }),
      };

      const result = await this.apiUpdateCategoryTaxAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Update success
        this.$q.notify({
          message: this.$t('api.editRestaurant.apiUpdateCategoryTaxSuccess'),
          color: 'green-5',
        });
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
                'api.editRestaurant.apiUpdateCategoryTaxFailded'
              ),
              color: 'deep-orange-4',
            });
      }
      this.loading = false;
    },

    /* Menu Photo */
    onFileChange(e, photoIndex) {
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
            description: '',
          };
          this.errors.photoDescription = false;
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
      refs.changePhoto[selectedImage.index].value = '';
    },
    async uploadMenuPhoto($refs, menuPhoto, selectedImage) {
      this.openDialogToUpload = false;
      this.loading = true;

      const description = selectedImage.description;

      this.errors.photoDescription = description === '';

      if (this.errors.photoDescription) {
        this.openDialogToUpload = true;
        this.$q.notify({
          message: this.$t('reviewFieldAgain'),
          color: 'teal-8',
        });
        this.loading = false;
      } else {
        // Call API upload Restaurant Menu Photo
        $refs.cropper.getCroppedCanvas().toBlob(async (blob) => {
          const apolloClient = this.$apollo.provider.defaultClient;
          const photoIndex = selectedImage.index;

          const isAddNew = menuPhoto[photoIndex] ? false : true;

          const formData = new FormData();
          formData.append('restaurant-menu-photo', blob, 'menu-photo.png');

          const photo = formData.entries().next().value[1];
          const input = isAddNew
            ? {
                restaurantId: this.$route.params.id,
                menuTypes: 'FOOD',
                description,
              }
            : {
                restaurantId: this.$route.params.id,
                oldPhotoId: menuPhoto[photoIndex].photoId,
                description,
              };

          const result = await this.apiUploadRestaurantMenuPhotoAction({
            apolloClient,
            input,
            photo,
            photoIndex,
            isAddNew,
          });

          if (result.requestResolved) {
            // Upload success

            this.$q.notify({
              message: this.$t(
                'api.editRestaurant.uploadRestaurantMenuPhotoSuccess'
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
                    'api.editRestaurant.uploadRestaurantMenuPhotoFailed'
                  ),
                  color: 'deep-orange-4',
                });

            this.clearSelectedImage($refs, selectedImage);
            this.loading = false;
          }
        });
      }
    },

    onDeletePhoto(photoIndex) {
      this.confirmToDeletePhoto = true;
      this.deletePhotoIndex = photoIndex;
    },
    async deleteMenuPhoto(photoIndex) {
      this.loading = true;

      // Call API Delete Restaurant Photo
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = {
        restaurantId: this.$route.params.id,
        oldPhotoId: this.getMenuPhotoGetter[photoIndex].photoId,
      };
      const result = await this.apiDeleteRestaurantMenuPhotoAction({
        apolloClient,
        input,
        photoIndex,
      });

      if (result.requestResolved) {
        // Delete success
        this.$q.notify({
          message: this.$t(
            'api.editRestaurant.deleteRestaurantMenuPhotoSuccess'
          ),
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
                'api.editRestaurant.deleteRestaurantMenuPhotoFailed'
              ),
              color: 'deep-orange-4',
            });

        this.loading = false;
      }
    },

    /* Menu Category */
    clearInputCategory(isAddNew) {
      if (isAddNew) {
        this.newCategory.name = '';
        this.errors.newCategory = false;
      }
    },
    onCreateNewCategory(menuTypes) {
      this.newCategory.menuTypes = menuTypes;
      this.errors.newCategory = false;
      this.dialogMenuCategory[0].openDialog = true;
    },
    onEditCategory(id, name, menuTypes) {
      this.updatedCategory = {
        id,
        name,
        menuTypes,
      };
      this.errors.updatedCategory = false;
      this.dialogMenuCategory[1].openDialog = true;
    },
    onDeleteCategory(id, menuTypes) {
      this.deletionCategory = {
        id,
        menuTypes,
      };
      this.openDialogToConfirmDeleteCategory = true;
    },
    async createNewCategory() {
      this.dialogMenuCategory[0].openDialog = false;
      this.loading = true;

      this.errors.newCategory = this.newCategory.name === '';

      if (this.errors.newCategory) {
        this.dialogMenuCategory[0].openDialog = true;
        this.$q.notify({
          message: this.$t('reviewFieldAgain'),
          color: 'teal-8',
        });
        this.loading = false;
      } else {
        // Call API create new Restaurant Menu Category
        const apolloClient = this.$apollo.provider.defaultClient;
        const input = {
          restaurantId: this.$route.params.id,
          name: this.newCategory.name,
          menuTypes: this.newCategory.menuTypes,
        };
        const result = await this.apiCreateRestaurantMenuCategoryAction({
          apolloClient,
          input,
        });

        if (result.requestResolved) {
          // Create success
          const isAddNew = true;
          switch (this.newCategory.menuTypes) {
            case 'FOOD':
              this.fetchRestaurantMenuFood().then(() => {
                this.clearInputCategory(isAddNew);
                this.$q.notify({
                  message: this.$t(
                    'api.editRestaurant.createRestaurantMenuCategorySuccess'
                  ),
                  color: 'green-5',
                });
                this.loading = false;
              });
              break;
            case 'DRINK':
              this.fetchRestaurantMenuDrink().then(() => {
                this.clearInputCategory(isAddNew);
                this.$q.notify({
                  message: this.$t(
                    'api.editRestaurant.createRestaurantMenuCategorySuccess'
                  ),
                  color: 'green-5',
                });
                this.loading = false;
              });
              break;
          }
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
                  'api.editRestaurant.createRestaurantMenuCategoryFailed'
                ),
                color: 'deep-orange-4',
              });

          this.loading = false;
        }
      }
    },
    async updateCategory() {
      this.dialogMenuCategory[1].openDialog = false;
      this.loading = true;

      this.errors.updatedCategory = this.updatedCategory.name === '';

      if (this.errors.updatedCategory) {
        this.dialogMenuCategory[1].openDialog = true;
        this.$q.notify({
          message: this.$t('reviewFieldAgain'),
          color: 'teal-8',
        });
        this.loading = false;
      } else {
        // Call API create new Restaurant Menu Category
        const apolloClient = this.$apollo.provider.defaultClient;
        const input = {
          restaurantId: this.$route.params.id,
          menuCategoryId: this.updatedCategory.id,
          name: this.updatedCategory.name,
          menuTypes: this.updatedCategory.menuTypes,
        };
        const result = await this.apiUpdateRestaurantMenuCategoryAction({
          apolloClient,
          input,
        });

        if (result.requestResolved) {
          // Update success
          const isAddNew = false;
          switch (this.updatedCategory.menuTypes) {
            case 'FOOD':
              this.fetchRestaurantMenuFood().then(() => {
                this.clearInputCategory(isAddNew);
                this.$q.notify({
                  message: this.$t(
                    'api.editRestaurant.updateRestaurantMenuCategorySuccess'
                  ),
                  color: 'green-5',
                });
                this.loading = false;
              });
              break;
            case 'DRINK':
              this.fetchRestaurantMenuDrink().then(() => {
                this.clearInputCategory(isAddNew);
                this.$q.notify({
                  message: this.$t(
                    'api.editRestaurant.updateRestaurantMenuCategorySuccess'
                  ),
                  color: 'green-5',
                });
                this.loading = false;
              });
              break;
          }
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
                  'api.editRestaurant.updateRestaurantMenuCategoryFailed'
                ),
                color: 'deep-orange-4',
              });

          this.loading = false;
        }
      }
    },
    async deleteCategory(deletionCategory) {
      this.openDialogToConfirmDeleteCategory = false;
      this.loading = true;

      // Call API create new Restaurant Menu Category
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = {
        restaurantId: this.$route.params.id,
        menuCategoryId: deletionCategory.id,
      };
      const result = await this.apiDeleteRestaurantMenuCategoryAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Delete success
        switch (deletionCategory.menuTypes) {
          case 'FOOD':
            this.fetchRestaurantMenuFood().then(() => {
              this.$q.notify({
                message: this.$t(
                  'api.editRestaurant.deleteRestaurantMenuCategorySuccess'
                ),
                color: 'green-5',
              });
              this.loading = false;
            });
            break;
          case 'DRINK':
            this.fetchRestaurantMenuDrink().then(() => {
              this.$q.notify({
                message: this.$t(
                  'api.editRestaurant.deleteRestaurantMenuCategorySuccess'
                ),
                color: 'green-5',
              });
              this.loading = false;
            });
            break;
        }
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
                'api.editRestaurant.deleteRestaurantMenuCategoryFailed'
              ),
              color: 'deep-orange-4',
            });

        this.loading = false;
      }
    },

    /* Menu Item */
    onCreateNewMenuItem(
      categoryName,
      menuCategoryId,
      menuTypes,
      taxFlag,
      typeOfTaxed
    ) {
      this.menuItemForm = {
        categoryName,
        menuCategoryId,
        name: '',
        price: 0,
        afterTaxedPrice: 0,
        menuTypes,
        taxFlag,
        typeOfTaxed,
      };
      this.errors.menuItem = { name: false, price: false };
      this.dialogMenuItem[0].openDialog = true;
    },
    onEditMenuItem(
      categoryName,
      menuId,
      menuCategoryId,
      name,
      price,
      menuTypes,
      afterTaxedPrice,
      taxFlag,
      typeOfTaxed
    ) {
      this.menuItemForm = {
        categoryName,
        menuId,
        menuCategoryId,
        name,
        price,
        menuTypes,
        afterTaxedPrice,
        taxFlag,
        typeOfTaxed,
      };
      this.errors.menuItem = { name: false, price: false };
      this.dialogMenuItem[1].openDialog = true;
    },
    onDeleteMenuItem(id, menuTypes) {
      this.deletionMenuItem = {
        id,
        menuTypes,
      };
      this.openDialogToConfirmDeleteMenuItem = true;
    },
    async createNewMenuItem() {
      this.dialogMenuItem[0].openDialog = false;
      this.loading = true;

      this.errors.menuItem = {
        name: this.menuItemForm.name === '',
        price: this.menuItemForm.price === '',
      };

      if (this.errors.menuItem.name || this.errors.menuItem.price) {
        this.dialogMenuItem[0].openDialog = true;
        this.$q.notify({
          message: this.$t('reviewFieldAgain'),
          color: 'teal-8',
        });
        this.loading = false;
      } else {
        // Call API create new Restaurant Menu Item
        const apolloClient = this.$apollo.provider.defaultClient;
        const input = {
          restaurantId: this.$route.params.id,
          menuCategoryId: this.menuItemForm.menuCategoryId,
          name: this.menuItemForm.name,
          price: parseInt(this.menuItemForm.price),
          afterTaxedPrice: +this.menuItemForm.afterTaxedPrice,
        };
        const result = await this.apiCreateRestaurantMenuItemAction({
          apolloClient,
          input,
        });

        if (result.requestResolved) {
          // Create success
          switch (this.menuItemForm.menuTypes) {
            case 'FOOD':
              this.fetchRestaurantMenuFood().then(() => {
                this.$q.notify({
                  message: this.$t(
                    'api.editRestaurant.createRestaurantMenuItemSuccess'
                  ),
                  color: 'green-5',
                });
                this.loading = false;
              });
              break;
            case 'DRINK':
              this.fetchRestaurantMenuDrink().then(() => {
                this.$q.notify({
                  message: this.$t(
                    'api.editRestaurant.createRestaurantMenuItemSuccess'
                  ),
                  color: 'green-5',
                });
                this.loading = false;
              });
              break;
          }
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
                  'api.editRestaurant.createRestaurantMenuItemFailed'
                ),
                color: 'deep-orange-4',
              });

          this.loading = false;
        }
      }
    },
    async updateMenuItem() {
      this.dialogMenuItem[1].openDialog = false;
      this.loading = true;

      this.errors.menuItem = {
        name: this.menuItemForm.name === '',
        price: this.menuItemForm.price === '',
      };

      if (this.errors.menuItem.name || this.errors.menuItem.price) {
        this.dialogMenuItem[1].openDialog = true;
        this.$q.notify({
          message: this.$t('reviewFieldAgain'),
          color: 'teal-8',
        });
        this.loading = false;
      } else {
        // Call API create new Restaurant Menu Item
        const apolloClient = this.$apollo.provider.defaultClient;
        const input = {
          restaurantId: this.$route.params.id,
          menuId: this.menuItemForm.menuId,
          menuCategoryId: this.menuItemForm.menuCategoryId,
          name: this.menuItemForm.name,
          price: parseInt(this.menuItemForm.price),
          afterTaxedPrice: +this.menuItemForm.afterTaxedPrice,
          isManual: this.menuItemForm.typeOfTaxed === 4,
        };
        const result = await this.apiUpdateRestaurantMenuItemAction({
          apolloClient,
          input,
          menuTypes: this.menuItemForm.menuTypes,
        });

        if (result.requestResolved) {
          // Update success
          switch (this.menuItemForm.menuTypes) {
            case 'FOOD':
              this.fetchRestaurantMenuFood().then(() => {
                this.$q.notify({
                  message: this.$t(
                    'api.editRestaurant.updateRestaurantMenuItemSuccess'
                  ),
                  color: 'green-5',
                });
                this.loading = false;
              });
              break;
            case 'DRINK':
              this.fetchRestaurantMenuDrink().then(() => {
                this.$q.notify({
                  message: this.$t(
                    'api.editRestaurant.updateRestaurantMenuItemSuccess'
                  ),
                  color: 'green-5',
                });
                this.loading = false;
              });
              break;
          }
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
                  'api.editRestaurant.updateRestaurantMenuItemFailed'
                ),
                color: 'deep-orange-4',
              });

          this.loading = false;
        }
      }
    },
    async deleteMenuItem(deletionMenuItem) {
      this.openDialogToConfirmDeleteMenuItem = false;
      this.loading = true;

      // Call API create new Restaurant Menu Category
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = {
        restaurantId: this.$route.params.id,
        menuId: deletionMenuItem.id,
      };
      const result = await this.apiDeleteRestaurantMenuItemAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Delete success
        switch (deletionMenuItem.menuTypes) {
          case 'FOOD':
            this.fetchRestaurantMenuFood().then(() => {
              this.$q.notify({
                message: this.$t(
                  'api.editRestaurant.deleteRestaurantMenuItemSuccess'
                ),
                color: 'green-5',
              });
              this.loading = false;
            });
            break;
          case 'DRINK':
            this.fetchRestaurantMenuDrink().then(() => {
              this.$q.notify({
                message: this.$t(
                  'api.editRestaurant.deleteRestaurantMenuItemSuccess'
                ),
                color: 'green-5',
              });
              this.loading = false;
            });
            break;
        }
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
                'api.editRestaurant.deleteRestaurantMenuItemFailed'
              ),
              color: 'deep-orange-4',
            });

        this.loading = false;
      }
    },

    /* Sync Restaurant Menu */
    async fetchRestaurantMenuFood() {
      // Call API fetch Restaurant Menu Food
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { restaurantId: this.$route.params.id, menuTypes: 'FOOD' };
      const result = await this.apiFetchRestaurantMenuItemAction({
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
              message: this.$t(
                'api.editRestaurant.fetchRestaurantMenuFoodFailed'
              ),
              color: 'deep-orange-4',
            });
      }
    },
    async fetchRestaurantMenuDrink() {
      // Call API fetch Restaurant Menu Drink
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { restaurantId: this.$route.params.id, menuTypes: 'DRINK' };
      const result = await this.apiFetchRestaurantMenuItemAction({
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
              message: this.$t(
                'api.editRestaurant.fetchRestaurantMenuDrinkFailed'
              ),
              color: 'deep-orange-4',
            });
      }
    },
  },
  created() {},
};
</script>

<style lang="stylus">
.item-table
  .q-table__top,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: $orange-1
</style>
