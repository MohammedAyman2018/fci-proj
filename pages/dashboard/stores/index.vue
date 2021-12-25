<template>
  <div>
    <div v-for="oneUser in stores" :key="oneUser._id" class="oneUser">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg">{{ oneUser.title }}</h3>
        <div>
          <button
            class="btn btn-primary btn-sm"
            @click="openModal('validate-store', oneUser)"
          >
            إظهار التفاصيل
          </button>
        </div>
      </div>
      <div class="flex justify-between items-center text-xs">
        <p>العنوان: {{ oneUser.location }}</p>
      </div>
    </div>

    <modal name="validate-store" scrollable height="auto">
      <div class="p-4">
        <h2 class="text-xl font-bold">ملفات المتجر</h2>
        <div class="h-12 w-12 bg-gray-400 inline-block mx-2"></div>
        <div class="h-12 w-12 bg-gray-400 inline-block mx-2"></div>
        <div class="h-12 w-12 bg-gray-400 inline-block mx-2"></div>
        <div class="h-12 w-12 bg-gray-400 inline-block mx-2"></div>
        <div class="mt-5">
          <button class="btn btn-error btn-sm" @click="approved(true)">
            تفعيل
          </button>
          <button class="btn btn-error btn-sm" @click="approved(false)">
            حذف
          </button>
          <button
            class="btn btn-error btn-sm"
            @click="closeModal('validate-store')"
          >
            إلغاء
          </button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IStore from '@/interfaces/store'
export default Vue.extend({
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
      const res = await this.$axios.$get('/stores').catch((error: any) => {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: error,
        })
      })
      this.stores = res
    },
    async approved(approved) {
      try {
        await this.$axios.$post(`/stores/validate/${this.store._id}`, {
          approved,
        })
      } catch (error: any) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: error,
        })
      }
    },
    closeModal() {
      this.store = {} as IStore
      this.$modal.hide('validate-store')
    },
    openModal(modalName, store) {
      this.store = store
      this.$modal.show(modalName)
    },
  },
})
</script>

<style scoped>
</style>
