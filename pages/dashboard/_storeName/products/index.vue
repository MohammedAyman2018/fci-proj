<template>
  <div class="container mx-auto px-2">
    <div
      class="is-justify-content-space-between is-flex is-align-items-center my-3"
    >
      <h2 class="is-size-3 has-text-weight-bold">كل الفئات</h2>
      <b-button
        type="is-primary"
        class="btn btn-primary btn-sm"
        @click="
          $router.push(`/dashboard/${$route.params.storeName}/products/add`)
        "
      >
        أضف منتج
      </b-button>
    </div>
    <modal name="offer-modal" scrollable height="auto">
      <div class="p-4">
        <h2 class="mb-3 has-text-weight-bold is-size-4">إضافة عرض</h2>

        <FormulateForm @submit="makeOffer">
          <FormulateInput
            type="number"
            name="amount"
            help="إذا أردت اضافة عرض 30% فقط اكتب 30"
            placeholder="مثال: 30"
            validation="required|number|min:0|max:100"
            label="نسبة العرض"
          />

          <div
            class="is-flex is-justify-content-space-between is-align-items-center mt-5"
          >
            <FormulateInput type="submit" label="أنشئ" />
            <b-button
              type="is-ghost"
              size="is-small"
              @click="closeModal('offer-modal')"
            >
              إلغاء
            </b-button>
          </div>
        </FormulateForm>
      </div>
    </modal>

    <modal name="edit-product-images" scrollable height="auto">
      <div class="p-4">
        <h2 class="mb-3 has-text-weight-bold is-size-4">تعديل صور المنتج</h2>

        <uploader @filesAdded="productImage = $event" />

        <div
          class="is-flex is-justify-content-space-between is-align-items-center mt-5"
        >
          <b-button type="is-danger" size="is-small" @click="editProductImages">
            نعم
          </b-button>
          <b-button
            type="is-ghost"
            size="is-small"
            @click="closeModal('edit-product-images')"
          >
            إلغاء
          </b-button>
        </div>
      </div>
    </modal>
    <modal name="delete-product" scrollable height="auto">
      <div class="p-4">
        <h2 class="has-text-weight-bold is-size-4">حذف المنتج</h2>
        <p>هل انت واثق انك تريد حذف المنتج؟</p>

        <div
          class="is-flex is-justify-content-space-between is-align-items-center mt-5"
        >
          <b-button type="is-danger" size="is-small" @click="removeProduct">
            نعم
          </b-button>
          <b-button
            type="is-ghost"
            size="is-small"
            @click="closeModal('delete-product')"
          >
            إلغاء
          </b-button>
        </div>
      </div>
    </modal>

    <vue-good-table
      :columns="[
        { label: 'اسم المنتج', field: 'name' },
        {
          label: 'السعر',
          field: 'price',
          type: 'number',
          formatFn: (val) => `${val} جنيه`,
        },
        {
          label: 'لديه عرض',
          field: 'hasOffer',
          type: 'boolean',
          formatFn: (val) => (val ? 'نعم' : 'لا'),
        },
        {
          label: 'نسبة العرض',
          field: 'offerAmount',
          type: 'number',
          formatFn: (val) => `${val}%`,
        },
        { label: 'عدد الطلبات', field: 'ordered', type: 'number' },
        { label: 'عدد الزيارات', field: 'views', type: 'number' },
        {
          label: 'الكمية المتاحة',
          field: 'amount.available',
          type: 'number',
          formatFn: (val) => `${val} قطعة`,
        },
        {
          label: 'تاريخ الانشاء',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`,
          dateOutputFormat: 'MMM dd yyyy',
        },
        {
          label: 'العمليات المتاحة',
          field: 'operations',
          sortable: false,
          globalSearchDisabled: true,
        },
      ]"
      :rows="products"
      :rtl="true"
      :select-options="{
        enabled: true,
        selectionInfoClass: 'make-rtl',
        selectionText: 'الصفوف المختارة',
        selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
        selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
      }"
      :search-options="{ enabled: true, placeholder: 'ابحث في الجدول' }"
      max-height="auto"
      @on-selected-rows-change="selectionChanged"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'createdAt'">
          <span>{{ props.row.createdAt.substr(0, 10) }}</span>
        </span>
        <span v-if="props.column.field == 'operations'" class="flex">
          <b-tooltip label="تعديل">
            <b-button
              icon-left="pen"
              size="is-small"
              type="is-warning"
              @click="
                $router.push(
                  `/dashboard/${$route.params.storeName}/products/edit/${props.row._id}`
                )
              "
            />
          </b-tooltip>

          <b-tooltip label="تعديل الصور">
            <b-button
              icon-left="image"
              size="is-small"
              type="is-warning"
              @click="openModal('edit-product-images', props.row)"
            />
          </b-tooltip>

          <b-tooltip label="حذف">
            <b-button
              icon-left="delete"
              size="is-small"
              type="is-danger"
              @click="openModal('delete-product', props.row)"
            />
          </b-tooltip>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
      <div slot="selected-row-actions">
        <b-button
          type="is-ghost"
          size="is-small"
          @click="$modal.show('offer-modal')"
        >
          انشئ عرض بالمنتجات المختارة
        </b-button>
        <b-button type="is-ghost" size="is-small" @click="removeOffer">
          حذف العرض من المنتجات المختارة
        </b-button>
      </div>
      <div slot="emptystate">لا توجد فئات حتى الآن</div>
    </vue-good-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import clonDeep from 'lodash.clonedeep'
import IProduct from '@/interfaces/product'
import Uploader from '~/components/utils/Uploader.vue'
import uploadImages from '~/utils/uploader'
export default Vue.extend({
  components: { Uploader },
  name: 'ProductPage',
  layout: 'admin',
  data() {
    return {
      product: {} as IProduct,
      edit: false,
      products: [],
      productImage: [],
      selectedRows: [],
    }
  },
  head() {
    return {
      title: 'إدارة المنتجات',
    }
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    openModal(modalName, product) {
      this.product = product
      this.$modal.show(modalName)
    },
    async getProducts() {
      await this.$axios
        .$get(`/products?storeName=${this.$route.params.storeName}`, {
          headers: { admin: true },
        })
        .then((res) => {
          this.products = res
        })
        .catch((err) => {
          this.$store.dispatch('showToast', {
            message: err.response.data.msg,
            type: 'error',
          })
        })
    },
    clonDeep,
    async removeProduct() {
      try {
        await this.$axios.$delete(`/products/${this.product._id}`)
        await this.getProducts()
        this.closeModal('delete-product')
        this.$store.dispatch('showToast', {
          message: 'تم حذف المنتج بنجاح',
          type: 'success',
        })
      } catch (error: any) {
        this.$store.dispatch('showToast', {
          message: error.response.data.msg,
          type: 'error',
        })
      }
    },
    async removeOffer() {
      if (confirm('هل حقاً تريد حذف العرض من المنتجات المختارة؟')) {
        for (let idx = 0; idx < this.selectedRows.length; idx++) {
          const product: IProduct = this.selectedRows[idx]
          try {
            await this.$axios.$patch(`/products/${product._id}`, {
              hasOffer: false,
              offerAmount: 0,
            })
          } catch (error: any) {
            return this.$store.dispatch('showToast', {
              message: error.response.data.msg,
              type: 'error',
            })
          }
        } // end for
        this.$modal.hide('offer-modal')
        this.getProducts()
        this.$store.dispatch('showToast', {
          message: 'تم  حذف العرض',
          type: 'success',
        })
      }
    },
    async makeOffer(data: { amount: string }) {
      for (let idx = 0; idx < this.selectedRows.length; idx++) {
        const product: IProduct = this.selectedRows[idx]
        try {
          await this.$axios.$patch(`/products/${product._id}`, {
            hasOffer: true,
            offerAmount: Number(data.amount),
          })
        } catch (error: any) {
          return this.$store.dispatch('showToast', {
            message: error.response.data.msg,
            type: 'error',
          })
        }
      } // end for
      this.$modal.hide('offer-modal')
      this.getProducts()
      this.$store.dispatch('showToast', {
        message: 'تم إضافة العرض',
        type: 'success',
      })
    },
    selectionChanged(selectedRows) {
      this.selectedRows = selectedRows.selectedRows
    },
    closeModal(modalName) {
      this.product = {} as IProduct
      this.edit = true
      this.$modal.hide(modalName)
    },
    uploadImages,
    async editProductImages() {
      try {
        const images = await this.uploadImages(this.productImage)
        await this.$axios.patch(`/products/images/edit/${this.product._id}`, {
          images,
        })
        this.closeModal('edit-product-images')
        return this.$store.dispatch('showToast', {
          message: 'تم تعديل الصور بنجاح',
          type: 'success',
        })
      } catch (error) {
        return this.$store.dispatch('showToast', {
          message: error,
          type: 'error',
        })
      }
    },
  },
})
</script>

<style scoped></style>
