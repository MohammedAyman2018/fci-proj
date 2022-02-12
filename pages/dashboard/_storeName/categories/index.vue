<template>
  <div class="container mx-auto px-2">
    <div class="justify-between flex items-center my-3">
      <h2 class="text-2xl mb-3">كل الفئات</h2>
      <button
        class="btn btn-primary btn-sm"
        @click="
          edit = false
          openModal('edit-category', {})
        "
      >
        أضف فئة
      </button>
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
          <FormulateInput
            v-model="category.name"
            name="اسم الفئة"
            label="اسم الفئة"
            placeholder="اسم الفئة"
            validation="required"
          />
          <div class="flex justify-between items-center mt-4 mb-12">
            <button
              v-if="!edit"
              :disabled="!valid"
              class="btn btn-success btn-sm"
              @click="addCategory"
            >
              أضافة
            </button>
            <button
              v-else
              :disabled="!valid"
              class="btn btn-warning btn-sm"
              @click="editCategory"
            >
              تعديل
            </button>
            <button
              class="btn btn-ghost btn-sm"
              @click="closeModal('edit-category')"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </modal>

    <vue-good-table
      :columns="[
        { label: 'اسم الفئة', field: 'name' },
        { label: 'تاريخ الانشاء', field: 'createdAt' },
        { label: 'العمليات المتاحة', field: 'operations' },
      ]"
      :rows="categories"
      :rtl="true"
      :search-options="{ enabled: true, placeholder: 'ابحث في الجدول' }"
      max-height="auto"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'createdAt'">
          <span>{{ props.row.createdAt.substr(0, 10) }}</span>
        </span>
        <span v-else-if="props.column.field == 'operations'">
          <div data-tip="تعديل" class="tooltip">
            <button
              class="btn btn-warning btn-square btn-xs"
              @click="openModal('edit-category', props.row)"
            >
              <i class="ri-pencil-line"></i>
            </button>
          </div>
          <div data-tip="حذف" class="tooltip">
            <button
              class="btn btn-error btn-square btn-xs"
              @click="openModal('delete-category', props.row)"
            >
              <i class="ri-delete-bin-line"></i>
            </button>
          </div>
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
  computed: {
    valid(): boolean {
      return !!this.category.name
    },
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    async getCategories() {
      this.categories = await this.$axios
        .$get(`/categories?storeName=${this.$route.params.storeName}`)
        .catch((err) => {
          this.$notify({
            group: 'foo',
            type: 'success',
            title: err,
          })
        })
    },
    openModal(modalName, category) {
      this.category = category
      this.$modal.show(modalName)
    },
    async addCategory() {
      try {
        await this.$axios.$post('/categories', {
          ...this.category,
          storeName: this.$route.params.storeName,
        })
        await this.getCategories()
        this.closeModal('edit-category')
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'تمت إضافة الفئة بنجاح',
        })
      } catch (error: any) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: error,
        })
      }
    },
    async editCategory() {
      try {
        await this.$axios.$patch(
          `/categories/${this.category._id}`,
          this.category
        )
        await this.getCategories()
        this.closeModal('edit-category')
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'تم التعديل بنجاح',
        })
      } catch (error: any) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: error,
        })
      }
    },
    async removeCategory() {
      try {
        await this.$axios.$delete(`/categories/${this.category._id}`)
        await this.getCategories()
        this.closeModal('delete-category')
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'تم حذف الفئة بنجاح',
        })
      } catch (error: any) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: error,
        })
      }
    },

    closeModal(modalName) {
      this.category = {} as ICategory
      this.edit = true
      this.$modal.hide(modalName)
    },
  },
})
</script>

<style scoped>
</style>
