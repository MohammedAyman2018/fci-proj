<template>
  <div class="container mx-auto px-2">
    <div class="justify-between flex items-center my-3">
      <h2 class="text-2xl mb-3">كل الفئات</h2>
      <button
        class="btn btn-primary btn-sm"
        @click="$router.push('/dashboard/stores/requests')"
      >
        طلبات انشاء متجر
      </button>
    </div>
    <modal name="delete-store" scrollable height="auto">
      <div class="p-4">
        <h2 class="text-xl font-bold">حذف المتجر</h2>
        <p>هل انت واثق انك تريد حذف المتجر؟</p>

        <div class="mt-5">
          <button class="btn btn-error btn-sm" @click="removeStore">نعم</button>
          <button
            class="btn btn-error btn-sm"
            @click="closeModal('delete-store')"
          >
            إلغاء
          </button>
        </div>
      </div>
    </modal>

    <vue-good-table
      :columns="[
        { label: 'اسم المتجر', field: 'title' },
        { label: 'تاريخ الانشاء', field: 'createdAt' },
        { label: 'العمليات المتاحة', field: 'operations' },
      ]"
      :rows="stores"
      :rtl="true"
      :search-options="{ enabled: true, placeholder: 'ابحث في الجدول' }"
      max-height="auto"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'createdAt'">
          <span>{{ props.row.createdAt.substr(0, 10) }}</span>
        </span>

        <span v-else-if="props.column.field == 'operations'">
          <div
            data-tip="تعديل"
            class="tooltip"
            @click="
              $router.push(
                `/dashboard/${props.row.title}/edit/${props.row._id}`
              )
            "
          >
            <button class="btn btn-warning btn-square btn-xs">
              <i class="ri-pencil-line"></i>
            </button>
          </div>
          <div data-tip="حذف" class="tooltip">
            <button
              class="btn btn-error btn-square btn-xs"
              @click="openModal('delete-store', props.row)"
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
import IStore from '@/interfaces/store'

export default Vue.extend({
  name: 'StorePage',
  layout: 'admin',
  data() {
    return {
      stores: [] as IStore[],
      store: {} as IStore,
    }
  },
  mounted() {
    this.getStores()
  },
  methods: {
    async getStores() {
      this.stores = await this.$axios
        .$get('/stores?approved=true')
        .catch((err) => {
          this.$notification('حدث خطأ ما', err.response.data.msg)
        })
    },
    openModal(modalName, store) {
      this.store = store
      this.$modal.show(modalName)
    },
    async removeStore() {
      try {
        await this.$axios.$delete(`/stores/${this.store._id}`)
        await this.getStores()
        this.closeModal('delete-store')

        this.$notification('نجح الطلب', 'تم حذف الفئة بنجاح')
      } catch (error: any) {
        this.$notification('حدث خطأ ما', error.response.data.msg)
      }
    },

    closeModal(modalName) {
      this.store = {} as IStore
      this.$modal.hide(modalName)
    },
  },
})
</script>

<style>
</style>
