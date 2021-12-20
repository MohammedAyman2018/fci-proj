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

      <modal name="delete-category" scrollable height="auto">
        <div class="p-4">
          <h2 class="text-xl font-bold">حذف العميل</h2>
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
          <h2 class="text-xl font-bold">حذف العميل</h2>
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ICategory from '@/interfaces/category'

export default Vue.extend({
  data() {
    return {
      categories: [] as ICategory[],
      category: {} as ICategory,
      edit: true,
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    async getCategories() {
      this.categories = await this.$axios
        .$get(`/categories?storeName=${this.$route.params.storeName}`)
        .catch((err) => console.log(err))
    },
    openModal(modalName, user) {
      this.category = user
      this.$modal.show(modalName)
    },
    async addUser() {
      try {
        await this.$axios.$post('/users', {
          ...this.category,
          storeName: this.$route.params.storeName,
        })
        await this.getCategories()
        this.closeModal('edit-user')
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'تمت إضافة العميل بنجاح',
        })
      } catch (error: any) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: error,
        })
      }
    },
    async editUser() {
      try {
        await this.$axios.$patch(`/users/${this.category._id}`, this.category)
        await this.getCategories()
        this.closeModal('edit-user')
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
    async removeUser() {
      try {
        await this.$axios.$delete(`/users/${this.category._id}`)
        await this.getCategories()
        this.closeModal('delete-user')
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'تم حذف العميل بنجاح',
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
