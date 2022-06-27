<template>
  <div class="container mx-auto px-2">
    <div
      class="is-justify-content-space-between is-flex is-align-items-center my-3"
    >
      <h2 class="text-2xl mb-3">كل الفئات</h2>
      <b-button
        type="is-primary"
        @click="
          edit = false
          openModal('edit-category', {})
        "
      >
        أضف فئة
      </b-button>
    </div>
    <modal name="delete-category" scrollable height="auto">
      <div class="p-4">
        <h2 class="text-xl font-bold">حذف الفئة</h2>
        <p>هل انت واثق انك تريد حذف الفئة؟</p>

        <div class="mt-5">
          <button class="btn btn-error btn-sm" @click="removeCategory">
            نعم
          </button>
          <button
            class="btn btn-error btn-sm"
            @click="closeModal('delete-category')"
          >
            إلغاء
          </button>
        </div>
      </div>
    </modal>
    <modal name="edit-category" scrollable height="auto">
      <div class="p-4">
        <h2 class="text-xl font-bold">أضف فئة</h2>

        <div class="mt-5">
          <FormulateForm
            v-slot="{ isLoading }"
            @submit="
              ($event) =>
                !edit ? this.addCategory($event) : this.editCategory($event)
            "
          >
            <FormulateInput
              v-model="category.name"
              name="name"
              label="اسم الفئة"
              placeholder="اسم الفئة"
              validation="required"
            />
            <client-only>
              <FormulateInput
                type="image"
                name="img"
                label="صورة الفئة"
                :uploader="uploader"
                upload-behavior="delayed"
              />
            </client-only>
            <div class="flex justify-between items-center mt-4 mb-12">
              <FormulateInput
                type="submit"
                :wrapper-class="['w-full']"
                :input-class="['btn-success', 'w-full', 'btn']"
                :disabled="isLoading || !valid"
                :label="!isLoading ? (edit ? 'تعديل ' : 'أضافة') : 'جاري...'"
              />

              <button
                class="btn btn-ghost btn-sm"
                @click="closeModal('edit-category')"
              >
                إلغاء
              </button>
            </div>
          </FormulateForm>
        </div>
      </div>
    </modal>

    <vue-good-table
      :columns="[
        { label: 'اسم الفئة', field: 'name' },
        { label: 'العمليات المتاحة', field: 'operations' },
      ]"
      :rows="categories"
      :rtl="true"
      :search-options="{ enabled: true, placeholder: 'ابحث في الجدول' }"
      max-height="auto"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'operations'" class="is-flex">
          <b-tooltip label="تعديل">
            <b-button
              icon-left="pen"
              type="is-warning"
              class="mx-1"
              @click="
                edit = true
                openModal('edit-category', props.row)
              "
            />
          </b-tooltip>
          <b-tooltip label="حذف">
            <b-button
              icon-left="delete"
              type="is-danger"
              @click="openModal('delete-category', props.row)"
            />
          </b-tooltip>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>

      <div slot="emptystate">لا توجد فئات حتى الآن</div>
    </vue-good-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ICategory from '@/interfaces/category'
import uploader from '~/utils/uploader'

export default Vue.extend({
  name: 'CategoryPage',
  layout: 'admin',
  data() {
    return {
      categories: [] as ICategory[],
      category: {} as ICategory,
      edit: true,
    }
  },
  head() {
    return {
      title: 'الفئات',
    }
  },
  computed: {
    valid(): boolean {
      return !!this.category.name
    },
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    uploader,
    async getCategories() {
      this.categories = await this.$axios.$get(`/categories`).catch((err) => {
        this.$store.dispatch('showToast', {
          message: err.response.data.msg,
          type: 'error',
        })
      })
    },
    openModal(modalName, category) {
      this.category = category
      this.$modal.show(modalName)
    },
    async addCategory(data) {
      this.category.img = data.img[0][0].url
      try {
        await this.$axios.$post('/categories', this.category)
        await this.getCategories()
        this.closeModal('edit-category')
        this.$store.dispatch('showToast', {
          message: 'تمت إضافة الفئة بنجاح',
          type: 'success',
        })
      } catch (error: any) {
        this.$store.dispatch('showToast', {
          message: error.response.data.msg,
          type: 'error',
        })
      }
    },
    async editCategory(data) {
      this.category.img = data.img[0][0].url
      try {
        await this.$axios.$patch(
          `/categories/${this.category._id}`,
          this.category
        )
        await this.getCategories()
        this.closeModal('edit-category')
        this.$store.dispatch('showToast', {
          message: 'تم التعديل بنجاح',
          type: 'success',
        })
      } catch (error: any) {
        this.$store.dispatch('showToast', {
          message: error.response.data.msg,
          type: 'error',
        })
      }
    },
    async removeCategory() {
      try {
        await this.$axios.$delete(`/categories/${this.category._id}`)
        await this.getCategories()
        this.closeModal('delete-category')
        this.$store.dispatch('showToast', {
          message: 'تم حذف الفئة بنجاح',
          type: 'success',
        })
      } catch (error: any) {
        this.$store.dispatch('showToast', {
          message: error.response.data.msg,
          type: 'error',
        })
      }
    },

    closeModal(modalName) {
      this.category = {} as ICategory
      this.edit = false
      this.$modal.hide(modalName)
    },
  },
})
</script>

<style scoped></style>
